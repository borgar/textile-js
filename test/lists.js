import test from 'tape';
import textile from '../src/index.js';
// lists.yml

test('code in bullet list', t => {
  const tx = '* command run: @time ruby run-tests.rb > toto@';
  t.is(textile.convert(tx),
    `<ul>
\t<li>command run: <code>time ruby run-tests.rb &gt; toto</code></li>
</ul>`, tx);
  t.end();
});


test('hard break in list', t => {
  const tx = `* first line
* second
  line
* third line`;
  t.is(textile.convert(tx),
    `<ul>
\t<li>first line</li>
\t<li>second<br />
  line</li>
\t<li>third line</li>
</ul>`, tx);
  t.end();
});


test('mixed nesting', t => {
  const tx = `* bullet
*# number
*# number
*#* bullet
*# number
*# number with
a break
* bullet
** okay`;
  t.is(textile.convert(tx),
    `<ul>
\t<li>bullet
\t<ol>
\t\t<li>number</li>
\t\t<li>number
\t\t<ul>
\t\t\t<li>bullet</li>
\t\t</ul></li>
\t\t<li>number</li>
\t\t<li>number with<br />
a break</li>
\t</ol></li>
\t<li>bullet
\t<ul>
\t\t<li>okay</li>
\t</ul></li>
</ul>`, tx);
  t.end();
});


test('list continuation', t => {
  const tx = `# one
# two
# three

# one
# two
# three

#_ four
# five
# six`;
  t.is(textile.convert(tx),
    `<ol>
\t<li>one</li>
\t<li>two</li>
\t<li>three</li>
</ol>
<ol>
\t<li>one</li>
\t<li>two</li>
\t<li>three</li>
</ol>
<ol start="4">
\t<li>four</li>
\t<li>five</li>
\t<li>six</li>
</ol>`, tx);
  t.end();
});


test('continue after break', t => {
  const tx = `# one
# two
# three

test

#_ four
# five
# six

test

#_ seven
# eight
# nine`;
  t.is(textile.convert(tx),
    `<ol>
\t<li>one</li>
\t<li>two</li>
\t<li>three</li>
</ol>
<p>test</p>
<ol start="4">
\t<li>four</li>
\t<li>five</li>
\t<li>six</li>
</ol>
<p>test</p>
<ol start="7">
\t<li>seven</li>
\t<li>eight</li>
\t<li>nine</li>
</ol>`, tx);
  t.end();
});


test('continue list when prior list contained nested list', t => {
  const tx = `# one
# two
# three

#_ four
# five
## sub-note
## another sub-note
# six

#_ seven
# eight
# nine`;
  t.is(textile.convert(tx),
    `<ol>
\t<li>one</li>
\t<li>two</li>
\t<li>three</li>
</ol>
<ol start="4">
\t<li>four</li>
\t<li>five
\t<ol>
\t\t<li>sub-note</li>
\t\t<li>another sub-note</li>
\t</ol></li>
\t<li>six</li>
</ol>
<ol start="7">
\t<li>seven</li>
\t<li>eight</li>
\t<li>nine</li>
</ol>`, tx);
  t.end();
});


test('list start number', t => {
  const tx = `#293 two ninety three
# two ninety four
# two ninety five

#9 nine
# ten
# eleven`;
  t.is(textile.convert(tx),
    `<ol start="293">
\t<li>two ninety three</li>
\t<li>two ninety four</li>
\t<li>two ninety five</li>
</ol>
<ol start="9">
\t<li>nine</li>
\t<li>ten</li>
\t<li>eleven</li>
</ol>`, tx);
  t.end();
});


test('continue list after started list', t => {
  const tx = `#9 nine
# ten
# eleven

#_ twelve
# thirteen
# fourteen`;
  t.is(textile.convert(tx),
    `<ol start="9">
\t<li>nine</li>
\t<li>ten</li>
\t<li>eleven</li>
</ol>
<ol start="12">
\t<li>twelve</li>
\t<li>thirteen</li>
\t<li>fourteen</li>
</ol>`, tx);
  t.end();
});


test('end notes', t => {
  const tx = `h2. End Notes

# End Notes should be a numbered list
# Like this
# They must have anchors in the text

h2. See Also

* See Also notes should be bullets
* Like this
`;
  t.is(textile.convert(tx),
    `<h2>End Notes</h2>
<ol>
\t<li>End Notes should be a numbered list</li>
\t<li>Like this</li>
\t<li>They must have anchors in the text</li>
</ol>
<h2>See Also</h2>
<ul>
\t<li>See Also notes should be bullets</li>
\t<li>Like this</li>
</ul>`, tx);
  t.end();
});


test('ordered list immediately following paragraph', t => {
  const tx = `A simple example.
# One
# Two`;
  t.is(textile.convert(tx),
    `<p>A simple example.</p>
<ol>
\t<li>One</li>
\t<li>Two</li>
</ol>`, tx);
  t.end();
});


test('unordered list immediately following paragraph', t => {
  const tx = `A simple example.
* One
* Two`;
  t.is(textile.convert(tx),
    `<p>A simple example.</p>
<ul>
\t<li>One</li>
\t<li>Two</li>
</ul>`, tx);
  t.end();
});


test('ordered list immediately following extended block', t => {
  const tx = `div.. Here it comes.

A simple example.
# One
# Two`;
  t.is(textile.convert(tx),
    `<div>Here it comes.</div>
<div>A simple example.</div>
<ol>
\t<li>One</li>
\t<li>Two</li>
</ol>`, tx);
  t.end();
});


test('unordered list immediately following extended block', t => {
  const tx = `div.. Here it comes.

A simple example.
* One
* Two`;
  t.is(textile.convert(tx),
    `<div>Here it comes.</div>
<div>A simple example.</div>
<ul>
\t<li>One</li>
\t<li>Two</li>
</ul>`, tx);
  t.end();
});


test('unordered with classes', t => {
  const tx = `*(class-one) one
*(class-two) two
*(class-three) three`;
  t.is(textile.convert(tx),
    `<ul>
\t<li class="class-one">one</li>
\t<li class="class-two">two</li>
\t<li class="class-three">three</li>
</ul>`, tx);
  t.end();
});


test('unordered with alignments', t => {
  const tx = `*< one
*> two
*<> three
*= four`;
  t.is(textile.convert(tx),
    `<ul>
\t<li style="text-align:left">one</li>
\t<li style="text-align:right">two</li>
\t<li style="text-align:justify">three</li>
\t<li style="text-align:center">four</li>
</ul>`, tx);
  t.end();
});


test('with attributes that apply to the whole list', t => {
  const tx = `#(class#id) one
# two
# three`;
  t.is(textile.convert(tx),
    `<ol class="class" id="id">
\t<li>one</li>
\t<li>two</li>
\t<li>three</li>
</ol>`, tx);
  t.end();
});


test('with id on the list', t => {
  const tx = `#(#my-id) one
# two
# three`;
  t.is(textile.convert(tx),
    `<ol id="my-id">
\t<li>one</li>
\t<li>two</li>
\t<li>three</li>
</ol>`, tx);
  t.end();
});


test('with class on the list', t => {
  const tx = `#(my-class) one
# two
# three`;
  t.is(textile.convert(tx),
    `<ol class="my-class">
\t<li>one</li>
\t<li>two</li>
\t<li>three</li>
</ol>`, tx);
  t.end();
});


test('with id on the list item', t => {
  const tx = `# one
#(#my-item) two
# three`;
  t.is(textile.convert(tx),
    `<ol>
\t<li>one</li>
\t<li id="my-item">two</li>
\t<li>three</li>
</ol>`, tx);
  t.end();
});


test('with attributes that apply to the first list item', t => {
  const tx = `#.
#(class#id) one
# two
# three`;
  t.is(textile.convert(tx),
    `<ol>
\t<li class="class" id="id">one</li>
\t<li>two</li>
\t<li>three</li>
</ol>`, tx);
  t.end();
});


test('changed from textism basics', t => {
  const tx = `#{color:blue}.
# one
# two
# three`;
  t.is(textile.convert(tx),
    `<ol style="color:blue">
\t<li>one</li>
\t<li>two</li>
\t<li>three</li>
</ol>`, tx);
  t.end();
});


test('item and list attributes', t => {
  const tx = `#(class#id).
#(first) Item 1
#(second) Item 2
#(third) Item 3`;
  t.is(textile.convert(tx),
    `<ol class="class" id="id">
\t<li class="first">Item 1</li>
\t<li class="second">Item 2</li>
\t<li class="third">Item 3</li>
</ol>`, tx);
  t.end();
});


test('with one padding-left increment', t => {
  const tx = '#( one';
  t.is(textile.convert(tx),
    `<ol style="padding-left:1em">
\t<li>one</li>
</ol>`, tx);
  t.end();
});


test('with two padding-left increments', t => {
  const tx = '#(( two';
  t.is(textile.convert(tx),
    `<ol style="padding-left:2em">
\t<li>two</li>
</ol>`, tx);
  t.end();
});


test('with one padding-right increment', t => {
  const tx = '#) one';
  t.is(textile.convert(tx),
    `<ol style="padding-right:1em">
\t<li>one</li>
</ol>`, tx);
  t.end();
});


test('with padding-left and padding-right increments', t => {
  const tx = '#() two';
  t.is(textile.convert(tx),
    `<ol style="padding-left:1em;padding-right:1em">
\t<li>two</li>
</ol>`, tx);
  t.end();
});


test('with padding-left and padding-right increments switched', t => {
  const tx = '#)( two';
  t.is(textile.convert(tx),
    `<ol style="padding-right:1em;padding-left:1em">
\t<li>two</li>
</ol>`, tx);
  t.end();
});


test('list control items occuring-mid list should be ignored', t => {
  const tx = `# one
# two
#.
# tree`;
  t.is(textile.convert(tx),
    `<ol>
\t<li>one</li>
\t<li>two</li>
\t<li>tree</li>
</ol>`, tx);
  t.end();
});


test('complicated case with continues and classes', t => {
  const tx = `#(class#id).
#(first) Item 1
##.
##(sub1) Sub item 1
## Sub item 2
#(second) Item 2
##_(sub3) Sub item 3
## Sub item 4

#_(third) Item 3
##_(sub5) Sub item 5
## Sub item 6`;
  t.is(textile.convert(tx),
    `<ol class="class" id="id">
\t<li class="first">Item 1
\t<ol>
\t\t<li class="sub1">Sub item 1</li>
\t\t<li>Sub item 2</li>
\t</ol></li>
\t<li class="second">Item 2
\t<ol start="3" class="sub3">
\t\t<li>Sub item 3</li>
\t\t<li>Sub item 4</li>
\t</ol></li>
</ol>
<ol start="3" class="third">
\t<li>Item 3
\t<ol start="5" class="sub5">
\t\t<li>Sub item 5</li>
\t\t<li>Sub item 6</li>
\t</ol></li>
</ol>`, tx);
  t.end();
});

