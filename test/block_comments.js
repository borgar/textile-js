test('Textile comments', function () {



equal(textile.convert( // Textile comments

  "###. Here's a comment.\n"+
  "\n"+
  "h3. Hello\n"+
  "\n"+
  "###. And\n"+
  "another\n"+
  "one.\n"+
  "\n"+
  "Goodbye.\n"

), // Should output

  "<h3>Hello</h3>\n"+
  "\n"+
  "<p>Goodbye.</p>"

);


equal(textile.convert( // Textile comments

  "Some text here.\n"+
  "\n"+
  "###. This is a textile comment block.\n"+
  "It will be removed from your document.\n"+
  "\n"+
  "More text to follow.\n"

), // Should output

  "<p>Some text here.</p>\n"+
  "\n"+
  "<p>More text to follow.</p>"

);


equal(textile.convert( // Textile comments extended

  "Some text here.\n"+
  "\n"+
  "###.. This is a textile comment block.\n"+
  "It will be removed from your document.\n"+
  "\n"+
  "This is also a comment.\n"+
  "\n"+
  "p. More text to follow.\n"

), // Should output

  "<p>Some text here.</p>\n"+
  "\n"+
  "<p>More text to follow.</p>"

);





});
