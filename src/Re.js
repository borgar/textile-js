/*
** Regular Expression helper methods
**
** This provides the `re` object, which contains several helper
** methods for working with big regular expressions (soup).
**
*/

const _cache = {};
const toString = Object.prototype.toString;

export const escape = src => {
  return src.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
};

export const isRegExp = r => {
  return toString.call(r) === '[object RegExp]';
};


export default class Re {
  constructor (patterns) {
    this.pattern = Object.assign({
      punct: '[!-/:-@\\[\\\\\\]-`{-~]',
      space: '\\s'
    }, patterns);
  }

  collapse (src) {
    return src.replace(/(?:#.*?(?:\n|$))/g, '').replace(/\s+/g, '');
  }

  expandPatterns (src) {
    // TODO: provide escape for patterns: \[:pattern:] ?
    return src.replace(/\[:\s*(\w+)\s*:\]/g, (m, k) => {
      const ex = this.pattern[k];
      if (ex) {
        return this.expandPatterns(ex);
      }
      else {
        throw new Error('Pattern ' + m + ' not found in ' + src);
      }
    });
  }

  compile (src, flags) {
    let _flags = flags || '';

    if (isRegExp(src)) {
      if (flags == null) {
        if (src.global && !/[gG]/.test(_flags)) {
          _flags += 'g';
        }
        if (src.ignoreCase && !/[iI]/.test(_flags)) {
          _flags += 'i';
        }
        if (src.dotAll && !/[sS]/.test(_flags)) {
          _flags += 's';
        }
        if (src.unicode && !/[uU]/.test(_flags)) {
          _flags += 'u';
        }
        if (src.sticky && !/[yY]/.test(_flags)) {
          _flags += 'y';
        }
        if (src.multiline && !/[mM]/.test(_flags)) {
          _flags += 'm';
        }
      }
      // ISSUE: u flag prevents classes: [:txattr:] => [:artx]
      src = src.source;
    }

    // don't do the same thing twice
    const ckey = src + '//' + _flags;
    if (ckey in _cache) {
      return _cache[ckey];
    }

    // allow classes
    let rx = this.expandPatterns(src);

    // allow verbose expressions
    if (_flags && /[xX]/.test(_flags)) {
      rx = this.collapse(rx);
    }

    // allow dotall expressions
    if (_flags && /[sS]/.test(_flags)) {
      rx = rx.replace(/([^\\])\./g, '$1[^\\0]');
    }

    // clean flags and output new regexp
    flags = (flags || '').replace(/[^giymu]/ig, '');
    return (_cache[ckey] = new RegExp(rx, flags));
  }
}

Re.isRegExp = isRegExp;
Re.escape = escape;
