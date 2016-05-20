// extened table syntax
import test from 'ava';
import textile from '../src';

test( 'headers and cells', function ( t ) {
  let tx = "|_. First Header |_. Second Header |\n\
| Content Cell | Content Cell |";
  t.is( textile.convert( tx ),
    "<table>\n\
\t<tr>\n\
\t\t<th>First Header </th>\n\
\t\t<th>Second Header </th>\n\
\t</tr>\n\
\t<tr>\n\
\t\t<td> Content Cell </td>\n\
\t\t<td> Content Cell </td>\n\
\t</tr>\n\
</table>", tx );
});


test( 'captions', function ( t ) {
  let tx = "|=. Your caption goes here\n\
|foo|bar|";
  t.is( textile.convert( tx ),
    "<table>\n\
\t<caption>Your caption goes here</caption>\n\
\t<tbody>\n\
\t\t<tr>\n\
\t\t\t<td>foo</td>\n\
\t\t\t<td>bar</td>\n\
\t\t</tr>\n\
\t</tbody>\n\
</table>", tx );
});


test( 'tailing pipes should be stripped from captions', function ( t ) {
  let tx = "|=. caption |\n\
| foo |\n\n\
|=. caption\n\
| foo |";
  t.is( textile.convert( tx ),
    "<table>\n\
\t<caption>caption</caption>\n\
\t<tbody>\n\
\t\t<tr>\n\
\t\t\t<td> foo </td>\n\
\t\t</tr>\n\
\t</tbody>\n\
</table>\n\
<table>\n\
\t<caption>caption</caption>\n\
\t<tbody>\n\
\t\t<tr>\n\
\t\t\t<td> foo </td>\n\
\t\t</tr>\n\
\t</tbody>\n\
</table>", tx );
});


test( 'table summary', function ( t ) {
  let tx = "table(myTable). This is a journey into sound. Stereophonic sound.\n\
| foo |";
  t.is( textile.convert( tx ),
    "<table class=\"myTable\" summary=\"This is a journey into sound. Stereophonic sound.\">\n\
\t<tr>\n\
\t\t<td> foo </td>\n\
\t</tr>\n\
</table>", tx );
});


test( 'tbody/thead/tfoot', function ( t ) {
  let tx = "|^.\n\
|in head|\n\
|~.\n\
|in foot|\n\
|-.\n\
|in body|";
  t.is( textile.convert( tx ),
    "<table>\n\
\t<thead>\n\
\t\t<tr>\n\
\t\t\t<td>in head</td>\n\
\t\t</tr>\n\
\t</thead>\n\
\t<tfoot>\n\
\t\t<tr>\n\
\t\t\t<td>in foot</td>\n\
\t\t</tr>\n\
\t</tfoot>\n\
\t<tbody>\n\
\t\t<tr>\n\
\t\t\t<td>in body</td>\n\
\t\t</tr>\n\
\t</tbody>\n\
</table>", tx );
});


test( 'colgroup', function ( t ) {
  let tx = "|:. 100|\n\
|cell|";
  t.is( textile.convert( tx ),
    "<table>\n\
\t<colgroup width=\"100\">\n\
\t</colgroup>\n\
\t<tbody>\n\
\t\t<tr>\n\
\t\t\t<td>cell</td>\n\
\t\t</tr>\n\
\t</tbody>\n\
</table>", tx );
});


test( 'colgroup span size', function ( t ) {
  let tx = "|:\\3. 100|\n\
|cell|";
  t.is( textile.convert( tx ),
    "<table>\n\
\t<colgroup span=\"3\" width=\"100\">\n\
\t</colgroup>\n\
\t<tbody>\n\
\t\t<tr>\n\
\t\t\t<td>cell</td>\n\
\t\t</tr>\n\
\t</tbody>\n\
</table>", tx );
});


test( 'can target individual cols', function ( t ) {
  let tx = "|:. |\\2. |\\3. 50|\n\
|cell|cell|";
  t.is( textile.convert( tx ),
    "<table>\n\
\t<colgroup>\n\
\t\t<col span=\"2\" />\n\
\t\t<col span=\"3\" width=\"50\" />\n\
\t</colgroup>\n\
\t<tbody>\n\
\t\t<tr>\n\
\t\t\t<td>cell</td>\n\
\t\t\t<td>cell</td>\n\
\t\t</tr>\n\
\t</tbody>\n\
</table>", tx );
});


test( 'can style colgroup', function ( t ) {
  let tx = "|:\\5(grpclass#grpid). 200 | 100 |||80|\n\
|cell|cell|";
  t.is( textile.convert( tx ),
    "<table>\n\
\t<colgroup span=\"5\" class=\"grpclass\" id=\"grpid\" width=\"200\">\n\
\t\t<col width=\"100\" />\n\
\t\t<col />\n\
\t\t<col />\n\
\t\t<col width=\"80\" />\n\
\t</colgroup>\n\
\t<tbody>\n\
\t\t<tr>\n\
\t\t\t<td>cell</td>\n\
\t\t\t<td>cell</td>\n\
\t\t</tr>\n\
\t</tbody>\n\
</table>", tx );
});


test( 'extened table syntax:10', function ( t ) {
  let tx = "|^.\n\
|_. First Header |_. Second Header |\n\
|-.\n\
| Content Cell | Content Cell |\n\
| Content Cell | Content Cell |";
  t.is( textile.convert( tx ),
    "<table>\n\
\t<thead>\n\
\t\t<tr>\n\
\t\t\t<th>First Header </th>\n\
\t\t\t<th>Second Header </th>\n\
\t\t</tr>\n\
\t</thead>\n\
\t<tbody>\n\
\t\t<tr>\n\
\t\t\t<td> Content Cell </td>\n\
\t\t\t<td> Content Cell </td>\n\
\t\t</tr>\n\
\t\t<tr>\n\
\t\t\t<td> Content Cell </td>\n\
\t\t\t<td> Content Cell </td>\n\
\t\t</tr>\n\
\t</tbody>\n\
</table>", tx );
});


test( 'extened table syntax:11', function ( t ) {
  let tx = "|~.\n\
|\\2=. A footer, centered & across two columns |\n\
|-.\n\
| Content Cell | Content Cell |\n\
| Content Cell | Content Cell |\n\
";
  t.is( textile.convert( tx ),
    "<table>\n\
\t<tfoot>\n\
\t\t<tr>\n\
\t\t\t<td style=\"text-align:center\" colspan=\"2\">A footer, centered &amp; across two columns </td>\n\
\t\t</tr>\n\
\t</tfoot>\n\
\t<tbody>\n\
\t\t<tr>\n\
\t\t\t<td> Content Cell </td>\n\
\t\t\t<td> Content Cell </td>\n\
\t\t</tr>\n\
\t\t<tr>\n\
\t\t\t<td> Content Cell </td>\n\
\t\t\t<td> Content Cell </td>\n\
\t\t</tr>\n\
\t</tbody>\n\
</table>", tx );
});


test( 'styleable cells', function ( t ) {
  let tx = "|a|{color:red}. styled|cell|\n\
";
  t.is( textile.convert( tx ),
    "<table>\n\
\t<tr>\n\
\t\t<td>a</td>\n\
\t\t<td style=\"color:red\">styled</td>\n\
\t\t<td>cell</td>\n\
\t</tr>\n\
</table>", tx );
});


test( 'row class', function ( t ) {
  let tx = "(rowclass). |a|classy|row|";
  t.is( textile.convert( tx ),
    "<table>\n\
\t<tr class=\"rowclass\">\n\
\t\t<td>a</td>\n\
\t\t<td>classy</td>\n\
\t\t<td>row</td>\n\
\t</tr>\n\
</table>", tx );
});


test( 'table class', function ( t ) {
  let tx = "table(tableclass).\n\
|a|classy|table|\n\
|a|classy|table|";
  t.is( textile.convert( tx ),
    "<table class=\"tableclass\">\n\
\t<tr>\n\
\t\t<td>a</td>\n\
\t\t<td>classy</td>\n\
\t\t<td>table</td>\n\
\t</tr>\n\
\t<tr>\n\
\t\t<td>a</td>\n\
\t\t<td>classy</td>\n\
\t\t<td>table</td>\n\
\t</tr>\n\
</table>", tx );
});


test( 'column span', function ( t ) {
  let tx = "|\\2. spans two cols |\n\
| col 1 | col 2 |";
  t.is( textile.convert( tx ),
    "<table>\n\
\t<tr>\n\
\t\t<td colspan=\"2\">spans two cols </td>\n\
\t</tr>\n\
\t<tr>\n\
\t\t<td> col 1 </td>\n\
\t\t<td> col 2 </td>\n\
\t</tr>\n\
</table>", tx );
});


test( 'row span', function ( t ) {
  let tx = "|/3. spans 3 rows | row a |\n\
| row b |\n\
| row c |";
  t.is( textile.convert( tx ),
    "<table>\n\
\t<tr>\n\
\t\t<td rowspan=\"3\">spans 3 rows </td>\n\
\t\t<td> row a </td>\n\
\t</tr>\n\
\t<tr>\n\
\t\t<td> row b </td>\n\
\t</tr>\n\
\t<tr>\n\
\t\t<td> row c </td>\n\
\t</tr>\n\
</table>", tx );
});


test( 'cell text v-alignment', function ( t ) {
  let tx = "|^. top alignment|\n\
|-. middle alignment|\n\
|~. bottom alignment|";
  t.is( textile.convert( tx ),
    "<table>\n\
\t<tr>\n\
\t\t<td style=\"vertical-align:top\">top alignment</td>\n\
\t</tr>\n\
\t<tr>\n\
\t\t<td style=\"vertical-align:middle\">middle alignment</td>\n\
\t</tr>\n\
\t<tr>\n\
\t\t<td style=\"vertical-align:bottom\">bottom alignment</td>\n\
\t</tr>\n\
</table>", tx );
});


test( 'cell text h-alignment', function ( t ) {
  let tx = "|:\\1. |400|\n\
|=. center alignment |\n\
| no alignment |\n\
|>. right alignment |";
  t.is( textile.convert( tx ),
    "<table>\n\
\t<colgroup span=\"1\">\n\
\t\t<col width=\"400\" />\n\
\t</colgroup>\n\
\t<tbody>\n\
\t\t<tr>\n\
\t\t\t<td style=\"text-align:center\">center alignment </td>\n\
\t\t</tr>\n\
\t\t<tr>\n\
\t\t\t<td> no alignment </td>\n\
\t\t</tr>\n\
\t\t<tr>\n\
\t\t\t<td style=\"text-align:right\">right alignment </td>\n\
\t\t</tr>\n\
\t</tbody>\n\
</table>", tx );
});


test( 'a complex table example', function ( t ) {
  let tx = "p=. Full table with summary, caption, colgroups, thead, tfoot, 2x tbody\n\n\
table(#dvds){border-collapse:collapse}. Great films on DVD employing Textile summary, caption, thead, tfoot, two tbody elements and colgroups\n\
|={font-size:140%;margin-bottom:15px}. DVDs with two Textiled tbody elements\n\
|:\\3. 100 |{background:#ddd}|250||50|300|\n\
|^(header).\n\
|_. Title |_. Starring |_. Director |_. Writer |_. Notes |\n\
|~(footer).\n\
|\\5=. This is the tfoot, centred |\n\
|-(toplist){background:#c5f7f6}.\n\
| _The Usual Suspects_ | Benicio Del Toro, Gabriel Byrne, Stephen Baldwin, Kevin Spacey | Bryan Singer | Chris McQuarrie | One of the finest films ever made |\n\
| _Se7en_ | Morgan Freeman, Brad Pitt, Kevin Spacey | David Fincher | Andrew Kevin Walker | Great psychological thriller |\n\
| _Primer_ | David Sullivan, Shane Carruth | Shane Carruth | Shane Carruth | Amazing insight into trust and human psychology through science fiction. Terrific! |\n\
| _District 9_ | Sharlto Copley, Jason Cope | Neill Blomkamp | Neill Blomkamp, Terri Tatchell | Social commentary layered on thick, but boy is it done well |\n\
|-(medlist){background:#e7e895;}.\n\
| _Arlington Road_ | Tim Robbins, Jeff Bridges | Mark Pellington | Ehren Kruger | Awesome study in neighbourly relations |\n\
| _Phone Booth_ | Colin Farrell, Kiefer Sutherland, Forest Whitaker | Joel Schumacher | Larry Cohen | Edge-of-the-seat stuff in this short but brilliantly executed thriller |";
  t.is( textile.convert( tx ),
    "<p style=\"text-align:center\">Full table with summary, caption, colgroups, thead, tfoot, 2x tbody</p>\n\
<table style=\"border-collapse:collapse\" id=\"dvds\" summary=\"Great films on DVD employing Textile summary, caption, thead, tfoot, two tbody elements and colgroups\">\n\
\t<caption style=\"font-size:140%;margin-bottom:15px\">DVDs with two Textiled tbody elements</caption>\n\
\t<colgroup span=\"3\" width=\"100\">\n\
\t\t<col style=\"background:#ddd\" />\n\
\t\t<col width=\"250\" />\n\
\t\t<col />\n\
\t\t<col width=\"50\" />\n\
\t\t<col width=\"300\" />\n\
\t</colgroup>\n\
\t<thead class=\"header\">\n\
\t\t<tr>\n\
\t\t\t<th>Title </th>\n\
\t\t\t<th>Starring </th>\n\
\t\t\t<th>Director </th>\n\
\t\t\t<th>Writer </th>\n\
\t\t\t<th>Notes </th>\n\
\t\t</tr>\n\
\t</thead>\n\
\t<tfoot class=\"footer\">\n\
\t\t<tr>\n\
\t\t\t<td style=\"text-align:center\" colspan=\"5\">This is the tfoot, centred </td>\n\
\t\t</tr>\n\
\t</tfoot>\n\
\t<tbody style=\"background:#c5f7f6\" class=\"toplist\">\n\
\t\t<tr>\n\
\t\t\t<td> <em>The Usual Suspects</em> </td>\n\
\t\t\t<td> Benicio Del Toro, Gabriel Byrne, Stephen Baldwin, Kevin Spacey </td>\n\
\t\t\t<td> Bryan Singer </td>\n\
\t\t\t<td> Chris McQuarrie </td>\n\
\t\t\t<td> One of the finest films ever made </td>\n\
\t\t</tr>\n\
\t\t<tr>\n\
\t\t\t<td> <em>Se7en</em> </td>\n\
\t\t\t<td> Morgan Freeman, Brad Pitt, Kevin Spacey </td>\n\
\t\t\t<td> David Fincher </td>\n\
\t\t\t<td> Andrew Kevin Walker </td>\n\
\t\t\t<td> Great psychological thriller </td>\n\
\t\t</tr>\n\
\t\t<tr>\n\
\t\t\t<td> <em>Primer</em> </td>\n\
\t\t\t<td> David Sullivan, Shane Carruth </td>\n\
\t\t\t<td> Shane Carruth </td>\n\
\t\t\t<td> Shane Carruth </td>\n\
\t\t\t<td> Amazing insight into trust and human psychology through science fiction. Terrific! </td>\n\
\t\t</tr>\n\
\t\t<tr>\n\
\t\t\t<td> <em>District 9</em> </td>\n\
\t\t\t<td> Sharlto Copley, Jason Cope </td>\n\
\t\t\t<td> Neill Blomkamp </td>\n\
\t\t\t<td> Neill Blomkamp, Terri Tatchell </td>\n\
\t\t\t<td> Social commentary layered on thick, but boy is it done well </td>\n\
\t\t</tr>\n\
\t</tbody>\n\
\t<tbody style=\"background:#e7e895\" class=\"medlist\">\n\
\t\t<tr>\n\
\t\t\t<td> <em>Arlington Road</em> </td>\n\
\t\t\t<td> Tim Robbins, Jeff Bridges </td>\n\
\t\t\t<td> Mark Pellington </td>\n\
\t\t\t<td> Ehren Kruger </td>\n\
\t\t\t<td> Awesome study in neighbourly relations </td>\n\
\t\t</tr>\n\
\t\t<tr>\n\
\t\t\t<td> <em>Phone Booth</em> </td>\n\
\t\t\t<td> Colin Farrell, Kiefer Sutherland, Forest Whitaker </td>\n\
\t\t\t<td> Joel Schumacher </td>\n\
\t\t\t<td> Larry Cohen </td>\n\
\t\t\t<td> Edge-of-the-seat stuff in this short but brilliantly executed thriller </td>\n\
\t\t</tr>\n\
\t</tbody>\n\
</table>", tx );
});


test( 'attr can be passed to all the containers', function ( t ) {
  let tx = "table(tabl).\n\
|=(cap#id1). caption\n\
|:(colgr#id2). |\n\
|^(head#id3).\n\
|_. h1 |_. h2 |\n\
|-(body#id4).\n\
| a | b |\n\
|~(foot#id5).\n\
| c | d |";
  t.is( textile.convert( tx ),
    "<table class=\"tabl\">\n\
\t<caption class=\"cap\" id=\"id1\">caption</caption>\n\
\t<colgroup class=\"colgr\" id=\"id2\">\n\
\t</colgroup>\n\
\t<thead class=\"head\" id=\"id3\">\n\
\t\t<tr>\n\
\t\t\t<th>h1 </th>\n\
\t\t\t<th>h2 </th>\n\
\t\t</tr>\n\
\t</thead>\n\
\t<tbody class=\"body\" id=\"id4\">\n\
\t\t<tr>\n\
\t\t\t<td> a </td>\n\
\t\t\t<td> b </td>\n\
\t\t</tr>\n\
\t</tbody>\n\
\t<tfoot class=\"foot\" id=\"id5\">\n\
\t\t<tr>\n\
\t\t\t<td> c </td>\n\
\t\t\t<td> d </td>\n\
\t\t</tr>\n\
\t</tfoot>\n\
</table>", tx );
});


test( 'classes on cols', function ( t ) {
  let tx = "table(tabl).\n\
|:(colgr#id2). |\\2(class#id) 20 |\n\
| a | b |";
  t.is( textile.convert( tx ),
    "<table class=\"tabl\">\n\
\t<colgroup class=\"colgr\" id=\"id2\">\n\
\t\t<col span=\"2\" class=\"class\" id=\"id\" width=\"20\" />\n\
\t</colgroup>\n\
\t<tbody>\n\
\t\t<tr>\n\
\t\t\t<td> a </td>\n\
\t\t\t<td> b </td>\n\
\t\t</tr>\n\
\t</tbody>\n\
</table>", tx );
});

