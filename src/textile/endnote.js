/* textile inline parser */
import { Element, TextNode, HiddenNode } from '../VDOM.js';
import Re from '../Re.js';

import { parseAttr } from './attr.js';
import { parseInline } from './inline.js';
import { txattr } from './re_ext.js';

export const symbols = '¤§µ¶†‡•∗∴◊♠♣♥♦|';

const re = new Re({ txattr, symbols });
const reEndnoteDef = re.compile(
  /^note#([^%<*!@#^([{.\s]+)([*!^]?)([:txattr:])\.?\s+(.*?)($|\r?\n(?:\s*\n|$)+)/
);
const reEndnoteRef = re.compile(
  /^\[([:txattr:])#([^\]!]+?)(!?)\]/
);
const reNotelist = re.compile(
  /^notelist([:txattr:])(:(?:\p{L}|\p{M}|\p{N}|\p{Pc}|[[:symbols:]]))?([\^!]?)(\+?)\.?\s*?(?:$|\r?\n(?:\s*\n|$)+)/, 'u'
);

function charCounter (start = 'a') {
  // symbols are static
  if (symbols.includes(start)) {
    return () => start;
  }
  // numbers keep counting
  else if (isFinite(start)) {
    let i = +start;
    return () => String(i++);
  }
  // alpha use base26 encoding
  else if (/^[a-z]$/i.test(start)) {
    const isLower = start === start.toLowerCase();
    const offset = 65; // 65 = 'A'
    let i = start.toUpperCase().charCodeAt(0) - offset;
    return () => {
      let c = '';
      for (let n = i++; n >= 0; n = Math.floor(n / 26) - 1) {
        c = String.fromCharCode(n % 26 + offset) + c;
      }
      return isLower ? c.toLowerCase() : c;
    };
  }
  // other chars just use charCode + n
  let startCode = start.charCodeAt(0);
  return () => String.fromCharCode(startCode++);
}


class EndNoteKeeper {
  constructor (id_prefix) {
    this.refCounter = 1;
    this.noteCounter = 1;
    this.byLabel = {};
    this.id_prefix = id_prefix;
    this.list = [];
  }

  getNote (label) {
    if (!this.byLabel[label]) {
      this.byLabel[label] = {
        id: `note${this.id_prefix ? '-' : ''}${this.id_prefix}-${this.noteCounter}`,
        label: label,
        index: this.noteCounter,
        attr: {},
        title: [ new TextNode(`Undefined Note [#${this.noteCounter}].`) ],
        refs: [],
        links: '',
        addRef: () => {
          const note = this.getNote(label);
          const ref = {
            id: `noteref${this.id_prefix ? '-' : ''}${this.id_prefix}-${note.index}.${note.refs.length + 1}`,
            label: note.label,
            index: this.refCounter
          };
          this.refCounter++;
          note.refs.push(ref);
          return ref;
        }
      };
      this.list.push(this.byLabel[label]);
      this.noteCounter++;
    }
    return this.byLabel[label];
  }
}

function getNotes (options) {
  if (!options.endNotes) {
    options.endNotes = new EndNoteKeeper(options.id_prefix);
  }
  return options.endNotes;
}

// note refs

export function testEndnoteRef (src) {
  return reEndnoteRef.exec(src);
}

export function parseEndnoteRef (src, options) {
  const srcSrt = src.offset;
  const srcLen = src.length;

  src.advance(1);
  const [ step, attr ] = parseAttr(src);
  src.advance(step);

  const doLink = src.charAt(src.length - 2) !== '!';
  const label = String(src).slice(1, doLink ? -1 : -2);

  const endNotes = getNotes(options);
  const note = endNotes.getNote(label);
  note.pos = [ srcSrt, srcLen ];
  const ref = note.addRef(note);

  const endNote = new Element('sup', attr);
  endNote.setPos(srcSrt, srcLen);
  const txt = new Element('span', { id: ref.id });
  txt.setPos(srcSrt, srcLen);
  txt.appendChild(new TextNode(note.index));
  if (doLink) {
    const link = endNote.appendChild(new Element('a', { href: '#' + note.id }));
    link.setPos(srcSrt, srcLen);
    link.appendChild(txt);
  }
  else {
    endNote.appendChild(txt);
  }
  return endNote;
}

// note defs

export function testEndnote (src) {
  return reEndnoteDef.exec(src);
}

export function parseEndnote (src, options) {
  const endNotes = getNotes(options);
  const head = /^note#([^%<*!@#^([{.\s]+)([*!^]?)/.exec(src);
  const note = endNotes.getNote(head[1]);
  note.links = head[2];
  note.pos = [ src.offset, src.length ];
  src.advance(head[0]);
  const [ step, attr ] = parseAttr(src);
  src.advance(step);
  const m = /^\.?\s+/.exec(src);
  if (m) {
    src.advance(m[0]);
  }
  note.attr = attr;
  note.title = parseInline(src.trim());
  return [];
}

// note list

export function testNotelist (src) {
  // TODO: test please: is this any faster, really, than just running exec?
  const t = reNotelist.test(src);
  return t ? [ RegExp.lastMatch ] : null;
}

export function parseNotelist (src) {
  const notelist = new HiddenNode();
  notelist.isNotelist = true;
  notelist.setPos(src.offset, src.length);
  const [ , attrTx, char, mod, plus ] = reNotelist.exec(src);
  const [ , attr ] = parseAttr(attrTx + '.');

  notelist.props = {
    attr: attr,
    links: mod,
    unrefs: !!plus,
    char: (char || ':a').slice(1)
  };
  return notelist;
}

export function renderNotelist (root, options) {
  const endNotes = options.endNotes;
  if (!endNotes) {
    // hidden node will keep representing the empty notelist
    return;
  }

  root.children.forEach(node => {
    if (node.isNotelist) {
      const { attr, links, unrefs, char } = node.props;

      const notesToRender = unrefs
        ? endNotes.list
        : endNotes.list.filter(note => note.refs.length);

      if (!notesToRender.length) {
        return [];
      }

      const list = new Element('ol', attr);
      list.pos = node.pos; // copy source position
      list.appendChild(new TextNode('\n'));

      notesToRender.forEach(note => {
        const item = new Element('li', note.attr);
        if (note.pos) {
          item.setPos(note.pos[0], note.pos[1]);
        }

        const nLinks = note.links || links;
        const noteBacklinks = nLinks !== '!';
        const noteSingleRef = nLinks !== '^';

        // add the refs
        const refsList = noteSingleRef
          ? note.refs
          : note.refs.slice(0, 1);

        if (noteBacklinks && refsList.length) {
          const counter = charCounter(char);
          refsList.forEach((ref, i) => {
            if (i) {
              item.appendChild(new TextNode(' '));
            }
            item.appendChild(new Element('sup'))
              .appendChild(new Element('a', { href: '#' + ref.id }))
              .appendChild(new TextNode(counter()));
          });
          // space and note ID
          item
            .appendChild(new Element('span', { id: note.id }))
            .appendChild(new TextNode(' '));
        }
        item.appendChild(note.title);
        list.appendChild([ new TextNode('\t'), item, new TextNode('\n') ]);
      });

      root.insertBefore(list, node);
      root.removeChild(node);
    }
  });
}
