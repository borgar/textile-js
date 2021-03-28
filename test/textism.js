import test from 'tape';
import textile from '../src/index.js';
// textism.yml

test('header one', t => {
  const tx = 'h1. Header 1';
  t.is(textile.convert(tx),
    '<h1>Header 1</h1>', tx);
  t.end();
});


test('header two', t => {
  const tx = 'h2. Header 2';
  t.is(textile.convert(tx),
    '<h2>Header 2</h2>', tx);
  t.end();
});


test('header three', t => {
  const tx = 'h3. Header 3';
  t.is(textile.convert(tx),
    '<h3>Header 3</h3>', tx);
  t.end();
});


test('header four', t => {
  const tx = 'h4. Header 4';
  t.is(textile.convert(tx),
    '<h4>Header 4</h4>', tx);
  t.end();
});


test('header five', t => {
  const tx = 'h5. Header 5';
  t.is(textile.convert(tx),
    '<h5>Header 5</h5>', tx);
  t.end();
});


test('header six', t => {
  const tx = 'h6. Header 6';
  t.is(textile.convert(tx),
    '<h6>Header 6</h6>', tx);
  t.end();
});


test('blockquote', t => {
  const tx = `Any old text.

bq. A block quotation.

Any old text.
`;
  t.is(textile.convert(tx),
    `<p>Any old text.</p>
<blockquote>
<p>A block quotation.</p>
</blockquote>
<p>Any old text.</p>`, tx);
  t.end();
});


test('textism:8', t => {
  const tx = `# A first item
# A second item
# A third item
# A fourth item`;
  t.is(textile.convert(tx),
    `<ol>
\t<li>A first item</li>
\t<li>A second item</li>
\t<li>A third item</li>
\t<li>A fourth item</li>
</ol>`, tx);
  t.end();
});


test('textism:9', t => {
  const tx = `* A first item
* A second item
* A third item
* A fourth item
`;
  t.is(textile.convert(tx),
    `<ul>
\t<li>A first item</li>
\t<li>A second item</li>
\t<li>A third item</li>
\t<li>A fourth item</li>
</ul>`, tx);
  t.end();
});


test('textism:10', t => {
  const tx = '_a phrase_';
  t.is(textile.convert(tx),
    '<p><em>a phrase</em></p>', tx);
  t.end();
});


test('textism:11', t => {
  const tx = '__a phrase__';
  t.is(textile.convert(tx),
    '<p><i>a phrase</i></p>', tx);
  t.end();
});


test('textism:12', t => {
  const tx = '*a phrase*';
  t.is(textile.convert(tx),
    '<p><strong>a phrase</strong></p>', tx);
  t.end();
});


test('textism:13', t => {
  const tx = '**a phrase**';
  t.is(textile.convert(tx),
    '<p><b>a phrase</b></p>', tx);
  t.end();
});


test('textism:14', t => {
  const tx = "Nabokov's ??Pnin??";
  t.is(textile.convert(tx),
    '<p>Nabokov&#8217;s <cite>Pnin</cite></p>', tx);
  t.end();
});


test('del part of word', t => {
  const tx = 'A very [-extra-]ordinary day.';
  t.is(textile.convert(tx),
    '<p>A very <del>extra</del>ordinary day.</p>', tx);
  t.end();
});


test('del part of word that contains a hyphen', t => {
  const tx = 'An [-extra-extra-]ordinary day.';
  t.is(textile.convert(tx),
    '<p>An <del>extra-extra</del>ordinary day.</p>', tx);
  t.end();
});


test('del a phrase', t => {
  const tx = 'Delete -a phrase- this way.';
  t.is(textile.convert(tx),
    '<p>Delete <del>a phrase</del> this way.</p>', tx);
  t.end();
});


test('del a phrase that contains hyphens', t => {
  const tx = 'Delete -a no-nonsense phrase- this way.';
  t.is(textile.convert(tx),
    '<p>Delete <del>a no-nonsense phrase</del> this way.</p>', tx);
  t.end();
});


test('textism:19', t => {
  const tx = '+a phrase+';
  t.is(textile.convert(tx),
    '<p><ins>a phrase</ins></p>', tx);
  t.end();
});


test('textism:20', t => {
  const tx = '^a phrase^';
  t.is(textile.convert(tx),
    '<p><sup>a phrase</sup></p>', tx);
  t.end();
});


test('textism:21', t => {
  const tx = '~a phrase~';
  t.is(textile.convert(tx),
    '<p><sub>a phrase</sub></p>', tx);
  t.end();
});


test('textism:22', t => {
  const tx = '%(myclass)SPAN%';
  t.is(textile.convert(tx),
    '<p><span class="myclass"><span class="caps">SPAN</span></span></p>', tx);
  t.end();
});


test('textism:23', t => {
  const tx = '%{color:red}red%';
  t.is(textile.convert(tx),
    '<p><span style="color:red">red</span></p>', tx);
  t.end();
});


test('textism:24', t => {
  const tx = '%[fr]rouge%';
  t.is(textile.convert(tx),
    '<p><span lang="fr">rouge</span></p>', tx);
  t.end();
});


test('textism:25', t => {
  const tx = '_(big)red_';
  t.is(textile.convert(tx),
    '<p><em class="big">red</em></p>', tx);
  t.end();
});


test('textism:26', t => {
  const tx = 'p=. A centered paragraph.';
  t.is(textile.convert(tx),
    '<p style="text-align:center">A centered paragraph.</p>', tx);
  t.end();
});


test('textism:27', t => {
  const tx = 'p(bob). A paragraph';
  t.is(textile.convert(tx),
    '<p class="bob">A paragraph</p>', tx);
  t.end();
});


test('textism:28', t => {
  const tx = 'p{color:#ddd}. A paragraph';
  t.is(textile.convert(tx),
    '<p style="color:#ddd">A paragraph</p>', tx);
  t.end();
});


test('textism:29', t => {
  const tx = 'p[fr]. A paragraph';
  t.is(textile.convert(tx),
    '<p lang="fr">A paragraph</p>', tx);
  t.end();
});


test('textism:30', t => {
  const tx = 'h2()>. right-aligned header2, indented 1em both side';
  t.is(textile.convert(tx),
    '<h2 style="padding-left:1em;padding-right:1em;text-align:right">right-aligned header2, indented 1em both side</h2>', tx);
  t.end();
});


test('textism:31', t => {
  const tx = 'h3=. centered header';
  t.is(textile.convert(tx),
    '<h3 style="text-align:center">centered header</h3>', tx);
  t.end();
});


test('textism:32', t => {
  const tx = '!>/image.gif! right-aligned image';
  t.is(textile.convert(tx),
    '<p><img align="right" src="/image.gif" alt="" /> right-aligned image</p>', tx);
  t.end();
});


test('textism:33', t => {
  const tx = 'p[no]{color:red}. A Norse of a different colour.';
  t.is(textile.convert(tx),
    '<p style="color:red" lang="no">A Norse of a different colour.</p>', tx);
  t.end();
});


test('textism:34', t => {
  const tx = `|This|is|a|simple|table|
|This|is|a|simple|row|`;
  t.is(textile.convert(tx),
    `<table>
\t<tr>
\t\t<td>This</td>
\t\t<td>is</td>
\t\t<td>a</td>
\t\t<td>simple</td>
\t\t<td>table</td>
\t</tr>
\t<tr>
\t\t<td>This</td>
\t\t<td>is</td>
\t\t<td>a</td>
\t\t<td>simple</td>
\t\t<td>row</td>
\t</tr>
</table>`, tx);
  t.end();
});


test('textism:35', t => {
  const tx = `table{border:1px solid black}.
|This|is|a|row|
|This|is|a|row|`;
  t.is(textile.convert(tx),
    `<table style="border:1px solid black">
\t<tr>
\t\t<td>This</td>
\t\t<td>is</td>
\t\t<td>a</td>
\t\t<td>row</td>
\t</tr>
\t<tr>
\t\t<td>This</td>
\t\t<td>is</td>
\t\t<td>a</td>
\t\t<td>row</td>
\t</tr>
</table>`, tx);
  t.end();
});


test('textism:36', t => {
  const tx = '{background:#ddd}. |This|is|a|row|';
  t.is(textile.convert(tx),
    `<table>
\t<tr style="background:#ddd">
\t\t<td>This</td>
\t\t<td>is</td>
\t\t<td>a</td>
\t\t<td>row</td>
\t</tr>
</table>`, tx);
  t.end();
});


test('textism:37', t => {
  const tx = `|{background:#ddd}. Cell with gray background|
|\\2. Cell spanning 2 columns|
|/3. Cell spanning 3 rows|
|>. Right-aligned cell|`;
  t.is(textile.convert(tx),
    `<table>
\t<tr>
\t\t<td style="background:#ddd">Cell with gray background</td>
\t</tr>
\t<tr>
\t\t<td colspan="2">Cell spanning 2 columns</td>
\t</tr>
\t<tr>
\t\t<td rowspan="3">Cell spanning 3 rows</td>
\t</tr>
\t<tr>
\t\t<td style="text-align:right">Right-aligned cell</td>
\t</tr>
</table>`, tx);
  t.end();
});


test('basics', t => {
  const tx = `h2{color:green}. This is a title

h3. This is a subhead

p{color:red}. This is some text of dubious character. Isn't the use of "quotes" just lazy writing -- and theft of 'intellectual property' besides? I think the time has come to see a block quote.

bq[fr]. This is a block quote. I'll admit it's not the most exciting block quote ever devised.

Simple list:

# one
# two
# three

Multi-level list:

# one
## aye
## bee
## see
# two
## x
## y
# three
`;
  t.is(textile.convert(tx),
    `<h2 style="color:green">This is a title</h2>
<h3>This is a subhead</h3>
<p style="color:red">This is some text of dubious character. Isn&#8217;t the use of &#8220;quotes&#8221; just lazy writing &#8212; and theft of &#8216;intellectual property&#8217; besides? I think the time has come to see a block quote.</p>
<blockquote lang="fr">
<p lang="fr">This is a block quote. I&#8217;ll admit it&#8217;s not the most exciting block quote ever devised.</p>
</blockquote>
<p>Simple list:</p>
<ol>
\t<li>one</li>
\t<li>two</li>
\t<li>three</li>
</ol>
<p>Multi-level list:</p>
<ol>
\t<li>one
\t<ol>
\t\t<li>aye</li>
\t\t<li>bee</li>
\t\t<li>see</li>
\t</ol></li>
\t<li>two
\t<ol>
\t\t<li>x</li>
\t\t<li>y</li>
\t</ol></li>
\t<li>three</li>
</ol>`, tx);
  t.end();
});

