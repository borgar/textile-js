import test from 'tape';
import textile from '../src/index.js';
// block_comments.yml

test('Textile comments', t => {
  const tx = `###. Here's a comment.

h3. Hello

###. And
another
one.

Goodbye.
`;
  t.is(textile.convert(tx),
    `<h3>Hello</h3>

<p>Goodbye.</p>`, tx);
  t.end();
});


test('Textile comments', t => {
  const tx = `Some text here.

###. This is a textile comment block.
It will be removed from your document.

More text to follow.
`;
  t.is(textile.convert(tx),
    `<p>Some text here.</p>

<p>More text to follow.</p>`, tx);
  t.end();
});


test('Textile comments extended', t => {
  const tx = `Some text here.

###.. This is a textile comment block.
It will be removed from your document.

This is also a comment.

p. More text to follow.
`;
  t.is(textile.convert(tx),
    `<p>Some text here.</p>

<p>More text to follow.</p>`, tx);
  t.end();
});

