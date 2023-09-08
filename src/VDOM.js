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

/**
 * Offsets in the Textile source for this node
 * @typedef {object} PosData
 * @property {number} [start] Where the node starts
 * @property {number} [end] Where the node ends
 */

/**
 * A basic textile VDOC node.
 *
 * @property {number} NODE Set to 0
 * @property {number} ELEMENT_NODE Set to 1
 * @property {number} HIDDEN_NODE Set to -2
 * @property {number} RAW_NODE Set to -1
 * @property {number} EXTENDED_NODE Set to -3
 * @property {number} TEXT_NODE Set to 3
 * @property {number} DOCUMENT_NODE Set to 9
 * @property {number} COMMENT_NODE Set to 8
 */
export class Node {
  constructor () {
    /**
     * TypeID of node
     * @type {number}
     */
    this.nodeType = NODE;
    /**
     * Position data for the node
     * @type {PosData}
     */
    this.pos = {};
  }

  /**
   * Emit the HTML source representation of this node and its children.
   *
   * @returns {string} HTML source string.
   */
  toHTML () {
    return '';
  }

  /**
   * Visit this function and all its descendants.
   * 
   * The visitor callback will be called for the node and every child in its
   * subtree. It will be supplied a single argument which will be the current
   * node.
   *
   * @param {Function} fn The visitor callback function
   * @returns {Node} The context node
   */
  visit (fn) {
    fn(this);
    if (this.children) {
      this.children.forEach(child => child.visit(fn));
    }
    return this;
  }

  /**
   * Sets the source position of the node.
   *
   * @param {number} start The start position
   * @param {number} length The length of the source
   * @returns {Node} The context node
   */
  setPos (start, length) {
    this.pos.start = start;
    this.pos.end = start + length;
    return this;
  }
}

/**
 * Textile VDOM text node.
 *
 * @property {number} NODE Set to 0
 * @property {number} ELEMENT_NODE Set to 1
 * @property {number} HIDDEN_NODE Set to -2
 * @property {number} RAW_NODE Set to -1
 * @property {number} EXTENDED_NODE Set to -3
 * @property {number} TEXT_NODE Set to 3
 * @property {number} DOCUMENT_NODE Set to 9
 * @property {number} COMMENT_NODE Set to 8
 * @augments Node
 */
export class TextNode extends Node {
  /**
   * Constructs a new TextNode
   *
   * @param {string} data The node's string data
   */
  constructor (data) {
    super();
    this.nodeType = TEXT_NODE;
    /** @type {string} */
    this.data = String(data);
  }

  toHTML () {
    return escape(this.data);
  }
}

/**
 * Textile VDOM raw-text node.
 *
 * Essentially this is the same as a TextNode except it does not merge with
 * textnodes, and is not post-processed by glyph replacers etc.
 * 
 * @property {number} NODE Set to 0
 * @property {number} ELEMENT_NODE Set to 1
 * @property {number} HIDDEN_NODE Set to -2
 * @property {number} RAW_NODE Set to -1
 * @property {number} EXTENDED_NODE Set to -3
 * @property {number} TEXT_NODE Set to 3
 * @property {number} DOCUMENT_NODE Set to 9
 * @property {number} COMMENT_NODE Set to 8
 * @augments Node
 */
export class RawNode extends Node {
  /**
   * Constructs a new RawNode
   *
   * @param {string} data The node's string data
   */
  constructor (data) {
    super();
    this.nodeType = RAW_NODE;
    /** @type {string} */
    this.data = String(data);
  }

  toHTML () {
    return escape(this.data);
  }
}

/**
 * Textile VDOM hidden node.
 * 
 * This node type is used to capture things that appear in the
 * textile markup, but do not need to be processed or rendered.
 *
 * @property {number} NODE Set to 0
 * @property {number} ELEMENT_NODE Set to 1
 * @property {number} HIDDEN_NODE Set to -2
 * @property {number} RAW_NODE Set to -1
 * @property {number} EXTENDED_NODE Set to -3
 * @property {number} TEXT_NODE Set to 3
 * @property {number} DOCUMENT_NODE Set to 9
 * @property {number} COMMENT_NODE Set to 8
 * @augments Node
 */
export class HiddenNode extends Node {
  /**
   * Constructs a new HiddenNode
   *
   * @param {string} data The node's string data
   */
  constructor (data) {
    super();
    this.nodeType = HIDDEN_NODE;
    /** @type {string} */
    this.data = String(data);
  }

  toHTML () {
    return '';
  }
}

/**
 * Textile VDOM comment node.
 * 
 * @property {number} NODE Set to 0
 * @property {number} ELEMENT_NODE Set to 1
 * @property {number} HIDDEN_NODE Set to -2
 * @property {number} RAW_NODE Set to -1
 * @property {number} EXTENDED_NODE Set to -3
 * @property {number} TEXT_NODE Set to 3
 * @property {number} DOCUMENT_NODE Set to 9
 * @property {number} COMMENT_NODE Set to 8
 * @augments Node
 */
export class CommentNode extends Node {
  /**
   * Constructs a new CommentNode
   *
   * @param {string} data The node's string data
   */
  constructor (data) {
    super();
    this.nodeType = COMMENT_NODE;
    /** @type {string} */
    this.data = String(data);
  }

  toHTML () {
    return `<!--${escape(this.data)}-->`;
  }
}


/**
 * Textile VDOM extended node container.
 * 
 * A container for the nodes that are a part of the same extended block.
 * 
 * @property {number} NODE Set to 0
 * @property {number} ELEMENT_NODE Set to 1
 * @property {number} HIDDEN_NODE Set to -2
 * @property {number} RAW_NODE Set to -1
 * @property {number} EXTENDED_NODE Set to -3
 * @property {number} TEXT_NODE Set to 3
 * @property {number} DOCUMENT_NODE Set to 9
 * @property {number} COMMENT_NODE Set to 8
 * @augments Node
 */
export class ExtendedNode extends Node {
  /**
   * Constructs a new ExtendedNode
   */
  constructor () {
    super();
    this.nodeType = EXTENDED_NODE;
    /** @type {Array<Node>} */
    this.children = [];
  }

  /**
   * Appends a node as a direct child of the current node.
   *
   * @param {Node} node The node to add
   * @returns {Node} The argument node is returned unchanged.
   */
  appendChild (node) {
    return appendTo(this, node);
  }

  toHTML () {
    return this.children.map(d => d.toHTML()).join('');
  }
}

/**
 * Textile VDOM Element node.
 * 
 * @property {number} NODE Set to 0
 * @property {number} ELEMENT_NODE Set to 1
 * @property {number} HIDDEN_NODE Set to -2
 * @property {number} RAW_NODE Set to -1
 * @property {number} EXTENDED_NODE Set to -3
 * @property {number} TEXT_NODE Set to 3
 * @property {number} DOCUMENT_NODE Set to 9
 * @property {number} COMMENT_NODE Set to 8
 * @augments Node
 */
export class Element extends Node {
  /**
   * Constructs a new Element.
   *
   * @param {string} tagName A tag name for the element
   * @param {Object<string, string>} attr A dictionary of attributes
   */
  constructor (tagName, attr) {
    super();
    /** @type {string} */
    this.tagName = tagName;
    this.nodeType = ELEMENT_NODE;
    /** @type {Object<string, string>} */
    this.attr = Object.assign({}, attr);
    /** @type {Array<Node>} */
    this.children = [];
  }

  /**
   * Add or drop tab indentation levels within the element.
   *
   * @param {number} shiftBy How much to increase/decrease the intentation.
   * @returns {Element} The current element.
   */
  reIndent (shiftBy) {
    // FIXME: move to a utility function that can be passed to node.visit()
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

  /**
   * Appends a node as a direct child of the current element.
   *
   * @param {Node} node The node to add
   * @returns {Node} The argument node is returned unchanged.
   */
  appendChild (node) {
    return appendTo(this, node);
  }

  /**
   * Insert a node immediatly before another node
   *
   * @param {Node} newNode The new node to insert
   * @param {Node} referenceNode The node which to insert before
   * @returns {Node} The newly inserted node
   */
  insertBefore (newNode, referenceNode) {
    const index = !!referenceNode && this.children.indexOf(referenceNode);
    const finalIndex = index < 0 || typeof index !== 'number' ? Infinity : index;
    this.children.splice(finalIndex, 0, newNode);
    return newNode;
  }

  /**
   * Removes a child from the current element.
   *
   * @param {Node} oldNode The node that should be detachde from this parent
   * @returns {Node} The detached node
   */
  removeChild (oldNode) {
    const index = !!oldNode && this.children.indexOf(oldNode);
    if (index >= 0) {
      this.children.splice(index, 1);
    }
    return oldNode;
  }

  /**
   * The first child of this element.
   *
   * @type {Node | undefined}
   */
  get firstChild () {
    return this.children[0];
  }

  /**
   * Apply a set attributes onto this element.
   *
   * @param {Object<string, string>} attr A dict of attributes to apply
   */
  setAttr (attr) {
    for (const key in attr) {
      this.setAttribute(key, attr[key]);
    }
  }

  toHTML () {
    const { tagName, children } = this;
    if (tagName && children) {
      // be careful about adding whitespace here for inline elements
      if (tagName in singletons || (tagName.includes(':') && !children.length)) {
        return `<${tagName}${renderAttr(this.attr)} />`;
      }
      else {
        const innerHTML = this.children.map(d => d.toHTML());
        return `<${tagName}${renderAttr(this.attr)}>${innerHTML.join('')}</${tagName}>`;
      }
    }
    return '';
  }

  /**
   * Read an attribute of this element.
   *
   * @param {string} name The name of the attribute
   * @returns {string|null} The attribute value
   */
  getAttribute (name) {
    return name in this.attr ? this.attr[name] : null;
  }

  /**
   * Set the attribute of this element.
   *
   * @param {string} name The name of the attribute
   * @param {string|null} value The attribute value
   */
  setAttribute (name, value) {
    this.attr[name] = value;
  }
}

/**
 * Textile VDOM document node.
 * 
 * @property {number} NODE Set to 0
 * @property {number} ELEMENT_NODE Set to 1
 * @property {number} HIDDEN_NODE Set to -2
 * @property {number} RAW_NODE Set to -1
 * @property {number} EXTENDED_NODE Set to -3
 * @property {number} TEXT_NODE Set to 3
 * @property {number} DOCUMENT_NODE Set to 9
 * @property {number} COMMENT_NODE Set to 8
 * @augments Node
 */
export class Document extends Node {
  constructor () {
    super();
    this.nodeType = DOCUMENT_NODE;
    /** @type {Array<Node>} */
    this.children = [];
  }

  toHTML () {
    return this.children.map(d => d.toHTML()).join('');
  }

  /**
   * The first child of this element.
   *
   * @type {Node | undefined}
   */
  get firstChild () {
    return this.children[0];
  }

  /**
   * Appends a node as a direct child of the current element.
   *
   * @param {Node} node The node to add
   * @returns {Node} The argument node is returned unchanged.
   */
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
