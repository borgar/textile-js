/*
** Textile parser for JavaScript
**
** Copyright (c) 2012 Borgar Þorsteinsson (MIT License).
**
*/

const merge = require('./merge');
const { parseFlow } = require('./textile/flow');
const { parseHtml } = require('./html');
const { Document, Element, RawNode, TextNode, CommentNode } = require('./Node');

function parse (tx, opt) {
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

function textile (sourceTx, opt) {
  // get a throw-away copy of options
  opt = Object.assign({}, textile.defaults, opt);
  // run the converter
  return parse(sourceTx, opt).toHTML();
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

textile.setOptions = textile.setoptions = opt => {
  merge(textile.defaults, opt);
  return this;
};

textile.parse = textile.convert = textile;
textile.parseHtml = parseHtml;

textile.parseTree = function (sourceTx, opt) {
  opt = Object.assign({}, textile.defaults, opt);
  return addLines(parse(sourceTx, opt), sourceTx);
};

module.exports = textile;
