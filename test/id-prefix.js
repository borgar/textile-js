import test from 'tape';
import textile from '../src/index.js';

test('footnotes', t => {
  const tx = `text[1].

fn1^. note
`;
  t.is(textile.convert(tx, { id_prefix: '12345' }),
    `<p>text<sup class="footnote" id="fnr-12345-1"><a href="#fn-12345-1">1</a></sup>.</p>
<p class="footnote" id="fn-12345-1"><a href="#fnr-12345-1"><sup>1</sup></a> note</p>`, tx);
  t.end();
});

test('endnotes', t => {
  const tx = `The sun is reportedly hot,[#hot] just like freshly baked potatoes.[#hot] Ice is cold.[#cold]

note#hot. Ouch.

note#cold. Brrr.

notelist:1.
`;
  t.is(textile.convert(tx, { id_prefix: '12345' }),
    `<p>The sun is reportedly hot,<sup><a href="#note-12345-1"><span id="noteref-12345-1.1">1</span></a></sup> just like freshly baked potatoes.<sup><a href="#note-12345-1"><span id="noteref-12345-1.2">1</span></a></sup> Ice is cold.<sup><a href="#note-12345-2"><span id="noteref-12345-2.1">2</span></a></sup></p>
<ol>
\t<li><sup><a href="#noteref-12345-1.1">1</a></sup> <sup><a href="#noteref-12345-1.2">2</a></sup><span id="note-12345-1"> </span>Ouch.</li>
\t<li><sup><a href="#noteref-12345-2.1">1</a></sup><span id="note-12345-2"> </span>Brrr.</li>
</ol>`, tx);
  t.end();
});
