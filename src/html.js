const re = require( './re' );
const ribbon = require( './ribbon' );

re.pattern.html_id = '[a-zA-Z][a-zA-Z\\d:]*';
re.pattern.html_attr = '(?:"[^"]+"|\'[^\']+\'|[^>\\s]+)';

const reAttr = re.compile( /^\s*([^=\s]+)(?:\s*=\s*("[^"]+"|'[^']+'|[^>\s]+))?/ );
const reComment = re.compile( /^<!--(.+?)-->/, 's' );
const reEndTag = re.compile( /^<\/([:html_id:])([^>]*)>/ );
const reTag = re.compile( /^<([:html_id:])((?:\s[^=\s\/]+(?:\s*=\s*[:html_attr:])?)+)?\s*(\/?)>(\n*)/ );
const reHtmlTagBlock = re.compile( /^\s*<([:html_id:](?::[a-zA-Z\d]+)*)((?:\s[^=\s\/]+(?:\s*=\s*[:html_attr:])?)+)?\s*(\/?)>(\n*)/ );

// area, base, basefont, bgsound, br, col, command, embed, frame, hr,
// img, input, keygen, link, meta, param, source, track or wbr
const singletons = {
  br: 1,
  hr: 1,
  img: 1,
  link: 1,
  meta: 1,
  wbr: 1,
  area: 1,
  param: 1,
  input: 1,
  option: 1,
  base: 1,
  col: 1
};

function allowAll () {
  return true;
}

function testComment ( src ) {
  return reComment.exec( src );
}

function testOpenTagBlock ( src ) {
  return reHtmlTagBlock.exec( src );
}

function testOpenTag ( src ) {
  return reTag.exec( src );
}

function testCloseTag ( src ) {
  return reEndTag.exec( src );
}

function parseHtmlAttr ( attrSrc ) {
  // parse ATTR and add to element
  const attr = {};
  let m;
  while ( ( m = reAttr.exec( attrSrc ) ) ) {
    attr[ m[1] ] = ( typeof m[2] === 'string' ) ? m[2].replace( /^(["'])(.*)\1$/, '$2' ) : null;
    attrSrc = attrSrc.slice( m[0].length );
  }
  return attr;
}

// This "indesciminately" parses HTML text into a list of JSON-ML element
// No steps are taken however to prevent things like <table><p><td> - user can still create nonsensical but "well-formed" markup
function parseHtml ( src, whitelistTags ) {
  const root = [];
  let list = root;
  const _stack = [];
  const oktag = whitelistTags ? function ( tag ) { return tag in whitelistTags; } : allowAll;
  let m;
  let tag;

  src = ( typeof src === 'string' ) ? ribbon( src ) : src;
  // loop
  do {
    // comment
    if ( ( m = testComment( src ) ) && oktag( '!' ) ) {
      src.advance( m[0] );
      list.push( [ '!', m[1] ] );
    }

    // end tag
    else if ( ( m = testCloseTag( src ) ) && oktag( m[1] ) ) {
      tag = m[1];
      if ( _stack.length ) {
        for ( let i = _stack.length - 1; i >= 0; i-- ) {
          const head = _stack[i];
          if ( head[0] === tag ) {
            _stack.splice( i );
            list = _stack[_stack.length - 1] || root;
            break;
          }
        }
      }
      src.advance( m[0] );
    }

    // open/void tag
    else if ( ( m = testOpenTag( src ) ) && oktag( m[1] ) ) {
      src.advance( m[0] );
      tag = m[1];
      const single = m[3] || m[1] in singletons;
      const tail = m[4];
      const element = [ tag ];

      // attributes
      if ( m[2] ) {
        element.push( parseHtmlAttr( m[2] ) );
      }

      // single tag
      if ( single ) {
        // let us add the element and continue our quest...
        list.push( element );
        if ( tail ) {
          list.push( tail );
        }
      }
      // open tag
      else {
        if ( tail ) {
          element.push( tail );
        }

        // TODO: some things auto close other things: <td>, <li>, <p>, <table>
        // if ( tag === 'p' && _stack.length ) {
        //   var seek = /^(p)$/;
        //   for (var i=_stack.length-1; i>=0; i--) {
        //     var head = _stack[i];
        //     if ( seek.test( head[0] ) /* === tag */ ) {
        //       //src.advance( m[0] );
        //       _stack.splice( i );
        //       list = _stack[i] || root;
        //     }
        //   }
        // }

        // TODO: some elements can move parser into "text" mode
        // style, xmp, iframe, noembed, noframe, textarea, title, script, noscript, plaintext
        // if ( /^(script)$/.test( tag ) ) { }

        _stack.push( element );
        list.push( element );
        list = element;
      }
    }
    // text content
    else {
      // no match, move by all "uninteresting" chars
      m = /([^<]+|[^\0])/.exec( src );
      if ( m ) {
        list.push( m[0] );
      }
      src.advance( m ? m[0].length || 1 : 1 );
    }
  }
  while ( src.valueOf() );

  return root;
}

module.exports = {
  singletons: singletons,
  parseHtml: parseHtml,
  parseHtmlAttr: parseHtmlAttr,
  testCloseTag: testCloseTag,
  testOpenTagBlock: testOpenTagBlock,
  testOpenTag: testOpenTag,
  testComment: testComment
};
