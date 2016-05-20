// threshold.yml
import test from 'ava';
import textile from '../src';

test( 'paragraph', function ( t ) {
  let tx = "A paragraph.\n\n\
Another paragraph.";
  t.is( textile.convert( tx ),
    "<p>A paragraph.</p>\n\
<p>Another paragraph.</p>", tx );
});


test( 'line breaks', function ( t ) {
  let tx = "A paragraph with\n\
a line break.";
  t.is( textile.convert( tx ),
    "<p>A paragraph with<br />\n\
a line break.</p>", tx );
});


test( 'xhtml tags', function ( t ) {
  let tx = "Here's some <b>bold</b> text.";
  t.is( textile.convert( tx ),
    "<p>Here&#8217;s some <b>bold</b> text.</p>", tx );
});


test( 'no paragraph tags', function ( t ) {
  let tx = " No paragraph tags here.";
  t.is( textile.convert( tx ),
    "No paragraph tags here.", tx );
});


test( 'smart quotes', function ( t ) {
  let tx = "\"Proceed!\" said he to the host.";
  t.is( textile.convert( tx ),
    "<p>&#8220;Proceed!&#8221; said he to the host.</p>", tx );
});


test( 'smart quotes 2', function ( t ) {
  let tx = "'Proceed!' said he to the host.";
  t.is( textile.convert( tx ),
    "<p>&#8216;Proceed!&#8217; said he to the host.</p>", tx );
});


test( 'nested quotation marks', function ( t ) {
  let tx = "\"'I swear, captain,' replied I.\"";
  t.is( textile.convert( tx ),
    "<p>&#8220;&#8216;I swear, captain,&#8217; replied I.&#8221;</p>", tx );
});


test( 'nested quotation marks 2', function ( t ) {
  let tx = "'\"I swear, captain,\" replied I.'";
  t.is( textile.convert( tx ),
    "<p>&#8216;&#8220;I swear, captain,&#8221; replied I.&#8217;</p>", tx );
});


test( 'apostrophe glyphs', function ( t ) {
  let tx = "Greengrocers' apostrophe's.";
  t.is( textile.convert( tx ),
    "<p>Greengrocers&#8217; apostrophe&#8217;s.</p>", tx );
});


test( 'em-dash glyphs', function ( t ) {
  let tx = "You know the Italian proverb -- Chi ha compagno ha padrone.";
  t.is( textile.convert( tx ),
    "<p>You know the Italian proverb &#8212; Chi ha compagno ha padrone.</p>", tx );
});


test( 'em-dash glyphs 2', function ( t ) {
  let tx = "You know the Italian proverb--Chi ha compagno ha padrone.";
  t.is( textile.convert( tx ),
    "<p>You know the Italian proverb&#8212;Chi ha compagno ha padrone.</p>", tx );
});


test( 'en-dash glyphs', function ( t ) {
  let tx = "You know the Italian proverb - Chi ha compagno ha padrone.";
  t.is( textile.convert( tx ),
    "<p>You know the Italian proverb &#8211; Chi ha compagno ha padrone.</p>", tx );
});


test( 'ellipsis character', function ( t ) {
  let tx = "Meanwhile...";
  t.is( textile.convert( tx ),
    "<p>Meanwhile&#8230;</p>", tx );
});


test( 'dimension character', function ( t ) {
  let tx = "1 x 2 x 3 = 6";
  t.is( textile.convert( tx ),
    "<p>1 &#215; 2 &#215; 3 = 6</p>", tx );
});


test( 'dimension character 2', function ( t ) {
  let tx = "1x2x3 = 6";
  t.is( textile.convert( tx ),
    "<p>1&#215;2&#215;3 = 6</p>", tx );
});


test( 'trademark register copyright', function ( t ) {
  let tx = "Registered(r) Trademark(tm) Copyright (c).";
  t.is( textile.convert( tx ),
    "<p>Registered&#174; Trademark&#8482; Copyright &#169;.</p>", tx );
});


test( 'acronyms', function ( t ) {
  let tx = "ABC(Always Be Closing)";
  t.is( textile.convert( tx ),
    "<p><acronym title=\"Always Be Closing\"><span class=\"caps\">ABC</span></acronym></p>", tx );
});


test( 'uppercase', function ( t ) {
  let tx = "IBM or HAL";
  t.is( textile.convert( tx ),
    "<p><span class=\"caps\">IBM</span> or <span class=\"caps\">HAL</span></p>", tx );
});


test( 'emphasis', function ( t ) {
  let tx = "The _underlying_ cause.";
  t.is( textile.convert( tx ),
    "<p>The <em>underlying</em> cause.</p>", tx );
});


test( 'strong text', function ( t ) {
  let tx = "The *underlying* cause.";
  t.is( textile.convert( tx ),
    "<p>The <strong>underlying</strong> cause.</p>", tx );
});


test( 'italic text', function ( t ) {
  let tx = "The __underlying__ cause.";
  t.is( textile.convert( tx ),
    "<p>The <i>underlying</i> cause.</p>", tx );
});


test( 'bold text', function ( t ) {
  let tx = "The **underlying** cause.";
  t.is( textile.convert( tx ),
    "<p>The <b>underlying</b> cause.</p>", tx );
});


test( 'citation', function ( t ) {
  let tx = "??The Count of Monte Cristo??, by Dumas.";
  t.is( textile.convert( tx ),
    "<p><cite>The Count of Monte Cristo</cite>, by Dumas.</p>", tx );
});


test( 'inserted and deleted text', function ( t ) {
  let tx = "Scratch -that-, replace with +this+.";
  t.is( textile.convert( tx ),
    "<p>Scratch <del>that</del>, replace with <ins>this</ins>.</p>", tx );
});


test( 'subscript', function ( t ) {
  let tx = "log ~2~ n";
  t.is( textile.convert( tx ),
    "<p>log <sub>2</sub> n</p>", tx );
});


test( 'superscript', function ( t ) {
  let tx = "2 ^x^";
  t.is( textile.convert( tx ),
    "<p>2 <sup>x</sup></p>", tx );
});


test( 'span tag', function ( t ) {
  let tx = "The %underlying% cause.";
  t.is( textile.convert( tx ),
    "<p>The <span>underlying</span> cause.</p>", tx );
});


test( 'code', function ( t ) {
  let tx = "About the @<hr />@ tag.";
  t.is( textile.convert( tx ),
    "<p>About the <code>&lt;hr /&gt;</code> tag.</p>", tx );
});


test( 'links', function ( t ) {
  let tx = "\"link text\":http://example.com/";
  t.is( textile.convert( tx ),
    "<p><a href=\"http://example.com/\">link text</a></p>", tx );
});


test( 'local links', function ( t ) {
  let tx = "\"link text\":/example";
  t.is( textile.convert( tx ),
    "<p><a href=\"/example\">link text</a></p>", tx );
});


test( 'link title', function ( t ) {
  let tx = "\"link text(with title)\":http://example.com/";
  t.is( textile.convert( tx ),
    "<p><a href=\"http://example.com/\" title=\"with title\">link text</a></p>", tx );
});


test( 'link alias', function ( t ) {
  let tx = "Here's \"a link\":tstate, and\n\
\"another link\":tstate to the same site.\n\n\
[tstate]http://thresholdstate.com/";
  t.is( textile.convert( tx ),
    "<p>Here&#8217;s <a href=\"http://thresholdstate.com/\">a link</a>, and<br />\n\
<a href=\"http://thresholdstate.com/\">another link</a> to the same site.</p>", tx );
});


test( 'image', function ( t ) {
  let tx = "!/img.gif!";
  t.is( textile.convert( tx ),
    "<p><img src=\"/img.gif\" alt=\"\" /></p>", tx );
});


test( 'image 2', function ( t ) {
  let tx = "!http://thresholdstate.com/img.gif!";
  t.is( textile.convert( tx ),
    "<p><img src=\"http://thresholdstate.com/img.gif\" alt=\"\" /></p>", tx );
});


test( 'image alt', function ( t ) {
  let tx = "!/img.gif(alt text)!";
  t.is( textile.convert( tx ),
    "<p><img src=\"/img.gif\" title=\"alt text\" alt=\"alt text\" /></p>", tx );
});


test( 'image links', function ( t ) {
  let tx = "!/img.gif!:http://textpattern.com/";
  t.is( textile.convert( tx ),
    "<p><a href=\"http://textpattern.com/\"><img src=\"/img.gif\" alt=\"\" /></a></p>", tx );
});


test( 'headers', function ( t ) {
  let tx = "h1. Heading 1";
  t.is( textile.convert( tx ),
    "<h1>Heading 1</h1>", tx );
});


test( 'headers 2', function ( t ) {
  let tx = "h2. Heading 2";
  t.is( textile.convert( tx ),
    "<h2>Heading 2</h2>", tx );
});


test( 'headers 3', function ( t ) {
  let tx = "h6. Heading 6";
  t.is( textile.convert( tx ),
    "<h6>Heading 6</h6>", tx );
});


test( 'paragraph text', function ( t ) {
  let tx = "p. A paragraph.\n\
Continued.\n\n\
Also a paragraph.";
  t.is( textile.convert( tx ),
    "<p>A paragraph.<br />\n\
Continued.</p>\n\
<p>Also a paragraph.</p>", tx );
});


test( 'block quote', function ( t ) {
  let tx = "bq. A quotation.\n\
Continued.\n\n\
Regular paragraph.";
  t.is( textile.convert( tx ),
    "<blockquote>\n\
<p>A quotation.<br />\n\
Continued.</p>\n\
</blockquote>\n\
<p>Regular paragraph.</p>", tx );
});


test( 'block quote citation', function ( t ) {
  let tx = "bq.:http://thresholdstate.com/ A cited quotation.";
  t.is( textile.convert( tx ),
    "<blockquote cite=\"http://thresholdstate.com/\">\n\
<p>A cited quotation.</p>\n\
</blockquote>", tx );
});


test( 'footnotes', function ( t ) {
  let tx = "A footnote reference[1].\n\n\
fn1. The footnote.";
  t.is( textile.convert( tx ),
    "<p>A footnote reference<sup class=\"footnote\" id=\"fnr1\"><a href=\"#fn1\">1</a></sup>.</p>\n\
<p class=\"footnote\" id=\"fn1\"><a href=\"#fnr1\"><sup>1</sup></a> The footnote.</p>", tx );
});


test( 'block code', function ( t ) {
  let tx = "bc. <script>\n\
// a Javascript example\n\
alert(\"Hello World\");\n\
</script>";
  t.is( textile.convert( tx ),
    "<pre><code>&lt;script&gt;\n\
// a Javascript example\n\
alert(\"Hello World\");\n\
&lt;/script&gt;</code></pre>", tx );
});


test( 'preformatted text', function ( t ) {
  let tx = "pre. Pre-formatted\n\
text";
  t.is( textile.convert( tx ),
    "<pre>Pre-formatted\n\
text</pre>", tx );
});


test( 'notextile', function ( t ) {
  let tx = "notextile. <script type=\"text/javascript\">\n\
document.write(\"Hello World!\");\n\
</script>\n\
<noscript>Your browser doesn't support Javascript</noscript>";
  t.is( textile.convert( tx ),
    "<script type=\"text/javascript\">\n\
document.write(\"Hello World!\");\n\
</script>\n\
<noscript>Your browser doesn't support Javascript</noscript>", tx );
});


test( 'class attribute', function ( t ) {
  let tx = "p(myclass). My classy paragraph.";
  t.is( textile.convert( tx ),
    "<p class=\"myclass\">My classy paragraph.</p>", tx );
});


test( 'id attribute', function ( t ) {
  let tx = "p(#myid). My ID paragraph.";
  t.is( textile.convert( tx ),
    "<p id=\"myid\">My ID paragraph.</p>", tx );
});


test( 'style attribute', function ( t ) {
  let tx = "p{color:red}. Red rum.";
  t.is( textile.convert( tx ),
    "<p style=\"color:red\">Red rum.</p>", tx );
});


test( 'lang attribute', function ( t ) {
  let tx = "p[fr-fr]. En français.";
  t.is( textile.convert( tx ),
    "<p lang=\"fr-fr\">En français.</p>", tx );
});


test( 'phrase modifiers', function ( t ) {
  let tx = "A *(myclass)classy* phrase.";
  t.is( textile.convert( tx ),
    "<p>A <strong class=\"myclass\">classy</strong> phrase.</p>", tx );
});


test( 'phrase modifiers 2', function ( t ) {
  let tx = "An _(#myid2)ID_ phrase.";
  t.is( textile.convert( tx ),
    "<p>An <em id=\"myid2\">ID</em> phrase.</p>", tx );
});


test( 'phrase modifiers 3', function ( t ) {
  let tx = "The %{color:blue}blue% room.";
  t.is( textile.convert( tx ),
    "<p>The <span style=\"color:blue\">blue</span> room.</p>", tx );
});


test( 'block and phrase attributes combined', function ( t ) {
  let tx = "p(myclass#myid3){color:green}[de-de]. A complex paragraph.";
  t.is( textile.convert( tx ),
    "<p style=\"color:green\" class=\"myclass\" id=\"myid3\" lang=\"de-de\">A complex paragraph.</p>", tx );
});


test( 'block and phrase attributes combined 2', function ( t ) {
  let tx = "A ??(myclass#myid4){color:green}[de-de]complex?? phrase.";
  t.is( textile.convert( tx ),
    "<p>A <cite style=\"color:green\" class=\"myclass\" id=\"myid4\" lang=\"de-de\">complex</cite> phrase.</p>", tx );
});


test( 'extended blocks', function ( t ) {
  let tx = "bq.. A quote.\n\n\
The quote continued.\n\n\
p. Back to paragraph text.";
  t.is( textile.convert( tx ),
    "<blockquote>\n\
<p>A quote.</p>\n\
<p>The quote continued.</p>\n\
</blockquote>\n\
<p>Back to paragraph text.</p>", tx );
});


test( 'extended block code', function ( t ) {
  let tx = "A PHP code example.\n\n\
bc.. <?php\n\
function hello() {\n\
// display a hello message\n\n\
print \"Hello, World\";\n\
}\n\
?>\n\n\
p. Following paragraph.";
  t.is( textile.convert( tx ),
    "<p>A <span class=\"caps\">PHP</span> code example.</p>\n\
<pre><code>&lt;?php\n\
function hello() {\n\
// display a hello message\n\n\
print \"Hello, World\";\n\
}\n\
?&gt;</code></pre>\n\
<p>Following paragraph.</p>", tx );
});


test( 'extended block attributes', function ( t ) {
  let tx = "p(myclass).. A classy paragraph.\n\n\
Another classy paragraph.\n\n\
p. Not so classy.";
  t.is( textile.convert( tx ),
    "<p class=\"myclass\">A classy paragraph.</p>\n\
<p class=\"myclass\">Another classy paragraph.</p>\n\
<p>Not so classy.</p>", tx );
});


test( 'extended block quote attributes', function ( t ) {
  let tx = "bq(myclass).. Quote paragraph 1.\n\n\
Paragraph 2.";
  t.is( textile.convert( tx ),
    "<blockquote class=\"myclass\">\n\
<p class=\"myclass\">Quote paragraph 1.</p>\n\
<p class=\"myclass\">Paragraph 2.</p>\n\
</blockquote>", tx );
});


test( 'extended block code attributes', function ( t ) {
  let tx = "bc(myclass).. Code block 1.\n\n\
Code block 2.";
  t.is( textile.convert( tx ),
    "<pre class=\"myclass\"><code class=\"myclass\">Code block 1.\n\n\
Code block 2.</code></pre>", tx );
});


test( 'raw xhtml left in tact', function ( t ) {
  let tx = "<b>bold</b> and <i>italic</i>, the hard way.";
  t.is( textile.convert( tx ),
    "<p><b>bold</b> and <i>italic</i>, the hard way.</p>", tx );
});


test( 'paragraphs entirely raw xhtml', function ( t ) {
  let tx = "<div class=\"mydiv\">My div</div>";
  t.is( textile.convert( tx ),
    "<div class=\"mydiv\">My div</div>", tx );
});


test( 'paragraphs with inline xhtml', function ( t ) {
  let tx = "<img src=\"/img.gif\" alt=\"image\" />";
  t.is( textile.convert( tx ),
    "<p><img src=\"/img.gif\" alt=\"image\" /></p>", tx );
});


test( 'paragraphs with inline xhtml 2', function ( t ) {
  let tx = "<span class=\"myspan\">I'll make my own way.</span>";
  t.is( textile.convert( tx ),
    "<p><span class=\"myspan\">I&#8217;ll make my own way.</span></p>", tx );
});


test( 'paragraphs partly enclosed in xhtml block tags', function ( t ) {
  let tx = "<div>inside</div> and outside.";
  t.is( textile.convert( tx ),
    "<div>inside</div>\n\
<p>and outside.</p>", tx );
});


test( 'complex xhtml blocks', function ( t ) {
  let tx = " <div>\n\
 <span>My div</span>\n\
 </div>";
  t.is( textile.convert( tx ),
    "<div>\n\
<span>My div</span>\n\
</div>", tx );
});


test( 'complex xhtml blocks 2', function ( t ) {
  let tx = "notextile.. <div>\n\n\
<span>My div</span>\n\n\
</div>";
  t.is( textile.convert( tx ),
    "<div>\n\n\
<span>My div</span>\n\n\
</div>", tx );
});


test( 'complex xhtml blocks with inline formatting', function ( t ) {
  let tx = " <div>\n\
 <span>My *div*</span>\n\
 </div>";
  t.is( textile.convert( tx ),
    "<div>\n\
<span>My <strong>div</strong></span>\n\
</div>", tx );
});


test( 'explicit pre escapement', function ( t ) {
  let tx = "<pre>\n\
A HTML <b>example</b>\n\
</pre>";
  t.is( textile.convert( tx ),
    "<pre>\n\
A HTML &lt;b&gt;example&lt;/b&gt;\n\
</pre>", tx );
});


test( 'explicit code escapement', function ( t ) {
  let tx = "<code>\n\
Another HTML <b>example</b>\n\
</code>";
  t.is( textile.convert( tx ),
    "<p><code>\n\
Another HTML &lt;b&gt;example&lt;/b&gt;\n\
</code></p>", tx );
});


test( 'notextile tags', function ( t ) {
  let tx = "<notextile>\n\
p. Leave me alone\n\
</notextile>";
  t.is( textile.convert( tx ),
    "p. Leave me alone", tx );
});


test( 'left aligned text', function ( t ) {
  let tx = "p<. Left-aligned paragraph.";
  t.is( textile.convert( tx ),
    "<p style=\"text-align:left\">Left-aligned paragraph.</p>", tx );
});


test( 'right aligned text', function ( t ) {
  let tx = "h3>. Right-aligned heading.";
  t.is( textile.convert( tx ),
    "<h3 style=\"text-align:right\">Right-aligned heading.</h3>", tx );
});


test( 'justified text', function ( t ) {
  let tx = "p<>. Justified paragraph.";
  t.is( textile.convert( tx ),
    "<p style=\"text-align:justify\">Justified paragraph.</p>", tx );
});


test( 'centered text', function ( t ) {
  let tx = "h3=. Centered heading.";
  t.is( textile.convert( tx ),
    "<h3 style=\"text-align:center\">Centered heading.</h3>", tx );
});


test( 'padding', function ( t ) {
  let tx = "p(. Left pad 1em.";
  t.is( textile.convert( tx ),
    "<p style=\"padding-left:1em\">Left pad 1em.</p>", tx );
});


test( 'padding 2', function ( t ) {
  let tx = "p)). Right pad 2em.";
  t.is( textile.convert( tx ),
    "<p style=\"padding-right:2em\">Right pad 2em.</p>", tx );
});


test( 'padding 3', function ( t ) {
  let tx = "p(). Left and right pad 1em.";
  t.is( textile.convert( tx ),
    "<p style=\"padding-left:1em;padding-right:1em\">Left and right pad 1em.</p>", tx );
});


test( 'numeric lists', function ( t ) {
  let tx = "# Item one\n\
# Item two\n\
# Item three";
  t.is( textile.convert( tx ),
    "<ol>\n\
\t<li>Item one</li>\n\
\t<li>Item two</li>\n\
\t<li>Item three</li>\n\
</ol>", tx );
});


test( 'bulleted lists', function ( t ) {
  let tx = "* Item A\n\
* Item B\n\
* Item C";
  t.is( textile.convert( tx ),
    "<ul>\n\
\t<li>Item A</li>\n\
\t<li>Item B</li>\n\
\t<li>Item C</li>\n\
</ul>", tx );
});


test( 'nested lists', function ( t ) {
  let tx = "# Item one\n\
## Item one-A\n\
## Item one-B\n\
### Item one-B-a\n\
# Item two";
  t.is( textile.convert( tx ),
    "<ol>\n\
\t<li>Item one\n\
\t<ol>\n\
\t\t<li>Item one-A</li>\n\
\t\t<li>Item one-B\n\
\t\t<ol>\n\
\t\t\t<li>Item one-B-a</li>\n\
\t\t</ol></li>\n\
\t</ol></li>\n\
\t<li>Item two</li>\n\
</ol>", tx );
});


test( 'tables', function ( t ) {
  let tx = "|a|simple|table|";
  t.is( textile.convert( tx ),
    "<table>\n\
\t<tr>\n\
\t\t<td>a</td>\n\
\t\t<td>simple</td>\n\
\t\t<td>table</td>\n\
\t</tr>\n\
</table>", tx );
});


test( 'table heading cells', function ( t ) {
  let tx = "|_. a|_. table|_. heading|\n\
|a|table|row|";
  t.is( textile.convert( tx ),
    "<table>\n\
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
</table>", tx );
});


test( 'cell attributes', function ( t ) {
  let tx = "|a|{color:red}. styled|cell|";
  t.is( textile.convert( tx ),
    "<table>\n\
\t<tr>\n\
\t\t<td>a</td>\n\
\t\t<td style=\"color:red\">styled</td>\n\
\t\t<td>cell</td>\n\
\t</tr>\n\
</table>", tx );
});


test( 'row attributes', function ( t ) {
  let tx = "(rowclass). |a|classy|row|";
  t.is( textile.convert( tx ),
    "<table>\n\
\t<tr class=\"rowclass\">\n\
\t\t<td>a</td>\n\
\t\t<td>classy</td>\n\
\t\t<td>row</td>\n\
\t</tr>\n\
</table>", tx );
});


test( 'table attributes', function ( t ) {
  let tx = "table(tableclass).\n\
|a|classy|table|\n\
|a|classy|table|";
  t.is( textile.convert( tx ),
    "<table class=\"tableclass\">\n\
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
</table>", tx );
});


test( 'vertical alignment', function ( t ) {
  let tx = "|^. top alignment|";
  t.is( textile.convert( tx ),
    "<table>\n\
\t<tr>\n\
\t\t<td style=\"vertical-align:top\">top alignment</td>\n\
\t</tr>\n\
</table>", tx );
});


test( 'vertical alignment 2', function ( t ) {
  let tx = "|-. middle alignment|";
  t.is( textile.convert( tx ),
    "<table>\n\
\t<tr>\n\
\t\t<td style=\"vertical-align:middle\">middle alignment</td>\n\
\t</tr>\n\
</table>", tx );
});


test( 'vertical alignment 3', function ( t ) {
  let tx = "|~. bottom alignment|";
  t.is( textile.convert( tx ),
    "<table>\n\
\t<tr>\n\
\t\t<td style=\"vertical-align:bottom\">bottom alignment</td>\n\
\t</tr>\n\
</table>", tx );
});


test( 'column span', function ( t ) {
  let tx = "|\\2. spans two cols |\n\
| col 1 | col 2 |";
  t.is( textile.convert( tx ),
    "<table>\n\
\t<tr>\n\
\t\t<td colspan=\"2\">spans two cols </td>\n\
\t</tr>\n\
\t<tr>\n\
\t\t<td> col 1 </td>\n\
\t\t<td> col 2 </td>\n\
\t</tr>\n\
</table>", tx );
});


test( 'row span', function ( t ) {
  let tx = "|/3. spans 3 rows | row a |\n\
| row b |\n\
| row c |";
  t.is( textile.convert( tx ),
    "<table>\n\
\t<tr>\n\
\t\t<td rowspan=\"3\">spans 3 rows </td>\n\
\t\t<td> row a </td>\n\
\t</tr>\n\
\t<tr>\n\
\t\t<td> row b </td>\n\
\t</tr>\n\
\t<tr>\n\
\t\t<td> row c </td>\n\
\t</tr>\n\
</table>", tx );
});


test( 'whitespace required', function ( t ) {
  let tx = "this*won't*work";
  t.is( textile.convert( tx ),
    "<p>this*won&#8217;t*work</p>", tx );
});


test( 'modifier without whitespace', function ( t ) {
  let tx = "this[*will*]work";
  t.is( textile.convert( tx ),
    "<p>this<strong>will</strong>work</p>", tx );
});


test( 'modifier without whitespace 2', function ( t ) {
  let tx = "1[^st^], 2[^nd^], 3[^rd^].";
  t.is( textile.convert( tx ),
    "<p>1<sup>st</sup>, 2<sup>nd</sup>, 3<sup>rd</sup>.</p>", tx );
});


test( 'modifier without whitespace 3', function ( t ) {
  let tx = "2 log[~n~]";
  t.is( textile.convert( tx ),
    "<p>2 log<sub>n</sub></p>", tx );
});


test( 'modifier without whitespace 4', function ( t ) {
  let tx = "A close[!/img.gif!]image.\n\
A tight[\"text\":http://thresholdstate.com/]link.\n\
A [\"footnoted link\":http://thresholdstate.com/][1].";
  t.is( textile.convert( tx ),
    "<p>A close<img src=\"/img.gif\" alt=\"\" />image.<br />\n\
A tight<a href=\"http://thresholdstate.com/\">text</a>link.<br />\n\
A <a href=\"http://thresholdstate.com/\">footnoted link</a><sup class=\"footnote\" id=\"fnr1\"><a href=\"#fn1\">1</a></sup>.</p>", tx );
});

