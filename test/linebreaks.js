/* eslint-disable prefer-const, no-multi-str, quotes */
const test = require( 'tape' );
const textile = require( '../src' );
// jstextile linebreaks

test( 'paragraphs', function ( t ) {
  let tx = "A single paragraph.\r\n\r\n\
Followed by another.";
  t.is( textile.convert( tx ),
    "<p>A single paragraph.</p>\n\
<p>Followed by another.</p>", tx );
  t.end();
});


test( 'blocks with spaces on the blank line in between', function ( t ) {
  let tx = "This is line one\r\n\
 \r\n\
This is line two";
  t.is( textile.convert( tx ),
    "<p>This is line one</p>\n\
<p>This is line two</p>", tx );
  t.end();
});


test( 'blocks with tabl on the blank line in between', function ( t ) {
  let tx = "This is line one\r\n\
\t\r\n\
This is line two";
  t.is( textile.convert( tx ),
    "<p>This is line one</p>\n\
<p>This is line two</p>", tx );
  t.end();
});


test( 'extended blockquote containing block start', function ( t ) {
  let tx = "bq.. I saw a ship. It ate my elephant.\r\n\r\n\
When the elephant comes to take a p. you...";
  t.is( textile.convert( tx ),
    "<blockquote>\n\
<p>I saw a ship. It ate my elephant.</p>\n\
<p>When the elephant comes to take a p. you&#8230;</p>\n\
</blockquote>", tx );
  t.end();
});


test( 'notextile block', function ( t ) {
  let tx = "Some text:\r\n\r\n\
<notextile>\r\n\
<div class=\"example\"><pre>\r\n\
Some code\r\n\
</pre></div>\r\n\
</notextile>\r\n\r\n\
Some more text.";
  t.is( textile.convert( tx ),
    "<p>Some text:</p>\n\
<div class=\"example\"><pre>\r\n\
Some code\r\n\
</pre></div>\n\
<p>Some more text.</p>", tx );
  t.end();
});


test( 'extended notextile block containing block start', function ( t ) {
  let tx = "notextile.. I saw a ship. It ate my elephant.\r\n\r\n\
When the elephant comes to take a p. you...";
  t.is( textile.convert( tx ),
    "I saw a ship. It ate my elephant.\r\n\r\n\
When the elephant comes to take a p. you...", tx );
  t.end();
});


test( 'html tags', function ( t ) {
  let tx = "I am <b>very</b> serious.\r\n\r\n\
<pre>\r\n\
  I am <b>very</b> serious.\r\n\
</pre>";
  t.is( textile.convert( tx ),
    "<p>I am <b>very</b> serious.</p>\n\
<pre>\r\n\
  I am &lt;b&gt;very&lt;/b&gt; serious.\r\n\
</pre>", tx );
  t.end();
});


test( 'line breaks', function ( t ) {
  let tx = "I spoke.\r\n\
And none replied.";
  t.is( textile.convert( tx ),
    "<p>I spoke.<br />\n\
And none replied.</p>", tx );
  t.end();
});


test( 'blockquote', function ( t ) {
  let tx = "Any old text\r\n\r\n\
bq. A block quotation.\r\n\r\n\
Any old text";
  t.is( textile.convert( tx ),
    "<p>Any old text</p>\n\
<blockquote>\n\
<p>A block quotation.</p>\n\
</blockquote>\n\
<p>Any old text</p>", tx );
  t.end();
});


test( 'code blocks', function ( t ) {
  let tx = "<pre>\r\n\
<code>\r\n\
  a.gsub!( /</, '' )\r\n\
</code>\r\n\
</pre>";
  t.is( textile.convert( tx ),
    "<pre>\r\n\
<code>\r\n\
  a.gsub!( /&lt;/, '' )\r\n\
</code>\r\n\
</pre>", tx );
  t.end();
});


test( 'numbered list', function ( t ) {
  let tx = "# A first item\r\n\
# A second item\r\n\
# A third";
  t.is( textile.convert( tx ),
    "<ol>\n\
\t<li>A first item</li>\n\
\t<li>A second item</li>\n\
\t<li>A third</li>\n\
</ol>", tx );
  t.end();
});


test( 'nested numbered lists', function ( t ) {
  let tx = "# Fuel could be:\r\n\
## Coal\r\n\
## Gasoline\r\n\
## Electricity\r\n\
# Humans need only:\r\n\
## Water\r\n\
## Protein";
  t.is( textile.convert( tx ),
    "<ol>\n\
\t<li>Fuel could be:\n\
\t<ol>\n\
\t\t<li>Coal</li>\n\
\t\t<li>Gasoline</li>\n\
\t\t<li>Electricity</li>\n\
\t</ol></li>\n\
\t<li>Humans need only:\n\
\t<ol>\n\
\t\t<li>Water</li>\n\
\t\t<li>Protein</li>\n\
\t</ol></li>\n\
</ol>", tx );
  t.end();
});


test( 'bulleted list', function ( t ) {
  let tx = "* A first item\r\n\
* A second item\r\n\
* A third";
  t.is( textile.convert( tx ),
    "<ul>\n\
\t<li>A first item</li>\n\
\t<li>A second item</li>\n\
\t<li>A third</li>\n\
</ul>", tx );
  t.end();
});


test( 'nested bulleted lists', function ( t ) {
  let tx = "* Fuel could be:\r\n\
** Coal\r\n\
** Gasoline\r\n\
** Electricity\r\n\
* Humans need only:\r\n\
** Water\r\n\
** Protein";
  t.is( textile.convert( tx ),
    "<ul>\n\
\t<li>Fuel could be:\n\
\t<ul>\n\
\t\t<li>Coal</li>\n\
\t\t<li>Gasoline</li>\n\
\t\t<li>Electricity</li>\n\
\t</ul></li>\n\
\t<li>Humans need only:\n\
\t<ul>\n\
\t\t<li>Water</li>\n\
\t\t<li>Protein</li>\n\
\t</ul></li>\n\
</ul>", tx );
  t.end();
});


test( 'image alignments', function ( t ) {
  let tx = "!>obake.gif!\r\n\r\n\
And others sat all round the small\r\n\
machine and paid it to sing to them.";
  t.is( textile.convert( tx ),
    "<p><img align=\"right\" src=\"obake.gif\" alt=\"\" /></p>\n\
<p>And others sat all round the small<br />\n\
machine and paid it to sing to them.</p>", tx );
  t.end();
});


test( 'tables', function ( t ) {
  let tx = "| name | age | sex |\r\n\
| joan | 24 | f |\r\n\
| archie | 29 | m |\r\n\
| bella | 45 | f |";
  t.is( textile.convert( tx ),
    "<table>\n\
\t<tr>\n\
\t\t<td> name </td>\n\
\t\t<td> age </td>\n\
\t\t<td> sex </td>\n\
\t</tr>\n\
\t<tr>\n\
\t\t<td> joan </td>\n\
\t\t<td> 24 </td>\n\
\t\t<td> f </td>\n\
\t</tr>\n\
\t<tr>\n\
\t\t<td> archie </td>\n\
\t\t<td> 29 </td>\n\
\t\t<td> m </td>\n\
\t</tr>\n\
\t<tr>\n\
\t\t<td> bella </td>\n\
\t\t<td> 45 </td>\n\
\t\t<td> f </td>\n\
\t</tr>\n\
</table>", tx );
  t.end();
});


test( 'jstextile linebreaks:17', function ( t ) {
  let tx = "line\r\n\
<!-- line -->\r\n\
line";
  t.is( textile.convert( tx ),
    "<p>line<br />\n\
<!-- line --><br />\n\
line</p>", tx );
  t.end();
});


test( 'jstextile linebreaks:18', function ( t ) {
  let tx = "line\r\n\r\n\
<!-- line -->\r\n\r\n\
line";
  t.is( textile.convert( tx ),
    "<p>line</p>\n\
<!-- line -->\n\
<p>line</p>", tx );
  t.end();
});


test( 'non list #3', function ( t ) {
  let tx = "*\r\n\
";
  t.is( textile.convert( tx ),
    "<p>*</p>", tx );
  t.end();
});


test( 'non list #4', function ( t ) {
  let tx = "#\r\n\
";
  t.is( textile.convert( tx ),
    "<p>#</p>", tx );
  t.end();
});


test( 'non list #5', function ( t ) {
  let tx = "*\r\n\
test";
  t.is( textile.convert( tx ),
    "<p>*<br />\n\
test</p>", tx );
  t.end();
});


test( 'empty list #1', function ( t ) {
  let tx = "* \r\n\
";
  t.is( textile.convert( tx ),
    "<p>* </p>", tx );
  t.end();
});


test( 'empty list #2', function ( t ) {
  let tx = "# \r\n\
";
  t.is( textile.convert( tx ),
    "<p># </p>", tx );
  t.end();
});


test( 'insert empty list #1', function ( t ) {
  let tx = "*\r\n\r\n\
test";
  t.is( textile.convert( tx ),
    "<p>*</p>\n\
<p>test</p>", tx );
  t.end();
});


test( 'insert empty list #2', function ( t ) {
  let tx = "#\r\n\r\n\
test";
  t.is( textile.convert( tx ),
    "<p>#</p>\n\
<p>test</p>", tx );
  t.end();
});


test( 'strict list matching (1)', function ( t ) {
  let tx = "*{color:red} item*\r\n\r\n\
* item*\r\n\r\n\
*item*";
  t.is( textile.convert( tx ),
    "<ul style=\"color:red\">\n\
\t<li>item*</li>\n\
</ul>\n\
<ul>\n\
\t<li>item*</li>\n\
</ul>\n\
<p><strong>item</strong></p>", tx );
  t.end();
});


test( 'strict list matching (2)', function ( t ) {
  let tx = "*{color:red} item\r\n\r\n\
* item\r\n\r\n\
*item";
  t.is( textile.convert( tx ),
    "<ul style=\"color:red\">\n\
\t<li>item</li>\n\
</ul>\n\
<ul>\n\
\t<li>item</li>\n\
</ul>\n\
<p>*item</p>", tx );
  t.end();
});


test( 'block parser bug (#21)', function ( t ) {
  let tx = "pab\r\n\r\n\
pabcde\r\n\r\n\
bqabcdef\r\n\r\n\
last line ending in period+space. \r\n\
";
  t.is( textile.convert( tx ),
    "<p>pab</p>\n\
<p>pabcde</p>\n\
<p>bqabcdef</p>\n\
<p>last line ending in period+space. </p>", tx );
  t.end();
});


test( 'header with 1 blank line below', function ( t ) {
  let tx = "h1. Header\r\n\r\n\
text";
  t.is( textile.convert( tx ),
    "<h1>Header</h1>\n\
<p>text</p>", tx );
  t.end();
});


test( 'header with 2 blank lines below', function ( t ) {
  let tx = "h1. Header\r\n\r\n\r\n\
text";
  t.is( textile.convert( tx ),
    "<h1>Header</h1>\n\
<p>text</p>", tx );
  t.end();
});


test( 'header with 1 blank line above', function ( t ) {
  let tx = "text\r\n\r\n\
h1. Header";
  t.is( textile.convert( tx ),
    "<p>text</p>\n\
<h1>Header</h1>", tx );
  t.end();
});


test( 'header with 2 blank lines above', function ( t ) {
  let tx = "text\r\n\r\n\r\n\
h1. Header";
  t.is( textile.convert( tx ),
    "<p>text</p>\n\
<h1>Header</h1>", tx );
  t.end();
});


test( 'list line break bug 1', function ( t ) {
  let tx = "* 1\n\
* 2\n\
* 3\n\
";
  t.is( textile.convert( tx ),
    "<ul>\n\
\t<li>1</li>\n\
\t<li>2</li>\n\
\t<li>3</li>\n\
</ul>", tx );
  t.end();
});


test( 'list line break bug 2', function ( t ) {
  let tx = "* 1\r\n\
* 2\r\n\
* 3\r\n\
";
  t.is( textile.convert( tx ),
    "<ul>\n\
\t<li>1</li>\n\
\t<li>2</li>\n\
\t<li>3</li>\n\
</ul>", tx );
  t.end();
});


test( 'with line breaks', function ( t ) {
  let tx = "- term := you can have line breaks\r\n\
just like other lists\r\n\
- line-spanning\r\n\
term := hey, slick!";
  t.is( textile.convert( tx ),
    "<dl>\n\
\t<dt>term</dt>\n\
\t<dd>you can have line breaks<br />\n\
just like other lists</dd>\n\
\t<dt>line-spanning<br />\n\
term</dt>\n\
\t<dd>hey, slick!</dd>\n\
</dl>", tx );
  t.end();
});


test( 'double terms', function ( t ) {
  let tx = "You can have multiple terms before a definition:\r\n\r\n\
- textile\r\n\
- fabric\r\n\
- cloth := woven threads";
  t.is( textile.convert( tx ),
    "<p>You can have multiple terms before a definition:</p>\n\
<dl>\n\
\t<dt>textile</dt>\n\
\t<dt>fabric</dt>\n\
\t<dt>cloth</dt>\n\
\t<dd>woven threads</dd>\n\
</dl>", tx );
  t.end();
});


test( 'not a definition list', function ( t ) {
  let tx = "- textile\r\n\
- fabric\r\n\
- cloth";
  t.is( textile.convert( tx ),
    "<p>- textile<br />\n\
- fabric<br />\n\
- cloth</p>", tx );
  t.end();
});


test( 'long definition list', function ( t ) {
  let tx = "here is a long definition\r\n\r\n\
- some term := \r\n\
*sweet*\r\n\r\n\
yes\r\n\r\n\
ok =:\r\n\
- regular term := no";
  t.is( textile.convert( tx ),
    "<p>here is a long definition</p>\n\
<dl>\n\
\t<dt>some term</dt>\n\
\t<dd><p><strong>sweet</strong></p>\n\
<p>yes</p>\n\
<p>ok</p></dd>\n\
\t<dt>regular term</dt>\n\
\t<dd>no</dd>\n\
</dl>", tx );
  t.end();
});

