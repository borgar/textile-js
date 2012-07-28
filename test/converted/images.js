test('images.yml', function () {


// =[ 1 ]==============================================================================


equal(textile.convert( // The textile

  "This is an !image.jpg!"

), // Should output

  "<p>This is an <img src=\"image.jpg\" alt=\"\" /></p>");


// =[ 2 ]==============================================================================


equal(textile.convert( // The textile

  "This is an !image.jpg(with alt text)!"

), // Should output

  "<p>This is an <img src=\"image.jpg\" title=\"with alt text\" alt=\"with alt text\" /></p>");


// =[ 3 ]==============================================================================


equal(textile.convert( // The textile

  "This is an !http://example.com/i/image.jpg!"

), // Should output

  "<p>This is an <img src=\"http://example.com/i/image.jpg\" alt=\"\" /></p>");


// =[ 4 ]==============================================================================


equal(textile.convert( // The textile

  "This is an !http://example.com/i/image.jpg#a1!"

), // Should output

  "<p>This is an <img src=\"http://example.com/i/image.jpg#a1\" alt=\"\" /></p>");


// =[ 5 ]==============================================================================


equal(textile.convert( // The textile

  "This is an !image.jpg!."

), // Should output

  "<p>This is an <img src=\"image.jpg\" alt=\"\" />.</p>");


// =[ 6 ]==============================================================================


equal(textile.convert( // The textile

  "This is an !image.jpg(with alt text)!."

), // Should output

  "<p>This is an <img src=\"image.jpg\" title=\"with alt text\" alt=\"with alt text\" />.</p>");


// =[ 7 ]==============================================================================


equal(textile.convert( // The textile

  "This is an !http://example.com/i/image.jpg!."

), // Should output

  "<p>This is an <img src=\"http://example.com/i/image.jpg\" alt=\"\" />.</p>");


// =[ 8 ]==============================================================================


equal(textile.convert( // The textile

  "This is an !http://example.com/i/image.jpg#a1!."

), // Should output

  "<p>This is an <img src=\"http://example.com/i/image.jpg#a1\" alt=\"\" />.</p>");


// =[ 9 ]==============================================================================


equal(textile.convert( // The textile

  "This is not an image!!!"

), // Should output

  "<p>This is not an image!!!</p>");


// =[ 10 ]==============================================================================


equal(textile.convert( // The textile

  "This is not an! image!"

), // Should output

  "<p>This is not an! image!</p>");


// =[ 11 ]==============================================================================


equal(textile.convert( // The textile

  "This is an !http://example.com/i/image.jpg!:#1"

), // Should output

  "<p>This is an <a href=\"#1\"><img src=\"http://example.com/i/image.jpg\" alt=\"\" /></a></p>");


// =[ 12 ]==============================================================================


equal(textile.convert( // The textile

  "This is an !http://example.com/i/image.jpg!:#a"

), // Should output

  "<p>This is an <a href=\"#a\"><img src=\"http://example.com/i/image.jpg\" alt=\"\" /></a></p>");


// =[ 13 ]==============================================================================


equal(textile.convert( // The textile

  "This is an !http://example.com/i/image.jpg!:#a1"

), // Should output

  "<p>This is an <a href=\"#a1\"><img src=\"http://example.com/i/image.jpg\" alt=\"\" /></a></p>");


// =[ 14 ]==============================================================================


equal(textile.convert( // The textile

  "This is an !http://example.com/i/image.jpg!:#a10"

), // Should output

  "<p>This is an <a href=\"#a10\"><img src=\"http://example.com/i/image.jpg\" alt=\"\" /></a></p>");


// =[ 15 ]==============================================================================


equal(textile.convert( // The textile

  "This is an !http://example.com/i/image.jpg!:index.html"

), // Should output

  "<p>This is an <a href=\"index.html\"><img src=\"http://example.com/i/image.jpg\" alt=\"\" /></a></p>");


// =[ 16 ]==============================================================================


equal(textile.convert( // The textile

  "This is an !http://example.com/i/image.jpg!:index.html#1"

), // Should output

  "<p>This is an <a href=\"index.html#1\"><img src=\"http://example.com/i/image.jpg\" alt=\"\" /></a></p>");


// =[ 17 ]==============================================================================


equal(textile.convert( // The textile

  "This is an !http://example.com/i/image.jpg!:index.html#a1"

), // Should output

  "<p>This is an <a href=\"index.html#a1\"><img src=\"http://example.com/i/image.jpg\" alt=\"\" /></a></p>");


// =[ 18 ]==============================================================================


equal(textile.convert( // The textile

  "This is an !http://example.com/i/image.jpg!:index.html#a10"

), // Should output

  "<p>This is an <a href=\"index.html#a10\"><img src=\"http://example.com/i/image.jpg\" alt=\"\" /></a></p>");


// =[ 19 ]==============================================================================


equal(textile.convert( // The textile

  "This is an !http://example.com/i/image.jpg!:index.html?foo=bar"

), // Should output

  "<p>This is an <a href=\"index.html?foo=bar\"><img src=\"http://example.com/i/image.jpg\" alt=\"\" /></a></p>");


// =[ 20 ]==============================================================================


equal(textile.convert( // The textile

  "This is an !http://example.com/i/image.jpg!:index.html?foo=bar#1"

), // Should output

  "<p>This is an <a href=\"index.html?foo=bar#1\"><img src=\"http://example.com/i/image.jpg\" alt=\"\" /></a></p>");


// =[ 21 ]==============================================================================


equal(textile.convert( // The textile

  "This is an !http://example.com/i/image.jpg!:index.html?foo=bar#a"

), // Should output

  "<p>This is an <a href=\"index.html?foo=bar#a\"><img src=\"http://example.com/i/image.jpg\" alt=\"\" /></a></p>");


// =[ 22 ]==============================================================================


equal(textile.convert( // The textile

  "This is an !http://example.com/i/image.jpg!:index.html?foo=bar#a1"

), // Should output

  "<p>This is an <a href=\"index.html?foo=bar#a1\"><img src=\"http://example.com/i/image.jpg\" alt=\"\" /></a></p>");


// =[ 23 ]==============================================================================


equal(textile.convert( // The textile

  "This is an !http://example.com/i/image.jpg!:index.html?foo=bar#a10"

), // Should output

  "<p>This is an <a href=\"index.html?foo=bar#a10\"><img src=\"http://example.com/i/image.jpg\" alt=\"\" /></a></p>");


// =[ 24 ]==============================================================================


equal(textile.convert( // The textile

  "This is an !http://example.com/i/image.jpg!:http://example.com/"

), // Should output

  "<p>This is an <a href=\"http://example.com/\"><img src=\"http://example.com/i/image.jpg\" alt=\"\" /></a></p>");


// =[ 25 ]==============================================================================


equal(textile.convert( // The textile

  "This is an !http://example.com/i/image.jpg!:http://example.com/#1"

), // Should output

  "<p>This is an <a href=\"http://example.com/#1\"><img src=\"http://example.com/i/image.jpg\" alt=\"\" /></a></p>");


// =[ 26 ]==============================================================================


equal(textile.convert( // The textile

  "This is an !http://example.com/i/image.jpg!:http://example.com/#a"

), // Should output

  "<p>This is an <a href=\"http://example.com/#a\"><img src=\"http://example.com/i/image.jpg\" alt=\"\" /></a></p>");


// =[ 27 ]==============================================================================


equal(textile.convert( // The textile

  "This is an !http://example.com/i/image.jpg!:http://example.com/#a1"

), // Should output

  "<p>This is an <a href=\"http://example.com/#a1\"><img src=\"http://example.com/i/image.jpg\" alt=\"\" /></a></p>");


// =[ 28 ]==============================================================================


equal(textile.convert( // The textile

  "This is an !http://example.com/i/image.jpg!:http://example.com/#a10"

), // Should output

  "<p>This is an <a href=\"http://example.com/#a10\"><img src=\"http://example.com/i/image.jpg\" alt=\"\" /></a></p>");


// =[ 29 ]==============================================================================


equal(textile.convert( // The textile

  "This is an !http://example.com/i/image.jpg!:http://example.com/index.html"

), // Should output

  "<p>This is an <a href=\"http://example.com/index.html\"><img src=\"http://example.com/i/image.jpg\" alt=\"\" /></a></p>");


// =[ 30 ]==============================================================================


equal(textile.convert( // The textile

  "This is an !http://example.com/i/image.jpg!:http://example.com/index.html#1"

), // Should output

  "<p>This is an <a href=\"http://example.com/index.html#1\"><img src=\"http://example.com/i/image.jpg\" alt=\"\" /></a></p>");


// =[ 31 ]==============================================================================


equal(textile.convert( // The textile

  "This is an !http://example.com/i/image.jpg!:http://example.com/index.html#a"

), // Should output

  "<p>This is an <a href=\"http://example.com/index.html#a\"><img src=\"http://example.com/i/image.jpg\" alt=\"\" /></a></p>");


// =[ 32 ]==============================================================================


equal(textile.convert( // The textile

  "This is an !http://example.com/i/image.jpg!:http://example.com/index.html#a1"

), // Should output

  "<p>This is an <a href=\"http://example.com/index.html#a1\"><img src=\"http://example.com/i/image.jpg\" alt=\"\" /></a></p>");


// =[ 33 ]==============================================================================


equal(textile.convert( // The textile

  "This is an !http://example.com/i/image.jpg!:http://example.com/index.html#a10"

), // Should output

  "<p>This is an <a href=\"http://example.com/index.html#a10\"><img src=\"http://example.com/i/image.jpg\" alt=\"\" /></a></p>");


// =[ 34 ]==============================================================================


equal(textile.convert( // The textile

  "This is an !http://example.com/i/image.jpg!:http://example.com/index.html?foo=bar"

), // Should output

  "<p>This is an <a href=\"http://example.com/index.html?foo=bar\"><img src=\"http://example.com/i/image.jpg\" alt=\"\" /></a></p>");


// =[ 35 ]==============================================================================


equal(textile.convert( // The textile

  "This is an !http://example.com/i/image.jpg!:http://example.com/index.html?foo=bar#1"

), // Should output

  "<p>This is an <a href=\"http://example.com/index.html?foo=bar#1\"><img src=\"http://example.com/i/image.jpg\" alt=\"\" /></a></p>");


// =[ 36 ]==============================================================================


equal(textile.convert( // The textile

  "This is an !http://example.com/i/image.jpg!:http://example.com/index.html?foo=bar#a"

), // Should output

  "<p>This is an <a href=\"http://example.com/index.html?foo=bar#a\"><img src=\"http://example.com/i/image.jpg\" alt=\"\" /></a></p>");


// =[ 37 ]==============================================================================


equal(textile.convert( // The textile

  "This is an !http://example.com/i/image.jpg!:http://example.com/index.html?foo=bar#a1"

), // Should output

  "<p>This is an <a href=\"http://example.com/index.html?foo=bar#a1\"><img src=\"http://example.com/i/image.jpg\" alt=\"\" /></a></p>");


// =[ 38 ]==============================================================================


equal(textile.convert( // The textile

  "This is an !http://example.com/i/image.jpg!:http://example.com/index.html?foo=bar#a10"

), // Should output

  "<p>This is an <a href=\"http://example.com/index.html?foo=bar#a10\"><img src=\"http://example.com/i/image.jpg\" alt=\"\" /></a></p>");


// =[ 39 ]==============================================================================


equal(textile.convert( // The textile

  "This is an !http://example.com/i/image.jpg!:http://example.com/index.html?foo=bar&a=b"

), // Should output

  "<p>This is an <a href=\"http://example.com/index.html?foo=bar&amp;a=b\"><img src=\"http://example.com/i/image.jpg\" alt=\"\" /></a></p>");


// =[ 40 ]==============================================================================


equal(textile.convert( // The textile

  "This is an !http://example.com/i/image.jpg!:http://example.com/index.html?foo=bar&a=b#1"

), // Should output

  "<p>This is an <a href=\"http://example.com/index.html?foo=bar&amp;a=b#1\"><img src=\"http://example.com/i/image.jpg\" alt=\"\" /></a></p>");


// =[ 41 ]==============================================================================


equal(textile.convert( // The textile

  "This is an !http://example.com/i/image.jpg!:http://example.com/index.html?foo=bar&a=b#a"

), // Should output

  "<p>This is an <a href=\"http://example.com/index.html?foo=bar&amp;a=b#a\"><img src=\"http://example.com/i/image.jpg\" alt=\"\" /></a></p>");


// =[ 42 ]==============================================================================


equal(textile.convert( // The textile

  "This is an !http://example.com/i/image.jpg!:http://example.com/index.html?foo=bar&a=b#a1"

), // Should output

  "<p>This is an <a href=\"http://example.com/index.html?foo=bar&amp;a=b#a1\"><img src=\"http://example.com/i/image.jpg\" alt=\"\" /></a></p>");


// =[ 43 ]==============================================================================


equal(textile.convert( // The textile

  "This is an !http://example.com/i/image.jpg!:http://example.com/index.html?foo=bar&a=b#a10"

), // Should output

  "<p>This is an <a href=\"http://example.com/index.html?foo=bar&amp;a=b#a10\"><img src=\"http://example.com/i/image.jpg\" alt=\"\" /></a></p>");


// =[ 44 ]==============================================================================


equal(textile.convert( // The textile

  "This is an !http://example.com/i/image.jpg!:http://example.com/index.html?foo=bar&a=b."

), // Should output

  "<p>This is an <a href=\"http://example.com/index.html?foo=bar&amp;a=b\"><img src=\"http://example.com/i/image.jpg\" alt=\"\" /></a>.</p>");


// =[ 45 ]==============================================================================


equal(textile.convert( // The textile

  "This is an !http://example.com/i/image.jpg!:http://example.com/index.html?foo=bar&a=b#1."

), // Should output

  "<p>This is an <a href=\"http://example.com/index.html?foo=bar&amp;a=b#1\"><img src=\"http://example.com/i/image.jpg\" alt=\"\" /></a>.</p>");


// =[ 46 ]==============================================================================


equal(textile.convert( // The textile

  "This is an !http://example.com/i/image.jpg!:http://example.com/index.html?foo=bar&a=b#a."

), // Should output

  "<p>This is an <a href=\"http://example.com/index.html?foo=bar&amp;a=b#a\"><img src=\"http://example.com/i/image.jpg\" alt=\"\" /></a>.</p>");


// =[ 47 ]==============================================================================


equal(textile.convert( // The textile

  "This is an !http://example.com/i/image.jpg!:http://example.com/index.html?foo=bar&a=b#a1."

), // Should output

  "<p>This is an <a href=\"http://example.com/index.html?foo=bar&amp;a=b#a1\"><img src=\"http://example.com/i/image.jpg\" alt=\"\" /></a>.</p>");


// =[ 48 ]==============================================================================


equal(textile.convert( // The textile

  "This is an !http://example.com/i/image.jpg!:http://example.com/index.html?foo=bar&a=b#a10."

), // Should output

  "<p>This is an <a href=\"http://example.com/index.html?foo=bar&amp;a=b#a10\"><img src=\"http://example.com/i/image.jpg\" alt=\"\" /></a>.</p>");


// =[ 49 ]==============================================================================


equal(textile.convert( // The textile

  "This is an !http://example.com/i/image.jpg!:http://example.com/index.html?foo=bar&a=b, but this is not."

), // Should output

  "<p>This is an <a href=\"http://example.com/index.html?foo=bar&amp;a=b\"><img src=\"http://example.com/i/image.jpg\" alt=\"\" /></a>, but this is not.</p>");


// =[ 50 ]==============================================================================


equal(textile.convert( // The textile

  "This is an !http://example.com/i/image.jpg!:http://example.com/index.html?foo=bar&a=b#1, but this is not."

), // Should output

  "<p>This is an <a href=\"http://example.com/index.html?foo=bar&amp;a=b#1\"><img src=\"http://example.com/i/image.jpg\" alt=\"\" /></a>, but this is not.</p>");


// =[ 51 ]==============================================================================


equal(textile.convert( // The textile

  "This is an !http://example.com/i/image.jpg!:http://example.com/index.html?foo=bar&a=b#a, but this is not."

), // Should output

  "<p>This is an <a href=\"http://example.com/index.html?foo=bar&amp;a=b#a\"><img src=\"http://example.com/i/image.jpg\" alt=\"\" /></a>, but this is not.</p>");


// =[ 52 ]==============================================================================


equal(textile.convert( // The textile

  "This is an !http://example.com/i/image.jpg!:http://example.com/index.html?foo=bar&a=b#a1, but this is not."

), // Should output

  "<p>This is an <a href=\"http://example.com/index.html?foo=bar&amp;a=b#a1\"><img src=\"http://example.com/i/image.jpg\" alt=\"\" /></a>, but this is not.</p>");


// =[ 53 ]==============================================================================


equal(textile.convert( // The textile

  "(This is an !http://example.com/i/image.jpg!:http://example.com/index.html?foo=bar&a=b#a10)  This is not."

), // Should output

  "<p>(This is an <a href=\"http://example.com/index.html?foo=bar&amp;a=b#a10\"><img src=\"http://example.com/i/image.jpg\" alt=\"\" /></a>)  This is not.</p>");


// =[ 54 ]==============================================================================


equal(textile.convert( // The textile

  "(This is an !http://example.com/i/image.jpg!:http://example.com/index.html?foo=bar&a=b)  This is not."

), // Should output

  "<p>(This is an <a href=\"http://example.com/index.html?foo=bar&amp;a=b\"><img src=\"http://example.com/i/image.jpg\" alt=\"\" /></a>)  This is not.</p>");


// =[ 55 ]==============================================================================


equal(textile.convert( // The textile

  "(This is an !http://example.com/i/image.jpg!:http://example.com/index.html?foo=bar&a=b#1)  This is not."

), // Should output

  "<p>(This is an <a href=\"http://example.com/index.html?foo=bar&amp;a=b#1\"><img src=\"http://example.com/i/image.jpg\" alt=\"\" /></a>)  This is not.</p>");


// =[ 56 ]==============================================================================


equal(textile.convert( // The textile

  "(This is an !http://example.com/i/image.jpg!:http://example.com/index.html?foo=bar&a=b#a)  This is not."

), // Should output

  "<p>(This is an <a href=\"http://example.com/index.html?foo=bar&amp;a=b#a\"><img src=\"http://example.com/i/image.jpg\" alt=\"\" /></a>)  This is not.</p>");


// =[ 57 ]==============================================================================


equal(textile.convert( // The textile

  "(This is an !http://example.com/i/image.jpg!:http://example.com/index.html?foo=bar&a=b#a1)  This is not."

), // Should output

  "<p>(This is an <a href=\"http://example.com/index.html?foo=bar&amp;a=b#a1\"><img src=\"http://example.com/i/image.jpg\" alt=\"\" /></a>)  This is not.</p>");


// =[ 58 ]==============================================================================


equal(textile.convert( // The textile

  "(This is an !http://example.com/i/image.jpg!:http://example.com/index.html?foo=bar&a=b#a10)  This is not."

), // Should output

  "<p>(This is an <a href=\"http://example.com/index.html?foo=bar&amp;a=b#a10\"><img src=\"http://example.com/i/image.jpg\" alt=\"\" /></a>)  This is not.</p>");


// =[ 59 ]==============================================================================


equal(textile.convert( // The textile

  "!../../image.jpg!"

), // Should output

  "<p><img src=\"../../image.jpg\" alt=\"\" /></p>"

,"image with relative src with dot");


// =[ 60 ]==============================================================================


equal(textile.convert( // The textile

  "!(myclass)image.jpg!"

), // Should output

  "<p><img class=\"myclass\" src=\"image.jpg\" alt=\"\" /></p>"

,"image with class");


// =[ 61 ]==============================================================================


equal(textile.convert( // The textile

  "!(myclass). image.jpg!"

), // Should output

  "<p><img class=\"myclass\" src=\"image.jpg\" alt=\"\" /></p>"

,"image with class and dotspace");


// =[ 62 ]==============================================================================


equal(textile.convert( // The textile

  "!(myclass)../../image.jpg!"

), // Should output

  "<p><img class=\"myclass\" src=\"../../image.jpg\" alt=\"\" /></p>"

,"image with class and relative src with dots");


// =[ 63 ]==============================================================================


equal(textile.convert( // The textile

  "!(myclass). ../../image.jpg!"

), // Should output

  "<p><img class=\"myclass\" src=\"../../image.jpg\" alt=\"\" /></p>"

,"image with class and dotspace and relative src with dots");


// =[ 64 ]==============================================================================


equal(textile.convert( // The textile

  "!{color:red}image.jpg!"

), // Should output

  "<p><img style=\"color:red\" src=\"image.jpg\" alt=\"\" /></p>"

,"image with style");


// =[ 65 ]==============================================================================


equal(textile.convert( // The textile

  "!{color:red}. image.jpg!"

), // Should output

  "<p><img style=\"color:red\" src=\"image.jpg\" alt=\"\" /></p>"

,"image with style and dotspace");


// =[ 66 ]==============================================================================


equal(textile.convert( // The textile

  "!/pictures/cat_and_fox.jpg(Trady Blix & The cartoon fox)!"

), // Should output

  "<p><img src=\"/pictures/cat_and_fox.jpg\" title=\"Trady Blix &amp; The cartoon fox\" alt=\"Trady Blix &amp; The cartoon fox\" /></p>"

,"image attributes has ampersand html entity in alt and title");


// =[ 67 ]==============================================================================


equal(textile.convert( // The textile

  "!/pictures/bacon.jpg(The fox said: \"Have some chunky bacon\")!"

), // Should output

  "<p><img src=\"/pictures/bacon.jpg\" title=\"The fox said: &quot;Have some chunky bacon&quot;\" alt=\"The fox said: &quot;Have some chunky bacon&quot;\" /></p>"

,"image attributes has double quote html entity in alt and title");


// =[ 68 ]==============================================================================


equal(textile.convert( // The textile

  "!/pictures/bacon.jpg(The fox said: 'Have some chunky bacon')!"

), // Should output

  "<p><img src=\"/pictures/bacon.jpg\" title=\"The fox said: &#39;Have some chunky bacon&#39;\" alt=\"The fox said: &#39;Have some chunky bacon&#39;\" /></p>"

,"image attributes has single quote html entity in alt and title");


// =[ 69 ]==============================================================================


equal(textile.convert( // The textile

  "This is an [!image.jpg!] you see."

), // Should output

  "<p>This is an <img src=\"image.jpg\" alt=\"\" /> you see.</p>"

,"in square brackets");


// =[ 70 ]==============================================================================


equal(textile.convert( // The textile

  "This is an [!image.jpg!:http://example.com/] you see."

), // Should output

  "<p>This is an <a href=\"http://example.com/\"><img src=\"image.jpg\" alt=\"\" /></a> you see.</p>"

,"with link in square brackets");


// =[ 71 ]==============================================================================


equal(textile.convert( // The textile

  "!http://commons.wikimedia.org/wiki/File:Rubis_sur_calcite_2(Vietnam).jpg!"

), // Should output

  "<p><img src=\"http://commons.wikimedia.org/wiki/File:Rubis_sur_calcite_2(Vietnam).jpg\" alt=\"\" /></p>"

,"url containing parentheses");


// =[ 72 ]==============================================================================


equal(textile.convert( // The textile

  "!http://commons.wikimedia.org/wiki/File:Rubis_sur_calcite_2(Vietnam).jpg(a big rock)!"

), // Should output

  "<p><img src=\"http://commons.wikimedia.org/wiki/File:Rubis_sur_calcite_2(Vietnam).jpg\" title=\"a big rock\" alt=\"a big rock\" /></p>"

,"with alt and url containing parentheses");


// =[ 73 ]==============================================================================


equal(textile.convert( // The textile

  "!image.jpg(Alt text with (parentheses).)!"

), // Should output

  "<p><img src=\"image.jpg\" title=\"Alt text with (parentheses).\" alt=\"Alt text with (parentheses).\" /></p>"

,"with link that contains parentheses");


// =[ 74 ]==============================================================================


equal(textile.convert( // The textile

  "!/image_r.jpg(description)!:image.jpg text."

), // Should output

  "<p><a href=\"image.jpg\"><img src=\"/image_r.jpg\" title=\"description\" alt=\"description\" /></a> text.</p>"+
  ""

,"with link and title and text afterward");


});

