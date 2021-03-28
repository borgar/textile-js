/*
** Regular Expression helper methods
**
** This provides the `re` object, which contains several helper
** methods for working with big regular expressions (soup).
**
*/

const _cache = {};
const toString = Object.prototype.toString;

const re = {

  pattern: {
    punct: '[!-/:-@\\[\\\\\\]-`{-~]',
    space: '\\s'
  },

  escape: src => {
    return src
      .replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  },

  collapse: src => {
    return src.replace(/(?:#.*?(?:\n|$))/g, '')
      .replace(/\s+/g, '');
  },

  expandPatterns: src => {
    // TODO: provide escape for patterns: \[:pattern:] ?
    return src.replace(/\[:\s*(\w+)\s*:\]/g, (m, k) => {
      const ex = re.pattern[k];
      if (ex) {
        return re.expandPatterns(ex);
      }
      else {
        throw new Error('Pattern ' + m + ' not found in ' + src);
      }
    });
  },

  isRegExp: r => {
    return toString.call(r) === '[object RegExp]';
  },

  compile: function (src, flags) {
    if (re.isRegExp(src)) {
      if (arguments.length === 1) { // no flags arg provided, use the RegExp one
        flags = (src.global ? 'g' : '') +
                (src.ignoreCase ? 'i' : '') +
                (src.multiline ? 'm' : '');
      }
      src = src.source;
    }
    // don't do the same thing twice
    const ckey = src + (flags || '');
    if (ckey in _cache) {
      return _cache[ckey];
    }
    // allow classes
    let rx = re.expandPatterns(src);
    // allow verbose expressions
    if (flags && /x/.test(flags)) {
      rx = re.collapse(rx);
    }
    // allow dotall expressions
    if (flags && /s/.test(flags)) {
      rx = rx.replace(/([^\\])\./g, '$1[^\\0]');
    }
    // clean flags and output new regexp
    flags = (flags || '').replace(/[^gim]/g, '');
    return (_cache[ckey] = new RegExp(rx, flags));
  }

};

export default re;
