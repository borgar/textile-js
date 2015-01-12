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




equal(textile.convert(

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



equal(textile.convert(

"REYKJAVÍK"

), // Should output

"<p><span class=\"caps\">REYKJAVÍK</span></p>"

);



equal(textile.convert( // Multiple classes

  "p(first second). some text"

), // Should output

  "<p class=\"first second\">some text</p>"

,"2 css classes");



equal(textile.convert( // Multiple classes

  "p(first second third). some text"

), // Should output

  "<p class=\"first second third\">some text</p>"

,"3 css classes");



equal(textile.convert( // Multiple classes

  "p(first second third#someid). some text"

), // Should output

  "<p class=\"first second third\" id=\"someid\">some text</p>"

,"3 css classes + id");


equal(textile.convert( // Multiple classes

  "\"(foo bar) text (link title)\":http://example.com/"

), // Should output

  "<p><a class=\"foo bar\" href=\"http://example.com/\" title=\"link title\">text</a></p>"

,"2 classes + title on a link");


equal(textile.convert( // Multiple classes

  "| a |(eee fee). b |\n"+
  "| a |( b )|"

), // Should output

  "<table>\n"+
  "\t<tr>\n"+
  "\t\t<td> a </td>\n"+
  "\t\t<td class=\"eee fee\">b </td>\n"+
  "\t</tr>\n"+
  "\t<tr>\n"+
  "\t\t<td> a </td>\n"+
  "\t\t<td>( b )</td>\n"+
  "\t</tr>\n"+
  "</table>"

,"dual classes on table cells");




equal(textile.convert( // Multiple classes

  "_(span)_\n"+
  "_(span span)_\n"+
  "_(span) span_\n"+
  "_(span) span (span)_\n"+
  "_(span span) span (span span)_"

), // Should output

  "<p><em>(span)</em><br />\n"+
  "<em>(span span)</em><br />\n"+
  "<em>(span) span</em><br />\n"+
  "<em>(span) span (span)</em><br />\n"+
  "<em>(span span) span (span span)</em></p>"

,"spans in parens");


equal(textile.convert( // Multiple classes

  "_{display:block}(span) span (span)_"

), // Should output

  "<p><em style=\"display:block\">(span) span (span)</em></p>"

,"partal attr span parse");


equal(textile.convert( // inline code with leading @

  "a @@var@ test"

), // Should output

  "<p>a <code>@var</code> test</p>"

,"inline code with leading @");



equal(textile.convert( // inline code with a single @

  "a @@@ test"

), // Should output

  "<p>a <code>@</code> test</p>"

,"inline code with a single @");



equal(textile.convert( // empty block 1

  "h1."

), // Should output

  "<p>h1.</p>"

,"empty block #1");



equal(textile.convert( // empty block 2

  "h1. "

), // Should output

  "<h1></h1>"

,"empty block #2");


equal(textile.convert( // empty block 3

  "h1{display:block}. "

), // Should output

  '<h1 style="display:block"></h1>'

,"empty block #3");

equal(textile.convert( // non list 1

  "*"

), // Should output

  "<p>*</p>"

,"non list #1");

equal(textile.convert( // non list 2

  "#"

), // Should output

  "<p>#</p>"

,"non list #2");

equal(textile.convert( // non list 3

  "*\n"

), // Should output

  "<p>*</p>"

,"non list #3");

equal(textile.convert( // non list 4

  "#\n"

), // Should output

  "<p>#</p>"

,"non list #4");

equal(textile.convert( // non list 5

  "*\ntest"

), // Should output

  "<p>*<br />\ntest</p>"

,"non list #5");

equal(textile.convert( // empty list 1

  "* \n"

), // Should output

  "<p>* </p>"

,"empty list #1");

equal(textile.convert( // empty list 2

  "# \n"

), // Should output

  "<p># </p>"

,"empty list #2");

equal(textile.convert( // insert empty list 1

  "*\n\ntest"

), // Should output

  "<p>*</p>\n<p>test</p>"

,"insert empty list #1");

equal(textile.convert( // insert empty list 2

  "#\n\ntest"

), // Should output

  "<p>#</p>\n<p>test</p>"

,"insert empty list #2");


equal(textile.convert( // empty attributes (1)

  '<input type="checkbox" checked>'

), // Should output

  '<p><input type="checkbox" checked /></p>'

,"empty attributes (1)");



equal(textile.convert( // empty attributes (2)

  '<iframe width="100" height="100" src="//example.com" frameborder="0" allowfullscreen></iframe>'

), // Should output

  '<p><iframe width="100" height="100" src="//example.com" frameborder="0" allowfullscreen></iframe></p>'

,"empty attributes (2)");



equal(textile.convert( // bold line vs. list

  '*{color:red}bold red*'

), // Should output

  '<p><strong style="color:red">bold red</strong></p>'

,"bold line vs. list");


equal(textile.convert( // strict list matching (1)

  '*{color:red} item*\n\n'+
  '* item*\n\n'+
  '*item*'

), // Should output

  '<ul>\n'+
  '\t<li style="color:red">item*</li>\n'+
  '</ul>\n'+
  '<ul>\n'+
  '\t<li>item*</li>\n'+
  '</ul>\n'+
  '<p><strong>item</strong></p>'

,"strict list matching (1)");

equal(textile.convert( // strict list matching (2)

  '*{color:red} item\n\n'+
  '* item\n\n'+
  '*item'

), // Should output

  '<ul>\n'+
  '\t<li style="color:red">item</li>\n'+
  '</ul>\n'+
  '<ul>\n'+
  '\t<li>item</li>\n'+
  '</ul>\n'+
  '<p>*item</p>'

,"strict list matching (2)");




var t1 = Date.now();
textile.convert("!a()aaaaaaaaaaaaaaaaaaaaaaaaaa");
var t2 = Date.now();
ok( ( t2 - t1 < 10 ), 'image parsing speed bug' );





/* parse inline textile in footnotes */

equal(textile.convert( // The textile

  "fn1. This is _emphasized_ *strong*"

), // Should output

  "<p class=\"footnote\" id=\"fn1\"><a href=\"#fnr1\"><sup>1</sup></a> This is <em>emphasized</em> <strong>strong</strong></p>"

,"footnote inline textile");




/* greedy globbing block parser bug [#21] */

equal(textile.convert( // The textile

  "pab\n\npabcde\n\nbqabcdef\n\nlast line ending in period+space. \n"

), // Should output

  '<p>pab</p>\n'+
  '<p>pabcde</p>\n'+
  '<p>bqabcdef</p>\n'+
  '<p>last line ending in period+space. </p>'

,"block parser bug (#21)");




});
