/* definitions list parser */

const ribbon = require( '../ribbon' );

const { addLineNumber } = require( './attr' );

const reDeflist = /^((?:- (?:[^\n]\n?)+?)+:=(?: *\n[^\0]+?=:(?:\n|$)|(?:[^\0]+?(?:$|\n(?=\n|- )))))+/;
const reItem = /^((?:- (?:[^\n]\n?)+?)+):=( *\n[^\0]+?=:\s*(?:\n|$)|(?:[^\0]+?(?:$|\n(?=\n|- ))))/;

function testDefList ( src ) {
  return reDeflist.exec( src );
}

function parseDefList ( src, options, charOffset, charPosToLine ) {
  if ( options.showOriginalLineNumber ) {
    const removedSrc = src.match( /^\s+/ );
    if ( removedSrc && removedSrc[0] ) {
      charOffset += removedSrc[0].length;
    }
  }
  src = ribbon( src.trim() );

  // late loading to get around the lack of non-circular-dependency support in RequireJS
  const parsePhrase = require( './phrase' ).parsePhrase;
  const parseFlow = require( './flow' ).parseFlow;

  const deflist = [ 'dl', '\n' ];
  let terms;
  let def;
  let m;

  while ( ( m = reItem.exec( src ) ) ) {
    // add terms
    terms = m[1].split( /(?:^|\n)- / );
    let localCharOffset = terms[0].length;
    terms = terms.slice( 1 );
    let separators = [];
    if ( options.showOriginalLineNumber ) {
      separators = m[1].match( /(?:^|\n)- /g ).slice( 1 );
    }
    while ( terms.length ) {
      const term = terms.shift();
      deflist.push( '\t'
        , [ 'dt' ].concat(
          addLineNumber({}, options, charPosToLine, charOffset, src.getPos() + localCharOffset )
          , parsePhrase( term.trim(), options ) )
        , '\n'
      );
      if ( options.showOriginalLineNumber ) {
        localCharOffset += term.length;
        // perhaps no separator at the end of the list
        if ( separators.length ) {
          localCharOffset += separators.shift().length;
        }
      }
    }
    // add definitions
    def = m[2].trim();
    if ( options.showOriginalLineNumber ) {
      // rebase local char offset, and add +2 for ':=' between term and definition
      localCharOffset = m[1].length + 2;

      const removedSrc = m[2].match( /^\s+/ );
      if ( removedSrc && removedSrc[0] ) {
        localCharOffset += removedSrc[0].length;
      }
    }
    deflist.push( '\t'
      , [ 'dd' ].concat(
        addLineNumber({}, options, charPosToLine, charOffset, src.getPos() + localCharOffset )
        , ( /=:$/.test( def ) )
          ? parseFlow( def.slice( 0, -2 ).trim(), options, options.showOriginalLineNumber ? charPosToLine[ ( charOffset || 0 ) + localCharOffset + src.getPos() ] : 0 )
          : parsePhrase( def, options )
      )
      , '\n'
    );
    src.advance( m[0] );
  }
  return deflist;
}

exports.testDefList = testDefList;
exports.parseDefList = parseDefList;
