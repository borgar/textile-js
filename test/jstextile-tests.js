test('jstextile', function () {



equal(textile.convert( // HTML blockquote spanning paragraphs

  "A line break delimited block quote:\n"+
  "\n"+
  "<blockquote>\n"+
  "How unbearable at times are people who are happy, people for whom everything works out.\n"+
  "\n"+
  "Anton Pavlovich Chekhov - 1860-1904\n"+
  "</blockquote>"

), // Should output

  "<p>A line break delimited block quote:</p>\n"+
  "<blockquote>\n"+
  "<p>How unbearable at times are people who are happy, people for whom everything works out.</p>\n"+
  "<p>Anton Pavlovich Chekhov &#8211; 1860-1904</p>\n"+
  "</blockquote>"

);


equal(textile.convert( // User has mistaken list format for markdowns

"Here a tricky list\n"+
"\n"+
"* item1\n"+
"    * item2\n"+
"* item3\n"+
"* item4\n"+
"\n"+
"Tailing line."

), // Should output

"<p>Here a tricky list</p>\n"+
"<ul>\n"+
"\t<li>item1</li>\n"+
"\t<li>item2</li>\n"+
"\t<li>item3</li>\n"+
"\t<li>item4</li>\n"+
"</ul>\n"+
"<p>Tailing line.</p>"

);


equal(textile.convert( // HTML list

"Your inventory:\n"+
"\n"+
"<ul>\n"+
"<li>Lamp</li>\n"+
"<li>Napkin</li>\n"+
"<li>Sword</li>\n"+
"<li>Plastic Cup</li>\n"+
"</ul>"

), // Should output

"<p>Your inventory:</p>\n"+
"<ul>\n"+
"<li>Lamp</li>\n"+
"<li>Napkin</li>\n"+
"<li>Sword</li>\n"+
"<li>Plastic Cup</li>\n"+
"</ul>"

);



equal(textile.convert( // Span with an ending percentage

"span %percent 10%% of stuff"

), // Should output

"<p>span <span>percent 10%</span> of stuff</p>"

);



equal(textile.convert( // arrow glyph

"-> arrow"

), // Should output

"<p>&#8594; arrow</p>"

);



equal(textile.convert( // Span with an ending percentage

"|a|b|\n"+
"|a|b| "

), // Should output

"<table>\n"+
"\t<tr>\n"+
"\t\t<td>a</td>\n"+
"\t\t<td>b</td>\n"+
"\t</tr>\n"+
"\t<tr>\n"+
"\t\t<td>a</td>\n"+
"\t\t<td>b</td>\n"+
"\t</tr>\n"+
"</table>"

);



equal(textile.convert( // clean trademarks #1

"(TM) and (tm), but not (Tm) or (tM)"

), // Should output

"<p>&#8482; and &#8482;, but not (Tm) or (tM)</p>"

);



equal(textile.convert( // clean trademarks #2

"(TM) and [TM], but not (TM] or [TM)"

), // Should output

"<p>&#8482; and &#8482;, but not (TM] or [TM)</p>"

);



equal(textile.convert( // escaping works in tables

"| cat > sed | awk ==|== less |\n"+
"| 1234 | 2345 |"

), // Should output

"<table>\n"+
"\t<tr>\n"+
"\t\t<td> cat &gt; sed </td>\n"+
"\t\t<td> awk | less </td>\n"+
"\t</tr>\n"+
"\t<tr>\n"+
"\t\t<td> 1234 </td>\n"+
"\t\t<td> 2345 </td>\n"+
"\t</tr>\n"+
"</table>"

);



/*
  Don't know about this. This doesn't work in RC or some other implementations.
  I do expect things to work as test shows. It's disabled for now...
*/
/*
equal(textile.convert(

"__test_"

), // Should output

"<p><em>_test</em></p>"

);
*/

/*
  Both RC and PHP do crazy things when faced with something like this.
  While it IS bizarre input, we should still try to stay in control.
*/
equal(textile.convert( // Strange list

"* a\n"+
"*** b\n"+
"** c\n"+
"*** d"

), // Should output

"<ul>\n"+
"\t<li>a\n"+
"\t<ul>\n"+
"\t\t<li>\n"+
"\t\t<ul>\n"+
"\t\t\t<li>b</li>\n"+
"\t\t</ul></li>\n"+
"\t\t<li>c\n"+
"\t\t<ul>\n"+
"\t\t\t<li>d</li>\n"+
"\t\t</ul></li>\n"+
"\t</ul></li>\n"+
"</ul>"

);



/*

RedCloth deviates from PHP in that it only allows [] fences.
This is good as the design gets less messy. But it causes problems as fencing links
then fails with PHP-style array links.

I guess this is why the original used two fencing styles.

*/
equal(textile.convert( // Fenced PHP-style array link

'["PHP array link":http://example.com/?foo[]=wewe]'

), // Should output

'<p><a href="http://example.com/?foo[]=wewe"><span class="caps">PHP</span> array link</a></p>'

);
equal(textile.convert( // Fenced PHP-style array link

'["PHP array link":http://example.com/?foo[1]=wewe]'

), // Should output

'<p><a href="http://example.com/?foo[1]=wewe"><span class="caps">PHP</span> array link</a></p>'

);
equal(textile.convert( // Fenced PHP-style array link

'["PHP array link":http://example.com/?foo[a]=wewe]'

), // Should output

'<p><a href="http://example.com/?foo[a]=wewe"><span class="caps">PHP</span> array link</a></p>'

);



equal(textile.convert( // HTML comment

'line\n'+
'<!-- line -->\n'+
'line'

), // Should output

"<p>line<br />\n"+
"<!-- line --><br />\n"+
"line</p>"

);




equal(textile.convert( // HTML comment

"line\n"+
"\n"+
"<!-- line -->\n"+
"\n"+
"line"

), // Should output

"<p>line</p>\n"+
"<!-- line -->\n"+
"<p>line</p>"

);



equal(textile.convert( // HTML comment

"REYKJAVÍK"

), // Should output

"<p><span class=\"caps\">REYKJAVÍK</span></p>"

);




});
