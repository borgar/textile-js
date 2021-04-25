/* textile inline parser */
import { Element, TextNode, RawNode, CommentNode } from '../VDOM.js';
import re from '../re.js';

import { parseAttr } from './attr.js';
import { parseGlyph } from './glyph.js';
import { parseHtml, parseHtmlAttr, tokenize, testComment, testOpenTag } from '../html.js';
import { singletons } from '../constants.js';

import { ucaps, txattr, txcite } from './re_ext.js';
re.pattern.txattr = txattr;
re.pattern.txcite = txcite;
re.pattern.ucaps = ucaps;

const phraseConvert = {
  '*': 'strong',
  '**': 'b',
  '??': 'cite',
  '_': 'em',
  '__': 'i',
  '-': 'del',
  '%': 'span',
  '+': 'ins',
  '~': 'sub',
  '^': 'sup',
  '@': 'code'
};

const rePhrase = /^(\[?)(__?|\*\*?|\?\?|[-+^~@%])/;
const reImage = re.compile(/^!(?!\s)([:txattr:](?:\.[^\n\S]|\.(?:[^./]))?)([^!\s]+?) ?(?:\(((?:[^()]|\([^()]+\))+)\))?!(?::([^\s]+?(?=[!-.:-@[\\\]-`{-~](?:$|\s)|\s|$)))?/);
const reImageFenced = re.compile(/^\[!(?!\s)([:txattr:](?:\.[^\n\S]|\.(?:[^./]))?)([^!\s]+?) ?(?:\(((?:[^()]|\([^()]+\))+)\))?!(?::([^\s]+?(?=[!-.:-@[\\\]-`{-~](?:$|\s)|\s|$)))?\]/);
// NB: there is an exception in here to prevent matching "TM)"
const reCaps = re.compile(/^((?!TM\)|tm\))[[:ucaps:]](?:[[:ucaps:]\d]{1,}(?=\()|[[:ucaps:]\d]{2,}))(?:\((.*?)\))?(?=\W|$)/);
const reLink = re.compile(/^"(?!\s)((?:[^"]|"(?![\s:])[^\n"]+"(?!:))+)"[:txcite:]/);
const reLinkFenced = /^\["([^\n]+?)":((?:\[[a-z0-9]*\]|[^\]])+)\]/;
const reLinkTitle = /\s*\(((?:\([^()]*\)|[^()])+)\)$/;
const reFootnote = /^\[(\d+)(!?)\]/;

const getMatchRe = (tok, fence, code) => {
  let mMid;
  let mEnd;
  if (fence === '[') {
    mMid = '^(.*?)';
    mEnd = '(?:])';
  }
  else {
    const t1 = re.escape(tok.charAt(0));
    mMid = code
      ? '^(\\S+|\\S+.*?\\S)'
      : `^([^\\s${t1}]+|[^\\s${t1}].*?\\S(${t1}*))`;
    mEnd = '(?=$|[\\s.,"\'!?;:()«»„“”‚‘’<>])';
  }
  return re.compile(`${mMid}(?:${re.escape(tok)})${mEnd}`);
};

export function parseInline (src, options) {
  const root = new Element('root');
  let m;

  // loop
  do {
    src.save();

    // linebreak -- having this first keeps it from messing to much with other phrases
    const haveCR = src.startsWith('\r\n') ? 1 : 0;
    if (haveCR) {
      src.advance(1); // skip cartridge returns
    }
    if (src.startsWith('\n')) {
      if (options.breaks) {
        root.appendChild(new Element('br').setPos(src.offset - haveCR, haveCR ? 2 : 1));
      }
      root.appendChild(new TextNode('\n'));
      src.advance(1);
      continue;
    }

    // inline notextile
    if ((m = /^==(.*?)==/.exec(src))) {
      src.advance(m[0]);
      root.appendChild(new RawNode(m[1]));
      continue;
    }

    // lookbehind => /([\s>.,"'?!;:])$/
    const behind = src.lookbehind(1);
    const boundary = !behind || /^[\s<>.,"'?!;:()[\]%{}]$/.test(behind);
    // FIXME: need to test right boundary for phrases as well
    if ((m = rePhrase.exec(src)) && (boundary || m[1])) {
      const baseAttr = {};
      const offs = src.offset;
      src.advance(m[0]);
      const tok = m[2];
      const fence = m[1];
      const phraseType = phraseConvert[tok];
      const isCode = phraseType === 'code';

      const [ step, attr ] = isCode ? [ 0, {} ] : parseAttr(src, phraseType, tok);
      if (step) {
        src.advance(step);
      }
      // FIXME: if we can't match the fence on the end, we should output fence-prefix as normal text
      // seek end
      const m2 = getMatchRe(tok, fence, isCode).exec(src);
      if (m2 && m2[1]) {
        if (isCode) {
          root
            .appendChild(new Element(phraseType, baseAttr).setPos(offs, m2[0].length + (fence ? 2 : 1)))
            .appendChild(new RawNode(m2[1]));
        }
        else {
          const endOffs = src.offset + m2[0].length;
          root
            .appendChild(
              new Element(phraseType, { ...baseAttr, ...attr })
                .setPos(offs, endOffs - offs)
            )
            .appendChild(parseInline(src.sub(0, m2[1].length), options));
        }
        src.advance(m2[0]);
        continue;
      }
      // else
      src.load();
    }

    // image
    if ((m = reImage.exec(src)) || (m = reImageFenced.exec(src))) {
      const attr = parseAttr(m[1] || '', 'img')[1];
      attr.src = m[2];
      attr.alt = m[3] ? (attr.title = m[3]) : '';
      const startPos = src.offset;
      const length = m[0].length;
      if (m[4]) { // +cite causes image to be wraped with a link (or link_ref)?
        // TODO: support link_ref for image cite
        root
          .appendChild(new Element('a', { href: m[4] }).setPos(startPos, length))
          .appendChild(new Element('img', attr).setPos(startPos, length - m[4].length - 1));
      }
      else {
        root
          .appendChild(new Element('img', attr).setPos(startPos, length));
      }
      src.advance(m[0]);
      continue;
    }

    // html comment
    if ((m = testComment(src))) {
      const node = new CommentNode(m[1]);
      node.html = true;
      node.setPos(src.offset, m[0].length);
      root.appendChild(node);
      src.advance(m[0]);
      continue;
    }

    // html tag
    // TODO: this seems to have a lot of overlap with block tags... DRY?
    if ((m = testOpenTag(src))) {
      const tag = m[1];
      const single = m[3] || m[1] in singletons;
      const element = new Element(tag, parseHtmlAttr(m[2]));
      const startPos = src.offset;
      element.html = true;
      src.advance(m[0]);
      if (single) { // single tag
        element.setPos(startPos, m[0].length);
        root.appendChild(element);
        root.appendChild(new TextNode(src.skipWS()));
        continue;
      }
      else { // need terminator
        // gulp up the rest of this block...
        const reEndTag = re.compile(`^(.*?)(</${tag}\\s*>)`, 's');
        let child = element;
        const m2 = reEndTag.exec(src);
        if (m2) {
          if (tag === 'code') {
            element.appendChild(new RawNode(m2[1]));
          }
          else if (tag === 'notextile') {
            // HTML is still parsed, even though textile is not
            const inner = src.sub(0, m2[1].length);
            child = parseHtml(tokenize(inner));
          }
          else {
            const inner = src.sub(0, m2[1].length);
            element.appendChild(parseInline(inner, options));
          }
          element.setPos(startPos, m[0].length + m2[0].length);
          root.appendChild(child);
          src.advance(m2[0]);
          continue;
        }
        // end tag is missing, treat tag as normal text...
      }
      src.load();
    }

    // footnote
    if ((m = reFootnote.exec(src)) && /\S/.test(behind)) {
      const sup = new Element('sup', { class: 'footnote', id: 'fnr' + m[1] }).setPos(src.offset, m[0].length);
      if (m[2] === '!') { // "!" suppresses the link
        sup.appendChild(new TextNode(m[1]));
      }
      else {
        sup
          .appendChild(new Element('a', { href: '#fn' + m[1] }).setPos(src.offset, m[0].length))
          .appendChild(new TextNode(m[1]));
      }
      root.appendChild(sup);
      src.advance(m[0]);
      continue;
    }

    // caps / abbr
    if ((m = reCaps.exec(src))) {
      const caps = new Element('span', { class: 'caps' }).setPos(src.offset, m[0].length);
      caps.appendChild(new TextNode(m[1]));
      if (m[2]) {
        root
          .appendChild(new Element('abbr', { title: m[2] }).setPos(src.offset, m[0].length))
          .appendChild(caps);
      }
      else {
        root.appendChild(caps);
      }
      src.advance(m[0]);
      continue;
    }

    // links
    if ((boundary && (m = reLink.exec(src))) || (m = reLinkFenced.exec(src))) {
      const link = root.appendChild(new Element('a'));
      link.setPos(src.offset, m[0].length);

      const title = reLinkTitle.exec(m[1]);
      const isFenced = m[0][0] === '[';
      const titleLen = title ? title[0].length : 0;
      let inner = src.sub(isFenced ? 2 : 1, m[1].length - titleLen);
      const [ step, attr ] = parseAttr(inner, 'a');
      if (step) {
        inner.advance(step);
        link.setAttr(attr);
      }
      link.setAttribute('href', m[2]);
      if (title && !inner.length) {
        inner = src.sub((isFenced ? 2 : 1) + step, m[1].length - step);
      }
      else if (title) {
        link.setAttribute('title', title[1]);
      }
      // links may self-reference their url via $
      if (inner.equals('$')) {
        inner = m[2].replace(/^(https?:\/\/|ftps?:\/\/|mailto:)/, '');
        link.appendChild(new RawNode(inner));
      }
      else {
        inner.skipRe(/^(\.?\s*)/);
        const content = parseInline(inner, options);
        link.appendChild(content);
      }
      src.advance(m[0]);
      continue;
    }

    // no match, move by all "uninteresting" chars
    m = /([a-zA-Z0-9,.':]+|[ \f\r\t\v\xA0\u2028\u2029]+|[^\0])/.exec(src);
    if (m) {
      root.appendChild(new TextNode(m[0]));
    }
    src.advance(m ? m[0].length || 1 : 1);
  }
  while (src.valueOf());

  // FIXME: might be better to post process the entire tree as a last step?
  // convert certain glyphs in text nodes
  root.children.forEach(node => {
    if (node instanceof TextNode) {
      node.data = parseGlyph(node.data);
    }
  });
  return root.children;
}
