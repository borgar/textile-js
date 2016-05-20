module.exports = function ribbon ( feed ) {
  const org = String( feed );
  let slot = null;
  let pos = 0;

  return {

    save: function () {
      slot = pos;
    },

    load: function () {
      pos = slot;
      feed = org.slice( pos );
      this.$ = feed;
    },

    advance: function ( n ) {
      pos += ( typeof n === 'string' ) ? n.length : n;
      feed = org.slice( pos );
      this.$ = feed;
      return feed;
    },

    lookbehind: function ( nchars ) {
      nchars = nchars == null ? 1 : nchars;
      return org.slice( pos - nchars, pos );
    },

    startsWith: function ( s ) {
      return feed.substring( 0, s.length ) === s;
    },

    valueOf: function () {
      this.$ = feed;
      return feed;
    },

    toString: function () {
      this.$ = feed;
      return feed;
    }

  };
};
