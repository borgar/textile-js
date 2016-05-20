// links.yml
import test from 'ava';
import textile from '../src';

test( 'links:1', function ( t ) {
  let tx = "\"link text\":#1";
  t.is( textile.convert( tx ),
    "<p><a href=\"#1\">link text</a></p>", tx );
});


test( 'links:2', function ( t ) {
  let tx = "\"link text\":#a";
  t.is( textile.convert( tx ),
    "<p><a href=\"#a\">link text</a></p>", tx );
});


test( 'links:3', function ( t ) {
  let tx = "\"link text\":#a1";
  t.is( textile.convert( tx ),
    "<p><a href=\"#a1\">link text</a></p>", tx );
});


test( 'links:4', function ( t ) {
  let tx = "\"link text\":#a10";
  t.is( textile.convert( tx ),
    "<p><a href=\"#a10\">link text</a></p>", tx );
});


test( 'links:5', function ( t ) {
  let tx = "\"link text\":index.html";
  t.is( textile.convert( tx ),
    "<p><a href=\"index.html\">link text</a></p>", tx );
});


test( 'links:6', function ( t ) {
  let tx = "\"link text\":index.html#1";
  t.is( textile.convert( tx ),
    "<p><a href=\"index.html#1\">link text</a></p>", tx );
});


test( 'links:7', function ( t ) {
  let tx = "\"link text\":index.html#a";
  t.is( textile.convert( tx ),
    "<p><a href=\"index.html#a\">link text</a></p>", tx );
});


test( 'links:8', function ( t ) {
  let tx = "\"link text\":index.html#a1";
  t.is( textile.convert( tx ),
    "<p><a href=\"index.html#a1\">link text</a></p>", tx );
});


test( 'links:9', function ( t ) {
  let tx = "\"link text\":index.html#a10";
  t.is( textile.convert( tx ),
    "<p><a href=\"index.html#a10\">link text</a></p>", tx );
});


test( 'links:10', function ( t ) {
  let tx = "\"link text\":http://example.com/";
  t.is( textile.convert( tx ),
    "<p><a href=\"http://example.com/\">link text</a></p>", tx );
});


test( 'links:11', function ( t ) {
  let tx = "\"link text\":http://example.com/#1";
  t.is( textile.convert( tx ),
    "<p><a href=\"http://example.com/#1\">link text</a></p>", tx );
});


test( 'links:12', function ( t ) {
  let tx = "\"link text\":http://example.com/#a";
  t.is( textile.convert( tx ),
    "<p><a href=\"http://example.com/#a\">link text</a></p>", tx );
});


test( 'links:13', function ( t ) {
  let tx = "\"link text\":http://example.com/#a1";
  t.is( textile.convert( tx ),
    "<p><a href=\"http://example.com/#a1\">link text</a></p>", tx );
});


test( 'links:14', function ( t ) {
  let tx = "\"link text\":http://example.com/#a10";
  t.is( textile.convert( tx ),
    "<p><a href=\"http://example.com/#a10\">link text</a></p>", tx );
});


test( 'links:15', function ( t ) {
  let tx = "\"link text\":http://example.com/index.html";
  t.is( textile.convert( tx ),
    "<p><a href=\"http://example.com/index.html\">link text</a></p>", tx );
});


test( 'links:16', function ( t ) {
  let tx = "\"link text\":http://example.com/index.html#a";
  t.is( textile.convert( tx ),
    "<p><a href=\"http://example.com/index.html#a\">link text</a></p>", tx );
});


test( 'links:17', function ( t ) {
  let tx = "\"link text\":http://example.com/index.html#1";
  t.is( textile.convert( tx ),
    "<p><a href=\"http://example.com/index.html#1\">link text</a></p>", tx );
});


test( 'links:18', function ( t ) {
  let tx = "\"link text\":http://example.com/index.html#a1";
  t.is( textile.convert( tx ),
    "<p><a href=\"http://example.com/index.html#a1\">link text</a></p>", tx );
});


test( 'links:19', function ( t ) {
  let tx = "\"link text\":http://example.com/index.html#a10";
  t.is( textile.convert( tx ),
    "<p><a href=\"http://example.com/index.html#a10\">link text</a></p>", tx );
});


test( 'links:20', function ( t ) {
  let tx = "\"link text\":http://example.com/?foo=bar";
  t.is( textile.convert( tx ),
    "<p><a href=\"http://example.com/?foo=bar\">link text</a></p>", tx );
});


test( 'links:21', function ( t ) {
  let tx = "\"link text\":http://example.com/?foo=bar#a";
  t.is( textile.convert( tx ),
    "<p><a href=\"http://example.com/?foo=bar#a\">link text</a></p>", tx );
});


test( 'links:22', function ( t ) {
  let tx = "\"link & text\":http://example.com/?foo=bar#a";
  t.is( textile.convert( tx ),
    "<p><a href=\"http://example.com/?foo=bar#a\">link &amp; text</a></p>", tx );
});


test( 'links:23', function ( t ) {
  let tx = "\"link text\":http://example.com/?foo=bar#1";
  t.is( textile.convert( tx ),
    "<p><a href=\"http://example.com/?foo=bar#1\">link text</a></p>", tx );
});


test( 'links:24', function ( t ) {
  let tx = "\"link text\":http://example.com/?foo=bar#a1";
  t.is( textile.convert( tx ),
    "<p><a href=\"http://example.com/?foo=bar#a1\">link text</a></p>", tx );
});


test( 'links:25', function ( t ) {
  let tx = "\"link text\":http://example.com/?foo=bar#a10";
  t.is( textile.convert( tx ),
    "<p><a href=\"http://example.com/?foo=bar#a10\">link text</a></p>", tx );
});


test( 'links:26', function ( t ) {
  let tx = "\"link text\":http://example.com/?foo=bar&a=b";
  t.is( textile.convert( tx ),
    "<p><a href=\"http://example.com/?foo=bar&amp;a=b\">link text</a></p>", tx );
});


test( 'links:27', function ( t ) {
  let tx = "\"link text\":http://example.com/?foo=bar&a=b#1";
  t.is( textile.convert( tx ),
    "<p><a href=\"http://example.com/?foo=bar&amp;a=b#1\">link text</a></p>", tx );
});


test( 'links:28', function ( t ) {
  let tx = "\"link text\":http://example.com/?foo=bar&a=b#a";
  t.is( textile.convert( tx ),
    "<p><a href=\"http://example.com/?foo=bar&amp;a=b#a\">link text</a></p>", tx );
});


test( 'links:29', function ( t ) {
  let tx = "\"link text\":http://example.com/?foo=bar&a=b#a1";
  t.is( textile.convert( tx ),
    "<p><a href=\"http://example.com/?foo=bar&amp;a=b#a1\">link text</a></p>", tx );
});


test( 'links:30', function ( t ) {
  let tx = "\"link text\":http://example.com/?foo=bar&a=b#a10";
  t.is( textile.convert( tx ),
    "<p><a href=\"http://example.com/?foo=bar&amp;a=b#a10\">link text</a></p>", tx );
});


test( 'links:31', function ( t ) {
  let tx = "This is a \"link\":http://example.com/";
  t.is( textile.convert( tx ),
    "<p>This is a <a href=\"http://example.com/\">link</a></p>", tx );
});


test( 'links:32', function ( t ) {
  let tx = "This is a \"link\":http://example.com/.";
  t.is( textile.convert( tx ),
    "<p>This is a <a href=\"http://example.com/\">link</a>.</p>", tx );
});


test( 'links:33', function ( t ) {
  let tx = "This is a \"link\":http://example.com/index.html.";
  t.is( textile.convert( tx ),
    "<p>This is a <a href=\"http://example.com/index.html\">link</a>.</p>", tx );
});


test( 'links:34', function ( t ) {
  let tx = "This is a \"link\":http://example.com/index.html#a.";
  t.is( textile.convert( tx ),
    "<p>This is a <a href=\"http://example.com/index.html#a\">link</a>.</p>", tx );
});


test( 'links:35', function ( t ) {
  let tx = "This is a \"link\":http://example.com/index.html#1.";
  t.is( textile.convert( tx ),
    "<p>This is a <a href=\"http://example.com/index.html#1\">link</a>.</p>", tx );
});


test( 'links:36', function ( t ) {
  let tx = "This is a \"link\":http://example.com/index.html#a1.";
  t.is( textile.convert( tx ),
    "<p>This is a <a href=\"http://example.com/index.html#a1\">link</a>.</p>", tx );
});


test( 'links:37', function ( t ) {
  let tx = "This is a \"link\":http://example.com/index.html#a10.";
  t.is( textile.convert( tx ),
    "<p>This is a <a href=\"http://example.com/index.html#a10\">link</a>.</p>", tx );
});


test( 'links:38', function ( t ) {
  let tx = "This is a \"link\":http://example.com/?foo=bar.";
  t.is( textile.convert( tx ),
    "<p>This is a <a href=\"http://example.com/?foo=bar\">link</a>.</p>", tx );
});


test( 'links:39', function ( t ) {
  let tx = "This is a \"link\":http://example.com/?foo=bar#1.";
  t.is( textile.convert( tx ),
    "<p>This is a <a href=\"http://example.com/?foo=bar#1\">link</a>.</p>", tx );
});


test( 'links:40', function ( t ) {
  let tx = "This is a \"link\":http://example.com/?foo=bar#a.";
  t.is( textile.convert( tx ),
    "<p>This is a <a href=\"http://example.com/?foo=bar#a\">link</a>.</p>", tx );
});


test( 'links:41', function ( t ) {
  let tx = "This is a \"link\":http://example.com/?foo=bar#a1.";
  t.is( textile.convert( tx ),
    "<p>This is a <a href=\"http://example.com/?foo=bar#a1\">link</a>.</p>", tx );
});


test( 'links:42', function ( t ) {
  let tx = "This is a \"link\":http://example.com/?foo=bar#a10.";
  t.is( textile.convert( tx ),
    "<p>This is a <a href=\"http://example.com/?foo=bar#a10\">link</a>.</p>", tx );
});


test( 'links:43', function ( t ) {
  let tx = "This is a \"link\":http://example.com/?foo=bar#a10, but this is not.";
  t.is( textile.convert( tx ),
    "<p>This is a <a href=\"http://example.com/?foo=bar#a10\">link</a>, but this is not.</p>", tx );
});


test( 'links:44', function ( t ) {
  let tx = "(This is a \"link\":http://example.com/?foo=bar#a10) but this is not.";
  t.is( textile.convert( tx ),
    "<p>(This is a <a href=\"http://example.com/?foo=bar#a10\">link</a>) but this is not.</p>", tx );
});


test( 'links:45', function ( t ) {
  let tx = "\"link text(link title)\":http://example.com/";
  t.is( textile.convert( tx ),
    "<p><a href=\"http://example.com/\" title=\"link title\">link text</a></p>", tx );
});


test( 'link with title attribute', function ( t ) {
  let tx = "\"(link) text(link title)\":http://example.com/";
  t.is( textile.convert( tx ),
    "<p><a class=\"link\" href=\"http://example.com/\" title=\"link title\">text</a></p>", tx );
});


test( 'link with space between link text and title attribute', function ( t ) {
  let tx = "\"text (link title)\":http://example.com/";
  t.is( textile.convert( tx ),
    "<p><a href=\"http://example.com/\" title=\"link title\">text</a></p>", tx );
});


test( 'links:48', function ( t ) {
  let tx = "\"Dive Into XML\":http://www.xml.com/pub/au/164";
  t.is( textile.convert( tx ),
    "<p><a href=\"http://www.xml.com/pub/au/164\">Dive Into <span class=\"caps\">XML</span></a></p>", tx );
});


test( 'links:49', function ( t ) {
  let tx = "\"Lab Exercises\":../lab/exercises/exercises.html.";
  t.is( textile.convert( tx ),
    "<p><a href=\"../lab/exercises/exercises.html\">Lab Exercises</a>.</p>", tx );
});


test( 'links:50', function ( t ) {
  let tx = "Go to \"discuss\":http://www.dreammoods.com/cgibin/cutecast/cutecast.pl?forum=1&thread=26627 to discuss.";
  t.is( textile.convert( tx ),
    "<p>Go to <a href=\"http://www.dreammoods.com/cgibin/cutecast/cutecast.pl?forum=1&amp;thread=26627\">discuss</a> to discuss.</p>", tx );
});


test( 'links:51', function ( t ) {
  let tx = "* \"rubylang\":http://www.ruby-lang.org/en/";
  t.is( textile.convert( tx ),
    "<ul>\n\
\t<li><a href=\"http://www.ruby-lang.org/en/\">rubylang</a></li>\n\
</ul>", tx );
});


test( 'links:52', function ( t ) {
  let tx = "The ION coding style document found at \"IONCodingStyleGuide.doc\":http://perforce:8081/@md=d&cd=//&c=82E@//depot/systest/system/main/pub/doc/IONCodingStyleGuide.doc?ac=22 codifies a couple of rules to ensure reasonably consistent code and documentation of libraries in ION. Test text";
  t.is( textile.convert( tx ),
    "<p>The <span class=\"caps\">ION</span> coding style document found at <a href=\"http://perforce:8081/@md=d&amp;cd=//&amp;c=82E@//depot/systest/system/main/pub/doc/IONCodingStyleGuide.doc?ac=22\">IONCodingStyleGuide.doc</a> codifies a couple of rules to ensure reasonably consistent code and documentation of libraries in <span class=\"caps\">ION</span>. Test text</p>", tx );
});


test( 'links:53', function ( t ) {
  let tx = "\"testing\":";
  t.is( textile.convert( tx ),
    "<p>&#8220;testing&#8221;:</p>", tx );
});


test( 'trailing space not absorbed by link', function ( t ) {
  let tx = "\"Link\":/foo.html me";
  t.is( textile.convert( tx ),
    "<p><a href=\"/foo.html\">Link</a> me</p>", tx );
});


test( 'trailing comma stays outside link', function ( t ) {
  let tx = "\"Link\":/foo.html, me";
  t.is( textile.convert( tx ),
    "<p><a href=\"/foo.html\">Link</a>, me</p>", tx );
});


test( 'trailing exclamation stays outside link', function ( t ) {
  let tx = "\"Link\":/foo.html! me";
  t.is( textile.convert( tx ),
    "<p><a href=\"/foo.html\">Link</a>! me</p>", tx );
});


test( 'trailing semicolon stays outside link', function ( t ) {
  let tx = "\"Link\":/foo.html; me";
  t.is( textile.convert( tx ),
    "<p><a href=\"/foo.html\">Link</a>; me</p>", tx );
});


test( 'trailing period stays outside link', function ( t ) {
  let tx = "\"Link\":/foo.html.";
  t.is( textile.convert( tx ),
    "<p><a href=\"/foo.html\">Link</a>.</p>", tx );
});


test( 'whose text is a parenthetical statement', function ( t ) {
  let tx = "\"(just in case you were wondering)\":http://slashdot.org/";
  t.is( textile.convert( tx ),
    "<p><a href=\"http://slashdot.org/\">(just in case you were wondering)</a></p>", tx );
});


test( 'that has a class and whose text is a parenthetical statement', function ( t ) {
  let tx = "\"(myclass) (just in case you were wondering)\":http://slashdot.org/";
  t.is( textile.convert( tx ),
    "<p><a class=\"myclass\" href=\"http://slashdot.org/\">(just in case you were wondering)</a></p>", tx );
});


test( 'link containing parentheses', function ( t ) {
  let tx = "\"It is (very) fortunate that this works\":http://slashdot.org/";
  t.is( textile.convert( tx ),
    "<p><a href=\"http://slashdot.org/\">It is (very) fortunate that this works</a></p>", tx );
});


test( 'link containing quotes', function ( t ) {
  let tx = "\"He said it is \"very unlikely\" this works\":http://slashdot.org/";
  t.is( textile.convert( tx ),
    "<p><a href=\"http://slashdot.org/\">He said it is &#8220;very unlikely&#8221; this works</a></p>", tx );
});


test( 'link containing multiple quotes', function ( t ) {
  let tx = "\"He said it is \"very unlikely\" the \"economic stimulus\" works\":http://slashdot.org/";
  t.is( textile.convert( tx ),
    "<p><a href=\"http://slashdot.org/\">He said it is &#8220;very unlikely&#8221; the &#8220;economic stimulus&#8221; works</a></p>", tx );
});


test( 'linked quoted phrase', function ( t ) {
  let tx = "\"\"Open the pod bay doors please, HAL.\"\":http://www.youtube.com/watch?v=npN9l2Bd06s";
  t.is( textile.convert( tx ),
    "<p><a href=\"http://www.youtube.com/watch?v=npN9l2Bd06s\">&#8220;Open the pod bay doors please, <span class=\"caps\">HAL</span>.&#8221;</a></p>", tx );
});


test( 'link following quoted phrase', function ( t ) {
  let tx = "\"quote\" text \"quote\" text \"link\":http://google.com";
  t.is( textile.convert( tx ),
    "<p>&#8220;quote&#8221; text &#8220;quote&#8221; text <a href=\"http://google.com\">link</a></p>", tx );
});


test( 'links containing underscores', function ( t ) {
  let tx = "This is a link to a \"Wikipedia article about Barack\":http://en.wikipedia.org/wiki/Barack_Obama";
  t.is( textile.convert( tx ),
    "<p>This is a link to a <a href=\"http://en.wikipedia.org/wiki/Barack_Obama\">Wikipedia article about Barack</a></p>", tx );
});


test( 'links containing parentheses', function ( t ) {
  let tx = "This is a link to a [\"Wikipedia article about Textile\":http://en.wikipedia.org/wiki/Textile_(markup_language)]";
  t.is( textile.convert( tx ),
    "<p>This is a link to a <a href=\"http://en.wikipedia.org/wiki/Textile_(markup_language)\">Wikipedia article about Textile</a></p>", tx );
});


test( 'links contained in parentheses', function ( t ) {
  let tx = "This is a regular link (but in parentheses: \"Google\":http://www.google.com)";
  t.is( textile.convert( tx ),
    "<p>This is a regular link (but in parentheses: <a href=\"http://www.google.com\">Google</a>)</p>", tx );
});


test( 'links containing parentheses without brackets', function ( t ) {
  let tx = "This is a link to a \"Wikipedia article about Textile\":http://en.wikipedia.org/wiki/Textile_(markup_language)";
  t.is( textile.convert( tx ),
    "<p>This is a link to a <a href=\"http://en.wikipedia.org/wiki/Textile_(markup_language)\">Wikipedia article about Textile</a></p>", tx );
});


test( 'links containing parentheses period at end without brackets', function ( t ) {
  let tx = "This is a link to a \"Wikipedia article about Textile\":http://en.wikipedia.org/wiki/Textile_(markup_language).";
  t.is( textile.convert( tx ),
    "<p>This is a link to a <a href=\"http://en.wikipedia.org/wiki/Textile_(markup_language)\">Wikipedia article about Textile</a>.</p>", tx );
});


test( 'broken links containing parentheses without brackets', function ( t ) {
  let tx = "This is a link to a \"Wikipedia article about Textile\":http://en.wikipedia.org/wiki/Textile_(markup_language";
  t.is( textile.convert( tx ),
    "<p>This is a link to a <a href=\"http://en.wikipedia.org/wiki/Textile_(markup_language\">Wikipedia article about Textile</a></p>", tx );
});


test( 'links containing parentheses without brackets inside a parenthesis', function ( t ) {
  let tx = "Textile is awesome! (Check out the \"Wikipedia article about Textile\":http://en.wikipedia.org/wiki/Textile_(markup_language))";
  t.is( textile.convert( tx ),
    "<p>Textile is awesome! (Check out the <a href=\"http://en.wikipedia.org/wiki/Textile_(markup_language)\">Wikipedia article about Textile</a>)</p>", tx );
});


test( 'quotes and follow link', function ( t ) {
  let tx = "Some \"text\" followed by a \"link\":http://redcloth.org.";
  t.is( textile.convert( tx ),
    "<p>Some &#8220;text&#8221; followed by a <a href=\"http://redcloth.org\">link</a>.</p>", tx );
});


test( 'link alias containing dashes', function ( t ) {
  let tx = "\"link\":google-rocks\n\n\
[google-rocks]http://google.com";
  t.is( textile.convert( tx ),
    "<p><a href=\"http://google.com\">link</a></p>", tx );
});


test( 'contained in multi-paragraph quotes', function ( t ) {
  let tx = "\"I first learned about \"Redcloth\":http://redcloth.org/ several years ago.\n\n\
\"It's wonderful.\"";
  t.is( textile.convert( tx ),
    "<p>&#8220;I first learned about <a href=\"http://redcloth.org/\">Redcloth</a> several years ago.</p>\n\
<p>&#8220;It&#8217;s wonderful.&#8221;</p>", tx );
});


test( 'as html in notextile contained in multi-paragraph quotes', function ( t ) {
  let tx = "\"Here is a <notextile><a href=\"http://redcloth.org/\">link</a></notextile>.\n\n\
\"I like links.\"";
  t.is( textile.convert( tx ),
    "<p>&#8220;Here is a <a href=\"http://redcloth.org/\">link</a>.</p>\n\
<p>&#8220;I like links.&#8221;</p>", tx );
});


test( 'contained in para with multiple quotes', function ( t ) {
  let tx = "\"My wife, Tipper, and I will donate 100% of the proceeds of the award to the \"Alliance For Climate Protection\":http://www.looktothestars.org/charity/638-alliance-for-climate-protection,\" said Gore in an email. \"I am deeply honored to receive the Nobel Peace Prize.\"";
  t.is( textile.convert( tx ),
    "<p>&#8220;My wife, Tipper, and I will donate 100% of the proceeds of the award to the <a href=\"http://www.looktothestars.org/charity/638-alliance-for-climate-protection\">Alliance For Climate Protection</a>,&#8221; said Gore in an email. &#8220;I am deeply honored to receive the Nobel Peace Prize.&#8221;</p>", tx );
});


test( 'with caps in the title', function ( t ) {
  let tx = "\"British Skin Foundation (BSF)\":http://www.britishskinfoundation.org.uk";
  t.is( textile.convert( tx ),
    "<p><a href=\"http://www.britishskinfoundation.org.uk\" title=\"BSF\">British Skin Foundation</a></p>", tx );
});


test( 'containing HTML tags with quotes', function ( t ) {
  let tx = "\"<img name=\"checkmark.gif\" alt=\"Apply online\" />*apply online*\":/admissions/apply/";
  t.is( textile.convert( tx ),
    "<p><a href=\"/admissions/apply/\"><img name=\"checkmark.gif\" alt=\"Apply online\" /><strong>apply online</strong></a></p>", tx );
});

