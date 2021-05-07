/*
** textile flow content parser
*/
import Ribbon from '../Ribbon.js';
import { Element, TextNode, RawNode, HiddenNode, CommentNode, ExtendedNode } from '../VDOM.js';
import re from '../re.js';

import { parseHtml, tokenize, parseHtmlAttr, testComment, testOpenTagBlock } from '../html.js';
import { singletons } from '../constants.js';

import { safeHref } from './safeHref.js';
import { parseInline } from './inline.js';
import { parseGlyph } from './glyph.js';
import { copyAttr, parseAttr } from './attr.js';
import { testList, parseList } from './list.js';
import { testDefListRC, parseDefListRC } from './deflistrc.js';
import { testDefListWiki, parseDefListWiki } from './deflistwiki.js';
import { testTable, parseTable } from './table.js';
import { testEndnote, parseEndnote, testNotelist, parseNotelist, renderNotelist } from './endnote.js';

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
const reLinkRef = /^\[([^\]]+)\]((?:([a-zA-Z]+):|\/)\S+)(?:\s*\n|$)/;
const reFootnoteDef = /^fn(\d+)(\^?)$/;

const getBlockRe = (blockType, isExtended) => {
  if (blockType === 'bc' || blockType === 'pre') {
    return isExtended ? reBlockExtendedPre : reBlockNormalPre;
  }
  return isExtended ? reBlockExtended : reBlockNormal;
};

function splitParagraphs (src, { tag = 'p', attr = {}, linebreak = '\n', options }) {
  let out = [];
  src.splitBy(/(?:\r?\n){2,}/, (bit, index) => {
    if (tag === 'p' && /^\s/.test(bit)) {
      // no-paragraphs
      out = out.concat(parseInline(bit.trim(), options));
    }
    else {
      if (linebreak && index) {
        out.push(new TextNode('\n'));
      }
      const elm = new Element(tag, attr).setPos(bit.offset, bit.length);
      elm.appendChild(parseInline(bit.trimEndNewlines(), options));
      out.push(elm);
    }
  });
  return out;
}

export function parseBlock (src, options) {
  const root = new Element('root');

  const linkRefs = {};
  let skipNextLineBreak = true;
  let m;

  if (!(src instanceof Ribbon)) {
    src = new Ribbon(src.replace(/^( *\r?\n)+/, ''));
  }

  // loop
  while (src.valueOf()) {
    src.save();

    // these go first because they shouldn't trigger a linebreak

    // link_ref
    if ((m = reLinkRef.exec(src))) {
      src.advance(m[0]);
      linkRefs[m[1]] = m[2];
      continue;
    }

    // endnote definition
    if ((m = testEndnote(src))) {
      const len = m[0].length;
      root.appendChild(parseEndnote(src.sub(0, len), options));
      src.advance(len);
      continue;
    }

    // add linebreak
    if (!skipNextLineBreak) {
      root.appendChild(new TextNode('\n'));
    }
    skipNextLineBreak = false;


    // named block
    if ((m = reBlock.exec(src))) {
      const outerOffs = src.offset;
      src.advance(m[0]);
      const blockType = m[0];
      const [ step, attr ] = parseAttr(src, blockType);
      src.advance(step);

      // FIXME: this whole copyAttr deal seems rather strange?
      // slurp rest of block
      if ((m = /^\.(\.?)(?:\s|(?=:))/.exec(src))) {
        let fn;
        const isExtended = !!m[1];
        src.advance(m[0]);

        m = getBlockRe(blockType, isExtended).exec(src);

        // find the size of the block (including any trailing newlines)
        const blockLen = (src.offset + m[0].length) - outerOffs;

        // any trailing newlines belong to this block
        // const inner = src.sub(0, m[1].length);
        const inner = src.sub(0, m[0].length);

        // Extended blocks are wrapped in a container so that
        // the source start/end positions make sense, and the
        // relationship between the child blocks is not lost
        let parentNode = root;
        if (isExtended) {
          parentNode = new ExtendedNode();
          parentNode.setPos(outerOffs, blockLen);
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
          const par = splitParagraphs(inner, {
            attr: copyAttr(attr, { cite: 1, id: 1 }),
            options: options
          });
          parentNode
            .appendChild(new Element('blockquote', attr).setPos(outerOffs, blockLen))
            .appendChild([ new TextNode('\n'), ...par, new TextNode('\n') ]);
        }

        else if (blockType === 'bc') {
          parentNode
            .appendChild(new Element('pre', attr).setPos(outerOffs, blockLen))
            .appendChild(
              new Element('code', copyAttr(attr, { id: 1 }))
                .setPos(inner.offset, blockLen - (inner.offset - outerOffs))
            )
            .appendChild(new RawNode(inner.trimEndNewlines()));
        }

        else if (blockType === 'notextile') {
          parentNode.appendChild(
            parseHtml(tokenize(inner.trimEndNewlines()), null, true)
          );
        }

        else if (blockType === '###') {
          // ignore the insides
          parentNode.appendChild(
            new HiddenNode(inner.trimEndNewlines())
              .setPos(outerOffs, blockLen)
          );
          skipNextLineBreak = true;
        }

        else if (blockType === 'pre') {
          // I disagree with RedCloth, but agree with PHP here:
          // "pre(foo#bar).. line1\n\nline2" prevents multiline preformat blocks
          // ...which seems like the whole point of having an extended pre block?
          parentNode
            .appendChild(new Element('pre', attr).setPos(outerOffs, blockLen))
            .appendChild(new RawNode(inner.trimEndNewlines()));
        }

        else if ((fn = reFootnoteDef.exec(blockType))) { // footnote
          // Need to be careful: RedCloth fails "fn1(foo#m). footnote" -- it confuses the ID
          const fnid = fn[1];
          const shouldBacklink = !!fn[2];
          attr.class = (attr.class ? attr.class + ' ' : '') + 'footnote';
          attr.id = `fn${options.id_prefix ? '-' : ''}${options.id_prefix}-${fnid}`;
          const subAttr = copyAttr(attr, { id: 1, class: 1 });
          let fnMark = new Element('sup', subAttr).setPos(outerOffs + 2, fnid.length);
          fnMark.appendChild(new TextNode(fnid));
          // eslint-disable-next-line no-constant-condition
          if (shouldBacklink || options.auto_backlink) {
            const backlink = new Element('a', { href: `#fnr${options.id_prefix ? '-' : ''}${options.id_prefix}-${fnid}`, ...subAttr })
              .setPos(outerOffs + 2, fnid.length + (shouldBacklink ? 1 : 0));
            backlink.appendChild(fnMark);
            fnMark = backlink;
          }
          parentNode
            .appendChild(new Element('p', attr).setPos(outerOffs, blockLen))
            .appendChild([
              fnMark,
              new TextNode(' '),
              ...parseInline(inner.trimEndNewlines(), options)
            ]);
        }

        else { // heading | paragraph
          const par = splitParagraphs(inner, { tag: blockType, attr, options });
          // first paragraph must use outer offset as its start
          par[0].pos.start = outerOffs;
          parentNode.appendChild(par);
        }

        src.advance(m[0]);
        continue;
      }

      src.load();
    }

    // HTML comment
    if ((m = testComment(src))) {
      const tag = m[0] + (/(?:\s*\n+)+/.exec(src) || [])[0];
      const node = new CommentNode(m[1]);
      node.setPos(src.offset, tag.length);
      node.html = true;
      root.appendChild(node);
      src.advance(tag);
      continue;
    }

    // block HTML
    if ((m = testOpenTagBlock(src))) {
      const openPos = src.offset;
      const tagName = m[1];

      // Is block tag? ...
      if (options.allowed_block_tags && options.allowed_block_tags.includes(tagName)) {
        if (m[3] || tagName in singletons) { // single?
          src.advance(m[0]);
          if (/^\s*(\n|$)/.test(src)) {
            src.skipWS();
            root.appendChild(new Element(tagName, parseHtmlAttr(m[2])).setPos(openPos, src.offset - openPos));
            continue;
          }
        }
        else if (tagName === 'pre') {
          const t = tokenize(src.clone(), { pre: 1, code: 1 }, tagName);
          const p = parseHtml(t, true);
          src.load();
          src.advance(p.sourceLength);
          if (/^\s*(\n|$)/.test(src)) {
            root.appendChild(p[0]);
            src.skipWS(); // skip tailing whitespace
            // add tailing whitespace to container tag
            p[0].pos.end = src.offset;
            continue;
          }
        }
        else if (tagName === 'notextile') {
          // merge all child elements
          const t = tokenize(src.clone(), null, tagName);
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
          const tokens = tokenize(src.clone(), null, tagName);
          const endTag = tokens.pop(); // this should be the end tag
          let s = 1; // start after open tag
          while (tokens[s] && /^[\n\r]+$/.test(tokens[s].src)) {
            s++; // skip whitespace
          }
          if (endTag.tag === tagName) {
            // inner can be empty
            const inner = tokens.length > 1
              ? src.sub(tokens[s].index, endTag.index - tokens[s].index)
              : new Ribbon('');

            src.advance(endTag.index + endTag.src.length);

            if (/^\s*(\n|$)/.test(src)) {
              const elm = new Element(tagName, parseHtmlAttr(m[2]));
              elm.html = true;
              if (tagName === 'script' || tagName === 'style') {
                elm.appendChild(new TextNode(inner));
              }
              else {
                const sO = /^\n*/.exec(inner)[0].length;
                const eO = /\s*$/.exec(inner)[0].length;
                const innerHTML = inner.sub(sO, inner.length - sO - eO);
                const isBlock = /\n\r?\n/.test(innerHTML) || tagName === 'ol' || tagName === 'ul';
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
              elm.setPos(openPos, src.offset - openPos);
              continue;
            }
          }
        }
      }
      src.load();
    }

    // ruler
    if ((m = reRuler.exec(src))) {
      const node = new Element('hr').setPos(src.offset, m[0].length);
      root.appendChild(node);
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

    // TX/Wiki definition list
    if ((m = testDefListWiki(src))) {
      const len = m[0].length;
      root.appendChild(parseDefListWiki(src.sub(0, len), options));
      src.advance(len);
      continue;
    }

    // RedCloth definition list
    if ((m = testDefListRC(src))) {
      const len = m[0].length;
      root.appendChild(parseDefListRC(src.sub(0, len), options));
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

    // endnote list
    if ((m = testNotelist(src))) {
      const len = m[0].length;
      root.appendChild(parseNotelist(src.sub(0, len), options));
      src.advance(len);
      continue;
    }

    // paragraph
    m = reBlockNormal.exec(src);
    root.appendChild(
      splitParagraphs(
        src.sub(0, m[0].length),
        { options }
      )
    );
    src.advance(m[0]);
  }

  root.visit(node => {
    if (node.tagName === 'a') {
      let href = node.getAttribute('href');
      if (href) {
        // apply link refs to anchor tags
        if (href && linkRefs[href]) {
          href = linkRefs[href];
        }
        // ensure safe URL in href
        node.setAttribute('href', safeHref(href, options));
      }
    }
    // convert certain glyphs in text nodes
    if (node instanceof TextNode) {
      node.data = parseGlyph(node.data);
    }
  });

  renderNotelist(root, options);

  return root.children;
}
