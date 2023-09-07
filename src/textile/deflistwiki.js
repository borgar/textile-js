/* definitions list parser */
import { Element, TextNode } from '../VDOM.js';
import Re from '../Re.js';
import { parseInline } from './inline.js';
import { parseAttr } from './attr.js';
import { txattr } from './re_ext.js';

const re = new Re({ txattr });
const reDeflistWiki = re.compile(
  /^[;:](?:[:txattr:])?(\. ?| )[^\0]*?(?:\s*\n\r?\n|$)/
);
const reItemWiki = re.compile(
  /^([;:])([:txattr:])?(\. ?| )([^\0]*?)(?=\r?\n\r?\n|([;:](?:[:txattr:])?(\. ?|\s|$))|$)/
);

export function testDefListWiki (src) {
  const m = reDeflistWiki.exec(src);
  // console.log(m);
  return m;
}

const type = {
  ';': 'dt',
  ':': 'dd'
};

export function parseDefListWiki (src, options) {
  let listAttrSet = false;
  const deflist = new Element('dl');
  deflist.setPos(src.offset, src.length);
  deflist.appendChild(new TextNode('\n'));
  let m;
  let index = 0;
  while ((m = reItemWiki.exec(src))) {
    const inner = src.sub(1, m[0].length - 1);
    const elmType = type[m[1]];
    const [ step, attr ] = parseAttr(inner, elmType);
    inner.advance(step);
    if (/^\./.test(inner)) {
      inner.advance(1);
    }
    if (/^\s*$/.test(inner)) {
      if (!listAttrSet) {
        deflist.setAttr(attr);
        listAttrSet = true;
      }
    }
    else {
      let attrOnItem = true;
      if (!index && !listAttrSet) {
        deflist.setAttr(attr);
        listAttrSet = true;
        attrOnItem = false;
      }
      const item = new Element(elmType, attrOnItem ? attr : null);
      item.setPos(src.offset, m[0].length);
      item.appendChild(parseInline(inner.trim(), options));
      deflist.appendChild([ new TextNode('\t'), item, new TextNode('\n') ]);
    }
    index++;
    src.advance(m[0]);
  }
  return deflist;
}
