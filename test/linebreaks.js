test('jstextile linebreaks', function () {


// converted/basic with extra CRs

equal(textile.convert( // The textile

  "A single paragraph.\r\n"+
  "\r\n"+
  "Followed by another."

), // Should output

  "<p>A single paragraph.</p>\n"+
  "<p>Followed by another.</p>"

,"paragraphs");


equal(textile.convert( // The textile

  "This is line one\r\n"+
  " \r\n"+
  "This is line two"

), // Should output

  "<p>This is line one</p>\n"+
  "<p>This is line two</p>"

,"blocks with spaces on the blank line in between");


equal(textile.convert( // The textile

  "This is line one\r\n"+
  "\t\r\n"+
  "This is line two"

), // Should output

  "<p>This is line one</p>\n"+
  "<p>This is line two</p>"

,"blocks with tabl on the blank line in between");


equal(textile.convert( // The textile

  "bq.. I saw a ship. It ate my elephant.\r\n"+
  "\r\n"+
  "When the elephant comes to take a p. you..."

), // Should output

  "<blockquote>\n"+
  "<p>I saw a ship. It ate my elephant.</p>\n"+
  "<p>When the elephant comes to take a p. you&#8230;</p>\n"+
  "</blockquote>"

,"extended blockquote containing block start");


equal(textile.convert( // The textile

  "Some text:\r\n"+
  "\r\n"+
  "<notextile>\r\n"+
  "<div class=\"example\"><pre>\r\n"+
  "Some code\r\n"+
  "</pre></div>\r\n"+
  "</notextile>\r\n"+
  "\r\n"+
  "Some more text."

), // Should output

  "<p>Some text:</p>\n"+
  "<div class=\"example\"><pre>\r\n"+
  "Some code\r\n"+
  "</pre></div>\n"+
  "<p>Some more text.</p>"

,"notextile block");


equal(textile.convert( // The textile

  "notextile.. I saw a ship. It ate my elephant.\r\n"+
  "\r\n"+
  "When the elephant comes to take a p. you..."

), // Should output

  "I saw a ship. It ate my elephant.\r\n"+
  "\r\n"+
  "When the elephant comes to take a p. you..."

,"extended notextile block containing block start");


equal(textile.convert( // The textile

  "I am <b>very</b> serious.\r\n"+
  "\r\n"+
  "<pre>\r\n"+
  "  I am <b>very</b> serious.\r\n"+
  "</pre>"

), // Should output

  "<p>I am <b>very</b> serious.</p>\n"+
  "<pre>\r\n"+
  "  I am &lt;b&gt;very&lt;/b&gt; serious.\r\n"+
  "</pre>"

,"html tags");


equal(textile.convert( // The textile

  "I spoke.\r\n"+
  "And none replied."

), // Should output

  "<p>I spoke.<br />\n"+
  "And none replied.</p>"

,"line breaks");


equal(textile.convert( // The textile

  "Any old text\r\n"+
  "\r\n"+
  "bq. A block quotation.\r\n"+
  "\r\n"+
  "Any old text"

), // Should output

  "<p>Any old text</p>\n"+
  "<blockquote>\n"+
  "<p>A block quotation.</p>\n"+
  "</blockquote>\n"+
  "<p>Any old text</p>"

,"blockquote");


equal(textile.convert( // The textile

  "<pre>\r\n"+
  "<code>\r\n"+
  "  a.gsub!( /</, '' )\r\n"+
  "</code>\r\n"+
  "</pre>"

), // Should output

  "<pre>\r\n"+
  "<code>\r\n"+
  "  a.gsub!( /&lt;/, '' )\r\n"+
  "</code>\r\n"+
  "</pre>"

,"code blocks");


equal(textile.convert( // The textile

  "# A first item\r\n"+
  "# A second item\r\n"+
  "# A third"

), // Should output

  "<ol>\n"+
  "\t<li>A first item</li>\n"+
  "\t<li>A second item</li>\n"+
  "\t<li>A third</li>\n"+
  "</ol>"

,"numbered list");


equal(textile.convert( // The textile

  "# Fuel could be:\r\n"+
  "## Coal\r\n"+
  "## Gasoline\r\n"+
  "## Electricity\r\n"+
  "# Humans need only:\r\n"+
  "## Water\r\n"+
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


equal(textile.convert( // The textile

  "* A first item\r\n"+
  "* A second item\r\n"+
  "* A third"

), // Should output

  "<ul>\n"+
  "\t<li>A first item</li>\n"+
  "\t<li>A second item</li>\n"+
  "\t<li>A third</li>\n"+
  "</ul>"

,"bulleted list");


equal(textile.convert( // The textile

  "* Fuel could be:\r\n"+
  "** Coal\r\n"+
  "** Gasoline\r\n"+
  "** Electricity\r\n"+
  "* Humans need only:\r\n"+
  "** Water\r\n"+
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


equal(textile.convert( // The textile

  "!>obake.gif!\r\n"+
  "\r\n"+
  "And others sat all round the small\r\n"+
  "machine and paid it to sing to them."

), // Should output

  "<p><img align=\"right\" src=\"obake.gif\" alt=\"\" /></p>\n"+
  "<p>And others sat all round the small<br />\n"+
  "machine and paid it to sing to them.</p>"

,"image alignments");


equal(textile.convert( // The textile

  "| name | age | sex |\r\n"+
  "| joan | 24 | f |\r\n"+
  "| archie | 29 | m |\r\n"+
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


equal(textile.convert( // HTML comment

'line\r\n'+
'<!-- line -->\r\n'+
'line'

), // Should output

"<p>line<br />\n"+
"<!-- line --><br />\n"+
"line</p>"

);



equal(textile.convert(

"line\r\n"+
"\r\n"+
"<!-- line -->\r\n"+
"\r\n"+
"line"

), // Should output

"<p>line</p>\n"+
"<!-- line -->\n"+
"<p>line</p>"

);


equal(textile.convert( // non list 3

  "*\r\n"

), // Should output

  "<p>*</p>"

,"non list #3");


equal(textile.convert( // non list 4

  "#\r\n"

), // Should output

  "<p>#</p>"

,"non list #4");


equal(textile.convert( // non list 5

  "*\r\ntest"

), // Should output

  "<p>*<br />\ntest</p>"

,"non list #5");


equal(textile.convert( // empty list 1

  "* \r\n"

), // Should output

  "<p>* </p>"

,"empty list #1");

equal(textile.convert( // empty list 2

  "# \r\n"

), // Should output

  "<p># </p>"

,"empty list #2");

equal(textile.convert( // insert empty list 1

  "*\r\n\r\ntest"

), // Should output

  "<p>*</p>\n<p>test</p>"

,"insert empty list #1");

equal(textile.convert( // insert empty list 2

  "#\r\n\r\ntest"

), // Should output

  "<p>#</p>\n<p>test</p>"

,"insert empty list #2");


equal(textile.convert( // strict list matching (1)

  '*{color:red} item*\r\n\r\n'+
  '* item*\r\n\r\n'+
  '*item*'

), // Should output

  '<ul style="color:red">\n'+
  '\t<li>item*</li>\n'+
  '</ul>\n'+
  '<ul>\n'+
  '\t<li>item*</li>\n'+
  '</ul>\n'+
  '<p><strong>item</strong></p>'

,"strict list matching (1)");

equal(textile.convert( // strict list matching (2)

  '*{color:red} item\r\n\r\n'+
  '* item\r\n\r\n'+
  '*item'

), // Should output

  '<ul style="color:red">\n'+
  '\t<li>item</li>\n'+
  '</ul>\n'+
  '<ul>\n'+
  '\t<li>item</li>\n'+
  '</ul>\n'+
  '<p>*item</p>'

,"strict list matching (2)");








// greedy globbing block parser bug [#21] 

equal(textile.convert( // The textile

  "pab\r\n\r\n"+
  "pabcde\r\n\r\n"+
  "bqabcdef\r\n\r\n"+
  "last line ending in period+space. \r\n"

), // Should output

  '<p>pab</p>\n'+
  '<p>pabcde</p>\n'+
  '<p>bqabcdef</p>\n'+
  '<p>last line ending in period+space. </p>'

,"block parser bug (#21)");





equal(textile.convert( // The textile

  "h1. Header\r\n"+
  "\r\n"+
  "text"

), // Should output

  "<h1>Header</h1>\n"+
  "<p>text</p>"

,"header with 1 blank line below");


equal(textile.convert( // The textile

  "h1. Header\r\n"+
  "\r\n"+
  "\r\n"+
  "text"

), // Should output

  "<h1>Header</h1>\n"+
  "<p>text</p>"

,"header with 2 blank lines below");


equal(textile.convert( // The textile

  "text\r\n"+
  "\r\n"+
  "h1. Header"

), // Should output

  "<p>text</p>\n"+
  "<h1>Header</h1>"

,"header with 1 blank line above");


equal(textile.convert( // The textile

  "text\r\n"+
  "\r\n"+
  "\r\n"+
  "h1. Header"

), // Should output

  "<p>text</p>\n"+
  "<h1>Header</h1>"

,"header with 2 blank lines above");







equal(textile.convert( // The textile

  "* 1\n"+
  "* 2\n"+
  "* 3\n"

), // Should output

  "<ul>\n"+
  "\t<li>1</li>\n"+
  "\t<li>2</li>\n"+
  "\t<li>3</li>\n"+
  "</ul>"

,"list line break bug 1");

equal(textile.convert( // The textile

  "* 1\r\n"+
  "* 2\r\n"+
  "* 3\r\n"

), // Should output

  "<ul>\n"+
  "\t<li>1</li>\n"+
  "\t<li>2</li>\n"+
  "\t<li>3</li>\n"+
  "</ul>"

,"list line break bug 2");





// definitions

equal(textile.convert( // The textile

  "- term := you can have line breaks\r\n"+
  "just like other lists\r\n"+
  "- line-spanning\r\n"+
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


equal(textile.convert( // The textile

  "You can have multiple terms before a definition:\r\n"+
  "\r\n"+
  "- textile\r\n"+
  "- fabric\r\n"+
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


equal(textile.convert( // The textile

  "- textile\r\n"+
  "- fabric\r\n"+
  "- cloth"

), // Should output

  "<p>- textile<br />\n"+
  "- fabric<br />\n"+
  "- cloth</p>"

,"not a definition list");


equal(textile.convert( // The textile

  "here is a long definition\r\n"+
  "\r\n"+
  "- some term := \r\n"+
  "*sweet*\r\n"+
  "\r\n"+
  "yes\r\n"+
  "\r\n"+
  "ok =:\r\n"+
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
  "</dl>"

,"long definition list");






});
