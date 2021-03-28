/*
** textile flow content parser
*/
import Ribbon from '../Ribbon.js';
import { Element, TextNode, RawNode, CommentNode } from '../Node.js';
import re from '../re.js';

import { parseHtml, tokenize, parseHtmlAttr, testComment, testOpenTagBlock } from '../html.js';
import { singletons } from '../constants.js';

import { parsePhrase } from './phrase.js';
import { copyAttr, parseAttr } from './attr.js';
import { testList, parseList } from './list.js';
import { testDefList, parseDefList } from './deflist.js';
import { testTable, parseTable } from './table.js';

import { txblocks, txlisthd, txattr } from './re_ext.js';
re.pattern.txblocks = txblocks;
re.pattern.txlisthd = txlisthd;
re.pattern.txattr = txattr;

// HTML tags allowed in the document (root) level that trigger HTML parsing
const allowedBlocktags = {
  p: 0,
  hr: 0,
  ul: 1,
  ol: 0,
  li: 0,
  div: 1,
  pre: 0,
  object: 1,
  script: 0,
  noscript: 0,
  blockquote: 1,
  notextile: 1
};

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
      out = out.concat(parsePhrase(bit.trim(), options));
    }
    else {
      if (linebreak && i) {
        out.push(new TextNode('\n'));
      }
      const elm = new Element(tag, attr, bit.offset);
      elm.appendChild(parsePhrase(bit, options));
      out.push(elm);
    }
  });
  return out;
};

export function parseFlow (src, options) {
  const root = new Element('root');

  let linkRefs;
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
    if (root.children.length) {
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
        // FIXME: this whole copyAttr seems rather strange?
        // slurp rest of block
        src.advance(m[0]);

        m = getBlockRe(blockType, !!m[1]).exec(src);
        const inner = src.sub(0, m[1].length);

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
          root
            .appendChild(new Element('blockquote', attr, outerOffs))
            .appendChild([ new TextNode('\n'), ...par, new TextNode('\n') ]);
        }

        else if (blockType === 'bc') {
          root
            .appendChild(new Element('pre', attr, outerOffs))
            .appendChild(new Element('code', copyAttr(attr, { id: 1 }), outerOffs))
            .appendChild(new RawNode(inner));
        }

        else if (blockType === 'notextile') {
          root.appendChild(parseHtml(tokenize(inner)));
        }

        else if (blockType === '###') {
          // ignore the insides
          // FIXME: consider adding an option to expose these as HTML comments?
          // FIXME: consider adding these to the parse tree and block on render?
        }

        else if (blockType === 'pre') {
          // I disagree with RedCloth, but agree with PHP here:
          // "pre(foo#bar).. line1\n\nline2" prevents multiline preformat blocks
          // ...which seems like the whole point of having an extended pre block?
          root
            .appendChild(new Element('pre', attr, outerOffs))
            .appendChild(new RawNode(inner));
        }

        else if (reFootnoteDef.test(blockType)) { // footnote
          // Need to be careful: RedCloth fails "fn1(foo#m). footnote" -- it confuses the ID
          const fnid = blockType.replace(/\D+/g, '');
          const pos = src.offset;
          attr.class = (attr.class ? attr.class + ' ' : '') + 'footnote';
          attr.id = 'fn' + fnid;
          const subAttr = copyAttr(attr, { id: 1, class: 1 });
          const fnLink = new Element('a', { href: '#fnr' + fnid, ...subAttr }, pos);
          fnLink
            .appendChild(new Element('sup', subAttr, pos))
            .appendChild(new TextNode(fnid));
          root
            .appendChild(new Element('p', attr, pos))
            .appendChild([
              fnLink,
              new TextNode(' '),
              ...parsePhrase(inner, options)
            ]);
        }

        else { // heading | paragraph
          const par = paragraph(inner, { tag: blockType, attr, options });
          // first paragraph must use outer offset
          par[0].setPos(outerOffs);
          root.appendChild(par);
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
      if (tag in allowedBlocktags) {
        const pos = src.off;
        if (m[3] || tag in singletons) { // single?
          src.advance(m[0]);
          if (/^\s*(\n|$)/.test(src)) {
            const attr = parseHtmlAttr(m[2]);
            root.appendChild(new Element(tag, attr, pos));
            src.skipWS();
            continue;
          }
        }
        else if (tag === 'pre') {
          const t = tokenize(src, { pre: 1, code: 1 }, tag);
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
          const t = tokenize(src, null, tag);
          let s = 1; // start after open tag
          while (/^\s+$/.test(t[s].src)) {
            s++; // skip whitespace
          }
          const p = parseHtml(t.slice(s, -1), true);
          const x = t.pop();
          src.load();
          src.advance(x.pos + x.src.length);
          if (/^\s*(\n|$)/.test(src)) {
            root.appendChild(p);
            src.skipWS(); // skip tailing whitespace
            continue;
          }
        }
        else {
          src.skipWS();
          const t = tokenize(src, null, tag);
          const x = t.pop(); // this should be the end tag
          let s = 1; // start after open tag
          while (t[s] && /^[\n\r]+$/.test(t[s].src)) {
            s++; // skip whitespace
          }
          if (x.tag === tag) {
            // inner can be empty
            const inner = (t.length > 1) ? String(src).slice(t[s].pos, x.pos) : '';
            src.advance(x.pos + x.src.length);
            if (/^\s*(\n|$)/.test(src)) {
              const elm = new Element(tag, parseHtmlAttr(m[2]));
              if (tag === 'script' || tag === 'style') {
                elm.appendChild(new TextNode(inner));
              }
              else {
                const innerHTML = inner.replace(/^\n+/, '').replace(/\s*$/, '');
                const isBlock = /\n\r?\n/.test(innerHTML) || tag === 'ol' || tag === 'ul';
                const innerElm = isBlock
                  ? parseFlow(innerHTML, options)
                  : parsePhrase(innerHTML, { ...options, breaks: false });
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
      root.appendChild(new Element('hr', null, src.offset));
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
