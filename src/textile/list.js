/* textile list parser */
import re from '../re.js';
import { Element, TextNode } from '../VDOM.js';
import { parseAttr } from './attr.js';
import { parseInline } from './inline.js';
import { txlisthd, txlisthd2 } from './re_ext.js';

re.pattern.txlisthd = txlisthd;
re.pattern.txlisthd2 = txlisthd2;

const reList = re.compile(/^((?:[:txlisthd:][^\0]*?(?:\r?\n|$))+)(\s*\n|$)/, 's');
const reItem = re.compile(/^([#*]+)([^\0]+?)(\n(?=[:txlisthd2:])|$) */, 's');

const listPad = n => {
  return '\n' + '\t'.repeat(n);
};

export function testList (src) {
  return reList.exec(src);
}

export function parseList (src, options) {
  const maybeMoveAttr = node => {
    if (node.attrCount === 1) {
      const firstChild = node.ul.children.find(d => d.tagName === 'li');
      Object.assign(node.ul.attr, firstChild.attr);
      firstChild.attr = {};
    }
  };

  const stack = [];
  const currIndex = {};
  const lastIndex = options._lst || {};
  let itemIndex = 0;
  let listAttr;
  let m;
  let n;
  let s;

  while ((m = reItem.exec(src))) {
    const item = new Element('li');
    item.setPos(src.offset, m[0].length);
    const destLevel = m[1].length;
    let newLi = null;
    let parent;
    let pba;
    const inner = src.sub(destLevel, m[2].length);

    // list starts and continuations
    if ((n = /^(_|\d+)/.exec(inner))) {
      itemIndex = isFinite(n[1])
        ? parseInt(n[1], 10)
        : lastIndex[destLevel] || currIndex[destLevel] || 1;
      inner.advance(n[1].length);
    }

    const [ step, attr ] = parseAttr(inner, 'li');
    if (step) {
      inner.advance(step);
      pba = attr;
    }

    // list control
    if (/^\.\s*$/.test(inner)) {
      listAttr = { ...pba };
      src.advance(m[0]);
      continue;
    }

    // create nesting until we have correct level
    const startPos = src.offset;
    const len = m[0].length;
    while (stack.length < destLevel) {
      const listType = (m[1].substr(-1) === '#') ? 'ol' : 'ul';
      newLi = new Element('li').setPos(startPos, len);
      const ul = new Element(listType).setPos(startPos, len);
      item.setPos(startPos, len);
      ul.appendChild(new TextNode(listPad(stack.length + 1)));
      ul.appendChild(newLi);
      parent = stack[stack.length - 1];
      if (parent) {
        parent.li.appendChild([
          new TextNode(listPad(stack.length)),
          ul
        ]);
      }
      stack.push({
        ul: ul,
        li: newLi,
        // count attributes's found per list
        attrCount: 0
      });
      currIndex[stack.length] = 1;
    }

    // remove nesting until we have correct level
    while (stack.length > destLevel) {
      const ret = stack.pop();
      ret.ul.appendChild(new TextNode(listPad(stack.length)));
      maybeMoveAttr(ret);
    }

    // parent list
    parent = stack[stack.length - 1];

    if (itemIndex) {
      parent.ul.setAttribute('start', itemIndex);
      currIndex[destLevel] = itemIndex;
      // falsy prevents this from fireing until it is set again
      itemIndex = 0;
    }
    if (listAttr) {
      // "more than 1" prevent attribute transfers on list close
      parent.attrCount = 9;
      parent.ul.setAttr(listAttr);
      listAttr = null;
    }

    if (!newLi) {
      parent.ul.appendChild([
        new TextNode(listPad(stack.length)),
        item
      ]);
      parent.li = item;
    }
    if (pba) {
      parent.li.setAttr(pba);
      parent.attrCount++;
    }
    parent.li.appendChild(parseInline(inner.trim(), options));

    src.advance(m[0]);
    currIndex[destLevel] = (currIndex[destLevel] || 0) + 1;
  }

  // remember indexes for continuations next time
  options._lst = currIndex;

  while (stack.length) {
    s = stack.pop();
    s.ul.appendChild(new TextNode(listPad(stack.length)));
    maybeMoveAttr(s);
  }

  return s.ul;
}
