// lists.yml
import test from 'ava';
import textile from '../src';

test( 'code in bullet list', function ( t ) {
  let tx = "* command run: @time ruby run-tests.rb > toto@";
  t.is( textile.convert( tx ),
    "<ul>\n\
\t<li>command run: <code>time ruby run-tests.rb &gt; toto</code></li>\n\
</ul>", tx );
});


test( 'hard break in list', function ( t ) {
  let tx = "* first line\n\
* second\n\
  line\n\
* third line";
  t.is( textile.convert( tx ),
    "<ul>\n\
\t<li>first line</li>\n\
\t<li>second<br />\n\
line</li>\n\
\t<li>third line</li>\n\
</ul>", tx );
});


test( 'mixed nesting', function ( t ) {
  let tx = "* bullet\n\
*# number\n\
*# number\n\
*#* bullet\n\
*# number\n\
*# number with\n\
a break\n\
* bullet\n\
** okay";
  t.is( textile.convert( tx ),
    "<ul>\n\
\t<li>bullet\n\
\t<ol>\n\
\t\t<li>number</li>\n\
\t\t<li>number\n\
\t\t<ul>\n\
\t\t\t<li>bullet</li>\n\
\t\t</ul></li>\n\
\t\t<li>number</li>\n\
\t\t<li>number with<br />\n\
a break</li>\n\
\t</ol></li>\n\
\t<li>bullet\n\
\t<ul>\n\
\t\t<li>okay</li>\n\
\t</ul></li>\n\
</ul>", tx );
});


test( 'list continuation', function ( t ) {
  let tx = "# one\n\
# two\n\
# three\n\n\
# one\n\
# two\n\
# three\n\n\
#_ four\n\
# five\n\
# six";
  t.is( textile.convert( tx ),
    "<ol>\n\
\t<li>one</li>\n\
\t<li>two</li>\n\
\t<li>three</li>\n\
</ol>\n\
<ol>\n\
\t<li>one</li>\n\
\t<li>two</li>\n\
\t<li>three</li>\n\
</ol>\n\
<ol start=\"4\">\n\
\t<li>four</li>\n\
\t<li>five</li>\n\
\t<li>six</li>\n\
</ol>", tx );
});


test( 'continue after break', function ( t ) {
  let tx = "# one\n\
# two\n\
# three\n\n\
test\n\n\
#_ four\n\
# five\n\
# six\n\n\
test\n\n\
#_ seven\n\
# eight\n\
# nine";
  t.is( textile.convert( tx ),
    "<ol>\n\
\t<li>one</li>\n\
\t<li>two</li>\n\
\t<li>three</li>\n\
</ol>\n\
<p>test</p>\n\
<ol start=\"4\">\n\
\t<li>four</li>\n\
\t<li>five</li>\n\
\t<li>six</li>\n\
</ol>\n\
<p>test</p>\n\
<ol start=\"7\">\n\
\t<li>seven</li>\n\
\t<li>eight</li>\n\
\t<li>nine</li>\n\
</ol>", tx );
});


test( 'continue list when prior list contained nested list', function ( t ) {
  let tx = "# one\n\
# two\n\
# three\n\n\
#_ four\n\
# five\n\
## sub-note\n\
## another sub-note\n\
# six\n\n\
#_ seven\n\
# eight\n\
# nine";
  t.is( textile.convert( tx ),
    "<ol>\n\
\t<li>one</li>\n\
\t<li>two</li>\n\
\t<li>three</li>\n\
</ol>\n\
<ol start=\"4\">\n\
\t<li>four</li>\n\
\t<li>five\n\
\t<ol>\n\
\t\t<li>sub-note</li>\n\
\t\t<li>another sub-note</li>\n\
\t</ol></li>\n\
\t<li>six</li>\n\
</ol>\n\
<ol start=\"7\">\n\
\t<li>seven</li>\n\
\t<li>eight</li>\n\
\t<li>nine</li>\n\
</ol>", tx );
});


test( 'list start number', function ( t ) {
  let tx = "#293 two ninety three\n\
# two ninety four\n\
# two ninety five\n\n\
#9 nine\n\
# ten\n\
# eleven";
  t.is( textile.convert( tx ),
    "<ol start=\"293\">\n\
\t<li>two ninety three</li>\n\
\t<li>two ninety four</li>\n\
\t<li>two ninety five</li>\n\
</ol>\n\
<ol start=\"9\">\n\
\t<li>nine</li>\n\
\t<li>ten</li>\n\
\t<li>eleven</li>\n\
</ol>", tx );
});


test( 'continue list after started list', function ( t ) {
  let tx = "#9 nine\n\
# ten\n\
# eleven\n\n\
#_ twelve\n\
# thirteen\n\
# fourteen";
  t.is( textile.convert( tx ),
    "<ol start=\"9\">\n\
\t<li>nine</li>\n\
\t<li>ten</li>\n\
\t<li>eleven</li>\n\
</ol>\n\
<ol start=\"12\">\n\
\t<li>twelve</li>\n\
\t<li>thirteen</li>\n\
\t<li>fourteen</li>\n\
</ol>", tx );
});


test( 'end notes', function ( t ) {
  let tx = "h2. End Notes\n\n\
# End Notes should be a numbered list\n\
# Like this\n\
# They must have anchors in the text\n\n\
h2. See Also\n\n\
* See Also notes should be bullets\n\
* Like this\n\
";
  t.is( textile.convert( tx ),
    "<h2>End Notes</h2>\n\
<ol>\n\
\t<li>End Notes should be a numbered list</li>\n\
\t<li>Like this</li>\n\
\t<li>They must have anchors in the text</li>\n\
</ol>\n\
<h2>See Also</h2>\n\
<ul>\n\
\t<li>See Also notes should be bullets</li>\n\
\t<li>Like this</li>\n\
</ul>", tx );
});


test( 'ordered list immediately following paragraph', function ( t ) {
  let tx = "A simple example.\n\
# One\n\
# Two";
  t.is( textile.convert( tx ),
    "<p>A simple example.</p>\n\
<ol>\n\
\t<li>One</li>\n\
\t<li>Two</li>\n\
</ol>", tx );
});


test( 'unordered list immediately following paragraph', function ( t ) {
  let tx = "A simple example.\n\
* One\n\
* Two";
  t.is( textile.convert( tx ),
    "<p>A simple example.</p>\n\
<ul>\n\
\t<li>One</li>\n\
\t<li>Two</li>\n\
</ul>", tx );
});


test( 'ordered list immediately following extended block', function ( t ) {
  let tx = "div.. Here it comes.\n\n\
A simple example.\n\
# One\n\
# Two";
  t.is( textile.convert( tx ),
    "<div>Here it comes.</div>\n\
<div>A simple example.</div>\n\
<ol>\n\
\t<li>One</li>\n\
\t<li>Two</li>\n\
</ol>", tx );
});


test( 'unordered list immediately following extended block', function ( t ) {
  let tx = "div.. Here it comes.\n\n\
A simple example.\n\
* One\n\
* Two";
  t.is( textile.convert( tx ),
    "<div>Here it comes.</div>\n\
<div>A simple example.</div>\n\
<ul>\n\
\t<li>One</li>\n\
\t<li>Two</li>\n\
</ul>", tx );
});


test( 'unordered with classes', function ( t ) {
  let tx = "*(class-one) one\n\
*(class-two) two\n\
*(class-three) three";
  t.is( textile.convert( tx ),
    "<ul>\n\
\t<li class=\"class-one\">one</li>\n\
\t<li class=\"class-two\">two</li>\n\
\t<li class=\"class-three\">three</li>\n\
</ul>", tx );
});


test( 'unordered with alignments', function ( t ) {
  let tx = "*< one\n\
*> two\n\
*<> three\n\
*= four";
  t.is( textile.convert( tx ),
    "<ul>\n\
\t<li style=\"text-align:left\">one</li>\n\
\t<li style=\"text-align:right\">two</li>\n\
\t<li style=\"text-align:justify\">three</li>\n\
\t<li style=\"text-align:center\">four</li>\n\
</ul>", tx );
});


test( 'with attributes that apply to the whole list', function ( t ) {
  let tx = "#(class#id) one\n\
# two\n\
# three";
  t.is( textile.convert( tx ),
    "<ol class=\"class\" id=\"id\">\n\
\t<li>one</li>\n\
\t<li>two</li>\n\
\t<li>three</li>\n\
</ol>", tx );
});


test( 'with id on the list', function ( t ) {
  let tx = "#(#my-id) one\n\
# two\n\
# three";
  t.is( textile.convert( tx ),
    "<ol id=\"my-id\">\n\
\t<li>one</li>\n\
\t<li>two</li>\n\
\t<li>three</li>\n\
</ol>", tx );
});


test( 'with class on the list', function ( t ) {
  let tx = "#(my-class) one\n\
# two\n\
# three";
  t.is( textile.convert( tx ),
    "<ol class=\"my-class\">\n\
\t<li>one</li>\n\
\t<li>two</li>\n\
\t<li>three</li>\n\
</ol>", tx );
});


test( 'with id on the list item', function ( t ) {
  let tx = "# one\n\
#(#my-item) two\n\
# three";
  t.is( textile.convert( tx ),
    "<ol>\n\
\t<li>one</li>\n\
\t<li id=\"my-item\">two</li>\n\
\t<li>three</li>\n\
</ol>", tx );
});


test( 'with attributes that apply to the first list item', function ( t ) {
  let tx = "#.\n\
#(class#id) one\n\
# two\n\
# three";
  t.is( textile.convert( tx ),
    "<ol>\n\
\t<li class=\"class\" id=\"id\">one</li>\n\
\t<li>two</li>\n\
\t<li>three</li>\n\
</ol>", tx );
});


test( 'changed from textism basics', function ( t ) {
  let tx = "#{color:blue}.\n\
# one\n\
# two\n\
# three";
  t.is( textile.convert( tx ),
    "<ol style=\"color:blue\">\n\
\t<li>one</li>\n\
\t<li>two</li>\n\
\t<li>three</li>\n\
</ol>", tx );
});


test( 'item and list attributes', function ( t ) {
  let tx = "#(class#id).\n\
#(first) Item 1\n\
#(second) Item 2\n\
#(third) Item 3";
  t.is( textile.convert( tx ),
    "<ol class=\"class\" id=\"id\">\n\
\t<li class=\"first\">Item 1</li>\n\
\t<li class=\"second\">Item 2</li>\n\
\t<li class=\"third\">Item 3</li>\n\
</ol>", tx );
});


test( 'with one padding-left increment', function ( t ) {
  let tx = "#( one";
  t.is( textile.convert( tx ),
    "<ol style=\"padding-left:1em\">\n\
\t<li>one</li>\n\
</ol>", tx );
});


test( 'with two padding-left increments', function ( t ) {
  let tx = "#(( two";
  t.is( textile.convert( tx ),
    "<ol style=\"padding-left:2em\">\n\
\t<li>two</li>\n\
</ol>", tx );
});


test( 'with one padding-right increment', function ( t ) {
  let tx = "#) one";
  t.is( textile.convert( tx ),
    "<ol style=\"padding-right:1em\">\n\
\t<li>one</li>\n\
</ol>", tx );
});


test( 'with padding-left and padding-right increments', function ( t ) {
  let tx = "#() two";
  t.is( textile.convert( tx ),
    "<ol style=\"padding-left:1em;padding-right:1em\">\n\
\t<li>two</li>\n\
</ol>", tx );
});


test( 'with padding-left and padding-right increments switched', function ( t ) {
  let tx = "#)( two";
  t.is( textile.convert( tx ),
    "<ol style=\"padding-right:1em;padding-left:1em\">\n\
\t<li>two</li>\n\
</ol>", tx );
});


test( 'list control items occuring-mid list should be ignored', function ( t ) {
  let tx = "# one\n\
# two\n\
#.\n\
# tree";
  t.is( textile.convert( tx ),
    "<ol>\n\
\t<li>one</li>\n\
\t<li>two</li>\n\
\t<li>tree</li>\n\
</ol>", tx );
});


test( 'complicated case with continues and classes', function ( t ) {
  let tx = "#(class#id).\n\
#(first) Item 1\n\
##.\n\
##(sub1) Sub item 1\n\
## Sub item 2\n\
#(second) Item 2\n\
##_(sub3) Sub item 3\n\
## Sub item 4\n\n\
#_(third) Item 3\n\
##_(sub5) Sub item 5\n\
## Sub item 6";
  t.is( textile.convert( tx ),
    "<ol class=\"class\" id=\"id\">\n\
\t<li class=\"first\">Item 1\n\
\t<ol>\n\
\t\t<li class=\"sub1\">Sub item 1</li>\n\
\t\t<li>Sub item 2</li>\n\
\t</ol></li>\n\
\t<li class=\"second\">Item 2\n\
\t<ol start=\"3\" class=\"sub3\">\n\
\t\t<li>Sub item 3</li>\n\
\t\t<li>Sub item 4</li>\n\
\t</ol></li>\n\
</ol>\n\
<ol start=\"3\" class=\"third\">\n\
\t<li>Item 3\n\
\t<ol start=\"5\" class=\"sub5\">\n\
\t\t<li>Sub item 5</li>\n\
\t\t<li>Sub item 6</li>\n\
\t</ol></li>\n\
</ol>", tx );
});

