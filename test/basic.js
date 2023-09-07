import test from 'tape';
import textile from '../src/index.js';
// basic.yml

test('paragraphs', t => {
  const tx = `A single paragraph.

Followed by another.`;
  t.is(textile.convert(tx),
    `<p>A single paragraph.</p>
<p>Followed by another.</p>`, tx);
  t.end();
});


test('blocks with spaces on the blank line in between', t => {
  const tx = `This is line one
 
This is line two`;
  t.is(textile.convert(tx),
    `<p>This is line one</p>
<p>This is line two</p>`, tx);
  t.end();
});


test('blocks with tabl on the blank line in between', t => {
  const tx = `This is line one
\t
This is line two`;
  t.is(textile.convert(tx),
    `<p>This is line one</p>
<p>This is line two</p>`, tx);
  t.end();
});


test('block containing block start', t => {
  const tx = 'I saw a ship. It ate my elephant.';
  t.is(textile.convert(tx),
    '<p>I saw a ship. It ate my elephant.</p>', tx);
  t.end();
});


test('extended block containing block start', t => {
  const tx = `p.. I saw a ship. It ate my elephant.

When the elephant comes to take a p. you...`;
  t.is(textile.convert(tx),
    `<p>I saw a ship. It ate my elephant.</p>
<p>When the elephant comes to take a p. you…</p>`, tx);
  t.end();
});


test('blockquote containing block start', t => {
  const tx = 'bq. I saw a ship. It ate my elephant.';
  t.is(textile.convert(tx),
    `<blockquote>
<p>I saw a ship. It ate my elephant.</p>
</blockquote>`, tx);
  t.end();
});


test('extended blockquote containing block start', t => {
  const tx = `bq.. I saw a ship. It ate my elephant.

When the elephant comes to take a p. you...`;
  t.is(textile.convert(tx),
    `<blockquote>
<p>I saw a ship. It ate my elephant.</p>
<p>When the elephant comes to take a p. you…</p>
</blockquote>`, tx);
  t.end();
});


test('notextile block', t => {
  const tx = `Some text:

<notextile>
<div class="example"><pre>
Some code
</pre></div>
</notextile>

Some more text.`;
  t.is(textile.convert(tx),
    `<p>Some text:</p>
<div class="example"><pre>
Some code
</pre></div>
<p>Some more text.</p>`, tx);
  t.end();
});


test('notextile block containing block start', t => {
  const tx = 'notextile. I saw a ship. It ate my elephant.';
  t.is(textile.convert(tx),
    'I saw a ship. It ate my elephant.', tx);
  t.end();
});


test('extended notextile block containing block start', t => {
  const tx = `notextile.. I saw a ship. It ate my elephant.

When the elephant comes to take a p. you...`;
  t.is(textile.convert(tx),
    `I saw a ship. It ate my elephant.

When the elephant comes to take a p. you...`, tx);
  t.end();
});


test('pre block containing block start', t => {
  const tx = 'pre. I saw a ship. It ate my elephant.';
  t.is(textile.convert(tx),
    '<pre>I saw a ship. It ate my elephant.</pre>', tx);
  t.end();
});


test('extended pre block containing block start', t => {
  const tx = `pre.. I saw a ship. It ate my elephant.

When the elephant comes to take a p. you...`;
  t.is(textile.convert(tx),
    `<pre>I saw a ship. It ate my elephant.

When the elephant comes to take a p. you...</pre>`, tx);
  t.end();
});


test('html tags', t => {
  const tx = `I am <b>very</b> serious.

<pre>
  I am <b>very</b> serious.
</pre>`;
  t.is(textile.convert(tx),
    `<p>I am <b>very</b> serious.</p>
<pre>
  I am &lt;b&gt;very&lt;/b&gt; serious.
</pre>`, tx);
  t.end();
});


test('line breaks', t => {
  const tx = `I spoke.
And none replied.`;
  t.is(textile.convert(tx),
    `<p>I spoke.<br />
And none replied.</p>`, tx);
  t.end();
});


test('curly quotes', t => {
  const tx = '"Observe!"';
  t.is(textile.convert(tx),
    '<p>“Observe!”</p>', tx);
  t.end();
});


test('quotes contained in multi-paragraph quotes', t => {
  const tx = `"I first learned about this thing called "Redcloth" several years ago.

"It's wonderful."`;
  t.is(textile.convert(tx),
    `<p>“I first learned about this thing called “Redcloth” several years ago.</p>
<p>“It’s wonderful.”</p>`, tx);
  t.end();
});


test('double hyphens', t => {
  const tx = 'Observe--very nice!';
  t.is(textile.convert(tx),
    '<p>Observe—very nice!</p>', tx);
  t.end();
});


test('double hyphens with spaces', t => {
  const tx = 'Observe -- very nice!';
  t.is(textile.convert(tx),
    '<p>Observe — very nice!</p>', tx);
  t.end();
});


test('parenthetical phrase set off with em dashes', t => {
  const tx = 'An emdash indicates a parenthetical thought--like this one--which is set apart from the rest of a sentence.';
  t.is(textile.convert(tx),
    '<p>An emdash indicates a parenthetical thought—like this one—which is set apart from the rest of a sentence.</p>', tx);
  t.end();
});


test('parenthetical phrase set off with em dashes surrounded by spaces', t => {
  const tx = 'An emdash indicates a parenthetical thought -- like this one -- which is set apart from the rest of a sentence.';
  t.is(textile.convert(tx),
    '<p>An emdash indicates a parenthetical thought — like this one — which is set apart from the rest of a sentence.</p>', tx);
  t.end();
});


test('single hyphens with spaces', t => {
  const tx = 'Observe - tiny and brief.';
  t.is(textile.convert(tx),
    '<p>Observe – tiny and brief.</p>', tx);
  t.end();
});


test('midword hyphens ', t => {
  const tx = 'Observe the nicely-done hyphen.';
  t.is(textile.convert(tx),
    '<p>Observe the nicely-done hyphen.</p>', tx);
  t.end();
});


test('ellipses', t => {
  const tx = 'Observe...';
  t.is(textile.convert(tx),
    '<p>Observe…</p>', tx);
  t.end();
});


test('dimension sign', t => {
  const tx = 'Observe: 2x3.';
  t.is(textile.convert(tx),
    '<p>Observe: 2×3.</p>', tx);
  t.end();
});


test('dimension sign with space after', t => {
  const tx = 'The room is 2x3 inches big.';
  t.is(textile.convert(tx),
    '<p>The room is 2×3 inches big.</p>', tx);
  t.end();
});


test('dimension sign with spaces', t => {
  const tx = 'Observe: 2 x 4.';
  t.is(textile.convert(tx),
    '<p>Observe: 2 × 4.</p>', tx);
  t.end();
});


test('dimension signs chained', t => {
  const tx = 'Observe: 2x3x4.';
  t.is(textile.convert(tx),
    '<p>Observe: 2×3×4.</p>', tx);
  t.end();
});


test('dimension signs with double primes', t => {
  const tx = 'My mouse: 2.5" x 4".';
  t.is(textile.convert(tx),
    '<p>My mouse: 2.5″ × 4″.</p>', tx);
  t.end();
});


test('dimension signs with single primes', t => {
  const tx = "My office: 5' x 4.5'.";
  t.is(textile.convert(tx),
    '<p>My office: 5′ × 4.5′.</p>', tx);
  t.end();
});


test('trademark and copyright', t => {
  const tx = 'one(TM), two(R), three(C).';
  t.is(textile.convert(tx),
    '<p>one™, two®, three©.</p>', tx);
  t.end();
});


test('headers', t => {
  const tx = 'h3. Header 3';
  t.is(textile.convert(tx),
    '<h3>Header 3</h3>', tx);
  t.end();
});


test('blockquote', t => {
  const tx = `Any old text

bq. A block quotation.

Any old text`;
  t.is(textile.convert(tx),
    `<p>Any old text</p>
<blockquote>
<p>A block quotation.</p>
</blockquote>
<p>Any old text</p>`, tx);
  t.end();
});


test('footnote reference', t => {
  const tx = 'This is covered elsewhere[1].';
  t.is(textile.convert(tx),
    '<p>This is covered elsewhere<sup class="footnote" id="fnr-1"><a href="#fn-1">1</a></sup>.</p>', tx);
  t.end();
});

test('footnote reference with bang', t => {
  const tx = 'This is covered elsewhere[1!].';
  t.is(textile.convert(tx),
    '<p>This is covered elsewhere<sup class="footnote" id="fnr-1">1</sup>.</p>', tx);
  t.end();
});


test('footnote', t => {
  const tx = 'fn1. Down here, in fact.';
  t.is(textile.convert(tx),
    '<p class="footnote" id="fn-1"><sup>1</sup> Down here, in fact.</p>', tx);
  t.end();
});


test('footnote with backlink', t => {
  const tx = 'fn1^. Down here, in fact.';
  t.is(textile.convert(tx),
    '<p class="footnote" id="fn-1"><a href="#fnr-1"><sup>1</sup></a> Down here, in fact.</p>', tx);
  t.end();
});


test('em', t => {
  const tx = 'I _believe_ every word.';
  t.is(textile.convert(tx),
    '<p>I <em>believe</em> every word.</p>', tx);
  t.end();
});


test('strong', t => {
  const tx = 'And then? She *fell*!';
  t.is(textile.convert(tx),
    '<p>And then? She <strong>fell</strong>!</p>', tx);
  t.end();
});


test('strong phrase beginning with a number', t => {
  const tx = '*10 times as many*';
  t.is(textile.convert(tx),
    '<p><strong>10 times as many</strong></p>', tx);
  t.end();
});


test('force bold italics', t => {
  const tx = `I __know__.
I **really** __know__.`;
  t.is(textile.convert(tx),
    `<p>I <i>know</i>.<br />
I <b>really</b> <i>know</i>.</p>`, tx);
  t.end();
});


test('citation', t => {
  const tx = "??Cat's Cradle?? by Vonnegut";
  t.is(textile.convert(tx),
    '<p><cite>Cat’s Cradle</cite> by Vonnegut</p>', tx);
  t.end();
});


test('code phrases', t => {
  const tx = 'Convert with @r.to_html@';
  t.is(textile.convert(tx),
    '<p>Convert with <code>r.to_html</code></p>', tx);
  t.end();
});


test('code phrases not created with multiple email addresses', t => {
  const tx = 'Please email why@domain.com or jason@domain.com.';
  t.is(textile.convert(tx),
    '<p>Please email why@domain.com or jason@domain.com.</p>', tx);
  t.end();
});


test('del', t => {
  const tx = "I'm -sure- not sure.";
  t.is(textile.convert(tx),
    '<p>I’m <del>sure</del> not sure.</p>', tx);
  t.end();
});


test('del beginning a phrase', t => {
  const tx = '-delete-';
  t.is(textile.convert(tx),
    '<p><del>delete</del></p>', tx);
  t.end();
});


test('ins', t => {
  const tx = 'You are a +pleasant+ child.';
  t.is(textile.convert(tx),
    '<p>You are a <ins>pleasant</ins> child.</p>', tx);
  t.end();
});


test('superscript', t => {
  const tx = 'a ^2^ + b ^2^ = c ^2^';
  t.is(textile.convert(tx),
    '<p>a <sup>2</sup> + b <sup>2</sup> = c <sup>2</sup></p>', tx);
  t.end();
});


test('parenthetical superscript phrase', t => {
  const tx = '^(image courtesy NASA)^';
  t.is(textile.convert(tx),
    '<p><sup>(image courtesy <span class="caps">NASA</span>)</sup></p>', tx);
  t.end();
});


test('subscript', t => {
  const tx = 'log ~2~ x';
  t.is(textile.convert(tx),
    '<p>log <sub>2</sub> x</p>', tx);
  t.end();
});


test('parenthetical subscript phrase', t => {
  const tx = '~(image courtesy NASA)~';
  t.is(textile.convert(tx),
    '<p><sub>(image courtesy <span class="caps">NASA</span>)</sub></p>', tx);
  t.end();
});


test('tight superscript and subscript', t => {
  const tx = 'f(x, n) = log[~4~]x[^n^]';
  t.is(textile.convert(tx),
    '<p>f(x, n) = log<sub>4</sub>x<sup>n</sup></p>', tx);
  t.end();
});


test('span', t => {
  const tx = "I'm %unaware% of most soft drinks.";
  t.is(textile.convert(tx),
    '<p>I’m <span>unaware</span> of most soft drinks.</p>', tx);
  t.end();
});


test('style span', t => {
  const tx = `I'm %{color:red}unaware%
of most %{font-size:0.5em;}soft drinks%.`;
  t.is(textile.convert(tx),
    `<p>I’m <span style="color:red">unaware</span><br />
of most <span style="font-size:0.5em">soft drinks</span>.</p>`, tx);
  t.end();
});


test('percent sign', t => {
  const tx = `http://blah.com/one%20two%20three
(min)5%-95%(max)`;
  t.is(textile.convert(tx),
    `<p>http://blah.com/one%20two%20three<br />
(min)5%-95%(max)</p>`, tx);
  t.end();
});


test('css class', t => {
  const tx = 'p(example1). An example';
  t.is(textile.convert(tx),
    '<p class="example1">An example</p>', tx);
  t.end();
});


test('css id', t => {
  const tx = 'p(#big-red). Red here';
  t.is(textile.convert(tx),
    '<p id="big-red">Red here</p>', tx);
  t.end();
});


test('css id with initial uppercase', t => {
  const tx = 'p(#Foo). bar';
  t.is(textile.convert(tx),
    '<p id="Foo">bar</p>', tx);
  t.end();
});


test('css class uppercase', t => {
  const tx = 'p(fooBar). baz';
  t.is(textile.convert(tx),
    '<p class="fooBar">baz</p>', tx);
  t.end();
});


test('class and id combined', t => {
  const tx = 'p(example1#big-red2). Red here';
  t.is(textile.convert(tx),
    '<p class="example1" id="big-red2">Red here</p>', tx);
  t.end();
});


test('css style', t => {
  const tx = "p{color:blue;margin:30px;font-size:120%;font-family:'Comic Sans'}. Spacey blue";
  t.is(textile.convert(tx),
    '<p style="color:blue;margin:30px;font-size:120%;font-family:&#39;Comic Sans&#39;">Spacey blue</p>', tx);
  t.end();
});


test('language designations', t => {
  const tx = 'p[fr]. rouge';
  t.is(textile.convert(tx),
    '<p lang="fr">rouge</p>', tx);
  t.end();
});


test('block attributes on phrase modifiers', t => {
  const tx = `I seriously *{color:red}blushed*
when I _(big)sprouted_ that
corn stalk from my
%[es]cabeza%.`;
  t.is(textile.convert(tx),
    `<p>I seriously <strong style="color:red">blushed</strong><br />
when I <em class="big">sprouted</em> that<br />
corn stalk from my<br />
<span lang="es">cabeza</span>.</p>`, tx);
  t.end();
});


test('inline attributes preceded by text are treated as literal', t => {
  const tx = `I *seriously {color:red}blushed*
when I _first (big)sprouted_ that
corn stalk from my
%grande [es]cabeza%.`;
  t.is(textile.convert(tx),
    `<p>I <strong>seriously {color:red}blushed</strong><br />
when I <em>first (big)sprouted</em> that<br />
corn stalk from my<br />
<span>grande [es]cabeza</span>.</p>`, tx);
  t.end();
});


test('align justified', t => {
  const tx = 'p<>. justified';
  t.is(textile.convert(tx),
    '<p style="text-align:justify">justified</p>', tx);
  t.end();
});


test('indentation', t => {
  const tx = 'p))). right ident 3em';
  t.is(textile.convert(tx),
    '<p style="padding-right:3em">right ident 3em</p>', tx);
  t.end();
});


test('indentation and alignment', t => {
  const tx = 'h2()>. Bingo.';
  t.is(textile.convert(tx),
    '<h2 style="padding-left:1em;padding-right:1em;text-align:right">Bingo.</h2>', tx);
  t.end();
});


test('many modifiers combined', t => {
  const tx = 'h3()>[no]{color:red}. Bingo';
  t.is(textile.convert(tx),
    '<h3 style="padding-left:1em;padding-right:1em;text-align:right;color:red" lang="no">Bingo</h3>', tx);
  t.end();
});


test('code blocks', t => {
  const tx = `<pre>
<code>
  a.gsub!( /</, '' )
</code>
</pre>`;
  t.is(textile.convert(tx),
    `<pre>
<code>
  a.gsub!( /&lt;/, '' )
</code>
</pre>`, tx);
  t.end();
});


test('div tags', t => {
  const tx = `<div style="float:right;">

h3. Sidebar

"Hobix":http://hobix.com/
"Ruby":http://ruby-lang.org/

</div>

The main text of the page goes here and will stay to the left of the sidebar.`;
  t.is(textile.convert(tx),
    `<div style="float:right;">
<h3>Sidebar</h3>
<p><a href="http://hobix.com/">Hobix</a><br />
<a href="http://ruby-lang.org/">Ruby</a></p>
</div>
<p>The main text of the page goes here and will stay to the left of the sidebar.</p>`, tx);
  t.end();
});


test('numbered list', t => {
  const tx = `# A first item
# A second item
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
  const tx = `# Fuel could be:
## Coal
## Gasoline
## Electricity
# Humans need only:
## Water
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
  const tx = `* A first item
* A second item
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
  const tx = `* Fuel could be:
** Coal
** Gasoline
** Electricity
* Humans need only:
** Water
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


test('links', t => {
  const tx = 'I searched "Google":http://google.com.';
  t.is(textile.convert(tx),
    '<p>I searched <a href="http://google.com">Google</a>.</p>', tx);
  t.end();
});


test('link aliases', t => {
  const tx = `I am crazy about "Hobix":hobix
and "it's":hobix "all":hobix I ever
"link to":hobix!

[hobix]http://hobix.com`;
  t.is(textile.convert(tx),
    `<p>I am crazy about <a href="http://hobix.com">Hobix</a><br />
and <a href="http://hobix.com">it’s</a> <a href="http://hobix.com">all</a> I ever<br />
<a href="http://hobix.com">link to</a>!</p>`, tx);
  t.end();
});


test('image', t => {
  const tx = '!http://hobix.com/sample.jpg!';
  t.is(textile.convert(tx),
    '<p><img src="http://hobix.com/sample.jpg" alt="" /></p>', tx);
  t.end();
});


test('image title', t => {
  const tx = '!openwindow1.gif(Bunny.)!';
  t.is(textile.convert(tx),
    '<p><img src="openwindow1.gif" title="Bunny." alt="Bunny." /></p>', tx);
  t.end();
});


test('image links', t => {
  const tx = '!openwindow1.gif!:http://hobix.com/';
  t.is(textile.convert(tx),
    '<p><a href="http://hobix.com/"><img src="openwindow1.gif" alt="" /></a></p>', tx);
  t.end();
});


test('image alignments', t => {
  const tx = `!>obake.gif!

And others sat all round the small
machine and paid it to sing to them.`;
  t.is(textile.convert(tx),
    `<p><img align="right" src="obake.gif" alt="" /></p>
<p>And others sat all round the small<br />
machine and paid it to sing to them.</p>`, tx);
  t.end();
});


test('acronym definitions', t => {
  const tx = 'We use CSS(Cascading Style Sheets).';
  t.is(textile.convert(tx),
    '<p>We use <abbr title="Cascading Style Sheets"><span class="caps">CSS</span></abbr>.</p>', tx);
  t.end();
});


test('two-letter acronyms', t => {
  const tx = 'It employs AI(artificial intelligence) processing.';
  t.is(textile.convert(tx),
    '<p>It employs <abbr title="artificial intelligence"><span class="caps">AI</span></abbr> processing.</p>', tx);
  t.end();
});


test('tables', t => {
  const tx = `| name | age | sex |
| joan | 24 | f |
| archie | 29 | m |
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


test('table headers', t => {
  const tx = `|_. name |_. age |_. sex |
| joan | 24 | f |
| archie | 29 | m |
| bella | 45 | f |`;
  t.is(textile.convert(tx),
    `<table>
\t<tr>
\t\t<th>name </th>
\t\t<th>age </th>
\t\t<th>sex </th>
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


test('table cell attributes', t => {
  const tx = `|_. attribute list |
|<. align left |
|>. align right|
|=. center |
|<>. justify |
|^. valign top |
|~. bottom |`;
  t.is(textile.convert(tx),
    `<table>
\t<tr>
\t\t<th>attribute list </th>
\t</tr>
\t<tr>
\t\t<td style="text-align:left">align left </td>
\t</tr>
\t<tr>
\t\t<td style="text-align:right">align right</td>
\t</tr>
\t<tr>
\t\t<td style="text-align:center">center </td>
\t</tr>
\t<tr>
\t\t<td style="text-align:justify">justify </td>
\t</tr>
\t<tr>
\t\t<td style="vertical-align:top">valign top </td>
\t</tr>
\t<tr>
\t\t<td style="vertical-align:bottom">bottom </td>
\t</tr>
</table>`, tx);
  t.end();
});


test('table colspan', t => {
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


test('table rowspan', t => {
  const tx = `|/3. spans 3 rows | a |
| b |
| c |`;
  t.is(textile.convert(tx),
    `<table>
\t<tr>
\t\t<td rowspan="3">spans 3 rows </td>
\t\t<td> a </td>
\t</tr>
\t<tr>
\t\t<td> b </td>
\t</tr>
\t<tr>
\t\t<td> c </td>
\t</tr>
</table>`, tx);
  t.end();
});


test('block attributes applied to table cells', t => {
  const tx = '|{background:#ddd}. Grey cell|';
  t.is(textile.convert(tx),
    `<table>
\t<tr>
\t\t<td style="background:#ddd">Grey cell</td>
\t</tr>
</table>`, tx);
  t.end();
});


test('block attributes applied to a table', t => {
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


test('block attributes applied to a table row', t => {
  const tx = `|This|is|a|row|
{background:#ddd}. |This|is|grey|row|`;
  t.is(textile.convert(tx),
    `<table>
\t<tr>
\t\t<td>This</td>
\t\t<td>is</td>
\t\t<td>a</td>
\t\t<td>row</td>
\t</tr>
\t<tr style="background:#ddd">
\t\t<td>This</td>
\t\t<td>is</td>
\t\t<td>grey</td>
\t\t<td>row</td>
\t</tr>
</table>`, tx);
  t.end();
});


test('extended block followed by pre block', t => {
  const tx = `div.. Just a test.

Second div.

pre. A pre block ends it.`;
  t.is(textile.convert(tx),
    `<div>Just a test.</div>
<div>Second div.</div>
<pre>A pre block ends it.</pre>`, tx);
  t.end();
});


test('extended block followed by blockquote', t => {
  const tx = `div.. Just a test.

Second div.

bq. A blockquote ends it.`;
  t.is(textile.convert(tx),
    `<div>Just a test.</div>
<div>Second div.</div>
<blockquote>
<p>A blockquote ends it.</p>
</blockquote>`, tx);
  t.end();
});


test('extended block followed by block code', t => {
  const tx = `div.. Just a test.

Second div.

bc. A blockcode ends it.`;
  t.is(textile.convert(tx),
    `<div>Just a test.</div>
<div>Second div.</div>
<pre><code>A blockcode ends it.</code></pre>`, tx);
  t.end();
});


test('extended block followed by notextile block', t => {
  const tx = `div.. Just a test.

Second div.

notextile. A notextile block ends it.`;
  t.is(textile.convert(tx),
    `<div>Just a test.</div>
<div>Second div.</div>
A notextile block ends it.`, tx);
  t.end();
});


test('simple parentheses', t => {
  const tx = 'before (in parens) after';
  t.is(textile.convert(tx),
    '<p>before (in parens) after</p>', tx);
  t.end();
});


test('parentheses in underscores', t => {
  const tx = 'before _(in parens)_ after';
  t.is(textile.convert(tx),
    '<p>before <em>(in parens)</em> after</p>', tx);
  t.end();
});


test('parentheses in asterisks', t => {
  const tx = 'before *(in parens)* after';
  t.is(textile.convert(tx),
    '<p>before <strong>(in parens)</strong> after</p>', tx);
  t.end();
});


test('parentheses in underscores in quotes', t => {
  const tx = '"before _(in parens)_ after"';
  t.is(textile.convert(tx),
    '<p>“before <em>(in parens)</em> after”</p>', tx);
  t.end();
});


test('underscores in parentheses', t => {
  const tx = 'one _two three_ (four _five six_) seven';
  t.is(textile.convert(tx),
    '<p>one <em>two three</em> (four <em>five six</em>) seven</p>', tx);
  t.end();
});


test('underscores in parentheses in quotes', t => {
  const tx = '"one _two three_ (four _five six_) seven"';
  t.is(textile.convert(tx),
    '<p>“one <em>two three</em> (four <em>five six</em>) seven”</p>', tx);
  t.end();
});


test('underscores in parentheses 2', t => {
  const tx = 'one (two _three four_) five';
  t.is(textile.convert(tx),
    '<p>one (two <em>three four</em>) five</p>', tx);
  t.end();
});


test('underscores in parentheses in quotes 2', t => {
  const tx = '"one (two _three four_) five"';
  t.is(textile.convert(tx),
    '<p>“one (two <em>three four</em>) five”</p>', tx);
  t.end();
});


test('caps in parentheses', t => {
  const tx = 'IBM or (HAL)';
  t.is(textile.convert(tx),
    '<p><span class="caps">IBM</span> or (<span class="caps">HAL</span>)</p>', tx);
  t.end();
});


test('phrase modifiers in parentheses', t => {
  const tx = `__Amanita__s are mushrooms.
Lungworts (__Lobaria__) are lichens.
Blah blah (normal text **bold**) blah.`;
  t.is(textile.convert(tx),
    `<p>__Amanita__s are mushrooms.<br />
Lungworts (<i>Lobaria</i>) are lichens.<br />
Blah blah (normal text <b>bold</b>) blah.</p>`, tx);
  t.end();
});


test('square brackets are preserved', t => {
  const tx = `citation ["(Berk.) Hilton"], see
[Papers "blah blah."]`;
  t.is(textile.convert(tx),
    `<p>citation [“(Berk.) Hilton”], see<br />
[Papers “blah blah.”]</p>`, tx);
  t.end();
});


test('horizontal rule using asterisks', t => {
  const tx = `Just some *** text

***

Some more text.`;
  t.is(textile.convert(tx),
    `<p>Just some *** text</p>
<hr />
<p>Some more text.</p>`, tx);
  t.end();
});


test('horizontal rule using more than three asterisks', t => {
  const tx = `Just some **** text

****

Some more text.`;
  t.is(textile.convert(tx),
    `<p>Just some **** text</p>
<hr />
<p>Some more text.</p>`, tx);
  t.end();
});


test('horizontal rule using dashes', t => {
  const tx = `Just some --- text

---

Some more text.`;
  t.is(textile.convert(tx),
    `<p>Just some --- text</p>
<hr />
<p>Some more text.</p>`, tx);
  t.end();
});


test('horizontal rule using underscores', t => {
  const tx = `Just some ___ text

___

Some more text.`;
  t.is(textile.convert(tx),
    `<p>Just some ___ text</p>
<hr />
<p>Some more text.</p>`, tx);
  t.end();
});


test('lang attribute cannot contain square brackets', t => {
  const tx = 'some @[[code]]@';
  t.is(textile.convert(tx),
    '<p>some <code>[[code]]</code></p>', tx);
  t.end();
});


test('pre blocks preserve leading whitespace', t => {
  const tx = `pre.      Text in a pre block
is displayed in a fixed-width
     font. It preserves
  s p a c e s, line breaks
     and ascii bunnies.`;
  t.is(textile.convert(tx),
    `<pre>     Text in a pre block
is displayed in a fixed-width
     font. It preserves
  s p a c e s, line breaks
     and ascii bunnies.</pre>`, tx);
  t.end();
});


test('code blocks preserve leading whitespace', t => {
  const tx = `bc.   false
} else {`;
  t.is(textile.convert(tx),
    `<pre><code>  false
} else {</code></pre>`, tx);
  t.end();
});


test('citation ending with question mark', t => {
  const tx = '??What the Story Morning Glory???';
  t.is(textile.convert(tx),
    '<p><cite>What the Story Morning Glory?</cite></p>', tx);
  t.end();
});


test('citation including question mark', t => {
  const tx = "??What's the Matter with Kansas? How Conservatives Won the Heart of America?? is a great book!";
  t.is(textile.convert(tx),
    '<p><cite>What’s the Matter with Kansas? How Conservatives Won the Heart of America</cite> is a great book!</p>', tx);
  t.end();
});


test('emphasized word including underscore', t => {
  const tx = `_trythis_ it will keep the empahsis.
_and_this_too_ it should keep the emphasis but does not with redcloth.`;
  t.is(textile.convert(tx),
    `<p><em>trythis</em> it will keep the empahsis.<br />
<em>and_this_too</em> it should keep the emphasis but does not with redcloth.</p>`, tx);
  t.end();
});


test('code captures spaces when made explicit with square brackets', t => {
  const tx = "Start a paragraph with [@p. @] (that's p, a period, and a space).";
  t.is(textile.convert(tx),
    '<p>Start a paragraph with <code>p. </code> (that’s p, a period, and a space).</p>', tx);
  t.end();
});


test('unrecognized block starting with t not eaten', t => {
  const tx = 'tel. 0 700 123 123';
  t.is(textile.convert(tx),
    '<p>tel. 0 700 123 123</p>', tx);
  t.end();
});


test('bolded number at start of phrase', t => {
  const tx = '*22 watermelons* is my limit';
  t.is(textile.convert(tx),
    '<p><strong>22 watermelons</strong> is my limit</p>', tx);
  t.end();
});


test('bolded paragraph', t => {
  const tx = '*- I would expect it to be a bolded paragraph.*';
  t.is(textile.convert(tx),
    '<p><strong>- I would expect it to be a bolded paragraph.</strong></p>', tx);
  t.end();
});

