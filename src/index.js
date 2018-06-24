/*
** Textile parser for JavaScript
**
** Copyright (c) 2012 Borgar Þorsteinsson (MIT License).
**
*/

const merge = require( './merge' );
const { toHTML } = require( './jsonml' );
const { parseFlow } = require( './textile/flow' );
const { parseHtml } = require( './html' );

function textile ( txt, opt ) {
  // get a throw-away copy of options
  opt = merge( merge({}, textile.defaults ), opt || {});
  // run the converter
  return parseFlow( txt, opt, opt.lineOffset ).map( toHTML ).join( '' );
};
module.exports = textile;

// options
textile.defaults = {
  // single-line linebreaks are converted to <br> by default
  'breaks': true,
  // by default, don't map the elements of HTML output, with the line numbers of input text
  'showOriginalLineNumber': false,
  // line number offset of the first char of input text, for showOriginalLineNumber option
  'lineOffset': 0
};
textile.setOptions = textile.setoptions = function ( opt ) {
  merge( textile.defaults, opt );
  return this;
};

textile.parse = textile.convert = textile;
textile.html_parser = parseHtml;

textile.jsonml = function ( txt, opt ) {
  // get a throw-away copy of options
  opt = merge( merge({}, textile.defaults ), opt || {});
  // parse and return tree
  return [ 'html' ].concat( parseFlow( txt, opt, opt.lineOffset ) );
};
textile.serialize = toHTML;
