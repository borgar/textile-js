test('definitions.yml', function () {


// =[ 1 ]==============================================================================


equal(textile.convert( // The textile

  "here is a RedCloth definition list:\n"+
  "\n"+
  "- yes := no\n"+
  "- no:=no\n"+
  "- maybe:= yes"

), // Should output

  "<p>here is a RedCloth definition list:</p>\n"+
  "<dl>\n"+
  "\t<dt>yes</dt>\n"+
  "\t<dd>no</dd>\n"+
  "\t<dt>no</dt>\n"+
  "\t<dd>no</dd>\n"+
  "\t<dt>maybe</dt>\n"+
  "\t<dd>yes</dd>\n"+
  "</dl>"

,"redcloth definition list");


// =[ 2 ]==============================================================================


equal(textile.convert( // The textile

  "- term := you can have line breaks\n"+
  "just like other lists\n"+
  "- line-spanning\n"+
  "term := hey, slick!"

), // Should output

  "<dl>\n"+
  "\t<dt>term</dt>\n"+
  "\t<dd>you can have line breaks<br />\n"+
  "just like other lists</dd>\n"+
  "\t<dt>line-spanning<br />\n"+
  "term</dt>\n"+
  "\t<dd>hey, slick!</dd>\n"+
  "</dl>"

,"with line breaks");


// =[ 3 ]==============================================================================


equal(textile.convert( // The textile

  "You can have multiple terms before a definition:\n"+
  "\n"+
  "- textile\n"+
  "- fabric\n"+
  "- cloth := woven threads"

), // Should output

  "<p>You can have multiple terms before a definition:</p>\n"+
  "<dl>\n"+
  "\t<dt>textile</dt>\n"+
  "\t<dt>fabric</dt>\n"+
  "\t<dt>cloth</dt>\n"+
  "\t<dd>woven threads</dd>\n"+
  "</dl>"

,"double terms");


// =[ 4 ]==============================================================================


equal(textile.convert( // The textile

  "- textile\n"+
  "- fabric\n"+
  "- cloth"

), // Should output

  "<p>- textile<br />\n"+
  "- fabric<br />\n"+
  "- cloth</p>"

,"not a definition list");


// =[ 5 ]==============================================================================


equal(textile.convert( // The textile

  "here is a long definition\n"+
  "\n"+
  "- some term := \n"+
  "*sweet*\n"+
  "\n"+
  "yes\n"+
  "\n"+
  "ok =:\n"+
  "- regular term := no"

), // Should output

  "<p>here is a long definition</p>\n"+
  "<dl>\n"+
  "\t<dt>some term</dt>\n"+
  "\t<dd><p><strong>sweet</strong></p>\n"+
  "<p>yes</p>\n"+
  "<p>ok</p></dd>\n"+
  "\t<dt>regular term</dt>\n"+
  "\t<dd>no</dd>\n"+
  "</dl>\n"+
  ""

,"long definition list");


});

