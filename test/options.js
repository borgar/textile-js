test('jstextile options', function () {
var _saved_options = {};
for ( var k in textile.defaults ) { _saved_options[k] = textile.defaults[k]; }

var paragraph = "Some paragraph\nwith a linebreak.";

// By default, inline linebreaks will be converted to html linebreaks
equal(
  textile.convert(paragraph),
  "<p>Some paragraph<br />\nwith a linebreak.</p>"
);

equal(
  textile.convert(paragraph, { breaks: false }),
  "<p>Some paragraph\nwith a linebreak.</p>"
);


// linebreak option works in tables
equal(textile.convert( // The textile
  "|a|b\nc|d|\n"+
  "|a|b|c|\n"
), // Should output
  "<table>\n"+
  "\t<tr>\n"+
  "\t\t<td>a</td>\n"+
  "\t\t<td>b<br />\nc</td>\n"+
  "\t\t<td>d</td>\n"+
  "\t</tr>\n"+
  "\t<tr>\n"+
  "\t\t<td>a</td>\n"+
  "\t\t<td>b</td>\n"+
  "\t\t<td>c</td>\n"+
  "\t</tr>\n"+
  "</table>"
);
equal(textile.convert( // The textile
  "|a|b\nc|d|\n"+
  "|a|b|c|\n"
, { breaks: false }), // Should output
  "<table>\n"+
  "\t<tr>\n"+
  "\t\t<td>a</td>\n"+
  "\t\t<td>b\nc</td>\n"+
  "\t\t<td>d</td>\n"+
  "\t</tr>\n"+
  "\t<tr>\n"+
  "\t\t<td>a</td>\n"+
  "\t\t<td>b</td>\n"+
  "\t\t<td>c</td>\n"+
  "\t</tr>\n"+
  "</table>"
);



// setting a global option makes it the subsequent default
textile.setOptions({ breaks: false });
equal(
  textile.convert(paragraph),
  "<p>Some paragraph\nwith a linebreak.</p>"
);

// the default has changed, but passing options overrides new defult
equal(
  textile.convert(paragraph, { breaks: true }),
  "<p>Some paragraph<br />\nwith a linebreak.</p>"
);

// ... and doesn't affect the new default
equal(
  textile.convert(paragraph),
  "<p>Some paragraph\nwith a linebreak.</p>"
);



// reset options --
textile.setOptions( _saved_options );
});
