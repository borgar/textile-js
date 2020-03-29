/* eslint-disable prefer-const, no-multi-str, quotes */
const test = require( 'tape' );
const textile = require( '../src' );
// basic.yml

test( 'paragraphs showing original line number', function ( t ) {
  let tx = "A single paragraph.\n\n\
Followed by another.";
  t.is( textile.convert( tx, { showOriginalLineNumber: true }),
    '<p data-line="0">A single paragraph.</p>\n\
<p data-line="2">Followed by another.</p>' );
  t.end();
});

test( 'paragraphs preceded by noise, showing original line number', function ( t ) {
  let tx = "\n\nA single paragraph.\n\n\
Followed by another.";
  t.is( textile.convert( tx, { showOriginalLineNumber: true }),
    '<p data-line="2">A single paragraph.</p>\n\
<p data-line="4">Followed by another.</p>' );
  t.end();
});

test( 'paragraphs preceded by noise and 3 lines offset, showing original line number', function ( t ) {
  let tx = "\n\nA single paragraph.\n\n\
Followed by another.";
  t.is( textile.convert( tx, { showOriginalLineNumber: true, lineOffset: 3 }),
    '<p data-line="5">A single paragraph.</p>\n\
<p data-line="7">Followed by another.</p>' );
  t.end();
});

test( 'Headers, paragraphs, and elements, showing original line number', function ( t ) {
  let tx = `h1. level 1 heading

h2. level 2 heading

h3. level 3 heading

h4. level 4 heading

bq. this is blockquoted text.
With a seconde line.

fn1. footnote 1,
With a second line.

fn2. footnote 2,

This text references a footnote[1].

_emphasis_
*strong*
??citation??
-deleted text-
+inserted text+
^superscript^
~subscript~
%span%

p(class). paragraph with a classname

p(#id). paragraph with an ID

p{color:red}. paragrah with a CSS style

p[fr]. paragraphe en français

p<. right aligned paragraph

p>. left aligned paragraph

p=. centered aligned paragraph

p<>. justified text paragraph

"linktext":url

!imageurl!

ABBR(Abbreviation)`;
  t.is( textile.convert( tx, { showOriginalLineNumber: true, lineOffset: 1 }),
    `<h1 data-line="1">level 1 heading</h1>
<h2 data-line="3">level 2 heading</h2>
<h3 data-line="5">level 3 heading</h3>
<h4 data-line="7">level 4 heading</h4>
<blockquote data-line="9">
<p data-line="9">this is blockquoted text.<br />
With a seconde line.</p>
</blockquote>
<p data-line="12" class="footnote" id="fn1"><a href="#fnr1"><sup>1</sup></a> footnote 1,<br />
With a second line.</p>
<p data-line="15" class="footnote" id="fn2"><a href="#fnr2"><sup>2</sup></a> footnote 2,</p>
<p data-line="17">This text references a footnote<sup class="footnote" id="fnr1"><a href="#fn1">1</a></sup>.</p>
<p data-line="19"><em>emphasis</em><br />
<strong>strong</strong><br />
<cite>citation</cite><br />
<del>deleted text</del><br />
<ins>inserted text</ins><br />
<sup>superscript</sup><br />
<sub>subscript</sub><br />
<span>span</span></p>
<p class="class" data-line="28">paragraph with a classname</p>
<p id="id" data-line="30">paragraph with an ID</p>
<p style="color:red" data-line="32">paragrah with a <span class="caps">CSS</span> style</p>
<p lang="fr" data-line="34">paragraphe en français</p>
<p style="text-align:left" data-line="36">right aligned paragraph</p>
<p style="text-align:right" data-line="38">left aligned paragraph</p>
<p style="text-align:center" data-line="40">centered aligned paragraph</p>
<p style="text-align:justify" data-line="42">justified text paragraph</p>
<p data-line="44"><a href="url">linktext</a></p>
<p data-line="46"><img src="imageurl" data-line="46" alt="" /></p>
<p data-line="48"><acronym title="Abbreviation"><span class="caps">ABBR</span></acronym></p>` );
  t.end();
});

test( 'Lists, showing original line number', function ( t ) {
  let tx = `# numbered list item 1
with a second line
# numbered list item 2
with a second line
## with a sub item 1
and a seconde line
## with a sub item 2

* bulleted list first item
with a second line
* bulleted list second item
** with a sub item 1
with a seconde line
** with a sub item 2`;
  t.is( textile.convert( tx, { showOriginalLineNumber: true, lineOffset: 1 }),
    `<ol>
\t<li data-line="1">numbered list item 1<br />
with a second line</li>
\t<li data-line="3">numbered list item 2<br />
with a second line
\t<ol>
\t\t<li data-line="5">with a sub item 1<br />
and a seconde line</li>
\t\t<li data-line="7">with a sub item 2</li>
\t</ol></li>
</ol>
<ul>
\t<li data-line="9">bulleted list first item<br />
with a second line</li>
\t<li data-line="11">bulleted list second item
\t<ul>
\t\t<li data-line="12">with a sub item 1<br />
with a seconde line</li>
\t\t<li data-line="14">with a sub item 2</li>
\t</ul></li>
</ul>` );
  t.end();
});

test( 'Table, showing original line number', function ( t ) {
  let tx = `|_. head |_. table |_. row |
| a multiline
value| table | row 1 |
| a | table | row 2 |`;
  t.is( textile.convert( tx, { showOriginalLineNumber: true, lineOffset: 1 }),
    `<table>
\t<tr data-line="1">
\t\t<th>head </th>
\t\t<th>table </th>
\t\t<th>row </th>
\t</tr>
\t<tr data-line="2">
\t\t<td> a multiline<br />
value</td>
\t\t<td> table </td>
\t\t<td> row 1 </td>
\t</tr>
\t<tr data-line="4">
\t\t<td> a </td>
\t\t<td> table </td>
\t\t<td> row 2 </td>
\t</tr>
</table>` );
  t.end();
});

test( 'Definition list, showing original line number', function ( t ) {
  let tx = `- Word1
Word1 bis
Word1 ter := Definition 1.
- Word2
- Word2 bis 
- Word2 ter := 
Beginning of
a multi-lines
definition =:`;
  t.is( textile.convert( tx, { showOriginalLineNumber: true, lineOffset: 1 }),
    `<dl>
\t<dt data-line="1">Word1<br />
Word1 bis<br />
Word1 ter</dt>
\t<dd data-line="3">Definition 1.</dd>
\t<dt data-line="4">Word2</dt>
\t<dt data-line="5">Word2 bis</dt>
\t<dt data-line="6">Word2 ter</dt>
\t<dd data-line="7"><p data-line="7">Beginning of<br />
a multi-lines<br />
definition</p></dd>
</dl>` );
  t.end();
});

test( 'Headers, paragraphs, and elements, showing original line number and CSS class name', function ( t ) {
  let tx = `h1. level 1 heading

h2. level 2 heading

h3. level 3 heading

h4. level 4 heading

bq. this is blockquoted text.
With a seconde line.

fn1. footnote 1,
With a second line.

fn2. footnote 2,

This text references a footnote[1].

_emphasis_
*strong*
??citation??
-deleted text-
+inserted text+
^superscript^
~subscript~
%span%

p(class). paragraph with a classname

p(#id). paragraph with an ID

p{color:red}. paragrah with a CSS style

p[fr]. paragraphe en français

p<. right aligned paragraph

p>. left aligned paragraph

p=. centered aligned paragraph

p<>. justified text paragraph

"linktext":url

!imageurl!

ABBR(Abbreviation)`;
  t.is( textile.convert( tx, { showOriginalLineNumber: true, lineOffset: 1, cssClassOriginalLineNumber: 'code-line' }),
    `<h1 data-line="1" class="code-line">level 1 heading</h1>
<h2 data-line="3" class="code-line">level 2 heading</h2>
<h3 data-line="5" class="code-line">level 3 heading</h3>
<h4 data-line="7" class="code-line">level 4 heading</h4>
<blockquote data-line="9" class="code-line">
<p data-line="9" class="code-line">this is blockquoted text.<br />
With a seconde line.</p>
</blockquote>
<p data-line="12" class="code-line footnote" id="fn1"><a href="#fnr1"><sup>1</sup></a> footnote 1,<br />
With a second line.</p>
<p data-line="15" class="code-line footnote" id="fn2"><a href="#fnr2"><sup>2</sup></a> footnote 2,</p>
<p data-line="17" class="code-line">This text references a footnote<sup class="footnote" id="fnr1"><a href="#fn1">1</a></sup>.</p>
<p data-line="19" class="code-line"><em>emphasis</em><br />
<strong>strong</strong><br />
<cite>citation</cite><br />
<del>deleted text</del><br />
<ins>inserted text</ins><br />
<sup>superscript</sup><br />
<sub>subscript</sub><br />
<span>span</span></p>
<p class="class code-line" data-line="28">paragraph with a classname</p>
<p id="id" data-line="30" class="code-line">paragraph with an ID</p>
<p style="color:red" data-line="32" class="code-line">paragrah with a <span class="caps">CSS</span> style</p>
<p lang="fr" data-line="34" class="code-line">paragraphe en français</p>
<p style="text-align:left" data-line="36" class="code-line">right aligned paragraph</p>
<p style="text-align:right" data-line="38" class="code-line">left aligned paragraph</p>
<p style="text-align:center" data-line="40" class="code-line">centered aligned paragraph</p>
<p style="text-align:justify" data-line="42" class="code-line">justified text paragraph</p>
<p data-line="44" class="code-line"><a href="url">linktext</a></p>
<p data-line="46" class="code-line"><img src="imageurl" data-line="46" class="code-line" alt="" /></p>
<p data-line="48" class="code-line"><acronym title="Abbreviation"><span class="caps">ABBR</span></acronym></p>` );
  t.end();
});

test( 'Lists, showing original line number and CSS class name', function ( t ) {
  let tx = `# numbered list item 1
with a second line
# numbered list item 2
with a second line
## with a sub item 1
and a seconde line
## with a sub item 2

* bulleted list first item
with a second line
* bulleted list second item
** with a sub item 1
with a seconde line
** with a sub item 2`;
  t.is( textile.convert( tx, { showOriginalLineNumber: true, lineOffset: 1, cssClassOriginalLineNumber: 'code-line' }),
    `<ol>
\t<li data-line="1" class="code-line">numbered list item 1<br />
with a second line</li>
\t<li data-line="3" class="code-line">numbered list item 2<br />
with a second line
\t<ol>
\t\t<li data-line="5" class="code-line">with a sub item 1<br />
and a seconde line</li>
\t\t<li data-line="7" class="code-line">with a sub item 2</li>
\t</ol></li>
</ol>
<ul>
\t<li data-line="9" class="code-line">bulleted list first item<br />
with a second line</li>
\t<li data-line="11" class="code-line">bulleted list second item
\t<ul>
\t\t<li data-line="12" class="code-line">with a sub item 1<br />
with a seconde line</li>
\t\t<li data-line="14" class="code-line">with a sub item 2</li>
\t</ul></li>
</ul>` );
  t.end();
});

test( 'Table, showing original line number and CSS class name', function ( t ) {
  let tx = `|_. head |_. table |_. row |
| a multiline
value| table | row 1 |
| a | table | row 2 |`;
  t.is( textile.convert( tx, { showOriginalLineNumber: true, lineOffset: 1, cssClassOriginalLineNumber: 'code-line' }),
    `<table>
\t<tr data-line="1" class="code-line">
\t\t<th>head </th>
\t\t<th>table </th>
\t\t<th>row </th>
\t</tr>
\t<tr data-line="2" class="code-line">
\t\t<td> a multiline<br />
value</td>
\t\t<td> table </td>
\t\t<td> row 1 </td>
\t</tr>
\t<tr data-line="4" class="code-line">
\t\t<td> a </td>
\t\t<td> table </td>
\t\t<td> row 2 </td>
\t</tr>
</table>` );
  t.end();
});

test( 'Definition list, showing original line number and CSS class name', function ( t ) {
  let tx = `- Word1
Word1 bis
Word1 ter := Definition 1.
- Word2
- Word2 bis 
- Word2 ter := 
Beginning of
a multi-lines
definition =:`;
  t.is( textile.convert( tx, { showOriginalLineNumber: true, lineOffset: 1, cssClassOriginalLineNumber: 'code-line' }),
    `<dl>
\t<dt data-line="1" class="code-line">Word1<br />
Word1 bis<br />
Word1 ter</dt>
\t<dd data-line="3" class="code-line">Definition 1.</dd>
\t<dt data-line="4" class="code-line">Word2</dt>
\t<dt data-line="5" class="code-line">Word2 bis</dt>
\t<dt data-line="6" class="code-line">Word2 ter</dt>
\t<dd data-line="7" class="code-line"><p data-line="7" class="code-line">Beginning of<br />
a multi-lines<br />
definition</p></dd>
</dl>` );
  t.end();
});


// I have to break this rule : https://textile-lang.com/doc/html# : "Raw HTML tags are generally left untouched by Textile."
test( 'PRE block, showing original line number', function ( t ) {
  let tx = '<pre>Test</pre>';
  t.is( textile.convert( tx, { showOriginalLineNumber: true, lineOffset: 1, cssClassOriginalLineNumber: 'code-line' }),
    '<pre data-line="1" class="code-line">Test</pre>' );
  t.end();
});

// I have to break this rule : https://textile-lang.com/doc/html# : "Raw HTML tags are generally left untouched by Textile."
test( 'P block, showing original line number', function ( t ) {
  let tx = "<p>\nbq. This is a blockquote.\n</p>";
  t.is( textile.convert( tx, { showOriginalLineNumber: true, lineOffset: 1, cssClassOriginalLineNumber: 'code-line' }),
    '<p data-line="1" class="code-line">\nbq. This is a blockquote.\n</p>' );
  t.end();
});

// I have to break this rule : https://textile-lang.com/doc/html# : "Raw HTML tags are generally left untouched by Textile."
test( 'HR, showing original line number', function ( t ) {
  let tx = "<hr>\n<hr>";
  t.is( textile.convert( tx, { showOriginalLineNumber: true, lineOffset: 1, cssClassOriginalLineNumber: 'code-line' }),
    '<hr data-line="1" class="code-line" />\n<hr data-line="2" class="code-line" />' );
  t.end();
});

test( 'RULER, showing original line number', function ( t ) {
  let tx = "----\n\n"; // 2 new lines are necessary ?
  t.is( textile.convert( tx, { showOriginalLineNumber: true, lineOffset: 1, cssClassOriginalLineNumber: 'code-line' }),
    '<hr data-line="1" class="code-line" />' );
  t.end();
});

test( 'HTML comment, have original line number in JsonML tree', function ( t ) {
  let tx = '<!-- A -->';
  t.deepEqual( textile.tokenize( tx, { showOriginalLineNumber: true, lineOffset: 1, cssClassOriginalLineNumber: 'code-line' }),
    [ ['!', {'data-line': 1, class: 'code-line'}, ' A '] ] );
  t.end();
});

test( 'LI block, should number short lines correctly', function ( t ) {
  let tx = `* aaa
  bbb
** c
* d`;
  t.is( textile.convert( tx, { showOriginalLineNumber: true, lineOffset: 1, cssClassOriginalLineNumber: 'code-line' }),
    "<ul>\n\t<li data-line=\"1\" class=\"code-line\">aaa<br />\nbbb\n\t<ul>\n\t\t<li data-line=\"3\" class=\"code-line\">c</li>\n\t</ul></li>\n\t<li data-line=\"4\" class=\"code-line\">d</li>\n</ul>" );
  t.end();
});

test( 'HTML block-level elements inside paragraph, should be line-numbered correctly', function ( t ) {
  let tx = `a
<pre>
code
</pre>`;
  t.is( textile.convert( tx, { showOriginalLineNumber: true, lineOffset: 1, cssClassOriginalLineNumber: 'code-line' }),
    '<p data-line="1" class="code-line">a<br />\n<pre data-line="2" class="code-line"><br />\ncode<br />\n</pre></p>' );
  t.end();
});

test( 'HTML block-level elements inside no-paragraph, should be line-numbered correctly', function ( t ) {
  let tx = ` a
<pre>
code
</pre>`;
  t.is( textile.convert( tx, { showOriginalLineNumber: true, lineOffset: 1, cssClassOriginalLineNumber: 'code-line' }),
    'a<br />\n<pre data-line="2" class="code-line"><br />\ncode<br />\n</pre>' );
  t.end();
});

test( 'HTML block-level elements inside table cell, should be line-numbered correctly', function ( t ) {
  let tx = `|a|(class). b
c
<pre>
code
</pre>
d|`;
  t.is( textile.convert( tx, { showOriginalLineNumber: true, lineOffset: 1, cssClassOriginalLineNumber: 'code-line' }),
    '<table>\n\t<tr data-line="1" class="code-line">\n\t\t<td>a</td>\n\t\t<td class="class">b<br />\nc<br />\n<pre data-line="3" class="code-line"><br />\ncode<br />\n</pre><br />\nd</td>\n\t</tr>\n</table>' );
  t.end();
});

test( 'HTML block-level elements inside definition lists, should be line-numbered correctly', function ( t ) {
  let tx = `- Word 1 := Definition 1.
  <div>Inside</div>`;
  t.is( textile.convert( tx, { showOriginalLineNumber: true, lineOffset: 1, cssClassOriginalLineNumber: 'code-line' }),
    '<dl>\n\t<dt data-line="1" class="code-line">Word 1</dt>\n\t<dd data-line="1" class="code-line">Definition 1.\n <div data-line="2" class="code-line">Inside</div></dd>\n</dl>' );
  t.end();
});

test( 'HTML block-level elements inside multi-line definition lists, should be line-numbered correctly', function ( t ) {
  let tx = `- Word 1 := Definition 1.
  <div>Inside</div>=:`;
  t.is( textile.convert( tx, { showOriginalLineNumber: true, lineOffset: 1, cssClassOriginalLineNumber: 'code-line' }),
    '<dl>\n\t<dt data-line="1" class="code-line">Word 1</dt>\n\t<dd data-line="1" class="code-line"><p data-line="1" class="code-line">Definition 1.\n <div data-line="2" class="code-line">Inside</div></p></dd>\n</dl>' );
  t.end();
});
