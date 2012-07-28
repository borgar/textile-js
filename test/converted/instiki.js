test('instiki.yml', function () {


// =[ 1 ]==============================================================================


equal(textile.convert( // The textile

  "_Hi, <span class=\"newWikiWord\">Joe Bob<a href=\"../show/JoeBob\">?</a></span>, this should all be in italic!_"

), // Should output

  "<p><em>Hi, <span class=\"newWikiWord\">Joe Bob<a href=\"../show/JoeBob\">?</a></span>, this should all be in italic!</em></p>");


// =[ 2 ]==============================================================================


equal(textile.convert( // The textile

  "*this <span>span</span> is strong*"

), // Should output

  "<p><strong>this <span>span</span> is strong</strong></p>");


// =[ 3 ]==============================================================================


equal(textile.convert( // The textile

  "*this <span>Camel Thing<a href=\"../show/CamelThing\">?</a></span> is strong*"

), // Should output

  "<p><strong>this <span>Camel Thing<a href=\"../show/CamelThing\">?</a></span> is strong</strong></p>");


// =[ 4 ]==============================================================================


equal(textile.convert( // The textile

  "_this <span>span</span> is italic_"

), // Should output

  "<p><em>this <span>span</span> is italic</em></p>");


// =[ 5 ]==============================================================================


equal(textile.convert( // The textile

  "%{color:red}nested span because of <span><span class=\"newWikiWord\">Camel Word<a href=\"../show/CamelWord\">?</a></span></span>%"

), // Should output

  "<p><span style=\"color:red;\">nested span because of <span><span class=\"newWikiWord\">Camel Word<a href=\"../show/CamelWord\">?</a></span></span></span></p>");


// =[ 6 ]==============================================================================


equal(textile.convert( // The textile

  "h2. Version History\n"+
  "\n"+
  "* \"Version\n"+
  "0.0\":http://www.threewordslong.com/render-0-8-9b.patch - Early version using MD5 hashes.\n"+
  "* \"Version\n"+
  "0.1\":http://www.threewordslong.com/chunk-0-1.patch.gz - First cut of new system. Much cleaner.\n"+
  "* \"Version 0.2\":http://www.threewordslong.com/chunk-0-2.patch.gz - Fixed problem with \"authors\" page and some tests."

), // Should output

  "<h2>Version History</h2>\n"+
  "<ul>\n"+
  "\t<li><a href=\"http://www.threewordslong.com/render-0-8-9b.patch\">Version<br />\n"+
  "0.0</a> &#8211; Early version using MD5 hashes.</li>\n"+
  "\t<li><a href=\"http://www.threewordslong.com/chunk-0-1.patch.gz\">Version<br />\n"+
  "0.1</a> &#8211; First cut of new system. Much cleaner.</li>\n"+
  "\t<li><a href=\"http://www.threewordslong.com/chunk-0-2.patch.gz\">Version 0.2</a> &#8211; Fixed problem with &#8220;authors&#8221; page and some tests.</li>\n"+
  "</ul>");


// =[ 7 ]==============================================================================


equal(textile.convert( // The textile

  "--richSeymour --whyTheLuckyStiff"

), // Should output

  "<p>&#8212;richSeymour &#8212;whyTheLuckyStiff</p>");


});

