import test from 'tape';
import textile from '../src/index.js';
// jstextile linebreaks

test('paragraphs', t => {
  const tx = `A single paragraph.\r
\r
Followed by another.`;
  t.is(textile.convert(tx),
    `<p>A single paragraph.</p>
<p>Followed by another.</p>`, tx);
  t.end();
});


test('blocks with spaces on the blank line in between', t => {
  const tx = `This is line one\r
 \r
This is line two`;
  t.is(textile.convert(tx),
    `<p>This is line one</p>
<p>This is line two</p>`, tx);
  t.end();
});


test('blocks with tabl on the blank line in between', t => {
  const tx = `This is line one\r
\t\r
This is line two`;
  t.is(textile.convert(tx),
    `<p>This is line one</p>
<p>This is line two</p>`, tx);
  t.end();
});


test('extended blockquote containing block start', t => {
  const tx = `bq.. I saw a ship. It ate my elephant.\r
\r
When the elephant comes to take a p. you...`;
  t.is(textile.convert(tx),
    `<blockquote>
<p>I saw a ship. It ate my elephant.</p>
<p>When the elephant comes to take a p. you…</p>
</blockquote>`, tx);
  t.end();
});


test('notextile block', t => {
  const tx = `Some text:\r
\r
<notextile>\r
<div class="example"><pre>\r
Some code\r
</pre></div>\r
</notextile>\r
\r
Some more text.`;
  t.is(textile.convert(tx),
    `<p>Some text:</p>
<div class="example"><pre>\r
Some code\r
</pre></div>
<p>Some more text.</p>`, tx);
  t.end();
});


test('extended notextile block containing block start', t => {
  const tx = `notextile.. I saw a ship. It ate my elephant.\r
\r
When the elephant comes to take a p. you...`;
  t.is(textile.convert(tx),
    `I saw a ship. It ate my elephant.\r
\r
When the elephant comes to take a p. you...`, tx);
  t.end();
});


test('html tags', t => {
  const tx = `I am <b>very</b> serious.\r
\r
<pre>\r
  I am <b>very</b> serious.\r
</pre>`;
  t.is(textile.convert(tx),
    `<p>I am <b>very</b> serious.</p>
<pre>\r
  I am &lt;b&gt;very&lt;/b&gt; serious.\r
</pre>`, tx);
  t.end();
});


test('line breaks', t => {
  const tx = `I spoke.\r
And none replied.`;
  t.is(textile.convert(tx),
    `<p>I spoke.<br />
And none replied.</p>`, tx);
  t.end();
});


test('blockquote', t => {
  const tx = `Any old text\r
\r
bq. A block quotation.\r
\r
Any old text`;
  t.is(textile.convert(tx),
    `<p>Any old text</p>
<blockquote>
<p>A block quotation.</p>
</blockquote>
<p>Any old text</p>`, tx);
  t.end();
});


test('code blocks', t => {
  const tx = `<pre>\r
<code>\r
  a.gsub!( /</, '' )\r
</code>\r
</pre>`;
  t.is(textile.convert(tx),
    `<pre>\r
<code>\r
  a.gsub!( /&lt;/, '' )\r
</code>\r
</pre>`, tx);
  t.end();
});


test('numbered list', t => {
  const tx = `# A first item\r
# A second item\r
# A third`;
  t.is(textile.convert(tx),
    `<ol>
\t<li>A first item</li>
\t<li>A second item</li>
\t<li>A third</li>
</ol>`, tx);
  t.end();
});


test('nested numbered lists', t => {
  const tx = `# Fuel could be:\r
## Coal\r
## Gasoline\r
## Electricity\r
# Humans need only:\r
## Water\r
## Protein`;
  t.is(textile.convert(tx),
    `<ol>
\t<li>Fuel could be:
\t<ol>
\t\t<li>Coal</li>
\t\t<li>Gasoline</li>
\t\t<li>Electricity</li>
\t</ol></li>
\t<li>Humans need only:
\t<ol>
\t\t<li>Water</li>
\t\t<li>Protein</li>
\t</ol></li>
</ol>`, tx);
  t.end();
});


test('bulleted list', t => {
  const tx = `* A first item\r
* A second item\r
* A third`;
  t.is(textile.convert(tx),
    `<ul>
\t<li>A first item</li>
\t<li>A second item</li>
\t<li>A third</li>
</ul>`, tx);
  t.end();
});


test('nested bulleted lists', t => {
  const tx = `* Fuel could be:\r
** Coal\r
** Gasoline\r
** Electricity\r
* Humans need only:\r
** Water\r
** Protein`;
  t.is(textile.convert(tx),
    `<ul>
\t<li>Fuel could be:
\t<ul>
\t\t<li>Coal</li>
\t\t<li>Gasoline</li>
\t\t<li>Electricity</li>
\t</ul></li>
\t<li>Humans need only:
\t<ul>
\t\t<li>Water</li>
\t\t<li>Protein</li>
\t</ul></li>
</ul>`, tx);
  t.end();
});


test('image alignments', t => {
  const tx = `!>obake.gif!\r
\r
And others sat all round the small\r
machine and paid it to sing to them.`;
  t.is(textile.convert(tx),
    `<p><img align="right" src="obake.gif" alt="" /></p>
<p>And others sat all round the small<br />
machine and paid it to sing to them.</p>`, tx);
  t.end();
});


test('tables', t => {
  const tx = `| name | age | sex |\r
| joan | 24 | f |\r
| archie | 29 | m |\r
| bella | 45 | f |`;
  t.is(textile.convert(tx),
    `<table>
\t<tr>
\t\t<td> name </td>
\t\t<td> age </td>
\t\t<td> sex </td>
\t</tr>
\t<tr>
\t\t<td> joan </td>
\t\t<td> 24 </td>
\t\t<td> f </td>
\t</tr>
\t<tr>
\t\t<td> archie </td>
\t\t<td> 29 </td>
\t\t<td> m </td>
\t</tr>
\t<tr>
\t\t<td> bella </td>
\t\t<td> 45 </td>
\t\t<td> f </td>
\t</tr>
</table>`, tx);
  t.end();
});


test('jstextile linebreaks:17', t => {
  const tx = `line\r
<!-- line -->\r
line`;
  t.is(textile.convert(tx),
    `<p>line<br />
<!-- line --><br />
line</p>`, tx);
  t.end();
});


test('jstextile linebreaks:18', t => {
  const tx = `line\r
\r
<!-- line -->\r
\r
line`;
  t.is(textile.convert(tx),
    `<p>line</p>
<!-- line -->
<p>line</p>`, tx);
  t.end();
});


test('non list #3', t => {
  const tx = `*\r
`;
  t.is(textile.convert(tx),
    '<p>*</p>', tx);
  t.end();
});


test('non list #4', t => {
  const tx = `#\r
`;
  t.is(textile.convert(tx),
    '<p>#</p>', tx);
  t.end();
});


test('non list #5', t => {
  const tx = `*\r
test`;
  t.is(textile.convert(tx),
    `<p>*<br />
test</p>`, tx);
  t.end();
});


test('empty list #1', t => {
  const tx = `* \r
`;
  t.is(textile.convert(tx),
    '<p>* </p>', tx);
  t.end();
});


test('empty list #2', t => {
  const tx = `# \r
`;
  t.is(textile.convert(tx),
    '<p># </p>', tx);
  t.end();
});


test('insert empty list #1', t => {
  const tx = `*\r
\r
test`;
  t.is(textile.convert(tx),
    `<p>*</p>
<p>test</p>`, tx);
  t.end();
});


test('insert empty list #2', t => {
  const tx = `#\r
\r
test`;
  t.is(textile.convert(tx),
    `<p>#</p>
<p>test</p>`, tx);
  t.end();
});


test('strict list matching (1)', t => {
  const tx = `*{color:red} item*\r
\r
* item*\r
\r
*item*`;
  t.is(textile.convert(tx),
    `<ul style="color:red">
\t<li>item*</li>
</ul>
<ul>
\t<li>item*</li>
</ul>
<p><strong>item</strong></p>`, tx);
  t.end();
});


test('strict list matching (2)', t => {
  const tx = `*{color:red} item\r
\r
* item\r
\r
*item`;
  t.is(textile.convert(tx),
    `<ul style="color:red">
\t<li>item</li>
</ul>
<ul>
\t<li>item</li>
</ul>
<p>*item</p>`, tx);
  t.end();
});


test('block parser bug (#21)', t => {
  const tx = `pab\r
\r
pabcde\r
\r
bqabcdef\r
\r
last line ending in period+space. \r
`;
  t.is(textile.convert(tx),
    `<p>pab</p>
<p>pabcde</p>
<p>bqabcdef</p>
<p>last line ending in period+space. </p>`, tx);
  t.end();
});


test('header with 1 blank line below', t => {
  const tx = `h1. Header\r
\r
text`;
  t.is(textile.convert(tx),
    `<h1>Header</h1>
<p>text</p>`, tx);
  t.end();
});


test('header with 2 blank lines below', t => {
  const tx = `h1. Header\r
\r
\r
text`;
  t.is(textile.convert(tx),
    `<h1>Header</h1>
<p>text</p>`, tx);
  t.end();
});


test('header with 1 blank line above', t => {
  const tx = `text\r
\r
h1. Header`;
  t.is(textile.convert(tx),
    `<p>text</p>
<h1>Header</h1>`, tx);
  t.end();
});


test('header with 2 blank lines above', t => {
  const tx = `text\r
\r
\r
h1. Header`;
  t.is(textile.convert(tx),
    `<p>text</p>
<h1>Header</h1>`, tx);
  t.end();
});


test('list line break bug 1', t => {
  const tx = `* 1
* 2
* 3
`;
  t.is(textile.convert(tx),
    `<ul>
\t<li>1</li>
\t<li>2</li>
\t<li>3</li>
</ul>`, tx);
  t.end();
});


test('list line break bug 2', t => {
  const tx = `* 1\r
* 2\r
* 3\r
`;
  t.is(textile.convert(tx),
    `<ul>
\t<li>1</li>
\t<li>2</li>
\t<li>3</li>
</ul>`, tx);
  t.end();
});


test('with line breaks', t => {
  const tx = `- term := you can have line breaks\r
just like other lists\r
- line-spanning\r
term := hey, slick!`;
  t.is(textile.convert(tx),
    `<dl>
\t<dt>term</dt>
\t<dd>you can have line breaks<br />
just like other lists</dd>
\t<dt>line-spanning<br />
term</dt>
\t<dd>hey, slick!</dd>
</dl>`, tx);
  t.end();
});


test('double terms', t => {
  const tx = `You can have multiple terms before a definition:\r
\r
- textile\r
- fabric\r
- cloth := woven threads`;
  t.is(textile.convert(tx),
    `<p>You can have multiple terms before a definition:</p>
<dl>
\t<dt>textile</dt>
\t<dt>fabric</dt>
\t<dt>cloth</dt>
\t<dd>woven threads</dd>
</dl>`, tx);
  t.end();
});


test('not a definition list', t => {
  const tx = `- textile\r
- fabric\r
- cloth`;
  t.is(textile.convert(tx),
    `<p>- textile<br />
- fabric<br />
- cloth</p>`, tx);
  t.end();
});


test('long definition list', t => {
  const tx = `here is a long definition\r
\r
- some term := \r
*sweet*\r
\r
yes\r
\r
ok =:\r
- regular term := no`;
  t.is(textile.convert(tx),
    `<p>here is a long definition</p>
<dl>
\t<dt>some term</dt>
\t<dd><p><strong>sweet</strong></p>
<p>yes</p>
<p>ok</p></dd>
\t<dt>regular term</dt>
\t<dd>no</dd>
</dl>`, tx);
  t.end();
});

