const test = require('tape');
const textile = require('../src');
// threshold.yml

test('paragraph', function (t) {
  const tx = 'A paragraph.\n\n\
Another paragraph.';
  t.is(textile.convert(tx),
    '<p>A paragraph.</p>\n\
<p>Another paragraph.</p>', tx);
  t.end();
});


test('line breaks', function (t) {
  const tx = 'A paragraph with\n\
a line break.';
  t.is(textile.convert(tx),
    '<p>A paragraph with<br />\n\
a line break.</p>', tx);
  t.end();
});


test('xhtml tags', function (t) {
  const tx = "Here's some <b>bold</b> text.";
  t.is(textile.convert(tx),
    '<p>Here&#8217;s some <b>bold</b> text.</p>', tx);
  t.end();
});


test('no paragraph tags', function (t) {
  const tx = ' No paragraph tags here.';
  t.is(textile.convert(tx),
    'No paragraph tags here.', tx);
  t.end();
});


test('smart quotes', function (t) {
  const tx = '"Proceed!" said he to the host.';
  t.is(textile.convert(tx),
    '<p>&#8220;Proceed!&#8221; said he to the host.</p>', tx);
  t.end();
});


test('smart quotes 2', function (t) {
  const tx = "'Proceed!' said he to the host.";
  t.is(textile.convert(tx),
    '<p>&#8216;Proceed!&#8217; said he to the host.</p>', tx);
  t.end();
});


test('nested quotation marks', function (t) {
  const tx = "\"'I swear, captain,' replied I.\"";
  t.is(textile.convert(tx),
    '<p>&#8220;&#8216;I swear, captain,&#8217; replied I.&#8221;</p>', tx);
  t.end();
});


test('nested quotation marks 2', function (t) {
  const tx = "'\"I swear, captain,\" replied I.'";
  t.is(textile.convert(tx),
    '<p>&#8216;&#8220;I swear, captain,&#8221; replied I.&#8217;</p>', tx);
  t.end();
});


test('apostrophe glyphs', function (t) {
  const tx = "Greengrocers' apostrophe's.";
  t.is(textile.convert(tx),
    '<p>Greengrocers&#8217; apostrophe&#8217;s.</p>', tx);
  t.end();
});


test('em-dash glyphs', function (t) {
  const tx = 'You know the Italian proverb -- Chi ha compagno ha padrone.';
  t.is(textile.convert(tx),
    '<p>You know the Italian proverb &#8212; Chi ha compagno ha padrone.</p>', tx);
  t.end();
});


test('em-dash glyphs 2', function (t) {
  const tx = 'You know the Italian proverb--Chi ha compagno ha padrone.';
  t.is(textile.convert(tx),
    '<p>You know the Italian proverb&#8212;Chi ha compagno ha padrone.</p>', tx);
  t.end();
});


test('en-dash glyphs', function (t) {
  const tx = 'You know the Italian proverb - Chi ha compagno ha padrone.';
  t.is(textile.convert(tx),
    '<p>You know the Italian proverb &#8211; Chi ha compagno ha padrone.</p>', tx);
  t.end();
});


test('ellipsis character', function (t) {
  const tx = 'Meanwhile...';
  t.is(textile.convert(tx),
    '<p>Meanwhile&#8230;</p>', tx);
  t.end();
});


test('dimension character', function (t) {
  const tx = '1 x 2 x 3 = 6';
  t.is(textile.convert(tx),
    '<p>1 &#215; 2 &#215; 3 = 6</p>', tx);
  t.end();
});


test('dimension character 2', function (t) {
  const tx = '1x2x3 = 6';
  t.is(textile.convert(tx),
    '<p>1&#215;2&#215;3 = 6</p>', tx);
  t.end();
});


test('trademark register copyright', function (t) {
  const tx = 'Registered(r) Trademark(tm) Copyright (c).';
  t.is(textile.convert(tx),
    '<p>Registered&#174; Trademark&#8482; Copyright &#169;.</p>', tx);
  t.end();
});


test('acronyms', function (t) {
  const tx = 'ABC(Always Be Closing)';
  t.is(textile.convert(tx),
    '<p><abbr title="Always Be Closing"><span class="caps">ABC</span></abbr></p>', tx);
  t.end();
});


test('uppercase', function (t) {
  const tx = 'IBM or HAL';
  t.is(textile.convert(tx),
    '<p><span class="caps">IBM</span> or <span class="caps">HAL</span></p>', tx);
  t.end();
});


test('emphasis', function (t) {
  const tx = 'The _underlying_ cause.';
  t.is(textile.convert(tx),
    '<p>The <em>underlying</em> cause.</p>', tx);
  t.end();
});


test('strong text', function (t) {
  const tx = 'The *underlying* cause.';
  t.is(textile.convert(tx),
    '<p>The <strong>underlying</strong> cause.</p>', tx);
  t.end();
});


test('italic text', function (t) {
  const tx = 'The __underlying__ cause.';
  t.is(textile.convert(tx),
    '<p>The <i>underlying</i> cause.</p>', tx);
  t.end();
});


test('bold text', function (t) {
  const tx = 'The **underlying** cause.';
  t.is(textile.convert(tx),
    '<p>The <b>underlying</b> cause.</p>', tx);
  t.end();
});


test('citation', function (t) {
  const tx = '??The Count of Monte Cristo??, by Dumas.';
  t.is(textile.convert(tx),
    '<p><cite>The Count of Monte Cristo</cite>, by Dumas.</p>', tx);
  t.end();
});


test('inserted and deleted text', function (t) {
  const tx = 'Scratch -that-, replace with +this+.';
  t.is(textile.convert(tx),
    '<p>Scratch <del>that</del>, replace with <ins>this</ins>.</p>', tx);
  t.end();
});


test('subscript', function (t) {
  const tx = 'log ~2~ n';
  t.is(textile.convert(tx),
    '<p>log <sub>2</sub> n</p>', tx);
  t.end();
});


test('superscript', function (t) {
  const tx = '2 ^x^';
  t.is(textile.convert(tx),
    '<p>2 <sup>x</sup></p>', tx);
  t.end();
});


test('span tag', function (t) {
  const tx = 'The %underlying% cause.';
  t.is(textile.convert(tx),
    '<p>The <span>underlying</span> cause.</p>', tx);
  t.end();
});


test('code', function (t) {
  const tx = 'About the @<hr />@ tag.';
  t.is(textile.convert(tx),
    '<p>About the <code>&lt;hr /&gt;</code> tag.</p>', tx);
  t.end();
});


test('links', function (t) {
  const tx = '"link text":http://example.com/';
  t.is(textile.convert(tx),
    '<p><a href="http://example.com/">link text</a></p>', tx);
  t.end();
});


test('local links', function (t) {
  const tx = '"link text":/example';
  t.is(textile.convert(tx),
    '<p><a href="/example">link text</a></p>', tx);
  t.end();
});


test('link title', function (t) {
  const tx = '"link text(with title)":http://example.com/';
  t.is(textile.convert(tx),
    '<p><a href="http://example.com/" title="with title">link text</a></p>', tx);
  t.end();
});


test('link alias', function (t) {
  const tx = "Here's \"a link\":tstate, and\n\
\"another link\":tstate to the same site.\n\n\
[tstate]http://thresholdstate.com/";
  t.is(textile.convert(tx),
    '<p>Here&#8217;s <a href="http://thresholdstate.com/">a link</a>, and<br />\n\
<a href="http://thresholdstate.com/">another link</a> to the same site.</p>', tx);
  t.end();
});


test('image', function (t) {
  const tx = '!/img.gif!';
  t.is(textile.convert(tx),
    '<p><img src="/img.gif" alt="" /></p>', tx);
  t.end();
});


test('image 2', function (t) {
  const tx = '!http://thresholdstate.com/img.gif!';
  t.is(textile.convert(tx),
    '<p><img src="http://thresholdstate.com/img.gif" alt="" /></p>', tx);
  t.end();
});


test('image alt', function (t) {
  const tx = '!/img.gif(alt text)!';
  t.is(textile.convert(tx),
    '<p><img src="/img.gif" title="alt text" alt="alt text" /></p>', tx);
  t.end();
});


test('image links', function (t) {
  const tx = '!/img.gif!:http://textpattern.com/';
  t.is(textile.convert(tx),
    '<p><a href="http://textpattern.com/"><img src="/img.gif" alt="" /></a></p>', tx);
  t.end();
});


test('headers', function (t) {
  const tx = 'h1. Heading 1';
  t.is(textile.convert(tx),
    '<h1>Heading 1</h1>', tx);
  t.end();
});


test('headers 2', function (t) {
  const tx = 'h2. Heading 2';
  t.is(textile.convert(tx),
    '<h2>Heading 2</h2>', tx);
  t.end();
});


test('headers 3', function (t) {
  const tx = 'h6. Heading 6';
  t.is(textile.convert(tx),
    '<h6>Heading 6</h6>', tx);
  t.end();
});


test('paragraph text', function (t) {
  const tx = 'p. A paragraph.\n\
Continued.\n\n\
Also a paragraph.';
  t.is(textile.convert(tx),
    '<p>A paragraph.<br />\n\
Continued.</p>\n\
<p>Also a paragraph.</p>', tx);
  t.end();
});


test('block quote', function (t) {
  const tx = 'bq. A quotation.\n\
Continued.\n\n\
Regular paragraph.';
  t.is(textile.convert(tx),
    '<blockquote>\n\
<p>A quotation.<br />\n\
Continued.</p>\n\
</blockquote>\n\
<p>Regular paragraph.</p>', tx);
  t.end();
});


test('block quote citation', function (t) {
  const tx = 'bq.:http://thresholdstate.com/ A cited quotation.';
  t.is(textile.convert(tx),
    '<blockquote cite="http://thresholdstate.com/">\n\
<p>A cited quotation.</p>\n\
</blockquote>', tx);
  t.end();
});


test('footnotes', function (t) {
  const tx = 'A footnote reference[1].\n\n\
fn1. The footnote.';
  t.is(textile.convert(tx),
    '<p>A footnote reference<sup class="footnote" id="fnr1"><a href="#fn1">1</a></sup>.</p>\n\
<p class="footnote" id="fn1"><a href="#fnr1"><sup>1</sup></a> The footnote.</p>', tx);
  t.end();
});


test('block code', function (t) {
  const tx = 'bc. <script>\n\
// a Javascript example\n\
alert("Hello World");\n\
</script>';
  t.is(textile.convert(tx),
    '<pre><code>&lt;script&gt;\n\
// a Javascript example\n\
alert("Hello World");\n\
&lt;/script&gt;</code></pre>', tx);
  t.end();
});


test('preformatted text', function (t) {
  const tx = 'pre. Pre-formatted\n\
text';
  t.is(textile.convert(tx),
    '<pre>Pre-formatted\n\
text</pre>', tx);
  t.end();
});


test('notextile', function (t) {
  const tx = "notextile. <script type=\"text/javascript\">\n\
document.write(\"Hello World!\");\n\
</script>\n\
<noscript>Your browser doesn't support Javascript</noscript>";
  t.is(textile.convert(tx),
    "<script type=\"text/javascript\">\n\
document.write(\"Hello World!\");\n\
</script>\n\
<noscript>Your browser doesn't support Javascript</noscript>", tx);
  t.end();
});


test('class attribute', function (t) {
  const tx = 'p(myclass). My classy paragraph.';
  t.is(textile.convert(tx),
    '<p class="myclass">My classy paragraph.</p>', tx);
  t.end();
});


test('id attribute', function (t) {
  const tx = 'p(#myid). My ID paragraph.';
  t.is(textile.convert(tx),
    '<p id="myid">My ID paragraph.</p>', tx);
  t.end();
});


test('style attribute', function (t) {
  const tx = 'p{color:red}. Red rum.';
  t.is(textile.convert(tx),
    '<p style="color:red">Red rum.</p>', tx);
  t.end();
});


test('lang attribute', function (t) {
  const tx = 'p[fr-fr]. En français.';
  t.is(textile.convert(tx),
    '<p lang="fr-fr">En français.</p>', tx);
  t.end();
});


test('phrase modifiers', function (t) {
  const tx = 'A *(myclass)classy* phrase.';
  t.is(textile.convert(tx),
    '<p>A <strong class="myclass">classy</strong> phrase.</p>', tx);
  t.end();
});


test('phrase modifiers 2', function (t) {
  const tx = 'An _(#myid2)ID_ phrase.';
  t.is(textile.convert(tx),
    '<p>An <em id="myid2">ID</em> phrase.</p>', tx);
  t.end();
});


test('phrase modifiers 3', function (t) {
  const tx = 'The %{color:blue}blue% room.';
  t.is(textile.convert(tx),
    '<p>The <span style="color:blue">blue</span> room.</p>', tx);
  t.end();
});


test('block and phrase attributes combined', function (t) {
  const tx = 'p(myclass#myid3){color:green}[de-de]. A complex paragraph.';
  t.is(textile.convert(tx),
    '<p style="color:green" class="myclass" id="myid3" lang="de-de">A complex paragraph.</p>', tx);
  t.end();
});


test('block and phrase attributes combined 2', function (t) {
  const tx = 'A ??(myclass#myid4){color:green}[de-de]complex?? phrase.';
  t.is(textile.convert(tx),
    '<p>A <cite style="color:green" class="myclass" id="myid4" lang="de-de">complex</cite> phrase.</p>', tx);
  t.end();
});


test('extended blocks', function (t) {
  const tx = 'bq.. A quote.\n\n\
The quote continued.\n\n\
p. Back to paragraph text.';
  t.is(textile.convert(tx),
    '<blockquote>\n\
<p>A quote.</p>\n\
<p>The quote continued.</p>\n\
</blockquote>\n\
<p>Back to paragraph text.</p>', tx);
  t.end();
});


test('extended block code', function (t) {
  const tx = 'A PHP code example.\n\n\
bc.. <?php\n\
function hello() {\n\
// display a hello message\n\n\
print "Hello, World";\n\
}\n\
?>\n\n\
p. Following paragraph.';
  t.is(textile.convert(tx),
    '<p>A <span class="caps">PHP</span> code example.</p>\n\
<pre><code>&lt;?php\n\
function hello() {\n\
// display a hello message\n\n\
print "Hello, World";\n\
}\n\
?&gt;</code></pre>\n\
<p>Following paragraph.</p>', tx);
  t.end();
});


test('extended block attributes', function (t) {
  const tx = 'p(myclass).. A classy paragraph.\n\n\
Another classy paragraph.\n\n\
p. Not so classy.';
  t.is(textile.convert(tx),
    '<p class="myclass">A classy paragraph.</p>\n\
<p class="myclass">Another classy paragraph.</p>\n\
<p>Not so classy.</p>', tx);
  t.end();
});


test('extended block quote attributes', function (t) {
  const tx = 'bq(myclass).. Quote paragraph 1.\n\n\
Paragraph 2.';
  t.is(textile.convert(tx),
    '<blockquote class="myclass">\n\
<p class="myclass">Quote paragraph 1.</p>\n\
<p class="myclass">Paragraph 2.</p>\n\
</blockquote>', tx);
  t.end();
});


test('extended block code attributes', function (t) {
  const tx = 'bc(myclass).. Code block 1.\n\n\
Code block 2.';
  t.is(textile.convert(tx),
    '<pre class="myclass"><code class="myclass">Code block 1.\n\n\
Code block 2.</code></pre>', tx);
  t.end();
});


test('raw xhtml left in tact', function (t) {
  const tx = '<b>bold</b> and <i>italic</i>, the hard way.';
  t.is(textile.convert(tx),
    '<p><b>bold</b> and <i>italic</i>, the hard way.</p>', tx);
  t.end();
});


test('paragraphs entirely raw xhtml', function (t) {
  const tx = '<div class="mydiv">My div</div>';
  t.is(textile.convert(tx),
    '<div class="mydiv">My div</div>', tx);
  t.end();
});


test('paragraphs with inline xhtml', function (t) {
  const tx = '<img src="/img.gif" alt="image" />';
  t.is(textile.convert(tx),
    '<p><img src="/img.gif" alt="image" /></p>', tx);
  t.end();
});


test('paragraphs with inline xhtml 2', function (t) {
  const tx = "<span class=\"myspan\">I'll make my own way.</span>";
  t.is(textile.convert(tx),
    '<p><span class="myspan">I&#8217;ll make my own way.</span></p>', tx);
  t.end();
});


// BT: this nesting is invalid HTML, but I'm matching the PHP version here
test('paragraphs partly enclosed in xhtml block tags', function (t) {
  const tx = '<div>inside</div> and outside.';
  t.is(textile.convert(tx),
    '<p><div>inside</div> and outside.</p>', tx);
  t.end();
});


test('complex xhtml blocks', function (t) {
  const tx = ' <div>\n\
 <span>My div</span>\n\
 </div>';
  t.is(textile.convert(tx),
    '<div>\n\
 <span>My div</span>\n\
</div>', tx);
  t.end();
});


test('complex xhtml blocks 2', function (t) {
  const tx = 'notextile.. <div>\n\n\
<span>My div</span>\n\n\
</div>';
  t.is(textile.convert(tx),
    '<div>\n\n\
<span>My div</span>\n\n\
</div>', tx);
  t.end();
});


test('complex xhtml blocks with inline formatting', function (t) {
  const tx = ' <div>\n\
 <span>My *div*</span>\n\
 </div>';
  t.is(textile.convert(tx),
    '<div>\n\
 <span>My <strong>div</strong></span>\n\
</div>', tx);
  t.end();
});


test('explicit pre escapement', function (t) {
  const tx = '<pre>\n\
A HTML <b>example</b>\n\
</pre>';
  t.is(textile.convert(tx),
    '<pre>\n\
A HTML &lt;b&gt;example&lt;/b&gt;\n\
</pre>', tx);
  t.end();
});


test('explicit code escapement', function (t) {
  const tx = '<code>\n\
Another HTML <b>example</b>\n\
</code>';
  t.is(textile.convert(tx),
    '<p><code>\n\
Another HTML &lt;b&gt;example&lt;/b&gt;\n\
</code></p>', tx);
  t.end();
});


test('notextile tags', function (t) {
  const tx = '<notextile>\n\
p. Leave me alone\n\
</notextile>';
  t.is(textile.convert(tx),
    '\np. Leave me alone\n', tx);
  t.end();
});


test('left aligned text', function (t) {
  const tx = 'p<. Left-aligned paragraph.';
  t.is(textile.convert(tx),
    '<p style="text-align:left">Left-aligned paragraph.</p>', tx);
  t.end();
});


test('right aligned text', function (t) {
  const tx = 'h3>. Right-aligned heading.';
  t.is(textile.convert(tx),
    '<h3 style="text-align:right">Right-aligned heading.</h3>', tx);
  t.end();
});


test('justified text', function (t) {
  const tx = 'p<>. Justified paragraph.';
  t.is(textile.convert(tx),
    '<p style="text-align:justify">Justified paragraph.</p>', tx);
  t.end();
});


test('centered text', function (t) {
  const tx = 'h3=. Centered heading.';
  t.is(textile.convert(tx),
    '<h3 style="text-align:center">Centered heading.</h3>', tx);
  t.end();
});


test('padding', function (t) {
  const tx = 'p(. Left pad 1em.';
  t.is(textile.convert(tx),
    '<p style="padding-left:1em">Left pad 1em.</p>', tx);
  t.end();
});


test('padding 2', function (t) {
  const tx = 'p)). Right pad 2em.';
  t.is(textile.convert(tx),
    '<p style="padding-right:2em">Right pad 2em.</p>', tx);
  t.end();
});


test('padding 3', function (t) {
  const tx = 'p(). Left and right pad 1em.';
  t.is(textile.convert(tx),
    '<p style="padding-left:1em;padding-right:1em">Left and right pad 1em.</p>', tx);
  t.end();
});


test('numeric lists', function (t) {
  const tx = '# Item one\n\
# Item two\n\
# Item three';
  t.is(textile.convert(tx),
    '<ol>\n\
\t<li>Item one</li>\n\
\t<li>Item two</li>\n\
\t<li>Item three</li>\n\
</ol>', tx);
  t.end();
});


test('bulleted lists', function (t) {
  const tx = '* Item A\n\
* Item B\n\
* Item C';
  t.is(textile.convert(tx),
    '<ul>\n\
\t<li>Item A</li>\n\
\t<li>Item B</li>\n\
\t<li>Item C</li>\n\
</ul>', tx);
  t.end();
});


test('nested lists', function (t) {
  const tx = '# Item one\n\
## Item one-A\n\
## Item one-B\n\
### Item one-B-a\n\
# Item two';
  t.is(textile.convert(tx),
    '<ol>\n\
\t<li>Item one\n\
\t<ol>\n\
\t\t<li>Item one-A</li>\n\
\t\t<li>Item one-B\n\
\t\t<ol>\n\
\t\t\t<li>Item one-B-a</li>\n\
\t\t</ol></li>\n\
\t</ol></li>\n\
\t<li>Item two</li>\n\
</ol>', tx);
  t.end();
});


test('tables', function (t) {
  const tx = '|a|simple|table|';
  t.is(textile.convert(tx),
    '<table>\n\
\t<tr>\n\
\t\t<td>a</td>\n\
\t\t<td>simple</td>\n\
\t\t<td>table</td>\n\
\t</tr>\n\
</table>', tx);
  t.end();
});


test('table heading cells', function (t) {
  const tx = '|_. a|_. table|_. heading|\n\
|a|table|row|';
  t.is(textile.convert(tx),
    '<table>\n\
\t<tr>\n\
\t\t<th>a</th>\n\
\t\t<th>table</th>\n\
\t\t<th>heading</th>\n\
\t</tr>\n\
\t<tr>\n\
\t\t<td>a</td>\n\
\t\t<td>table</td>\n\
\t\t<td>row</td>\n\
\t</tr>\n\
</table>', tx);
  t.end();
});


test('cell attributes', function (t) {
  const tx = '|a|{color:red}. styled|cell|';
  t.is(textile.convert(tx),
    '<table>\n\
\t<tr>\n\
\t\t<td>a</td>\n\
\t\t<td style="color:red">styled</td>\n\
\t\t<td>cell</td>\n\
\t</tr>\n\
</table>', tx);
  t.end();
});


test('row attributes', function (t) {
  const tx = '(rowclass). |a|classy|row|';
  t.is(textile.convert(tx),
    '<table>\n\
\t<tr class="rowclass">\n\
\t\t<td>a</td>\n\
\t\t<td>classy</td>\n\
\t\t<td>row</td>\n\
\t</tr>\n\
</table>', tx);
  t.end();
});


test('table attributes', function (t) {
  const tx = 'table(tableclass).\n\
|a|classy|table|\n\
|a|classy|table|';
  t.is(textile.convert(tx),
    '<table class="tableclass">\n\
\t<tr>\n\
\t\t<td>a</td>\n\
\t\t<td>classy</td>\n\
\t\t<td>table</td>\n\
\t</tr>\n\
\t<tr>\n\
\t\t<td>a</td>\n\
\t\t<td>classy</td>\n\
\t\t<td>table</td>\n\
\t</tr>\n\
</table>', tx);
  t.end();
});


test('vertical alignment', function (t) {
  const tx = '|^. top alignment|';
  t.is(textile.convert(tx),
    '<table>\n\
\t<tr>\n\
\t\t<td style="vertical-align:top">top alignment</td>\n\
\t</tr>\n\
</table>', tx);
  t.end();
});


test('vertical alignment 2', function (t) {
  const tx = '|-. middle alignment|';
  t.is(textile.convert(tx),
    '<table>\n\
\t<tr>\n\
\t\t<td style="vertical-align:middle">middle alignment</td>\n\
\t</tr>\n\
</table>', tx);
  t.end();
});


test('vertical alignment 3', function (t) {
  const tx = '|~. bottom alignment|';
  t.is(textile.convert(tx),
    '<table>\n\
\t<tr>\n\
\t\t<td style="vertical-align:bottom">bottom alignment</td>\n\
\t</tr>\n\
</table>', tx);
  t.end();
});


test('column span', function (t) {
  const tx = '|\\2. spans two cols |\n\
| col 1 | col 2 |';
  t.is(textile.convert(tx),
    '<table>\n\
\t<tr>\n\
\t\t<td colspan="2">spans two cols </td>\n\
\t</tr>\n\
\t<tr>\n\
\t\t<td> col 1 </td>\n\
\t\t<td> col 2 </td>\n\
\t</tr>\n\
</table>', tx);
  t.end();
});


test('row span', function (t) {
  const tx = '|/3. spans 3 rows | row a |\n\
| row b |\n\
| row c |';
  t.is(textile.convert(tx),
    '<table>\n\
\t<tr>\n\
\t\t<td rowspan="3">spans 3 rows </td>\n\
\t\t<td> row a </td>\n\
\t</tr>\n\
\t<tr>\n\
\t\t<td> row b </td>\n\
\t</tr>\n\
\t<tr>\n\
\t\t<td> row c </td>\n\
\t</tr>\n\
</table>', tx);
  t.end();
});


test('whitespace required', function (t) {
  const tx = "this*won't*work";
  t.is(textile.convert(tx),
    '<p>this*won&#8217;t*work</p>', tx);
  t.end();
});


test('modifier without whitespace', function (t) {
  const tx = 'this[*will*]work';
  t.is(textile.convert(tx),
    '<p>this<strong>will</strong>work</p>', tx);
  t.end();
});


test('modifier without whitespace 2', function (t) {
  const tx = '1[^st^], 2[^nd^], 3[^rd^].';
  t.is(textile.convert(tx),
    '<p>1<sup>st</sup>, 2<sup>nd</sup>, 3<sup>rd</sup>.</p>', tx);
  t.end();
});


test('modifier without whitespace 3', function (t) {
  const tx = '2 log[~n~]';
  t.is(textile.convert(tx),
    '<p>2 log<sub>n</sub></p>', tx);
  t.end();
});


test('modifier without whitespace 4', function (t) {
  const tx = 'A close[!/img.gif!]image.\n\
A tight["text":http://thresholdstate.com/]link.\n\
A ["footnoted link":http://thresholdstate.com/][1].';
  t.is(textile.convert(tx),
    '<p>A close<img src="/img.gif" alt="" />image.<br />\n\
A tight<a href="http://thresholdstate.com/">text</a>link.<br />\n\
A <a href="http://thresholdstate.com/">footnoted link</a><sup class="footnote" id="fnr1"><a href="#fn1">1</a></sup>.</p>', tx);
  t.end();
});

