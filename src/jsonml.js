/*
** JSONML helper methods - http://www.jsonml.org/
**
** This provides the `JSONML` object, which contains helper
** methods for rendering JSONML to HTML.
**
** Note that the tag ! is taken to mean comment, this is however
** not specified in the JSONML spec.
*/

const singletons = require( './html' ).singletons;

// drop or add tab levels to JsonML tree
function reIndent ( ml, shiftBy ) {
  // a bit obsessive, but there we are...
  if ( !shiftBy ) {
    return ml;
  }
  return ml.map( function ( s ) {
    if ( /^\n\t+/.test( s ) ) {
      if ( shiftBy < 0 ) {
        s = s.slice( 0, shiftBy );
      }
      else {
        for ( let i = 0; i < shiftBy; i++ ) {
          s += '\t';
        }
      }
    }
    else if ( Array.isArray( s ) ) {
      return reIndent( s, shiftBy );
    }
    return s;
  });
}

function escape ( text, escapeQuotes ) {
  return text.replace( /&(?!(#\d{2,}|#x[\da-fA-F]{2,}|[a-zA-Z][a-zA-Z1-4]{1,6});)/g, '&amp;' )
    .replace( /</g, '&lt;' )
    .replace( />/g, '&gt;' )
    .replace( /"/g, escapeQuotes ? '&quot;' : '"' )
    .replace( /'/g, escapeQuotes ? '&#39;' : "'" );
}

function toHTML ( jsonml, renderers ) {
  jsonml = jsonml.concat();

  // basic case
  if ( typeof jsonml === 'string' ) {
    return escape( jsonml );
  }

  const tag = jsonml.shift();
  let attributes = {};
  let tagAttrs = '';
  const content = [];

  if ( jsonml.length && typeof jsonml[0] === 'object' && !Array.isArray( jsonml[0] ) ) {
    attributes = jsonml.shift();
  }

  while ( jsonml.length ) {
    content.push( toHTML( jsonml.shift(), renderers ) );
  }

  let realContent = content.join( '' );
  if ( Array.isArray( renderers ) ) {
    renderers.forEach( render => {
      realContent = render( tag, attributes, realContent );
    });
  }

  for ( const a in attributes ) {
    tagAttrs += ( attributes[a] == null )
      ? ` ${ a }`
      : ` ${ a }="${ escape( String( attributes[a] ), true ) }"`;
  }

  // be careful about adding whitespace here for inline elements
  if ( tag === '!' ) {
    return `<!--${ realContent }-->`;
  }
  else if ( tag in singletons || ( tag.indexOf( ':' ) > -1 && !realContent.length ) ) {
    return `<${ tag }${ tagAttrs } />`;
  }
  else {
    return `<${ tag }${ tagAttrs }>${ realContent }</${ tag }>`;
  }
}

function applyHooks ( ml, hooks = [], level = undefined ) {
  if ( Array.isArray( ml ) && Array.isArray( hooks ) && hooks.length ) {
    let realLevel = +level || 0;
    for ( let i = 0, l = hooks.length; i < l; i++ ) {
      const hook = hooks[i];
      hook[0]( ml, hook[1], realLevel );
    }
    realLevel++;
    for ( let i = 0, l = ml.length; i < l; i++ ) {
      if ( Array.isArray( ml[i] ) ) {
        applyHooks( ml[i], hooks, realLevel );
      }
    }
  }
  return ml;
}

function isNode ( ml ) {
  return Array.isArray( ml ) && typeof ml[0] === 'string';
};

function isAttributes ( mlPart ) {
  return typeof mlPart === 'object' && !Array.isArray( mlPart );
};

function hasAttributes ( ml ) {
  if ( !isNode( ml ) ) {
    throw new Error( 'Not a jsonML node' );
  }

  return isAttributes( ml[1] );
};

function addAttributes ( ml, newAttr ) {
  if ( hasAttributes( ml ) ) {
    return Object.assign( ml[1], newAttr );
  }
  else {
    const attr = Object.assign({}, newAttr );
    ml.splice( 1, 0, attr );

    return attr;
  }
};

module.exports = {
  reIndent: reIndent,
  toHTML: toHTML,
  escape: escape,
  applyHooks: applyHooks,
  addAttributes: addAttributes
};
