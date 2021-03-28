import test from 'tape';
import textile from '../src/index.js';
// table.yml

test('table:1', t => {
  const tx = `|a|b|c|
|1|2|3|

h3. A header after the table`;
  t.is(textile.convert(tx),
    `<table>
\t<tr>
\t\t<td>a</td>
\t\t<td>b</td>
\t\t<td>c</td>
\t</tr>
\t<tr>
\t\t<td>1</td>
\t\t<td>2</td>
\t\t<td>3</td>
\t</tr>
</table>
<h3>A header after the table</h3>`, tx);
  t.end();
});



test('table:2', t => {
  const tx = `|_. a|_. b|_. c|
|1|2|3|`;
  t.is(textile.convert(tx),
    `<table>
\t<tr>
\t\t<th>a</th>
\t\t<th>b</th>
\t\t<th>c</th>
\t</tr>
\t<tr>
\t\t<td>1</td>
\t\t<td>2</td>
\t\t<td>3</td>
\t</tr>
</table>`, tx);
  t.end();
});



test('table:3', t => {
  const tx = `|This|is|a|simple|table|
|This|is|a|simple|row|`;
  t.is(textile.convert(tx),
    `<table>
\t<tr>
\t\t<td>This</td>
\t\t<td>is</td>
\t\t<td>a</td>
\t\t<td>simple</td>
\t\t<td>table</td>
\t</tr>
\t<tr>
\t\t<td>This</td>
\t\t<td>is</td>
\t\t<td>a</td>
\t\t<td>simple</td>
\t\t<td>row</td>
\t</tr>
</table>`, tx);
  t.end();
});



test('table:4', t => {
  const tx = `table{border:1px solid black}.
|This|is|a|row|
|This|is|a|row|`;
  t.is(textile.convert(tx),
    `<table style="border:1px solid black">
\t<tr>
\t\t<td>This</td>
\t\t<td>is</td>
\t\t<td>a</td>
\t\t<td>row</td>
\t</tr>
\t<tr>
\t\t<td>This</td>
\t\t<td>is</td>
\t\t<td>a</td>
\t\t<td>row</td>
\t</tr>
</table>`, tx);
  t.end();
});



test('table:5', t => {
  const tx = '{background:#ddd}. |This|is|a|row|';
  t.is(textile.convert(tx),
    `<table>
\t<tr style="background:#ddd">
\t\t<td>This</td>
\t\t<td>is</td>
\t\t<td>a</td>
\t\t<td>row</td>
\t</tr>
</table>`, tx);
  t.end();
});



test('table:6', t => {
  const tx = `|a|b|c|
| |2|3|`;
  t.is(textile.convert(tx),
    `<table>
\t<tr>
\t\t<td>a</td>
\t\t<td>b</td>
\t\t<td>c</td>
\t</tr>
\t<tr>
\t\t<td> </td>
\t\t<td>2</td>
\t\t<td>3</td>
\t</tr>
</table>`, tx);
  t.end();
});



test('table:7', t => {
  const tx = `table{width: 200px; border:2px solid gray;}.
|_=. Alignment|
|=. centered|
|=(. a bit right|
|=). a bit left|
|>). almost right|
|<(. almost left|
|>. right|
|<. left|`;
  t.is(textile.convert(tx),
    `<table style="width:200px;border:2px solid gray">
\t<tr>
\t\t<th style="text-align:center">Alignment</th>
\t</tr>
\t<tr>
\t\t<td style="text-align:center">centered</td>
\t</tr>
\t<tr>
\t\t<td style="text-align:center;padding-left:1em">a bit right</td>
\t</tr>
\t<tr>
\t\t<td style="text-align:center;padding-right:1em">a bit left</td>
\t</tr>
\t<tr>
\t\t<td style="text-align:right;padding-right:1em">almost right</td>
\t</tr>
\t<tr>
\t\t<td style="text-align:left;padding-left:1em">almost left</td>
\t</tr>
\t<tr>
\t\t<td style="text-align:right">right</td>
\t</tr>
\t<tr>
\t\t<td style="text-align:left">left</td>
\t</tr>
</table>`, tx);
  t.end();
});



test('table:8', t => {
  const tx = `|{background:#ddd}. Cell with gray background|Normal cell|
|\\2. Cell spanning 2 columns|
|/2. Cell spanning 2 rows|one|
|two|
|>. Right-aligned cell|<. Left-aligned cell|`;
  t.is(textile.convert(tx),
    `<table>
\t<tr>
\t\t<td style="background:#ddd">Cell with gray background</td>
\t\t<td>Normal cell</td>
\t</tr>
\t<tr>
\t\t<td colspan="2">Cell spanning 2 columns</td>
\t</tr>
\t<tr>
\t\t<td rowspan="2">Cell spanning 2 rows</td>
\t\t<td>one</td>
\t</tr>
\t<tr>
\t\t<td>two</td>
\t</tr>
\t<tr>
\t\t<td style="text-align:right">Right-aligned cell</td>
\t\t<td style="text-align:left">Left-aligned cell</td>
\t</tr>
</table>`, tx);
  t.end();
});



test('row spanning mid-row', t => {
  const tx = `|1|2|3|
|1|/3. 2|3|
|1|3|
|1|3|
|1|2|3|`;
  t.is(textile.convert(tx),
    `<table>
\t<tr>
\t\t<td>1</td>
\t\t<td>2</td>
\t\t<td>3</td>
\t</tr>
\t<tr>
\t\t<td>1</td>
\t\t<td rowspan="3">2</td>
\t\t<td>3</td>
\t</tr>
\t<tr>
\t\t<td>1</td>
\t\t<td>3</td>
\t</tr>
\t<tr>
\t\t<td>1</td>
\t\t<td>3</td>
\t</tr>
\t<tr>
\t\t<td>1</td>
\t\t<td>2</td>
\t\t<td>3</td>
\t</tr>
</table>`, tx);
  t.end();
});



test('table:10', t => {
  const tx = `{background:#ddd}. |S|Target|Complete|App|Milestone|
|!/i/g.gif!|11/29/04|11/29/04|011|XML spec complete (KH is on schedule)|
|!/i/g.gif!|11/22/04|11/22/04|070|Dialog pass 1 builds an index file|
|!/i/g.gif!|11/24/04|11/24/04|070|Dialog pass 2 98% complete|
|!/i/g.gif!|11/30/04|11/30/04|070|Feature complete. Passes end-to-end smoke test.|
|!/i/w.gif!|12/02/04| |011|Dialog pass 1 and 2 complete (98+%)|
|!/i/w.gif!|12/03/04| |081|Feature complete|`;
  t.is(textile.convert(tx),
    `<table>
\t<tr style="background:#ddd">
\t\t<td>S</td>
\t\t<td>Target</td>
\t\t<td>Complete</td>
\t\t<td>App</td>
\t\t<td>Milestone</td>
\t</tr>
\t<tr>
\t\t<td><img src="/i/g.gif" alt="" /></td>
\t\t<td>11/29/04</td>
\t\t<td>11/29/04</td>
\t\t<td>011</td>
\t\t<td><span class="caps">XML</span> spec complete (KH is on schedule)</td>
\t</tr>
\t<tr>
\t\t<td><img src="/i/g.gif" alt="" /></td>
\t\t<td>11/22/04</td>
\t\t<td>11/22/04</td>
\t\t<td>070</td>
\t\t<td>Dialog pass 1 builds an index file</td>
\t</tr>
\t<tr>
\t\t<td><img src="/i/g.gif" alt="" /></td>
\t\t<td>11/24/04</td>
\t\t<td>11/24/04</td>
\t\t<td>070</td>
\t\t<td>Dialog pass 2 98% complete</td>
\t</tr>
\t<tr>
\t\t<td><img src="/i/g.gif" alt="" /></td>
\t\t<td>11/30/04</td>
\t\t<td>11/30/04</td>
\t\t<td>070</td>
\t\t<td>Feature complete. Passes end-to-end smoke test.</td>
\t</tr>
\t<tr>
\t\t<td><img src="/i/w.gif" alt="" /></td>
\t\t<td>12/02/04</td>
\t\t<td> </td>
\t\t<td>011</td>
\t\t<td>Dialog pass 1 and 2 complete (98+%)</td>
\t</tr>
\t<tr>
\t\t<td><img src="/i/w.gif" alt="" /></td>
\t\t<td>12/03/04</td>
\t\t<td> </td>
\t\t<td>081</td>
\t\t<td>Feature complete</td>
\t</tr>
</table>`, tx);
  t.end();
});



test('combined table header and colspan', t => {
  const tx = `table(my_class).
|_\\2. a |_. b |_. c |
| 1 | 2 | 3 | 4 |`;
  t.is(textile.convert(tx),
    `<table class="my_class">
\t<tr>
\t\t<th colspan="2">a </th>
\t\t<th>b </th>
\t\t<th>c </th>
\t</tr>
\t<tr>
\t\t<td> 1 </td>
\t\t<td> 2 </td>
\t\t<td> 3 </td>
\t\t<td> 4 </td>
\t</tr>
</table>`, tx);
  t.end();
});



test('two adjacent tables', t => {
  const tx = `|a|b|c|

|1|2|3|`;
  t.is(textile.convert(tx),
    `<table>
\t<tr>
\t\t<td>a</td>
\t\t<td>b</td>
\t\t<td>c</td>
\t</tr>
</table>
<table>
\t<tr>
\t\t<td>1</td>
\t\t<td>2</td>
\t\t<td>3</td>
\t</tr>
</table>`, tx);
  t.end();
});



test('with cell attributes', t => {
  const tx = '|[en]. lang-ok|{color:red;}. style-ok|(myclass). class-ok|';
  t.is(textile.convert(tx),
    `<table>
\t<tr>
\t\t<td lang="en">lang-ok</td>
\t\t<td style="color:red">style-ok</td>
\t\t<td class="myclass">class-ok</td>
\t</tr>
</table>`, tx);
  t.end();
});



test('with improper cell attributes', t => {
  const tx = '|[en]lang-bad|{color:red;}style-bad|(myclass)class-bad|';
  t.is(textile.convert(tx),
    `<table>
\t<tr>
\t\t<td>[en]lang-bad</td>
\t\t<td>{color:red;}style-bad</td>
\t\t<td>(myclass)class-bad</td>
\t</tr>
</table>`, tx);
  t.end();
});



test('with line breaks in the cell', t => {
  const tx = `|a|b
b|
|c
c|d|`;
  t.is(textile.convert(tx),
    `<table>
\t<tr>
\t\t<td>a</td>
\t\t<td>b<br />
b</td>
\t</tr>
\t<tr>
\t\t<td>c<br />
c</td>
\t\t<td>d</td>
\t</tr>
</table>`, tx);
  t.end();
});



test('with missing cells', t => {
  const tx = `|a|b|
|a|
|a|b|`;
  t.is(textile.convert(tx),
    `<table>
\t<tr>
\t\t<td>a</td>
\t\t<td>b</td>
\t</tr>
\t<tr>
\t\t<td>a</td>
\t</tr>
\t<tr>
\t\t<td>a</td>
\t\t<td>b</td>
\t</tr>
</table>`, tx);
  t.end();
});



test('with empty cells', t => {
  const tx = `||b|
|a||
|a| |`;
  t.is(textile.convert(tx),
    `<table>
\t<tr>
\t\t<td></td>
\t\t<td>b</td>
\t</tr>
\t<tr>
\t\t<td>a</td>
\t\t<td></td>
\t</tr>
\t<tr>
\t\t<td>a</td>
\t\t<td> </td>
\t</tr>
</table>`, tx);
  t.end();
});


