test('lists.yml', function () {


// =[ 1 ]==============================================================================


equal(textile.convert( // The textile

  "* command run: @time ruby run-tests.rb > toto@"

), // Should output

  "<ul>\n"+
  "\t<li>command run: <code>time ruby run-tests.rb &gt; toto</code></li>\n"+
  "</ul>"

,"code in bullet list");


// =[ 2 ]==============================================================================


equal(textile.convert( // The textile

  "* first line\n"+
  "* second\n"+
  "  line\n"+
  "* third line"

), // Should output

  "<ul>\n"+
  "\t<li>first line</li>\n"+
  "\t<li>second<br />\n"+
  "  line</li>\n"+
  "\t<li>third line</li>\n"+
  "</ul>"

,"hard break in list");


// =[ 3 ]==============================================================================


equal(textile.convert( // The textile

  "* bullet\n"+
  "*# number\n"+
  "*# number\n"+
  "*#* bullet\n"+
  "*# number\n"+
  "*# number with\n"+
  "a break\n"+
  "* bullet\n"+
  "** okay"

), // Should output

  "<ul>\n"+
  "\t<li>bullet\n"+
  "\t<ol>\n"+
  "\t\t<li>number</li>\n"+
  "\t\t<li>number\n"+
  "\t\t<ul>\n"+
  "\t\t\t<li>bullet</li>\n"+
  "\t\t</ul></li>\n"+
  "\t\t<li>number</li>\n"+
  "\t\t<li>number with<br />\n"+
  "a break</li>\n"+
  "\t</ol></li>\n"+
  "\t<li>bullet\n"+
  "\t<ul>\n"+
  "\t\t<li>okay</li>\n"+
  "\t</ul></li>\n"+
  "</ul>"

,"mixed nesting");


// =[ 4 ]==============================================================================


equal(textile.convert( // The textile

  "# one\n"+
  "# two\n"+
  "# three\n"+
  "\n"+
  "# one\n"+
  "# two\n"+
  "# three\n"+
  "\n"+
  "#_ four\n"+
  "# five\n"+
  "# six"

), // Should output

  "<ol>\n"+
  "\t<li>one</li>\n"+
  "\t<li>two</li>\n"+
  "\t<li>three</li>\n"+
  "</ol>\n"+
  "<ol>\n"+
  "\t<li>one</li>\n"+
  "\t<li>two</li>\n"+
  "\t<li>three</li>\n"+
  "</ol>\n"+
  "<ol start=\"4\">\n"+
  "\t<li>four</li>\n"+
  "\t<li>five</li>\n"+
  "\t<li>six</li>\n"+
  "</ol>"

,"list continuation");


// =[ 5 ]==============================================================================


equal(textile.convert( // The textile

  "# one\n"+
  "# two\n"+
  "# three\n"+
  "\n"+
  "test\n"+
  "\n"+
  "#_ four\n"+
  "# five\n"+
  "# six\n"+
  "\n"+
  "test\n"+
  "\n"+
  "#_ seven\n"+
  "# eight\n"+
  "# nine"

), // Should output

  "<ol>\n"+
  "\t<li>one</li>\n"+
  "\t<li>two</li>\n"+
  "\t<li>three</li>\n"+
  "</ol>\n"+
  "<p>test</p>\n"+
  "<ol start=\"4\">\n"+
  "\t<li>four</li>\n"+
  "\t<li>five</li>\n"+
  "\t<li>six</li>\n"+
  "</ol>\n"+
  "<p>test</p>\n"+
  "<ol start=\"7\">\n"+
  "\t<li>seven</li>\n"+
  "\t<li>eight</li>\n"+
  "\t<li>nine</li>\n"+
  "</ol>"

,"continue after break");


// =[ 6 ]==============================================================================


equal(textile.convert( // The textile

  "# one\n"+
  "# two\n"+
  "# three\n"+
  "\n"+
  "#_ four\n"+
  "# five\n"+
  "## sub-note\n"+
  "## another sub-note\n"+
  "# six\n"+
  "\n"+
  "#_ seven\n"+
  "# eight\n"+
  "# nine"

), // Should output

  "<ol>\n"+
  "\t<li>one</li>\n"+
  "\t<li>two</li>\n"+
  "\t<li>three</li>\n"+
  "</ol>\n"+
  "<ol start=\"4\">\n"+
  "\t<li>four</li>\n"+
  "\t<li>five\n"+
  "\t<ol>\n"+
  "\t\t<li>sub-note</li>\n"+
  "\t\t<li>another sub-note</li>\n"+
  "\t</ol></li>\n"+
  "\t<li>six</li>\n"+
  "</ol>\n"+
  "<ol start=\"7\">\n"+
  "\t<li>seven</li>\n"+
  "\t<li>eight</li>\n"+
  "\t<li>nine</li>\n"+
  "</ol>"

,"continue list when prior list contained nested list");


// =[ 7 ]==============================================================================


equal(textile.convert( // The textile

  "#293 two ninety three\n"+
  "# two ninety four\n"+
  "# two ninety five\n"+
  "\n"+
  "#9 nine\n"+
  "# ten\n"+
  "# eleven"

), // Should output

  "<ol start=\"293\">\n"+
  "\t<li>two ninety three</li>\n"+
  "\t<li>two ninety four</li>\n"+
  "\t<li>two ninety five</li>\n"+
  "</ol>\n"+
  "<ol start=\"9\">\n"+
  "\t<li>nine</li>\n"+
  "\t<li>ten</li>\n"+
  "\t<li>eleven</li>\n"+
  "</ol>"

,"list start number");


// =[ 8 ]==============================================================================


equal(textile.convert( // The textile

  "#9 nine\n"+
  "# ten\n"+
  "# eleven\n"+
  "\n"+
  "#_ twelve\n"+
  "# thirteen\n"+
  "# fourteen"

), // Should output

  "<ol start=\"9\">\n"+
  "\t<li>nine</li>\n"+
  "\t<li>ten</li>\n"+
  "\t<li>eleven</li>\n"+
  "</ol>\n"+
  "<ol start=\"12\">\n"+
  "\t<li>twelve</li>\n"+
  "\t<li>thirteen</li>\n"+
  "\t<li>fourteen</li>\n"+
  "</ol>"

,"continue list after started list");


// =[ 9 ]==============================================================================


equal(textile.convert( // The textile

  "h2. End Notes\n"+
  "\n"+
  "# End Notes should be a numbered list\n"+
  "# Like this\n"+
  "# They must have anchors in the text\n"+
  "\n"+
  "h2. See Also\n"+
  "\n"+
  "* See Also notes should be bullets\n"+
  "* Like this\n"+
  ""

), // Should output

  "<h2>End Notes</h2>\n"+
  "<ol>\n"+
  "\t<li>End Notes should be a numbered list</li>\n"+
  "\t<li>Like this</li>\n"+
  "\t<li>They must have anchors in the text</li>\n"+
  "</ol>\n"+
  "<h2>See Also</h2>\n"+
  "<ul>\n"+
  "\t<li>See Also notes should be bullets</li>\n"+
  "\t<li>Like this</li>\n"+
  "</ul>"

,"end notes");


// =[ 10 ]==============================================================================


equal(textile.convert( // The textile

  "A simple example.\n"+
  "# One\n"+
  "# Two"

), // Should output

  "<p>A simple example.</p>\n"+
  "<ol>\n"+
  "\t<li>One</li>\n"+
  "\t<li>Two</li>\n"+
  "</ol>"

,"ordered list immediately following paragraph");


// =[ 11 ]==============================================================================


equal(textile.convert( // The textile

  "A simple example.\n"+
  "* One\n"+
  "* Two"

), // Should output

  "<p>A simple example.</p>\n"+
  "<ul>\n"+
  "\t<li>One</li>\n"+
  "\t<li>Two</li>\n"+
  "</ul>"

,"unordered list immediately following paragraph");


// =[ 12 ]==============================================================================


equal(textile.convert( // The textile

  "div.. Here it comes.\n"+
  "\n"+
  "A simple example.\n"+
  "# One\n"+
  "# Two"

), // Should output

  "<div>Here it comes.</div>\n"+
  "<div>A simple example.</div>\n"+
  "<ol>\n"+
  "\t<li>One</li>\n"+
  "\t<li>Two</li>\n"+
  "</ol>"

,"ordered list immediately following extended block");


// =[ 13 ]==============================================================================


equal(textile.convert( // The textile

  "div.. Here it comes.\n"+
  "\n"+
  "A simple example.\n"+
  "* One\n"+
  "* Two"

), // Should output

  "<div>Here it comes.</div>\n"+
  "<div>A simple example.</div>\n"+
  "<ul>\n"+
  "\t<li>One</li>\n"+
  "\t<li>Two</li>\n"+
  "</ul>"

,"unordered list immediately following extended block");


// =[ 14 ]==============================================================================


equal(textile.convert( // The textile

  " * notice the leading space\n"+
  " * RedCloth 3.0.4 used to accept it\n"+
  " * Now we do too"

), // Should output

  "<ul>\n"+
  "\t<li>notice the leading space</li>\n"+
  "\t<li>RedCloth 3.0.4 used to accept it</li>\n"+
  "\t<li>Now we do too</li>\n"+
  "</ul>"

,"unordered list with leading spaces");


// =[ 15 ]==============================================================================


equal(textile.convert( // The textile

  " # notice the leading space\n"+
  " # RedCloth 3.0.4 used to accept it\n"+
  " # Now we do too"

), // Should output

  "<ol>\n"+
  "\t<li>notice the leading space</li>\n"+
  "\t<li>RedCloth 3.0.4 used to accept it</li>\n"+
  "\t<li>Now we do too</li>\n"+
  "</ol>"

,"ordered list with leading spaces");


// =[ 16 ]==============================================================================


equal(textile.convert( // The textile

  "*(class-one) one\n"+
  "*(class-two) two\n"+
  "*(class-three) three"

), // Should output

  "<ul>\n"+
  "\t<li class=\"class-one\">one</li>\n"+
  "\t<li class=\"class-two\">two</li>\n"+
  "\t<li class=\"class-three\">three</li>\n"+
  "</ul>"

,"unordered with classes");


// =[ 17 ]==============================================================================


equal(textile.convert( // The textile

  "*< one\n"+
  "*> two\n"+
  "*<> three\n"+
  "*= four"

), // Should output

  "<ul>\n"+
  "\t<li style=\"text-align:left;\">one</li>\n"+
  "\t<li style=\"text-align:right;\">two</li>\n"+
  "\t<li style=\"text-align:justify;\">three</li>\n"+
  "\t<li style=\"text-align:center;\">four</li>\n"+
  "</ul>"

,"unordered with alignments");


// =[ 18 ]==============================================================================


equal(textile.convert( // The textile

  "(class#id)# one\n"+
  "# two\n"+
  "# three"

), // Should output

  "<ol class=\"class\" id=\"id\">\n"+
  "\t<li>one</li>\n"+
  "\t<li>two</li>\n"+
  "\t<li>three</li>\n"+
  "</ol>"

,"with attributes that apply to the whole list");


// =[ 19 ]==============================================================================


equal(textile.convert( // The textile

  "(#my-id)# one\n"+
  "# two\n"+
  "# three"

), // Should output

  "<ol id=\"my-id\">\n"+
  "\t<li>one</li>\n"+
  "\t<li>two</li>\n"+
  "\t<li>three</li>\n"+
  "</ol>"

,"with id on the list");


// =[ 20 ]==============================================================================


equal(textile.convert( // The textile

  "(my-class)# one\n"+
  "# two\n"+
  "# three"

), // Should output

  "<ol class=\"my-class\">\n"+
  "\t<li>one</li>\n"+
  "\t<li>two</li>\n"+
  "\t<li>three</li>\n"+
  "</ol>"

,"with class on the list");


// =[ 21 ]==============================================================================


equal(textile.convert( // The textile

  "# one\n"+
  "#(#my-item) two\n"+
  "# three"

), // Should output

  "<ol>\n"+
  "\t<li>one</li>\n"+
  "\t<li id=\"my-item\">two</li>\n"+
  "\t<li>three</li>\n"+
  "</ol>"

,"with id on the list item");


// =[ 22 ]==============================================================================


equal(textile.convert( // The textile

  "#(class#id) one\n"+
  "# two\n"+
  "# three"

), // Should output

  "<ol>\n"+
  "\t<li class=\"class\" id=\"id\">one</li>\n"+
  "\t<li>two</li>\n"+
  "\t<li>three</li>\n"+
  "</ol>"

,"with attributes that apply to the first list item");


// =[ 23 ]==============================================================================


equal(textile.convert( // The textile

  "{color:blue}# one\n"+
  "# two\n"+
  "# three"

), // Should output

  "<ol style=\"color:blue;\">\n"+
  "\t<li>one</li>\n"+
  "\t<li>two</li>\n"+
  "\t<li>three</li>\n"+
  "</ol>"

,"changed from textism basics");


// =[ 24 ]==============================================================================


equal(textile.convert( // The textile

  "*{color:red} Item one\n"+
  "* Item two\n"+
  "* Item three"

), // Should output

  "<ul>\n"+
  "\t<li style=\"color:red;\">Item one</li>\n"+
  "\t<li>Item two</li>\n"+
  "\t<li>Item three</li>\n"+
  "</ul>"

,"changed from threshold list attributes");


// =[ 25 ]==============================================================================


equal(textile.convert( // The textile

  "(# one"

), // Should output

  "<ol style=\"padding-left:1em;\">\n"+
  "\t<li>one</li>\n"+
  "</ol>"

,"with one padding-left increment");


// =[ 26 ]==============================================================================


equal(textile.convert( // The textile

  "((myclass)# one"

), // Should output

  "<ol style=\"padding-left:1em;\" class=\"myclass\">\n"+
  "\t<li>one</li>\n"+
  "</ol>"

,"with one padding-left increment and class");


// =[ 27 ]==============================================================================


equal(textile.convert( // The textile

  "((# two"

), // Should output

  "<ol style=\"padding-left:2em;\">\n"+
  "\t<li>two</li>\n"+
  "</ol>"

,"with two padding-left increments");


// =[ 28 ]==============================================================================


equal(textile.convert( // The textile

  ")# one"

), // Should output

  "<ol style=\"padding-right:1em;\">\n"+
  "\t<li>one</li>\n"+
  "</ol>"

,"with one padding-right increment");


// =[ 29 ]==============================================================================


equal(textile.convert( // The textile

  "()# two"

), // Should output

  "<ol style=\"padding-left:1em;padding-right:1em;\">\n"+
  "\t<li>two</li>\n"+
  "</ol>"

,"with padding-left and padding-right increments");


// =[ 30 ]==============================================================================


equal(textile.convert( // The textile

  ")(# two"

), // Should output

  "<ol style=\"padding-left:1em;padding-right:1em;\">\n"+
  "\t<li>two</li>\n"+
  "</ol>"

,"with padding-left and padding-right increments switched");


// =[ 31 ]==============================================================================


equal(textile.convert( // The textile

  "()(myclass)# two"

), // Should output

  "<ol style=\"padding-left:1em;padding-right:1em;\" class=\"myclass\">\n"+
  "\t<li>two</li>\n"+
  "</ol>\n"+
  ""

,"with padding-left and padding-right increments and class");


});

