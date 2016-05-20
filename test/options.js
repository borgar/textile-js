import test from 'ava';
import textile from '../src';

test( 'jstextile options', function ( t ) {
  var paragraph = 'Some paragraph\nwith a linebreak.';
  // By default, inline linebreaks will be converted to html linebreaks
  t.is( textile.convert( paragraph ),
    '<p>Some paragraph<br />\nwith a linebreak.</p>' );
  t.is( textile.convert( paragraph, { breaks: false }),
    '<p>Some paragraph\nwith a linebreak.</p>' );
});

test( 'jstextile options', function ( t ) {
  // linebreak option works in tables
  t.is( textile.convert( '|a|b\nc|d|\n|a|b|c|\n' ),
    '<table>\n' +
    '\t<tr>\n' +
    '\t\t<td>a</td>\n' +
    '\t\t<td>b<br />\nc</td>\n' +
    '\t\t<td>d</td>\n' +
    '\t</tr>\n' +
    '\t<tr>\n' +
    '\t\t<td>a</td>\n' +
    '\t\t<td>b</td>\n' +
    '\t\t<td>c</td>\n' +
    '\t</tr>\n' +
    '</table>' );
  t.is( textile.convert( '|a|b\nc|d|\n|a|b|c|\n', { breaks: false }),
    '<table>\n' +
    '\t<tr>\n' +
    '\t\t<td>a</td>\n' +
    '\t\t<td>b\nc</td>\n' +
    '\t\t<td>d</td>\n' +
    '\t</tr>\n' +
    '\t<tr>\n' +
    '\t\t<td>a</td>\n' +
    '\t\t<td>b</td>\n' +
    '\t\t<td>c</td>\n' +
    '\t</tr>\n' +
    '</table>' );
});

test( 'jstextile options', function ( t ) {
  var paragraph = 'Some paragraph\nwith a linebreak.';
  var savedOptions = {};
  for ( var k in textile.defaults ) {
    savedOptions[k] = textile.defaults[k];
  }
  // setting a global option makes it the subsequent default
  textile.setOptions({ breaks: false });
  t.is( textile.convert( paragraph ),
    '<p>Some paragraph\nwith a linebreak.</p>' );
  // the default has changed, but passing options overrides new defult
  t.is( textile.convert( paragraph, { breaks: true }),
    '<p>Some paragraph<br />\nwith a linebreak.</p>' );
  // ... and doesn't affect the new default
  t.is( textile.convert( paragraph ),
    '<p>Some paragraph\nwith a linebreak.</p>' );
  // reset options --
  textile.setOptions( savedOptions );
});
