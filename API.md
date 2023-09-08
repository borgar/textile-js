# textile-js API

**Classes**

- [CommentNode( data )](#CommentNode)
  - [.constructor( data )](#CommentNode.constructor)
  - [.data](#CommentNode.data)
  - [.nodeType](#CommentNode.nodeType)
  - [.pos](#CommentNode.pos)
  - [.setPos( start, length )](#CommentNode.setPos)
  - [.toHTML()](#CommentNode.toHTML)
  - [.visit( fn )](#CommentNode.visit)
  - [`static`COMMENT_NODE](#COMMENT_NODE)
  - [`static`DOCUMENT_NODE](#DOCUMENT_NODE)
  - [`static`ELEMENT_NODE](#ELEMENT_NODE)
  - [`static`EXTENDED_NODE](#EXTENDED_NODE)
  - [`static`HIDDEN_NODE](#HIDDEN_NODE)
  - [`static`NODE](#NODE)
  - [`static`RAW_NODE](#RAW_NODE)
  - [`static`TEXT_NODE](#TEXT_NODE)
- [Document()](#Document)
  - [.appendChild( node )](#Document.appendChild)
  - [.children](#Document.children)
  - [.firstChild()](#Document.firstChild)
  - [.nodeType](#Document.nodeType)
  - [.pos](#Document.pos)
  - [.setPos( start, length )](#Document.setPos)
  - [.toHTML()](#Document.toHTML)
  - [.visit( fn )](#Document.visit)
  - [`static`COMMENT_NODE](#COMMENT_NODE)
  - [`static`DOCUMENT_NODE](#DOCUMENT_NODE)
  - [`static`ELEMENT_NODE](#ELEMENT_NODE)
  - [`static`EXTENDED_NODE](#EXTENDED_NODE)
  - [`static`HIDDEN_NODE](#HIDDEN_NODE)
  - [`static`NODE](#NODE)
  - [`static`RAW_NODE](#RAW_NODE)
  - [`static`TEXT_NODE](#TEXT_NODE)
- [Element( tagName, attr )](#Element)
  - [.constructor( tagName, attr )](#Element.constructor)
  - [.appendChild( node )](#Element.appendChild)
  - [.attr](#Element.attr)
  - [.children](#Element.children)
  - [.firstChild()](#Element.firstChild)
  - [.getAttribute( name )](#Element.getAttribute)
  - [.insertBefore( newNode, referenceNode )](#Element.insertBefore)
  - [.nodeType](#Element.nodeType)
  - [.pos](#Element.pos)
  - [.reIndent( shiftBy )](#Element.reIndent)
  - [.removeChild( oldNode )](#Element.removeChild)
  - [.setAttr( attr )](#Element.setAttr)
  - [.setAttribute( name, value )](#Element.setAttribute)
  - [.setPos( start, length )](#Element.setPos)
  - [.tagName](#Element.tagName)
  - [.toHTML()](#Element.toHTML)
  - [.visit( fn )](#Element.visit)
  - [`static`COMMENT_NODE](#COMMENT_NODE)
  - [`static`DOCUMENT_NODE](#DOCUMENT_NODE)
  - [`static`ELEMENT_NODE](#ELEMENT_NODE)
  - [`static`EXTENDED_NODE](#EXTENDED_NODE)
  - [`static`HIDDEN_NODE](#HIDDEN_NODE)
  - [`static`NODE](#NODE)
  - [`static`RAW_NODE](#RAW_NODE)
  - [`static`TEXT_NODE](#TEXT_NODE)
- [ExtendedNode()](#ExtendedNode)
  - [.appendChild( node )](#ExtendedNode.appendChild)
  - [.children](#ExtendedNode.children)
  - [.nodeType](#ExtendedNode.nodeType)
  - [.pos](#ExtendedNode.pos)
  - [.setPos( start, length )](#ExtendedNode.setPos)
  - [.toHTML()](#ExtendedNode.toHTML)
  - [.visit( fn )](#ExtendedNode.visit)
  - [`static`COMMENT_NODE](#COMMENT_NODE)
  - [`static`DOCUMENT_NODE](#DOCUMENT_NODE)
  - [`static`ELEMENT_NODE](#ELEMENT_NODE)
  - [`static`EXTENDED_NODE](#EXTENDED_NODE)
  - [`static`HIDDEN_NODE](#HIDDEN_NODE)
  - [`static`NODE](#NODE)
  - [`static`RAW_NODE](#RAW_NODE)
  - [`static`TEXT_NODE](#TEXT_NODE)
- [HiddenNode( data )](#HiddenNode)
  - [.constructor( data )](#HiddenNode.constructor)
  - [.data](#HiddenNode.data)
  - [.nodeType](#HiddenNode.nodeType)
  - [.pos](#HiddenNode.pos)
  - [.setPos( start, length )](#HiddenNode.setPos)
  - [.toHTML()](#HiddenNode.toHTML)
  - [.visit( fn )](#HiddenNode.visit)
  - [`static`COMMENT_NODE](#COMMENT_NODE)
  - [`static`DOCUMENT_NODE](#DOCUMENT_NODE)
  - [`static`ELEMENT_NODE](#ELEMENT_NODE)
  - [`static`EXTENDED_NODE](#EXTENDED_NODE)
  - [`static`HIDDEN_NODE](#HIDDEN_NODE)
  - [`static`NODE](#NODE)
  - [`static`RAW_NODE](#RAW_NODE)
  - [`static`TEXT_NODE](#TEXT_NODE)
- [Node()](#Node)
  - [.nodeType](#Node.nodeType)
  - [.pos](#Node.pos)
  - [.setPos( start, length )](#Node.setPos)
  - [.toHTML()](#Node.toHTML)
  - [.visit( fn )](#Node.visit)
  - [`static`COMMENT_NODE](#COMMENT_NODE)
  - [`static`DOCUMENT_NODE](#DOCUMENT_NODE)
  - [`static`ELEMENT_NODE](#ELEMENT_NODE)
  - [`static`EXTENDED_NODE](#EXTENDED_NODE)
  - [`static`HIDDEN_NODE](#HIDDEN_NODE)
  - [`static`NODE](#NODE)
  - [`static`RAW_NODE](#RAW_NODE)
  - [`static`TEXT_NODE](#TEXT_NODE)
- [RawNode( data )](#RawNode)
  - [.constructor( data )](#RawNode.constructor)
  - [.data](#RawNode.data)
  - [.nodeType](#RawNode.nodeType)
  - [.pos](#RawNode.pos)
  - [.setPos( start, length )](#RawNode.setPos)
  - [.toHTML()](#RawNode.toHTML)
  - [.visit( fn )](#RawNode.visit)
  - [`static`COMMENT_NODE](#COMMENT_NODE)
  - [`static`DOCUMENT_NODE](#DOCUMENT_NODE)
  - [`static`ELEMENT_NODE](#ELEMENT_NODE)
  - [`static`EXTENDED_NODE](#EXTENDED_NODE)
  - [`static`HIDDEN_NODE](#HIDDEN_NODE)
  - [`static`NODE](#NODE)
  - [`static`RAW_NODE](#RAW_NODE)
  - [`static`TEXT_NODE](#TEXT_NODE)
- [TextNode( data )](#TextNode)
  - [.constructor( data )](#TextNode.constructor)
  - [.data](#TextNode.data)
  - [.nodeType](#TextNode.nodeType)
  - [.pos](#TextNode.pos)
  - [.setPos( start, length )](#TextNode.setPos)
  - [.toHTML()](#TextNode.toHTML)
  - [.visit( fn )](#TextNode.visit)
  - [`static`COMMENT_NODE](#COMMENT_NODE)
  - [`static`DOCUMENT_NODE](#DOCUMENT_NODE)
  - [`static`ELEMENT_NODE](#ELEMENT_NODE)
  - [`static`EXTENDED_NODE](#EXTENDED_NODE)
  - [`static`HIDDEN_NODE](#HIDDEN_NODE)
  - [`static`NODE](#NODE)
  - [`static`RAW_NODE](#RAW_NODE)
  - [`static`TEXT_NODE](#TEXT_NODE)

**Functions**

- [parseTree( source, options )](#parseTree)
- [textile( source, options )](#textile)

**Type**

- [PosData](#PosData)

## Classes

### <a id="CommentNode" href="#CommentNode">#</a> CommentNode( data ) extends [`Node`](#Node)

Textile VDOM comment node.

---

#### <a id="CommentNode.constructor" href="#CommentNode.constructor">#</a> .constructor( data )

Constructs a new CommentNode

##### Parameters

| Name | Type     | Description            |
| ---- | -------- | ---------------------- |
| data | `string` | The node's string data |

---

#### <a id="CommentNode.data" href="#CommentNode.data">#</a> .data

---

#### <a id="CommentNode.nodeType" href="#CommentNode.nodeType">#</a> .nodeType

TypeID of node

---

#### <a id="CommentNode.pos" href="#CommentNode.pos">#</a> .pos

Position data for the node

---

#### <a id="CommentNode.setPos" href="#CommentNode.setPos">#</a> .setPos( start, length ) ⇒ [`Node`](#Node)

Sets the source position of the node.

##### Parameters

| Name   | Type     | Description              |
| ------ | -------- | ------------------------ |
| start  | `number` | The start position       |
| length | `number` | The length of the source |

##### Returns

[`Node`](#Node) – The context node

---

#### <a id="CommentNode.toHTML" href="#CommentNode.toHTML">#</a> .toHTML() ⇒ `string`

Emit the HTML source representation of this node and its children.

##### Returns

`string` – HTML source string.

---

#### <a id="CommentNode.visit" href="#CommentNode.visit">#</a> .visit( fn ) ⇒ [`Node`](#Node)

Visit this function and all its descendants.

The visitor callback will be called for the node and every child in its subtree. It will be supplied a single argument which will be the current node.

##### Parameters

| Name | Type       | Description                   |
| ---- | ---------- | ----------------------------- |
| fn   | `Function` | The visitor callback function |

##### Returns

[`Node`](#Node) – The context node

---

#### <a id="COMMENT_NODE" href="#COMMENT_NODE">#</a> `static`COMMENT_NODE

Set to 8

---

#### <a id="DOCUMENT_NODE" href="#DOCUMENT_NODE">#</a> `static`DOCUMENT_NODE

Set to 9

---

#### <a id="ELEMENT_NODE" href="#ELEMENT_NODE">#</a> `static`ELEMENT_NODE

Set to 1

---

#### <a id="EXTENDED_NODE" href="#EXTENDED_NODE">#</a> `static`EXTENDED_NODE

Set to -3

---

#### <a id="HIDDEN_NODE" href="#HIDDEN_NODE">#</a> `static`HIDDEN_NODE

Set to -2

---

#### <a id="NODE" href="#NODE">#</a> `static`NODE

Set to 0

---

#### <a id="RAW_NODE" href="#RAW_NODE">#</a> `static`RAW_NODE

Set to -1

---

#### <a id="TEXT_NODE" href="#TEXT_NODE">#</a> `static`TEXT_NODE

Set to 3

---

### <a id="Document" href="#Document">#</a> Document() extends [`Node`](#Node)

Textile VDOM document node.

---

#### <a id="Document.appendChild" href="#Document.appendChild">#</a> .appendChild( node ) ⇒ [`Node`](#Node)

Appends a node as a direct child of the current element.

##### Parameters

| Name | Type            | Description     |
| ---- | --------------- | --------------- |
| node | [`Node`](#Node) | The node to add |

##### Returns

[`Node`](#Node) – The argument node is returned unchanged.

---

#### <a id="Document.children" href="#Document.children">#</a> .children

---

#### <a id="Document.firstChild" href="#Document.firstChild">#</a> .firstChild() ⇒ `void`

The first child of this element.

---

#### <a id="Document.nodeType" href="#Document.nodeType">#</a> .nodeType

TypeID of node

---

#### <a id="Document.pos" href="#Document.pos">#</a> .pos

Position data for the node

---

#### <a id="Document.setPos" href="#Document.setPos">#</a> .setPos( start, length ) ⇒ [`Node`](#Node)

Sets the source position of the node.

##### Parameters

| Name   | Type     | Description              |
| ------ | -------- | ------------------------ |
| start  | `number` | The start position       |
| length | `number` | The length of the source |

##### Returns

[`Node`](#Node) – The context node

---

#### <a id="Document.toHTML" href="#Document.toHTML">#</a> .toHTML() ⇒ `string`

Emit the HTML source representation of this node and its children.

##### Returns

`string` – HTML source string.

---

#### <a id="Document.visit" href="#Document.visit">#</a> .visit( fn ) ⇒ [`Node`](#Node)

Visit this function and all its descendants.

The visitor callback will be called for the node and every child in its subtree. It will be supplied a single argument which will be the current node.

##### Parameters

| Name | Type       | Description                   |
| ---- | ---------- | ----------------------------- |
| fn   | `Function` | The visitor callback function |

##### Returns

[`Node`](#Node) – The context node

---

#### <a id="COMMENT_NODE" href="#COMMENT_NODE">#</a> `static`COMMENT_NODE

Set to 8

---

#### <a id="DOCUMENT_NODE" href="#DOCUMENT_NODE">#</a> `static`DOCUMENT_NODE

Set to 9

---

#### <a id="ELEMENT_NODE" href="#ELEMENT_NODE">#</a> `static`ELEMENT_NODE

Set to 1

---

#### <a id="EXTENDED_NODE" href="#EXTENDED_NODE">#</a> `static`EXTENDED_NODE

Set to -3

---

#### <a id="HIDDEN_NODE" href="#HIDDEN_NODE">#</a> `static`HIDDEN_NODE

Set to -2

---

#### <a id="NODE" href="#NODE">#</a> `static`NODE

Set to 0

---

#### <a id="RAW_NODE" href="#RAW_NODE">#</a> `static`RAW_NODE

Set to -1

---

#### <a id="TEXT_NODE" href="#TEXT_NODE">#</a> `static`TEXT_NODE

Set to 3

---

### <a id="Element" href="#Element">#</a> Element( tagName, attr ) extends [`Node`](#Node)

Textile VDOM Element node.

---

#### <a id="Element.constructor" href="#Element.constructor">#</a> .constructor( tagName, attr )

Constructs a new Element.

##### Parameters

| Name    | Type                     | Description                |
| ------- | ------------------------ | -------------------------- |
| tagName | `string`                 | A tag name for the element |
| attr    | `Record<string, string>` | A dictionary of attributes |

---

#### <a id="Element.appendChild" href="#Element.appendChild">#</a> .appendChild( node ) ⇒ [`Node`](#Node)

Appends a node as a direct child of the current element.

##### Parameters

| Name | Type            | Description     |
| ---- | --------------- | --------------- |
| node | [`Node`](#Node) | The node to add |

##### Returns

[`Node`](#Node) – The argument node is returned unchanged.

---

#### <a id="Element.attr" href="#Element.attr">#</a> .attr

---

#### <a id="Element.children" href="#Element.children">#</a> .children

---

#### <a id="Element.firstChild" href="#Element.firstChild">#</a> .firstChild() ⇒ `void`

The first child of this element.

---

#### <a id="Element.getAttribute" href="#Element.getAttribute">#</a> .getAttribute( name ) ⇒ `string` | `null`

Read an attribute of this element.

##### Parameters

| Name | Type     | Description               |
| ---- | -------- | ------------------------- |
| name | `string` | The name of the attribute |

##### Returns

`string` | `null` – The attribute value

---

#### <a id="Element.insertBefore" href="#Element.insertBefore">#</a> .insertBefore( newNode, referenceNode ) ⇒ [`Node`](#Node)

Insert a node immediatly before another node

##### Parameters

| Name          | Type            | Description                     |
| ------------- | --------------- | ------------------------------- |
| newNode       | [`Node`](#Node) | The new node to insert          |
| referenceNode | [`Node`](#Node) | The node which to insert before |

##### Returns

[`Node`](#Node) – The newly inserted node

---

#### <a id="Element.nodeType" href="#Element.nodeType">#</a> .nodeType

TypeID of node

---

#### <a id="Element.pos" href="#Element.pos">#</a> .pos

Position data for the node

---

#### <a id="Element.reIndent" href="#Element.reIndent">#</a> .reIndent( shiftBy ) ⇒ [`Element`](#Element)

Add or drop tab indentation levels within the element.

##### Parameters

| Name    | Type     | Description                                    |
| ------- | -------- | ---------------------------------------------- |
| shiftBy | `number` | How much to increase/decrease the intentation. |

##### Returns

[`Element`](#Element) – The current element.

---

#### <a id="Element.removeChild" href="#Element.removeChild">#</a> .removeChild( oldNode ) ⇒ [`Node`](#Node)

Removes a child from the current element.

##### Parameters

| Name    | Type            | Description                                       |
| ------- | --------------- | ------------------------------------------------- |
| oldNode | [`Node`](#Node) | The node that should be detachde from this parent |

##### Returns

[`Node`](#Node) – The detached node

---

#### <a id="Element.setAttr" href="#Element.setAttr">#</a> .setAttr( attr ) ⇒ `void`

Apply a set attributes onto this element.

##### Parameters

| Name | Type                     | Description                   |
| ---- | ------------------------ | ----------------------------- |
| attr | `Record<string, string>` | A dict of attributes to apply |

---

#### <a id="Element.setAttribute" href="#Element.setAttribute">#</a> .setAttribute( name, value ) ⇒ `void`

Set the attribute of this element.

##### Parameters

| Name  | Type               | Description               |
| ----- | ------------------ | ------------------------- |
| name  | `string`           | The name of the attribute |
| value | `string` \| `null` | The attribute value       |

---

#### <a id="Element.setPos" href="#Element.setPos">#</a> .setPos( start, length ) ⇒ [`Node`](#Node)

Sets the source position of the node.

##### Parameters

| Name   | Type     | Description              |
| ------ | -------- | ------------------------ |
| start  | `number` | The start position       |
| length | `number` | The length of the source |

##### Returns

[`Node`](#Node) – The context node

---

#### <a id="Element.tagName" href="#Element.tagName">#</a> .tagName

---

#### <a id="Element.toHTML" href="#Element.toHTML">#</a> .toHTML() ⇒ `string`

Emit the HTML source representation of this node and its children.

##### Returns

`string` – HTML source string.

---

#### <a id="Element.visit" href="#Element.visit">#</a> .visit( fn ) ⇒ [`Node`](#Node)

Visit this function and all its descendants.

The visitor callback will be called for the node and every child in its subtree. It will be supplied a single argument which will be the current node.

##### Parameters

| Name | Type       | Description                   |
| ---- | ---------- | ----------------------------- |
| fn   | `Function` | The visitor callback function |

##### Returns

[`Node`](#Node) – The context node

---

#### <a id="COMMENT_NODE" href="#COMMENT_NODE">#</a> `static`COMMENT_NODE

Set to 8

---

#### <a id="DOCUMENT_NODE" href="#DOCUMENT_NODE">#</a> `static`DOCUMENT_NODE

Set to 9

---

#### <a id="ELEMENT_NODE" href="#ELEMENT_NODE">#</a> `static`ELEMENT_NODE

Set to 1

---

#### <a id="EXTENDED_NODE" href="#EXTENDED_NODE">#</a> `static`EXTENDED_NODE

Set to -3

---

#### <a id="HIDDEN_NODE" href="#HIDDEN_NODE">#</a> `static`HIDDEN_NODE

Set to -2

---

#### <a id="NODE" href="#NODE">#</a> `static`NODE

Set to 0

---

#### <a id="RAW_NODE" href="#RAW_NODE">#</a> `static`RAW_NODE

Set to -1

---

#### <a id="TEXT_NODE" href="#TEXT_NODE">#</a> `static`TEXT_NODE

Set to 3

---

### <a id="ExtendedNode" href="#ExtendedNode">#</a> ExtendedNode() extends [`Node`](#Node)

Textile VDOM extended node container.

A container for the nodes that are a part of the same extended block.

---

#### <a id="ExtendedNode.appendChild" href="#ExtendedNode.appendChild">#</a> .appendChild( node ) ⇒ [`Node`](#Node)

Appends a node as a direct child of the current node.

##### Parameters

| Name | Type            | Description     |
| ---- | --------------- | --------------- |
| node | [`Node`](#Node) | The node to add |

##### Returns

[`Node`](#Node) – The argument node is returned unchanged.

---

#### <a id="ExtendedNode.children" href="#ExtendedNode.children">#</a> .children

---

#### <a id="ExtendedNode.nodeType" href="#ExtendedNode.nodeType">#</a> .nodeType

TypeID of node

---

#### <a id="ExtendedNode.pos" href="#ExtendedNode.pos">#</a> .pos

Position data for the node

---

#### <a id="ExtendedNode.setPos" href="#ExtendedNode.setPos">#</a> .setPos( start, length ) ⇒ [`Node`](#Node)

Sets the source position of the node.

##### Parameters

| Name   | Type     | Description              |
| ------ | -------- | ------------------------ |
| start  | `number` | The start position       |
| length | `number` | The length of the source |

##### Returns

[`Node`](#Node) – The context node

---

#### <a id="ExtendedNode.toHTML" href="#ExtendedNode.toHTML">#</a> .toHTML() ⇒ `string`

Emit the HTML source representation of this node and its children.

##### Returns

`string` – HTML source string.

---

#### <a id="ExtendedNode.visit" href="#ExtendedNode.visit">#</a> .visit( fn ) ⇒ [`Node`](#Node)

Visit this function and all its descendants.

The visitor callback will be called for the node and every child in its subtree. It will be supplied a single argument which will be the current node.

##### Parameters

| Name | Type       | Description                   |
| ---- | ---------- | ----------------------------- |
| fn   | `Function` | The visitor callback function |

##### Returns

[`Node`](#Node) – The context node

---

#### <a id="COMMENT_NODE" href="#COMMENT_NODE">#</a> `static`COMMENT_NODE

Set to 8

---

#### <a id="DOCUMENT_NODE" href="#DOCUMENT_NODE">#</a> `static`DOCUMENT_NODE

Set to 9

---

#### <a id="ELEMENT_NODE" href="#ELEMENT_NODE">#</a> `static`ELEMENT_NODE

Set to 1

---

#### <a id="EXTENDED_NODE" href="#EXTENDED_NODE">#</a> `static`EXTENDED_NODE

Set to -3

---

#### <a id="HIDDEN_NODE" href="#HIDDEN_NODE">#</a> `static`HIDDEN_NODE

Set to -2

---

#### <a id="NODE" href="#NODE">#</a> `static`NODE

Set to 0

---

#### <a id="RAW_NODE" href="#RAW_NODE">#</a> `static`RAW_NODE

Set to -1

---

#### <a id="TEXT_NODE" href="#TEXT_NODE">#</a> `static`TEXT_NODE

Set to 3

---

### <a id="HiddenNode" href="#HiddenNode">#</a> HiddenNode( data ) extends [`Node`](#Node)

Textile VDOM hidden node.

This node type is used to capture things that appear in the textile markup, but do not need to be processed or rendered.

---

#### <a id="HiddenNode.constructor" href="#HiddenNode.constructor">#</a> .constructor( data )

Constructs a new HiddenNode

##### Parameters

| Name | Type     | Description            |
| ---- | -------- | ---------------------- |
| data | `string` | The node's string data |

---

#### <a id="HiddenNode.data" href="#HiddenNode.data">#</a> .data

---

#### <a id="HiddenNode.nodeType" href="#HiddenNode.nodeType">#</a> .nodeType

TypeID of node

---

#### <a id="HiddenNode.pos" href="#HiddenNode.pos">#</a> .pos

Position data for the node

---

#### <a id="HiddenNode.setPos" href="#HiddenNode.setPos">#</a> .setPos( start, length ) ⇒ [`Node`](#Node)

Sets the source position of the node.

##### Parameters

| Name   | Type     | Description              |
| ------ | -------- | ------------------------ |
| start  | `number` | The start position       |
| length | `number` | The length of the source |

##### Returns

[`Node`](#Node) – The context node

---

#### <a id="HiddenNode.toHTML" href="#HiddenNode.toHTML">#</a> .toHTML() ⇒ `string`

Emit the HTML source representation of this node and its children.

##### Returns

`string` – HTML source string.

---

#### <a id="HiddenNode.visit" href="#HiddenNode.visit">#</a> .visit( fn ) ⇒ [`Node`](#Node)

Visit this function and all its descendants.

The visitor callback will be called for the node and every child in its subtree. It will be supplied a single argument which will be the current node.

##### Parameters

| Name | Type       | Description                   |
| ---- | ---------- | ----------------------------- |
| fn   | `Function` | The visitor callback function |

##### Returns

[`Node`](#Node) – The context node

---

#### <a id="COMMENT_NODE" href="#COMMENT_NODE">#</a> `static`COMMENT_NODE

Set to 8

---

#### <a id="DOCUMENT_NODE" href="#DOCUMENT_NODE">#</a> `static`DOCUMENT_NODE

Set to 9

---

#### <a id="ELEMENT_NODE" href="#ELEMENT_NODE">#</a> `static`ELEMENT_NODE

Set to 1

---

#### <a id="EXTENDED_NODE" href="#EXTENDED_NODE">#</a> `static`EXTENDED_NODE

Set to -3

---

#### <a id="HIDDEN_NODE" href="#HIDDEN_NODE">#</a> `static`HIDDEN_NODE

Set to -2

---

#### <a id="NODE" href="#NODE">#</a> `static`NODE

Set to 0

---

#### <a id="RAW_NODE" href="#RAW_NODE">#</a> `static`RAW_NODE

Set to -1

---

#### <a id="TEXT_NODE" href="#TEXT_NODE">#</a> `static`TEXT_NODE

Set to 3

---

### <a id="Node" href="#Node">#</a> Node()

A basic textile VDOC node.

---

#### <a id="Node.nodeType" href="#Node.nodeType">#</a> .nodeType

TypeID of node

---

#### <a id="Node.pos" href="#Node.pos">#</a> .pos

Position data for the node

---

#### <a id="Node.setPos" href="#Node.setPos">#</a> .setPos( start, length ) ⇒ [`Node`](#Node)

Sets the source position of the node.

##### Parameters

| Name   | Type     | Description              |
| ------ | -------- | ------------------------ |
| start  | `number` | The start position       |
| length | `number` | The length of the source |

##### Returns

[`Node`](#Node) – The context node

---

#### <a id="Node.toHTML" href="#Node.toHTML">#</a> .toHTML() ⇒ `string`

Emit the HTML source representation of this node and its children.

##### Returns

`string` – HTML source string.

---

#### <a id="Node.visit" href="#Node.visit">#</a> .visit( fn ) ⇒ [`Node`](#Node)

Visit this function and all its descendants.

The visitor callback will be called for the node and every child in its subtree. It will be supplied a single argument which will be the current node.

##### Parameters

| Name | Type       | Description                   |
| ---- | ---------- | ----------------------------- |
| fn   | `Function` | The visitor callback function |

##### Returns

[`Node`](#Node) – The context node

---

#### <a id="COMMENT_NODE" href="#COMMENT_NODE">#</a> `static`COMMENT_NODE

Set to 8

---

#### <a id="DOCUMENT_NODE" href="#DOCUMENT_NODE">#</a> `static`DOCUMENT_NODE

Set to 9

---

#### <a id="ELEMENT_NODE" href="#ELEMENT_NODE">#</a> `static`ELEMENT_NODE

Set to 1

---

#### <a id="EXTENDED_NODE" href="#EXTENDED_NODE">#</a> `static`EXTENDED_NODE

Set to -3

---

#### <a id="HIDDEN_NODE" href="#HIDDEN_NODE">#</a> `static`HIDDEN_NODE

Set to -2

---

#### <a id="NODE" href="#NODE">#</a> `static`NODE

Set to 0

---

#### <a id="RAW_NODE" href="#RAW_NODE">#</a> `static`RAW_NODE

Set to -1

---

#### <a id="TEXT_NODE" href="#TEXT_NODE">#</a> `static`TEXT_NODE

Set to 3

---

### <a id="RawNode" href="#RawNode">#</a> RawNode( data ) extends [`Node`](#Node)

Textile VDOM raw-text node.

Essentially this is the same as a TextNode except it does not merge with textnodes, and is not post-processed by glyph replacers etc.

---

#### <a id="RawNode.constructor" href="#RawNode.constructor">#</a> .constructor( data )

Constructs a new RawNode

##### Parameters

| Name | Type     | Description            |
| ---- | -------- | ---------------------- |
| data | `string` | The node's string data |

---

#### <a id="RawNode.data" href="#RawNode.data">#</a> .data

---

#### <a id="RawNode.nodeType" href="#RawNode.nodeType">#</a> .nodeType

TypeID of node

---

#### <a id="RawNode.pos" href="#RawNode.pos">#</a> .pos

Position data for the node

---

#### <a id="RawNode.setPos" href="#RawNode.setPos">#</a> .setPos( start, length ) ⇒ [`Node`](#Node)

Sets the source position of the node.

##### Parameters

| Name   | Type     | Description              |
| ------ | -------- | ------------------------ |
| start  | `number` | The start position       |
| length | `number` | The length of the source |

##### Returns

[`Node`](#Node) – The context node

---

#### <a id="RawNode.toHTML" href="#RawNode.toHTML">#</a> .toHTML() ⇒ `string`

Emit the HTML source representation of this node and its children.

##### Returns

`string` – HTML source string.

---

#### <a id="RawNode.visit" href="#RawNode.visit">#</a> .visit( fn ) ⇒ [`Node`](#Node)

Visit this function and all its descendants.

The visitor callback will be called for the node and every child in its subtree. It will be supplied a single argument which will be the current node.

##### Parameters

| Name | Type       | Description                   |
| ---- | ---------- | ----------------------------- |
| fn   | `Function` | The visitor callback function |

##### Returns

[`Node`](#Node) – The context node

---

#### <a id="COMMENT_NODE" href="#COMMENT_NODE">#</a> `static`COMMENT_NODE

Set to 8

---

#### <a id="DOCUMENT_NODE" href="#DOCUMENT_NODE">#</a> `static`DOCUMENT_NODE

Set to 9

---

#### <a id="ELEMENT_NODE" href="#ELEMENT_NODE">#</a> `static`ELEMENT_NODE

Set to 1

---

#### <a id="EXTENDED_NODE" href="#EXTENDED_NODE">#</a> `static`EXTENDED_NODE

Set to -3

---

#### <a id="HIDDEN_NODE" href="#HIDDEN_NODE">#</a> `static`HIDDEN_NODE

Set to -2

---

#### <a id="NODE" href="#NODE">#</a> `static`NODE

Set to 0

---

#### <a id="RAW_NODE" href="#RAW_NODE">#</a> `static`RAW_NODE

Set to -1

---

#### <a id="TEXT_NODE" href="#TEXT_NODE">#</a> `static`TEXT_NODE

Set to 3

---

### <a id="TextNode" href="#TextNode">#</a> TextNode( data ) extends [`Node`](#Node)

Textile VDOM text node.

---

#### <a id="TextNode.constructor" href="#TextNode.constructor">#</a> .constructor( data )

Constructs a new TextNode

##### Parameters

| Name | Type     | Description            |
| ---- | -------- | ---------------------- |
| data | `string` | The node's string data |

---

#### <a id="TextNode.data" href="#TextNode.data">#</a> .data

---

#### <a id="TextNode.nodeType" href="#TextNode.nodeType">#</a> .nodeType

TypeID of node

---

#### <a id="TextNode.pos" href="#TextNode.pos">#</a> .pos

Position data for the node

---

#### <a id="TextNode.setPos" href="#TextNode.setPos">#</a> .setPos( start, length ) ⇒ [`Node`](#Node)

Sets the source position of the node.

##### Parameters

| Name   | Type     | Description              |
| ------ | -------- | ------------------------ |
| start  | `number` | The start position       |
| length | `number` | The length of the source |

##### Returns

[`Node`](#Node) – The context node

---

#### <a id="TextNode.toHTML" href="#TextNode.toHTML">#</a> .toHTML() ⇒ `string`

Emit the HTML source representation of this node and its children.

##### Returns

`string` – HTML source string.

---

#### <a id="TextNode.visit" href="#TextNode.visit">#</a> .visit( fn ) ⇒ [`Node`](#Node)

Visit this function and all its descendants.

The visitor callback will be called for the node and every child in its subtree. It will be supplied a single argument which will be the current node.

##### Parameters

| Name | Type       | Description                   |
| ---- | ---------- | ----------------------------- |
| fn   | `Function` | The visitor callback function |

##### Returns

[`Node`](#Node) – The context node

---

#### <a id="COMMENT_NODE" href="#COMMENT_NODE">#</a> `static`COMMENT_NODE

Set to 8

---

#### <a id="DOCUMENT_NODE" href="#DOCUMENT_NODE">#</a> `static`DOCUMENT_NODE

Set to 9

---

#### <a id="ELEMENT_NODE" href="#ELEMENT_NODE">#</a> `static`ELEMENT_NODE

Set to 1

---

#### <a id="EXTENDED_NODE" href="#EXTENDED_NODE">#</a> `static`EXTENDED_NODE

Set to -3

---

#### <a id="HIDDEN_NODE" href="#HIDDEN_NODE">#</a> `static`HIDDEN_NODE

Set to -2

---

#### <a id="NODE" href="#NODE">#</a> `static`NODE

Set to 0

---

#### <a id="RAW_NODE" href="#RAW_NODE">#</a> `static`RAW_NODE

Set to -1

---

#### <a id="TEXT_NODE" href="#TEXT_NODE">#</a> `static`TEXT_NODE

Set to 3

---

## Functions

### <a id="parseTree" href="#parseTree">#</a> parseTree( source, options ) ⇒ [`Document`](#Document)

Parse Textile markup and return a "VDOM" tree.

##### Parameters

| Name                         | Type                  | Default | Description                                                                                 |
| ---------------------------- | --------------------- | ------- | ------------------------------------------------------------------------------------------- |
| source                       | `string`              |         | The source transmit                                                                         |
| options                      | `object`              |         | Parsing options                                                                             |
| options.[allowed_block_tags] | `Array<string>`       |         | Which HTML tags in the document trigger HTML parsing (def: div, blockquote, ...)            |
| options.[auto_backlink]      | `boolean`             | `true`  | Automatically backlink footnotes, regardless of syntax used                                 |
| options.[blocked_uri]        | `Array<string>`       |         | A list of blocked href protocols (def: javascript, vbscript, data)                          |
| options.[breaks]             | `boolean`             | `true`  | Convert single-line linebreaks to <br>                                                      |
| options.[glyph_entities]     | `boolean`             | `true`  | Convert entity markup (->) to glyphs (→)                                                    |
| options.[id_prefix]          | `boolean` \| `string` | `true`  | Footnotes and endnote HTML IDs are prefixed with a string (as set here) or number (if true) |

##### Returns

[`Document`](#Document) – A textile Document node

---

### <a id="textile" href="#textile">#</a> textile( source, options ) ⇒ `string`

Convert Textile markup to HTML markup.

##### Parameters

| Name                         | Type                  | Default | Description                                                                                 |
| ---------------------------- | --------------------- | ------- | ------------------------------------------------------------------------------------------- |
| source                       | `string`              |         | The source transmit                                                                         |
| options                      | `object`              |         | Parsing options                                                                             |
| options.[allowed_block_tags] | `Array<string>`       |         | Which HTML tags in the document trigger HTML parsing (def: div, blockquote, ...)            |
| options.[auto_backlink]      | `boolean`             | `true`  | Automatically backlink footnotes, regardless of syntax used                                 |
| options.[blocked_uri]        | `Array<string>`       |         | A list of blocked href protocols (def: javascript, vbscript, data)                          |
| options.[breaks]             | `boolean`             | `true`  | Convert single-line linebreaks to <br>                                                      |
| options.[glyph_entities]     | `boolean`             | `true`  | Convert entity markup (->) to glyphs (→)                                                    |
| options.[id_prefix]          | `boolean` \| `string` | `true`  | Footnotes and endnote HTML IDs are prefixed with a string (as set here) or number (if true) |

##### Returns

`string` – HTML source string

---

## Type

### <a id="PosData" href="#PosData">#</a> PosData = `object`

Offsets in the Textile source for this node

##### Properties

| Name    | Type     | Description           |
| ------- | -------- | --------------------- |
| [end]   | `number` | Where the node ends   |
| [start] | `number` | Where the node starts |

---


