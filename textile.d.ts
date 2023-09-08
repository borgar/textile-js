/** Textile VDOM comment node. */
export declare class CommentNode extends Node {
    /**
     * Constructs a new CommentNode
     *
     * @param data The node's string data
     */
    constructor(data: string);
    data: string;
    /** TypeID of node */
    nodeType: number;
    /** Position data for the node */
    pos: PosData;
    /**
     * Sets the source position of the node.
     *
     * @param start The start position
     * @param length The length of the source
     * @returns The context node
     */
    setPos(start: number, length: number): Node;
    /**
     * Emit the HTML source representation of this node and its children.
     *
     * @returns HTML source string.
     */
    toHTML(): string;
    /**
     * Visit this function and all its descendants.
     * The visitor callback will be called for the node and every child in its
     * subtree. It will be supplied a single argument which will be the current
     * node.
     *
     * @param fn The visitor callback function
     * @returns The context node
     */
    visit(fn: Function): Node;
    /** Set to 8 */
    static COMMENT_NODE: number;
    /** Set to 9 */
    static DOCUMENT_NODE: number;
    /** Set to 1 */
    static ELEMENT_NODE: number;
    /** Set to -3 */
    static EXTENDED_NODE: number;
    /** Set to -2 */
    static HIDDEN_NODE: number;
    /** Set to 0 */
    static NODE: number;
    /** Set to -1 */
    static RAW_NODE: number;
    /** Set to 3 */
    static TEXT_NODE: number;
}

/** Textile VDOM document node. */
export declare class Document extends Node {
    /**
     * Appends a node as a direct child of the current element.
     *
     * @param node The node to add
     * @returns The argument node is returned unchanged.
     */
    appendChild(node: Node): Node;
    children: Array<Node>;
    /** The first child of this element. */
    firstChild: (Node | undefined);
    /** TypeID of node */
    nodeType: number;
    /** Position data for the node */
    pos: PosData;
    /**
     * Sets the source position of the node.
     *
     * @param start The start position
     * @param length The length of the source
     * @returns The context node
     */
    setPos(start: number, length: number): Node;
    /**
     * Emit the HTML source representation of this node and its children.
     *
     * @returns HTML source string.
     */
    toHTML(): string;
    /**
     * Visit this function and all its descendants.
     * The visitor callback will be called for the node and every child in its
     * subtree. It will be supplied a single argument which will be the current
     * node.
     *
     * @param fn The visitor callback function
     * @returns The context node
     */
    visit(fn: Function): Node;
    /** Set to 8 */
    static COMMENT_NODE: number;
    /** Set to 9 */
    static DOCUMENT_NODE: number;
    /** Set to 1 */
    static ELEMENT_NODE: number;
    /** Set to -3 */
    static EXTENDED_NODE: number;
    /** Set to -2 */
    static HIDDEN_NODE: number;
    /** Set to 0 */
    static NODE: number;
    /** Set to -1 */
    static RAW_NODE: number;
    /** Set to 3 */
    static TEXT_NODE: number;
}

/** Textile VDOM Element node. */
export declare class Element extends Node {
    /**
     * Constructs a new Element.
     *
     * @param tagName A tag name for the element
     * @param attr A dictionary of attributes
     */
    constructor(tagName: string, attr: Record<string, string>);
    /**
     * Appends a node as a direct child of the current element.
     *
     * @param node The node to add
     * @returns The argument node is returned unchanged.
     */
    appendChild(node: Node): Node;
    attr: Record<string, string>;
    children: Array<Node>;
    /** The first child of this element. */
    firstChild: (Node | undefined);
    /**
     * Read an attribute of this element.
     *
     * @param name The name of the attribute
     * @returns The attribute value
     */
    getAttribute(name: string): (string | null);
    /**
     * Insert a node immediatly before another node
     *
     * @param newNode The new node to insert
     * @param referenceNode The node which to insert before
     * @returns The newly inserted node
     */
    insertBefore(newNode: Node, referenceNode: Node): Node;
    /** TypeID of node */
    nodeType: number;
    /** Position data for the node */
    pos: PosData;
    /**
     * Add or drop tab indentation levels within the element.
     *
     * @param shiftBy How much to increase/decrease the intentation.
     * @returns The current element.
     */
    reIndent(shiftBy: number): Element;
    /**
     * Removes a child from the current element.
     *
     * @param oldNode The node that should be detachde from this parent
     * @returns The detached node
     */
    removeChild(oldNode: Node): Node;
    /**
     * Apply a set attributes onto this element.
     *
     * @param attr A dict of attributes to apply
     */
    setAttr(attr: Record<string, string>): void;
    /**
     * Set the attribute of this element.
     *
     * @param name The name of the attribute
     * @param value The attribute value
     */
    setAttribute(name: string, value: (string | null)): void;
    /**
     * Sets the source position of the node.
     *
     * @param start The start position
     * @param length The length of the source
     * @returns The context node
     */
    setPos(start: number, length: number): Node;
    tagName: string;
    /**
     * Emit the HTML source representation of this node and its children.
     *
     * @returns HTML source string.
     */
    toHTML(): string;
    /**
     * Visit this function and all its descendants.
     * The visitor callback will be called for the node and every child in its
     * subtree. It will be supplied a single argument which will be the current
     * node.
     *
     * @param fn The visitor callback function
     * @returns The context node
     */
    visit(fn: Function): Node;
    /** Set to 8 */
    static COMMENT_NODE: number;
    /** Set to 9 */
    static DOCUMENT_NODE: number;
    /** Set to 1 */
    static ELEMENT_NODE: number;
    /** Set to -3 */
    static EXTENDED_NODE: number;
    /** Set to -2 */
    static HIDDEN_NODE: number;
    /** Set to 0 */
    static NODE: number;
    /** Set to -1 */
    static RAW_NODE: number;
    /** Set to 3 */
    static TEXT_NODE: number;
}

/**
 * Textile VDOM extended node container.
 * A container for the nodes that are a part of the same extended block.
 */
export declare class ExtendedNode extends Node {
    /**
     * Appends a node as a direct child of the current node.
     *
     * @param node The node to add
     * @returns The argument node is returned unchanged.
     */
    appendChild(node: Node): Node;
    children: Array<Node>;
    /** TypeID of node */
    nodeType: number;
    /** Position data for the node */
    pos: PosData;
    /**
     * Sets the source position of the node.
     *
     * @param start The start position
     * @param length The length of the source
     * @returns The context node
     */
    setPos(start: number, length: number): Node;
    /**
     * Emit the HTML source representation of this node and its children.
     *
     * @returns HTML source string.
     */
    toHTML(): string;
    /**
     * Visit this function and all its descendants.
     * The visitor callback will be called for the node and every child in its
     * subtree. It will be supplied a single argument which will be the current
     * node.
     *
     * @param fn The visitor callback function
     * @returns The context node
     */
    visit(fn: Function): Node;
    /** Set to 8 */
    static COMMENT_NODE: number;
    /** Set to 9 */
    static DOCUMENT_NODE: number;
    /** Set to 1 */
    static ELEMENT_NODE: number;
    /** Set to -3 */
    static EXTENDED_NODE: number;
    /** Set to -2 */
    static HIDDEN_NODE: number;
    /** Set to 0 */
    static NODE: number;
    /** Set to -1 */
    static RAW_NODE: number;
    /** Set to 3 */
    static TEXT_NODE: number;
}

/**
 * Textile VDOM hidden node.
 * This node type is used to capture things that appear in the
 * textile markup, but do not need to be processed or rendered.
 */
export declare class HiddenNode extends Node {
    /**
     * Constructs a new HiddenNode
     *
     * @param data The node's string data
     */
    constructor(data: string);
    data: string;
    /** TypeID of node */
    nodeType: number;
    /** Position data for the node */
    pos: PosData;
    /**
     * Sets the source position of the node.
     *
     * @param start The start position
     * @param length The length of the source
     * @returns The context node
     */
    setPos(start: number, length: number): Node;
    /**
     * Emit the HTML source representation of this node and its children.
     *
     * @returns HTML source string.
     */
    toHTML(): string;
    /**
     * Visit this function and all its descendants.
     * The visitor callback will be called for the node and every child in its
     * subtree. It will be supplied a single argument which will be the current
     * node.
     *
     * @param fn The visitor callback function
     * @returns The context node
     */
    visit(fn: Function): Node;
    /** Set to 8 */
    static COMMENT_NODE: number;
    /** Set to 9 */
    static DOCUMENT_NODE: number;
    /** Set to 1 */
    static ELEMENT_NODE: number;
    /** Set to -3 */
    static EXTENDED_NODE: number;
    /** Set to -2 */
    static HIDDEN_NODE: number;
    /** Set to 0 */
    static NODE: number;
    /** Set to -1 */
    static RAW_NODE: number;
    /** Set to 3 */
    static TEXT_NODE: number;
}

/** A basic textile VDOC node. */
export declare class Node {
    /** TypeID of node */
    nodeType: number;
    /** Position data for the node */
    pos: PosData;
    /**
     * Sets the source position of the node.
     *
     * @param start The start position
     * @param length The length of the source
     * @returns The context node
     */
    setPos(start: number, length: number): Node;
    /**
     * Emit the HTML source representation of this node and its children.
     *
     * @returns HTML source string.
     */
    toHTML(): string;
    /**
     * Visit this function and all its descendants.
     * The visitor callback will be called for the node and every child in its
     * subtree. It will be supplied a single argument which will be the current
     * node.
     *
     * @param fn The visitor callback function
     * @returns The context node
     */
    visit(fn: Function): Node;
    /** Set to 8 */
    static COMMENT_NODE: number;
    /** Set to 9 */
    static DOCUMENT_NODE: number;
    /** Set to 1 */
    static ELEMENT_NODE: number;
    /** Set to -3 */
    static EXTENDED_NODE: number;
    /** Set to -2 */
    static HIDDEN_NODE: number;
    /** Set to 0 */
    static NODE: number;
    /** Set to -1 */
    static RAW_NODE: number;
    /** Set to 3 */
    static TEXT_NODE: number;
}

/**
 * Textile VDOM raw-text node.
 * Essentially this is the same as a TextNode except it does not merge with
 * textnodes, and is not post-processed by glyph replacers etc.
 */
export declare class RawNode extends Node {
    /**
     * Constructs a new RawNode
     *
     * @param data The node's string data
     */
    constructor(data: string);
    data: string;
    /** TypeID of node */
    nodeType: number;
    /** Position data for the node */
    pos: PosData;
    /**
     * Sets the source position of the node.
     *
     * @param start The start position
     * @param length The length of the source
     * @returns The context node
     */
    setPos(start: number, length: number): Node;
    /**
     * Emit the HTML source representation of this node and its children.
     *
     * @returns HTML source string.
     */
    toHTML(): string;
    /**
     * Visit this function and all its descendants.
     * The visitor callback will be called for the node and every child in its
     * subtree. It will be supplied a single argument which will be the current
     * node.
     *
     * @param fn The visitor callback function
     * @returns The context node
     */
    visit(fn: Function): Node;
    /** Set to 8 */
    static COMMENT_NODE: number;
    /** Set to 9 */
    static DOCUMENT_NODE: number;
    /** Set to 1 */
    static ELEMENT_NODE: number;
    /** Set to -3 */
    static EXTENDED_NODE: number;
    /** Set to -2 */
    static HIDDEN_NODE: number;
    /** Set to 0 */
    static NODE: number;
    /** Set to -1 */
    static RAW_NODE: number;
    /** Set to 3 */
    static TEXT_NODE: number;
}

/** Textile VDOM text node. */
export declare class TextNode extends Node {
    /**
     * Constructs a new TextNode
     *
     * @param data The node's string data
     */
    constructor(data: string);
    data: string;
    /** TypeID of node */
    nodeType: number;
    /** Position data for the node */
    pos: PosData;
    /**
     * Sets the source position of the node.
     *
     * @param start The start position
     * @param length The length of the source
     * @returns The context node
     */
    setPos(start: number, length: number): Node;
    /**
     * Emit the HTML source representation of this node and its children.
     *
     * @returns HTML source string.
     */
    toHTML(): string;
    /**
     * Visit this function and all its descendants.
     * The visitor callback will be called for the node and every child in its
     * subtree. It will be supplied a single argument which will be the current
     * node.
     *
     * @param fn The visitor callback function
     * @returns The context node
     */
    visit(fn: Function): Node;
    /** Set to 8 */
    static COMMENT_NODE: number;
    /** Set to 9 */
    static DOCUMENT_NODE: number;
    /** Set to 1 */
    static ELEMENT_NODE: number;
    /** Set to -3 */
    static EXTENDED_NODE: number;
    /** Set to -2 */
    static HIDDEN_NODE: number;
    /** Set to 0 */
    static NODE: number;
    /** Set to -1 */
    static RAW_NODE: number;
    /** Set to 3 */
    static TEXT_NODE: number;
}

/**
 * Parse Textile markup and return a "VDOM" tree.
 *
 * @param source The source transmit
 * @param options Parsing options
 * @param [options.allowed_block_tags] Which HTML tags in the document trigger HTML parsing (def: div, blockquote, ...)
 * @param [options.auto_backlink=true] Automatically backlink footnotes, regardless of syntax used
 * @param [options.blocked_uri] A list of blocked href protocols (def: javascript, vbscript, data)
 * @param [options.breaks=true] Convert single-line linebreaks to <br>
 * @param [options.glyph_entities=true] Convert entity markup (->) to glyphs (→)
 * @param [options.id_prefix=true] Footnotes and endnote HTML IDs are prefixed with a string (as set here) or number (if true)
 * @returns A textile Document node
 */
export declare function parseTree(source: string, options: {
    /** Which HTML tags in the document trigger HTML parsing (def: div, blockquote, ...) */
    allowed_block_tags?: Array<string>;
    /** Automatically backlink footnotes, regardless of syntax used */
    auto_backlink?: boolean;
    /** A list of blocked href protocols (def: javascript, vbscript, data) */
    blocked_uri?: Array<string>;
    /** Convert single-line linebreaks to <br> */
    breaks?: boolean;
    /** Convert entity markup (->) to glyphs (→) */
    glyph_entities?: boolean;
    /** Footnotes and endnote HTML IDs are prefixed with a string (as set here) or number (if true) */
    id_prefix?: (boolean | string);
}): Document;

/**
 * Convert Textile markup to HTML markup.
 *
 * @param source The source transmit
 * @param options Parsing options
 * @param [options.allowed_block_tags] Which HTML tags in the document trigger HTML parsing (def: div, blockquote, ...)
 * @param [options.auto_backlink=true] Automatically backlink footnotes, regardless of syntax used
 * @param [options.blocked_uri] A list of blocked href protocols (def: javascript, vbscript, data)
 * @param [options.breaks=true] Convert single-line linebreaks to <br>
 * @param [options.glyph_entities=true] Convert entity markup (->) to glyphs (→)
 * @param [options.id_prefix=true] Footnotes and endnote HTML IDs are prefixed with a string (as set here) or number (if true)
 * @returns HTML source string
 */
export declare function textile(source: string, options: {
    /** Which HTML tags in the document trigger HTML parsing (def: div, blockquote, ...) */
    allowed_block_tags?: Array<string>;
    /** Automatically backlink footnotes, regardless of syntax used */
    auto_backlink?: boolean;
    /** A list of blocked href protocols (def: javascript, vbscript, data) */
    blocked_uri?: Array<string>;
    /** Convert single-line linebreaks to <br> */
    breaks?: boolean;
    /** Convert entity markup (->) to glyphs (→) */
    glyph_entities?: boolean;
    /** Footnotes and endnote HTML IDs are prefixed with a string (as set here) or number (if true) */
    id_prefix?: (boolean | string);
}): string;

/** Offsets in the Textile source for this node */
export declare type PosData = {
    /** Where the node ends */
    end?: number;
    /** Where the node starts */
    start?: number;
};

