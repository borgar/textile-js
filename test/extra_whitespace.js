import test from 'tape';
import textile from '../src/index.js';
// extra_whitespace.yml

test('header with 1 blank line below', t => {
  const tx = `h1. Header

text`;
  t.is(textile.convert(tx),
    `<h1>Header</h1>
<p>text</p>`, tx);
  t.end();
});


test('header with 2 blank lines below', t => {
  const tx = `h1. Header


text`;
  t.is(textile.convert(tx),
    `<h1>Header</h1>
<p>text</p>`, tx);
  t.end();
});


test('header with 1 blank line above', t => {
  const tx = `text

h1. Header`;
  t.is(textile.convert(tx),
    `<p>text</p>
<h1>Header</h1>`, tx);
  t.end();
});


test('header with 2 blank lines above', t => {
  const tx = `text


h1. Header`;
  t.is(textile.convert(tx),
    `<p>text</p>
<h1>Header</h1>`, tx);
  t.end();
});

