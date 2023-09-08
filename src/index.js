/*
** Textile parser for JavaScript
**
** Copyright (c) 2012 Borgar Þorsteinsson (MIT License).
**
*/

import { parseBlock } from './textile/block.js';
import { CommentNode, Document, Element, ExtendedNode, HiddenNode, Node, RawNode, TextNode } from './VDOM.js';

// default options
export const defaultOptions = Object.freeze({
  // single-line linebreaks are converted to <br> by default
  breaks: true,
  // automatically backlink footnotes, regardless of syntax
  auto_backlink: false,
  // list of blocked href protocols
  blocked_uri: [
    'javascript',
    'vbscript',
    'data'
  ],
  // HTML tags allowed in the document (root) level that trigger HTML parsing
  allowed_block_tags: [
    'blockquote',
    'div',
    'hr',
    'li',
    'noscript',
    'notextile',
    'object',
    'ol',
    'p',
    'pre',
    'script',
    'style',
    'ul'
  ],
  // id prefix
  id_prefix: false,
  // glyph entities
  glyph_entities: false
});

function parseTextile (tx, options) {
  const root = new Document();
  root.pos.start = 0;
  root.pos.end = tx.length;
  root.appendChild(parseBlock(tx, options));
  return root;
}

const binSearch = (list, item) => {
  let low = 0;
  let high = list.length - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const guess = list[mid];
    if (guess > item) {
      high = mid - 1;
    }
    else if (guess < item) {
      low = mid + 1;
    }
    else if (guess === item) {
      return mid;
    }
  }
  return low;
};

function addLines (rootNode, sourceTx) {
  // find newlines
  const newlineIndexes = [];
  let pos = sourceTx.indexOf('\n');
  while (pos >= 0) {
    newlineIndexes.push(pos);
    pos = sourceTx.indexOf('\n', pos + 1);
  }
  // convert offsets to zero-based line numbers
  rootNode.visit(d => {
    if (d.pos.start != null) {
      d.pos.line = binSearch(newlineIndexes, d.pos.start);
    }
  });
  // return the rootNode
  return rootNode;
}

function getOptions (options) {
  const opts = Object.assign({}, defaultOptions, options);
  if (opts.id_prefix && typeof opts.id_prefix !== 'string') {
    opts.id_prefix = Math.floor(Math.random() * 1e9).toString(36);
  }
  else if (!opts.id_prefix) {
    opts.id_prefix = '';
  }
  return opts;
}

/**
 * Convert Textile markup to HTML markup.
 *
 * @param {string} source The source transmit
 * @param {object} options Parsing options
 * @param {boolean} [options.breaks=true] Convert single-line linebreaks to <br>
 * @param {boolean} [options.auto_backlink=true] Automatically backlink footnotes, regardless of syntax used
 * @param {boolean|string} [options.id_prefix=true] Footnotes and endnote HTML IDs are prefixed with a string (as set here) or number (if true)
 * @param {boolean} [options.glyph_entities=true] Convert entity markup (->) to glyphs (→)
 * @param {Array<string>} [options.blocked_uri] A list of blocked href protocols (def: javascript, vbscript, data)
 * @param {Array<string>} [options.allowed_block_tags] Which HTML tags in the document trigger HTML parsing (def: div, blockquote, ...)
 * @returns {string} HTML source string
 */
export function textile (source, options) {
  // get a throw-away copy of options
  const opt = getOptions(options);
  // run the converter
  return parseTextile(source, opt).toHTML();
}

// support legacy UI
textile.convert = textile;
export default textile;

// textile.Node = Node;
// textile.CommentNode = CommentNode;
// textile.Document = Document;
// textile.Element = Element;
// textile.ExtendedNode = ExtendedNode;
// textile.RawNode = RawNode;
// textile.TextNode = TextNode;
export { CommentNode, Document, Element, ExtendedNode, HiddenNode, Node, RawNode, TextNode };

/**
 * Parse Textile markup and return a "VDOM" tree.
 *
 * @param {string} source The source transmit
 * @param {object} options Parsing options
 * @param {boolean} [options.breaks=true] Convert single-line linebreaks to <br>
 * @param {boolean} [options.auto_backlink=true] Automatically backlink footnotes, regardless of syntax used
 * @param {boolean|string} [options.id_prefix=true] Footnotes and endnote HTML IDs are prefixed with a string (as set here) or number (if true)
 * @param {boolean} [options.glyph_entities=true] Convert entity markup (->) to glyphs (→)
 * @param {Array<string>} [options.blocked_uri] A list of blocked href protocols (def: javascript, vbscript, data)
 * @param {Array<string>} [options.allowed_block_tags] Which HTML tags in the document trigger HTML parsing (def: div, blockquote, ...)
 * @returns {Document} A textile Document node
 */
export function parse (source, options) {
  return addLines(
    parseTextile(source, getOptions(options)),
    source
  );
}
