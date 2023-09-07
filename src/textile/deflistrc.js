/* definitions list parser */
import { Element, TextNode } from '../VDOM.js';
import { parseInline } from './inline.js';
import { parseBlock } from './block.js';

const reDeflist = /^((?:- (?:[^\n]\n?)+?)+(:=)(?: *\n[^\0]+?=:(?:\n|$)|(?:[^\0]+?(?:$|\n(?=\n|- )))))+(?:\r?\n)*/;
const reItem = /^((?:- (?:[^\n]\n?)+?)+)(:=)( *\n[^\0]+?=:\s*(?:\n|$)|(?:[^\0]+?(?:$|\n(?=\n|- )(?:\r?\n)*)))/;

export function testDefListRC (src) {
  return reDeflist.exec(src);
}

export function parseDefListRC (src, options) {
  const deflist = new Element('dl');
  deflist.setPos(src.offset, src.length);
  deflist.appendChild(new TextNode('\n'));

  let m;
  while ((m = reItem.exec(src))) {
    // add terms
    let mt;
    const tSrc = src.sub(0, m[1].length);
    while ((mt = /^- [^\0]*?(\n(?=-)|$)/.exec(tSrc))) {
      const term = new Element('dt');
      const len = mt[0].length;
      term.setPos(tSrc.offset, len);
      term.appendChild(parseInline(tSrc.sub(2, len - 2).trim(), options));
      deflist.appendChild([ new TextNode('\t'), term, new TextNode('\n') ]);
      tSrc.advance(mt[0]);
    }
    src.advance(m[1].length);

    deflist.appendChild(new TextNode('\t'));

    // add definitions
    const ddLen = m[2].length + m[3].length;
    const dd = new Element('dd');
    dd.setPos(src.offset, ddLen);
    const defElm = deflist.appendChild(dd);
    const def = src
      .sub(m[2].length, m[3].length)
      .trim();
    if (/=:$/.test(def)) {
      defElm.appendChild(
        parseBlock(def.sub(0, def.length - 2).trim(), options)
      );
    }
    else {
      defElm.appendChild(parseInline(def, options));
    }

    deflist.appendChild(new TextNode('\n'));

    src.advance(m[2].length + m[3].length);
  }

  return deflist;
}
