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
