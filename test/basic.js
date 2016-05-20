// basic.yml
import test from 'ava';
import textile from '../src';

test( 'paragraphs', function ( t ) {
  let tx = "A single paragraph.\n\n\
Followed by another.";
  t.is( textile.convert( tx ),
    "<p>A single paragraph.</p>\n\
<p>Followed by another.</p>", tx );
});


test( 'blocks with spaces on the blank line in between', function ( t ) {
  let tx = "This is line one\n\
 \n\
This is line two";
  t.is( textile.convert( tx ),
    "<p>This is line one</p>\n\
<p>This is line two</p>", tx );
});


test( 'blocks with tabl on the blank line in between', function ( t ) {
  let tx = "This is line one\n\
\t\n\
This is line two";
  t.is( textile.convert( tx ),
    "<p>This is line one</p>\n\
<p>This is line two</p>", tx );
});


test( 'block containing block start', function ( t ) {
  let tx = "I saw a ship. It ate my elephant.";
  t.is( textile.convert( tx ),
    "<p>I saw a ship. It ate my elephant.</p>", tx );
});


test( 'extended block containing block start', function ( t ) {
  let tx = "p.. I saw a ship. It ate my elephant.\n\n\
When the elephant comes to take a p. you...";
  t.is( textile.convert( tx ),
    "<p>I saw a ship. It ate my elephant.</p>\n\
<p>When the elephant comes to take a p. you&#8230;</p>", tx );
});


test( 'blockquote containing block start', function ( t ) {
  let tx = "bq. I saw a ship. It ate my elephant.";
  t.is( textile.convert( tx ),
    "<blockquote>\n\
<p>I saw a ship. It ate my elephant.</p>\n\
</blockquote>", tx );
});


test( 'extended blockquote containing block start', function ( t ) {
  let tx = "bq.. I saw a ship. It ate my elephant.\n\n\
When the elephant comes to take a p. you...";
  t.is( textile.convert( tx ),
    "<blockquote>\n\
<p>I saw a ship. It ate my elephant.</p>\n\
<p>When the elephant comes to take a p. you&#8230;</p>\n\
</blockquote>", tx );
});


test( 'notextile block', function ( t ) {
  let tx = "Some text:\n\n\
<notextile>\n\
<div class=\"example\"><pre>\n\
Some code\n\
</pre></div>\n\
</notextile>\n\n\
Some more text.";
  t.is( textile.convert( tx ),
    "<p>Some text:</p>\n\
<div class=\"example\"><pre>\n\
Some code\n\
</pre></div>\n\
<p>Some more text.</p>", tx );
});


test( 'notextile block containing block start', function ( t ) {
  let tx = "notextile. I saw a ship. It ate my elephant.";
  t.is( textile.convert( tx ),
    "I saw a ship. It ate my elephant.", tx );
});


test( 'extended notextile block containing block start', function ( t ) {
  let tx = "notextile.. I saw a ship. It ate my elephant.\n\n\
When the elephant comes to take a p. you...";
  t.is( textile.convert( tx ),
    "I saw a ship. It ate my elephant.\n\n\
When the elephant comes to take a p. you...", tx );
});


test( 'pre block containing block start', function ( t ) {
  let tx = "pre. I saw a ship. It ate my elephant.";
  t.is( textile.convert( tx ),
    "<pre>I saw a ship. It ate my elephant.</pre>", tx );
});


test( 'extended pre block containing block start', function ( t ) {
  let tx = "pre.. I saw a ship. It ate my elephant.\n\n\
When the elephant comes to take a p. you...";
  t.is( textile.convert( tx ),
    "<pre>I saw a ship. It ate my elephant.\n\n\
When the elephant comes to take a p. you...</pre>", tx );
});


test( 'html tags', function ( t ) {
  let tx = "I am <b>very</b> serious.\n\n\
<pre>\n\
  I am <b>very</b> serious.\n\
</pre>";
  t.is( textile.convert( tx ),
    "<p>I am <b>very</b> serious.</p>\n\
<pre>\n\
  I am &lt;b&gt;very&lt;/b&gt; serious.\n\
</pre>", tx );
});


test( 'line breaks', function ( t ) {
  let tx = "I spoke.\n\
And none replied.";
  t.is( textile.convert( tx ),
    "<p>I spoke.<br />\n\
And none replied.</p>", tx );
});


test( 'curly quotes', function ( t ) {
  let tx = "\"Observe!\"";
  t.is( textile.convert( tx ),
    "<p>&#8220;Observe!&#8221;</p>", tx );
});


test( 'quotes contained in multi-paragraph quotes', function ( t ) {
  let tx = "\"I first learned about this thing called \"Redcloth\" several years ago.\n\n\
\"It's wonderful.\"";
  t.is( textile.convert( tx ),
    "<p>&#8220;I first learned about this thing called &#8220;Redcloth&#8221; several years ago.</p>\n\
<p>&#8220;It&#8217;s wonderful.&#8221;</p>", tx );
});


test( 'double hyphens', function ( t ) {
  let tx = "Observe--very nice!";
  t.is( textile.convert( tx ),
    "<p>Observe&#8212;very nice!</p>", tx );
});


test( 'double hyphens with spaces', function ( t ) {
  let tx = "Observe -- very nice!";
  t.is( textile.convert( tx ),
    "<p>Observe &#8212; very nice!</p>", tx );
});


test( 'parenthetical phrase set off with em dashes', function ( t ) {
  let tx = "An emdash indicates a parenthetical thought--like this one--which is set apart from the rest of a sentence.";
  t.is( textile.convert( tx ),
    "<p>An emdash indicates a parenthetical thought&#8212;like this one&#8212;which is set apart from the rest of a sentence.</p>", tx );
});


test( 'parenthetical phrase set off with em dashes surrounded by spaces', function ( t ) {
  let tx = "An emdash indicates a parenthetical thought -- like this one -- which is set apart from the rest of a sentence.";
  t.is( textile.convert( tx ),
    "<p>An emdash indicates a parenthetical thought &#8212; like this one &#8212; which is set apart from the rest of a sentence.</p>", tx );
});


test( 'single hyphens with spaces', function ( t ) {
  let tx = "Observe - tiny and brief.";
  t.is( textile.convert( tx ),
    "<p>Observe &#8211; tiny and brief.</p>", tx );
});


test( 'midword hyphens ', function ( t ) {
  let tx = "Observe the nicely-done hyphen.";
  t.is( textile.convert( tx ),
    "<p>Observe the nicely-done hyphen.</p>", tx );
});


test( 'ellipses', function ( t ) {
  let tx = "Observe...";
  t.is( textile.convert( tx ),
    "<p>Observe&#8230;</p>", tx );
});


test( 'dimension sign', function ( t ) {
  let tx = "Observe: 2x3.";
  t.is( textile.convert( tx ),
    "<p>Observe: 2&#215;3.</p>", tx );
});


test( 'dimension sign with space after', function ( t ) {
  let tx = "The room is 2x3 inches big.";
  t.is( textile.convert( tx ),
    "<p>The room is 2&#215;3 inches big.</p>", tx );
});


test( 'dimension sign with spaces', function ( t ) {
  let tx = "Observe: 2 x 4.";
  t.is( textile.convert( tx ),
    "<p>Observe: 2 &#215; 4.</p>", tx );
});


test( 'dimension signs chained', function ( t ) {
  let tx = "Observe: 2x3x4.";
  t.is( textile.convert( tx ),
    "<p>Observe: 2&#215;3&#215;4.</p>", tx );
});


test( 'dimension signs with double primes', function ( t ) {
  let tx = "My mouse: 2.5\" x 4\".";
  t.is( textile.convert( tx ),
    "<p>My mouse: 2.5&#8243; &#215; 4&#8243;.</p>", tx );
});


test( 'dimension signs with single primes', function ( t ) {
  let tx = "My office: 5' x 4.5'.";
  t.is( textile.convert( tx ),
    "<p>My office: 5&#8242; &#215; 4.5&#8242;.</p>", tx );
});


test( 'trademark and copyright', function ( t ) {
  let tx = "one(TM), two(R), three(C).";
  t.is( textile.convert( tx ),
    "<p>one&#8482;, two&#174;, three&#169;.</p>", tx );
});


test( 'headers', function ( t ) {
  let tx = "h3. Header 3";
  t.is( textile.convert( tx ),
    "<h3>Header 3</h3>", tx );
});


test( 'blockquote', function ( t ) {
  let tx = "Any old text\n\n\
bq. A block quotation.\n\n\
Any old text";
  t.is( textile.convert( tx ),
    "<p>Any old text</p>\n\
<blockquote>\n\
<p>A block quotation.</p>\n\
</blockquote>\n\
<p>Any old text</p>", tx );
});


test( 'footnote reference', function ( t ) {
  let tx = "This is covered elsewhere[1].";
  t.is( textile.convert( tx ),
    "<p>This is covered elsewhere<sup class=\"footnote\" id=\"fnr1\"><a href=\"#fn1\">1</a></sup>.</p>", tx );
});


test( 'footnote', function ( t ) {
  let tx = "fn1. Down here, in fact.";
  t.is( textile.convert( tx ),
    "<p class=\"footnote\" id=\"fn1\"><a href=\"#fnr1\"><sup>1</sup></a> Down here, in fact.</p>", tx );
});


test( 'em', function ( t ) {
  let tx = "I _believe_ every word.";
  t.is( textile.convert( tx ),
    "<p>I <em>believe</em> every word.</p>", tx );
});


test( 'strong', function ( t ) {
  let tx = "And then? She *fell*!";
  t.is( textile.convert( tx ),
    "<p>And then? She <strong>fell</strong>!</p>", tx );
});


test( 'strong phrase beginning with a number', function ( t ) {
  let tx = "*10 times as many*";
  t.is( textile.convert( tx ),
    "<p><strong>10 times as many</strong></p>", tx );
});


test( 'force bold italics', function ( t ) {
  let tx = "I __know__.\n\
I **really** __know__.";
  t.is( textile.convert( tx ),
    "<p>I <i>know</i>.<br />\n\
I <b>really</b> <i>know</i>.</p>", tx );
});


test( 'citation', function ( t ) {
  let tx = "??Cat's Cradle?? by Vonnegut";
  t.is( textile.convert( tx ),
    "<p><cite>Cat&#8217;s Cradle</cite> by Vonnegut</p>", tx );
});


test( 'code phrases', function ( t ) {
  let tx = "Convert with @r.to_html@";
  t.is( textile.convert( tx ),
    "<p>Convert with <code>r.to_html</code></p>", tx );
});


test( 'code phrases not created with multiple email addresses', function ( t ) {
  let tx = "Please email why@domain.com or jason@domain.com.";
  t.is( textile.convert( tx ),
    "<p>Please email why@domain.com or jason@domain.com.</p>", tx );
});


test( 'del', function ( t ) {
  let tx = "I'm -sure- not sure.";
  t.is( textile.convert( tx ),
    "<p>I&#8217;m <del>sure</del> not sure.</p>", tx );
});


test( 'del beginning a phrase', function ( t ) {
  let tx = "-delete-";
  t.is( textile.convert( tx ),
    "<p><del>delete</del></p>", tx );
});


test( 'ins', function ( t ) {
  let tx = "You are a +pleasant+ child.";
  t.is( textile.convert( tx ),
    "<p>You are a <ins>pleasant</ins> child.</p>", tx );
});


test( 'superscript', function ( t ) {
  let tx = "a ^2^ + b ^2^ = c ^2^";
  t.is( textile.convert( tx ),
    "<p>a <sup>2</sup> + b <sup>2</sup> = c <sup>2</sup></p>", tx );
});


test( 'parenthetical superscript phrase', function ( t ) {
  let tx = "^(image courtesy NASA)^";
  t.is( textile.convert( tx ),
    "<p><sup>(image courtesy <span class=\"caps\">NASA</span>)</sup></p>", tx );
});


test( 'subscript', function ( t ) {
  let tx = "log ~2~ x";
  t.is( textile.convert( tx ),
    "<p>log <sub>2</sub> x</p>", tx );
});


test( 'parenthetical subscript phrase', function ( t ) {
  let tx = "~(image courtesy NASA)~";
  t.is( textile.convert( tx ),
    "<p><sub>(image courtesy <span class=\"caps\">NASA</span>)</sub></p>", tx );
});


test( 'tight superscript and subscript', function ( t ) {
  let tx = "f(x, n) = log[~4~]x[^n^]";
  t.is( textile.convert( tx ),
    "<p>f(x, n) = log<sub>4</sub>x<sup>n</sup></p>", tx );
});


test( 'span', function ( t ) {
  let tx = "I'm %unaware% of most soft drinks.";
  t.is( textile.convert( tx ),
    "<p>I&#8217;m <span>unaware</span> of most soft drinks.</p>", tx );
});


test( 'style span', function ( t ) {
  let tx = "I'm %{color:red}unaware%\n\
of most %{font-size:0.5em;}soft drinks%.";
  t.is( textile.convert( tx ),
    "<p>I&#8217;m <span style=\"color:red\">unaware</span><br />\n\
of most <span style=\"font-size:0.5em\">soft drinks</span>.</p>", tx );
});


test( 'percent sign', function ( t ) {
  let tx = "http://blah.com/one%20two%20three\n\
(min)5%-95%(max)";
  t.is( textile.convert( tx ),
    "<p>http://blah.com/one%20two%20three<br />\n\
(min)5%-95%(max)</p>", tx );
});


test( 'css class', function ( t ) {
  let tx = "p(example1). An example";
  t.is( textile.convert( tx ),
    "<p class=\"example1\">An example</p>", tx );
});


test( 'css id', function ( t ) {
  let tx = "p(#big-red). Red here";
  t.is( textile.convert( tx ),
    "<p id=\"big-red\">Red here</p>", tx );
});


test( 'css id with initial uppercase', function ( t ) {
  let tx = "p(#Foo). bar";
  t.is( textile.convert( tx ),
    "<p id=\"Foo\">bar</p>", tx );
});


test( 'css class uppercase', function ( t ) {
  let tx = "p(fooBar). baz";
  t.is( textile.convert( tx ),
    "<p class=\"fooBar\">baz</p>", tx );
});


test( 'class and id combined', function ( t ) {
  let tx = "p(example1#big-red2). Red here";
  t.is( textile.convert( tx ),
    "<p class=\"example1\" id=\"big-red2\">Red here</p>", tx );
});


test( 'css style', function ( t ) {
  let tx = "p{color:blue;margin:30px;font-size:120%;font-family:'Comic Sans'}. Spacey blue";
  t.is( textile.convert( tx ),
    "<p style=\"color:blue;margin:30px;font-size:120%;font-family:&#39;Comic Sans&#39;\">Spacey blue</p>", tx );
});


test( 'language designations', function ( t ) {
  let tx = "p[fr]. rouge";
  t.is( textile.convert( tx ),
    "<p lang=\"fr\">rouge</p>", tx );
});


test( 'block attributes on phrase modifiers', function ( t ) {
  let tx = "I seriously *{color:red}blushed*\n\
when I _(big)sprouted_ that\n\
corn stalk from my\n\
%[es]cabeza%.";
  t.is( textile.convert( tx ),
    "<p>I seriously <strong style=\"color:red\">blushed</strong><br />\n\
when I <em class=\"big\">sprouted</em> that<br />\n\
corn stalk from my<br />\n\
<span lang=\"es\">cabeza</span>.</p>", tx );
});


test( 'inline attributes preceded by text are treated as literal', function ( t ) {
  let tx = "I *seriously {color:red}blushed*\n\
when I _first (big)sprouted_ that\n\
corn stalk from my\n\
%grande [es]cabeza%.";
  t.is( textile.convert( tx ),
    "<p>I <strong>seriously {color:red}blushed</strong><br />\n\
when I <em>first (big)sprouted</em> that<br />\n\
corn stalk from my<br />\n\
<span>grande [es]cabeza</span>.</p>", tx );
});


test( 'align justified', function ( t ) {
  let tx = "p<>. justified";
  t.is( textile.convert( tx ),
    "<p style=\"text-align:justify\">justified</p>", tx );
});


test( 'indentation', function ( t ) {
  let tx = "p))). right ident 3em";
  t.is( textile.convert( tx ),
    "<p style=\"padding-right:3em\">right ident 3em</p>", tx );
});


test( 'indentation and alignment', function ( t ) {
  let tx = "h2()>. Bingo.";
  t.is( textile.convert( tx ),
    "<h2 style=\"padding-left:1em;padding-right:1em;text-align:right\">Bingo.</h2>", tx );
});


test( 'many modifiers combined', function ( t ) {
  let tx = "h3()>[no]{color:red}. Bingo";
  t.is( textile.convert( tx ),
    "<h3 style=\"padding-left:1em;padding-right:1em;text-align:right;color:red\" lang=\"no\">Bingo</h3>", tx );
});


test( 'code blocks', function ( t ) {
  let tx = "<pre>\n\
<code>\n\
  a.gsub!( /</, '' )\n\
</code>\n\
</pre>";
  t.is( textile.convert( tx ),
    "<pre>\n\
<code>\n\
  a.gsub!( /&lt;/, '' )\n\
</code>\n\
</pre>", tx );
});


test( 'div tags', function ( t ) {
  let tx = "<div style=\"float:right;\">\n\n\
h3. Sidebar\n\n\
\"Hobix\":http://hobix.com/\n\
\"Ruby\":http://ruby-lang.org/\n\n\
</div>\n\n\
The main text of the page goes here and will stay to the left of the sidebar.";
  t.is( textile.convert( tx ),
    "<div style=\"float:right;\">\n\
<h3>Sidebar</h3>\n\
<p><a href=\"http://hobix.com/\">Hobix</a><br />\n\
<a href=\"http://ruby-lang.org/\">Ruby</a></p>\n\
</div>\n\
<p>The main text of the page goes here and will stay to the left of the sidebar.</p>", tx );
});


test( 'numbered list', function ( t ) {
  let tx = "# A first item\n\
# A second item\n\
# A third";
  t.is( textile.convert( tx ),
    "<ol>\n\
\t<li>A first item</li>\n\
\t<li>A second item</li>\n\
\t<li>A third</li>\n\
</ol>", tx );
});


test( 'nested numbered lists', function ( t ) {
  let tx = "# Fuel could be:\n\
## Coal\n\
## Gasoline\n\
## Electricity\n\
# Humans need only:\n\
## Water\n\
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
});


test( 'bulleted list', function ( t ) {
  let tx = "* A first item\n\
* A second item\n\
* A third";
  t.is( textile.convert( tx ),
    "<ul>\n\
\t<li>A first item</li>\n\
\t<li>A second item</li>\n\
\t<li>A third</li>\n\
</ul>", tx );
});


test( 'nested bulleted lists', function ( t ) {
  let tx = "* Fuel could be:\n\
** Coal\n\
** Gasoline\n\
** Electricity\n\
* Humans need only:\n\
** Water\n\
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
});


test( 'links', function ( t ) {
  let tx = "I searched \"Google\":http://google.com.";
  t.is( textile.convert( tx ),
    "<p>I searched <a href=\"http://google.com\">Google</a>.</p>", tx );
});


test( 'link aliases', function ( t ) {
  let tx = "I am crazy about \"Hobix\":hobix\n\
and \"it's\":hobix \"all\":hobix I ever\n\
\"link to\":hobix!\n\n\
[hobix]http://hobix.com";
  t.is( textile.convert( tx ),
    "<p>I am crazy about <a href=\"http://hobix.com\">Hobix</a><br />\n\
and <a href=\"http://hobix.com\">it&#8217;s</a> <a href=\"http://hobix.com\">all</a> I ever<br />\n\
<a href=\"http://hobix.com\">link to</a>!</p>", tx );
});


test( 'image', function ( t ) {
  let tx = "!http://hobix.com/sample.jpg!";
  t.is( textile.convert( tx ),
    "<p><img src=\"http://hobix.com/sample.jpg\" alt=\"\" /></p>", tx );
});


test( 'image title', function ( t ) {
  let tx = "!openwindow1.gif(Bunny.)!";
  t.is( textile.convert( tx ),
    "<p><img src=\"openwindow1.gif\" title=\"Bunny.\" alt=\"Bunny.\" /></p>", tx );
});


test( 'image links', function ( t ) {
  let tx = "!openwindow1.gif!:http://hobix.com/";
  t.is( textile.convert( tx ),
    "<p><a href=\"http://hobix.com/\"><img src=\"openwindow1.gif\" alt=\"\" /></a></p>", tx );
});


test( 'image alignments', function ( t ) {
  let tx = "!>obake.gif!\n\n\
And others sat all round the small\n\
machine and paid it to sing to them.";
  t.is( textile.convert( tx ),
    "<p><img align=\"right\" src=\"obake.gif\" alt=\"\" /></p>\n\
<p>And others sat all round the small<br />\n\
machine and paid it to sing to them.</p>", tx );
});


test( 'acronym definitions', function ( t ) {
  let tx = "We use CSS(Cascading Style Sheets).";
  t.is( textile.convert( tx ),
    "<p>We use <acronym title=\"Cascading Style Sheets\"><span class=\"caps\">CSS</span></acronym>.</p>", tx );
});


test( 'two-letter acronyms', function ( t ) {
  let tx = "It employs AI(artificial intelligence) processing.";
  t.is( textile.convert( tx ),
    "<p>It employs <acronym title=\"artificial intelligence\"><span class=\"caps\">AI</span></acronym> processing.</p>", tx );
});


test( 'tables', function ( t ) {
  let tx = "| name | age | sex |\n\
| joan | 24 | f |\n\
| archie | 29 | m |\n\
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
});


test( 'table headers', function ( t ) {
  let tx = "|_. name |_. age |_. sex |\n\
| joan | 24 | f |\n\
| archie | 29 | m |\n\
| bella | 45 | f |";
  t.is( textile.convert( tx ),
    "<table>\n\
\t<tr>\n\
\t\t<th>name </th>\n\
\t\t<th>age </th>\n\
\t\t<th>sex </th>\n\
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
});


test( 'table cell attributes', function ( t ) {
  let tx = "|_. attribute list |\n\
|<. align left |\n\
|>. align right|\n\
|=. center |\n\
|<>. justify |\n\
|^. valign top |\n\
|~. bottom |";
  t.is( textile.convert( tx ),
    "<table>\n\
\t<tr>\n\
\t\t<th>attribute list </th>\n\
\t</tr>\n\
\t<tr>\n\
\t\t<td style=\"text-align:left\">align left </td>\n\
\t</tr>\n\
\t<tr>\n\
\t\t<td style=\"text-align:right\">align right</td>\n\
\t</tr>\n\
\t<tr>\n\
\t\t<td style=\"text-align:center\">center </td>\n\
\t</tr>\n\
\t<tr>\n\
\t\t<td style=\"text-align:justify\">justify </td>\n\
\t</tr>\n\
\t<tr>\n\
\t\t<td style=\"vertical-align:top\">valign top </td>\n\
\t</tr>\n\
\t<tr>\n\
\t\t<td style=\"vertical-align:bottom\">bottom </td>\n\
\t</tr>\n\
</table>", tx );
});


test( 'table colspan', function ( t ) {
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


test( 'table rowspan', function ( t ) {
  let tx = "|/3. spans 3 rows | a |\n\
| b |\n\
| c |";
  t.is( textile.convert( tx ),
    "<table>\n\
\t<tr>\n\
\t\t<td rowspan=\"3\">spans 3 rows </td>\n\
\t\t<td> a </td>\n\
\t</tr>\n\
\t<tr>\n\
\t\t<td> b </td>\n\
\t</tr>\n\
\t<tr>\n\
\t\t<td> c </td>\n\
\t</tr>\n\
</table>", tx );
});


test( 'block attributes applied to table cells', function ( t ) {
  let tx = "|{background:#ddd}. Grey cell|";
  t.is( textile.convert( tx ),
    "<table>\n\
\t<tr>\n\
\t\t<td style=\"background:#ddd\">Grey cell</td>\n\
\t</tr>\n\
</table>", tx );
});


test( 'block attributes applied to a table', function ( t ) {
  let tx = "table{border:1px solid black}.\n\
|This|is|a|row|\n\
|This|is|a|row|";
  t.is( textile.convert( tx ),
    "<table style=\"border:1px solid black\">\n\
\t<tr>\n\
\t\t<td>This</td>\n\
\t\t<td>is</td>\n\
\t\t<td>a</td>\n\
\t\t<td>row</td>\n\
\t</tr>\n\
\t<tr>\n\
\t\t<td>This</td>\n\
\t\t<td>is</td>\n\
\t\t<td>a</td>\n\
\t\t<td>row</td>\n\
\t</tr>\n\
</table>", tx );
});


test( 'block attributes applied to a table row', function ( t ) {
  let tx = "|This|is|a|row|\n\
{background:#ddd}. |This|is|grey|row|";
  t.is( textile.convert( tx ),
    "<table>\n\
\t<tr>\n\
\t\t<td>This</td>\n\
\t\t<td>is</td>\n\
\t\t<td>a</td>\n\
\t\t<td>row</td>\n\
\t</tr>\n\
\t<tr style=\"background:#ddd\">\n\
\t\t<td>This</td>\n\
\t\t<td>is</td>\n\
\t\t<td>grey</td>\n\
\t\t<td>row</td>\n\
\t</tr>\n\
</table>", tx );
});


test( 'extended block followed by pre block', function ( t ) {
  let tx = "div.. Just a test.\n\n\
Second div.\n\n\
pre. A pre block ends it.";
  t.is( textile.convert( tx ),
    "<div>Just a test.</div>\n\
<div>Second div.</div>\n\
<pre>A pre block ends it.</pre>", tx );
});


test( 'extended block followed by blockquote', function ( t ) {
  let tx = "div.. Just a test.\n\n\
Second div.\n\n\
bq. A blockquote ends it.";
  t.is( textile.convert( tx ),
    "<div>Just a test.</div>\n\
<div>Second div.</div>\n\
<blockquote>\n\
<p>A blockquote ends it.</p>\n\
</blockquote>", tx );
});


test( 'extended block followed by block code', function ( t ) {
  let tx = "div.. Just a test.\n\n\
Second div.\n\n\
bc. A blockcode ends it.";
  t.is( textile.convert( tx ),
    "<div>Just a test.</div>\n\
<div>Second div.</div>\n\
<pre><code>A blockcode ends it.</code></pre>", tx );
});


test( 'extended block followed by notextile block', function ( t ) {
  let tx = "div.. Just a test.\n\n\
Second div.\n\n\
notextile. A notextile block ends it.";
  t.is( textile.convert( tx ),
    "<div>Just a test.</div>\n\
<div>Second div.</div>\n\
A notextile block ends it.", tx );
});


test( 'simple parentheses', function ( t ) {
  let tx = "before (in parens) after";
  t.is( textile.convert( tx ),
    "<p>before (in parens) after</p>", tx );
});


test( 'parentheses in underscores', function ( t ) {
  let tx = "before _(in parens)_ after";
  t.is( textile.convert( tx ),
    "<p>before <em>(in parens)</em> after</p>", tx );
});


test( 'parentheses in asterisks', function ( t ) {
  let tx = "before *(in parens)* after";
  t.is( textile.convert( tx ),
    "<p>before <strong>(in parens)</strong> after</p>", tx );
});


test( 'parentheses in underscores in quotes', function ( t ) {
  let tx = "\"before _(in parens)_ after\"";
  t.is( textile.convert( tx ),
    "<p>&#8220;before <em>(in parens)</em> after&#8221;</p>", tx );
});


test( 'underscores in parentheses', function ( t ) {
  let tx = "one _two three_ (four _five six_) seven";
  t.is( textile.convert( tx ),
    "<p>one <em>two three</em> (four <em>five six</em>) seven</p>", tx );
});


test( 'underscores in parentheses in quotes', function ( t ) {
  let tx = "\"one _two three_ (four _five six_) seven\"";
  t.is( textile.convert( tx ),
    "<p>&#8220;one <em>two three</em> (four <em>five six</em>) seven&#8221;</p>", tx );
});


test( 'underscores in parentheses 2', function ( t ) {
  let tx = "one (two _three four_) five";
  t.is( textile.convert( tx ),
    "<p>one (two <em>three four</em>) five</p>", tx );
});


test( 'underscores in parentheses in quotes 2', function ( t ) {
  let tx = "\"one (two _three four_) five\"";
  t.is( textile.convert( tx ),
    "<p>&#8220;one (two <em>three four</em>) five&#8221;</p>", tx );
});


test( 'caps in parentheses', function ( t ) {
  let tx = "IBM or (HAL)";
  t.is( textile.convert( tx ),
    "<p><span class=\"caps\">IBM</span> or (<span class=\"caps\">HAL</span>)</p>", tx );
});


test( 'phrase modifiers in parentheses', function ( t ) {
  let tx = "__Amanita__s are mushrooms.\n\
Lungworts (__Lobaria__) are lichens.\n\
Blah blah (normal text **bold**) blah.";
  t.is( textile.convert( tx ),
    "<p>__Amanita__s are mushrooms.<br />\n\
Lungworts (<i>Lobaria</i>) are lichens.<br />\n\
Blah blah (normal text <b>bold</b>) blah.</p>", tx );
});


test( 'square brackets are preserved', function ( t ) {
  let tx = "citation [\"(Berk.) Hilton\"], see\n\
[Papers \"blah blah.\"]";
  t.is( textile.convert( tx ),
    "<p>citation [&#8220;(Berk.) Hilton&#8221;], see<br />\n\
[Papers &#8220;blah blah.&#8221;]</p>", tx );
});


test( 'horizontal rule using asterisks', function ( t ) {
  let tx = "Just some *** text\n\n\
***\n\n\
Some more text.";
  t.is( textile.convert( tx ),
    "<p>Just some *** text</p>\n\
<hr />\n\
<p>Some more text.</p>", tx );
});


test( 'horizontal rule using more than three asterisks', function ( t ) {
  let tx = "Just some **** text\n\n\
****\n\n\
Some more text.";
  t.is( textile.convert( tx ),
    "<p>Just some **** text</p>\n\
<hr />\n\
<p>Some more text.</p>", tx );
});


test( 'horizontal rule using dashes', function ( t ) {
  let tx = "Just some --- text\n\n\
---\n\n\
Some more text.";
  t.is( textile.convert( tx ),
    "<p>Just some --- text</p>\n\
<hr />\n\
<p>Some more text.</p>", tx );
});


test( 'horizontal rule using underscores', function ( t ) {
  let tx = "Just some ___ text\n\n\
___\n\n\
Some more text.";
  t.is( textile.convert( tx ),
    "<p>Just some ___ text</p>\n\
<hr />\n\
<p>Some more text.</p>", tx );
});


test( 'lang attribute cannot contain square brackets', function ( t ) {
  let tx = "some @[[code]]@";
  t.is( textile.convert( tx ),
    "<p>some <code>[[code]]</code></p>", tx );
});


test( 'pre blocks preserve leading whitespace', function ( t ) {
  let tx = "pre.      Text in a pre block\n\
is displayed in a fixed-width\n\
     font. It preserves\n\
  s p a c e s, line breaks\n\
     and ascii bunnies.";
  t.is( textile.convert( tx ),
    "<pre>     Text in a pre block\n\
is displayed in a fixed-width\n\
     font. It preserves\n\
  s p a c e s, line breaks\n\
     and ascii bunnies.</pre>", tx );
});


test( 'code blocks preserve leading whitespace', function ( t ) {
  let tx = "bc.   false\n\
} else {";
  t.is( textile.convert( tx ),
    "<pre><code>  false\n\
} else {</code></pre>", tx );
});


test( 'citation ending with question mark', function ( t ) {
  let tx = "??What the Story Morning Glory???";
  t.is( textile.convert( tx ),
    "<p><cite>What the Story Morning Glory?</cite></p>", tx );
});


test( 'citation including question mark', function ( t ) {
  let tx = "??What's the Matter with Kansas? How Conservatives Won the Heart of America?? is a great book!";
  t.is( textile.convert( tx ),
    "<p><cite>What&#8217;s the Matter with Kansas? How Conservatives Won the Heart of America</cite> is a great book!</p>", tx );
});


test( 'emphasized word including underscore', function ( t ) {
  let tx = "_trythis_ it will keep the empahsis.\n\
_and_this_too_ it should keep the emphasis but does not with redcloth.";
  t.is( textile.convert( tx ),
    "<p><em>trythis</em> it will keep the empahsis.<br />\n\
<em>and_this_too</em> it should keep the emphasis but does not with redcloth.</p>", tx );
});


test( 'code captures spaces when made explicit with square brackets', function ( t ) {
  let tx = "Start a paragraph with [@p. @] (that's p, a period, and a space).";
  t.is( textile.convert( tx ),
    "<p>Start a paragraph with <code>p. </code> (that&#8217;s p, a period, and a space).</p>", tx );
});


test( 'unrecognized block starting with t not eaten', function ( t ) {
  let tx = "tel. 0 700 123 123";
  t.is( textile.convert( tx ),
    "<p>tel. 0 700 123 123</p>", tx );
});


test( 'bolded number at start of phrase', function ( t ) {
  let tx = "*22 watermelons* is my limit";
  t.is( textile.convert( tx ),
    "<p><strong>22 watermelons</strong> is my limit</p>", tx );
});


test( 'bolded paragraph', function ( t ) {
  let tx = "*- I would expect it to be a bolded paragraph.*";
  t.is( textile.convert( tx ),
    "<p><strong>- I would expect it to be a bolded paragraph.</strong></p>", tx );
});

