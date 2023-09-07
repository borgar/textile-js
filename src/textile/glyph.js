/* textile glyph parser */
import Re from '../Re.js';

const QUOTE_SINGLE_OPEN  = '‘';
const QUOTE_SINGLE_CLOSE = '’';
const QUOTE_DOUBLE_OPEN  = '“';
const QUOTE_DOUBLE_CLOSE = '”';
const PRIME              = '′';
const PRIME_DOUBLE       = '″';
const ELLIPSIS           = '…';
const ARROW              = '→';
const EMDASH             = '—';
const ENDASH             = '–';
const DIMENSION          = '×';
const TRADEMARK          = '™';
const REGISTERED         = '®';
const COPYRIGHT          = '©';
const HALF               = '½';
const QUARTER            = '¼';
const THREEQUARTERS      = '¾';
const DEGREES            = '°';
const PLUSMINUS          = '±';

const toEntity = char => {
  return char ? `&#${char.charCodeAt(0)};` : '';
};

const handleCopy = (m, index, s, ent) => {
  return (/(\b ?|\s|^)$/.test(s.slice(0, index))) ? ent : m;
};

const handleDimension = (m, index, s, ent) => {
  if (
    /\d[.,'")\]]* ?$/.test(s.slice(0, index)) &&
    / ?[.,([]*\d/.test(s.slice(index + 1))
  ) {
    return ent;
  }
  return m;
};

const handleSingleQuote = (m, index, s, ent) => {
  const preFix = s.slice(0, index);
  const postFix = s.slice(index + 1);
  // prime
  if (
    /(^|[^'])\d*[.,)\]]?\d[)\]]?$/.test(preFix) &&
    /^(\s|\d|x|X|\p{P}|$)/u.test(postFix)
  ) {
    return ent ? toEntity(PRIME) : PRIME;
  }
  // single
  if (
    (!preFix && /^(\s|s)\b/.test(postFix)) ||
    // "</tag>' " || "</tag>'s"
    (/(?:\p{L}|\p{M}|\p{N}|\p{Pc}|\))$/u.test(preFix) && /^(?:\p{L}|\p{M}|\p{N}|\p{Pc})/u.test(postFix)) ||
    // Back in '88/the '90s but not in his '90s', '1', '1.' '10m' or '5.png'
    (/\s$/.test(preFix) && /^(\d+\w?)\b(?!\.?\w*?')/.test(postFix))
  ) {
    return ent ? toEntity(QUOTE_SINGLE_CLOSE) : QUOTE_SINGLE_CLOSE;
  }
  // single open following open bracket
  if (/[([{]$/.test(preFix) && /^\S/.test(postFix)) {
    return ent ? toEntity(QUOTE_SINGLE_OPEN) : QUOTE_SINGLE_OPEN;
  }
  // single closing
  if (/\S$/.test(preFix) && /^(\s|\p{P}|$)/u.test(postFix)) {
    return ent ? toEntity(QUOTE_SINGLE_CLOSE) : QUOTE_SINGLE_CLOSE;
  }
  // default single opening
  return ent ? toEntity(QUOTE_SINGLE_OPEN) : QUOTE_SINGLE_OPEN;
};

const handleDoubleQuote = (m, index, s, ent) => {
  const after = s[index + 1] || '';
  const preFix = s.slice(0, index);
  // prime
  if (/\d[)\]]?$/.test(preFix) && /^(\s|x|X|\p{P}|$)/u.test(after)) {
    return ent ? toEntity(PRIME_DOUBLE) : PRIME_DOUBLE;
  }
  // double open following an open bracket
  if (/[([{]$/.test(preFix) && /^\S/.test(after)) {
    return ent ? toEntity(QUOTE_DOUBLE_OPEN) : QUOTE_DOUBLE_OPEN;
  }
  // double closing
  if (/\S$/.test(preFix) && /^(\s|\p{P}|$)/u.test(after)) {
    return ent ? toEntity(QUOTE_DOUBLE_CLOSE) : QUOTE_DOUBLE_CLOSE;
  }
  // default double opening
  return ent ? toEntity(QUOTE_DOUBLE_OPEN) : QUOTE_DOUBLE_OPEN;
};

const handleDash = (m, index, s, ent) => {
  return (/^[ \t]/.test(s[index - 1]) && /^\s/.test(s[index + 1])) ? ent : m;
};

const handleDoubleDash = (m, index, s, ent) => {
  return (s[index - 1] !== '-' && s[index + 2] !== '-') ? ent : m;
};

const handleEllipsis = (m, index, s, ent) => {
  return (s[index - 1] !== '.') ? ent : m;
};

const handleArrow = (m, index, s, ent) => {
  return (s[index - 1] !== '-') ? ent : m;
};

const handlers = {
  // Dimension sign
  'x': [ DIMENSION, handleDimension ],
  'X': [ DIMENSION, handleDimension ],
  // Apostrophe | Single open | Single closing | Single prime
  "'": [ null, handleSingleQuote ],
  // Double open| Double closing | Double prime
  '"': [ null, handleDoubleQuote ],
  // Ellipsis
  '...': [ ELLIPSIS, handleEllipsis ],
  // Arrow
  '->': [ ARROW, handleArrow ],
  // Em-dash
  '--': [ EMDASH, handleDoubleDash ],
  // En-dash
  '-': [ ENDASH, handleDash ],
  // Trademark
  '(tm)': [ TRADEMARK, handleCopy ],
  '(TM)': [ TRADEMARK, handleCopy ],
  '[tm]': [ TRADEMARK, handleCopy ],
  '[TM]': [ TRADEMARK, handleCopy ],
  // Registered
  '(r)': [ REGISTERED, handleCopy ],
  '(R)': [ REGISTERED, handleCopy ],
  '[r]': [ REGISTERED, handleCopy ],
  '[R]': [ REGISTERED, handleCopy ],
  // Copyright
  '(c)': [ COPYRIGHT, handleCopy ],
  '(C)': [ COPYRIGHT, handleCopy ],
  '[c]': [ COPYRIGHT, handleCopy ],
  '[C]': [ COPYRIGHT, handleCopy ],
  // 1/4
  '(1/4)': [ QUARTER, null ],
  '[1/4]': [ QUARTER, null ],
  // 1/2
  '(1/2)': [ HALF, null ],
  '[1/2]': [ HALF, null ],
  // 3/4
  '(3/4)': [ THREEQUARTERS, null ],
  '[3/4]': [ THREEQUARTERS, null ],
  // Degrees
  '(o)': [ DEGREES, null ],
  '[o]': [ DEGREES, null ],
  // Plus minus
  '(+/-)': [ PLUSMINUS, null ],
  '[+/-]': [ PLUSMINUS, null ]
};

const _tokens = Object.keys(handlers).map(Re.escape);
const re_matchGlyph = new Re().compile('(?:' + _tokens.join('|') + ')', 'g');

export function parseGlyph (src, options) {
  return src.replace(re_matchGlyph, (m, index, s) => {
    const [ glyph, handler ] = handlers[m];
    const ent = options.glyph_entities ? toEntity(glyph) : glyph;
    if (handler) {
      return handler(m, index, s, ent || options.glyph_entities);
    }
    return ent;
  });
}
