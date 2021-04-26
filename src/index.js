/*
** Textile parser for JavaScript
**
** Copyright (c) 2012 Borgar Þorsteinsson (MIT License).
**
*/

import { parseBlock } from './textile/block.js';
import { CommentNode, Document, Element, ExtendedNode, HiddenNode, Node, RawNode, TextNode } from './VDOM.js';

function parseTextile (tx, opt) {
  const root = new Document();
  root.pos.start = 0;
  root.pos.end = tx.length;
  root.appendChild(parseBlock(tx, opt));
  return root;
}

function addLines (rootNode, sourceTx) {
  // find newlines
  const newlineIndexes = [];
  let pos = sourceTx.indexOf('\n');
  while (pos >= 0) {
    newlineIndexes.push(pos);
    pos = sourceTx.indexOf('\n', pos + 1);
  }
  // convert offsets to zero-based line numbers
  let index = 0;
  rootNode.visit(d => {
    const offset = d.pos.start;
    if (offset !== null) {
      while (newlineIndexes[index] < offset) {
        index++;
      }
      d.pos.line = index;
    }
  });
  // return the rootNode
  return rootNode;
}

export default function textile (sourceTx, opt) {
  // get a throw-away copy of options
  opt = Object.assign({}, textile.defaults, opt);
  // run the converter
  return parseTextile(sourceTx, opt).toHTML();
}

textile.CommentNode = CommentNode;
textile.Document = Document;
textile.Element = Element;
textile.ExtendedNode = ExtendedNode;
textile.RawNode = RawNode;
textile.TextNode = TextNode;
export { CommentNode, Document, Element, ExtendedNode, HiddenNode, Node, RawNode, TextNode };

// options
textile.defaults = {
  // single-line linebreaks are converted to <br> by default
  breaks: true,
  // automatically backlink footnotes, regardless of syntax
  autobacklink: false
};

textile.setOptions = opt => {
  Object.assign(textile.defaults, opt);
  return this;
};

textile.convert = textile;
textile.parse = textile;
textile.parseTree = function (sourceTx, opt) {
  opt = Object.assign({}, textile.defaults, opt);
  return addLines(parseTextile(sourceTx, opt), sourceTx);
};

export const parseTree = textile.parseTree;
