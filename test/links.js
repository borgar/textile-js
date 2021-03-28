import test from 'tape';
import textile from '../src/index.js';
// links.yml

test('links:1', t => {
  const tx = '"link text":#1';
  t.is(textile.convert(tx),
    '<p><a href="#1">link text</a></p>', tx);
  t.end();
});



test('links:2', t => {
  const tx = '"link text":#a';
  t.is(textile.convert(tx),
    '<p><a href="#a">link text</a></p>', tx);
  t.end();
});



test('links:3', t => {
  const tx = '"link text":#a1';
  t.is(textile.convert(tx),
    '<p><a href="#a1">link text</a></p>', tx);
  t.end();
});



test('links:4', t => {
  const tx = '"link text":#a10';
  t.is(textile.convert(tx),
    '<p><a href="#a10">link text</a></p>', tx);
  t.end();
});



test('links:5', t => {
  const tx = '"link text":index.html';
  t.is(textile.convert(tx),
    '<p><a href="index.html">link text</a></p>', tx);
  t.end();
});



test('links:6', t => {
  const tx = '"link text":index.html#1';
  t.is(textile.convert(tx),
    '<p><a href="index.html#1">link text</a></p>', tx);
  t.end();
});



test('links:7', t => {
  const tx = '"link text":index.html#a';
  t.is(textile.convert(tx),
    '<p><a href="index.html#a">link text</a></p>', tx);
  t.end();
});



test('links:8', t => {
  const tx = '"link text":index.html#a1';
  t.is(textile.convert(tx),
    '<p><a href="index.html#a1">link text</a></p>', tx);
  t.end();
});



test('links:9', t => {
  const tx = '"link text":index.html#a10';
  t.is(textile.convert(tx),
    '<p><a href="index.html#a10">link text</a></p>', tx);
  t.end();
});



test('links:10', t => {
  const tx = '"link text":http://example.com/';
  t.is(textile.convert(tx),
    '<p><a href="http://example.com/">link text</a></p>', tx);
  t.end();
});



test('links:11', t => {
  const tx = '"link text":http://example.com/#1';
  t.is(textile.convert(tx),
    '<p><a href="http://example.com/#1">link text</a></p>', tx);
  t.end();
});



test('links:12', t => {
  const tx = '"link text":http://example.com/#a';
  t.is(textile.convert(tx),
    '<p><a href="http://example.com/#a">link text</a></p>', tx);
  t.end();
});



test('links:13', t => {
  const tx = '"link text":http://example.com/#a1';
  t.is(textile.convert(tx),
    '<p><a href="http://example.com/#a1">link text</a></p>', tx);
  t.end();
});



test('links:14', t => {
  const tx = '"link text":http://example.com/#a10';
  t.is(textile.convert(tx),
    '<p><a href="http://example.com/#a10">link text</a></p>', tx);
  t.end();
});



test('links:15', t => {
  const tx = '"link text":http://example.com/index.html';
  t.is(textile.convert(tx),
    '<p><a href="http://example.com/index.html">link text</a></p>', tx);
  t.end();
});



test('links:16', t => {
  const tx = '"link text":http://example.com/index.html#a';
  t.is(textile.convert(tx),
    '<p><a href="http://example.com/index.html#a">link text</a></p>', tx);
  t.end();
});



test('links:17', t => {
  const tx = '"link text":http://example.com/index.html#1';
  t.is(textile.convert(tx),
    '<p><a href="http://example.com/index.html#1">link text</a></p>', tx);
  t.end();
});



test('links:18', t => {
  const tx = '"link text":http://example.com/index.html#a1';
  t.is(textile.convert(tx),
    '<p><a href="http://example.com/index.html#a1">link text</a></p>', tx);
  t.end();
});



test('links:19', t => {
  const tx = '"link text":http://example.com/index.html#a10';
  t.is(textile.convert(tx),
    '<p><a href="http://example.com/index.html#a10">link text</a></p>', tx);
  t.end();
});



test('links:20', t => {
  const tx = '"link text":http://example.com/?foo=bar';
  t.is(textile.convert(tx),
    '<p><a href="http://example.com/?foo=bar">link text</a></p>', tx);
  t.end();
});



test('links:21', t => {
  const tx = '"link text":http://example.com/?foo=bar#a';
  t.is(textile.convert(tx),
    '<p><a href="http://example.com/?foo=bar#a">link text</a></p>', tx);
  t.end();
});



test('links:22', t => {
  const tx = '"link & text":http://example.com/?foo=bar#a';
  t.is(textile.convert(tx),
    '<p><a href="http://example.com/?foo=bar#a">link &amp; text</a></p>', tx);
  t.end();
});



test('links:23', t => {
  const tx = '"link text":http://example.com/?foo=bar#1';
  t.is(textile.convert(tx),
    '<p><a href="http://example.com/?foo=bar#1">link text</a></p>', tx);
  t.end();
});



test('links:24', t => {
  const tx = '"link text":http://example.com/?foo=bar#a1';
  t.is(textile.convert(tx),
    '<p><a href="http://example.com/?foo=bar#a1">link text</a></p>', tx);
  t.end();
});



test('links:25', t => {
  const tx = '"link text":http://example.com/?foo=bar#a10';
  t.is(textile.convert(tx),
    '<p><a href="http://example.com/?foo=bar#a10">link text</a></p>', tx);
  t.end();
});



test('links:26', t => {
  const tx = '"link text":http://example.com/?foo=bar&a=b';
  t.is(textile.convert(tx),
    '<p><a href="http://example.com/?foo=bar&amp;a=b">link text</a></p>', tx);
  t.end();
});



test('links:27', t => {
  const tx = '"link text":http://example.com/?foo=bar&a=b#1';
  t.is(textile.convert(tx),
    '<p><a href="http://example.com/?foo=bar&amp;a=b#1">link text</a></p>', tx);
  t.end();
});



test('links:28', t => {
  const tx = '"link text":http://example.com/?foo=bar&a=b#a';
  t.is(textile.convert(tx),
    '<p><a href="http://example.com/?foo=bar&amp;a=b#a">link text</a></p>', tx);
  t.end();
});



test('links:29', t => {
  const tx = '"link text":http://example.com/?foo=bar&a=b#a1';
  t.is(textile.convert(tx),
    '<p><a href="http://example.com/?foo=bar&amp;a=b#a1">link text</a></p>', tx);
  t.end();
});



test('links:30', t => {
  const tx = '"link text":http://example.com/?foo=bar&a=b#a10';
  t.is(textile.convert(tx),
    '<p><a href="http://example.com/?foo=bar&amp;a=b#a10">link text</a></p>', tx);
  t.end();
});



test('links:31', t => {
  const tx = 'This is a "link":http://example.com/';
  t.is(textile.convert(tx),
    '<p>This is a <a href="http://example.com/">link</a></p>', tx);
  t.end();
});



test('links:32', t => {
  const tx = 'This is a "link":http://example.com/.';
  t.is(textile.convert(tx),
    '<p>This is a <a href="http://example.com/">link</a>.</p>', tx);
  t.end();
});



test('links:33', t => {
  const tx = 'This is a "link":http://example.com/index.html.';
  t.is(textile.convert(tx),
    '<p>This is a <a href="http://example.com/index.html">link</a>.</p>', tx);
  t.end();
});



test('links:34', t => {
  const tx = 'This is a "link":http://example.com/index.html#a.';
  t.is(textile.convert(tx),
    '<p>This is a <a href="http://example.com/index.html#a">link</a>.</p>', tx);
  t.end();
});



test('links:35', t => {
  const tx = 'This is a "link":http://example.com/index.html#1.';
  t.is(textile.convert(tx),
    '<p>This is a <a href="http://example.com/index.html#1">link</a>.</p>', tx);
  t.end();
});



test('links:36', t => {
  const tx = 'This is a "link":http://example.com/index.html#a1.';
  t.is(textile.convert(tx),
    '<p>This is a <a href="http://example.com/index.html#a1">link</a>.</p>', tx);
  t.end();
});



test('links:37', t => {
  const tx = 'This is a "link":http://example.com/index.html#a10.';
  t.is(textile.convert(tx),
    '<p>This is a <a href="http://example.com/index.html#a10">link</a>.</p>', tx);
  t.end();
});



test('links:38', t => {
  const tx = 'This is a "link":http://example.com/?foo=bar.';
  t.is(textile.convert(tx),
    '<p>This is a <a href="http://example.com/?foo=bar">link</a>.</p>', tx);
  t.end();
});



test('links:39', t => {
  const tx = 'This is a "link":http://example.com/?foo=bar#1.';
  t.is(textile.convert(tx),
    '<p>This is a <a href="http://example.com/?foo=bar#1">link</a>.</p>', tx);
  t.end();
});



test('links:40', t => {
  const tx = 'This is a "link":http://example.com/?foo=bar#a.';
  t.is(textile.convert(tx),
    '<p>This is a <a href="http://example.com/?foo=bar#a">link</a>.</p>', tx);
  t.end();
});



test('links:41', t => {
  const tx = 'This is a "link":http://example.com/?foo=bar#a1.';
  t.is(textile.convert(tx),
    '<p>This is a <a href="http://example.com/?foo=bar#a1">link</a>.</p>', tx);
  t.end();
});



test('links:42', t => {
  const tx = 'This is a "link":http://example.com/?foo=bar#a10.';
  t.is(textile.convert(tx),
    '<p>This is a <a href="http://example.com/?foo=bar#a10">link</a>.</p>', tx);
  t.end();
});



test('links:43', t => {
  const tx = 'This is a "link":http://example.com/?foo=bar#a10, but this is not.';
  t.is(textile.convert(tx),
    '<p>This is a <a href="http://example.com/?foo=bar#a10">link</a>, but this is not.</p>', tx);
  t.end();
});



test('links:44', t => {
  const tx = '(This is a "link":http://example.com/?foo=bar#a10) but this is not.';
  t.is(textile.convert(tx),
    '<p>(This is a <a href="http://example.com/?foo=bar#a10">link</a>) but this is not.</p>', tx);
  t.end();
});



test('links:45', t => {
  const tx = '"link text(link title)":http://example.com/';
  t.is(textile.convert(tx),
    '<p><a href="http://example.com/" title="link title">link text</a></p>', tx);
  t.end();
});



test('link with title attribute', t => {
  const tx = '"(link) text(link title)":http://example.com/';
  t.is(textile.convert(tx),
    '<p><a class="link" href="http://example.com/" title="link title">text</a></p>', tx);
  t.end();
});



test('link with space between link text and title attribute', t => {
  const tx = '"text (link title)":http://example.com/';
  t.is(textile.convert(tx),
    '<p><a href="http://example.com/" title="link title">text</a></p>', tx);
  t.end();
});



test('links:48', t => {
  const tx = '"Dive Into XML":http://www.xml.com/pub/au/164';
  t.is(textile.convert(tx),
    '<p><a href="http://www.xml.com/pub/au/164">Dive Into <span class="caps">XML</span></a></p>', tx);
  t.end();
});



test('links:49', t => {
  const tx = '"Lab Exercises":../lab/exercises/exercises.html.';
  t.is(textile.convert(tx),
    '<p><a href="../lab/exercises/exercises.html">Lab Exercises</a>.</p>', tx);
  t.end();
});



test('links:50', t => {
  const tx = 'Go to "discuss":http://www.dreammoods.com/cgibin/cutecast/cutecast.pl?forum=1&thread=26627 to discuss.';
  t.is(textile.convert(tx),
    '<p>Go to <a href="http://www.dreammoods.com/cgibin/cutecast/cutecast.pl?forum=1&amp;thread=26627">discuss</a> to discuss.</p>', tx);
  t.end();
});



test('links:51', t => {
  const tx = '* "rubylang":http://www.ruby-lang.org/en/';
  t.is(textile.convert(tx),
    `<ul>
\t<li><a href="http://www.ruby-lang.org/en/">rubylang</a></li>
</ul>`, tx);
  t.end();
});



test('links:52', t => {
  const tx = 'The ION coding style document found at "IONCodingStyleGuide.doc":http://perforce:8081/@md=d&cd=//&c=82E@//depot/systest/system/main/pub/doc/IONCodingStyleGuide.doc?ac=22 codifies a couple of rules to ensure reasonably consistent code and documentation of libraries in ION. Test text';
  t.is(textile.convert(tx),
    '<p>The <span class="caps">ION</span> coding style document found at <a href="http://perforce:8081/@md=d&amp;cd=//&amp;c=82E@//depot/systest/system/main/pub/doc/IONCodingStyleGuide.doc?ac=22">IONCodingStyleGuide.doc</a> codifies a couple of rules to ensure reasonably consistent code and documentation of libraries in <span class="caps">ION</span>. Test text</p>', tx);
  t.end();
});



test('links:53', t => {
  const tx = '"testing":';
  t.is(textile.convert(tx),
    '<p>&#8220;testing&#8221;:</p>', tx);
  t.end();
});



test('trailing space not absorbed by link', t => {
  const tx = '"Link":/foo.html me';
  t.is(textile.convert(tx),
    '<p><a href="/foo.html">Link</a> me</p>', tx);
  t.end();
});



test('trailing comma stays outside link', t => {
  const tx = '"Link":/foo.html, me';
  t.is(textile.convert(tx),
    '<p><a href="/foo.html">Link</a>, me</p>', tx);
  t.end();
});



test('trailing exclamation stays outside link', t => {
  const tx = '"Link":/foo.html! me';
  t.is(textile.convert(tx),
    '<p><a href="/foo.html">Link</a>! me</p>', tx);
  t.end();
});



test('trailing semicolon stays outside link', t => {
  const tx = '"Link":/foo.html; me';
  t.is(textile.convert(tx),
    '<p><a href="/foo.html">Link</a>; me</p>', tx);
  t.end();
});



test('trailing period stays outside link', t => {
  const tx = '"Link":/foo.html.';
  t.is(textile.convert(tx),
    '<p><a href="/foo.html">Link</a>.</p>', tx);
  t.end();
});



test('whose text is a parenthetical statement', t => {
  const tx = '"(just in case you were wondering)":http://slashdot.org/';
  t.is(textile.convert(tx),
    '<p><a href="http://slashdot.org/">(just in case you were wondering)</a></p>', tx);
  t.end();
});



test('that has a class and whose text is a parenthetical statement', t => {
  const tx = '"(myclass) (just in case you were wondering)":http://slashdot.org/';
  t.is(textile.convert(tx),
    '<p><a class="myclass" href="http://slashdot.org/">(just in case you were wondering)</a></p>', tx);
  t.end();
});



test('link containing parentheses', t => {
  const tx = '"It is (very) fortunate that this works":http://slashdot.org/';
  t.is(textile.convert(tx),
    '<p><a href="http://slashdot.org/">It is (very) fortunate that this works</a></p>', tx);
  t.end();
});



test('link containing quotes', t => {
  const tx = '"He said it is "very unlikely" this works":http://slashdot.org/';
  t.is(textile.convert(tx),
    '<p><a href="http://slashdot.org/">He said it is &#8220;very unlikely&#8221; this works</a></p>', tx);
  t.end();
});



test('link containing multiple quotes', t => {
  const tx = '"He said it is "very unlikely" the "economic stimulus" works":http://slashdot.org/';
  t.is(textile.convert(tx),
    '<p><a href="http://slashdot.org/">He said it is &#8220;very unlikely&#8221; the &#8220;economic stimulus&#8221; works</a></p>', tx);
  t.end();
});



test('linked quoted phrase', t => {
  const tx = '""Open the pod bay doors please, HAL."":http://www.youtube.com/watch?v=npN9l2Bd06s';
  t.is(textile.convert(tx),
    '<p><a href="http://www.youtube.com/watch?v=npN9l2Bd06s">&#8220;Open the pod bay doors please, <span class="caps">HAL</span>.&#8221;</a></p>', tx);
  t.end();
});



test('link following quoted phrase', t => {
  const tx = '"quote" text "quote" text "link":http://google.com';
  t.is(textile.convert(tx),
    '<p>&#8220;quote&#8221; text &#8220;quote&#8221; text <a href="http://google.com">link</a></p>', tx);
  t.end();
});



test('links containing underscores', t => {
  const tx = 'This is a link to a "Wikipedia article about Barack":http://en.wikipedia.org/wiki/Barack_Obama';
  t.is(textile.convert(tx),
    '<p>This is a link to a <a href="http://en.wikipedia.org/wiki/Barack_Obama">Wikipedia article about Barack</a></p>', tx);
  t.end();
});



test('links containing parentheses', t => {
  const tx = 'This is a link to a ["Wikipedia article about Textile":http://en.wikipedia.org/wiki/Textile_(markup_language)]';
  t.is(textile.convert(tx),
    '<p>This is a link to a <a href="http://en.wikipedia.org/wiki/Textile_(markup_language)">Wikipedia article about Textile</a></p>', tx);
  t.end();
});



test('links contained in parentheses', t => {
  const tx = 'This is a regular link (but in parentheses: "Google":http://www.google.com)';
  t.is(textile.convert(tx),
    '<p>This is a regular link (but in parentheses: <a href="http://www.google.com">Google</a>)</p>', tx);
  t.end();
});



test('links containing parentheses without brackets', t => {
  const tx = 'This is a link to a "Wikipedia article about Textile":http://en.wikipedia.org/wiki/Textile_(markup_language)';
  t.is(textile.convert(tx),
    '<p>This is a link to a <a href="http://en.wikipedia.org/wiki/Textile_(markup_language)">Wikipedia article about Textile</a></p>', tx);
  t.end();
});



test('links containing parentheses period at end without brackets', t => {
  const tx = 'This is a link to a "Wikipedia article about Textile":http://en.wikipedia.org/wiki/Textile_(markup_language).';
  t.is(textile.convert(tx),
    '<p>This is a link to a <a href="http://en.wikipedia.org/wiki/Textile_(markup_language)">Wikipedia article about Textile</a>.</p>', tx);
  t.end();
});



test('broken links containing parentheses without brackets', t => {
  const tx = 'This is a link to a "Wikipedia article about Textile":http://en.wikipedia.org/wiki/Textile_(markup_language';
  t.is(textile.convert(tx),
    '<p>This is a link to a <a href="http://en.wikipedia.org/wiki/Textile_(markup_language">Wikipedia article about Textile</a></p>', tx);
  t.end();
});



test('links containing parentheses without brackets inside a parenthesis', t => {
  const tx = 'Textile is awesome! (Check out the "Wikipedia article about Textile":http://en.wikipedia.org/wiki/Textile_(markup_language))';
  t.is(textile.convert(tx),
    '<p>Textile is awesome! (Check out the <a href="http://en.wikipedia.org/wiki/Textile_(markup_language)">Wikipedia article about Textile</a>)</p>', tx);
  t.end();
});



test('quotes and follow link', t => {
  const tx = 'Some "text" followed by a "link":http://redcloth.org.';
  t.is(textile.convert(tx),
    '<p>Some &#8220;text&#8221; followed by a <a href="http://redcloth.org">link</a>.</p>', tx);
  t.end();
});



test('link alias containing dashes', t => {
  const tx = `"link":google-rocks

[google-rocks]http://google.com`;
  t.is(textile.convert(tx),
    '<p><a href="http://google.com">link</a></p>', tx);
  t.end();
});



test('contained in multi-paragraph quotes', t => {
  const tx = `"I first learned about "Redcloth":http://redcloth.org/ several years ago.

"It's wonderful."`;
  t.is(textile.convert(tx),
    `<p>&#8220;I first learned about <a href="http://redcloth.org/">Redcloth</a> several years ago.</p>
<p>&#8220;It&#8217;s wonderful.&#8221;</p>`, tx);
  t.end();
});



test('as html in notextile contained in multi-paragraph quotes', t => {
  const tx = `"Here is a <notextile><a href="http://redcloth.org/">link</a></notextile>.

"I like links."`;
  t.is(textile.convert(tx),
    `<p>&#8220;Here is a <a href="http://redcloth.org/">link</a>.</p>
<p>&#8220;I like links.&#8221;</p>`, tx);
  t.end();
});



test('contained in para with multiple quotes', t => {
  const tx = '"My wife, Tipper, and I will donate 100% of the proceeds of the award to the "Alliance For Climate Protection":http://www.looktothestars.org/charity/638-alliance-for-climate-protection," said Gore in an email. "I am deeply honored to receive the Nobel Peace Prize."';
  t.is(textile.convert(tx),
    '<p>&#8220;My wife, Tipper, and I will donate 100% of the proceeds of the award to the <a href="http://www.looktothestars.org/charity/638-alliance-for-climate-protection">Alliance For Climate Protection</a>,&#8221; said Gore in an email. &#8220;I am deeply honored to receive the Nobel Peace Prize.&#8221;</p>', tx);
  t.end();
});



test('with caps in the title', t => {
  const tx = '"British Skin Foundation (BSF)":http://www.britishskinfoundation.org.uk';
  t.is(textile.convert(tx),
    '<p><a href="http://www.britishskinfoundation.org.uk" title="BSF">British Skin Foundation</a></p>', tx);
  t.end();
});



test('containing HTML tags with quotes', t => {
  const tx = '"<img name="checkmark.gif" alt="Apply online" />*apply online*":/admissions/apply/';
  t.is(textile.convert(tx),
    '<p><a href="/admissions/apply/"><img name="checkmark.gif" alt="Apply online" /><strong>apply online</strong></a></p>', tx);
  t.end();
});


