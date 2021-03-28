/*
** Textile parser for JavaScript
**
** Copyright (c) 2012 Borgar Þorsteinsson (MIT License).
**
*/

import { parseFlow } from './textile/flow.js';
export { parseHtml } from './html.js';
import { Document, Element, RawNode, TextNode, CommentNode } from './Node.js';

function parseTextile (tx, opt) {
  const root = new Document();
  root.pos.offset = 0;
  root.appendChild(parseFlow(tx, opt));
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
    const offset = d.pos.offset;
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
};

textile.CommentNode = CommentNode;
textile.Document = Document;
textile.Element = Element;
textile.RawNode = RawNode;
textile.TextNode = TextNode;

// options
textile.defaults = {
  // single-line linebreaks are converted to <br> by default
  breaks: true
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
