const re = require('./re');
const Ribbon = require('./Ribbon');
const { Element, TextNode, CommentNode } = require('./Node');
const { singletons } = require('./constants');

re.pattern.html_id = '[a-zA-Z][a-zA-Z\\d:]*';
re.pattern.html_attr = '(?:"[^"]+"|\'[^\']+\'|[^>\\s]+)';

const reAttr = re.compile(/^\s*([^=\s]+)(?:\s*=\s*("[^"]+"|'[^']+'|[^>\s]+))?/);
const reComment = re.compile(/^<!--(.+?)-->/, 's');
const reEndTag = re.compile(/^<\/([:html_id:])([^>]*)>/);
const reTag = re.compile(/^<([:html_id:])((?:\s[^=\s/]+(?:\s*=\s*[:html_attr:])?)+)?\s*(\/?)>/);
const reHtmlTagBlock = re.compile(/^\s*<([:html_id:](?::[a-zA-Z\d]+)*)((?:\s[^=\s/]+(?:\s*=\s*[:html_attr:])?)+)?\s*(\/?)>/);

function testComment (src) {
  return reComment.exec(src);
}

function testOpenTagBlock (src) {
  return reHtmlTagBlock.exec(src);
}

function testOpenTag (src) {
  return reTag.exec(src);
}

function testCloseTag (src) {
  return reEndTag.exec(src);
}

function parseHtmlAttr (attrSrc) {
  // parse ATTR and add to element
  const attr = {};
  let m;
  if (attrSrc) {
    while ((m = reAttr.exec(attrSrc))) {
      attr[m[1]] = (typeof m[2] === 'string') ? m[2].replace(/^(["'])(.*)\1$/, '$2') : null;
      attrSrc = attrSrc.slice(m[0].length);
    }
  }
  return attr;
}

const OPEN = 'OPEN';
const CLOSE = 'CLOSE';
const SINGLE = 'SINGLE';
const TEXT = 'TEXT';
const COMMENT = 'COMMENT';
const WS = 'WS';

function tokenize (src, whitelistTags, lazy, offset) {
  const tokens = [];
  let textMode = false;
  const oktag = tag => {
    if (textMode) {
      return tag === textMode;
    }
    if (whitelistTags) {
      return tag in whitelistTags;
    }
    return true;
  };
  const nesting = {};
  let nestCount = 0;
  let m;

  src = new Ribbon(String(src), offset);

  do {
    // comment
    if ((m = testComment(src)) && oktag('!')) {
      tokens.push({
        type: COMMENT,
        data: m[1],
        pos: src.index,
        src: m[0]
      });
      src.advance(m[0]);
    }

    // end tag
    else if ((m = testCloseTag(src)) && oktag(m[1])) {
      const token = {
        type: CLOSE,
        tag: m[1],
        pos: src.index,
        src: m[0]
      };
      src.advance(m[0]);
      tokens.push(token);
      nesting[token.tag]--;
      nestCount--;
      // console.log( '/' + token.tag, nestCount, nesting );
      if (lazy && (
        !nestCount ||
        !nesting[token.tag] < 0 ||
        isNaN(nesting[token.tag])
      )) {
        return tokens;
      }
      // if parse is in text mode then that ends here
      if (textMode) {
        textMode = null;
      }
    }

    // open/void tag
    else if ((m = testOpenTag(src)) && oktag(m[1])) {
      const token = {
        type: m[3] || m[1] in singletons ? SINGLE : OPEN,
        tag: m[1],
        pos: src.index,
        src: m[0]
      };
      token.attr = parseHtmlAttr(m[2]);
      // token.attr = src.addOffset(parseHtmlAttr(m[2]));
      // some elements can move parser into "text" mode
      if (m[1] === 'script' || m[1] === 'code' || m[1] === 'style') {
        textMode = token.tag;
      }
      if (token.type === OPEN) {
        nestCount++;
        nesting[token.tag] = (nesting[token.tag] || 0) + 1;
      }
      tokens.push(token);
      src.advance(m[0]);
    }

    // text content
    else {
      // no match, move by all "uninteresting" chars
      m = /([^<]+|[^\0])/.exec(src);
      if (m) {
        tokens.push({
          type: TEXT,
          data: m[0],
          pos: src.index,
          src: m[0]
        });
      }
      src.advance(m ? m[0].length || 1 : 1);
    }
  }
  while (src.valueOf());

  return tokens;
}

// This "indesciminately" parses HTML text into a list of JSON-ML element
// No steps are taken however to prevent things like <table><p><td> - user can still create nonsensical but "well-formed" markup
function parse (tokens, lazy) {
  const root = new Element('root');
  const stack = [];
  let curr = root;
  let token;
  for (let i = 0; i < tokens.length; i++) {
    token = tokens[i];
    if (token.type === COMMENT) {
      // curr.push([ '!', token.data ]);
      curr.appendChild(new CommentNode(token.data));
    }
    else if (token.type === TEXT || token.type === WS) {
      // curr.push(token.data);
      curr.appendChild(new TextNode(token.data));
    }
    else if (token.type === SINGLE) {
      // curr.push(token.attr ? [ token.tag, token.attr ] : [ token.tag ]);
      curr.appendChild(new Element(token.tag, token.attr));
    }
    else if (token.type === OPEN) {
      // TODO: some things auto close other things: <td>, <li>, <p>, <table>
      // https://html.spec.whatwg.org/multipage/syntax.html#syntax-tag-omission
      // const elm = token.attr ? [ token.tag, token.attr ] : [ token.tag ];
      // curr.push(elm);
      const elm = curr.appendChild(new Element(token.tag, token.attr));
      stack.push(elm);
      curr = elm;
    }
    else if (token.type === CLOSE) {
      if (stack.length) {
        for (let i = stack.length - 1; i >= 0; i--) {
          const head = stack[i];
          if (head.tagName === token.tag) {
            stack.splice(i);
            curr = stack[stack.length - 1] || root;
            break;
          }
        }
      }
      if (!stack.length && lazy) {
        root.children.sourceLength = token.pos + token.src.length;
        return root.children;
      }
    }
  }
  root.children.sourceLength = token ? token.pos + token.src.length : 0;
  return root.children;
}

module.exports = {
  tokenize: tokenize,
  parseHtml: parse,
  parseHtmlAttr: parseHtmlAttr,
  testCloseTag: testCloseTag,
  testOpenTagBlock: testOpenTagBlock,
  testOpenTag: testOpenTag,
  testComment: testComment
};
