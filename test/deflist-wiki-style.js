import test from 'tape';
import textile from '../src/index.js';

test('minimal case 1', t => {
  const tx = '; a';
  t.is(
    textile.convert(tx),
    '<dl>\n\t<dt>a</dt>\n</dl>',
    tx
  );
  t.end();
});


test('minimal case 2', t => {
  const tx = ': b';
  t.is(
    textile.convert(tx),
    '<dl>\n\t<dd>b</dd>\n</dl>',
    tx
  );
  t.end();
});


test('minimal case 3', t => {
  const tx = '; a\n: b';
  t.is(
    textile.convert(tx),
    '<dl>\n\t<dt>a</dt>\n\t<dd>b</dd>\n</dl>',
    tx
  );
  t.end();
});

test('minimal case 3', t => {
  const tx = `;(foo). a
g
d
:(bar) b
c`;
  t.is(
    textile.convert(tx),
    `<dl class="foo">
\t<dt>a<br />
g<br />
d</dt>
\t<dd class="bar">b<br />
c</dd>
</dl>`,
    tx
  );
  t.end();
});


test('classes 1', t => {
  const tx = `;(first) Item 1
;(second) Item 2`;
  t.is(
    textile.convert(tx),
    `<dl class="first">
\t<dt>Item 1</dt>
\t<dt class="second">Item 2</dt>
</dl>`,
    tx
  );
  t.end();
});


test('classes 2', t => {
  const tx = `; Item 1
;(second) Item 2`;
  t.is(
    textile.convert(tx),
    `<dl>
\t<dt>Item 1</dt>
\t<dt class="second">Item 2</dt>
</dl>`,
    tx
  );
  t.end();
});


test('classes 3', t => {
  const tx = `;(class#id).
;(first) Item 1
; Item 2`;
  t.is(
    textile.convert(tx),
    `<dl class="class" id="id">
\t<dt class="first">Item 1</dt>
\t<dt>Item 2</dt>
</dl>`,
    tx
  );
  t.end();
});


test('classes 4', t => {
  const tx = `;(class#id).
;(first) Item 1
;(foo#bar).
;(second) Item 2
;(third) Item 3`;
  t.is(
    textile.convert(tx),
    `<dl class="class" id="id">
\t<dt class="first">Item 1</dt>
\t<dt class="second">Item 2</dt>
\t<dt class="third">Item 3</dt>
</dl>`,
    tx
  );
  t.end();
});
