import test from 'tape';
import textile from '../src/index.js';

test('endnote refs can be adjacent to text', t => {
  t.is(textile.convert('text[#note] text'),
    '<p>text<sup><a href="#note-1"><span id="noteref-1.1">1</span></a></sup> text</p>',
    'postfixed note');
  t.is(textile.convert('text [#note]text'),
    '<p>text <sup><a href="#note-1"><span id="noteref-1.1">1</span></a></sup>text</p>',
    'prefixed note');
  t.end();
});

test('endnote refs can take attributes', t => {
  t.is(textile.convert('text [(foo)#note] text'),
    '<p>text <sup class="foo"><a href="#note-1"><span id="noteref-1.1">1</span></a></sup> text</p>',
    'classname');
  t.is(textile.convert('text [(foo#bar)#note] text'),
    '<p>text <sup class="foo" id="bar"><a href="#note-1"><span id="noteref-1.1">1</span></a></sup> text</p>',
    'classname and id');
  t.end();
});

test('endnote refs accept no-backlink modifier', t => {
  t.is(textile.convert('text [#note!] text'),
    '<p>text <sup><span id="noteref-1.1">1</span></sup> text</p>',
    'simple case');
  t.is(textile.convert('text [(foo#bar)#note!] text'),
    '<p>text <sup class="foo" id="bar"><span id="noteref-1.1">1</span></sup> text</p>',
    'case with attributes');
  t.end();
});

// defs

test('note definitions are not output', t => {
  t.is(textile.convert('note#foo. text'),
    '',
    'single note only');
  t.is(textile.convert('note#foo. text\n\nnote#bar. text'),
    '',
    'two notes only');
  t.is(textile.convert('text\n\nnote#foo. text\n\ntext'),
    '<p>text</p>\n<p>text</p>',
    'embedded in paragraphs');
  t.end();
});

// lists

test('nodelist', t => {
  t.is(textile.convert('note#foo. endnote\n\nnotelist.'),
    '',
    'no active refs');

  t.is(textile.convert('note#foo. endnote\n\nnotelist+.'),
    `<ol>
\t<li>endnote</li>
</ol>`,
    'no active refs but forced all');

  t.end();
});

test('nodelist formatting', t => {
  t.is(textile.convert('note#foo(cls2). endnote\n\nnotelist(cls1)+.'),
    `<ol class="cls1">
\t<li class="cls2">endnote</li>
</ol>`,
    'classnames');

  t.is(textile.convert('note#foo(#id2). endnote\n\nnotelist(#id1)+.'),
    `<ol id="id1">
\t<li id="id2">endnote</li>
</ol>`,
    'ids');

  t.is(textile.convert('note#foo{padding:2em;margin:2em;border-bottom:2px solid red}. endnote\n\nnotelist{padding:1em;margin:1em;border-bottom:1px solid gray}+.'),
    `<ol style="padding:1em;margin:1em;border-bottom:1px solid gray">
\t<li style="padding:2em;margin:2em;border-bottom:2px solid red">endnote</li>
</ol>`,
    'styles');

  t.end();
});

test('nodelist order', t => {
  t.is(textile.convert(`text [#aa]
text [#aa]
text [#bb]

note#aa(cls1). note1.

note#cc. note2

notelist(cls2):a^+.`),
  `<p>text <sup><a href="#note-1"><span id="noteref-1.1">1</span></a></sup><br />
text <sup><a href="#note-1"><span id="noteref-1.2">1</span></a></sup><br />
text <sup><a href="#note-2"><span id="noteref-2.1">2</span></a></sup></p>
<ol class="cls2">
\t<li class="cls1"><sup><a href="#noteref-1.1">a</a></sup><span id="note-1"> </span>note1.</li>
\t<li><sup><a href="#noteref-2.1">a</a></sup><span id="note-2"> </span>Undefined Note [#2].</li>
\t<li>note2</li>
</ol>`,
  'undefined order 1');

  t.is(textile.convert(`text [#bb]
text [#aa]
text [#aa]

note#aa(cls1). note1.

note#cc. note2

notelist(cls2):a^+.`),
  `<p>text <sup><a href="#note-1"><span id="noteref-1.1">1</span></a></sup><br />
text <sup><a href="#note-2"><span id="noteref-2.1">2</span></a></sup><br />
text <sup><a href="#note-2"><span id="noteref-2.2">2</span></a></sup></p>
<ol class="cls2">
\t<li><sup><a href="#noteref-1.1">a</a></sup><span id="note-1"> </span>Undefined Note [#1].</li>
\t<li class="cls1"><sup><a href="#noteref-2.1">a</a></sup><span id="note-2"> </span>note1.</li>
\t<li>note2</li>
</ol>`,
  'undefined order 2');

  t.end();
});

test('nodelist link settings', t => {
  t.is(textile.convert('[#a] [#a] [#b] [#b] [#c] [#c] [#d] [#d]\n\n' +
'note#a!. A\n\n' +
'note#b^. B\n\n' +
'note#c*. C\n\n' +
'note#d. D\n\n' +
'notelist.'),
  '<p><sup><a href="#note-1"><span id="noteref-1.1">1</span></a></sup> ' +
'<sup><a href="#note-1"><span id="noteref-1.2">1</span></a></sup> ' +
'<sup><a href="#note-2"><span id="noteref-2.1">2</span></a></sup> ' +
'<sup><a href="#note-2"><span id="noteref-2.2">2</span></a></sup> ' +
'<sup><a href="#note-3"><span id="noteref-3.1">3</span></a></sup> ' +
'<sup><a href="#note-3"><span id="noteref-3.2">3</span></a></sup> ' +
'<sup><a href="#note-4"><span id="noteref-4.1">4</span></a></sup> ' +
'<sup><a href="#note-4"><span id="noteref-4.2">4</span></a></sup></p>\n' +
'<ol>\n' +
'\t<li>A</li>\n' +
'\t<li><sup><a href="#noteref-2.1">a</a></sup><span id="note-2"> </span>B</li>\n' +
'\t<li><sup><a href="#noteref-3.1">a</a></sup> <sup><a href="#noteref-3.2">b</a></sup><span id="note-3"> </span>C</li>\n' +
'\t<li><sup><a href="#noteref-4.1">a</a></sup> <sup><a href="#noteref-4.2">b</a></sup><span id="note-4"> </span>D</li>\n' +
'</ol>',
  'normal with overrides');

  t.is(textile.convert('[#a] [#a] [#b] [#b] [#c] [#c] [#d] [#d]\n\n' +
'note#a!. A\n\n' +
'note#b^. B\n\n' +
'note#c*. C\n\n' +
'note#d. D\n\n' +
'notelist!.'),
  '<p><sup><a href="#note-1"><span id="noteref-1.1">1</span></a></sup> ' +
'<sup><a href="#note-1"><span id="noteref-1.2">1</span></a></sup> ' +
'<sup><a href="#note-2"><span id="noteref-2.1">2</span></a></sup> ' +
'<sup><a href="#note-2"><span id="noteref-2.2">2</span></a></sup> ' +
'<sup><a href="#note-3"><span id="noteref-3.1">3</span></a></sup> ' +
'<sup><a href="#note-3"><span id="noteref-3.2">3</span></a></sup> ' +
'<sup><a href="#note-4"><span id="noteref-4.1">4</span></a></sup> ' +
'<sup><a href="#note-4"><span id="noteref-4.2">4</span></a></sup></p>\n' +
'<ol>\n' +
'\t<li>A</li>\n' +
'\t<li><sup><a href="#noteref-2.1">a</a></sup><span id="note-2"> </span>B</li>\n' +
'\t<li><sup><a href="#noteref-3.1">a</a></sup> <sup><a href="#noteref-3.2">b</a></sup><span id="note-3"> </span>C</li>\n' +
'\t<li>D</li>\n' +
'</ol>',
  'no links! with overrides');

  t.is(textile.convert('[#a] [#a] [#b] [#b] [#c] [#c] [#d] [#d]\n\n' +
'note#a!. A\n\n' +
'note#b^. B\n\n' +
'note#c*. C\n\n' +
'note#d. D\n\n' +
'notelist^.'),
  '<p><sup><a href="#note-1"><span id="noteref-1.1">1</span></a></sup> ' +
'<sup><a href="#note-1"><span id="noteref-1.2">1</span></a></sup> ' +
'<sup><a href="#note-2"><span id="noteref-2.1">2</span></a></sup> ' +
'<sup><a href="#note-2"><span id="noteref-2.2">2</span></a></sup> ' +
'<sup><a href="#note-3"><span id="noteref-3.1">3</span></a></sup> ' +
'<sup><a href="#note-3"><span id="noteref-3.2">3</span></a></sup> ' +
'<sup><a href="#note-4"><span id="noteref-4.1">4</span></a></sup> ' +
'<sup><a href="#note-4"><span id="noteref-4.2">4</span></a></sup></p>\n' +
'<ol>\n' +
'\t<li>A</li>\n' +
'\t<li><sup><a href="#noteref-2.1">a</a></sup><span id="note-2"> </span>B</li>\n' +
'\t<li><sup><a href="#noteref-3.1">a</a></sup> <sup><a href="#noteref-3.2">b</a></sup><span id="note-3"> </span>C</li>\n' +
'\t<li><sup><a href="#noteref-4.1">a</a></sup><span id="note-4"> </span>D</li>\n' +
'</ol>',
  'one link^ with overrides');

  t.end();
});

test('nodelist link settings', t => {
  t.is(textile.convert('[#a] [#a] [#a] [#a] [#a]\n\n' +
'notelist.'),
  '<p><sup><a href="#note-1"><span id="noteref-1.1">1</span></a></sup> ' +
'<sup><a href="#note-1"><span id="noteref-1.2">1</span></a></sup> ' +
'<sup><a href="#note-1"><span id="noteref-1.3">1</span></a></sup> ' +
'<sup><a href="#note-1"><span id="noteref-1.4">1</span></a></sup> ' +
'<sup><a href="#note-1"><span id="noteref-1.5">1</span></a></sup></p>\n' +
'<ol>\n' +
'\t<li><sup><a href="#noteref-1.1">a</a></sup> ' +
      '<sup><a href="#noteref-1.2">b</a></sup> ' +
      '<sup><a href="#noteref-1.3">c</a></sup> ' +
      '<sup><a href="#noteref-1.4">d</a></sup> ' +
      '<sup><a href="#noteref-1.5">e</a></sup>' +
      '<span id="note-1"> </span>Undefined Note [#1].</li>\n</ol>',
  'notelist.');

  t.is(textile.convert('[#a] [#a] [#a] [#a] [#a]\n\n' +
'notelist:b.'),
  '<p><sup><a href="#note-1"><span id="noteref-1.1">1</span></a></sup> ' +
'<sup><a href="#note-1"><span id="noteref-1.2">1</span></a></sup> ' +
'<sup><a href="#note-1"><span id="noteref-1.3">1</span></a></sup> ' +
'<sup><a href="#note-1"><span id="noteref-1.4">1</span></a></sup> ' +
'<sup><a href="#note-1"><span id="noteref-1.5">1</span></a></sup></p>\n' +
'<ol>\n' +
'\t<li><sup><a href="#noteref-1.1">b</a></sup> ' +
      '<sup><a href="#noteref-1.2">c</a></sup> ' +
      '<sup><a href="#noteref-1.3">d</a></sup> ' +
      '<sup><a href="#noteref-1.4">e</a></sup> ' +
      '<sup><a href="#noteref-1.5">f</a></sup>' +
      '<span id="note-1"> </span>Undefined Note [#1].</li>\n</ol>',
  'notelist:b.');

  t.is(textile.convert('[#a] [#a] [#a] [#a] [#a]\n\n' +
'notelist:¤.'),
  '<p><sup><a href="#note-1"><span id="noteref-1.1">1</span></a></sup> ' +
'<sup><a href="#note-1"><span id="noteref-1.2">1</span></a></sup> ' +
'<sup><a href="#note-1"><span id="noteref-1.3">1</span></a></sup> ' +
'<sup><a href="#note-1"><span id="noteref-1.4">1</span></a></sup> ' +
'<sup><a href="#note-1"><span id="noteref-1.5">1</span></a></sup></p>\n' +
'<ol>\n' +
'\t<li><sup><a href="#noteref-1.1">¤</a></sup> ' +
      '<sup><a href="#noteref-1.2">¤</a></sup> ' +
      '<sup><a href="#noteref-1.3">¤</a></sup> ' +
      '<sup><a href="#noteref-1.4">¤</a></sup> ' +
      '<sup><a href="#noteref-1.5">¤</a></sup>' +
      '<span id="note-1"> </span>Undefined Note [#1].</li>\n</ol>',
  'notelist:¤.');

  t.is(textile.convert('[#a] [#a] [#a] [#a] [#a]\n\n' +
'notelist:1.'),
  '<p><sup><a href="#note-1"><span id="noteref-1.1">1</span></a></sup> ' +
'<sup><a href="#note-1"><span id="noteref-1.2">1</span></a></sup> ' +
'<sup><a href="#note-1"><span id="noteref-1.3">1</span></a></sup> ' +
'<sup><a href="#note-1"><span id="noteref-1.4">1</span></a></sup> ' +
'<sup><a href="#note-1"><span id="noteref-1.5">1</span></a></sup></p>\n' +
'<ol>\n' +
'\t<li><sup><a href="#noteref-1.1">1</a></sup> ' +
      '<sup><a href="#noteref-1.2">2</a></sup> ' +
      '<sup><a href="#noteref-1.3">3</a></sup> ' +
      '<sup><a href="#noteref-1.4">4</a></sup> ' +
      '<sup><a href="#noteref-1.5">5</a></sup>' +
      '<span id="note-1"> </span>Undefined Note [#1].</li>\n</ol>',
  'notelist:1.');

  t.is(textile.convert('[#a] [#a] [#a] [#a] [#a]\n\n' +
'notelist:þ.'),
  '<p><sup><a href="#note-1"><span id="noteref-1.1">1</span></a></sup> ' +
'<sup><a href="#note-1"><span id="noteref-1.2">1</span></a></sup> ' +
'<sup><a href="#note-1"><span id="noteref-1.3">1</span></a></sup> ' +
'<sup><a href="#note-1"><span id="noteref-1.4">1</span></a></sup> ' +
'<sup><a href="#note-1"><span id="noteref-1.5">1</span></a></sup></p>\n' +
'<ol>\n' +
'\t<li><sup><a href="#noteref-1.1">þ</a></sup> ' +
      '<sup><a href="#noteref-1.2">ÿ</a></sup> ' +
      '<sup><a href="#noteref-1.3">Ā</a></sup> ' +
      '<sup><a href="#noteref-1.4">ā</a></sup> ' +
      '<sup><a href="#noteref-1.5">Ă</a></sup>' +
      '<span id="note-1"> </span>Undefined Note [#1].</li>\n</ol>',
  'notelist:þ.');

  t.is(textile.convert('[#a] [#a] [#a] [#a] [#a]\n\n' +
'notelist:8.'),
  '<p><sup><a href="#note-1"><span id="noteref-1.1">1</span></a></sup> ' +
'<sup><a href="#note-1"><span id="noteref-1.2">1</span></a></sup> ' +
'<sup><a href="#note-1"><span id="noteref-1.3">1</span></a></sup> ' +
'<sup><a href="#note-1"><span id="noteref-1.4">1</span></a></sup> ' +
'<sup><a href="#note-1"><span id="noteref-1.5">1</span></a></sup></p>\n' +
'<ol>\n' +
'\t<li><sup><a href="#noteref-1.1">8</a></sup> ' +
      '<sup><a href="#noteref-1.2">9</a></sup> ' +
      '<sup><a href="#noteref-1.3">10</a></sup> ' +
      '<sup><a href="#noteref-1.4">11</a></sup> ' +
      '<sup><a href="#noteref-1.5">12</a></sup>' +
      '<span id="note-1"> </span>Undefined Note [#1].</li>\n</ol>',
  'notelist:8.');

/*
  t.is(textile.convert('[#a] [#a] [#a] [#a] [#a]\n\n' +
'notelist:x.'),
  '<p><sup><a href="#note-1"><span id="noteref-1.1">1</span></a></sup> ' +
'<sup><a href="#note-1"><span id="noteref-1.2">1</span></a></sup> ' +
'<sup><a href="#note-1"><span id="noteref-1.3">1</span></a></sup> ' +
'<sup><a href="#note-1"><span id="noteref-1.4">1</span></a></sup> ' +
'<sup><a href="#note-1"><span id="noteref-1.5">1</span></a></sup></p>\n' +
'<ol>\n' +
'\t<li><sup><a href="#noteref-1.1">x</a></sup> ' +
      '<sup><a href="#noteref-1.2">y</a></sup> ' +
      '<sup><a href="#noteref-1.3">z</a></sup> ' +
      '<sup><a href="#noteref-1.4">aa</a></sup> ' +
      '<sup><a href="#noteref-1.5">ab</a></sup>' +
      '<span id="note-1"> </span>Undefined Note [#1].</li>\n</ol>',
  'notelist:x.');
*/
/*
x => x y z aa ab
8 => 8 9 10 11 12
*/

  t.end();
});



/*
test('links:1', t => {
  const tx = `
Scientists say[#lavader] the moon is quite small. But I, for one, don't believe them. Others claim it to be made of cheese[#aardman]. If this proves true I suspect we are in for troubled times[#apollo13] as people argue over their "share" of the moon's cheese. In the end, its limited size[#lavader] may prove problematic.

note#lavader(noteclass). "Proof of the small moon hypothesis":http://antwrp.gsfc.nasa.gov/apod/ap080801.html. Copyright(c) Laurent Laveder

note#aardman(#noteid). "Proof of a cheese moon":http://www.imdb.com/title/tt0104361

note#apollo13. After all, things do go "wrong":http://en.wikipedia.org/wiki/Apollo_13#The_oxygen_tank_incident.

notelist{padding:1em;margin:1em;border-bottom:1px solid gray}.

notelist{padding:1em;margin:1em;border-bottom:1px solid gray}:§^.

notelist{padding:1em;margin:1em;border-bottom:1px solid gray}:‡.

notelist!.
`;
  t.is(textile.convert(tx),
    `<p>Scientists say<sup><a href="#note"><span id="noteref">1</span></a></sup> the moon is quite small. But I, for one, don&#8217;t believe them. Others claim it to be made of cheese<sup><a href="#note"><span id="noteref">2</span></a></sup>. If this proves true I suspect we are in for troubled times<sup><a href="#note"><span id="noteref">3</span></a></sup> as people argue over their &#8220;share&#8221; of the moon&#8217;s cheese. In the end, its limited size<sup><a href="#note"><span id="noteref">1</span></a></sup> may prove problematic.</p>
<ol style="border-bottom:1px solid gray;margin:1em;padding:1em;">
\t<li class="noteclass"><sup><a href="#noteref">a</a></sup> <sup><a href="#noteref">b</a></sup><span id="note"> </span><a href="http://antwrp.gsfc.nasa.gov/apod/ap080801.html">Proof of the small moon hypothesis</a>. Copyright&#169; Laurent Laveder</li>
\t<li id="noteid"><sup><a href="#noteref">a</a></sup><span id="note"> </span><a href="http://www.imdb.com/title/tt0104361">Proof of a cheese moon</a></li>
\t<li><sup><a href="#noteref">a</a></sup><span id="note"> </span>After all, things do go <a href="http://en.wikipedia.org/wiki/Apollo_13#The_oxygen_tank_incident">wrong</a>.</li>
</ol>
<ol style="border-bottom:1px solid gray;margin:1em;padding:1em;">
\t<li class="noteclass"><sup><a href="#noteref">§</a></sup><span id="note"> </span><a href="http://antwrp.gsfc.nasa.gov/apod/ap080801.html">Proof of the small moon hypothesis</a>. Copyright&#169; Laurent Laveder</li>
\t<li id="noteid"><sup><a href="#noteref">§</a></sup><span id="note"> </span><a href="http://www.imdb.com/title/tt0104361">Proof of a cheese moon</a></li>
\t<li><sup><a href="#noteref">§</a></sup><span id="note"> </span>After all, things do go <a href="http://en.wikipedia.org/wiki/Apollo_13#The_oxygen_tank_incident">wrong</a>.</li>
</ol>
<ol style="border-bottom:1px solid gray;margin:1em;padding:1em;">
\t<li class="noteclass"><sup><a href="#noteref">‡</a></sup> <sup><a href="#noteref">‡</a></sup><span id="note"> </span><a href="http://antwrp.gsfc.nasa.gov/apod/ap080801.html">Proof of the small moon hypothesis</a>. Copyright&#169; Laurent Laveder</li>
\t<li id="noteid"><sup><a href="#noteref">‡</a></sup><span id="note"> </span><a href="http://www.imdb.com/title/tt0104361">Proof of a cheese moon</a></li>
\t<li><sup><a href="#noteref">‡</a></sup><span id="note"> </span>After all, things do go <a href="http://en.wikipedia.org/wiki/Apollo_13#The_oxygen_tank_incident">wrong</a>.</li>
</ol>
<ol>
\t<li class="noteclass"><span> </span><a href="http://antwrp.gsfc.nasa.gov/apod/ap080801.html">Proof of the small moon hypothesis</a>. Copyright&#169; Laurent Laveder</li>
\t<li><span> </span><a href="http://www.imdb.com/title/tt0104361">Proof of a cheese moon</a></li>
\t<li><span> </span>After all, things do go <a href="http://en.wikipedia.org/wiki/Apollo_13#The_oxygen_tank_incident">wrong</a>.</li>
</ol>
`, tx);
  t.end();
});
*/
