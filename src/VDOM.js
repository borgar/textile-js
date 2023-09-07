import { singletons } from './constants.js';

const EXTENDED_NODE = -3;
const HIDDEN_NODE = -2;
const RAW_NODE = -1;
const NODE = 0;
const ELEMENT_NODE = 1;
const TEXT_NODE = 3;
const DOCUMENT_NODE = 9;
const COMMENT_NODE =  8;

function escape (text, escapeQuotes) {
  return text.replace(/&(?!(#\d{2,}|#x[\da-fA-F]{2,}|[a-zA-Z][a-zA-Z1-4]{1,6});)/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, escapeQuotes ? '&quot;' : '"')
    .replace(/'/g, escapeQuotes ? '&#39;' : "'");
}

function renderAttr (attr) {
  let tagAttrs = '';
  for (const a in attr) {
    if (a[0] !== '_') {
      tagAttrs += (attr[a] == null)
        ? ` ${a}`
        : ` ${a}="${escape(String(attr[a]), true)}"`;
    }
  }
  return tagAttrs;
}

function appendTo (parent, child) {
  // FIXME: implement NodeList?
  if (Array.isArray(child)) {
    child.forEach(n => parent.appendChild(n));
  }
  else {
    // RAW nodes should be joined as well
    if (child.nodeType === TEXT_NODE || child.nodeType === RAW_NODE) {
      const lastChild = parent.children[parent.children.length - 1];
      if (lastChild && lastChild.nodeType === child.nodeType) {
        lastChild.data += child.data;
        return lastChild;
      }
    }
    parent.children.push(child);
  }
  return child;
}


export class Node {
  constructor () {
    this.nodeType = NODE;
    this.pos = {};
  }

  toHTML () {
    const { tagName, children } = this;
    if (!tagName) {
      return '';
    }
    // be careful about adding whitespace here for inline elements
    if (tagName in singletons || (tagName.includes(':') && !children.length)) {
      return `<${tagName}${renderAttr(this.attr)} />`;
    }
    else {
      const innerHTML = this.children.map(d => d.toHTML());
      return `<${tagName}${renderAttr(this.attr)}>${innerHTML.join('')}</${tagName}>`;
    }
  }

  visit (fn) {
    fn(this);
    if (this.children) {
      this.children.forEach(child => child.visit(fn));
    }
    return this;
  }

  setPos (start, length) {
    this.pos.start = start;
    this.pos.end = start + length;
    return this;
  }
}


export class TextNode extends Node {
  constructor (data) {
    super();
    this.nodeType = TEXT_NODE;
    this.data = String(data);
  }

  toHTML () {
    return escape(this.data);
  }
}


// Essentially this is the same as a textnode except it should not
// merge with textnodes, and should not be post-processed.
export class RawNode extends Node {
  constructor (data) {
    super();
    this.nodeType = RAW_NODE;
    this.data = String(data);
  }

  toHTML () {
    return escape(this.data);
  }
}


export class HiddenNode extends Node {
  constructor (data) {
    super();
    this.nodeType = HIDDEN_NODE;
    this.data = String(data);
  }

  toHTML () {
    return '';
  }
}


export class CommentNode extends Node {
  constructor (data) {
    super();
    this.nodeType = COMMENT_NODE;
    this.data = String(data);
  }

  toHTML () {
    return `<!--${escape(this.data)}-->`;
  }
}


export class ExtendedNode extends Node {
  constructor () {
    super();
    this.nodeType = EXTENDED_NODE;
    this.children = [];
  }

  appendChild (node) {
    return appendTo(this, node);
  }

  toHTML () {
    return this.children.map(d => d.toHTML()).join('');
  }
}


export class Element extends Node {
  constructor (tagName, attr) {
    super();
    this.tagName = tagName;
    this.nodeType = ELEMENT_NODE;
    this.attr = Object.assign({}, attr);
    this.children = [];
  }

  // FIXME: move to a utility function that can be passed to node.visit()
  // drop or add tab levels
  reIndent (shiftBy) {
    if (shiftBy) {
      const children = this.children;
      children.forEach(child => {
        if (child instanceof TextNode) {
          if (/^\n\t+/.test(child.data)) {
            if (shiftBy < 0) {
              child.data = child.data.slice(0, shiftBy);
            }
            else {
              for (let i = 0; i < shiftBy; i++) {
                child.data += '\t';
              }
            }
          }
        }
        else if (child instanceof Element) {
          child.reIndent(shiftBy);
        }
      });
    }
    return this;
  }

  appendChild (node) {
    return appendTo(this, node);
  }

  insertBefore (newNode, referenceNode) {
    const index = !!referenceNode && this.children.indexOf(referenceNode);
    const finalIndex = index < 0 || typeof index !== 'number' ? Infinity : index;
    this.children.splice(finalIndex, 0, newNode);
    return newNode;
  }

  removeChild (oldNode) {
    const index = !!oldNode && this.children.indexOf(oldNode);
    if (index >= 0) {
      this.children.splice(index, 1);
    }
    return oldNode;
  }

  get firstChild () {
    return this.children[0];
  }

  setAttr (attr) {
    for (const key in attr) {
      this.setAttribute(key, attr[key]);
    }
  }

  getAttribute (name) {
    return name in this.attr ? this.attr[name] : null;
  }

  setAttribute (name, value) {
    this.attr[name] = value;
  }
}


export class Document extends Node {
  constructor () {
    super();
    this.nodeType = DOCUMENT_NODE;
    this.children = [];
  }

  toHTML () {
    return this.children.map(d => d.toHTML()).join('');
  }

  get firstChild () {
    return this.children[0];
  }

  appendChild (node) {
    return appendTo(this, node);
  }
}


// expose constants as static props
[ CommentNode, Document, Element, ExtendedNode, HiddenNode, Node, RawNode, TextNode ]
  .forEach(d => {
    d.NODE = NODE;
    d.ELEMENT_NODE = ELEMENT_NODE;
    d.HIDDEN_NODE = HIDDEN_NODE;
    d.RAW_NODE = RAW_NODE;
    d.EXTENDED_NODE = EXTENDED_NODE;
    d.TEXT_NODE = TEXT_NODE;
    d.DOCUMENT_NODE = DOCUMENT_NODE;
    d.COMMENT_NODE = COMMENT_NODE;
  });
