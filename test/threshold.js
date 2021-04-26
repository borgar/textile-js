import test from 'tape';
import textile from '../src/index.js';
// threshold.yml

test('paragraph', t => {
  const tx = `A paragraph.

Another paragraph.`;
  t.is(textile.convert(tx),
    `<p>A paragraph.</p>
<p>Another paragraph.</p>`, tx);
  t.end();
});


test('line breaks', t => {
  const tx = `A paragraph with
a line break.`;
  t.is(textile.convert(tx),
    `<p>A paragraph with<br />
a line break.</p>`, tx);
  t.end();
});


test('xhtml tags', t => {
  const tx = "Here's some <b>bold</b> text.";
  t.is(textile.convert(tx),
    '<p>Here&#8217;s some <b>bold</b> text.</p>', tx);
  t.end();
});


test('no paragraph tags', t => {
  const tx = ' No paragraph tags here.';
  t.is(textile.convert(tx),
    'No paragraph tags here.', tx);
  t.end();
});


test('smart quotes', t => {
  const tx = '"Proceed!" said he to the host.';
  t.is(textile.convert(tx),
    '<p>&#8220;Proceed!&#8221; said he to the host.</p>', tx);
  t.end();
});


test('smart quotes 2', t => {
  const tx = "'Proceed!' said he to the host.";
  t.is(textile.convert(tx),
    '<p>&#8216;Proceed!&#8217; said he to the host.</p>', tx);
  t.end();
});


test('nested quotation marks', t => {
  const tx = "\"'I swear, captain,' replied I.\"";
  t.is(textile.convert(tx),
    '<p>&#8220;&#8216;I swear, captain,&#8217; replied I.&#8221;</p>', tx);
  t.end();
});


test('nested quotation marks 2', t => {
  const tx = "'\"I swear, captain,\" replied I.'";
  t.is(textile.convert(tx),
    '<p>&#8216;&#8220;I swear, captain,&#8221; replied I.&#8217;</p>', tx);
  t.end();
});


test('apostrophe glyphs', t => {
  const tx = "Greengrocers' apostrophe's.";
  t.is(textile.convert(tx),
    '<p>Greengrocers&#8217; apostrophe&#8217;s.</p>', tx);
  t.end();
});


test('em-dash glyphs', t => {
  const tx = 'You know the Italian proverb -- Chi ha compagno ha padrone.';
  t.is(textile.convert(tx),
    '<p>You know the Italian proverb &#8212; Chi ha compagno ha padrone.</p>', tx);
  t.end();
});


test('em-dash glyphs 2', t => {
  const tx = 'You know the Italian proverb--Chi ha compagno ha padrone.';
  t.is(textile.convert(tx),
    '<p>You know the Italian proverb&#8212;Chi ha compagno ha padrone.</p>', tx);
  t.end();
});


test('en-dash glyphs', t => {
  const tx = 'You know the Italian proverb - Chi ha compagno ha padrone.';
  t.is(textile.convert(tx),
    '<p>You know the Italian proverb &#8211; Chi ha compagno ha padrone.</p>', tx);
  t.end();
});


test('ellipsis character', t => {
  const tx = 'Meanwhile...';
  t.is(textile.convert(tx),
    '<p>Meanwhile&#8230;</p>', tx);
  t.end();
});


test('dimension character', t => {
  const tx = '1 x 2 x 3 = 6';
  t.is(textile.convert(tx),
    '<p>1 &#215; 2 &#215; 3 = 6</p>', tx);
  t.end();
});


test('dimension character 2', t => {
  const tx = '1x2x3 = 6';
  t.is(textile.convert(tx),
    '<p>1&#215;2&#215;3 = 6</p>', tx);
  t.end();
});


test('trademark register copyright', t => {
  const tx = 'Registered(r) Trademark(tm) Copyright (c).';
  t.is(textile.convert(tx),
    '<p>Registered&#174; Trademark&#8482; Copyright &#169;.</p>', tx);
  t.end();
});


test('acronyms', t => {
  const tx = 'ABC(Always Be Closing)';
  t.is(textile.convert(tx),
    '<p><abbr title="Always Be Closing"><span class="caps">ABC</span></abbr></p>', tx);
  t.end();
});


test('uppercase', t => {
  const tx = 'IBM or HAL';
  t.is(textile.convert(tx),
    '<p><span class="caps">IBM</span> or <span class="caps">HAL</span></p>', tx);
  t.end();
});


test('emphasis', t => {
  const tx = 'The _underlying_ cause.';
  t.is(textile.convert(tx),
    '<p>The <em>underlying</em> cause.</p>', tx);
  t.end();
});


test('strong text', t => {
  const tx = 'The *underlying* cause.';
  t.is(textile.convert(tx),
    '<p>The <strong>underlying</strong> cause.</p>', tx);
  t.end();
});


test('italic text', t => {
  const tx = 'The __underlying__ cause.';
  t.is(textile.convert(tx),
    '<p>The <i>underlying</i> cause.</p>', tx);
  t.end();
});


test('bold text', t => {
  const tx = 'The **underlying** cause.';
  t.is(textile.convert(tx),
    '<p>The <b>underlying</b> cause.</p>', tx);
  t.end();
});


test('citation', t => {
  const tx = '??The Count of Monte Cristo??, by Dumas.';
  t.is(textile.convert(tx),
    '<p><cite>The Count of Monte Cristo</cite>, by Dumas.</p>', tx);
  t.end();
});


test('inserted and deleted text', t => {
  const tx = 'Scratch -that-, replace with +this+.';
  t.is(textile.convert(tx),
    '<p>Scratch <del>that</del>, replace with <ins>this</ins>.</p>', tx);
  t.end();
});


test('subscript', t => {
  const tx = 'log ~2~ n';
  t.is(textile.convert(tx),
    '<p>log <sub>2</sub> n</p>', tx);
  t.end();
});


test('superscript', t => {
  const tx = '2 ^x^';
  t.is(textile.convert(tx),
    '<p>2 <sup>x</sup></p>', tx);
  t.end();
});


test('span tag', t => {
  const tx = 'The %underlying% cause.';
  t.is(textile.convert(tx),
    '<p>The <span>underlying</span> cause.</p>', tx);
  t.end();
});


test('code', t => {
  const tx = 'About the @<hr />@ tag.';
  t.is(textile.convert(tx),
    '<p>About the <code>&lt;hr /&gt;</code> tag.</p>', tx);
  t.end();
});


test('links', t => {
  const tx = '"link text":http://example.com/';
  t.is(textile.convert(tx),
    '<p><a href="http://example.com/">link text</a></p>', tx);
  t.end();
});


test('local links', t => {
  const tx = '"link text":/example';
  t.is(textile.convert(tx),
    '<p><a href="/example">link text</a></p>', tx);
  t.end();
});


test('link title', t => {
  const tx = '"link text(with title)":http://example.com/';
  t.is(textile.convert(tx),
    '<p><a href="http://example.com/" title="with title">link text</a></p>', tx);
  t.end();
});


test('link alias', t => {
  const tx = `Here's "a link":tstate, and
"another link":tstate to the same site.

[tstate]http://thresholdstate.com/`;
  t.is(textile.convert(tx),
    `<p>Here&#8217;s <a href="http://thresholdstate.com/">a link</a>, and<br />
<a href="http://thresholdstate.com/">another link</a> to the same site.</p>`, tx);
  t.end();
});


test('image', t => {
  const tx = '!/img.gif!';
  t.is(textile.convert(tx),
    '<p><img src="/img.gif" alt="" /></p>', tx);
  t.end();
});


test('image 2', t => {
  const tx = '!http://thresholdstate.com/img.gif!';
  t.is(textile.convert(tx),
    '<p><img src="http://thresholdstate.com/img.gif" alt="" /></p>', tx);
  t.end();
});


test('image alt', t => {
  const tx = '!/img.gif(alt text)!';
  t.is(textile.convert(tx),
    '<p><img src="/img.gif" title="alt text" alt="alt text" /></p>', tx);
  t.end();
});


test('image links', t => {
  const tx = '!/img.gif!:http://textpattern.com/';
  t.is(textile.convert(tx),
    '<p><a href="http://textpattern.com/"><img src="/img.gif" alt="" /></a></p>', tx);
  t.end();
});


test('headers', t => {
  const tx = 'h1. Heading 1';
  t.is(textile.convert(tx),
    '<h1>Heading 1</h1>', tx);
  t.end();
});


test('headers 2', t => {
  const tx = 'h2. Heading 2';
  t.is(textile.convert(tx),
    '<h2>Heading 2</h2>', tx);
  t.end();
});


test('headers 3', t => {
  const tx = 'h6. Heading 6';
  t.is(textile.convert(tx),
    '<h6>Heading 6</h6>', tx);
  t.end();
});


test('paragraph text', t => {
  const tx = `p. A paragraph.
Continued.

Also a paragraph.`;
  t.is(textile.convert(tx),
    `<p>A paragraph.<br />
Continued.</p>
<p>Also a paragraph.</p>`, tx);
  t.end();
});


test('block quote', t => {
  const tx = `bq. A quotation.
Continued.

Regular paragraph.`;
  t.is(textile.convert(tx),
    `<blockquote>
<p>A quotation.<br />
Continued.</p>
</blockquote>
<p>Regular paragraph.</p>`, tx);
  t.end();
});


test('block quote citation', t => {
  const tx = 'bq.:http://thresholdstate.com/ A cited quotation.';
  t.is(textile.convert(tx),
    `<blockquote cite="http://thresholdstate.com/">
<p>A cited quotation.</p>
</blockquote>`, tx);
  t.end();
});


test('footnotes', t => {
  const tx = `A footnote reference[1].

fn1^. The footnote.`;
  t.is(textile.convert(tx),
    `<p>A footnote reference<sup class="footnote" id="fnr1"><a href="#fn1">1</a></sup>.</p>
<p class="footnote" id="fn1"><a href="#fnr1"><sup>1</sup></a> The footnote.</p>`, tx);
  t.end();
});


test('block code', t => {
  const tx = `bc. <script>
// a Javascript example
alert("Hello World");
</script>`;
  t.is(textile.convert(tx),
    `<pre><code>&lt;script&gt;
// a Javascript example
alert("Hello World");
&lt;/script&gt;</code></pre>`, tx);
  t.end();
});


test('preformatted text', t => {
  const tx = `pre. Pre-formatted
text`;
  t.is(textile.convert(tx),
    `<pre>Pre-formatted
text</pre>`, tx);
  t.end();
});


test('notextile', t => {
  const tx = `notextile. <script type="text/javascript">
document.write("Hello World!");
</script>
<noscript>Your browser doesn't support Javascript</noscript>`;
  t.is(textile.convert(tx),
    `<script type="text/javascript">
document.write("Hello World!");
</script>
<noscript>Your browser doesn't support Javascript</noscript>`, tx);
  t.end();
});


test('class attribute', t => {
  const tx = 'p(myclass). My classy paragraph.';
  t.is(textile.convert(tx),
    '<p class="myclass">My classy paragraph.</p>', tx);
  t.end();
});


test('id attribute', t => {
  const tx = 'p(#myid). My ID paragraph.';
  t.is(textile.convert(tx),
    '<p id="myid">My ID paragraph.</p>', tx);
  t.end();
});


test('style attribute', t => {
  const tx = 'p{color:red}. Red rum.';
  t.is(textile.convert(tx),
    '<p style="color:red">Red rum.</p>', tx);
  t.end();
});


test('lang attribute', t => {
  const tx = 'p[fr-fr]. En français.';
  t.is(textile.convert(tx),
    '<p lang="fr-fr">En français.</p>', tx);
  t.end();
});


test('phrase modifiers', t => {
  const tx = 'A *(myclass)classy* phrase.';
  t.is(textile.convert(tx),
    '<p>A <strong class="myclass">classy</strong> phrase.</p>', tx);
  t.end();
});


test('phrase modifiers 2', t => {
  const tx = 'An _(#myid2)ID_ phrase.';
  t.is(textile.convert(tx),
    '<p>An <em id="myid2">ID</em> phrase.</p>', tx);
  t.end();
});


test('phrase modifiers 3', t => {
  const tx = 'The %{color:blue}blue% room.';
  t.is(textile.convert(tx),
    '<p>The <span style="color:blue">blue</span> room.</p>', tx);
  t.end();
});


test('block and phrase attributes combined', t => {
  const tx = 'p(myclass#myid3){color:green}[de-de]. A complex paragraph.';
  t.is(textile.convert(tx),
    '<p style="color:green" class="myclass" id="myid3" lang="de-de">A complex paragraph.</p>', tx);
  t.end();
});


test('block and phrase attributes combined 2', t => {
  const tx = 'A ??(myclass#myid4){color:green}[de-de]complex?? phrase.';
  t.is(textile.convert(tx),
    '<p>A <cite style="color:green" class="myclass" id="myid4" lang="de-de">complex</cite> phrase.</p>', tx);
  t.end();
});


test('extended blocks', t => {
  const tx = `bq.. A quote.

The quote continued.

p. Back to paragraph text.`;
  t.is(textile.convert(tx),
    `<blockquote>
<p>A quote.</p>
<p>The quote continued.</p>
</blockquote>
<p>Back to paragraph text.</p>`, tx);
  t.end();
});


test('extended block code', t => {
  const tx = `A PHP code example.

bc.. <?php
function hello() {
// display a hello message

print "Hello, World";
}
?>

p. Following paragraph.`;
  t.is(textile.convert(tx),
    `<p>A <span class="caps">PHP</span> code example.</p>
<pre><code>&lt;?php
function hello() {
// display a hello message

print "Hello, World";
}
?&gt;</code></pre>
<p>Following paragraph.</p>`, tx);
  t.end();
});


test('extended block attributes', t => {
  const tx = `p(myclass).. A classy paragraph.

Another classy paragraph.

p. Not so classy.`;
  t.is(textile.convert(tx),
    `<p class="myclass">A classy paragraph.</p>
<p class="myclass">Another classy paragraph.</p>
<p>Not so classy.</p>`, tx);
  t.end();
});


test('extended block quote attributes', t => {
  const tx = `bq(myclass).. Quote paragraph 1.

Paragraph 2.`;
  t.is(textile.convert(tx),
    `<blockquote class="myclass">
<p class="myclass">Quote paragraph 1.</p>
<p class="myclass">Paragraph 2.</p>
</blockquote>`, tx);
  t.end();
});


test('extended block code attributes', t => {
  const tx = `bc(myclass).. Code block 1.

Code block 2.`;
  t.is(textile.convert(tx),
    `<pre class="myclass"><code class="myclass">Code block 1.

Code block 2.</code></pre>`, tx);
  t.end();
});


test('raw xhtml left in tact', t => {
  const tx = '<b>bold</b> and <i>italic</i>, the hard way.';
  t.is(textile.convert(tx),
    '<p><b>bold</b> and <i>italic</i>, the hard way.</p>', tx);
  t.end();
});


test('paragraphs entirely raw xhtml', t => {
  const tx = '<div class="mydiv">My div</div>';
  t.is(textile.convert(tx),
    '<div class="mydiv">My div</div>', tx);
  t.end();
});


test('paragraphs with inline xhtml', t => {
  const tx = '<img src="/img.gif" alt="image" />';
  t.is(textile.convert(tx),
    '<p><img src="/img.gif" alt="image" /></p>', tx);
  t.end();
});


test('paragraphs with inline xhtml 2', t => {
  const tx = "<span class=\"myspan\">I'll make my own way.</span>";
  t.is(textile.convert(tx),
    '<p><span class="myspan">I&#8217;ll make my own way.</span></p>', tx);
  t.end();
});


// BT: this nesting is invalid HTML, but I'm matching the PHP version here
test('paragraphs partly enclosed in xhtml block tags', t => {
  const tx = '<div>inside</div> and outside.';
  t.is(textile.convert(tx),
    '<p><div>inside</div> and outside.</p>', tx);
  t.end();
});


test('complex xhtml blocks', t => {
  const tx = ` <div>
 <span>My div</span>
 </div>`;
  t.is(textile.convert(tx),
    `<div>
 <span>My div</span>
</div>`, tx);
  t.end();
});


test('complex xhtml blocks 2', t => {
  const tx = `notextile.. <div>

<span>My div</span>

</div>`;
  t.is(textile.convert(tx),
    `<div>

<span>My div</span>

</div>`, tx);
  t.end();
});


test('complex xhtml blocks with inline formatting', t => {
  const tx = ` <div>
 <span>My *div*</span>
 </div>`;
  t.is(textile.convert(tx),
    `<div>
 <span>My <strong>div</strong></span>
</div>`, tx);
  t.end();
});


test('explicit pre escapement', t => {
  const tx = `<pre>
A HTML <b>example</b>
</pre>`;
  t.is(textile.convert(tx),
    `<pre>
A HTML &lt;b&gt;example&lt;/b&gt;
</pre>`, tx);
  t.end();
});


test('explicit code escapement', t => {
  const tx = `<code>
Another HTML <b>example</b>
</code>`;
  t.is(textile.convert(tx),
    `<p><code>
Another HTML &lt;b&gt;example&lt;/b&gt;
</code></p>`, tx);
  t.end();
});


test('notextile tags', t => {
  const tx = `<notextile>
p. Leave me alone
</notextile>`;
  t.is(textile.convert(tx),
    '\np. Leave me alone\n', tx);
  t.end();
});


test('left aligned text', t => {
  const tx = 'p<. Left-aligned paragraph.';
  t.is(textile.convert(tx),
    '<p style="text-align:left">Left-aligned paragraph.</p>', tx);
  t.end();
});


test('right aligned text', t => {
  const tx = 'h3>. Right-aligned heading.';
  t.is(textile.convert(tx),
    '<h3 style="text-align:right">Right-aligned heading.</h3>', tx);
  t.end();
});


test('justified text', t => {
  const tx = 'p<>. Justified paragraph.';
  t.is(textile.convert(tx),
    '<p style="text-align:justify">Justified paragraph.</p>', tx);
  t.end();
});


test('centered text', t => {
  const tx = 'h3=. Centered heading.';
  t.is(textile.convert(tx),
    '<h3 style="text-align:center">Centered heading.</h3>', tx);
  t.end();
});


test('padding', t => {
  const tx = 'p(. Left pad 1em.';
  t.is(textile.convert(tx),
    '<p style="padding-left:1em">Left pad 1em.</p>', tx);
  t.end();
});


test('padding 2', t => {
  const tx = 'p)). Right pad 2em.';
  t.is(textile.convert(tx),
    '<p style="padding-right:2em">Right pad 2em.</p>', tx);
  t.end();
});


test('padding 3', t => {
  const tx = 'p(). Left and right pad 1em.';
  t.is(textile.convert(tx),
    '<p style="padding-left:1em;padding-right:1em">Left and right pad 1em.</p>', tx);
  t.end();
});


test('numeric lists', t => {
  const tx = `# Item one
# Item two
# Item three`;
  t.is(textile.convert(tx),
    `<ol>
\t<li>Item one</li>
\t<li>Item two</li>
\t<li>Item three</li>
</ol>`, tx);
  t.end();
});


test('bulleted lists', t => {
  const tx = `* Item A
* Item B
* Item C`;
  t.is(textile.convert(tx),
    `<ul>
\t<li>Item A</li>
\t<li>Item B</li>
\t<li>Item C</li>
</ul>`, tx);
  t.end();
});


test('nested lists', t => {
  const tx = `# Item one
## Item one-A
## Item one-B
### Item one-B-a
# Item two`;
  t.is(textile.convert(tx),
    `<ol>
\t<li>Item one
\t<ol>
\t\t<li>Item one-A</li>
\t\t<li>Item one-B
\t\t<ol>
\t\t\t<li>Item one-B-a</li>
\t\t</ol></li>
\t</ol></li>
\t<li>Item two</li>
</ol>`, tx);
  t.end();
});


test('tables', t => {
  const tx = '|a|simple|table|';
  t.is(textile.convert(tx),
    `<table>
\t<tr>
\t\t<td>a</td>
\t\t<td>simple</td>
\t\t<td>table</td>
\t</tr>
</table>`, tx);
  t.end();
});


test('table heading cells', t => {
  const tx = `|_. a|_. table|_. heading|
|a|table|row|`;
  t.is(textile.convert(tx),
    `<table>
\t<tr>
\t\t<th>a</th>
\t\t<th>table</th>
\t\t<th>heading</th>
\t</tr>
\t<tr>
\t\t<td>a</td>
\t\t<td>table</td>
\t\t<td>row</td>
\t</tr>
</table>`, tx);
  t.end();
});


test('cell attributes', t => {
  const tx = '|a|{color:red}. styled|cell|';
  t.is(textile.convert(tx),
    `<table>
\t<tr>
\t\t<td>a</td>
\t\t<td style="color:red">styled</td>
\t\t<td>cell</td>
\t</tr>
</table>`, tx);
  t.end();
});


test('row attributes', t => {
  const tx = '(rowclass). |a|classy|row|';
  t.is(textile.convert(tx),
    `<table>
\t<tr class="rowclass">
\t\t<td>a</td>
\t\t<td>classy</td>
\t\t<td>row</td>
\t</tr>
</table>`, tx);
  t.end();
});


test('table attributes', t => {
  const tx = `table(tableclass).
|a|classy|table|
|a|classy|table|`;
  t.is(textile.convert(tx),
    `<table class="tableclass">
\t<tr>
\t\t<td>a</td>
\t\t<td>classy</td>
\t\t<td>table</td>
\t</tr>
\t<tr>
\t\t<td>a</td>
\t\t<td>classy</td>
\t\t<td>table</td>
\t</tr>
</table>`, tx);
  t.end();
});


test('vertical alignment', t => {
  const tx = '|^. top alignment|';
  t.is(textile.convert(tx),
    `<table>
\t<tr>
\t\t<td style="vertical-align:top">top alignment</td>
\t</tr>
</table>`, tx);
  t.end();
});


test('vertical alignment 2', t => {
  const tx = '|-. middle alignment|';
  t.is(textile.convert(tx),
    `<table>
\t<tr>
\t\t<td style="vertical-align:middle">middle alignment</td>
\t</tr>
</table>`, tx);
  t.end();
});


test('vertical alignment 3', t => {
  const tx = '|~. bottom alignment|';
  t.is(textile.convert(tx),
    `<table>
\t<tr>
\t\t<td style="vertical-align:bottom">bottom alignment</td>
\t</tr>
</table>`, tx);
  t.end();
});


test('column span', t => {
  const tx = `|\\2. spans two cols |
| col 1 | col 2 |`;
  t.is(textile.convert(tx),
    `<table>
\t<tr>
\t\t<td colspan="2">spans two cols </td>
\t</tr>
\t<tr>
\t\t<td> col 1 </td>
\t\t<td> col 2 </td>
\t</tr>
</table>`, tx);
  t.end();
});


test('row span', t => {
  const tx = `|/3. spans 3 rows | row a |
| row b |
| row c |`;
  t.is(textile.convert(tx),
    `<table>
\t<tr>
\t\t<td rowspan="3">spans 3 rows </td>
\t\t<td> row a </td>
\t</tr>
\t<tr>
\t\t<td> row b </td>
\t</tr>
\t<tr>
\t\t<td> row c </td>
\t</tr>
</table>`, tx);
  t.end();
});


test('whitespace required', t => {
  const tx = "this*won't*work";
  t.is(textile.convert(tx),
    '<p>this*won&#8217;t*work</p>', tx);
  t.end();
});


test('modifier without whitespace', t => {
  const tx = 'this[*will*]work';
  t.is(textile.convert(tx),
    '<p>this<strong>will</strong>work</p>', tx);
  t.end();
});


test('modifier without whitespace 2', t => {
  const tx = '1[^st^], 2[^nd^], 3[^rd^].';
  t.is(textile.convert(tx),
    '<p>1<sup>st</sup>, 2<sup>nd</sup>, 3<sup>rd</sup>.</p>', tx);
  t.end();
});


test('modifier without whitespace 3', t => {
  const tx = '2 log[~n~]';
  t.is(textile.convert(tx),
    '<p>2 log<sub>n</sub></p>', tx);
  t.end();
});


test('modifier without whitespace 4', t => {
  const tx = `A close[!/img.gif!]image.
A tight["text":http://thresholdstate.com/]link.
A ["footnoted link":http://thresholdstate.com/][1].`;
  t.is(textile.convert(tx),
    `<p>A close<img src="/img.gif" alt="" />image.<br />
A tight<a href="http://thresholdstate.com/">text</a>link.<br />
A <a href="http://thresholdstate.com/">footnoted link</a><sup class="footnote" id="fnr1"><a href="#fn1">1</a></sup>.</p>`, tx);
  t.end();
});

