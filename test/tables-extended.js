import test from 'tape';
import textile from '../src/index.js';
// extened table syntax

test('headers and cells', t => {
  const tx = `|_. First Header |_. Second Header |
| Content Cell | Content Cell |`;
  t.is(textile.convert(tx),
    `<table>
\t<tr>
\t\t<th>First Header </th>
\t\t<th>Second Header </th>
\t</tr>
\t<tr>
\t\t<td> Content Cell </td>
\t\t<td> Content Cell </td>
\t</tr>
</table>`, tx);
  t.end();
});



test('captions', t => {
  const tx = `|=. Your caption goes here
|foo|bar|`;
  t.is(textile.convert(tx),
    `<table>
\t<caption>Your caption goes here</caption>
\t<tbody>
\t\t<tr>
\t\t\t<td>foo</td>
\t\t\t<td>bar</td>
\t\t</tr>
\t</tbody>
</table>`, tx);
  t.end();
});



test('tailing pipes should be stripped from captions', t => {
  const tx = `|=. caption |
| foo |

|=. caption
| foo |`;
  t.is(textile.convert(tx),
    `<table>
\t<caption>caption</caption>
\t<tbody>
\t\t<tr>
\t\t\t<td> foo </td>
\t\t</tr>
\t</tbody>
</table>
<table>
\t<caption>caption</caption>
\t<tbody>
\t\t<tr>
\t\t\t<td> foo </td>
\t\t</tr>
\t</tbody>
</table>`, tx);
  t.end();
});



test('table summary', t => {
  const tx = `table(myTable). This is a journey into sound. Stereophonic sound.
| foo |`;
  t.is(textile.convert(tx),
    `<table class="myTable" summary="This is a journey into sound. Stereophonic sound.">
\t<tr>
\t\t<td> foo </td>
\t</tr>
</table>`, tx);
  t.end();
});



test('tbody/thead/tfoot', t => {
  const tx = `|^.
|in head|
|~.
|in foot|
|-.
|in body|`;
  t.is(textile.convert(tx),
    `<table>
\t<thead>
\t\t<tr>
\t\t\t<td>in head</td>
\t\t</tr>
\t</thead>
\t<tfoot>
\t\t<tr>
\t\t\t<td>in foot</td>
\t\t</tr>
\t</tfoot>
\t<tbody>
\t\t<tr>
\t\t\t<td>in body</td>
\t\t</tr>
\t</tbody>
</table>`, tx);
  t.end();
});



test('colgroup', t => {
  const tx = `|:. 100|
|cell|`;
  t.is(textile.convert(tx),
    `<table>
\t<colgroup width="100">
\t</colgroup>
\t<tbody>
\t\t<tr>
\t\t\t<td>cell</td>
\t\t</tr>
\t</tbody>
</table>`, tx);
  t.end();
});



test('colgroup span size', t => {
  const tx = `|:\\3. 100|
|cell|`;
  t.is(textile.convert(tx),
    `<table>
\t<colgroup span="3" width="100">
\t</colgroup>
\t<tbody>
\t\t<tr>
\t\t\t<td>cell</td>
\t\t</tr>
\t</tbody>
</table>`, tx);
  t.end();
});



test('can target individual cols', t => {
  const tx = `|:. |\\2. |\\3. 50|
|cell|cell|`;
  t.is(textile.convert(tx),
    `<table>
\t<colgroup>
\t\t<col span="2" />
\t\t<col span="3" width="50" />
\t</colgroup>
\t<tbody>
\t\t<tr>
\t\t\t<td>cell</td>
\t\t\t<td>cell</td>
\t\t</tr>
\t</tbody>
</table>`, tx);
  t.end();
});



test('can style colgroup', t => {
  const tx = `|:\\5(grpclass#grpid). 200 | 100 |||80|
|cell|cell|`;
  t.is(textile.convert(tx),
    `<table>
\t<colgroup span="5" class="grpclass" id="grpid" width="200">
\t\t<col width="100" />
\t\t<col />
\t\t<col />
\t\t<col width="80" />
\t</colgroup>
\t<tbody>
\t\t<tr>
\t\t\t<td>cell</td>
\t\t\t<td>cell</td>
\t\t</tr>
\t</tbody>
</table>`, tx);
  t.end();
});



test('extened table syntax:10', t => {
  const tx = `|^.
|_. First Header |_. Second Header |
|-.
| Content Cell | Content Cell |
| Content Cell | Content Cell |`;
  t.is(textile.convert(tx),
    `<table>
\t<thead>
\t\t<tr>
\t\t\t<th>First Header </th>
\t\t\t<th>Second Header </th>
\t\t</tr>
\t</thead>
\t<tbody>
\t\t<tr>
\t\t\t<td> Content Cell </td>
\t\t\t<td> Content Cell </td>
\t\t</tr>
\t\t<tr>
\t\t\t<td> Content Cell </td>
\t\t\t<td> Content Cell </td>
\t\t</tr>
\t</tbody>
</table>`, tx);
  t.end();
});



test('extened table syntax:11', t => {
  const tx = `|~.
|\\2=. A footer, centered & across two columns |
|-.
| Content Cell | Content Cell |
| Content Cell | Content Cell |
`;
  t.is(textile.convert(tx),
    `<table>
\t<tfoot>
\t\t<tr>
\t\t\t<td style="text-align:center" colspan="2">A footer, centered &amp; across two columns </td>
\t\t</tr>
\t</tfoot>
\t<tbody>
\t\t<tr>
\t\t\t<td> Content Cell </td>
\t\t\t<td> Content Cell </td>
\t\t</tr>
\t\t<tr>
\t\t\t<td> Content Cell </td>
\t\t\t<td> Content Cell </td>
\t\t</tr>
\t</tbody>
</table>`, tx);
  t.end();
});



test('styleable cells', t => {
  const tx = `|a|{color:red}. styled|cell|
`;
  t.is(textile.convert(tx),
    `<table>
\t<tr>
\t\t<td>a</td>
\t\t<td style="color:red">styled</td>
\t\t<td>cell</td>
\t</tr>
</table>`, tx);
  t.end();
});



test('row class', t => {
  const tx = '(rowclass). |a|classy|row|';
  t.is(textile.convert(tx),
    `<table>
\t<tr class="rowclass">
\t\t<td>a</td>
\t\t<td>classy</td>
\t\t<td>row</td>
\t</tr>
</table>`, tx);
  t.end();
});



test('table class', t => {
  const tx = `table(tableclass).
|a|classy|table|
|a|classy|table|`;
  t.is(textile.convert(tx),
    `<table class="tableclass">
\t<tr>
\t\t<td>a</td>
\t\t<td>classy</td>
\t\t<td>table</td>
\t</tr>
\t<tr>
\t\t<td>a</td>
\t\t<td>classy</td>
\t\t<td>table</td>
\t</tr>
</table>`, tx);
  t.end();
});



test('column span', t => {
  const tx = `|\\2. spans two cols |
| col 1 | col 2 |`;
  t.is(textile.convert(tx),
    `<table>
\t<tr>
\t\t<td colspan="2">spans two cols </td>
\t</tr>
\t<tr>
\t\t<td> col 1 </td>
\t\t<td> col 2 </td>
\t</tr>
</table>`, tx);
  t.end();
});



test('row span', t => {
  const tx = `|/3. spans 3 rows | row a |
| row b |
| row c |`;
  t.is(textile.convert(tx),
    `<table>
\t<tr>
\t\t<td rowspan="3">spans 3 rows </td>
\t\t<td> row a </td>
\t</tr>
\t<tr>
\t\t<td> row b </td>
\t</tr>
\t<tr>
\t\t<td> row c </td>
\t</tr>
</table>`, tx);
  t.end();
});



test('cell text v-alignment', t => {
  const tx = `|^. top alignment|
|-. middle alignment|
|~. bottom alignment|`;
  t.is(textile.convert(tx),
    `<table>
\t<tr>
\t\t<td style="vertical-align:top">top alignment</td>
\t</tr>
\t<tr>
\t\t<td style="vertical-align:middle">middle alignment</td>
\t</tr>
\t<tr>
\t\t<td style="vertical-align:bottom">bottom alignment</td>
\t</tr>
</table>`, tx);
  t.end();
});



test('cell text h-alignment', t => {
  const tx = `|:\\1. |400|
|=. center alignment |
| no alignment |
|>. right alignment |`;
  t.is(textile.convert(tx),
    `<table>
\t<colgroup span="1">
\t\t<col width="400" />
\t</colgroup>
\t<tbody>
\t\t<tr>
\t\t\t<td style="text-align:center">center alignment </td>
\t\t</tr>
\t\t<tr>
\t\t\t<td> no alignment </td>
\t\t</tr>
\t\t<tr>
\t\t\t<td style="text-align:right">right alignment </td>
\t\t</tr>
\t</tbody>
</table>`, tx);
  t.end();
});



test('a complex table example', t => {
  const tx = `p=. Full table with summary, caption, colgroups, thead, tfoot, 2x tbody

table(#dvds){border-collapse:collapse}. Great films on DVD employing Textile summary, caption, thead, tfoot, two tbody elements and colgroups
|={font-size:140%;margin-bottom:15px}. DVDs with two Textiled tbody elements
|:\\3. 100 |{background:#ddd}|250||50|300|
|^(header).
|_. Title |_. Starring |_. Director |_. Writer |_. Notes |
|~(footer).
|\\5=. This is the tfoot, centred |
|-(toplist){background:#c5f7f6}.
| _The Usual Suspects_ | Benicio Del Toro, Gabriel Byrne, Stephen Baldwin, Kevin Spacey | Bryan Singer | Chris McQuarrie | One of the finest films ever made |
| _Se7en_ | Morgan Freeman, Brad Pitt, Kevin Spacey | David Fincher | Andrew Kevin Walker | Great psychological thriller |
| _Primer_ | David Sullivan, Shane Carruth | Shane Carruth | Shane Carruth | Amazing insight into trust and human psychology through science fiction. Terrific! |
| _District 9_ | Sharlto Copley, Jason Cope | Neill Blomkamp | Neill Blomkamp, Terri Tatchell | Social commentary layered on thick, but boy is it done well |
|-(medlist){background:#e7e895;}.
| _Arlington Road_ | Tim Robbins, Jeff Bridges | Mark Pellington | Ehren Kruger | Awesome study in neighbourly relations |
| _Phone Booth_ | Colin Farrell, Kiefer Sutherland, Forest Whitaker | Joel Schumacher | Larry Cohen | Edge-of-the-seat stuff in this short but brilliantly executed thriller |`;
  t.is(textile.convert(tx),
    `<p style="text-align:center">Full table with summary, caption, colgroups, thead, tfoot, 2x tbody</p>
<table style="border-collapse:collapse" id="dvds" summary="Great films on DVD employing Textile summary, caption, thead, tfoot, two tbody elements and colgroups">
\t<caption style="font-size:140%;margin-bottom:15px">DVDs with two Textiled tbody elements</caption>
\t<colgroup span="3" width="100">
\t\t<col style="background:#ddd" />
\t\t<col width="250" />
\t\t<col />
\t\t<col width="50" />
\t\t<col width="300" />
\t</colgroup>
\t<thead class="header">
\t\t<tr>
\t\t\t<th>Title </th>
\t\t\t<th>Starring </th>
\t\t\t<th>Director </th>
\t\t\t<th>Writer </th>
\t\t\t<th>Notes </th>
\t\t</tr>
\t</thead>
\t<tfoot class="footer">
\t\t<tr>
\t\t\t<td style="text-align:center" colspan="5">This is the tfoot, centred </td>
\t\t</tr>
\t</tfoot>
\t<tbody style="background:#c5f7f6" class="toplist">
\t\t<tr>
\t\t\t<td> <em>The Usual Suspects</em> </td>
\t\t\t<td> Benicio Del Toro, Gabriel Byrne, Stephen Baldwin, Kevin Spacey </td>
\t\t\t<td> Bryan Singer </td>
\t\t\t<td> Chris McQuarrie </td>
\t\t\t<td> One of the finest films ever made </td>
\t\t</tr>
\t\t<tr>
\t\t\t<td> <em>Se7en</em> </td>
\t\t\t<td> Morgan Freeman, Brad Pitt, Kevin Spacey </td>
\t\t\t<td> David Fincher </td>
\t\t\t<td> Andrew Kevin Walker </td>
\t\t\t<td> Great psychological thriller </td>
\t\t</tr>
\t\t<tr>
\t\t\t<td> <em>Primer</em> </td>
\t\t\t<td> David Sullivan, Shane Carruth </td>
\t\t\t<td> Shane Carruth </td>
\t\t\t<td> Shane Carruth </td>
\t\t\t<td> Amazing insight into trust and human psychology through science fiction. Terrific! </td>
\t\t</tr>
\t\t<tr>
\t\t\t<td> <em>District 9</em> </td>
\t\t\t<td> Sharlto Copley, Jason Cope </td>
\t\t\t<td> Neill Blomkamp </td>
\t\t\t<td> Neill Blomkamp, Terri Tatchell </td>
\t\t\t<td> Social commentary layered on thick, but boy is it done well </td>
\t\t</tr>
\t</tbody>
\t<tbody style="background:#e7e895" class="medlist">
\t\t<tr>
\t\t\t<td> <em>Arlington Road</em> </td>
\t\t\t<td> Tim Robbins, Jeff Bridges </td>
\t\t\t<td> Mark Pellington </td>
\t\t\t<td> Ehren Kruger </td>
\t\t\t<td> Awesome study in neighbourly relations </td>
\t\t</tr>
\t\t<tr>
\t\t\t<td> <em>Phone Booth</em> </td>
\t\t\t<td> Colin Farrell, Kiefer Sutherland, Forest Whitaker </td>
\t\t\t<td> Joel Schumacher </td>
\t\t\t<td> Larry Cohen </td>
\t\t\t<td> Edge-of-the-seat stuff in this short but brilliantly executed thriller </td>
\t\t</tr>
\t</tbody>
</table>`, tx);
  t.end();
});



test('attr can be passed to all the containers', t => {
  const tx = `table(tabl).
|=(cap#id1). caption
|:(colgr#id2). |
|^(head#id3).
|_. h1 |_. h2 |
|-(body#id4).
| a | b |
|~(foot#id5).
| c | d |`;
  t.is(textile.convert(tx),
    `<table class="tabl">
\t<caption class="cap" id="id1">caption</caption>
\t<colgroup class="colgr" id="id2">
\t</colgroup>
\t<thead class="head" id="id3">
\t\t<tr>
\t\t\t<th>h1 </th>
\t\t\t<th>h2 </th>
\t\t</tr>
\t</thead>
\t<tbody class="body" id="id4">
\t\t<tr>
\t\t\t<td> a </td>
\t\t\t<td> b </td>
\t\t</tr>
\t</tbody>
\t<tfoot class="foot" id="id5">
\t\t<tr>
\t\t\t<td> c </td>
\t\t\t<td> d </td>
\t\t</tr>
\t</tfoot>
</table>`, tx);
  t.end();
});



test('classes on cols', t => {
  const tx = `table(tabl).
|:(colgr#id2). |\\2(class#id) 20 |
| a | b |`;
  t.is(textile.convert(tx),
    `<table class="tabl">
\t<colgroup class="colgr" id="id2">
\t\t<col span="2" class="class" id="id" width="20" />
\t</colgroup>
\t<tbody>
\t\t<tr>
\t\t\t<td> a </td>
\t\t\t<td> b </td>
\t\t</tr>
\t</tbody>
</table>`, tx);
  t.end();
});


