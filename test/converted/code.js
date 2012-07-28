test('code.yml', function () {


// =[ 1 ]==============================================================================


equal(textile.convert( // The textile

  "This is an empty dictionary: @{}@"

), // Should output

  "<p>This is an empty dictionary: <code>{}</code></p>"

,"inline code");


// =[ 2 ]==============================================================================


equal(textile.convert( // The textile

  "The ```command``` is here."

), // Should output

  "<p>The <pre><code>command</code></pre>\n"+
  " is here.</p>"

,"inline snip");


// =[ 3 ]==============================================================================


equal(textile.convert( // The textile

  "Please type @cat \"file.txt\" > otherfile.txt@ at the prompt."

), // Should output

  "<p>Please type <code>cat \"file.txt\" &gt; otherfile.txt</code> at the prompt.</p>"

,"inline code escapement");


// =[ 4 ]==============================================================================


equal(textile.convert( // The textile

  "Regex-based string substitution with Ruby's gsub!: @\"123<789\".gsub!(/</, \"\") => \"123789\"@"

), // Should output

  "<p>Regex-based string substitution with Ruby&#8217;s gsub!: <code>\"123&lt;789\".gsub!(/&lt;/, \"\") =&gt; \"123789\"</code></p>"

,"inline code escapement with digits");


// =[ 5 ]==============================================================================


equal(textile.convert( // The textile

  "This paragraph is aligned left but if you add this: @p>.@ to the beginning it will be aligned right."

), // Should output

  "<p>This paragraph is aligned left but if you add this: <code>p&gt;.</code> to the beginning it will be aligned right.</p>"

,"inlne code escapement describing textile paragraph styling ");


// =[ 6 ]==============================================================================


equal(textile.convert( // The textile

  "At the top of each page, please put @<h2>Title</h2>@ in the HTML."

), // Should output

  "<p>At the top of each page, please put <code>&lt;h2&gt;Title&lt;/h2&gt;</code> in the <span class=\"caps\">HTML</span>.</p>"

,"escapes code snippet containing html tag");


// =[ 7 ]==============================================================================


equal(textile.convert( // The textile

  "bc. This is within a block of code, so < and > should be entities.  You can talk about a <p class=\"foo\"> tag if you wish and it will be properly escaped."

), // Should output

  "<pre><code>This is within a block of code, so &lt; and &gt; should be entities.  You can talk about a &lt;p class=\"foo\"&gt; tag if you wish and it will be properly escaped.</code></pre>"

,"escaping in blockcode");


// =[ 8 ]==============================================================================


equal(textile.convert( // The textile

  "<pre><code>This is within a block of code, so < and > should be entities.  You can talk about a <p class=\"foo\"> tag in pre tags too.</code></pre>"

), // Should output

  "<pre><code>This is within a block of code, so &lt; and &gt; should be entities.  You can talk about a &lt;p class=\"foo\"&gt; tag in pre tags too.</code></pre>"

,"escaping in pre");


// =[ 9 ]==============================================================================


equal(textile.convert( // The textile

  "This is a regular paragraph.  AT&T. &pound;38 > $38."

), // Should output

  "<p>This is a regular paragraph.  AT&amp;T. &pound;38 &gt; $38.</p>"

,"escaping in normal text");


// =[ 10 ]==============================================================================


equal(textile.convert( // The textile

  "Math fact: 3 &lt; 5 &amp; 5 &gt; 3 but &pound;6 &#62; $6. Oh, and 2 &divide; 4 is &frac12;."

), // Should output

  "<p>Math fact: 3 &lt; 5 &amp; 5 &gt; 3 but &pound;6 &#62; $6. Oh, and 2 &divide; 4 is &frac12;.</p>"

,"preservation of existing entities");


// =[ 11 ]==============================================================================


equal(textile.convert( // The textile

  "bc. Math fact: 3 &lt; 5 &amp; 5 &gt; 3 but &pound;5 &#62; $5."

), // Should output

  "<pre><code>Math fact: 3 &amp;lt; 5 &amp;amp; 5 &amp;gt; 3 but &amp;pound;5 &amp;#62; $5.</code></pre>"

,"escaping of existing entities in blockcode");


// =[ 12 ]==============================================================================


equal(textile.convert( // The textile

  "<pre>\n"+
  "<code>\n"+
  "# *test*\n"+
  "__not italics__\n"+
  "no hard breaks\n"+
  "</code>\n"+
  "</pre>"

), // Should output

  "<pre>\n"+
  "<code>\n"+
  "# *test*\n"+
  "__not italics__\n"+
  "no hard breaks\n"+
  "</code>\n"+
  "</pre>"

,"no formatting within pre");


// =[ 13 ]==============================================================================


equal(textile.convert( // The textile

  "bc. __not italics__"

), // Should output

  "<pre><code>__not italics__</code></pre>"

,"no formatting within blockcode");


// =[ 14 ]==============================================================================


equal(textile.convert( // The textile

  "p. Regular paragraph\n"+
  "\n"+
  "==Escaped portion -- will not be formatted by Textile at all==\n"+
  "\n"+
  "p. Back to normal."

), // Should output

  "<p>Regular paragraph</p>\n"+
  "<p>Escaped portion -- will not be formatted by Textile at all</p>\n"+
  "<p>Back to normal.</p>"

,"double-equals as inline notextile");


// =[ 15 ]==============================================================================


equal(textile.convert( // The textile

  "<notextile>\n"+
  "# *test*\n"+
  "</notextile>"

), // Should output

  "# *test*"

,"notextile tags");


// =[ 16 ]==============================================================================


equal(textile.convert( // The textile

  "<notextile>\n"+
  "# *test*"

), // Should output

  "<p><notextile></p>\n"+
  "<ol>\n"+
  "\t<li><strong>test</strong></li>\n"+
  "</ol>"

,"unfinished notextile tag");


// =[ 17 ]==============================================================================


equal(textile.convert( // The textile

  "<script>\n"+
  "function main(){}"

), // Should output

  "<script><br />\n"+
  "function main(){}"

,"unfinished script tag");


// =[ 18 ]==============================================================================


equal(textile.convert( // The textile

  "This is how you make a link: <notextile>\"link\":http://www.redcloth.org</notextile>"

), // Should output

  "<p>This is how you make a link: \"link\":http://www.redcloth.org</p>"

,"inline notextile tags");


// =[ 19 ]==============================================================================


equal(textile.convert( // The textile

  "* @foo@\n"+
  "* @bar@\n"+
  "* and @x@ is also.\n"+
  ""

), // Should output

  "<ul>\n"+
  "\t<li><code>foo</code></li>\n"+
  "\t<li><code>bar</code></li>\n"+
  "\t<li>and <code>x</code> is also.</li>\n"+
  "</ul>"

,"code in list items");


// =[ 20 ]==============================================================================


equal(textile.convert( // The textile

  "If you have a line or two of code or HTML to embed, use extended block code like so:\n"+
  "\n"+
  "bc.. ./foo.pl%\n"+
  "<p>foo outputs an HTML paragraph</p>\n"+
  "\n"+
  "<p>block of code keeps going until a different block signature is encountered</p>\n"+
  "\n"+
  "p. And then go back with a normal paragraph."

), // Should output

  "<p>If you have a line or two of code or <span class=\"caps\">HTML</span> to embed, use extended block code like so:</p>\n"+
  "<pre><code>./foo.pl%\n"+
  "&lt;p&gt;foo outputs an HTML paragraph&lt;/p&gt;</code>\n"+
  "\n"+
  "<code>&lt;p&gt;block of code keeps going until a different block signature is encountered&lt;/p&gt;</code></pre>\n"+
  "<p>And then go back with a normal paragraph.</p>"

,"extended block code");


// =[ 21 ]==============================================================================


equal(textile.convert( // The textile

  "bc.. class Foo\n"+
  "    def bar\n"+
  "        'bar'\n"+
  "    end\n"+
  "\n"+
  "    def baz\n"+
  "        'baz'\n"+
  "    end\n"+
  "end\n"+
  "\n"+
  "p. That's it!"

), // Should output

  "<pre><code>class Foo\n"+
  "    def bar\n"+
  "        'bar'\n"+
  "    end</code>\n"+
  "\n"+
  "<code>    def baz\n"+
  "        'baz'\n"+
  "    end\n"+
  "end</code></pre>\n"+
  "<p>That&#8217;s it!</p>"

,"extended block code preserves leading whitespace after blank line");


// =[ 22 ]==============================================================================


equal(textile.convert( // The textile

  "bc. A one-liner: @ruby -ne '($h||={}).fetch($_){puts $h[$_]=$_}'@"

), // Should output

  "<pre><code>A one-liner: @ruby -ne '($h||={}).fetch($_){puts $h[$_]=$_}'@</code></pre>"

,"block code containing code avoids nesting code tags");


// =[ 23 ]==============================================================================


equal(textile.convert( // The textile

  "bc. I saw a ship. It ate my elephant."

), // Should output

  "<pre><code>I saw a ship. It ate my elephant.</code></pre>"

,"block code containing block start");


// =[ 24 ]==============================================================================


equal(textile.convert( // The textile

  "bc.. This is an extended bc.\n"+
  "\n"+
  "I saw a ship. It ate my elephant."

), // Should output

  "<pre><code>This is an extended bc.</code>\n"+
  "\n"+
  "<code>I saw a ship. It ate my elephant.</code></pre>"

,"extended block code containing block start");


// =[ 25 ]==============================================================================


equal(textile.convert( // The textile

  "bc. Can I talk about <h2>Headings</h2> here?"

), // Should output

  "<pre><code>Can I talk about &lt;h2&gt;Headings&lt;/h2&gt; here?</code></pre>"

,"block containing html tags");


// =[ 30 ]==============================================================================


equal(textile.convert( // The textile

  "<pre><code>This is a pre that will go unfinished"

), // Should output

  "<pre><code>This is a pre that will go unfinished"

,"unclosed pre tag");


// =[ 31 ]==============================================================================


equal(textile.convert( // The textile

  "This is a some <code>code that will go unfinished"

), // Should output

  "<p>This is a some <code>code that will go unfinished</p>"

,"unclosed code tag");


// =[ 32 ]==============================================================================


equal(textile.convert( // The textile

  "p. @some_method(some_params, some => test);@ Oh dear this fails"

), // Should output

  "<p><code>some_method(some_params, some =&gt; test);</code> Oh dear this fails</p>"

,"code containing parentheses");


// =[ 33 ]==============================================================================


equal(textile.convert( // The textile

  "@[project]_dff.skjd@"

), // Should output

  "<p><code>[project]_dff.skjd</code></p>"

,"code preserves initial square brackets");


// =[ 34 ]==============================================================================


equal(textile.convert( // The textile

  "Some [@code@] and some [@more code@]."

), // Should output

  "<p>Some <code>code</code> and some <code>more code</code>.</p>"

,"following also bracketed code in same line");


});

