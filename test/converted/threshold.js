test('threshold.yml', function () {


// =[ 1 ]==============================================================================


equal(textile.convert( // The textile

  "A paragraph.\n"+
  "\n"+
  "Another paragraph."

), // Should output

  "<p>A paragraph.</p>\n"+
  "<p>Another paragraph.</p>"

,"paragraph");


// =[ 2 ]==============================================================================


equal(textile.convert( // The textile

  "A paragraph with\n"+
  "a line break."

), // Should output

  "<p>A paragraph with<br />\n"+
  "a line break.</p>"

,"line breaks");


// =[ 3 ]==============================================================================


equal(textile.convert( // The textile

  "Here's some <b>bold</b> text."

), // Should output

  "<p>Here&#8217;s some <b>bold</b> text.</p>"

,"xhtml tags");


// =[ 4 ]==============================================================================


equal(textile.convert( // The textile

  " No paragraph tags here."

), // Should output

  "No paragraph tags here."

,"no paragraph tags");


// =[ 5 ]==============================================================================


equal(textile.convert( // The textile

  "\"Proceed!\" said he to the host."

), // Should output

  "<p>&#8220;Proceed!&#8221; said he to the host.</p>"

,"smart quotes");


// =[ 6 ]==============================================================================


equal(textile.convert( // The textile

  "'Proceed!' said he to the host."

), // Should output

  "<p>&#8216;Proceed!&#8217; said he to the host.</p>"

,"smart quotes 2");


// =[ 7 ]==============================================================================


equal(textile.convert( // The textile

  "\"'I swear, captain,' replied I.\""

), // Should output

  "<p>&#8220;&#8216;I swear, captain,&#8217; replied I.&#8221;</p>"

,"nested quotation marks");


// =[ 8 ]==============================================================================


equal(textile.convert( // The textile

  "'\"I swear, captain,\" replied I.'"

), // Should output

  "<p>&#8216;&#8220;I swear, captain,&#8221; replied I.&#8217;</p>"

,"nested quotation marks 2");


// =[ 9 ]==============================================================================


equal(textile.convert( // The textile

  "Greengrocers' apostrophe's."

), // Should output

  "<p>Greengrocers&#8217; apostrophe&#8217;s.</p>"

,"apostrophe glyphs");


// =[ 10 ]==============================================================================


equal(textile.convert( // The textile

  "You know the Italian proverb -- Chi ha compagno ha padrone."

), // Should output

  "<p>You know the Italian proverb &#8212; Chi ha compagno ha padrone.</p>"

,"em-dash glyphs");


// =[ 11 ]==============================================================================


equal(textile.convert( // The textile

  "You know the Italian proverb--Chi ha compagno ha padrone."

), // Should output

  "<p>You know the Italian proverb&#8212;Chi ha compagno ha padrone.</p>"

,"em-dash glyphs 2");


// =[ 12 ]==============================================================================


equal(textile.convert( // The textile

  "You know the Italian proverb - Chi ha compagno ha padrone."

), // Should output

  "<p>You know the Italian proverb &#8211; Chi ha compagno ha padrone.</p>"

,"en-dash glyphs");


// =[ 13 ]==============================================================================


equal(textile.convert( // The textile

  "Meanwhile..."

), // Should output

  "<p>Meanwhile&#8230;</p>"

,"ellipsis character");


// =[ 14 ]==============================================================================


equal(textile.convert( // The textile

  "1 x 2 x 3 = 6"

), // Should output

  "<p>1 &#215; 2 &#215; 3 = 6</p>"

,"dimension character");


// =[ 15 ]==============================================================================


equal(textile.convert( // The textile

  "1x2x3 = 6"

), // Should output

  "<p>1&#215;2&#215;3 = 6</p>"

,"dimension character 2");


// =[ 16 ]==============================================================================


equal(textile.convert( // The textile

  "Registered(r) Trademark(tm) Copyright (c)."

), // Should output

  "<p>Registered&#174; Trademark&#8482; Copyright &#169;.</p>"

,"trademark register copyright");


// =[ 17 ]==============================================================================


equal(textile.convert( // The textile

  "ABC(Always Be Closing)"

), // Should output

  "<p><acronym title=\"Always Be Closing\"><span class=\"caps\">ABC</span></acronym></p>"

,"acronyms");


// =[ 18 ]==============================================================================


equal(textile.convert( // The textile

  "IBM or HAL"

), // Should output

  "<p><span class=\"caps\">IBM</span> or <span class=\"caps\">HAL</span></p>"

,"uppercase");


// =[ 19 ]==============================================================================


equal(textile.convert( // The textile

  "The _underlying_ cause."

), // Should output

  "<p>The <em>underlying</em> cause.</p>"

,"emphasis");


// =[ 20 ]==============================================================================


equal(textile.convert( // The textile

  "The *underlying* cause."

), // Should output

  "<p>The <strong>underlying</strong> cause.</p>"

,"strong text");


// =[ 21 ]==============================================================================


equal(textile.convert( // The textile

  "The __underlying__ cause."

), // Should output

  "<p>The <i>underlying</i> cause.</p>"

,"italic text");


// =[ 22 ]==============================================================================


equal(textile.convert( // The textile

  "The **underlying** cause."

), // Should output

  "<p>The <b>underlying</b> cause.</p>"

,"bold text");


// =[ 23 ]==============================================================================


equal(textile.convert( // The textile

  "??The Count of Monte Cristo??, by Dumas."

), // Should output

  "<p><cite>The Count of Monte Cristo</cite>, by Dumas.</p>"

,"citation");


// =[ 24 ]==============================================================================


equal(textile.convert( // The textile

  "Scratch -that-, replace with +this+."

), // Should output

  "<p>Scratch <del>that</del>, replace with <ins>this</ins>.</p>"

,"inserted and deleted text");


// =[ 25 ]==============================================================================


equal(textile.convert( // The textile

  "log ~2~ n"

), // Should output

  "<p>log <sub>2</sub> n</p>"

,"subscript");


// =[ 26 ]==============================================================================


equal(textile.convert( // The textile

  "2 ^x^"

), // Should output

  "<p>2 <sup>x</sup></p>"

,"superscript");


// =[ 27 ]==============================================================================


equal(textile.convert( // The textile

  "The %underlying% cause."

), // Should output

  "<p>The <span>underlying</span> cause.</p>"

,"span tag");


// =[ 28 ]==============================================================================


equal(textile.convert( // The textile

  "About the @<hr />@ tag."

), // Should output

  "<p>About the <code>&lt;hr /&gt;</code> tag.</p>"

,"code");


// =[ 29 ]==============================================================================


equal(textile.convert( // The textile

  "\"link text\":http://example.com/"

), // Should output

  "<p><a href=\"http://example.com/\">link text</a></p>"

,"links");


// =[ 30 ]==============================================================================


equal(textile.convert( // The textile

  "\"link text\":/example"

), // Should output

  "<p><a href=\"/example\">link text</a></p>"

,"local links");


// =[ 31 ]==============================================================================


equal(textile.convert( // The textile

  "\"link text(with title)\":http://example.com/"

), // Should output

  "<p><a href=\"http://example.com/\" title=\"with title\">link text</a></p>"

,"link title");


// =[ 32 ]==============================================================================


equal(textile.convert( // The textile

  "Here's \"a link\":tstate, and\n"+
  "\"another link\":tstate to the same site.\n"+
  "\n"+
  "[tstate]http://thresholdstate.com/"

), // Should output

  "<p>Here&#8217;s <a href=\"http://thresholdstate.com/\">a link</a>, and<br />\n"+
  "<a href=\"http://thresholdstate.com/\">another link</a> to the same site.</p>"

,"link alias");


// =[ 33 ]==============================================================================


equal(textile.convert( // The textile

  "!/img.gif!"

), // Should output

  "<p><img src=\"/img.gif\" alt=\"\" /></p>"

,"image");


// =[ 34 ]==============================================================================


equal(textile.convert( // The textile

  "!http://thresholdstate.com/img.gif!"

), // Should output

  "<p><img src=\"http://thresholdstate.com/img.gif\" alt=\"\" /></p>"

,"image 2");


// =[ 35 ]==============================================================================


equal(textile.convert( // The textile

  "!/img.gif(alt text)!"

), // Should output

  "<p><img src=\"/img.gif\" title=\"alt text\" alt=\"alt text\" /></p>"

,"image alt");


// =[ 36 ]==============================================================================


equal(textile.convert( // The textile

  "!/img.gif!:http://textpattern.com/"

), // Should output

  "<p><a href=\"http://textpattern.com/\"><img src=\"/img.gif\" alt=\"\" /></a></p>"

,"image links");


// =[ 37 ]==============================================================================


equal(textile.convert( // The textile

  "h1. Heading 1"

), // Should output

  "<h1>Heading 1</h1>"

,"headers");


// =[ 38 ]==============================================================================


equal(textile.convert( // The textile

  "h2. Heading 2"

), // Should output

  "<h2>Heading 2</h2>"

,"headers 2");


// =[ 39 ]==============================================================================


equal(textile.convert( // The textile

  "h6. Heading 6"

), // Should output

  "<h6>Heading 6</h6>"

,"headers 3");


// =[ 40 ]==============================================================================


equal(textile.convert( // The textile

  "p. A paragraph.\n"+
  "Continued.\n"+
  "\n"+
  "Also a paragraph."

), // Should output

  "<p>A paragraph.<br />\n"+
  "Continued.</p>\n"+
  "<p>Also a paragraph.</p>"

,"paragraph text");


// =[ 41 ]==============================================================================


equal(textile.convert( // The textile

  "bq. A quotation.\n"+
  "Continued.\n"+
  "\n"+
  "Regular paragraph."

), // Should output

  "<blockquote>\n"+
  "<p>A quotation.<br />\n"+
  "Continued.</p>\n"+
  "</blockquote>\n"+
  "<p>Regular paragraph.</p>"

,"block quote");


// =[ 42 ]==============================================================================


equal(textile.convert( // The textile

  "bq.:http://thresholdstate.com/ A cited quotation."

), // Should output

  "<blockquote cite=\"http://thresholdstate.com/\">\n"+
  "<p>A cited quotation.</p>\n"+
  "</blockquote>"

,"block quote citation");


// =[ 43 ]==============================================================================


equal(textile.convert( // The textile

  "A footnote reference[1].\n"+
  "\n"+
  "fn1. The footnote."

), // Should output

  "<p>A footnote reference<sup class=\"footnote\" id=\"fnr1\"><a href=\"#fn1\">1</a></sup>.</p>\n"+
  "<p class=\"footnote\" id=\"fn1\"><a href=\"#fnr1\"><sup>1</sup></a> The footnote.</p>"

,"footnotes");


// =[ 44 ]==============================================================================


equal(textile.convert( // The textile

  "bc. <script>\n"+
  "// a Javascript example\n"+
  "alert(\"Hello World\");\n"+
  "</script>"

), // Should output

  "<pre><code>&lt;script&gt;\n"+
  "// a Javascript example\n"+
  "alert(\"Hello World\");\n"+
  "&lt;/script&gt;</code></pre>"

,"block code");


// =[ 45 ]==============================================================================


equal(textile.convert( // The textile

  "pre. Pre-formatted\n"+
  "text"

), // Should output

  "<pre>Pre-formatted\n"+
  "text</pre>"

,"preformatted text");


// =[ 46 ]==============================================================================


equal(textile.convert( // The textile

  "notextile. <script type=\"text/javascript\">\n"+
  "document.write(\"Hello World!\");\n"+
  "</script>\n"+
  "<noscript>Your browser doesn't support Javascript</noscript>"

), // Should output

  "<script type=\"text/javascript\">\n"+
  "document.write(\"Hello World!\");\n"+
  "</script>\n"+
  "<noscript>Your browser doesn't support Javascript</noscript>"

,"notextile");


// =[ 47 ]==============================================================================


equal(textile.convert( // The textile

  "p(myclass). My classy paragraph."

), // Should output

  "<p class=\"myclass\">My classy paragraph.</p>"

,"class attribute");


// =[ 48 ]==============================================================================


equal(textile.convert( // The textile

  "p(#myid). My ID paragraph."

), // Should output

  "<p id=\"myid\">My ID paragraph.</p>"

,"id attribute");


// =[ 49 ]==============================================================================


equal(textile.convert( // The textile

  "p{color:red}. Red rum."

), // Should output

  "<p style=\"color:red\">Red rum.</p>"

,"style attribute");


// =[ 50 ]==============================================================================


equal(textile.convert( // The textile

  "p[fr-fr]. En français."

), // Should output

  "<p lang=\"fr-fr\">En français.</p>"

,"lang attribute");


// =[ 51 ]==============================================================================


equal(textile.convert( // The textile

  "A *(myclass)classy* phrase."

), // Should output

  "<p>A <strong class=\"myclass\">classy</strong> phrase.</p>"

,"phrase modifiers");


// =[ 52 ]==============================================================================


equal(textile.convert( // The textile

  "An _(#myid2)ID_ phrase."

), // Should output

  "<p>An <em id=\"myid2\">ID</em> phrase.</p>"

,"phrase modifiers 2");


// =[ 53 ]==============================================================================


equal(textile.convert( // The textile

  "The %{color:blue}blue% room."

), // Should output

  "<p>The <span style=\"color:blue\">blue</span> room.</p>"

,"phrase modifiers 3");


// =[ 54 ]==============================================================================


equal(textile.convert( // The textile

  "p(myclass#myid3){color:green}[de-de]. A complex paragraph."

), // Should output

  "<p style=\"color:green\" class=\"myclass\" id=\"myid3\" lang=\"de-de\">A complex paragraph.</p>"

,"block and phrase attributes combined");


// =[ 55 ]==============================================================================


equal(textile.convert( // The textile

  "A ??(myclass#myid4){color:green}[de-de]complex?? phrase."

), // Should output

  "<p>A <cite style=\"color:green\" class=\"myclass\" id=\"myid4\" lang=\"de-de\">complex</cite> phrase.</p>"

,"block and phrase attributes combined 2");


// =[ 56 ]==============================================================================


equal(textile.convert( // The textile

  "bq.. A quote.\n"+
  "\n"+
  "The quote continued.\n"+
  "\n"+
  "p. Back to paragraph text."

), // Should output

  "<blockquote>\n"+
  "<p>A quote.</p>\n"+
  "<p>The quote continued.</p>\n"+
  "</blockquote>\n"+
  "<p>Back to paragraph text.</p>"

,"extended blocks");


// =[ 57 ]==============================================================================


equal(textile.convert( // The textile

  "A PHP code example.\n"+
  "\n"+
  "bc.. <?php\n"+
  "function hello() {\n"+
  "// display a hello message\n"+
  "\n"+
  "print \"Hello, World\";\n"+
  "}\n"+
  "?>\n"+
  "\n"+
  "p. Following paragraph."

), // Should output

  "<p>A <span class=\"caps\">PHP</span> code example.</p>\n"+
  "<pre><code>&lt;?php\n"+
  "function hello() {\n"+
  "// display a hello message\n"+
  "\n"+
  "print \"Hello, World\";\n"+
  "}\n"+
  "?&gt;</code></pre>\n"+
  "<p>Following paragraph.</p>"

,"extended block code");


// =[ 58 ]==============================================================================


equal(textile.convert( // The textile

  "p(myclass).. A classy paragraph.\n"+
  "\n"+
  "Another classy paragraph.\n"+
  "\n"+
  "p. Not so classy."

), // Should output

  "<p class=\"myclass\">A classy paragraph.</p>\n"+
  "<p class=\"myclass\">Another classy paragraph.</p>\n"+
  "<p>Not so classy.</p>"

,"extended block attributes");


// =[ 59 ]==============================================================================


equal(textile.convert( // The textile

  "bq(myclass).. Quote paragraph 1.\n"+
  "\n"+
  "Paragraph 2."

), // Should output

  "<blockquote class=\"myclass\">\n"+
  "<p class=\"myclass\">Quote paragraph 1.</p>\n"+
  "<p class=\"myclass\">Paragraph 2.</p>\n"+
  "</blockquote>"

,"extended block quote attributes");


// =[ 60 ]==============================================================================


equal(textile.convert( // The textile

  "bc(myclass).. Code block 1.\n"+
  "\n"+
  "Code block 2."

), // Should output

  "<pre class=\"myclass\"><code class=\"myclass\">Code block 1.\n"+
  "\n"+
  "Code block 2.</code></pre>"

,"extended block code attributes");


// =[ 61 ]==============================================================================


equal(textile.convert( // The textile

  "<b>bold</b> and <i>italic</i>, the hard way."

), // Should output

  "<p><b>bold</b> and <i>italic</i>, the hard way.</p>"

,"raw xhtml left in tact");


// =[ 62 ]==============================================================================


equal(textile.convert( // The textile

  "<div class=\"mydiv\">My div</div>"

), // Should output

  "<div class=\"mydiv\">My div</div>"

,"paragraphs entirely raw xhtml");


// =[ 63 ]==============================================================================


equal(textile.convert( // The textile

  "<img src=\"/img.gif\" alt=\"image\" />"

), // Should output

  "<p><img src=\"/img.gif\" alt=\"image\" /></p>"

,"paragraphs with inline xhtml");


// =[ 64 ]==============================================================================


equal(textile.convert( // The textile

  "<span class=\"myspan\">I'll make my own way.</span>"

), // Should output

  "<p><span class=\"myspan\">I&#8217;ll make my own way.</span></p>"

,"paragraphs with inline xhtml 2");


// =[ 65 ]==============================================================================


equal(textile.convert( // The textile

  "<div>inside</div> and outside."

), // Should output

  "<div>inside</div>\n<p>and outside.</p>"

,"paragraphs partly enclosed in xhtml block tags");


// =[ 66 ]==============================================================================


equal(textile.convert( // The textile

  " <div>\n"+
  " <span>My div</span>\n"+
  " </div>"

), // Should output

  "<div>\n"+
  "<span>My div</span>\n"+
  "</div>"

,"complex xhtml blocks");


// =[ 67 ]==============================================================================


equal(textile.convert( // The textile

  "notextile.. <div>\n"+
  "\n"+
  "<span>My div</span>\n"+
  "\n"+
  "</div>"

), // Should output

  "<div>\n"+
  "\n"+
  "<span>My div</span>\n"+
  "\n"+
  "</div>"

,"complex xhtml blocks 2");


// =[ 68 ]==============================================================================


equal(textile.convert( // The textile

  " <div>\n"+
  " <span>My *div*</span>\n"+
  " </div>"

), // Should output

  "<div>\n"+
  "<span>My <strong>div</strong></span>\n"+
  "</div>"

,"complex xhtml blocks with inline formatting");


// =[ 69 ]==============================================================================


equal(textile.convert( // The textile

  "<pre>\n"+
  "A HTML <b>example</b>\n"+
  "</pre>"

), // Should output

  "<pre>\n"+
  "A HTML &lt;b&gt;example&lt;/b&gt;\n"+
  "</pre>"

,"explicit pre escapement");


// =[ 70 ]==============================================================================


equal(textile.convert( // The textile

  "<code>\n"+
  "Another HTML <b>example</b>\n"+
  "</code>"

), // Should output

  "<p><code>\n"+
  "Another HTML &lt;b&gt;example&lt;/b&gt;\n"+
  "</code></p>"

,"explicit code escapement");


// =[ 71 ]==============================================================================


equal(textile.convert( // The textile

  "<notextile>\n"+
  "p. Leave me alone\n"+
  "</notextile>"

), // Should output

  "p. Leave me alone"

,"notextile tags");


// =[ 72 ]==============================================================================


equal(textile.convert( // The textile

  "p<. Left-aligned paragraph."

), // Should output

  "<p style=\"text-align:left\">Left-aligned paragraph.</p>"

,"left aligned text");


// =[ 73 ]==============================================================================


equal(textile.convert( // The textile

  "h3>. Right-aligned heading."

), // Should output

  "<h3 style=\"text-align:right\">Right-aligned heading.</h3>"

,"right aligned text");


// =[ 74 ]==============================================================================


equal(textile.convert( // The textile

  "p<>. Justified paragraph."

), // Should output

  "<p style=\"text-align:justify\">Justified paragraph.</p>"

,"justified text");


// =[ 75 ]==============================================================================


equal(textile.convert( // The textile

  "h3=. Centered heading."

), // Should output

  "<h3 style=\"text-align:center\">Centered heading.</h3>"

,"centered text");


// =[ 76 ]==============================================================================


equal(textile.convert( // The textile

  "p(. Left pad 1em."

), // Should output

  "<p style=\"padding-left:1em\">Left pad 1em.</p>"

,"padding");


// =[ 77 ]==============================================================================


equal(textile.convert( // The textile

  "p)). Right pad 2em."

), // Should output

  "<p style=\"padding-right:2em\">Right pad 2em.</p>"

,"padding 2");


// =[ 78 ]==============================================================================


equal(textile.convert( // The textile

  "p(). Left and right pad 1em."

), // Should output

  "<p style=\"padding-left:1em;padding-right:1em\">Left and right pad 1em.</p>"

,"padding 3");


// =[ 79 ]==============================================================================


equal(textile.convert( // The textile

  "# Item one\n"+
  "# Item two\n"+
  "# Item three"

), // Should output

  "<ol>\n"+
  "\t<li>Item one</li>\n"+
  "\t<li>Item two</li>\n"+
  "\t<li>Item three</li>\n"+
  "</ol>"

,"numeric lists");


// =[ 80 ]==============================================================================


equal(textile.convert( // The textile

  "* Item A\n"+
  "* Item B\n"+
  "* Item C"

), // Should output

  "<ul>\n"+
  "\t<li>Item A</li>\n"+
  "\t<li>Item B</li>\n"+
  "\t<li>Item C</li>\n"+
  "</ul>"

,"bulleted lists");


// =[ 81 ]==============================================================================


equal(textile.convert( // The textile

  "# Item one\n"+
  "## Item one-A\n"+
  "## Item one-B\n"+
  "### Item one-B-a\n"+
  "# Item two"

), // Should output

  "<ol>\n"+
  "\t<li>Item one\n"+
  "\t<ol>\n"+
  "\t\t<li>Item one-A</li>\n"+
  "\t\t<li>Item one-B\n"+
  "\t\t<ol>\n"+
  "\t\t\t<li>Item one-B-a</li>\n"+
  "\t\t</ol></li>\n"+
  "\t</ol></li>\n"+
  "\t<li>Item two</li>\n"+
  "</ol>"

,"nested lists");


// =[ 82 ]==============================================================================


equal(textile.convert( // The textile

  "|a|simple|table|"

), // Should output

  "<table>\n"+
  "\t<tr>\n"+
  "\t\t<td>a</td>\n"+
  "\t\t<td>simple</td>\n"+
  "\t\t<td>table</td>\n"+
  "\t</tr>\n"+
  "</table>"

,"tables");


// =[ 83 ]==============================================================================


equal(textile.convert( // The textile

  "|_. a|_. table|_. heading|\n"+
  "|a|table|row|"

), // Should output

  "<table>\n"+
  "\t<tr>\n"+
  "\t\t<th>a</th>\n"+
  "\t\t<th>table</th>\n"+
  "\t\t<th>heading</th>\n"+
  "\t</tr>\n"+
  "\t<tr>\n"+
  "\t\t<td>a</td>\n"+
  "\t\t<td>table</td>\n"+
  "\t\t<td>row</td>\n"+
  "\t</tr>\n"+
  "</table>"

,"table heading cells");


// =[ 84 ]==============================================================================


equal(textile.convert( // The textile

  "|a|{color:red}. styled|cell|"

), // Should output

  "<table>\n"+
  "\t<tr>\n"+
  "\t\t<td>a</td>\n"+
  "\t\t<td style=\"color:red\">styled</td>\n"+
  "\t\t<td>cell</td>\n"+
  "\t</tr>\n"+
  "</table>"

,"cell attributes");


// =[ 85 ]==============================================================================


equal(textile.convert( // The textile

  "(rowclass). |a|classy|row|"

), // Should output

  "<table>\n"+
  "\t<tr class=\"rowclass\">\n"+
  "\t\t<td>a</td>\n"+
  "\t\t<td>classy</td>\n"+
  "\t\t<td>row</td>\n"+
  "\t</tr>\n"+
  "</table>"

,"row attributes");


// =[ 86 ]==============================================================================


equal(textile.convert( // The textile

  "table(tableclass).\n"+
  "|a|classy|table|\n"+
  "|a|classy|table|"

), // Should output

  "<table class=\"tableclass\">\n"+
  "\t<tr>\n"+
  "\t\t<td>a</td>\n"+
  "\t\t<td>classy</td>\n"+
  "\t\t<td>table</td>\n"+
  "\t</tr>\n"+
  "\t<tr>\n"+
  "\t\t<td>a</td>\n"+
  "\t\t<td>classy</td>\n"+
  "\t\t<td>table</td>\n"+
  "\t</tr>\n"+
  "</table>"

,"table attributes");


// =[ 87 ]==============================================================================


equal(textile.convert( // The textile

  "|^. top alignment|"

), // Should output

  "<table>\n"+
  "\t<tr>\n"+
  "\t\t<td style=\"vertical-align:top\">top alignment</td>\n"+
  "\t</tr>\n"+
  "</table>"

,"vertical alignment");


// =[ 88 ]==============================================================================


equal(textile.convert( // The textile

  "|-. middle alignment|"

), // Should output

  "<table>\n"+
  "\t<tr>\n"+
  "\t\t<td style=\"vertical-align:middle\">middle alignment</td>\n"+
  "\t</tr>\n"+
  "</table>"

,"vertical alignment 2");


// =[ 89 ]==============================================================================


equal(textile.convert( // The textile

  "|~. bottom alignment|"

), // Should output

  "<table>\n"+
  "\t<tr>\n"+
  "\t\t<td style=\"vertical-align:bottom\">bottom alignment</td>\n"+
  "\t</tr>\n"+
  "</table>"

,"vertical alignment 3");


// =[ 90 ]==============================================================================


equal(textile.convert( // The textile

  "|\\2. spans two cols |\n"+
  "| col 1 | col 2 |"

), // Should output

  "<table>\n"+
  "\t<tr>\n"+
  "\t\t<td colspan=\"2\">spans two cols </td>\n"+
  "\t</tr>\n"+
  "\t<tr>\n"+
  "\t\t<td> col 1 </td>\n"+
  "\t\t<td> col 2 </td>\n"+
  "\t</tr>\n"+
  "</table>"

,"column span");


// =[ 91 ]==============================================================================


equal(textile.convert( // The textile

  "|/3. spans 3 rows | row a |\n"+
  "| row b |\n"+
  "| row c |"

), // Should output

  "<table>\n"+
  "\t<tr>\n"+
  "\t\t<td rowspan=\"3\">spans 3 rows </td>\n"+
  "\t\t<td> row a </td>\n"+
  "\t</tr>\n"+
  "\t<tr>\n"+
  "\t\t<td> row b </td>\n"+
  "\t</tr>\n"+
  "\t<tr>\n"+
  "\t\t<td> row c </td>\n"+
  "\t</tr>\n"+
  "</table>"

,"row span");


// =[ 92 ]==============================================================================


equal(textile.convert( // The textile

  "this*won't*work"

), // Should output

  "<p>this*won&#8217;t*work</p>"

,"whitespace required");


// =[ 93 ]==============================================================================


equal(textile.convert( // The textile

  "this[*will*]work"

), // Should output

  "<p>this<strong>will</strong>work</p>"

,"modifier without whitespace");


// =[ 94 ]==============================================================================


equal(textile.convert( // The textile

  "1[^st^], 2[^nd^], 3[^rd^]."

), // Should output

  "<p>1<sup>st</sup>, 2<sup>nd</sup>, 3<sup>rd</sup>.</p>"

,"modifier without whitespace 2");


// =[ 95 ]==============================================================================


equal(textile.convert( // The textile

  "2 log[~n~]"

), // Should output

  "<p>2 log<sub>n</sub></p>"

,"modifier without whitespace 3");


// =[ 96 ]==============================================================================


equal(textile.convert( // The textile

  "A close[!/img.gif!]image.\n"+
  "A tight[\"text\":http://thresholdstate.com/]link.\n"+
  "A [\"footnoted link\":http://thresholdstate.com/][1]."

), // Should output

  "<p>A close<img src=\"/img.gif\" alt=\"\" />image.<br />\n"+
  "A tight<a href=\"http://thresholdstate.com/\">text</a>link.<br />\n"+
  "A <a href=\"http://thresholdstate.com/\">footnoted link</a><sup class=\"footnote\" id=\"fnr1\"><a href=\"#fn1\">1</a></sup>.</p>"

,"modifier without whitespace 4");


});

