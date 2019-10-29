const test = require('tape');
const textile = require('../src');
// html.yml

test('html:1', function (t) {
  const tx = '*this <span></span> is strong*';
  t.is(textile.convert(tx),
    '<p><strong>this <span></span> is strong</strong></p>', tx);
  t.end();
});


test('html:2', function (t) {
  const tx = '*this <span>test</span> is strong*';
  t.is(textile.convert(tx),
    '<p><strong>this <span>test</span> is strong</strong></p>', tx);
  t.end();
});


test('html:3', function (t) {
  const tx = 'A simple <!-- HTML comment -->';
  t.is(textile.convert(tx),
    '<p>A simple <!-- HTML comment --></p>', tx);
  t.end();
});


test('html:4', function (t) {
  const tx = 'A simple <!-- HTML comment with hy-phen-a-tion -->';
  t.is(textile.convert(tx),
    '<p>A simple <!-- HTML comment with hy-phen-a-tion --></p>', tx);
  t.end();
});


// Does not confirm with PHP standard.
/*
test( 'no breaks between HTML elements', function ( t ) {
  let tx = "<ul>\n\
\t<li>You can put HTML code right in Textile.</li>\n\
\t<li>It will not insert a break between elements</li>\n\
\t<li>or wrap it all in a p tag.</li>\n\
\t<li>It should insert a hard break\n\
if you break.</li>\n\
</ul>";
  t.is( textile.convert( tx ),
    "<ul>\n\
\t<li>You can put <span class=\"caps\">HTML</span> code right in Textile.</li>\n\
\t<li>It will not insert a break between elements</li>\n\
\t<li>or wrap it all in a p tag.</li>\n\
\t<li>It should insert a hard break<br />\n\
if you break.</li>\n\
</ul>", tx );
  t.end();
});

*/

test('line breaks', function (t) {
  const tx = 'I spoke.<br />\n\
And none replied.';
  t.is(textile.convert(tx),
    '<p>I spoke.<br />\n\
And none replied.</p>', tx);
  t.end();
});


test('mixing of textile and XHTML', function (t) {
  const tx = '<img src="test.jpg" alt="test" />\n\n\
Regular *paragraph*.\n\n\
<div class="test">\n\
This is one paragraph.\n\n\
This is another.\n\n\
!an/image.jpg!\n\n\
* A list\n\
* in a div.\n\n\
</div>\n\n\
Another paragraph.';
  t.is(textile.convert(tx),
    '<p><img src="test.jpg" alt="test" /></p>\n\
<p>Regular <strong>paragraph</strong>.</p>\n\
<div class="test">\n\
<p>This is one paragraph.</p>\n\
<p>This is another.</p>\n\
<p><img src="an/image.jpg" alt="" /></p>\n\
<ul>\n\
\t<li>A list</li>\n\
\t<li>in a div.</li>\n\
</ul>\n\
</div>\n\
<p>Another paragraph.</p>', tx);
  t.end();
});


test('mixing of textile and XHTML', function (t) {
  const tx = '<img src="test.jpg" alt="test" />\n\n\
Regular *paragraph*.';
  t.is(textile.convert(tx),
    '<p><img src="test.jpg" alt="test" /></p>\n\
<p>Regular <strong>paragraph</strong>.</p>', tx);
  t.end();
});


test('wraps inline HTML in paragraphs', function (t) {
  const tx = '<em>asd</em> blabla "google":http://google.com';
  t.is(textile.convert(tx),
    '<p><em>asd</em> blabla <a href="http://google.com">google</a></p>', tx);
  t.end();
});


test('self closing XHTML with following text not recognized', function (t) {
  const tx = '<hr /> this has been a horizontal rule';
  t.is(textile.convert(tx),
    '<p><hr /> this has been a horizontal rule</p>', tx);
  t.end();
});


test('self closing HTML with following text not recognized', function (t) {
  const tx = '<hr> that was a horizontal rule too';
  t.is(textile.convert(tx),
    '<p><hr /> that was a horizontal rule too</p>', tx);
  t.end();
});


test('preserves block html', function (t) {
  const tx = '<div>123 Anystreet</div>\n\n\
<p foo="bar">Explicit paragraph</p>';
  t.is(textile.convert(tx),
    '<div>123 Anystreet</div>\n\
<p foo="bar">Explicit paragraph</p>', tx);
  t.end();
});


test('preserves empty block standalone elements', function (t) {
  const tx = '<hr />';
  t.is(textile.convert(tx),
    '<hr />', tx);
  t.end();
});

/*
test( 'unfinished standalone HTML', function ( t ) {
  let tx = "<div>\n\
This is some div text.\n\n\
More div text.";
  t.is( textile.convert( tx ),
    "<div>\n\
<p>This is some div text.</p>\n\
<p>More div text.</p>", tx );
  t.end();
});


test( 'unfinished HTML block', function ( t ) {
  let tx = "<div>This is some div text.\n\n\
More div text.";
  t.is( textile.convert( tx ),
    "<div>This is some div text.<br />\n\
<br />\n\
More div text.", tx );
  t.end();
});
*/

test('complex example from real life', function (t) {
  const tx = '<div class="span-17 last">\n\
<div class="span-8"><r:attachment:image name="logo.jpg" /></div>\n\n\
<div class="span-9 last">\n\
h1. Contact\n\n\
Please contact us if you have questions or need help making arrangements.\n\n\
</div>\n\
</div>\n\n\
<div class="span-8">\n\
h2. Tom\n\n\
(540) 555-1212\n\n\
h3. Jerry\n\n\
(540) 555-1234\n\n\
</div>';
  t.is(textile.convert(tx),
    '<div class="span-17 last">\n\
<div class="span-8"><r:attachment:image name="logo.jpg" /></div>\n\
<div class="span-9 last">\n\
<h1>Contact</h1>\n\
<p>Please contact us if you have questions or need help making arrangements.</p>\n\
</div>\n\
</div>\n\
<div class="span-8">\n\
<h2>Tom</h2>\n\
<p>(540) 555-1212</p>\n\
<h3>Jerry</h3>\n\
<p>(540) 555-1234</p>\n\
</div>', tx);
  t.end();
});


test('HTML end tag can end blockquote', function (t) {
  const tx = '<div>\n\
bq. This is a blockquote.\n\
</div>';
  t.is(textile.convert(tx),
    '<div>\n\
bq. This is a blockquote.\n\
</div>', tx);
  t.end();
});


// BT: this disagrees with PHP which emits: <p><div></p>\n...
test('before table does not affect table', function (t) {
  const tx = '<div>\n\n\
h2. heading\n\n\
|a|b|c|\n\
|d|e|f|';
  t.is(textile.convert(tx),
    '<p>&lt;div&gt;</p>\n\
<h2>heading</h2>\n\
<table>\n\
\t<tr>\n\
\t\t<td>a</td>\n\
\t\t<td>b</td>\n\
\t\t<td>c</td>\n\
\t</tr>\n\
\t<tr>\n\
\t\t<td>d</td>\n\
\t\t<td>e</td>\n\
\t\t<td>f</td>\n\
\t</tr>\n\
</table>', tx);
  t.end();
});


test('tilde in innerHTML is not altered', function (t) {
  const tx = '<a href="http://foo.com/bar?something=1~2~3">http://foo.com/bar?something=1~2~3</a>';
  t.is(textile.convert(tx),
    '<p><a href="http://foo.com/bar?something=1~2~3">http://foo.com/bar?something=1~2~3</a></p>', tx);
  t.end();
});


test('empty block', function (t) {
  const tx = '<div class="test"></div>';
  t.is(textile.convert(tx),
    '<div class="test"></div>', tx);
  t.end();
});


test('in code escaped properly', function (t) {
  const tx = '<pre><code>some <b>bold</b> text</code></pre>';
  t.is(textile.convert(tx),
    '<pre><code>some &lt;b&gt;bold&lt;/b&gt; text</code></pre>', tx);
  t.end();
});


test('in code with class attribute escaped properly', function (t) {
  const tx = "<pre><code class='myclass'>some <b>bold</b> text</code></pre>";
  t.is(textile.convert(tx),
    '<pre><code class="myclass">some &lt;b&gt;bold&lt;/b&gt; text</code></pre>', tx);
  t.end();
});


test('notextile beginning the line', function (t) {
  const tx = '<notextile><a href="http://a.com">Sir Bobby Robson</a></notextile>, is a famous footballer';
  t.is(textile.convert(tx),
    '<p><a href="http://a.com">Sir Bobby Robson</a>, is a famous footballer</p>', tx);
  t.end();
});
