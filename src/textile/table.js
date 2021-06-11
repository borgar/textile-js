/* textile table parser */

import Re from '../Re.js';
import { Element, TextNode } from '../VDOM.js';
import { parseAttr } from './attr.js';
import { parseInline } from './inline.js';
import { txattr } from './re_ext.js';

const re = new Re({ txattr });
const reTable = re.compile(/^((?:table[:txattr:]\.(?:\s(.+?))\s*\n)?(?:(?:[:txattr:]\.[^\n\S]*)?\|.*?\|[^\n\S]*(?:\n|$))+)([^\n\S]*\n+)?/, 's');
const reHead = /^table(_?)([^\n]*?)\.(?:[ \t](.+?))?\s*\n/;
const reRow = re.compile(/^((?:\|([~^-][:txattr:])\.\s*\n)?([:txattr:]\.[^\n\S]*)?\|)(.*?)\|[^\n\S]*(\n|$)/, 's');
const reCaption = /^\|=([^\n+]*)\n/;
const reColgroup = /^(\|:)([^\n+]*)\|[\r\t ]*\n/;
const reRowgroup = /^\|([\^\-~])([^\n+]*)\.[ \t\r]*\n/;

const charToTag = {
  '^': 'thead',
  '~': 'tfoot',
  '-': 'tbody'
};

export function parseColgroup (src) {
  const colgroup = new Element('colgroup');
  src.splitBy(/\|/, (bit, isCol) => {
    const col = isCol ? {} : colgroup.attr;
    let d = bit.trim();
    if (d) {
      const m1 = /^\\(\d+)/.exec(d);
      if (m1) {
        col.span = +m1[1];
        d = d.sub(m1[0].length);
      }

      const [ step, attr ] = parseAttr(d, 'col');
      if (step) {
        Object.assign(col, attr);
        d = d.sub(step);
      }

      const m2 = /\b\d+\b/.exec(d);
      if (m2) {
        col.width = +m2[0];
      }
    }
    if (isCol) {
      colgroup.appendChild(new TextNode('\n\t\t'));
      colgroup.appendChild(
        new Element('col', col)
          .setPos(bit.offset - 1, bit.length + 1)
      );
    }
  }, false);

  colgroup.appendChild(new TextNode('\n\t'));
  return colgroup;
}

export function testTable (src) {
  return reTable.exec(src);
}

export function parseTable (src, options) {
  const rowgroups = [];
  let colgroup;
  let caption;
  const table = new Element('table').setPos(src.offset, src.length);
  let currentTBody;
  let m;
  let extended = 0;

  const setRowGroup = (type, attr, pos) => {
    // close current group
    if (currentTBody) {
      currentTBody.pos.end = src.offset;
    }
    if (type) {
      currentTBody = new Element(type, attr).setPos(pos);
      rowgroups.push(currentTBody);
    }
  };

  if ((m = reHead.exec(src))) {
    // parse and apply table attr
    const [ , attr ] = parseAttr(m[2], 'table');
    table.setAttr(attr);
    if (m[3]) {
      table.setAttribute('summary', m[3]);
    }
    src.advance(m[0]);
  }

  // caption
  if ((m = reCaption.exec(src))) {
    const [ step, attr ] = parseAttr(m[1], 'caption');
    if (/\./.test(m[1].slice(step))) { // mandatory "."
      const tail = /\|?\s*$/.exec(m[1]);
      const len = m[1].length - 1 - step - (tail ? tail[0].length : 0);
      caption = new Element('caption', attr);
      caption.setPos(src.offset, m[0].length);
      caption.appendChild(parseInline(src.sub(3 + step, len).trim(), options));
      extended++;
      src.advance(m[0]);
    }
  }

  do {
    // colgroup
    if ((m = reColgroup.exec(src))) {
      colgroup = parseColgroup(src.sub(m[1].length, m[2].length));
      colgroup.setPos(src.offset, m[0].length);
      extended++;
      src.advance(m[0]);
    }
    // "rowgroup" (tbody, thead, tfoot)
    else if ((m = reRowgroup.exec(src))) {
      // PHP allows any amount of these in any order
      // and simply translates them straight through
      // the same is done here.
      const tag = charToTag[m[1]] || 'tbody';
      const [ , attr ] = parseAttr(`${m[2]} `, tag);
      setRowGroup(tag, attr, src.offset);
      extended++;
      src.advance(m[0]);
    }
    // row
    else if ((m = reRow.exec(src))) {
      const rowPos = src.offset;
      if (!currentTBody) {
        setRowGroup('tbody', null, rowPos);
      }
      const attr = parseAttr(m[3], 'tr')[1]; // FIXME: requires "\.\s?" -- else what ?
      const row = new Element('tr', attr).setPos(rowPos, m[0].length);
      currentTBody.appendChild(new TextNode('\n\t\t'));
      currentTBody.appendChild(row);
      const inner = src.sub(m[1].length, m[4].length);

      let isMore;
      let cellNum = 0;
      do {
        inner.save();
        row.appendChild(new TextNode('\n\t\t\t'));

        const cellPos = cellNum ? inner.offset - 1 : rowPos;

        const isTh = inner.startsWith('_');
        if (isTh) {
          inner.advance(1);
        }

        const [ step, attr ] = parseAttr(inner, 'td');
        inner.advance(step);

        let cell = new Element(isTh ? 'th' : 'td', attr);
        if (step || isTh) {
          const p = /^\.\s*/.exec(inner);
          if (p) {
            inner.advance(p[0]);
          }
          else {
            cell = new Element('td');
            inner.load();
          }
        }

        const mx = /^(==.*?==|[^|])*/.exec(inner);
        const contentLength = mx[0].length;
        cell.setPos(cellPos, (inner.offset + contentLength) - cellPos);
        cell.appendChild(parseInline(inner.sub(0, contentLength), options));

        row.appendChild(cell);

        isMore = inner.charAt(contentLength) === '|';
        inner.advance(contentLength + 1);

        cellNum++;
      }
      while (isMore);

      row.appendChild(new TextNode('\n\t\t'));
      src.advance(m[0]);
    }
  }
  while (m);

  // close the table
  src.skipWS();
  setRowGroup(null, null, src.offset);

  // assemble table
  if (extended) {
    if (caption) {
      table.appendChild(new TextNode('\n\t'));
      table.appendChild(caption);
    }
    if (colgroup) {
      table.appendChild(new TextNode('\n\t'));
      table.appendChild(colgroup);
    }
    rowgroups.forEach(tbody => {
      table.appendChild(new TextNode('\n\t'));
      table
        .appendChild(tbody)
        .appendChild(new TextNode('\n\t'));
    });
  }
  else {
    table.appendChild(rowgroups[0].children);
    table.reIndent(-1);
  }

  table.appendChild(new TextNode('\n'));
  return table;
}
