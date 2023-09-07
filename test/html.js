import test from 'tape';
import textile from '../src/index.js';
// html.yml

test('html:1', t => {
  const tx = '*this <span></span> is strong*';
  t.is(textile.convert(tx),
    '<p><strong>this <span></span> is strong</strong></p>', tx);
  t.end();
});


test('html:2', t => {
  const tx = '*this <span>test</span> is strong*';
  t.is(textile.convert(tx),
    '<p><strong>this <span>test</span> is strong</strong></p>', tx);
  t.end();
});


test('html:3', t => {
  const tx = 'A simple <!-- HTML comment -->';
  t.is(textile.convert(tx),
    '<p>A simple <!-- HTML comment --></p>', tx);
  t.end();
});


test('html:4', t => {
  const tx = 'A simple <!-- HTML comment with hy-phen-a-tion -->';
  t.is(textile.convert(tx),
    '<p>A simple <!-- HTML comment with hy-phen-a-tion --></p>', tx);
  t.end();
});


// Does not confirm with PHP standard.
test.skip('no breaks between HTML elements', t => {
  const tx = `<ul>
\t<li>You can put HTML code right in Textile.</li>
\t<li>It will not insert a break between elements</li>
\t<li>or wrap it all in a p tag.</li>
\t<li>It should insert a hard break
if you break.</li>
</ul>`;
  t.is(textile.convert(tx),
    `<ul>
\t<li>You can put <span class="caps">HTML</span> code right in Textile.</li>
\t<li>It will not insert a break between elements</li>
\t<li>or wrap it all in a p tag.</li>
\t<li>It should insert a hard break<br />
if you break.</li>
</ul>`, tx);
  t.end();
});


test('line breaks', t => {
  const tx = `I spoke.<br />
And none replied.`;
  t.is(textile.convert(tx),
    `<p>I spoke.<br />
And none replied.</p>`, tx);
  t.end();
});


test('mixing of textile and XHTML', t => {
  const tx = `<img src="test.jpg" alt="test" />

Regular *paragraph*.

<div class="test">
This is one paragraph.

This is another.

!an/image.jpg!

* A list
* in a div.

</div>

Another paragraph.`;
  t.is(textile.convert(tx),
    `<p><img src="test.jpg" alt="test" /></p>
<p>Regular <strong>paragraph</strong>.</p>
<div class="test">
<p>This is one paragraph.</p>
<p>This is another.</p>
<p><img src="an/image.jpg" alt="" /></p>
<ul>
\t<li>A list</li>
\t<li>in a div.</li>
</ul>
</div>
<p>Another paragraph.</p>`, tx);
  t.end();
});


test('mixing of textile and XHTML', t => {
  const tx = `<img src="test.jpg" alt="test" />

Regular *paragraph*.`;
  t.is(textile.convert(tx),
    `<p><img src="test.jpg" alt="test" /></p>
<p>Regular <strong>paragraph</strong>.</p>`, tx);
  t.end();
});


test('wraps inline HTML in paragraphs', t => {
  const tx = '<em>asd</em> blabla "google":http://google.com';
  t.is(textile.convert(tx),
    '<p><em>asd</em> blabla <a href="http://google.com">google</a></p>', tx);
  t.end();
});


test('self closing XHTML with following text not recognized', t => {
  const tx = '<hr /> this has been a horizontal rule';
  t.is(textile.convert(tx),
    '<p><hr /> this has been a horizontal rule</p>', tx);
  t.end();
});


test('self closing HTML with following text not recognized', t => {
  const tx = '<hr> that was a horizontal rule too';
  t.is(textile.convert(tx),
    '<p><hr /> that was a horizontal rule too</p>', tx);
  t.end();
});


test('preserves block html', t => {
  const tx = `<div>123 Anystreet</div>

<p foo="bar">Explicit paragraph</p>`;
  t.is(textile.convert(tx),
    `<div>123 Anystreet</div>
<p foo="bar">Explicit paragraph</p>`, tx);
  t.end();
});


test('preserves empty block standalone elements', t => {
  const tx = '<hr />';
  t.is(textile.convert(tx),
    '<hr />', tx);
  t.end();
});


test.skip('unfinished standalone HTML', t => {
  const tx = `<div>
This is some div text.

More div text.`;
  t.is(textile.convert(tx),
    `<div>
<p>This is some div text.</p>
<p>More div text.</p>`, tx);
  t.end();
});


test.skip('unfinished HTML block', t => {
  const tx = `<div>This is some div text.

More div text.`;
  t.is(textile.convert(tx),
    `<div>This is some div text.<br />
<br />
More div text.`, tx);
  t.end();
});


test('complex example from real life', t => {
  const tx = `<div class="span-17 last">
<div class="span-8"><r:attachment:image name="logo.jpg" /></div>

<div class="span-9 last">
h1. Contact

Please contact us if you have questions or need help making arrangements.

</div>
</div>

<div class="span-8">
h2. Tom

(540) 555-1212

h3. Jerry

(540) 555-1234

</div>`;
  t.is(textile.convert(tx),
    `<div class="span-17 last">
<div class="span-8"><r:attachment:image name="logo.jpg" /></div>
<div class="span-9 last">
<h1>Contact</h1>
<p>Please contact us if you have questions or need help making arrangements.</p>
</div>
</div>
<div class="span-8">
<h2>Tom</h2>
<p>(540) 555-1212</p>
<h3>Jerry</h3>
<p>(540) 555-1234</p>
</div>`, tx);
  t.end();
});


test('HTML end tag can end blockquote', t => {
  const tx = `<div>
bq. This is a blockquote.
</div>`;
  t.is(textile.convert(tx),
    `<div>
bq. This is a blockquote.
</div>`, tx);
  t.end();
});


// BT: this disagrees with PHP which emits: <p><div></p>\n...
test('before table does not affect table', t => {
  const tx = `<div>

h2. heading

|a|b|c|
|d|e|f|`;
  t.is(textile.convert(tx),
    `<p>&lt;div&gt;</p>
<h2>heading</h2>
<table>
\t<tr>
\t\t<td>a</td>
\t\t<td>b</td>
\t\t<td>c</td>
\t</tr>
\t<tr>
\t\t<td>d</td>
\t\t<td>e</td>
\t\t<td>f</td>
\t</tr>
</table>`, tx);
  t.end();
});


test('tilde in innerHTML is not altered', t => {
  const tx = '<a href="http://foo.com/bar?something=1~2~3">http://foo.com/bar?something=1~2~3</a>';
  t.is(textile.convert(tx),
    '<p><a href="http://foo.com/bar?something=1~2~3">http://foo.com/bar?something=1~2~3</a></p>', tx);
  t.end();
});


test('empty block', t => {
  const tx = '<div class="test"></div>';
  t.is(textile.convert(tx),
    '<div class="test"></div>', tx);
  t.end();
});


test('in code escaped properly', t => {
  const tx = '<pre><code>some <b>bold</b> text</code></pre>';
  t.is(textile.convert(tx),
    '<pre><code>some &lt;b&gt;bold&lt;/b&gt; text</code></pre>', tx);
  t.end();
});


test('in code with class attribute escaped properly', t => {
  const tx = "<pre><code class='myclass'>some <b>bold</b> text</code></pre>";
  t.is(textile.convert(tx),
    '<pre><code class="myclass">some &lt;b&gt;bold&lt;/b&gt; text</code></pre>', tx);
  t.end();
});


test('notextile beginning the line', t => {
  const tx = '<notextile><a href="http://a.com">Sir Bobby Robson</a></notextile>, is a famous footballer';
  t.is(textile.convert(tx),
    '<p><a href="http://a.com">Sir Bobby Robson</a>, is a famous footballer</p>', tx);
  t.end();
});
