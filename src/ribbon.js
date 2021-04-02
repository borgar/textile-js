export default class Ribbon {
  constructor (feed, skew = 0) {
    this._org = String(feed);
    this._feed = this._org;
    this.slot = [ 0, skew ];
    this.index = 0;
    this.skew = skew;
  }

  get offset () {
    return this.index + this.skew;
  }

  get length () {
    return this._feed.length;
  }

  save () {
    this.slot = [ this.index, this.skew ];
  }

  load () {
    this.index = this.slot[0];
    this.skew = this.slot[1];
    this._feed = this._org.slice(this.index);
  }

  advance (n) {
    this.index += (typeof n === 'string') ? n.length : n;
    this._feed = this._org.slice(this.index);
    return this;
  }

  charAt (n) {
    return this._feed.charAt(n);
  }

  equals (str) {
    return this._feed === str;
  }

  skipRe (re) {
    const m = re.exec(this._feed);
    if (m) {
      this.advance(m[0]);
      return m[0];
    }
    return '';
  }

  skipWS () {
    return this.skipRe(/^\s+/);
  }

  splitBy (re, cb) {
    let i = 0;
    do {
      const m = re.exec(this._feed);
      if (m) {
        cb(this.sub(0, m.index), i);
        this.advance(m.index + m[0].length);
      }
      else {
        cb(this.sub(0), i);
        this.advance(this.length);
        break;
      }
      i++;
    }
    while (this.length);
    return this;
  }

  trimStart () {
    const start = /^\s*/.exec(this._feed)[0].length;
    return this.sub(start);
  }

  trimEnd () {
    const end = /\s*$/.exec(this._feed)[0].length;
    const slice = new Ribbon(this._feed.slice(0, this._feed.length - end));
    slice.skew = this.index + this.skew;
    return slice;
  }

  trim () {
    const start = /^\s*/.exec(this._feed)[0].length;
    const end = /\s*$/.exec(this._feed)[0].length;
    return this.sub(start, this._feed.length - end - start);
  }

  lookbehind (nchars) {
    nchars = nchars == null ? 1 : nchars;
    return this._org.slice(this.index - nchars, this.index);
  }

  startsWith (s) {
    return this._feed.slice(0, s.length) === s;
  }

  clone () {
    return this.sub(0);
  }

  sub (start = 0, len = null) {
    if (len == null) {
      len = this._feed.length - start;
    }
    const slice = new Ribbon(this._feed.slice(start, Math.max(0, start + len)));
    slice.skew = this.index + this.skew + start;
    return slice;
  }

  valueOf () {
    return this._feed;
  }

  toString () {
    return this._feed;
  }
}
