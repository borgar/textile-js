test('textism.yml', function () {


// =[ 1 ]==============================================================================


equal(textile.convert( // The textile

  "h1. Header 1"

), // Should output

  "<h1>Header 1</h1>"

,"header one");


// =[ 2 ]==============================================================================


equal(textile.convert( // The textile

  "h2. Header 2"

), // Should output

  "<h2>Header 2</h2>"

,"header two");


// =[ 3 ]==============================================================================


equal(textile.convert( // The textile

  "h3. Header 3"

), // Should output

  "<h3>Header 3</h3>"

,"header three");


// =[ 4 ]==============================================================================


equal(textile.convert( // The textile

  "h4. Header 4"

), // Should output

  "<h4>Header 4</h4>"

,"header four");


// =[ 5 ]==============================================================================


equal(textile.convert( // The textile

  "h5. Header 5"

), // Should output

  "<h5>Header 5</h5>"

,"header five");


// =[ 6 ]==============================================================================


equal(textile.convert( // The textile

  "h6. Header 6"

), // Should output

  "<h6>Header 6</h6>"

,"header six");


// =[ 7 ]==============================================================================


equal(textile.convert( // The textile

  "Any old text.\n"+
  "\n"+
  "bq. A block quotation.\n"+
  "\n"+
  "Any old text.\n"+
  ""

), // Should output

  "<p>Any old text.</p>\n"+
  "<blockquote>\n"+
  "<p>A block quotation.</p>\n"+
  "</blockquote>\n"+
  "<p>Any old text.</p>"

,"blockquote");


// =[ 8 ]==============================================================================


equal(textile.convert( // The textile

  "# A first item\n"+
  "# A second item\n"+
  "# A third item\n"+
  "# A fourth item"

), // Should output

  "<ol>\n"+
  "\t<li>A first item</li>\n"+
  "\t<li>A second item</li>\n"+
  "\t<li>A third item</li>\n"+
  "\t<li>A fourth item</li>\n"+
  "</ol>");


// =[ 9 ]==============================================================================


equal(textile.convert( // The textile

  "* A first item\n"+
  "* A second item\n"+
  "* A third item\n"+
  "* A fourth item\n"+
  ""

), // Should output

  "<ul>\n"+
  "\t<li>A first item</li>\n"+
  "\t<li>A second item</li>\n"+
  "\t<li>A third item</li>\n"+
  "\t<li>A fourth item</li>\n"+
  "</ul>");


// =[ 10 ]==============================================================================


equal(textile.convert( // The textile

  "_a phrase_"

), // Should output

  "<p><em>a phrase</em></p>");


// =[ 11 ]==============================================================================


equal(textile.convert( // The textile

  "__a phrase__"

), // Should output

  "<p><i>a phrase</i></p>");


// =[ 12 ]==============================================================================


equal(textile.convert( // The textile

  "*a phrase*"

), // Should output

  "<p><strong>a phrase</strong></p>");


// =[ 13 ]==============================================================================


equal(textile.convert( // The textile

  "**a phrase**"

), // Should output

  "<p><b>a phrase</b></p>");


// =[ 14 ]==============================================================================


equal(textile.convert( // The textile

  "Nabokov's ??Pnin??"

), // Should output

  "<p>Nabokov&#8217;s <cite>Pnin</cite></p>");


// =[ 15 ]==============================================================================


equal(textile.convert( // The textile

  "A very [-extra-]ordinary day."

), // Should output

  "<p>A very <del>extra</del>ordinary day.</p>"

,"del part of word");


// =[ 16 ]==============================================================================


equal(textile.convert( // The textile

  "An [-extra-extra-]ordinary day."

), // Should output

  "<p>An <del>extra-extra</del>ordinary day.</p>"

,"del part of word that contains a hyphen");


// =[ 17 ]==============================================================================


equal(textile.convert( // The textile

  "Delete -a phrase- this way."

), // Should output

  "<p>Delete <del>a phrase</del> this way.</p>"

,"del a phrase");


// =[ 18 ]==============================================================================


equal(textile.convert( // The textile

  "Delete -a no-nonsense phrase- this way."

), // Should output

  "<p>Delete <del>a no-nonsense phrase</del> this way.</p>"

,"del a phrase that contains hyphens");


// =[ 19 ]==============================================================================


equal(textile.convert( // The textile

  "+a phrase+"

), // Should output

  "<p><ins>a phrase</ins></p>");


// =[ 20 ]==============================================================================


equal(textile.convert( // The textile

  "^a phrase^"

), // Should output

  "<p><sup>a phrase</sup></p>");


// =[ 21 ]==============================================================================


equal(textile.convert( // The textile

  "~a phrase~"

), // Should output

  "<p><sub>a phrase</sub></p>");


// =[ 22 ]==============================================================================


equal(textile.convert( // The textile

  "%(myclass)SPAN%"

), // Should output

  "<p><span class=\"myclass\"><span class=\"caps\">SPAN</span></span></p>");


// =[ 23 ]==============================================================================


equal(textile.convert( // The textile

  "%{color:red}red%"

), // Should output

  "<p><span style=\"color:red\">red</span></p>");


// =[ 24 ]==============================================================================


equal(textile.convert( // The textile

  "%[fr]rouge%"

), // Should output

  "<p><span lang=\"fr\">rouge</span></p>");


// =[ 25 ]==============================================================================


equal(textile.convert( // The textile

  "_(big)red_"

), // Should output

  "<p><em class=\"big\">red</em></p>");


// =[ 26 ]==============================================================================


equal(textile.convert( // The textile

  "p=. A centered paragraph."

), // Should output

  "<p style=\"text-align:center\">A centered paragraph.</p>");


// =[ 27 ]==============================================================================


equal(textile.convert( // The textile

  "p(bob). A paragraph"

), // Should output

  "<p class=\"bob\">A paragraph</p>");


// =[ 28 ]==============================================================================


equal(textile.convert( // The textile

  "p{color:#ddd}. A paragraph"

), // Should output

  "<p style=\"color:#ddd\">A paragraph</p>");


// =[ 29 ]==============================================================================


equal(textile.convert( // The textile

  "p[fr]. A paragraph"

), // Should output

  "<p lang=\"fr\">A paragraph</p>");


// =[ 30 ]==============================================================================


equal(textile.convert( // The textile

  "h2()>. right-aligned header2, indented 1em both side"

), // Should output

  "<h2 style=\"padding-left:1em;padding-right:1em;text-align:right\">right-aligned header2, indented 1em both side</h2>");


// =[ 31 ]==============================================================================


equal(textile.convert( // The textile

  "h3=. centered header"

), // Should output

  "<h3 style=\"text-align:center\">centered header</h3>");


// =[ 32 ]==============================================================================


equal(textile.convert( // The textile

  "!>/image.gif! right-aligned image"

), // Should output

  "<p><img align=\"right\" src=\"/image.gif\" alt=\"\" /> right-aligned image</p>");


// =[ 33 ]==============================================================================


equal(textile.convert( // The textile

  "p[no]{color:red}. A Norse of a different colour."

), // Should output

  "<p style=\"color:red\" lang=\"no\">A Norse of a different colour.</p>");


// =[ 34 ]==============================================================================


equal(textile.convert( // The textile

  "|This|is|a|simple|table|\n"+
  "|This|is|a|simple|row|"

), // Should output

  "<table>\n"+
  "\t<tr>\n"+
  "\t\t<td>This</td>\n"+
  "\t\t<td>is</td>\n"+
  "\t\t<td>a</td>\n"+
  "\t\t<td>simple</td>\n"+
  "\t\t<td>table</td>\n"+
  "\t</tr>\n"+
  "\t<tr>\n"+
  "\t\t<td>This</td>\n"+
  "\t\t<td>is</td>\n"+
  "\t\t<td>a</td>\n"+
  "\t\t<td>simple</td>\n"+
  "\t\t<td>row</td>\n"+
  "\t</tr>\n"+
  "</table>");


// =[ 35 ]==============================================================================


equal(textile.convert( // The textile

  "table{border:1px solid black}.\n"+
  "|This|is|a|row|\n"+
  "|This|is|a|row|"

), // Should output

  "<table style=\"border:1px solid black\">\n"+
  "\t<tr>\n"+
  "\t\t<td>This</td>\n"+
  "\t\t<td>is</td>\n"+
  "\t\t<td>a</td>\n"+
  "\t\t<td>row</td>\n"+
  "\t</tr>\n"+
  "\t<tr>\n"+
  "\t\t<td>This</td>\n"+
  "\t\t<td>is</td>\n"+
  "\t\t<td>a</td>\n"+
  "\t\t<td>row</td>\n"+
  "\t</tr>\n"+
  "</table>");


// =[ 36 ]==============================================================================


equal(textile.convert( // The textile

  "{background:#ddd}. |This|is|a|row|"

), // Should output

  "<table>\n"+
  "\t<tr style=\"background:#ddd\">\n"+
  "\t\t<td>This</td>\n"+
  "\t\t<td>is</td>\n"+
  "\t\t<td>a</td>\n"+
  "\t\t<td>row</td>\n"+
  "\t</tr>\n"+
  "</table>");


// =[ 37 ]==============================================================================


equal(textile.convert( // The textile

  "|{background:#ddd}. Cell with gray background|\n"+
  "|\\2. Cell spanning 2 columns|\n"+
  "|/3. Cell spanning 3 rows|\n"+
  "|>. Right-aligned cell|"

), // Should output

  "<table>\n"+
  "\t<tr>\n"+
  "\t\t<td style=\"background:#ddd\">Cell with gray background</td>\n"+
  "\t</tr>\n"+
  "\t<tr>\n"+
  "\t\t<td colspan=\"2\">Cell spanning 2 columns</td>\n"+
  "\t</tr>\n"+
  "\t<tr>\n"+
  "\t\t<td rowspan=\"3\">Cell spanning 3 rows</td>\n"+
  "\t</tr>\n"+
  "\t<tr>\n"+
  "\t\t<td style=\"text-align:right\">Right-aligned cell</td>\n"+
  "\t</tr>\n"+
  "</table>");


// =[ 38 ]==============================================================================


equal(textile.convert( // The textile

  "h2{color:green}. This is a title\n"+
  "\n"+
  "h3. This is a subhead\n"+
  "\n"+
  "p{color:red}. This is some text of dubious character. Isn't the use of \"quotes\" just lazy writing -- and theft of 'intellectual property' besides? I think the time has come to see a block quote.\n"+
  "\n"+
  "bq[fr]. This is a block quote. I'll admit it's not the most exciting block quote ever devised.\n"+
  "\n"+
  "Simple list:\n"+
  "\n"+
  "# one\n"+
  "# two\n"+
  "# three\n"+
  "\n"+
  "Multi-level list:\n"+
  "\n"+
  "# one\n"+
  "## aye\n"+
  "## bee\n"+
  "## see\n"+
  "# two\n"+
  "## x\n"+
  "## y\n"+
  "# three\n"+
  ""

), // Should output

  "<h2 style=\"color:green\">This is a title</h2>\n"+
  "<h3>This is a subhead</h3>\n"+
  "<p style=\"color:red\">This is some text of dubious character. Isn&#8217;t the use of &#8220;quotes&#8221; just lazy writing &#8212; and theft of &#8216;intellectual property&#8217; besides? I think the time has come to see a block quote.</p>\n"+
  "<blockquote lang=\"fr\">\n"+
  "<p lang=\"fr\">This is a block quote. I&#8217;ll admit it&#8217;s not the most exciting block quote ever devised.</p>\n"+
  "</blockquote>\n"+
  "<p>Simple list:</p>\n"+
  "<ol>\n"+
  "\t<li>one</li>\n"+
  "\t<li>two</li>\n"+
  "\t<li>three</li>\n"+
  "</ol>\n"+
  "<p>Multi-level list:</p>\n"+
  "<ol>\n"+
  "\t<li>one\n"+
  "\t<ol>\n"+
  "\t\t<li>aye</li>\n"+
  "\t\t<li>bee</li>\n"+
  "\t\t<li>see</li>\n"+
  "\t</ol></li>\n"+
  "\t<li>two\n"+
  "\t<ol>\n"+
  "\t\t<li>x</li>\n"+
  "\t\t<li>y</li>\n"+
  "\t</ol></li>\n"+
  "\t<li>three</li>\n"+
  "</ol>"

,"basics");


});

