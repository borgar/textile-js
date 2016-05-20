// table.yml
import test from 'ava';
import textile from '../src';

test( 'table:1', function ( t ) {
  let tx = "|a|b|c|\n\
|1|2|3|\n\n\
h3. A header after the table";
  t.is( textile.convert( tx ),
    "<table>\n\
\t<tr>\n\
\t\t<td>a</td>\n\
\t\t<td>b</td>\n\
\t\t<td>c</td>\n\
\t</tr>\n\
\t<tr>\n\
\t\t<td>1</td>\n\
\t\t<td>2</td>\n\
\t\t<td>3</td>\n\
\t</tr>\n\
</table>\n\
<h3>A header after the table</h3>", tx );
});


test( 'table:2', function ( t ) {
  let tx = "|_. a|_. b|_. c|\n\
|1|2|3|";
  t.is( textile.convert( tx ),
    "<table>\n\
\t<tr>\n\
\t\t<th>a</th>\n\
\t\t<th>b</th>\n\
\t\t<th>c</th>\n\
\t</tr>\n\
\t<tr>\n\
\t\t<td>1</td>\n\
\t\t<td>2</td>\n\
\t\t<td>3</td>\n\
\t</tr>\n\
</table>", tx );
});


test( 'table:3', function ( t ) {
  let tx = "|This|is|a|simple|table|\n\
|This|is|a|simple|row|";
  t.is( textile.convert( tx ),
    "<table>\n\
\t<tr>\n\
\t\t<td>This</td>\n\
\t\t<td>is</td>\n\
\t\t<td>a</td>\n\
\t\t<td>simple</td>\n\
\t\t<td>table</td>\n\
\t</tr>\n\
\t<tr>\n\
\t\t<td>This</td>\n\
\t\t<td>is</td>\n\
\t\t<td>a</td>\n\
\t\t<td>simple</td>\n\
\t\t<td>row</td>\n\
\t</tr>\n\
</table>", tx );
});


test( 'table:4', function ( t ) {
  let tx = "table{border:1px solid black}.\n\
|This|is|a|row|\n\
|This|is|a|row|";
  t.is( textile.convert( tx ),
    "<table style=\"border:1px solid black\">\n\
\t<tr>\n\
\t\t<td>This</td>\n\
\t\t<td>is</td>\n\
\t\t<td>a</td>\n\
\t\t<td>row</td>\n\
\t</tr>\n\
\t<tr>\n\
\t\t<td>This</td>\n\
\t\t<td>is</td>\n\
\t\t<td>a</td>\n\
\t\t<td>row</td>\n\
\t</tr>\n\
</table>", tx );
});


test( 'table:5', function ( t ) {
  let tx = "{background:#ddd}. |This|is|a|row|";
  t.is( textile.convert( tx ),
    "<table>\n\
\t<tr style=\"background:#ddd\">\n\
\t\t<td>This</td>\n\
\t\t<td>is</td>\n\
\t\t<td>a</td>\n\
\t\t<td>row</td>\n\
\t</tr>\n\
</table>", tx );
});


test( 'table:6', function ( t ) {
  let tx = "|a|b|c|\n\
| |2|3|";
  t.is( textile.convert( tx ),
    "<table>\n\
\t<tr>\n\
\t\t<td>a</td>\n\
\t\t<td>b</td>\n\
\t\t<td>c</td>\n\
\t</tr>\n\
\t<tr>\n\
\t\t<td> </td>\n\
\t\t<td>2</td>\n\
\t\t<td>3</td>\n\
\t</tr>\n\
</table>", tx );
});


test( 'table:7', function ( t ) {
  let tx = "table{width: 200px; border:2px solid gray;}.\n\
|_=. Alignment|\n\
|=. centered|\n\
|=(. a bit right|\n\
|=). a bit left|\n\
|>). almost right|\n\
|<(. almost left|\n\
|>. right|\n\
|<. left|";
  t.is( textile.convert( tx ),
    "<table style=\"width:200px;border:2px solid gray\">\n\
\t<tr>\n\
\t\t<th style=\"text-align:center\">Alignment</th>\n\
\t</tr>\n\
\t<tr>\n\
\t\t<td style=\"text-align:center\">centered</td>\n\
\t</tr>\n\
\t<tr>\n\
\t\t<td style=\"text-align:center;padding-left:1em\">a bit right</td>\n\
\t</tr>\n\
\t<tr>\n\
\t\t<td style=\"text-align:center;padding-right:1em\">a bit left</td>\n\
\t</tr>\n\
\t<tr>\n\
\t\t<td style=\"text-align:right;padding-right:1em\">almost right</td>\n\
\t</tr>\n\
\t<tr>\n\
\t\t<td style=\"text-align:left;padding-left:1em\">almost left</td>\n\
\t</tr>\n\
\t<tr>\n\
\t\t<td style=\"text-align:right\">right</td>\n\
\t</tr>\n\
\t<tr>\n\
\t\t<td style=\"text-align:left\">left</td>\n\
\t</tr>\n\
</table>", tx );
});


test( 'table:8', function ( t ) {
  let tx = "|{background:#ddd}. Cell with gray background|Normal cell|\n\
|\\2. Cell spanning 2 columns|\n\
|/2. Cell spanning 2 rows|one|\n\
|two|\n\
|>. Right-aligned cell|<. Left-aligned cell|";
  t.is( textile.convert( tx ),
    "<table>\n\
\t<tr>\n\
\t\t<td style=\"background:#ddd\">Cell with gray background</td>\n\
\t\t<td>Normal cell</td>\n\
\t</tr>\n\
\t<tr>\n\
\t\t<td colspan=\"2\">Cell spanning 2 columns</td>\n\
\t</tr>\n\
\t<tr>\n\
\t\t<td rowspan=\"2\">Cell spanning 2 rows</td>\n\
\t\t<td>one</td>\n\
\t</tr>\n\
\t<tr>\n\
\t\t<td>two</td>\n\
\t</tr>\n\
\t<tr>\n\
\t\t<td style=\"text-align:right\">Right-aligned cell</td>\n\
\t\t<td style=\"text-align:left\">Left-aligned cell</td>\n\
\t</tr>\n\
</table>", tx );
});


test( 'row spanning mid-row', function ( t ) {
  let tx = "|1|2|3|\n\
|1|/3. 2|3|\n\
|1|3|\n\
|1|3|\n\
|1|2|3|";
  t.is( textile.convert( tx ),
    "<table>\n\
\t<tr>\n\
\t\t<td>1</td>\n\
\t\t<td>2</td>\n\
\t\t<td>3</td>\n\
\t</tr>\n\
\t<tr>\n\
\t\t<td>1</td>\n\
\t\t<td rowspan=\"3\">2</td>\n\
\t\t<td>3</td>\n\
\t</tr>\n\
\t<tr>\n\
\t\t<td>1</td>\n\
\t\t<td>3</td>\n\
\t</tr>\n\
\t<tr>\n\
\t\t<td>1</td>\n\
\t\t<td>3</td>\n\
\t</tr>\n\
\t<tr>\n\
\t\t<td>1</td>\n\
\t\t<td>2</td>\n\
\t\t<td>3</td>\n\
\t</tr>\n\
</table>", tx );
});


test( 'table:10', function ( t ) {
  let tx = "{background:#ddd}. |S|Target|Complete|App|Milestone|\n\
|!/i/g.gif!|11/29/04|11/29/04|011|XML spec complete (KH is on schedule)|\n\
|!/i/g.gif!|11/22/04|11/22/04|070|Dialog pass 1 builds an index file|\n\
|!/i/g.gif!|11/24/04|11/24/04|070|Dialog pass 2 98% complete|\n\
|!/i/g.gif!|11/30/04|11/30/04|070|Feature complete. Passes end-to-end smoke test.|\n\
|!/i/w.gif!|12/02/04| |011|Dialog pass 1 and 2 complete (98+%)|\n\
|!/i/w.gif!|12/03/04| |081|Feature complete|";
  t.is( textile.convert( tx ),
    "<table>\n\
\t<tr style=\"background:#ddd\">\n\
\t\t<td>S</td>\n\
\t\t<td>Target</td>\n\
\t\t<td>Complete</td>\n\
\t\t<td>App</td>\n\
\t\t<td>Milestone</td>\n\
\t</tr>\n\
\t<tr>\n\
\t\t<td><img src=\"/i/g.gif\" alt=\"\" /></td>\n\
\t\t<td>11/29/04</td>\n\
\t\t<td>11/29/04</td>\n\
\t\t<td>011</td>\n\
\t\t<td><span class=\"caps\">XML</span> spec complete (KH is on schedule)</td>\n\
\t</tr>\n\
\t<tr>\n\
\t\t<td><img src=\"/i/g.gif\" alt=\"\" /></td>\n\
\t\t<td>11/22/04</td>\n\
\t\t<td>11/22/04</td>\n\
\t\t<td>070</td>\n\
\t\t<td>Dialog pass 1 builds an index file</td>\n\
\t</tr>\n\
\t<tr>\n\
\t\t<td><img src=\"/i/g.gif\" alt=\"\" /></td>\n\
\t\t<td>11/24/04</td>\n\
\t\t<td>11/24/04</td>\n\
\t\t<td>070</td>\n\
\t\t<td>Dialog pass 2 98% complete</td>\n\
\t</tr>\n\
\t<tr>\n\
\t\t<td><img src=\"/i/g.gif\" alt=\"\" /></td>\n\
\t\t<td>11/30/04</td>\n\
\t\t<td>11/30/04</td>\n\
\t\t<td>070</td>\n\
\t\t<td>Feature complete. Passes end-to-end smoke test.</td>\n\
\t</tr>\n\
\t<tr>\n\
\t\t<td><img src=\"/i/w.gif\" alt=\"\" /></td>\n\
\t\t<td>12/02/04</td>\n\
\t\t<td> </td>\n\
\t\t<td>011</td>\n\
\t\t<td>Dialog pass 1 and 2 complete (98+%)</td>\n\
\t</tr>\n\
\t<tr>\n\
\t\t<td><img src=\"/i/w.gif\" alt=\"\" /></td>\n\
\t\t<td>12/03/04</td>\n\
\t\t<td> </td>\n\
\t\t<td>081</td>\n\
\t\t<td>Feature complete</td>\n\
\t</tr>\n\
</table>", tx );
});


test( 'combined table header and colspan', function ( t ) {
  let tx = "table(my_class).\n\
|_\\2. a |_. b |_. c |\n\
| 1 | 2 | 3 | 4 |";
  t.is( textile.convert( tx ),
    "<table class=\"my_class\">\n\
\t<tr>\n\
\t\t<th colspan=\"2\">a </th>\n\
\t\t<th>b </th>\n\
\t\t<th>c </th>\n\
\t</tr>\n\
\t<tr>\n\
\t\t<td> 1 </td>\n\
\t\t<td> 2 </td>\n\
\t\t<td> 3 </td>\n\
\t\t<td> 4 </td>\n\
\t</tr>\n\
</table>", tx );
});


test( 'two adjacent tables', function ( t ) {
  let tx = "|a|b|c|\n\n\
|1|2|3|";
  t.is( textile.convert( tx ),
    "<table>\n\
\t<tr>\n\
\t\t<td>a</td>\n\
\t\t<td>b</td>\n\
\t\t<td>c</td>\n\
\t</tr>\n\
</table>\n\
<table>\n\
\t<tr>\n\
\t\t<td>1</td>\n\
\t\t<td>2</td>\n\
\t\t<td>3</td>\n\
\t</tr>\n\
</table>", tx );
});


test( 'with cell attributes', function ( t ) {
  let tx = "|[en]. lang-ok|{color:red;}. style-ok|(myclass). class-ok|";
  t.is( textile.convert( tx ),
    "<table>\n\
\t<tr>\n\
\t\t<td lang=\"en\">lang-ok</td>\n\
\t\t<td style=\"color:red\">style-ok</td>\n\
\t\t<td class=\"myclass\">class-ok</td>\n\
\t</tr>\n\
</table>", tx );
});


test( 'with improper cell attributes', function ( t ) {
  let tx = "|[en]lang-bad|{color:red;}style-bad|(myclass)class-bad|";
  t.is( textile.convert( tx ),
    "<table>\n\
\t<tr>\n\
\t\t<td>[en]lang-bad</td>\n\
\t\t<td>{color:red;}style-bad</td>\n\
\t\t<td>(myclass)class-bad</td>\n\
\t</tr>\n\
</table>", tx );
});


test( 'with line breaks in the cell', function ( t ) {
  let tx = "|a|b\n\
b|\n\
|c\n\
c|d|";
  t.is( textile.convert( tx ),
    "<table>\n\
\t<tr>\n\
\t\t<td>a</td>\n\
\t\t<td>b<br />\n\
b</td>\n\
\t</tr>\n\
\t<tr>\n\
\t\t<td>c<br />\n\
c</td>\n\
\t\t<td>d</td>\n\
\t</tr>\n\
</table>", tx );
});


test( 'with missing cells', function ( t ) {
  let tx = "|a|b|\n\
|a|\n\
|a|b|";
  t.is( textile.convert( tx ),
    "<table>\n\
\t<tr>\n\
\t\t<td>a</td>\n\
\t\t<td>b</td>\n\
\t</tr>\n\
\t<tr>\n\
\t\t<td>a</td>\n\
\t</tr>\n\
\t<tr>\n\
\t\t<td>a</td>\n\
\t\t<td>b</td>\n\
\t</tr>\n\
</table>", tx );
});


test( 'with empty cells', function ( t ) {
  let tx = "||b|\n\
|a||\n\
|a| |";
  t.is( textile.convert( tx ),
    "<table>\n\
\t<tr>\n\
\t\t<td></td>\n\
\t\t<td>b</td>\n\
\t</tr>\n\
\t<tr>\n\
\t\t<td>a</td>\n\
\t\t<td></td>\n\
\t</tr>\n\
\t<tr>\n\
\t\t<td>a</td>\n\
\t\t<td> </td>\n\
\t</tr>\n\
</table>", tx );
});

