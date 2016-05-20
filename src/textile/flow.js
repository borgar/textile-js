/*
** textile flow content parser
*/
const builder = require( '../builder' );
const ribbon = require( '../ribbon' );
const re = require( '../re' );
const fixLinks = require( '../fixlinks' );

const { parseHtml, parseHtmlAttr, singletons, testComment, testOpenTagBlock } = require( '../html' );

const { parsePhrase } = require( './phrase' );
const { copyAttr, parseAttr } = require( './attr' );
const { testList, parseList } = require( './list' );
const { testDefList, parseDefList } = require( './deflist' );
const { testTable, parseTable } = require( './table' );

const { txblocks, txlisthd, txattr } = require( './re_ext' );
re.pattern.txblocks = txblocks;
re.pattern.txlisthd = txlisthd;
re.pattern.txattr = txattr;

// HTML tags allowed in the document (root) level that trigger HTML parsing
const allowedBlocktags = {
  'p': 0,
  'hr': 0,
  'ul': 1,
  'ol': 0,
  'li': 0,
  'div': 1,
  'pre': 0,
  'object': 1,
  'script': 0,
  'noscript': 0,
  'blockquote': 1,
  'notextile': 1
};

const reBlock = re.compile( /^([:txblocks:])/ );
// const reBlockSE = re.compile( /^[:txblocks:]$/ );
const reBlockNormal = re.compile( /^(.*?)($|\r?\n(?=[:txlisthd:])|\r?\n(?:\s*\n|$)+)/, 's' );
const reBlockExtended = re.compile( /^(.*?)($|\r?\n(?=[:txlisthd:])|\r?\n+(?=[:txblocks:][:txattr:]\.))/, 's' );
const reRuler = /^(\-\-\-+|\*\*\*+|___+)(\r?\n\s+|$)/;
const reLinkRef = re.compile( /^\[([^\]]+)\]((?:https?:\/\/|\/)\S+)(?:\s*\n|$)/ );
const reFootnoteDef = /^fn\d+$/;

function paragraph ( s, tag, pba, linebreak, options ) {
  tag = tag || 'p';
  let out = [];
  s.split( /(?:\r?\n){2,}/ ).forEach( function ( bit, i ) {
    if ( tag === 'p' && /^\s/.test( bit ) ) {
      // no-paragraphs
      // WTF?: Why does Textile not allow linebreaks in spaced lines
      bit = bit.replace( /\r?\n[\t ]/g, ' ' ).trim();
      out = out.concat( parsePhrase( bit, options ) );
    }
    else {
      if ( linebreak && i ) { out.push( linebreak ); }
      out.push( pba ? [ tag, pba ].concat( parsePhrase( bit, options ) )
                    : [ tag ].concat( parsePhrase( bit, options ) ) );
    }
  });
  return out;
};

function parseFlow ( src, options ) {
  const list = builder();

  let linkRefs;
  let m;

  src = ribbon( src.replace( /^( *\r?\n)+/, '' ) );

  // loop
  while ( src.valueOf() ) {
    src.save();

    // link_ref -- this goes first because it shouldn't trigger a linebreak
    if ( ( m = reLinkRef.exec( src ) ) ) {
      if ( !linkRefs ) { linkRefs = {}; }
      src.advance( m[0] );
      linkRefs[m[1]] = m[2];
      continue;
    }

    // add linebreak
    list.linebreak();

    // named block
    if ( ( m = reBlock.exec( src ) ) ) {
      src.advance( m[0] );
      const blockType = m[0];
      let pba = parseAttr( src, blockType );

      if ( pba ) {
        src.advance( pba[0] );
        pba = pba[1];
      }
      if ( ( m = /^\.(\.?)(?:\s|(?=:))/.exec( src ) ) ) {
        // FIXME: this whole copyAttr seems rather strange?
        // slurp rest of block
        const extended = !!m[1];
        const reBlockGlob = ( extended ? reBlockExtended : reBlockNormal );
        m = reBlockGlob.exec( src.advance( m[0] ) );
        src.advance( m[0] );
        // bq | bc | notextile | pre | h# | fn# | p | ###
        if ( blockType === 'bq' ) {
          let inner = m[1];
          if ( ( m = /^:(\S+)\s+/.exec( inner ) ) ) {
            if ( !pba ) { pba = {}; }
            pba.cite = m[1];
            inner = inner.slice( m[0].length );
          }
          // RedCloth adds all attr to both: this is bad because it produces duplicate IDs
          const par = paragraph( inner, 'p', copyAttr( pba, { 'cite': 1, 'id': 1 }), '\n', options );
          list.add( [ 'blockquote', pba, '\n' ].concat( par ).concat( [ '\n' ] ) );
          // FIXME: looks like .linebreak can work here
        }
        else if ( blockType === 'bc' ) {
          const subPba = ( pba ) ? copyAttr( pba, { 'id': 1 }) : null;
          list.add( [ 'pre', pba, ( subPba ? [ 'code', subPba, m[1] ] : [ 'code', m[1] ] ) ] );
        }
        else if ( blockType === 'notextile' ) {
          list.merge( parseHtml( m[1] ) );
        }
        else if ( blockType === '###' ) {
          // ignore the insides
        }
        else if ( blockType === 'pre' ) {
          // I disagree with RedCloth, but agree with PHP here:
          // "pre(foo#bar).. line1\n\nline2" prevents multiline preformat blocks
          // ...which seems like the whole point of having an extended pre block?
          list.add( [ 'pre', pba, m[1] ] );
        }
        else if ( reFootnoteDef.test( blockType ) ) { // footnote
          // Need to be careful: RedCloth fails "fn1(foo#m). footnote" -- it confuses the ID
          const fnid = blockType.replace( /\D+/g, '' );
          if ( !pba ) { pba = {}; }
          pba.class = ( pba['class'] ? pba['class'] + ' ' : '' ) + 'footnote';
          pba.id = 'fn' + fnid;
          list.add( [ 'p', pba, [ 'a', { 'href': '#fnr' + fnid }, [ 'sup', fnid ] ], ' ' ]
                      .concat( parsePhrase( m[1], options ) ) );
        }
        else { // heading | paragraph
          list.merge( paragraph( m[1], blockType, pba, '\n', options ) );
        }
        continue;
      }
      else {
        src.load();
      }
    }

    // HTML comment
    if ( ( m = testComment( src ) ) ) {
      src.advance( m[0] + ( /(?:\s*\n+)+/.exec( src ) || [] )[0] );
      list.add( [ '!', m[1] ] );
      continue;
    }

    // block HTML
    if ( ( m = testOpenTagBlock( src ) ) ) {
      const tag = m[1];
      const single = m[3] || tag in singletons;
      const tail = m[4];

      // Unsurprisingly, all Textile implementations I have tested have trouble parsing simple HTML:
      //
      //    "<div>a\n<div>b\n</div>c\n</div>d"
      //
      // I simply match them here as there is no way anyone is using nested HTML today, or if they
      // are, then this will at least output less broken HTML as redundant tags will get quoted.

      // Is block tag? ...
      if ( tag in allowedBlocktags ) {
        src.advance( m[0] );

        let element = [ tag ];

        if ( m[2] ) {
          element.push( parseHtmlAttr( m[2] ) );
        }

        // single tag
        if ( single ) {
          // let us add the element and continue our quest...
          list.add( element );
          continue;
        }
        // block
        else {
          // gulp up the rest of this block...
          const reEndTag = re.compile( `^(.*?)(\\s*)(</${ tag }\\s*>)(\\s*)`, 's' );
          if ( ( m = reEndTag.exec( src ) ) ) {
            src.advance( m[0] );
            if ( tag === 'pre' ) {
              element.push( tail );
              element = element.concat( parseHtml( m[1].replace( /(\r?\n)+$/, '' ), { 'code': 1 }) );
              if ( m[2] ) { element.push( m[2] ); }
              list.add( element );
            }
            else if ( tag === 'notextile' ) {
              element = parseHtml( m[1].trim() );
              list.merge( element );
            }
            else if ( tag === 'script' || tag === 'noscript' ) {
              element.push( tail + m[1] );
              list.add( element );
            }
            else {
              // These strange (and unnecessary) linebreak tests are here to get the
              // tests working perfectly. In reality, this doesn't matter one bit.
              if ( /\n/.test( tail ) ) { element.push( '\n' ); }
              if ( /\n/.test( m[1] ) ) {
                element = element.concat( parseFlow( m[1], options ) );
              }
              else {
                element = element.concat( parsePhrase( m[1].replace( /^ +/, '' ), options ) );
              }
              if ( /\n/.test( m[2] ) ) { element.push( '\n' ); }

              list.add( element );
            }
            continue;
          }
        }
      }
      src.load();
    }

    // ruler
    if ( ( m = reRuler.exec( src ) ) ) {
      src.advance( m[0] );
      list.add( [ 'hr' ] );
      continue;
    }

    // list
    if ( ( m = testList( src ) ) ) {
      src.advance( m[0] );
      list.add( parseList( m[0], options ) );
      continue;
    }

    // definition list
    if ( ( m = testDefList( src ) ) ) {
      src.advance( m[0] );
      list.add( parseDefList( m[0], options ) );
      continue;
    }

    // table
    if ( ( m = testTable( src ) ) ) {
      src.advance( m[0] );
      list.add( parseTable( m[1], options ) );
      continue;
    }

    // paragraph
    m = reBlockNormal.exec( src );
    list.merge( paragraph( m[1], 'p', undefined, '\n', options ) );
    src.advance( m[0] );
  }

  return linkRefs ? fixLinks( list.get(), linkRefs ) : list.get();
}

exports.parseFlow = parseFlow;
