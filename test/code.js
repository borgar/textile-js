// code.yml
import test from 'ava';
import textile from '../src';

test( 'inline code', function ( t ) {
  let tx = "This is an empty dictionary: @{}@";
  t.is( textile.convert( tx ),
    "<p>This is an empty dictionary: <code>{}</code></p>", tx );
});


// not PHP standard
/*test( 'inline snip', function ( t ) {
  let tx = "The ```command``` is here.";
  t.is( textile.convert( tx ),
    "<p>The <pre><code>command</code></pre>\n\
 is here.</p>", tx );
});*/


test( 'inline code escapement', function ( t ) {
  let tx = "Please type @cat \"file.txt\" > otherfile.txt@ at the prompt.";
  t.is( textile.convert( tx ),
    "<p>Please type <code>cat \"file.txt\" &gt; otherfile.txt</code> at the prompt.</p>", tx );
});


test( 'inline code escapement with digits', function ( t ) {
  let tx = "Regex-based string substitution with Ruby's gsub!: @\"123<789\".gsub!(/</, \"\") => \"123789\"@";
  t.is( textile.convert( tx ),
    "<p>Regex-based string substitution with Ruby&#8217;s gsub!: <code>\"123&lt;789\".gsub!(/&lt;/, \"\") =&gt; \"123789\"</code></p>", tx );
});


test( 'inlne code escapement describing textile paragraph styling ', function ( t ) {
  let tx = "This paragraph is aligned left but if you add this: @p>.@ to the beginning it will be aligned right.";
  t.is( textile.convert( tx ),
    "<p>This paragraph is aligned left but if you add this: <code>p&gt;.</code> to the beginning it will be aligned right.</p>", tx );
});


test( 'escapes code snippet containing html tag', function ( t ) {
  let tx = "At the top of each page, please put @<h2>Title</h2>@ in the HTML.";
  t.is( textile.convert( tx ),
    "<p>At the top of each page, please put <code>&lt;h2&gt;Title&lt;/h2&gt;</code> in the <span class=\"caps\">HTML</span>.</p>", tx );
});


test( 'escaping in blockcode', function ( t ) {
  let tx = "bc. This is within a block of code, so < and > should be entities.  You can talk about a <p class=\"foo\"> tag if you wish and it will be properly escaped.";
  t.is( textile.convert( tx ),
    "<pre><code>This is within a block of code, so &lt; and &gt; should be entities.  You can talk about a &lt;p class=\"foo\"&gt; tag if you wish and it will be properly escaped.</code></pre>", tx );
});


test( 'escaping in pre', function ( t ) {
  let tx = "<pre><code>This is within a block of code, so < and > should be entities.  You can talk about a <p class=\"foo\"> tag in pre tags too.</code></pre>";
  t.is( textile.convert( tx ),
    "<pre><code>This is within a block of code, so &lt; and &gt; should be entities.  You can talk about a &lt;p class=\"foo\"&gt; tag in pre tags too.</code></pre>", tx );
});


test( 'escaping in normal text', function ( t ) {
  let tx = "This is a regular paragraph.  AT&T. &pound;38 > $38.";
  t.is( textile.convert( tx ),
    "<p>This is a regular paragraph.  AT&amp;T. &pound;38 &gt; $38.</p>", tx );
});


test( 'preservation of existing entities', function ( t ) {
  let tx = "Math fact: 3 &lt; 5 &amp; 5 &gt; 3 but &pound;6 &#62; $6. Oh, and 2 &divide; 4 is &frac12;.";
  t.is( textile.convert( tx ),
    "<p>Math fact: 3 &lt; 5 &amp; 5 &gt; 3 but &pound;6 &#62; $6. Oh, and 2 &divide; 4 is &frac12;.</p>", tx );
});


test( 'escaping of existing entities in blockcode', function ( t ) {
  let tx = "bc. Math fact: 3 &lt; 5 &amp; 5 &gt; 3 but &pound;5 &#62; $5.";
  t.is( textile.convert( tx ),
    "<pre><code>Math fact: 3 &amp;lt; 5 &amp;amp; 5 &amp;gt; 3 but &amp;pound;5 &amp;#62; $5.</code></pre>", tx );
});


test( 'no formatting within pre', function ( t ) {
  let tx = "<pre>\n\
<code>\n\
# *test*\n\
__not italics__\n\
no hard breaks\n\
</code>\n\
</pre>";
  t.is( textile.convert( tx ),
    "<pre>\n\
<code>\n\
# *test*\n\
__not italics__\n\
no hard breaks\n\
</code>\n\
</pre>", tx );
});


test( 'no formatting within blockcode', function ( t ) {
  let tx = "bc. __not italics__";
  t.is( textile.convert( tx ),
    "<pre><code>__not italics__</code></pre>", tx );
});


test( 'double-equals as inline notextile', function ( t ) {
  let tx = "p. Regular paragraph\n\n\
==Escaped portion -- will not be formatted by Textile at all==\n\n\
p. Back to normal.";
  t.is( textile.convert( tx ),
    "<p>Regular paragraph</p>\n\
<p>Escaped portion -- will not be formatted by Textile at all</p>\n\
<p>Back to normal.</p>", tx );
});


test( 'notextile tags', function ( t ) {
  let tx = "<notextile>\n\
# *test*\n\
</notextile>";
  t.is( textile.convert( tx ),
    "# *test*", tx );
});


test( 'unfinished notextile tag', function ( t ) {
  let tx = "<notextile>\n\
# *test*";
  t.is( textile.convert( tx ),
    "<p><notextile></p>\n\
<ol>\n\
\t<li><strong>test</strong></li>\n\
</ol>", tx );
});


test( 'unfinished script tag', function ( t ) {
  let tx = "<script>\n\
function main(){}";
  t.is( textile.convert( tx ),
    "<script><br />\n\
function main(){}", tx );
});


test( 'inline notextile tags', function ( t ) {
  let tx = "This is how you make a link: <notextile>\"link\":http://www.redcloth.org</notextile>";
  t.is( textile.convert( tx ),
    "<p>This is how you make a link: \"link\":http://www.redcloth.org</p>", tx );
});


test( 'code in list items', function ( t ) {
  let tx = "* @foo@\n\
* @bar@\n\
* and @x@ is also.\n\
";
  t.is( textile.convert( tx ),
    "<ul>\n\
\t<li><code>foo</code></li>\n\
\t<li><code>bar</code></li>\n\
\t<li>and <code>x</code> is also.</li>\n\
</ul>", tx );
});


test( 'extended block code', function ( t ) {
  let tx = "If you have a line or two of code or HTML to embed, use extended block code like so:\n\n\
bc.. ./foo.pl%\n\
<p>foo outputs an HTML paragraph</p>\n\n\
<p>block of code keeps going until a different block signature is encountered</p>\n\n\
p. And then go back with a normal paragraph.";
  t.is( textile.convert( tx ),
    "<p>If you have a line or two of code or <span class=\"caps\">HTML</span> to embed, use extended block code like so:</p>\n\
<pre><code>./foo.pl%\n\
&lt;p&gt;foo outputs an HTML paragraph&lt;/p&gt;</code>\n\n\
<code>&lt;p&gt;block of code keeps going until a different block signature is encountered&lt;/p&gt;</code></pre>\n\
<p>And then go back with a normal paragraph.</p>", tx );
});


test( 'extended block code preserves leading whitespace after blank line', function ( t ) {
  let tx = "bc.. class Foo\n\
    def bar\n\
        'bar'\n\
    end\n\n\
    def baz\n\
        'baz'\n\
    end\n\
end\n\n\
p. That's it!";
  t.is( textile.convert( tx ),
    "<pre><code>class Foo\n\
    def bar\n\
        'bar'\n\
    end</code>\n\n\
<code>    def baz\n\
        'baz'\n\
    end\n\
end</code></pre>\n\
<p>That&#8217;s it!</p>", tx );
});


test( 'block code containing code avoids nesting code tags', function ( t ) {
  let tx = "bc. A one-liner: @ruby -ne '($h||={}).fetch($_){puts $h[$_]=$_}'@";
  t.is( textile.convert( tx ),
    "<pre><code>A one-liner: @ruby -ne '($h||={}).fetch($_){puts $h[$_]=$_}'@</code></pre>", tx );
});


test( 'block code containing block start', function ( t ) {
  let tx = "bc. I saw a ship. It ate my elephant.";
  t.is( textile.convert( tx ),
    "<pre><code>I saw a ship. It ate my elephant.</code></pre>", tx );
});


test( 'extended block code containing block start', function ( t ) {
  let tx = "bc.. This is an extended bc.\n\n\
I saw a ship. It ate my elephant.";
  t.is( textile.convert( tx ),
    "<pre><code>This is an extended bc.</code>\n\n\
<code>I saw a ship. It ate my elephant.</code></pre>", tx );
});


test( 'block containing html tags', function ( t ) {
  let tx = "bc. Can I talk about <h2>Headings</h2> here?";
  t.is( textile.convert( tx ),
    "<pre><code>Can I talk about &lt;h2&gt;Headings&lt;/h2&gt; here?</code></pre>", tx );
});


test( 'unclosed pre tag', function ( t ) {
  let tx = "<pre><code>This is a pre that will go unfinished";
  t.is( textile.convert( tx ),
    "<pre><code>This is a pre that will go unfinished", tx );
});


test( 'unclosed code tag', function ( t ) {
  let tx = "This is a some <code>code that will go unfinished";
  t.is( textile.convert( tx ),
    "<p>This is a some <code>code that will go unfinished</p>", tx );
});


test( 'code containing parentheses', function ( t ) {
  let tx = "p. @some_method(some_params, some => test);@ Oh dear this fails";
  t.is( textile.convert( tx ),
    "<p><code>some_method(some_params, some =&gt; test);</code> Oh dear this fails</p>", tx );
});


test( 'code preserves initial square brackets', function ( t ) {
  let tx = "@[project]_dff.skjd@";
  t.is( textile.convert( tx ),
    "<p><code>[project]_dff.skjd</code></p>", tx );
});


test( 'following also bracketed code in same line', function ( t ) {
  let tx = "Some [@code@] and some [@more code@].";
  t.is( textile.convert( tx ),
    "<p>Some <code>code</code> and some <code>more code</code>.</p>", tx );
});
