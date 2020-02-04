const test = require('tape');
const textile = require('../src');

test('HTML blockquote spanning paragraphs', function (t) {
  t.is(textile.convert(
    'A line break delimited block quote:\n\n' +
      '<blockquote>\n' +
      'How unbearable at times are people who are happy, people for whom everything works out.\n\n' +
      'Anton Pavlovich Chekhov - 1860-1904\n' +
      '</blockquote>'),
  '<p>A line break delimited block quote:</p>\n' +
    '<blockquote>\n' +
    '<p>How unbearable at times are people who are happy, people for whom everything works out.</p>\n' +
    '<p>Anton Pavlovich Chekhov &#8211; 1860-1904</p>\n' +
    '</blockquote>');
  t.end();
});


test('User has mistaken list format for markdowns', function (t) {
  t.is(textile.convert(
    'Here a tricky list\n\n' +
      '* item1\n' +
      '    * item2\n' +
      '* item3\n' +
      '* item4\n\n' +
      'Tailing line.'),
  '<p>Here a tricky list</p>\n' +
    '<ul>\n' +
    '\t<li>item1</li>\n' +
    '\t<li>item2</li>\n' +
    '\t<li>item3</li>\n' +
    '\t<li>item4</li>\n' +
    '</ul>\n' +
    '<p>Tailing line.</p>');
  t.end();
});


test('HTML list', function (t) {
  t.is(textile.convert(
    'Your inventory:\n\n' +
      '<ul>\n' +
      '<li>Lamp</li>\n' +
      '<li>Napkin</li>\n' +
      '<li>Sword</li>\n' +
      '<li>Plastic Cup</li>\n' +
      '</ul>'),
  '<p>Your inventory:</p>\n' +
    '<ul>\n' +
    '<li>Lamp</li>\n' +
    '<li>Napkin</li>\n' +
    '<li>Sword</li>\n' +
    '<li>Plastic Cup</li>\n' +
    '</ul>');
  t.end();
});


test('Span with an ending percentage', function (t) {
  t.is(textile.convert('span %percent 10%% of stuff'),
    '<p>span <span>percent 10%</span> of stuff</p>');
  t.end();
});


test('Arrow glyph', function (t) {
  t.is(textile.convert('-> arrow'), '<p>&#8594; arrow</p>');
  t.end();
});


test('Simple table with tailing space', function (t) {
  t.is(textile.convert('|a|b|\n|a|b| '),
    '<table>\n' +
    '\t<tr>\n' +
    '\t\t<td>a</td>\n' +
    '\t\t<td>b</td>\n' +
    '\t</tr>\n' +
    '\t<tr>\n' +
    '\t\t<td>a</td>\n' +
    '\t\t<td>b</td>\n' +
    '\t</tr>\n' +
    '</table>');
  t.end();
});



test('clean trademarks #1', function (t) {
  t.is(textile.convert('(TM) and (tm), but not (Tm) or (tM)'),
    '<p>&#8482; and &#8482;, but not (Tm) or (tM)</p>');
  t.end();
});



test('clean trademarks #3', function (t) {
  t.is(textile.convert('(TM) and [TM], but not (TM] or [TM)'),
    '<p>&#8482; and &#8482;, but not (TM] or [TM)</p>');
  t.end();
});



test('clean trademarks #3', function (t) {
  // escaping works in tables
  t.is(textile.convert('| cat > sed | awk ==|== less |\n| 1234 | 2345 |'),
    '<table>\n' +
    '\t<tr>\n' +
    '\t\t<td> cat &gt; sed </td>\n' +
    '\t\t<td> awk | less </td>\n' +
    '\t</tr>\n' +
    '\t<tr>\n' +
    '\t\t<td> 1234 </td>\n' +
    '\t\t<td> 2345 </td>\n' +
    '\t</tr>\n' +
    '</table>');
  t.end();
});



// Don't know about this. This doesn't work in RC or some other implementations.
// I do expect things to work as test shows. It's disabled for now...
/*
test( '__test_', function ( t ) {
  t.is( textile.convert( "__test_" ), "<p><em>_test</em></p>" );
  t.end();
});

*/

// Both RC and PHP do crazy things when faced with something like this.
// While it IS bizarre input, we should still try to stay in control.
test('Strange list', function (t) {
  t.is(textile.convert(
    '* a\n' +
      '*** b\n' +
      '** c\n' +
      '*** d'),
  '<ul>\n' +
    '\t<li>a\n' +
    '\t<ul>\n' +
    '\t\t<li>\n' +
    '\t\t<ul>\n' +
    '\t\t\t<li>b</li>\n' +
    '\t\t</ul></li>\n' +
    '\t\t<li>c\n' +
    '\t\t<ul>\n' +
    '\t\t\t<li>d</li>\n' +
    '\t\t</ul></li>\n' +
    '\t</ul></li>\n' +
    '</ul>');
  t.end();
});



// RedCloth deviates from PHP in that it only allows [] fences.
// This is good as the design gets less messy. But it causes problems as fencing links
// then fails with PHP-style array links.
//
// I guess this is why the original used two fencing styles.
test('Fenced PHP-style array link (1)', function (t) {
  t.is(textile.convert('["PHP array link":http://example.com/?foo[]=wewe]'),
    '<p><a href="http://example.com/?foo[]=wewe"><span class="caps">PHP</span> array link</a></p>');
  t.end();
});

test('Fenced PHP-style array link (2)', function (t) {
  t.is(textile.convert('["PHP array link":http://example.com/?foo[1]=wewe]'),
    '<p><a href="http://example.com/?foo[1]=wewe"><span class="caps">PHP</span> array link</a></p>');
  t.end();
});

test('Fenced PHP-style array link (3)', function (t) {
  t.is(textile.convert('["PHP array link":http://example.com/?foo[a]=wewe]'),
    '<p><a href="http://example.com/?foo[a]=wewe"><span class="caps">PHP</span> array link</a></p>');
  t.end();
});



test('HTML comment (1)', function (t) {
  t.is(textile.convert('line\n<!-- line -->\nline'),
    '<p>line<br />\n' +
    '<!-- line --><br />\n' +
    'line</p>');
  t.end();
});


test('HTML comment (2)', function (t) {
  t.is(textile.convert('line\n\n<!-- line -->\n\nline'),
    '<p>line</p>\n' +
    '<!-- line -->\n' +
    '<p>line</p>');
  t.end();
});



test('ALL CAPS', function (t) {
  t.is(textile.convert('REYKJAVÍK'),
    '<p><span class="caps">REYKJAVÍK</span></p>');
  t.end();
});



test('Multiple classes', function (t) {
  t.is(textile.convert('p(first second). some text'),
    '<p class="first second">some text</p>',
    '2 css classes');
  t.end();
});


test('Multiple classes', function (t) {
  t.is(textile.convert('p(first second third). some text'),
    '<p class="first second third">some text</p>',
    '3 css classes');
  t.end();
});


test('Multiple classes', function (t) {
  t.is(textile.convert('p(first second third#someid). some text'),
    '<p class="first second third" id="someid">some text</p>',
    '3 css classes + id');
  t.end();
});


test('Multiple classes', function (t) {
  t.is(textile.convert('"(foo bar) text (link title)":http://example.com/'),
    '<p><a class="foo bar" href="http://example.com/" title="link title">text</a></p>',
    '2 classes + title on a link');
  t.end();
});


test('Multiple classes', function (t) {
  t.is(textile.convert('| a |(eee fee). b |\n| a |( b )|'),
    '<table>\n' +
    '\t<tr>\n' +
    '\t\t<td> a </td>\n' +
    '\t\t<td class="eee fee">b </td>\n' +
    '\t</tr>\n' +
    '\t<tr>\n' +
    '\t\t<td> a </td>\n' +
    '\t\t<td>( b )</td>\n' +
    '\t</tr>\n' +
    '</table>',
    'dual classes on table cells');
  t.end();
});


test('Multiple classes', function (t) {
  t.is(textile.convert(
    '_(span)_\n' +
    '_(span span)_\n' +
    '_(span) span_\n' +
    '_(span) span (span)_\n' +
    '_(span span) span (span span)_'),
  '<p><em>(span)</em><br />\n' +
  '<em>(span span)</em><br />\n' +
  '<em>(span) span</em><br />\n' +
  '<em>(span) span (span)</em><br />\n' +
  '<em>(span span) span (span span)</em></p>',
  'spans in parens');
  t.end();
});


test('Multiple classes', function (t) {
  t.is(textile.convert('_{display:block}(span) span (span)_'),
    '<p><em style="display:block">(span) span (span)</em></p>',
    'partal attr span parse');
  t.end();
});


test('inline code with leading @', function (t) {
  t.is(textile.convert('a @@var@ test'),
    '<p>a <code>@var</code> test</p>',
    'inline code with leading @');
  t.end();
});


test('inline code with a single @', function (t) {
  t.is(textile.convert('a @@@ test'),
    '<p>a <code>@</code> test</p>',
    'inline code with a single @');
  t.end();
});


test('empty block 1', function (t) {
  t.is(textile.convert('h1.'),
    '<p>h1.</p>',
    'empty block #1');
  t.end();
});


test('empty block 2', function (t) {
  t.is(textile.convert('h1. '),
    '<h1></h1>',
    'empty block #2');
  t.end();
});


test('empty block 3', function (t) {
  t.is(textile.convert('h1{display:block}. '),
    '<h1 style="display:block"></h1>',
    'empty block #3');
  t.end();
});


test('non list 1', function (t) {
  t.is(textile.convert('*'),
    '<p>*</p>',
    'non list #1');
  t.end();
});


test('non list 2', function (t) {
  t.is(textile.convert('#'),
    '<p>#</p>',
    'non list #2');
  t.end();
});


test('non list 3', function (t) {
  t.is(textile.convert('*\n'),
    '<p>*</p>',
    'non list #3');
  t.end();
});


test('non list 4', function (t) {
  t.is(textile.convert('#\n'),
    '<p>#</p>',
    'non list #4');
  t.end();
});


test('non list 5', function (t) {
  t.is(textile.convert('*\ntest'),
    '<p>*<br />\ntest</p>',
    'non list #5');
  t.end();
});


test('empty list 1', function (t) {
  t.is(textile.convert('* \n'),
    '<p>* </p>',
    'empty list #1');
  t.end();
});


test('empty list 2', function (t) {
  t.is(textile.convert('# \n'),
    '<p># </p>',
    'empty list #2');
  t.end();
});


test('insert empty list 1', function (t) {
  t.is(textile.convert('*\n\ntest'),
    '<p>*</p>\n<p>test</p>',
    'insert empty list #1');
  t.end();
});


test('insert empty list 2', function (t) {
  t.is(textile.convert('#\n\ntest'),
    '<p>#</p>\n<p>test</p>',
    'insert empty list #2');
  t.end();
});


test('empty attributes (1)', function (t) {
  t.is(textile.convert('<input type="checkbox" checked>'),
    '<p><input type="checkbox" checked /></p>',
    'empty attributes (1)');
  t.end();
});


test('empty attributes (2)', function (t) {
  t.is(textile.convert('<iframe width="100" height="100" src="//example.com" frameborder="0" allowfullscreen></iframe>'),
    '<p><iframe width="100" height="100" src="//example.com" frameborder="0" allowfullscreen></iframe></p>',
    'empty attributes (2)');
  t.end();
});


test('bold line vs. list', function (t) {
  t.is(textile.convert('*{color:red}bold red*'),
    '<p><strong style="color:red">bold red</strong></p>',
    'bold line vs. list');
  t.end();
});


test('strict list matching (1)', function (t) {
  t.is(textile.convert(
    '*{color:red} item*\n\n' +
      '* item*\n\n' +
      '*item*'),
  '<ul style="color:red">\n' +
    '\t<li>item*</li>\n' +
    '</ul>\n' +
    '<ul>\n' +
    '\t<li>item*</li>\n' +
    '</ul>\n' +
    '<p><strong>item</strong></p>',
  'strict list matching (1)');
  t.end();
});


test('strict list matching (2)', function (t) {
  t.is(textile.convert(
    '*{color:red} item\n\n' +
      '* item\n\n' +
      '*item'),
  '<ul style="color:red">\n' +
    '\t<li>item</li>\n' +
    '</ul>\n' +
    '<ul>\n' +
    '\t<li>item</li>\n' +
    '</ul>\n' +
    '<p>*item</p>',
  'strict list matching (2)');
  t.end();
});



test('image parsing speed bug', function (t) {
  const t1 = Date.now();
  textile.convert('!a()aaaaaaaaaaaaaaaaaaaaaaaaaa');
  const t2 = Date.now();
  t.true((t2 - t1 < 10));
  t.end();
});



test('image parsing speed bug 2 (issue #40)', function (t) {
  const t1 = Date.now();
  textile.convert('!@((. tset Sûpp0rt ticket onññly... !@((. tset Sûpp0rt ticket onññly... !@((.');
  const t2 = Date.now();
  t.true((t2 - t1 < 10));
  t.end();
});



test('parse inline textile in footnotes', function (t) {
  t.is(textile.convert('fn1. This is _emphasized_ *strong*'),
    '<p class="footnote" id="fn1"><a href="#fnr1"><sup>1</sup></a> This is <em>emphasized</em> <strong>strong</strong></p>',
    'footnote inline textile');
  t.end();
});


// greedy globbing block parser bug [#21]
test('block parser bug (#21)', function (t) {
  t.is(textile.convert('pab\n\npabcde\n\nbqabcdef\n\nlast line ending in period+space. \n'),
    '<p>pab</p>\n' +
    '<p>pabcde</p>\n' +
    '<p>bqabcdef</p>\n' +
    '<p>last line ending in period+space. </p>');
  t.end();
});



test('trailing space linebreak bug (#26)', function (t) {
  t.is(textile.convert('Line 1 \nLine 2\nLine 3'),
    '<p>Line 1 <br />\nLine 2<br />\nLine 3</p>');
  t.end();
});



test('support unicode symbols (#27)', function (t) {
  t.is(textile.convert(
    'Trademark(tm)\n' +
    'Registered(R)\n' +
    'Copyright (C) 2008\n' +
    'One quarter (1/4) symbol\n' +
    'One half (1/2) symbol\n' +
    'Three quarters (3/4) symbol\n' +
    'Degree (o) symbol\n' +
    'Plus/minus (+/-) symbol'),
  '<p>Trademark&#8482;<br />\n' +
  'Registered&#174;<br />\n' +
  'Copyright &#169; 2008<br />\n' +
  'One quarter &#188; symbol<br />\n' +
  'One half &#189; symbol<br />\n' +
  'Three quarters &#190; symbol<br />\n' +
  'Degree &#176; symbol<br />\n' +
  'Plus/minus &#177; symbol</p>');
  t.end();
});



test('footnotes should not appear directly inside tags (#26)', function (t) {
  t.is(textile.convert('*[1234]* _[1234]_'),
    '<p><strong>[1234]</strong> <em>[1234]</em></p>');
  t.end();
});



test('footnotes have to directly follow text (#26)', function (t) {
  t.is(textile.convert('[1234]'), '<p>[1234]</p>');
  t.end();
});



test('footnote links can be disabled with !', function (t) {
  t.is(textile.convert('foobar[1234!]'),
    '<p>foobar<sup class="footnote" id="fnr1234">1234</sup></p>');
  t.end();
});



test('bc blocks should not be terminated by lists (#45)', function (t) {
  t.is(textile.convert(
    'bc. # here comes foo\nFoo\n# here comes bar\nBar'
  ),
  '<pre><code># here comes foo\nFoo\n# here comes bar\nBar</code></pre>'
  );
  t.is(textile.convert(
    'bc.. # here comes foo\nFoo\n\n# here comes bar\nBar'
  ),
  '<pre><code># here comes foo\nFoo\n\n# here comes bar\nBar</code></pre>'
  );
  t.is(textile.convert(
    'bc. * here comes foo\nFoo\n* here comes bar\nBar'
  ),
  '<pre><code>* here comes foo\nFoo\n* here comes bar\nBar</code></pre>'
  );
  t.is(textile.convert(
    'bc.. * here comes foo\nFoo\n\n* here comes bar\nBar'
  ),
  '<pre><code>* here comes foo\nFoo\n\n* here comes bar\nBar</code></pre>'
  );
  t.end();
});


test('pre blocks should not be terminated by lists (#45)', function (t) {
  t.is(textile.convert(
    'pre. # here comes foo\nFoo\n# here comes bar\nBar'
  ),
  '<pre># here comes foo\nFoo\n# here comes bar\nBar</pre>'
  );
  t.is(textile.convert(
    'pre.. # here comes foo\nFoo\n\n# here comes bar\nBar'
  ),
  '<pre># here comes foo\nFoo\n\n# here comes bar\nBar</pre>'
  );
  t.is(textile.convert(
    'pre. * here comes foo\nFoo\n* here comes bar\nBar'
  ),
  '<pre>* here comes foo\nFoo\n* here comes bar\nBar</pre>'
  );
  t.is(textile.convert(
    'pre.. * here comes foo\nFoo\n\n* here comes bar\nBar'
  ),
  '<pre>* here comes foo\nFoo\n\n* here comes bar\nBar</pre>'
  );
  t.end();
});


test('nested blockquotes (#36)', function (t) {
  t.is(textile.convert('<blockquote>a<blockquote>b</blockquote>c</blockquote>'),
    '<blockquote>a<blockquote>b</blockquote>c</blockquote>');
  t.end();
});


test('list whitespace (#47)', function (t) {
  const tx = '* unsorted list item 1\n#    sorted list item 1\n#    sorted list item 2';
  t.is(textile.convert(tx),
    '<ul>\n\t<li>unsorted list item 1</li>\n\t<li>sorted list item 1</li>\n\t<li>sorted list item 2</li>\n</ul>');
  t.end();
});


test('notextile should work inline (#49)', function (t) {
  const tx = 'pre <notextile>*.Catalog und *.*</notextile> post';
  t.is(textile.convert(tx),
    '<p>pre *.Catalog und *.* post</p>');
  t.end();
});


test('inline tag should bound phrase (#57)', function (t) {
  const tx = '*foo*<notextile></notextile>bar';
  t.is(textile.convert(tx),
    '<p><strong>foo</strong>bar</p>');
  t.end();
});

test('inline tag should bound phrase [2] (#57)', function (t) {
  const tx = '*fo<i/>o*<i/>bar';
  t.is(textile.convert(tx),
    '<p><strong>fo<i></i>o</strong><i></i>bar</p>');
  t.end();
});

