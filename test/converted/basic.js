test('basic.yml', function () {


// =[ 1 ]==============================================================================


equal(textile.convert( // The textile

  "A single paragraph.\n"+
  "\n"+
  "Followed by another."

), // Should output

  "<p>A single paragraph.</p>\n"+
  "<p>Followed by another.</p>"

,"paragraphs");


// =[ 2 ]==============================================================================


equal(textile.convert( // The textile

  "This is line one\n"+
  " \n"+
  "This is line two"

), // Should output

  "<p>This is line one</p>\n"+
  "<p>This is line two</p>"

,"blocks with spaces on the blank line in between");


// =[ 3 ]==============================================================================


equal(textile.convert( // The textile

  "This is line one\n"+
  "\t\n"+
  "This is line two"

), // Should output

  "<p>This is line one</p>\n"+
  "<p>This is line two</p>"

,"blocks with tabl on the blank line in between");


// =[ 4 ]==============================================================================


equal(textile.convert( // The textile

  "I saw a ship. It ate my elephant."

), // Should output

  "<p>I saw a ship. It ate my elephant.</p>"

,"block containing block start");


// =[ 5 ]==============================================================================


equal(textile.convert( // The textile

  "p.. I saw a ship. It ate my elephant.\n"+
  "\n"+
  "When the elephant comes to take a p. you..."

), // Should output

  "<p>I saw a ship. It ate my elephant.</p>\n"+
  "<p>When the elephant comes to take a p. you&#8230;</p>"

,"extended block containing block start");


// =[ 6 ]==============================================================================


equal(textile.convert( // The textile

  "bq. I saw a ship. It ate my elephant."

), // Should output

  "<blockquote>\n"+
  "<p>I saw a ship. It ate my elephant.</p>\n"+
  "</blockquote>"

,"blockquote containing block start");


// =[ 7 ]==============================================================================


equal(textile.convert( // The textile

  "bq.. I saw a ship. It ate my elephant.\n"+
  "\n"+
  "When the elephant comes to take a p. you..."

), // Should output

  "<blockquote>\n"+
  "<p>I saw a ship. It ate my elephant.</p>\n"+
  "<p>When the elephant comes to take a p. you&#8230;</p>\n"+
  "</blockquote>"

,"extended blockquote containing block start");


// =[ 8 ]==============================================================================


equal(textile.convert( // The textile

  "Some text:\n"+
  "\n"+
  "<notextile>\n"+
  "<div class=\"example\"><pre>\n"+
  "Some code\n"+
  "</pre></div>\n"+
  "</notextile>\n"+
  "\n"+
  "Some more text."

), // Should output

  "<p>Some text:</p>\n"+
  "<div class=\"example\"><pre>\n"+
  "Some code\n"+
  "</pre></div>\n"+
  "<p>Some more text.</p>"

,"notextile block");


// =[ 9 ]==============================================================================


equal(textile.convert( // The textile

  "notextile. I saw a ship. It ate my elephant."

), // Should output

  "I saw a ship. It ate my elephant."

,"notextile block containing block start");


// =[ 10 ]==============================================================================


equal(textile.convert( // The textile

  "notextile.. I saw a ship. It ate my elephant.\n"+
  "\n"+
  "When the elephant comes to take a p. you..."

), // Should output

  "I saw a ship. It ate my elephant.\n"+
  "\n"+
  "When the elephant comes to take a p. you..."

,"extended notextile block containing block start");


// =[ 11 ]==============================================================================


equal(textile.convert( // The textile

  "pre. I saw a ship. It ate my elephant."

), // Should output

  "<pre>I saw a ship. It ate my elephant.</pre>"

,"pre block containing block start");


// =[ 12 ]==============================================================================


equal(textile.convert( // The textile

  "pre.. I saw a ship. It ate my elephant.\n"+
  "\n"+
  "When the elephant comes to take a p. you..."

), // Should output

  "<pre>I saw a ship. It ate my elephant.\n\n"+
  "When the elephant comes to take a p. you...</pre>"

,"extended pre block containing block start");


// =[ 13 ]==============================================================================


equal(textile.convert( // The textile

  "I am <b>very</b> serious.\n"+
  "\n"+
  "<pre>\n"+
  "  I am <b>very</b> serious.\n"+
  "</pre>"

), // Should output

  "<p>I am <b>very</b> serious.</p>\n"+
  "<pre>\n"+
  "  I am &lt;b&gt;very&lt;/b&gt; serious.\n"+
  "</pre>"

,"html tags");


// =[ 14 ]==============================================================================


equal(textile.convert( // The textile

  "I spoke.\n"+
  "And none replied."

), // Should output

  "<p>I spoke.<br />\n"+
  "And none replied.</p>"

,"line breaks");


// =[ 15 ]==============================================================================


equal(textile.convert( // The textile

  "\"Observe!\""

), // Should output

  "<p>&#8220;Observe!&#8221;</p>"

,"curly quotes");


// =[ 16 ]==============================================================================


equal(textile.convert( // The textile

  "\"I first learned about this thing called \"Redcloth\" several years ago.\n"+
  "\n"+
  "\"It's wonderful.\""

), // Should output

  "<p>&#8220;I first learned about this thing called &#8220;Redcloth&#8221; several years ago.</p>\n"+
  "<p>&#8220;It&#8217;s wonderful.&#8221;</p>"

,"quotes contained in multi-paragraph quotes");


// =[ 17 ]==============================================================================


equal(textile.convert( // The textile

  "Observe--very nice!"

), // Should output

  "<p>Observe&#8212;very nice!</p>"

,"double hyphens");


// =[ 18 ]==============================================================================


equal(textile.convert( // The textile

  "Observe -- very nice!"

), // Should output

  "<p>Observe &#8212; very nice!</p>"

,"double hyphens with spaces");


// =[ 19 ]==============================================================================


equal(textile.convert( // The textile

  "An emdash indicates a parenthetical thought--like this one--which is set apart from the rest of a sentence."

), // Should output

  "<p>An emdash indicates a parenthetical thought&#8212;like this one&#8212;which is set apart from the rest of a sentence.</p>"

,"parenthetical phrase set off with em dashes");


// =[ 20 ]==============================================================================


equal(textile.convert( // The textile

  "An emdash indicates a parenthetical thought -- like this one -- which is set apart from the rest of a sentence."

), // Should output

  "<p>An emdash indicates a parenthetical thought &#8212; like this one &#8212; which is set apart from the rest of a sentence.</p>"

,"parenthetical phrase set off with em dashes surrounded by spaces");


// =[ 21 ]==============================================================================


equal(textile.convert( // The textile

  "Observe - tiny and brief."

), // Should output

  "<p>Observe &#8211; tiny and brief.</p>"

,"single hyphens with spaces");


// =[ 22 ]==============================================================================


equal(textile.convert( // The textile

  "Observe the nicely-done hyphen."

), // Should output

  "<p>Observe the nicely-done hyphen.</p>"

,"midword hyphens ");


// =[ 23 ]==============================================================================


equal(textile.convert( // The textile

  "Observe..."

), // Should output

  "<p>Observe&#8230;</p>"

,"ellipses");


// =[ 24 ]==============================================================================


equal(textile.convert( // The textile

  "Observe: 2x3."

), // Should output

  "<p>Observe: 2&#215;3.</p>"

,"dimension sign");


// =[ 25 ]==============================================================================


equal(textile.convert( // The textile

  "The room is 2x3 inches big."

), // Should output

  "<p>The room is 2&#215;3 inches big.</p>"

,"dimension sign with space after");


// =[ 26 ]==============================================================================


equal(textile.convert( // The textile

  "Observe: 2 x 4."

), // Should output

  "<p>Observe: 2 &#215; 4.</p>"

,"dimension sign with spaces");


// =[ 27 ]==============================================================================


equal(textile.convert( // The textile

  "Observe: 2x3x4."

), // Should output

  "<p>Observe: 2&#215;3&#215;4.</p>"

,"dimension signs chained");


// =[ 28 ]==============================================================================


equal(textile.convert( // The textile

  "My mouse: 2.5\" x 4\"."

), // Should output

  "<p>My mouse: 2.5&#8243; &#215; 4&#8243;.</p>"

,"dimension signs with double primes");


// =[ 29 ]==============================================================================


equal(textile.convert( // The textile

  "My office: 5' x 4.5'."

), // Should output

  "<p>My office: 5&#8242; &#215; 4.5&#8242;.</p>"

,"dimension signs with single primes");


// =[ 30 ]==============================================================================


equal(textile.convert( // The textile

  "one(TM), two(R), three(C)."

), // Should output

  "<p>one&#8482;, two&#174;, three&#169;.</p>"

,"trademark and copyright");


// =[ 31 ]==============================================================================


equal(textile.convert( // The textile

  "h3. Header 3"

), // Should output

  "<h3>Header 3</h3>"

,"headers");


// =[ 32 ]==============================================================================


equal(textile.convert( // The textile

  "Any old text\n"+
  "\n"+
  "bq. A block quotation.\n"+
  "\n"+
  "Any old text"

), // Should output

  "<p>Any old text</p>\n"+
  "<blockquote>\n"+
  "<p>A block quotation.</p>\n"+
  "</blockquote>\n"+
  "<p>Any old text</p>"

,"blockquote");


// =[ 33 ]==============================================================================


equal(textile.convert( // The textile

  "This is covered elsewhere[1]."

), // Should output

  "<p>This is covered elsewhere<sup class=\"footnote\" id=\"fnr1\"><a href=\"#fn1\">1</a></sup>.</p>"

,"footnote reference");


// =[ 34 ]==============================================================================


equal(textile.convert( // The textile

  "fn1. Down here, in fact."

), // Should output

  "<p class=\"footnote\" id=\"fn1\"><a href=\"#fnr1\"><sup>1</sup></a> Down here, in fact.</p>"

,"footnote");


// =[ 35 ]==============================================================================


equal(textile.convert( // The textile

  "I _believe_ every word."

), // Should output

  "<p>I <em>believe</em> every word.</p>"

,"em");


// =[ 36 ]==============================================================================


equal(textile.convert( // The textile

  "And then? She *fell*!"

), // Should output

  "<p>And then? She <strong>fell</strong>!</p>"

,"strong");


// =[ 37 ]==============================================================================


equal(textile.convert( // The textile

  "*10 times as many*"

), // Should output

  "<p><strong>10 times as many</strong></p>"

,"strong phrase beginning with a number");


// =[ 38 ]==============================================================================


equal(textile.convert( // The textile

  "I __know__.\n"+
  "I **really** __know__."

), // Should output

  "<p>I <i>know</i>.<br />\n"+
  "I <b>really</b> <i>know</i>.</p>"

,"force bold italics");


// =[ 39 ]==============================================================================


equal(textile.convert( // The textile

  "??Cat's Cradle?? by Vonnegut"

), // Should output

  "<p><cite>Cat&#8217;s Cradle</cite> by Vonnegut</p>"

,"citation");


// =[ 40 ]==============================================================================


equal(textile.convert( // The textile

  "Convert with @r.to_html@"

), // Should output

  "<p>Convert with <code>r.to_html</code></p>"

,"code phrases");


// =[ 41 ]==============================================================================


equal(textile.convert( // The textile

  "Please email why@domain.com or jason@domain.com."

), // Should output

  "<p>Please email why@domain.com or jason@domain.com.</p>"

,"code phrases not created with multiple email addresses");


// =[ 42 ]==============================================================================


equal(textile.convert( // The textile

  "I'm -sure- not sure."

), // Should output

  "<p>I&#8217;m <del>sure</del> not sure.</p>"

,"del");


// =[ 43 ]==============================================================================


equal(textile.convert( // The textile

  "-delete-"

), // Should output

  "<p><del>delete</del></p>"

,"del beginning a phrase");


// =[ 44 ]==============================================================================


equal(textile.convert( // The textile

  "You are a +pleasant+ child."

), // Should output

  "<p>You are a <ins>pleasant</ins> child.</p>"

,"ins");


// =[ 45 ]==============================================================================


equal(textile.convert( // The textile

  "a ^2^ + b ^2^ = c ^2^"

), // Should output

  "<p>a <sup>2</sup> + b <sup>2</sup> = c <sup>2</sup></p>"

,"superscript");


// =[ 46 ]==============================================================================


equal(textile.convert( // The textile

  "^(image courtesy NASA)^"

), // Should output

  "<p><sup>(image courtesy <span class=\"caps\">NASA</span>)</sup></p>"

,"parenthetical superscript phrase");


// =[ 47 ]==============================================================================


equal(textile.convert( // The textile

  "log ~2~ x"

), // Should output

  "<p>log <sub>2</sub> x</p>"

,"subscript");


// =[ 48 ]==============================================================================


equal(textile.convert( // The textile

  "~(image courtesy NASA)~"

), // Should output

  "<p><sub>(image courtesy <span class=\"caps\">NASA</span>)</sub></p>"

,"parenthetical subscript phrase");


// =[ 49 ]==============================================================================


equal(textile.convert( // The textile

  "f(x, n) = log[~4~]x[^n^]"

), // Should output

  "<p>f(x, n) = log<sub>4</sub>x<sup>n</sup></p>"

,"tight superscript and subscript");


// =[ 50 ]==============================================================================


equal(textile.convert( // The textile

  "I'm %unaware% of most soft drinks."

), // Should output

  "<p>I&#8217;m <span>unaware</span> of most soft drinks.</p>"

,"span");


// =[ 51 ]==============================================================================


equal(textile.convert( // The textile

  "I'm %{color:red}unaware%\n"+
  "of most %{font-size:0.5em;}soft drinks%."

), // Should output

  "<p>I&#8217;m <span style=\"color:red\">unaware</span><br />\n"+
  "of most <span style=\"font-size:0.5em\">soft drinks</span>.</p>"

,"style span");


// =[ 52 ]==============================================================================


equal(textile.convert( // The textile

  "http://blah.com/one%20two%20three\n"+
  "(min)5%-95%(max)"

), // Should output

  "<p>http://blah.com/one%20two%20three<br />\n"+
  "(min)5%-95%(max)</p>"

,"percent sign");


// =[ 53 ]==============================================================================


equal(textile.convert( // The textile

  "p(example1). An example"

), // Should output

  "<p class=\"example1\">An example</p>"

,"css class");


// =[ 54 ]==============================================================================


equal(textile.convert( // The textile

  "p(#big-red). Red here"

), // Should output

  "<p id=\"big-red\">Red here</p>"

,"css id");


// =[ 55 ]==============================================================================


equal(textile.convert( // The textile

  "p(#Foo). bar"

), // Should output

  "<p id=\"Foo\">bar</p>"

,"css id with initial uppercase");


// =[ 56 ]==============================================================================


equal(textile.convert( // The textile

  "p(fooBar). baz"

), // Should output

  "<p class=\"fooBar\">baz</p>"

,"css class uppercase");


// =[ 57 ]==============================================================================


equal(textile.convert( // The textile

  "p(example1#big-red2). Red here"

), // Should output

  "<p class=\"example1\" id=\"big-red2\">Red here</p>"

,"class and id combined");


// =[ 58 ]==============================================================================


equal(textile.convert( // The textile

  "p{color:blue;margin:30px;font-size:120%;font-family:'Comic Sans'}. Spacey blue"

), // Should output

  "<p style=\"color:blue;margin:30px;font-size:120%;font-family:&#39;Comic Sans&#39;\">Spacey blue</p>"

,"css style");


// =[ 59 ]==============================================================================


equal(textile.convert( // The textile

  "p[fr]. rouge"

), // Should output

  "<p lang=\"fr\">rouge</p>"

,"language designations");


// =[ 60 ]==============================================================================


equal(textile.convert( // The textile

  "I seriously *{color:red}blushed*\n"+
  "when I _(big)sprouted_ that\n"+
  "corn stalk from my\n"+
  "%[es]cabeza%."

), // Should output

  "<p>I seriously <strong style=\"color:red\">blushed</strong><br />\n"+
  "when I <em class=\"big\">sprouted</em> that<br />\n"+
  "corn stalk from my<br />\n"+
  "<span lang=\"es\">cabeza</span>.</p>"

,"block attributes on phrase modifiers");


// =[ 61 ]==============================================================================


equal(textile.convert( // The textile

  "I *seriously {color:red}blushed*\n"+
  "when I _first (big)sprouted_ that\n"+
  "corn stalk from my\n"+
  "%grande [es]cabeza%."

), // Should output

  "<p>I <strong>seriously {color:red}blushed</strong><br />\n"+
  "when I <em>first (big)sprouted</em> that<br />\n"+
  "corn stalk from my<br />\n"+
  "<span>grande [es]cabeza</span>.</p>"

,"inline attributes preceded by text are treated as literal");


// =[ 62 ]==============================================================================


equal(textile.convert( // The textile

  "p<>. justified"

), // Should output

  "<p style=\"text-align:justify\">justified</p>"

,"align justified");


// =[ 63 ]==============================================================================


equal(textile.convert( // The textile

  "p))). right ident 3em"

), // Should output

  "<p style=\"padding-right:3em\">right ident 3em</p>"

,"indentation");


// =[ 64 ]==============================================================================


equal(textile.convert( // The textile

  "h2()>. Bingo."

), // Should output

  "<h2 style=\"padding-left:1em;padding-right:1em;text-align:right\">Bingo.</h2>"

,"indentation and alignment");


// =[ 65 ]==============================================================================


equal(textile.convert( // The textile

  "h3()>[no]{color:red}. Bingo"

), // Should output

  "<h3 style=\"padding-left:1em;padding-right:1em;text-align:right;color:red\" lang=\"no\">Bingo</h3>"

,"many modifiers combined");


// =[ 66 ]==============================================================================


equal(textile.convert( // The textile

  "<pre>\n"+
  "<code>\n"+
  "  a.gsub!( /</, '' )\n"+
  "</code>\n"+
  "</pre>"

), // Should output

  "<pre>\n"+
  "<code>\n"+
  "  a.gsub!( /&lt;/, '' )\n"+
  "</code>\n"+
  "</pre>"

,"code blocks");


// =[ 67 ]==============================================================================


equal(textile.convert( // The textile

  "<div style=\"float:right;\">\n"+
  "\n"+
  "h3. Sidebar\n"+
  "\n"+
  "\"Hobix\":http://hobix.com/\n"+
  "\"Ruby\":http://ruby-lang.org/\n"+
  "\n"+
  "</div>\n"+
  "\n"+
  "The main text of the page goes here and will stay to the left of the sidebar."

), // Should output

  "<div style=\"float:right;\">\n"+
  "<h3>Sidebar</h3>\n"+
  "<p><a href=\"http://hobix.com/\">Hobix</a><br />\n"+
  "<a href=\"http://ruby-lang.org/\">Ruby</a></p>\n"+
  "</div>\n"+
  "<p>The main text of the page goes here and will stay to the left of the sidebar.</p>"

,"div tags");


// =[ 68 ]==============================================================================


equal(textile.convert( // The textile

  "# A first item\n"+
  "# A second item\n"+
  "# A third"

), // Should output

  "<ol>\n"+
  "\t<li>A first item</li>\n"+
  "\t<li>A second item</li>\n"+
  "\t<li>A third</li>\n"+
  "</ol>"

,"numbered list");


// =[ 69 ]==============================================================================


equal(textile.convert( // The textile

  "# Fuel could be:\n"+
  "## Coal\n"+
  "## Gasoline\n"+
  "## Electricity\n"+
  "# Humans need only:\n"+
  "## Water\n"+
  "## Protein"

), // Should output

  "<ol>\n"+
  "\t<li>Fuel could be:\n"+
  "\t<ol>\n"+
  "\t\t<li>Coal</li>\n"+
  "\t\t<li>Gasoline</li>\n"+
  "\t\t<li>Electricity</li>\n"+
  "\t</ol></li>\n"+
  "\t<li>Humans need only:\n"+
  "\t<ol>\n"+
  "\t\t<li>Water</li>\n"+
  "\t\t<li>Protein</li>\n"+
  "\t</ol></li>\n"+
  "</ol>"

,"nested numbered lists");


// =[ 70 ]==============================================================================


equal(textile.convert( // The textile

  "* A first item\n"+
  "* A second item\n"+
  "* A third"

), // Should output

  "<ul>\n"+
  "\t<li>A first item</li>\n"+
  "\t<li>A second item</li>\n"+
  "\t<li>A third</li>\n"+
  "</ul>"

,"bulleted list");


// =[ 71 ]==============================================================================


equal(textile.convert( // The textile

  "* Fuel could be:\n"+
  "** Coal\n"+
  "** Gasoline\n"+
  "** Electricity\n"+
  "* Humans need only:\n"+
  "** Water\n"+
  "** Protein"

), // Should output

  "<ul>\n"+
  "\t<li>Fuel could be:\n"+
  "\t<ul>\n"+
  "\t\t<li>Coal</li>\n"+
  "\t\t<li>Gasoline</li>\n"+
  "\t\t<li>Electricity</li>\n"+
  "\t</ul></li>\n"+
  "\t<li>Humans need only:\n"+
  "\t<ul>\n"+
  "\t\t<li>Water</li>\n"+
  "\t\t<li>Protein</li>\n"+
  "\t</ul></li>\n"+
  "</ul>"

,"nested bulleted lists");


// =[ 72 ]==============================================================================


equal(textile.convert( // The textile

  "I searched \"Google\":http://google.com."

), // Should output

  "<p>I searched <a href=\"http://google.com\">Google</a>.</p>"

,"links");


// =[ 73 ]==============================================================================


equal(textile.convert( // The textile

  "I am crazy about \"Hobix\":hobix\n"+
  "and \"it's\":hobix \"all\":hobix I ever\n"+
  "\"link to\":hobix!\n"+
  "\n"+
  "[hobix]http://hobix.com"

), // Should output

  "<p>I am crazy about <a href=\"http://hobix.com\">Hobix</a><br />\n"+
  "and <a href=\"http://hobix.com\">it&#8217;s</a> <a href=\"http://hobix.com\">all</a> I ever<br />\n"+
  "<a href=\"http://hobix.com\">link to</a>!</p>"

,"link aliases");


// =[ 74 ]==============================================================================


equal(textile.convert( // The textile

  "!http://hobix.com/sample.jpg!"

), // Should output

  "<p><img src=\"http://hobix.com/sample.jpg\" alt=\"\" /></p>"

,"image");


// =[ 75 ]==============================================================================


equal(textile.convert( // The textile

  "!openwindow1.gif(Bunny.)!"

), // Should output

  "<p><img src=\"openwindow1.gif\" title=\"Bunny.\" alt=\"Bunny.\" /></p>"

,"image title");


// =[ 76 ]==============================================================================


equal(textile.convert( // The textile

  "!openwindow1.gif!:http://hobix.com/"

), // Should output

  "<p><a href=\"http://hobix.com/\"><img src=\"openwindow1.gif\" alt=\"\" /></a></p>"

,"image links");


// =[ 77 ]==============================================================================


equal(textile.convert( // The textile

  "!>obake.gif!\n"+
  "\n"+
  "And others sat all round the small\n"+
  "machine and paid it to sing to them."

), // Should output

  "<p><img align=\"right\" src=\"obake.gif\" alt=\"\" /></p>\n"+
  "<p>And others sat all round the small<br />\n"+
  "machine and paid it to sing to them.</p>"

,"image alignments");


// =[ 78 ]==============================================================================


equal(textile.convert( // The textile

  "We use CSS(Cascading Style Sheets)."

), // Should output

  "<p>We use <acronym title=\"Cascading Style Sheets\"><span class=\"caps\">CSS</span></acronym>.</p>"

,"acronym definitions");


// =[ 79 ]==============================================================================


equal(textile.convert( // The textile

  "It employs AI(artificial intelligence) processing."

), // Should output

  "<p>It employs <acronym title=\"artificial intelligence\"><span class=\"caps\">AI</span></acronym> processing.</p>"

,"two-letter acronyms");


// =[ 80 ]==============================================================================


equal(textile.convert( // The textile

  "| name | age | sex |\n"+
  "| joan | 24 | f |\n"+
  "| archie | 29 | m |\n"+
  "| bella | 45 | f |"

), // Should output

  "<table>\n"+
  "\t<tr>\n"+
  "\t\t<td> name </td>\n"+
  "\t\t<td> age </td>\n"+
  "\t\t<td> sex </td>\n"+
  "\t</tr>\n"+
  "\t<tr>\n"+
  "\t\t<td> joan </td>\n"+
  "\t\t<td> 24 </td>\n"+
  "\t\t<td> f </td>\n"+
  "\t</tr>\n"+
  "\t<tr>\n"+
  "\t\t<td> archie </td>\n"+
  "\t\t<td> 29 </td>\n"+
  "\t\t<td> m </td>\n"+
  "\t</tr>\n"+
  "\t<tr>\n"+
  "\t\t<td> bella </td>\n"+
  "\t\t<td> 45 </td>\n"+
  "\t\t<td> f </td>\n"+
  "\t</tr>\n"+
  "</table>"

,"tables");


// =[ 81 ]==============================================================================


equal(textile.convert( // The textile

  "|_. name |_. age |_. sex |\n"+
  "| joan | 24 | f |\n"+
  "| archie | 29 | m |\n"+
  "| bella | 45 | f |"

), // Should output

  "<table>\n"+
  "\t<tr>\n"+
  "\t\t<th>name </th>\n"+
  "\t\t<th>age </th>\n"+
  "\t\t<th>sex </th>\n"+
  "\t</tr>\n"+
  "\t<tr>\n"+
  "\t\t<td> joan </td>\n"+
  "\t\t<td> 24 </td>\n"+
  "\t\t<td> f </td>\n"+
  "\t</tr>\n"+
  "\t<tr>\n"+
  "\t\t<td> archie </td>\n"+
  "\t\t<td> 29 </td>\n"+
  "\t\t<td> m </td>\n"+
  "\t</tr>\n"+
  "\t<tr>\n"+
  "\t\t<td> bella </td>\n"+
  "\t\t<td> 45 </td>\n"+
  "\t\t<td> f </td>\n"+
  "\t</tr>\n"+
  "</table>"

,"table headers");


// =[ 82 ]==============================================================================


equal(textile.convert( // The textile

  "|_. attribute list |\n"+
  "|<. align left |\n"+
  "|>. align right|\n"+
  "|=. center |\n"+
  "|<>. justify |\n"+
  "|^. valign top |\n"+
  "|~. bottom |"

), // Should output

  "<table>\n"+
  "\t<tr>\n"+
  "\t\t<th>attribute list </th>\n"+
  "\t</tr>\n"+
  "\t<tr>\n"+
  "\t\t<td style=\"text-align:left\">align left </td>\n"+
  "\t</tr>\n"+
  "\t<tr>\n"+
  "\t\t<td style=\"text-align:right\">align right</td>\n"+
  "\t</tr>\n"+
  "\t<tr>\n"+
  "\t\t<td style=\"text-align:center\">center </td>\n"+
  "\t</tr>\n"+
  "\t<tr>\n"+
  "\t\t<td style=\"text-align:justify\">justify </td>\n"+
  "\t</tr>\n"+
  "\t<tr>\n"+
  "\t\t<td style=\"vertical-align:top\">valign top </td>\n"+
  "\t</tr>\n"+
  "\t<tr>\n"+
  "\t\t<td style=\"vertical-align:bottom\">bottom </td>\n"+
  "\t</tr>\n"+
  "</table>"

,"table cell attributes");


// =[ 83 ]==============================================================================


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

,"table colspan");


// =[ 84 ]==============================================================================


equal(textile.convert( // The textile

  "|/3. spans 3 rows | a |\n"+
  "| b |\n"+
  "| c |"

), // Should output

  "<table>\n"+
  "\t<tr>\n"+
  "\t\t<td rowspan=\"3\">spans 3 rows </td>\n"+
  "\t\t<td> a </td>\n"+
  "\t</tr>\n"+
  "\t<tr>\n"+
  "\t\t<td> b </td>\n"+
  "\t</tr>\n"+
  "\t<tr>\n"+
  "\t\t<td> c </td>\n"+
  "\t</tr>\n"+
  "</table>"

,"table rowspan");


// =[ 85 ]==============================================================================


equal(textile.convert( // The textile

  "|{background:#ddd}. Grey cell|"

), // Should output

  "<table>\n"+
  "\t<tr>\n"+
  "\t\t<td style=\"background:#ddd\">Grey cell</td>\n"+
  "\t</tr>\n"+
  "</table>"

,"block attributes applied to table cells");


// =[ 86 ]==============================================================================


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
  "</table>"

,"block attributes applied to a table");


// =[ 87 ]==============================================================================


equal(textile.convert( // The textile

  "|This|is|a|row|\n"+
  "{background:#ddd}. |This|is|grey|row|"

), // Should output

  "<table>\n"+
  "\t<tr>\n"+
  "\t\t<td>This</td>\n"+
  "\t\t<td>is</td>\n"+
  "\t\t<td>a</td>\n"+
  "\t\t<td>row</td>\n"+
  "\t</tr>\n"+
  "\t<tr style=\"background:#ddd\">\n"+
  "\t\t<td>This</td>\n"+
  "\t\t<td>is</td>\n"+
  "\t\t<td>grey</td>\n"+
  "\t\t<td>row</td>\n"+
  "\t</tr>\n"+
  "</table>"

,"block attributes applied to a table row");


// =[ 88 ]==============================================================================


equal(textile.convert( // The textile

  "div.. Just a test.\n"+
  "\n"+
  "Second div.\n"+
  "\n"+
  "pre. A pre block ends it."

), // Should output

  "<div>Just a test.</div>\n"+
  "<div>Second div.</div>\n"+
  "<pre>A pre block ends it.</pre>"

,"extended block followed by pre block");


// =[ 89 ]==============================================================================


equal(textile.convert( // The textile

  "div.. Just a test.\n"+
  "\n"+
  "Second div.\n"+
  "\n"+
  "bq. A blockquote ends it."

), // Should output

  "<div>Just a test.</div>\n"+
  "<div>Second div.</div>\n"+
  "<blockquote>\n"+
  "<p>A blockquote ends it.</p>\n"+
  "</blockquote>"

,"extended block followed by blockquote");


// =[ 90 ]==============================================================================


equal(textile.convert( // The textile

  "div.. Just a test.\n"+
  "\n"+
  "Second div.\n"+
  "\n"+
  "bc. A blockcode ends it."

), // Should output

  "<div>Just a test.</div>\n"+
  "<div>Second div.</div>\n"+
  "<pre><code>A blockcode ends it.</code></pre>"

,"extended block followed by block code");


// =[ 91 ]==============================================================================


equal(textile.convert( // The textile

  "div.. Just a test.\n"+
  "\n"+
  "Second div.\n"+
  "\n"+
  "notextile. A notextile block ends it."

), // Should output

  "<div>Just a test.</div>\n"+
  "<div>Second div.</div>\n"+
  "A notextile block ends it."

,"extended block followed by notextile block");


// =[ 92 ]==============================================================================


equal(textile.convert( // The textile

  "before (in parens) after"

), // Should output

  "<p>before (in parens) after</p>"

,"simple parentheses");


// =[ 93 ]==============================================================================


equal(textile.convert( // The textile

  "before _(in parens)_ after"

), // Should output

  "<p>before <em>(in parens)</em> after</p>"

,"parentheses in underscores");


// =[ 94 ]==============================================================================


equal(textile.convert( // The textile

  "before *(in parens)* after"

), // Should output

  "<p>before <strong>(in parens)</strong> after</p>"

,"parentheses in asterisks");


// =[ 95 ]==============================================================================


equal(textile.convert( // The textile

  "\"before _(in parens)_ after\""

), // Should output

  "<p>&#8220;before <em>(in parens)</em> after&#8221;</p>"

,"parentheses in underscores in quotes");


// =[ 96 ]==============================================================================


equal(textile.convert( // The textile

  "one _two three_ (four _five six_) seven"

), // Should output

  "<p>one <em>two three</em> (four <em>five six</em>) seven</p>"

,"underscores in parentheses");


// =[ 97 ]==============================================================================


equal(textile.convert( // The textile

  "\"one _two three_ (four _five six_) seven\""

), // Should output

  "<p>&#8220;one <em>two three</em> (four <em>five six</em>) seven&#8221;</p>"

,"underscores in parentheses in quotes");


// =[ 98 ]==============================================================================


equal(textile.convert( // The textile

  "one (two _three four_) five"

), // Should output

  "<p>one (two <em>three four</em>) five</p>"

,"underscores in parentheses 2");


// =[ 99 ]==============================================================================


equal(textile.convert( // The textile

  "\"one (two _three four_) five\""

), // Should output

  "<p>&#8220;one (two <em>three four</em>) five&#8221;</p>"

,"underscores in parentheses in quotes 2");


// =[ 100 ]==============================================================================


equal(textile.convert( // The textile

  "IBM or (HAL)"

), // Should output

  "<p><span class=\"caps\">IBM</span> or (<span class=\"caps\">HAL</span>)</p>"

,"caps in parentheses");


// =[ 101 ]==============================================================================


equal(textile.convert( // The textile

  "__Amanita__s are mushrooms.\n"+
  "Lungworts (__Lobaria__) are lichens.\n"+
  "Blah blah (normal text **bold**) blah."

), // Should output

  "<p>__Amanita__s are mushrooms.<br />\n"+
  "Lungworts (<i>Lobaria</i>) are lichens.<br />\n"+
  "Blah blah (normal text <b>bold</b>) blah.</p>"

,"phrase modifiers in parentheses");


// =[ 102 ]==============================================================================


equal(textile.convert( // The textile

  "citation [\"(Berk.) Hilton\"], see\n"+
  "[Papers \"blah blah.\"]"

), // Should output

  "<p>citation [&#8220;(Berk.) Hilton&#8221;], see<br />\n"+
  "[Papers &#8220;blah blah.&#8221;]</p>"

,"square brackets are preserved");


// =[ 103 ]==============================================================================


equal(textile.convert( // The textile

  "Just some *** text\n"+
  "\n"+
  "***\n"+
  "\n"+
  "Some more text."

), // Should output

  "<p>Just some *** text</p>\n"+
  "<hr />\n"+
  "<p>Some more text.</p>"

,"horizontal rule using asterisks");


// =[ 104 ]==============================================================================


equal(textile.convert( // The textile

  "Just some **** text\n"+
  "\n"+
  "****\n"+
  "\n"+
  "Some more text."

), // Should output

  "<p>Just some **** text</p>\n"+
  "<hr />\n"+
  "<p>Some more text.</p>"

,"horizontal rule using more than three asterisks");


// =[ 105 ]==============================================================================


equal(textile.convert( // The textile

  "Just some --- text\n"+
  "\n"+
  "---\n"+
  "\n"+
  "Some more text."

), // Should output

  "<p>Just some --- text</p>\n"+
  "<hr />\n"+
  "<p>Some more text.</p>"

,"horizontal rule using dashes");


// =[ 106 ]==============================================================================


equal(textile.convert( // The textile

  "Just some ___ text\n"+
  "\n"+
  "___\n"+
  "\n"+
  "Some more text."

), // Should output

  "<p>Just some ___ text</p>\n"+
  "<hr />\n"+
  "<p>Some more text.</p>"

,"horizontal rule using underscores");


// =[ 107 ]==============================================================================


equal(textile.convert( // The textile

  "some @[[code]]@"

), // Should output

  "<p>some <code>[[code]]</code></p>"

,"lang attribute cannot contain square brackets");


// =[ 108 ]==============================================================================


equal(textile.convert( // The textile

  "pre.      Text in a pre block\n"+
  "is displayed in a fixed-width\n"+
  "     font. It preserves\n"+
  "  s p a c e s, line breaks\n"+
  "     and ascii bunnies."

), // Should output

  "<pre>     Text in a pre block\n"+
  "is displayed in a fixed-width\n"+
  "     font. It preserves\n"+
  "  s p a c e s, line breaks\n"+
  "     and ascii bunnies.</pre>"

,"pre blocks preserve leading whitespace");


// =[ 109 ]==============================================================================


equal(textile.convert( // The textile

  "bc.   false\n"+
  "} else {"

), // Should output

  "<pre><code>  false\n"+
  "} else {</code></pre>"

,"code blocks preserve leading whitespace");


// =[ 110 ]==============================================================================


equal(textile.convert( // The textile

  "??What the Story Morning Glory???"

), // Should output

  "<p><cite>What the Story Morning Glory?</cite></p>"

,"citation ending with question mark");


// =[ 111 ]==============================================================================


equal(textile.convert( // The textile

  "??What's the Matter with Kansas? How Conservatives Won the Heart of America?? is a great book!"

), // Should output

  "<p><cite>What&#8217;s the Matter with Kansas? How Conservatives Won the Heart of America</cite> is a great book!</p>"

,"citation including question mark");


// =[ 112 ]==============================================================================


equal(textile.convert( // The textile

  "_trythis_ it will keep the empahsis.\n"+
  "_and_this_too_ it should keep the emphasis but does not with redcloth."

), // Should output

  "<p><em>trythis</em> it will keep the empahsis.<br />\n"+
  "<em>and_this_too</em> it should keep the emphasis but does not with redcloth.</p>"

,"emphasized word including underscore");


// =[ 113 ]==============================================================================


equal(textile.convert( // The textile

  "Start a paragraph with [@p. @] (that's p, a period, and a space)."

), // Should output

  "<p>Start a paragraph with <code>p. </code> (that&#8217;s p, a period, and a space).</p>"

,"code captures spaces when made explicit with square brackets");


// =[ 114 ]==============================================================================


equal(textile.convert( // The textile

  "tel. 0 700 123 123"

), // Should output

  "<p>tel. 0 700 123 123</p>"

,"unrecognized block starting with t not eaten");


// =[ 115 ]==============================================================================


equal(textile.convert( // The textile

  "*22 watermelons* is my limit"

), // Should output

  "<p><strong>22 watermelons</strong> is my limit</p>"

,"bolded number at start of phrase");


// =[ 116 ]==============================================================================


equal(textile.convert( // The textile

  "*- I would expect it to be a bolded paragraph.*"

), // Should output

  "<p><strong>- I would expect it to be a bolded paragraph.</strong></p>"

,"bolded paragraph");


});

