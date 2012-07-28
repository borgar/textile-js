test('links.yml', function () {


// =[ 1 ]==============================================================================


equal(textile.convert( // The textile

  "\"link text\":#1"

), // Should output

  "<p><a href=\"#1\">link text</a></p>");


// =[ 2 ]==============================================================================


equal(textile.convert( // The textile

  "\"link text\":#a"

), // Should output

  "<p><a href=\"#a\">link text</a></p>");


// =[ 3 ]==============================================================================


equal(textile.convert( // The textile

  "\"link text\":#a1"

), // Should output

  "<p><a href=\"#a1\">link text</a></p>");


// =[ 4 ]==============================================================================


equal(textile.convert( // The textile

  "\"link text\":#a10"

), // Should output

  "<p><a href=\"#a10\">link text</a></p>");


// =[ 5 ]==============================================================================


equal(textile.convert( // The textile

  "\"link text\":index.html"

), // Should output

  "<p><a href=\"index.html\">link text</a></p>");


// =[ 6 ]==============================================================================


equal(textile.convert( // The textile

  "\"link text\":index.html#1"

), // Should output

  "<p><a href=\"index.html#1\">link text</a></p>");


// =[ 7 ]==============================================================================


equal(textile.convert( // The textile

  "\"link text\":index.html#a"

), // Should output

  "<p><a href=\"index.html#a\">link text</a></p>");


// =[ 8 ]==============================================================================


equal(textile.convert( // The textile

  "\"link text\":index.html#a1"

), // Should output

  "<p><a href=\"index.html#a1\">link text</a></p>");


// =[ 9 ]==============================================================================


equal(textile.convert( // The textile

  "\"link text\":index.html#a10"

), // Should output

  "<p><a href=\"index.html#a10\">link text</a></p>");


// =[ 10 ]==============================================================================


equal(textile.convert( // The textile

  "\"link text\":http://example.com/"

), // Should output

  "<p><a href=\"http://example.com/\">link text</a></p>");


// =[ 11 ]==============================================================================


equal(textile.convert( // The textile

  "\"link text\":http://example.com/#1"

), // Should output

  "<p><a href=\"http://example.com/#1\">link text</a></p>");


// =[ 12 ]==============================================================================


equal(textile.convert( // The textile

  "\"link text\":http://example.com/#a"

), // Should output

  "<p><a href=\"http://example.com/#a\">link text</a></p>");


// =[ 13 ]==============================================================================


equal(textile.convert( // The textile

  "\"link text\":http://example.com/#a1"

), // Should output

  "<p><a href=\"http://example.com/#a1\">link text</a></p>");


// =[ 14 ]==============================================================================


equal(textile.convert( // The textile

  "\"link text\":http://example.com/#a10"

), // Should output

  "<p><a href=\"http://example.com/#a10\">link text</a></p>");


// =[ 15 ]==============================================================================


equal(textile.convert( // The textile

  "\"link text\":http://example.com/index.html"

), // Should output

  "<p><a href=\"http://example.com/index.html\">link text</a></p>");


// =[ 16 ]==============================================================================


equal(textile.convert( // The textile

  "\"link text\":http://example.com/index.html#a"

), // Should output

  "<p><a href=\"http://example.com/index.html#a\">link text</a></p>");


// =[ 17 ]==============================================================================


equal(textile.convert( // The textile

  "\"link text\":http://example.com/index.html#1"

), // Should output

  "<p><a href=\"http://example.com/index.html#1\">link text</a></p>");


// =[ 18 ]==============================================================================


equal(textile.convert( // The textile

  "\"link text\":http://example.com/index.html#a1"

), // Should output

  "<p><a href=\"http://example.com/index.html#a1\">link text</a></p>");


// =[ 19 ]==============================================================================


equal(textile.convert( // The textile

  "\"link text\":http://example.com/index.html#a10"

), // Should output

  "<p><a href=\"http://example.com/index.html#a10\">link text</a></p>");


// =[ 20 ]==============================================================================


equal(textile.convert( // The textile

  "\"link text\":http://example.com/?foo=bar"

), // Should output

  "<p><a href=\"http://example.com/?foo=bar\">link text</a></p>");


// =[ 21 ]==============================================================================


equal(textile.convert( // The textile

  "\"link text\":http://example.com/?foo=bar#a"

), // Should output

  "<p><a href=\"http://example.com/?foo=bar#a\">link text</a></p>");


// =[ 22 ]==============================================================================


equal(textile.convert( // The textile

  "\"link & text\":http://example.com/?foo=bar#a"

), // Should output

  "<p><a href=\"http://example.com/?foo=bar#a\">link &amp; text</a></p>");


// =[ 23 ]==============================================================================


equal(textile.convert( // The textile

  "\"link text\":http://example.com/?foo=bar#1"

), // Should output

  "<p><a href=\"http://example.com/?foo=bar#1\">link text</a></p>");


// =[ 24 ]==============================================================================


equal(textile.convert( // The textile

  "\"link text\":http://example.com/?foo=bar#a1"

), // Should output

  "<p><a href=\"http://example.com/?foo=bar#a1\">link text</a></p>");


// =[ 25 ]==============================================================================


equal(textile.convert( // The textile

  "\"link text\":http://example.com/?foo=bar#a10"

), // Should output

  "<p><a href=\"http://example.com/?foo=bar#a10\">link text</a></p>");


// =[ 26 ]==============================================================================


equal(textile.convert( // The textile

  "\"link text\":http://example.com/?foo=bar&a=b"

), // Should output

  "<p><a href=\"http://example.com/?foo=bar&amp;a=b\">link text</a></p>");


// =[ 27 ]==============================================================================


equal(textile.convert( // The textile

  "\"link text\":http://example.com/?foo=bar&a=b#1"

), // Should output

  "<p><a href=\"http://example.com/?foo=bar&amp;a=b#1\">link text</a></p>");


// =[ 28 ]==============================================================================


equal(textile.convert( // The textile

  "\"link text\":http://example.com/?foo=bar&a=b#a"

), // Should output

  "<p><a href=\"http://example.com/?foo=bar&amp;a=b#a\">link text</a></p>");


// =[ 29 ]==============================================================================


equal(textile.convert( // The textile

  "\"link text\":http://example.com/?foo=bar&a=b#a1"

), // Should output

  "<p><a href=\"http://example.com/?foo=bar&amp;a=b#a1\">link text</a></p>");


// =[ 30 ]==============================================================================


equal(textile.convert( // The textile

  "\"link text\":http://example.com/?foo=bar&a=b#a10"

), // Should output

  "<p><a href=\"http://example.com/?foo=bar&amp;a=b#a10\">link text</a></p>");


// =[ 31 ]==============================================================================


equal(textile.convert( // The textile

  "This is a \"link\":http://example.com/"

), // Should output

  "<p>This is a <a href=\"http://example.com/\">link</a></p>");


// =[ 32 ]==============================================================================


equal(textile.convert( // The textile

  "This is a \"link\":http://example.com/."

), // Should output

  "<p>This is a <a href=\"http://example.com/\">link</a>.</p>");


// =[ 33 ]==============================================================================


equal(textile.convert( // The textile

  "This is a \"link\":http://example.com/index.html."

), // Should output

  "<p>This is a <a href=\"http://example.com/index.html\">link</a>.</p>");


// =[ 34 ]==============================================================================


equal(textile.convert( // The textile

  "This is a \"link\":http://example.com/index.html#a."

), // Should output

  "<p>This is a <a href=\"http://example.com/index.html#a\">link</a>.</p>");


// =[ 35 ]==============================================================================


equal(textile.convert( // The textile

  "This is a \"link\":http://example.com/index.html#1."

), // Should output

  "<p>This is a <a href=\"http://example.com/index.html#1\">link</a>.</p>");


// =[ 36 ]==============================================================================


equal(textile.convert( // The textile

  "This is a \"link\":http://example.com/index.html#a1."

), // Should output

  "<p>This is a <a href=\"http://example.com/index.html#a1\">link</a>.</p>");


// =[ 37 ]==============================================================================


equal(textile.convert( // The textile

  "This is a \"link\":http://example.com/index.html#a10."

), // Should output

  "<p>This is a <a href=\"http://example.com/index.html#a10\">link</a>.</p>");


// =[ 38 ]==============================================================================


equal(textile.convert( // The textile

  "This is a \"link\":http://example.com/?foo=bar."

), // Should output

  "<p>This is a <a href=\"http://example.com/?foo=bar\">link</a>.</p>");


// =[ 39 ]==============================================================================


equal(textile.convert( // The textile

  "This is a \"link\":http://example.com/?foo=bar#1."

), // Should output

  "<p>This is a <a href=\"http://example.com/?foo=bar#1\">link</a>.</p>");


// =[ 40 ]==============================================================================


equal(textile.convert( // The textile

  "This is a \"link\":http://example.com/?foo=bar#a."

), // Should output

  "<p>This is a <a href=\"http://example.com/?foo=bar#a\">link</a>.</p>");


// =[ 41 ]==============================================================================


equal(textile.convert( // The textile

  "This is a \"link\":http://example.com/?foo=bar#a1."

), // Should output

  "<p>This is a <a href=\"http://example.com/?foo=bar#a1\">link</a>.</p>");


// =[ 42 ]==============================================================================


equal(textile.convert( // The textile

  "This is a \"link\":http://example.com/?foo=bar#a10."

), // Should output

  "<p>This is a <a href=\"http://example.com/?foo=bar#a10\">link</a>.</p>");


// =[ 43 ]==============================================================================


equal(textile.convert( // The textile

  "This is a \"link\":http://example.com/?foo=bar#a10, but this is not."

), // Should output

  "<p>This is a <a href=\"http://example.com/?foo=bar#a10\">link</a>, but this is not.</p>");


// =[ 44 ]==============================================================================


equal(textile.convert( // The textile

  "(This is a \"link\":http://example.com/?foo=bar#a10) but this is not."

), // Should output

  "<p>(This is a <a href=\"http://example.com/?foo=bar#a10\">link</a>) but this is not.</p>");


// =[ 45 ]==============================================================================


equal(textile.convert( // The textile

  "\"link text(link title)\":http://example.com/"

), // Should output

  "<p><a href=\"http://example.com/\" title=\"link title\">link text</a></p>");


// =[ 46 ]==============================================================================


equal(textile.convert( // The textile

  "\"(link) text(link title)\":http://example.com/"

), // Should output

  "<p><a class=\"link\" href=\"http://example.com/\" title=\"link title\">text</a></p>"

,"link with title attribute");


// =[ 47 ]==============================================================================


equal(textile.convert( // The textile

  "\"text (link title)\":http://example.com/"

), // Should output

  "<p><a href=\"http://example.com/\" title=\"link title\">text</a></p>"

,"link with space between link text and title attribute");


// =[ 48 ]==============================================================================


equal(textile.convert( // The textile

  "\"Dive Into XML\":http://www.xml.com/pub/au/164"

), // Should output

  "<p><a href=\"http://www.xml.com/pub/au/164\">Dive Into <span class=\"caps\">XML</span></a></p>");


// =[ 49 ]==============================================================================


equal(textile.convert( // The textile

  "\"Lab Exercises\":../lab/exercises/exercises.html."

), // Should output

  "<p><a href=\"../lab/exercises/exercises.html\">Lab Exercises</a>.</p>");


// =[ 50 ]==============================================================================


equal(textile.convert( // The textile

  "Go to \"discuss\":http://www.dreammoods.com/cgibin/cutecast/cutecast.pl?forum=1&thread=26627 to discuss."

), // Should output

  "<p>Go to <a href=\"http://www.dreammoods.com/cgibin/cutecast/cutecast.pl?forum=1&amp;thread=26627\">discuss</a> to discuss.</p>");


// =[ 51 ]==============================================================================


equal(textile.convert( // The textile

  "* \"rubylang\":http://www.ruby-lang.org/en/"

), // Should output

  "<ul>\n"+
  "\t<li><a href=\"http://www.ruby-lang.org/en/\">rubylang</a></li>\n"+
  "</ul>");


// =[ 52 ]==============================================================================


equal(textile.convert( // The textile

  "The ION coding style document found at \"IONCodingStyleGuide.doc\":http://perforce:8081/@md=d&cd=//&c=82E@//depot/systest/system/main/pub/doc/IONCodingStyleGuide.doc?ac=22 codifies a couple of rules to ensure reasonably consistent code and documentation of libraries in ION. Test text"

), // Should output

  "<p>The <span class=\"caps\">ION</span> coding style document found at <a href=\"http://perforce:8081/@md=d&amp;cd=//&amp;c=82E@//depot/systest/system/main/pub/doc/IONCodingStyleGuide.doc?ac=22\">IONCodingStyleGuide.doc</a> codifies a couple of rules to ensure reasonably consistent code and documentation of libraries in <span class=\"caps\">ION</span>. Test text</p>");


// =[ 53 ]==============================================================================


equal(textile.convert( // The textile

  "\"testing\":"

), // Should output

  "<p>&#8220;testing&#8221;:</p>");


// =[ 54 ]==============================================================================


equal(textile.convert( // The textile

  "\"Link\":/foo.html me"

), // Should output

  "<p><a href=\"/foo.html\">Link</a> me</p>"

,"trailing space not absorbed by link");


// =[ 55 ]==============================================================================


equal(textile.convert( // The textile

  "\"Link\":/foo.html, me"

), // Should output

  "<p><a href=\"/foo.html\">Link</a>, me</p>"

,"trailing comma stays outside link");


// =[ 56 ]==============================================================================


equal(textile.convert( // The textile

  "\"Link\":/foo.html! me"

), // Should output

  "<p><a href=\"/foo.html\">Link</a>! me</p>"

,"trailing exclamation stays outside link");


// =[ 57 ]==============================================================================


equal(textile.convert( // The textile

  "\"Link\":/foo.html; me"

), // Should output

  "<p><a href=\"/foo.html\">Link</a>; me</p>"

,"trailing semicolon stays outside link");


// =[ 58 ]==============================================================================


equal(textile.convert( // The textile

  "\"Link\":/foo.html."

), // Should output

  "<p><a href=\"/foo.html\">Link</a>.</p>"

,"trailing period stays outside link");


// =[ 59 ]==============================================================================


equal(textile.convert( // The textile

  "\"(just in case you were wondering)\":http://slashdot.org/"

), // Should output

  "<p><a href=\"http://slashdot.org/\">(just in case you were wondering)</a></p>"

,"whose text is a parenthetical statement");


// =[ 60 ]==============================================================================


equal(textile.convert( // The textile

  "\"(myclass) (just in case you were wondering)\":http://slashdot.org/"

), // Should output

  "<p><a class=\"myclass\" href=\"http://slashdot.org/\">(just in case you were wondering)</a></p>"

,"that has a class and whose text is a parenthetical statement");


// =[ 61 ]==============================================================================


equal(textile.convert( // The textile

  "\"It is (very) fortunate that this works\":http://slashdot.org/"

), // Should output

  "<p><a href=\"http://slashdot.org/\">It is (very) fortunate that this works</a></p>"

,"link containing parentheses");


// =[ 62 ]==============================================================================


equal(textile.convert( // The textile

  "\"He said it is \"very unlikely\" this works\":http://slashdot.org/"

), // Should output

  "<p><a href=\"http://slashdot.org/\">He said it is &#8220;very unlikely&#8221; this works</a></p>"

,"link containing quotes");


// =[ 63 ]==============================================================================


equal(textile.convert( // The textile

  "\"He said it is \"very unlikely\" the \"economic stimulus\" works\":http://slashdot.org/"

), // Should output

  "<p><a href=\"http://slashdot.org/\">He said it is &#8220;very unlikely&#8221; the &#8220;economic stimulus&#8221; works</a></p>"

,"link containing multiple quotes");


// =[ 64 ]==============================================================================


equal(textile.convert( // The textile

  "\"\"Open the pod bay doors please, HAL.\"\":http://www.youtube.com/watch?v=npN9l2Bd06s"

), // Should output

  "<p><a href=\"http://www.youtube.com/watch?v=npN9l2Bd06s\">&#8220;Open the pod bay doors please, <span class=\"caps\">HAL</span>.&#8221;</a></p>"

,"linked quoted phrase");


// =[ 65 ]==============================================================================


equal(textile.convert( // The textile

  "\"quote\" text \"quote\" text \"link\":http://google.com"

), // Should output

  "<p>&#8220;quote&#8221; text &#8220;quote&#8221; text <a href=\"http://google.com\">link</a></p>"

,"link following quoted phrase");


// =[ 66 ]==============================================================================


equal(textile.convert( // The textile

  "This is a link to a \"Wikipedia article about Barack\":http://en.wikipedia.org/wiki/Barack_Obama"

), // Should output

  "<p>This is a link to a <a href=\"http://en.wikipedia.org/wiki/Barack_Obama\">Wikipedia article about Barack</a></p>"

,"links containing underscores");


// =[ 67 ]==============================================================================


equal(textile.convert( // The textile

  "This is a link to a [\"Wikipedia article about Textile\":http://en.wikipedia.org/wiki/Textile_(markup_language)]"

), // Should output

  "<p>This is a link to a <a href=\"http://en.wikipedia.org/wiki/Textile_(markup_language)\">Wikipedia article about Textile</a></p>"

,"links containing parentheses");


// =[ 68 ]==============================================================================


equal(textile.convert( // The textile

  "This is a regular link (but in parentheses: \"Google\":http://www.google.com)"

), // Should output

  "<p>This is a regular link (but in parentheses: <a href=\"http://www.google.com\">Google</a>)</p>"

,"links contained in parentheses");


// =[ 69 ]==============================================================================


equal(textile.convert( // The textile

  "This is a link to a \"Wikipedia article about Textile\":http://en.wikipedia.org/wiki/Textile_(markup_language)"

), // Should output

  "<p>This is a link to a <a href=\"http://en.wikipedia.org/wiki/Textile_(markup_language)\">Wikipedia article about Textile</a></p>"

,"links containing parentheses without brackets");


// =[ 70 ]==============================================================================


equal(textile.convert( // The textile

  "This is a link to a \"Wikipedia article about Textile\":http://en.wikipedia.org/wiki/Textile_(markup_language)."

), // Should output

  "<p>This is a link to a <a href=\"http://en.wikipedia.org/wiki/Textile_(markup_language)\">Wikipedia article about Textile</a>.</p>"

,"links containing parentheses period at end without brackets");


// =[ 71 ]==============================================================================


equal(textile.convert( // The textile

  "This is a link to a \"Wikipedia article about Textile\":http://en.wikipedia.org/wiki/Textile_(markup_language"

), // Should output

  "<p>This is a link to a <a href=\"http://en.wikipedia.org/wiki/Textile_(markup_language\">Wikipedia article about Textile</a></p>"

,"broken links containing parentheses without brackets");


// =[ 72 ]==============================================================================


equal(textile.convert( // The textile

  "Textile is awesome! (Check out the \"Wikipedia article about Textile\":http://en.wikipedia.org/wiki/Textile_(markup_language))"

), // Should output

  "<p>Textile is awesome! (Check out the <a href=\"http://en.wikipedia.org/wiki/Textile_(markup_language)\">Wikipedia article about Textile</a>)</p>"

,"links containing parentheses without brackets inside a parenthesis");


// =[ 73 ]==============================================================================


equal(textile.convert( // The textile

  "Some \"text\" followed by a \"link\":http://redcloth.org."

), // Should output

  "<p>Some &#8220;text&#8221; followed by a <a href=\"http://redcloth.org\">link</a>.</p>"

,"quotes and follow link");


// =[ 74 ]==============================================================================


equal(textile.convert( // The textile

  "\"link\":google-rocks\n"+
  "\n"+
  "[google-rocks]http://google.com"

), // Should output

  "<p><a href=\"http://google.com\">link</a></p>"

,"link alias containing dashes");


// =[ 75 ]==============================================================================


equal(textile.convert( // The textile

  "\"I first learned about \"Redcloth\":http://redcloth.org/ several years ago.\n"+
  "\n"+
  "\"It's wonderful.\""

), // Should output

  "<p>&#8220;I first learned about <a href=\"http://redcloth.org/\">Redcloth</a> several years ago.</p>\n"+
  "<p>&#8220;It&#8217;s wonderful.&#8221;</p>"

,"contained in multi-paragraph quotes");


// =[ 76 ]==============================================================================


equal(textile.convert( // The textile

  "\"Here is a <notextile><a href=\"http://redcloth.org/\">link</a></notextile>.\n"+
  "\n"+
  "\"I like links.\""

), // Should output

  "<p>&#8220;Here is a <a href=\"http://redcloth.org/\">link</a>.</p>\n"+
  "<p>&#8220;I like links.&#8221;</p>"

,"as html in notextile contained in multi-paragraph quotes");


// =[ 77 ]==============================================================================


equal(textile.convert( // The textile

  "\"My wife, Tipper, and I will donate 100% of the proceeds of the award to the \"Alliance For Climate Protection\":http://www.looktothestars.org/charity/638-alliance-for-climate-protection,\" said Gore in an email. \"I am deeply honored to receive the Nobel Peace Prize.\""

), // Should output

  "<p>&#8220;My wife, Tipper, and I will donate 100% of the proceeds of the award to the <a href=\"http://www.looktothestars.org/charity/638-alliance-for-climate-protection\">Alliance For Climate Protection</a>,&#8221; said Gore in an email. &#8220;I am deeply honored to receive the Nobel Peace Prize.&#8221;</p>"

,"contained in para with multiple quotes");


// =[ 78 ]==============================================================================


equal(textile.convert( // The textile

  "\"British Skin Foundation (BSF)\":http://www.britishskinfoundation.org.uk"

), // Should output

  "<p><a href=\"http://www.britishskinfoundation.org.uk\" title=\"BSF\">British Skin Foundation</a></p>"

,"with caps in the title");


// =[ 79 ]==============================================================================


equal(textile.convert( // The textile

  "\"<img name=\"checkmark.gif\" alt=\"Apply online\" />*apply online*\":/admissions/apply/"

), // Should output

  "<p><a href=\"/admissions/apply/\"><img name=\"checkmark.gif\" alt=\"Apply online\" /><strong>apply online</strong></a></p>"

,"containing HTML tags with quotes");


});

