test('options.yml', function () {

var paragraph = "Some paragraph\nwith a linebreak.";


// =[ 1 ]=  By default, inline linebreaks will be converted to html linebreaks  =======
equal(textile.convert(paragraph), "<p>Some paragraph<br />\nwith a linebreak.</p>");
equal(textile.convert(paragraph, {breaks:false}), "<p>Some paragraph\nwith a linebreak.</p>");

});
