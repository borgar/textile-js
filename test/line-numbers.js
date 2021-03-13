const test = require('tape');
const textile = require('../src');

function parse (tx) {
  return textile
    .parseTree(tx)
    .visit(node => {
      if (node.nodeType === 1) {
        node.setAttribute('data-line', node.pos.line + 1);
      }
    })
    .toHTML();
}

test('paragraph', t => {
  t.is(
    parse('one\n\ntwo'),
    '<p data-line="1">one</p>\n<p data-line="3">two</p>'
  );
  t.is(
    parse('p. one\n\np. two'),
    '<p data-line="1">one</p>\n<p data-line="3">two</p>'
  );
  t.is(
    parse('p.. one\n\ntwo'),
    '<p data-line="1">one</p>\n<p data-line="3">two</p>'
  );
  t.end();
});

test('h1', t => {
  t.is(
    parse('one\n\nh1. two'),
    '<p data-line="1">one</p>\n<h1 data-line="3">two</h1>'
  );
  t.is(
    parse('h1. one\n\nh1. two'),
    '<h1 data-line="1">one</h1>\n<h1 data-line="3">two</h1>'
  );
  t.is(
    parse('h1.. one\n\ntwo'),
    '<h1 data-line="1">one</h1>\n<h1 data-line="3">two</h1>'
  );
  t.end();
});

test('h2', t => {
  t.is(
    parse('one\n\nh2. two'),
    '<p data-line="1">one</p>\n<h2 data-line="3">two</h2>'
  );
  t.is(
    parse('h2. one\n\nh2. two'),
    '<h2 data-line="1">one</h2>\n<h2 data-line="3">two</h2>'
  );
  t.is(
    parse('h2.. one\n\ntwo'),
    '<h2 data-line="1">one</h2>\n<h2 data-line="3">two</h2>'
  );
  t.end();
});

test('bc', t => {
  t.is(
    parse('one\n\nbc. two'),
    '<p data-line="1">one</p>\n<pre data-line="3"><code data-line="3">two</code></pre>'
  );
  t.is(
    parse('bc. one\n\nbc. two'),
    '<pre data-line="1"><code data-line="1">one</code></pre>\n<pre data-line="3"><code data-line="3">two</code></pre>'
  );
  t.is(
    parse('bc.. one\n\ntwo'),
    '<pre data-line="1"><code data-line="1">one\n\ntwo</code></pre>'
  );
  t.is(
    parse('one\n\nbc.. one\n\ntwo'),
    '<p data-line="1">one</p>\n<pre data-line="3"><code data-line="3">one\n\ntwo</code></pre>'
  );
  t.end();
});

test('paragraph', t => {
  t.is(
    parse('one\n\nnotextile. two'),
    '<p data-line="1">one</p>\ntwo'
  );
  t.is(
    parse('notextile. one\n\nnotextile. two'),
    'one\ntwo'
  );
  t.is(
    parse('notextile.. one\n\ntwo'),
    'one\n\ntwo'
  );
  t.end();
});


test('pre', t => {
  t.is(
    parse('one\n\npre. two'),
    '<p data-line="1">one</p>\n<pre data-line="3">two</pre>'
  );
  t.is(
    parse('pre. one\n\npre. two'),
    '<pre data-line="1">one</pre>\n<pre data-line="3">two</pre>'
  );
  t.is(
    parse('pre.. one\n\ntwo'),
    '<pre data-line="1">one\n\ntwo</pre>'
  );
  t.is(
    parse('one\n\npre.. one\n\ntwo'),
    '<p data-line="1">one</p>\n<pre data-line="3">one\n\ntwo</pre>'
  );
  t.end();
});
