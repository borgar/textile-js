/* definitions list parser */
import { Element, TextNode } from '../VDOM.js';
import { parsePhrase } from './phrase.js';
import { parseFlow } from './flow.js';

const reDeflist = /^((?:- (?:[^\n]\n?)+?)+(:=)(?: *\n[^\0]+?=:(?:\n|$)|(?:[^\0]+?(?:$|\n(?=\n|- )))))+/;
const reItem = /^((?:- (?:[^\n]\n?)+?)+)(:=)( *\n[^\0]+?=:\s*(?:\n|$)|(?:[^\0]+?(?:$|\n(?=\n|- ))))/;

export function testDefList (src) {
  return reDeflist.exec(src);
}

export function parseDefList (src, options) {
  const deflist = new Element('dl').setPos(src.offset);
  deflist.appendChild(new TextNode('\n'));

  let m;
  while ((m = reItem.exec(src))) {
    // add terms
    src
      .sub(0, m[1].length)
      .splitBy(/(?:^|\n)- /, (bit, i) => {
        if (i) {
          const term = new Element('dt').setPos(src.offset);
          term.appendChild(parsePhrase(bit.trim(), options));
          deflist.appendChild([ new TextNode('\t'), term, new TextNode('\n') ]);
        }
      });
    src.advance(m[1].length);

    deflist.appendChild(new TextNode('\t'));

    // add definitions
    const defElm = deflist.appendChild(
      new Element('dd').setPos(src.offset)
    );
    const def = src
      .sub(m[2].length, m[3].length)
      .trim();
    if (/=:$/.test(def)) {
      defElm.appendChild(
        parseFlow(def.sub(0, def.length - 2).trim(), options)
      );
    }
    else {
      defElm.appendChild(parsePhrase(def, options));
    }

    deflist.appendChild(new TextNode('\n'));

    src.advance(m[2].length + m[3].length);
  }

  return deflist;
}
