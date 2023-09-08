import test from 'tape';
import { textile } from '../src/index.js';

test('jstextile options', t => {
  const paragraph = 'Some paragraph\nwith a linebreak.';
  // By default, inline linebreaks will be converted to html linebreaks
  t.is(textile(paragraph),
    '<p>Some paragraph<br />\nwith a linebreak.</p>');
  t.is(textile(paragraph, { breaks: false }),
    '<p>Some paragraph\nwith a linebreak.</p>');
  t.end();
});


test('jstextile options', t => {
  // linebreak option works in tables
  t.is(textile('|a|b\nc|d|\n|a|b|c|\n'),
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
    '</table>');
  t.is(textile('|a|b\nc|d|\n|a|b|c|\n', { breaks: false }),
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
    '</table>');
  t.end();
});

