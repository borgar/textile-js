import test from 'tape';
import textile from '../src/index.js';
// instiki.yml

test('instiki:1', t => {
  const tx = '_Hi, <span class="newWikiWord">Joe Bob<a href="../show/JoeBob">?</a></span>, this should all be in italic!_';
  t.is(textile.convert(tx),
    '<p><em>Hi, <span class="newWikiWord">Joe Bob<a href="../show/JoeBob">?</a></span>, this should all be in italic!</em></p>', tx);
  t.end();
});


test('instiki:2', t => {
  const tx = '*this <span>span</span> is strong*';
  t.is(textile.convert(tx),
    '<p><strong>this <span>span</span> is strong</strong></p>', tx);
  t.end();
});


test('instiki:3', t => {
  const tx = '*this <span>Camel Thing<a href="../show/CamelThing">?</a></span> is strong*';
  t.is(textile.convert(tx),
    '<p><strong>this <span>Camel Thing<a href="../show/CamelThing">?</a></span> is strong</strong></p>', tx);
  t.end();
});


test('instiki:4', t => {
  const tx = '_this <span>span</span> is italic_';
  t.is(textile.convert(tx),
    '<p><em>this <span>span</span> is italic</em></p>', tx);
  t.end();
});


test.skip('instiki:5', t => {
  const tx = '%{color:red}nested span because of <span><span class="newWikiWord">Camel Word<a href="../show/CamelWord">?</a></span></span>%';
  t.is(textile.convert(tx),
    '<p><span style="color:red;">nested span because of <span><span class="newWikiWord">Camel Word<a href="../show/CamelWord">?</a></span></span></span></p>', tx);
  t.end();
});


test('instiki:6', t => {
  const tx = `h2. Version History

* "Version
0.0":http://www.threewordslong.com/render-0-8-9b.patch - Early version using MD5 hashes.
* "Version
0.1":http://www.threewordslong.com/chunk-0-1.patch.gz - First cut of new system. Much cleaner.
* "Version 0.2":http://www.threewordslong.com/chunk-0-2.patch.gz - Fixed problem with "authors" page and some tests.`;
  t.is(textile.convert(tx),
    `<h2>Version History</h2>
<ul>
\t<li><a href="http://www.threewordslong.com/render-0-8-9b.patch">Version<br />
0.0</a> – Early version using <span class="caps">MD5</span> hashes.</li>
\t<li><a href="http://www.threewordslong.com/chunk-0-1.patch.gz">Version<br />
0.1</a> – First cut of new system. Much cleaner.</li>
\t<li><a href="http://www.threewordslong.com/chunk-0-2.patch.gz">Version 0.2</a> – Fixed problem with “authors” page and some tests.</li>
</ul>`, tx);
  t.end();
});


test('instiki:7', t => {
  const tx = '--richSeymour --whyTheLuckyStiff';
  t.is(textile.convert(tx),
    '<p>—richSeymour —whyTheLuckyStiff</p>', tx);
  t.end();
});

