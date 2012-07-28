test('extra_whitespace.yml', function () {


// =[ 1 ]==============================================================================


equal(textile.convert( // The textile

  "h1. Header\n"+
  "\n"+
  "text"

), // Should output

  "<h1>Header</h1>\n"+
  "<p>text</p>"

,"header with 1 blank line below");


// =[ 2 ]==============================================================================


equal(textile.convert( // The textile

  "h1. Header\n"+
  "\n"+
  "\n"+
  "text"

), // Should output

  "<h1>Header</h1>\n"+
  "<p>text</p>"

,"header with 2 blank lines below");


// =[ 3 ]==============================================================================


equal(textile.convert( // The textile

  "text\n"+
  "\n"+
  "h1. Header"

), // Should output

  "<p>text</p>\n"+
  "<h1>Header</h1>"

,"header with 1 blank line above");


// =[ 4 ]==============================================================================


equal(textile.convert( // The textile

  "text\n"+
  "\n"+
  "\n"+
  "h1. Header"

), // Should output

  "<p>text</p>\n"+
  "<h1>Header</h1>"

,"header with 2 blank lines above");


});

