export const singletons = {
  area: 1,
  base: 1,
  br: 1,
  col: 1,
  embed: 1,
  hr: 1,
  img: 1,
  input: 1,
  link: 1,
  meta: 1,
  option: 1,
  param: 1,
  wbr: 1
};

// HTML tags allowed in the document (root) level that trigger HTML parsing
export const allowedFlowBlocktags = {
  p: 0,
  hr: 0,
  ul: 1,
  ol: 0,
  li: 0,
  div: 1,
  pre: 0,
  object: 1,
  script: 0,
  noscript: 0,
  blockquote: 1,
  notextile: 1,
  style: 0
};
