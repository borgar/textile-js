/*
** textile flow content parser
*/
import Ribbon from '../Ribbon.js';
import { Element, TextNode, RawNode, HiddenNode, CommentNode, ExtendedNode } from '../VDOM.js';
import re from '../re.js';

import { parseHtml, tokenize, parseHtmlAttr, testComment, testOpenTagBlock } from '../html.js';
import { singletons, allowedFlowBlocktags } from '../constants.js';

import { parseInline } from './inline.js';
import { copyAttr, parseAttr } from './attr.js';
import { testList, parseList } from './list.js';
import { testDefList, parseDefList } from './deflist.js';
import { testTable, parseTable } from './table.js';

import { txblocks, txlisthd, txattr } from './re_ext.js';
re.pattern.txblocks = txblocks;
re.pattern.txlisthd = txlisthd;
re.pattern.txattr = txattr;

const reBlock = re.compile(/^([:txblocks:])/);
const reBlockNormal = re.compile(/^(.*?)($|\r?\n(?=[:txlisthd:])|\r?\n(?:\s*\n|$)+)/, 's');
const reBlockExtended = re.compile(/^(.*?)($|\r?\n(?=[:txlisthd:])|\r?\n+(?=[:txblocks:][:txattr:]\.))/, 's');
const reBlockNormalPre = re.compile(/^(.*?)($|\r?\n(?:\s*\n|$)+)/, 's');
const reBlockExtendedPre = re.compile(/^(.*?)($|\r?\n+(?=[:txblocks:][:txattr:]\.))/, 's');

const reRuler = /^(---+|\*\*\*+|___+)(\r?\n\s+|$)/;
const reLinkRef = re.compile(/^\[([^\]]+)\]((?:https?:\/\/|\/)\S+)(?:\s*\n|$)/);
const reFootnoteDef = /^fn\d+$/;

const getBlockRe = (blockType, isExtended) => {
  if (blockType === 'bc' || blockType === 'pre') {
    return isExtended ? reBlockExtendedPre : reBlockNormalPre;
  }
  return isExtended ? reBlockExtended : reBlockNormal;
};

function paragraph (src, { tag = 'p', attr = {}, linebreak = '\n', options }) {
  let out = [];
  src.splitBy(/(?:\r?\n){2,}/, (bit, i) => {
    if (tag === 'p' && /^\s/.test(bit)) {
      // no-paragraphs
      out = out.concat(parseInline(bit.trim(), options));
    }
    else {
      if (linebreak && i) {
        out.push(new TextNode('\n'));
      }
      const elm = new Element(tag, attr).setPos(bit.offset);
      elm.appendChild(parseInline(bit, options));
      out.push(elm);
    }
  });
  return out;
}

export function parseBlock (src, options) {
  const root = new Element('root');

  let linkRefs;
  let hasHidden = false;
  let m;

  if (!(src instanceof Ribbon)) {
    src = new Ribbon(src.replace(/^( *\r?\n)+/, ''));
  }

  // loop
  while (src.valueOf()) {
    src.save();

    // link_ref -- this goes first because it shouldn't trigger a linebreak
    if ((m = reLinkRef.exec(src))) {
      if (!linkRefs) {
        linkRefs = {};
      }
      src.advance(m[0]);
      linkRefs[m[1]] = m[2];
      continue;
    }

    // add linebreak
    const isNotFirst = hasHidden
      ? root.children.filter(d => !(d instanceof HiddenNode)).length
      : root.children.length;
    if (isNotFirst) {
      root.appendChild(new TextNode('\n'));
    }

    // named block
    if ((m = reBlock.exec(src))) {
      const outerOffs = src.offset;
      const attr = {};
      src.advance(m[0]);
      const blockType = m[0];
      const [ step, _attr ] = parseAttr(src, blockType);
      Object.assign(attr, _attr);
      src.advance(step);

      if ((m = /^\.(\.?)(?:\s|(?=:))/.exec(src))) {
        // FIXME: this whole copyAttr deal seems rather strange?
        // slurp rest of block
        src.advance(m[0]);

        const isExtended = !!m[1];
        m = getBlockRe(blockType, isExtended).exec(src);

        const inner = src.sub(0, m[1].length);

        // Extended blocks are wrapped in a container so that
        // the source start/end positions make sense, and the
        // relationship between the child blocks is not lost
        let parentNode = root;
        if (isExtended) {
          parentNode = new ExtendedNode();
          parentNode.setPos(outerOffs);
          root.appendChild(parentNode);
        }

        // bq | bc | notextile | pre | h# | fn# | p | ###
        if (blockType === 'bq') {
          const mCite = /^:(\S+)\s+/.exec(inner);
          if (mCite) {
            attr.cite = mCite[1];
            inner.advance(mCite[0]);
          }
          // RedCloth adds all attr to both which is bad because it produces duplicate IDs
          const par = paragraph(inner, {
            attr: copyAttr(attr, { cite: 1, id: 1 }),
            options: options
          });
          parentNode
            .appendChild(new Element('blockquote', attr).setPos(outerOffs))
            .appendChild([ new TextNode('\n'), ...par, new TextNode('\n') ]);
        }

        else if (blockType === 'bc') {
          parentNode
            .appendChild(new Element('pre', attr).setPos(outerOffs))
            .appendChild(new Element('code', copyAttr(attr, { id: 1 })).setPos(outerOffs))
            .appendChild(new RawNode(inner));
        }

        else if (blockType === 'notextile') {
          parentNode.appendChild(parseHtml(tokenize(inner)));
        }

        else if (blockType === '###') {
          // ignore the insides
          hasHidden = true;
          parentNode.appendChild(new HiddenNode(inner).setPos(outerOffs));
        }

        else if (blockType === 'pre') {
          // I disagree with RedCloth, but agree with PHP here:
          // "pre(foo#bar).. line1\n\nline2" prevents multiline preformat blocks
          // ...which seems like the whole point of having an extended pre block?
          parentNode
            .appendChild(new Element('pre', attr).setPos(outerOffs))
            .appendChild(new RawNode(inner));
        }

        else if (reFootnoteDef.test(blockType)) { // footnote
          // Need to be careful: RedCloth fails "fn1(foo#m). footnote" -- it confuses the ID
          const fnid = blockType.replace(/\D+/g, '');
          const pos = src.offset;
          attr.class = (attr.class ? attr.class + ' ' : '') + 'footnote';
          attr.id = 'fn' + fnid;
          const subAttr = copyAttr(attr, { id: 1, class: 1 });
          const fnLink = new Element('a', { href: '#fnr' + fnid, ...subAttr }).setPos(pos);
          fnLink
            .appendChild(new Element('sup', subAttr).setPos(pos))
            .appendChild(new TextNode(fnid));
          parentNode
            .appendChild(new Element('p', attr).setPos(pos))
            .appendChild([
              fnLink,
              new TextNode(' '),
              ...parseInline(inner, options)
            ]);
        }

        else { // heading | paragraph
          const par = paragraph(inner, { tag: blockType, attr, options });
          // first paragraph must use outer offset
          par[0].setPos(outerOffs);
          parentNode.appendChild(par);
        }

        src.advance(m[0]);
        continue;
      }

      src.load();
    }

    // HTML comment
    if ((m = testComment(src))) {
      root.appendChild(new CommentNode(m[1]));
      src.advance(m[0] + (/(?:\s*\n+)+/.exec(src) || [])[0]);
      continue;
    }

    // block HTML
    if ((m = testOpenTagBlock(src))) {
      const tag = m[1];

      // Is block tag? ...
      if (tag in allowedFlowBlocktags) {
        if (m[3] || tag in singletons) { // single?
          const pos = src.offset;
          src.advance(m[0]);
          if (/^\s*(\n|$)/.test(src)) {
            root.appendChild(
              new Element(tag, parseHtmlAttr(m[2])).setPos(pos)
            );
            src.skipWS();
            continue;
          }
        }
        else if (tag === 'pre') {
          const t = tokenize(src.clone(), { pre: 1, code: 1 }, tag);
          const p = parseHtml(t, true);
          src.load();
          src.advance(p.sourceLength);
          if (/^\s*(\n|$)/.test(src)) {
            root.appendChild(p);
            src.skipWS(); // skip tailing whitespace
            continue;
          }
        }
        else if (tag === 'notextile') {
          // merge all child elements
          const t = tokenize(src.clone(), null, tag);
          let s = 1; // start after open tag
          while (/^\s+$/.test(t[s].src)) {
            s++; // skip whitespace
          }
          const p = parseHtml(t.slice(s, -1), true);
          const x = t.pop();
          src.load();
          src.advance(x.index + x.src.length);
          if (/^\s*(\n|$)/.test(src)) {
            root.appendChild(p);
            src.skipWS(); // skip tailing whitespace
            continue;
          }
        }
        else {
          src.skipWS();
          const offs = src.offset;
          const tokens = tokenize(src.clone(), null, tag);
          const endTag = tokens.pop(); // this should be the end tag
          let s = 1; // start after open tag
          while (tokens[s] && /^[\n\r]+$/.test(tokens[s].src)) {
            s++; // skip whitespace
          }
          if (endTag.tag === tag) {
            // inner can be empty
            const inner = tokens.length > 1
              ? src.sub(tokens[s].index, endTag.index - tokens[s].index)
              : new Ribbon('');

            src.advance(endTag.index + endTag.src.length);

            if (/^\s*(\n|$)/.test(src)) {
              const elm = new Element(tag, parseHtmlAttr(m[2])).setPos(offs);
              if (tag === 'script' || tag === 'style') {
                elm.appendChild(new TextNode(inner));
              }
              else {
                const sO = /^\n*/.exec(inner)[0].length;
                const eO = /\s*$/.exec(inner)[0].length;
                const innerHTML = inner.sub(sO, inner.length - sO - eO);
                const isBlock = /\n\r?\n/.test(innerHTML) || tag === 'ol' || tag === 'ul';
                const innerElm = isBlock
                  ? parseBlock(innerHTML, options)
                  : parseInline(innerHTML, { ...options, breaks: false });
                if (isBlock || /^\n/.test(inner)) {
                  elm.appendChild(new TextNode('\n'));
                }
                if (isBlock || /\s$/.test(inner)) {
                  innerElm.push(new TextNode('\n'));
                }
                elm.appendChild(innerElm);
              }

              root.appendChild(elm);
              src.skipWS(); // skip tailing whitespace
              continue;
            }
          }
        }
      }
      src.load();
    }

    // ruler
    if ((m = reRuler.exec(src))) {
      root.appendChild(new Element('hr').setPos(src.offset));
      src.advance(m[0]);
      continue;
    }

    // list
    if ((m = testList(src))) {
      const len = m[0].length;
      root.appendChild(parseList(src.sub(0, len), options));
      src.advance(len);
      continue;
    }

    // definition list
    if ((m = testDefList(src))) {
      const len = m[0].length;
      root.appendChild(parseDefList(src.sub(0, len), options));
      src.advance(len);
      continue;
    }

    // table
    if ((m = testTable(src))) {
      const len = m[0].length;
      root.appendChild(parseTable(src.sub(0, len), options));
      src.advance(len);
      continue;
    }

    // paragraph
    m = reBlockNormal.exec(src);
    root.appendChild(paragraph(src.sub(0, m[1].length), { options }));
    src.advance(m[0]);
  }

  // apply link refs to anchor tags
  if (linkRefs) {
    root.visit(node => {
      if (node.tagName === 'a') {
        const href = node.getAttribute('href');
        if (href && linkRefs[href]) {
          node.setAttribute('href', linkRefs[href]);
        }
      }
    });
  }

  return root.children;
}
