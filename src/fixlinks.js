// recurse the tree and swap out any "href" attributes
// this uses the context as the replace dictionary so it can be fed to Array#map
module.exports = function fixLink ( ml, dict ) {
  if ( Array.isArray( ml ) ) {
    if ( ml[0] === 'a' ) { // found a link
      const attr = ml[1];
      if ( typeof attr === 'object' && 'href' in attr && attr.href in dict ) {
        attr.href = dict[attr.href];
      }
    }
  }
  return ml;
};
