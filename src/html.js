import re from './re.js';
import { Element, TextNode, CommentNode, RawNode } from './VDOM.js';
import { singletons } from './constants.js';

re.pattern.html_id = '[a-zA-Z][a-zA-Z\\d:]*';
re.pattern.html_attr = '(?:"[^"]+"|\'[^\']+\'|[^>\\s]+)';

const reAttr = re.compile(/^\s*([^=\s]+)(?:\s*=\s*("[^"]+"|'[^']+'|[^>\s]+))?/);
const reComment = re.compile(/^<!--(.+?)-->/, 's');
const reEndTag = re.compile(/^<\/([:html_id:])([^>]*)>/);
const reTag = re.compile(/^<([:html_id:])((?:\s[^=\s/]+(?:\s*=\s*[:html_attr:])?)+)?\s*(\/?)>/);
const reHtmlTagBlock = re.compile(/^\s*<([:html_id:](?::[a-zA-Z\d]+)*)((?:\s[^=\s/]+(?:\s*=\s*[:html_attr:])?)+)?\s*(\/?)>/);

export function testComment (src) {
  return reComment.exec(src);
}

export function testOpenTagBlock (src) {
  return reHtmlTagBlock.exec(src);
}

export function testOpenTag (src) {
  return reTag.exec(src);
}

export function testCloseTag (src) {
  return reEndTag.exec(src);
}

export function parseHtmlAttr (attrSrc) {
  // parse ATTR and add to element
  const attr = {};
  let m;
  if (attrSrc) {
    while ((m = reAttr.exec(attrSrc))) {
      const attrName = m[1].toLowerCase();
      attr[attrName] = typeof m[2] === 'string'
        ? m[2].replace(/^(["'])(.*)\1$/, '$2')
        : null;
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

export function tokenize (src, whitelistTags, lazy) {
  const tokens = [];
  const nesting = {};
  let nestCount = 0;
  let m;
  let textMode = false;

  const isAllowed = tag => {
    if (textMode) {
      return tag === textMode;
    }
    if (whitelistTags) {
      return tag in whitelistTags;
    }
    return true;
  };

  do {
    // comment
    if ((m = testComment(src)) && isAllowed('!')) {
      tokens.push({
        type: COMMENT,
        data: m[1],
        index: src.index,
        offset: src.offset,
        src: m[0]
      });
      src.advance(m[0]);
    }

    // end tag
    else if ((m = testCloseTag(src)) && isAllowed(m[1])) {
      const token = {
        type: CLOSE,
        tag: m[1].toLowerCase(),
        index: src.index,
        offset: src.offset,
        src: m[0]
      };
      src.advance(m[0]);
      tokens.push(token);
      nesting[token.tag]--;
      nestCount--;
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
    else if ((m = testOpenTag(src)) && isAllowed(m[1])) {
      const tagName = m[1].toLowerCase();
      const token = {
        type: (m[3] || tagName in singletons) ? SINGLE : OPEN,
        tag: tagName,
        index: src.index,
        offset: src.offset,
        src: m[0]
      };
      token.attr = parseHtmlAttr(m[2]);
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
          index: src.index,
          offset: src.offset,
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
// No steps are taken however to prevent things like <table><p><td>,
// a user can still create nonsensical but "well-formed" markup
export function parseHtml (tokens, lazy, rawTextOnly = false) {
  const root = new Element('root');
  const stack = [];
  let curr = root;
  let token;
  for (let i = 0; i < tokens.length; i++) {
    token = tokens[i];
    if (token.type === COMMENT) {
      const node = new CommentNode(token.data);
      node.html = true;
      curr.appendChild(node);
    }
    else if (token.type === TEXT) {
      // if a PRE, CODE, or SCRIPT exists as a parent, use Raw text to prevent glyph convertions
      const isRawText = rawTextOnly || stack.some(d => /^(pre|code|script)$/i.test(d.tagName));
      const node = isRawText ? new RawNode(token.data) : new TextNode(token.data);
      node.html = true;
      curr.appendChild(node);
    }
    else if (token.type === SINGLE) {
      const node = new Element(token.tag, token.attr);
      node.setPos(token.offset, token.src.length);
      node.html = true;
      curr.appendChild(node);
    }
    else if (token.type === OPEN) {
      // TODO: some things auto close other things: <td>, <li>, <p>, <table>
      // https://html.spec.whatwg.org/multipage/syntax.html#syntax-tag-omission
      const node = new Element(token.tag, token.attr);
      // set singleton size, this is corrected on close
      node.setPos(token.offset, token.src.length);
      node.html = true;
      const elm = curr.appendChild(node);
      stack.push(elm);
      curr = elm;
    }
    else if (token.type === CLOSE) {
      if (stack.length) {
        for (let i = stack.length - 1; i >= 0; i--) {
          const head = stack[i];
          if (head.tagName === token.tag) {
            const closing = stack.splice(i);
            // adjust source position end for all closing container nodes
            for (let j = 0; j < closing.length; j++) {
              const pos = closing[j].pos;
              pos.end = token.offset + (j ? 0 : token.src.length);
            }
            curr = stack[stack.length - 1] || root;
            break;
          }
        }
      }
      if (!stack.length && lazy) {
        root.children.sourceLength = token.index + token.src.length;
        return root.children;
      }
    }
  }
  root.children.sourceLength = token ? token.index + token.src.length : 0;
  return root.children;
}
