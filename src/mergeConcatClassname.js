// merge object b properties into object a, and concat class names
module.exports = function mergeConcatClassName ( a, b ) {
  if ( b ) {
    for ( const k in b ) {
      if ( k === 'class' ) {
        a[ k ] = ( a[ k ] ? a[ k ] + ' ' : '' ) + b[ k ];
      }
      else {
        a[ k ] = b[ k ];
      }
    }
  }
  return a;
};
