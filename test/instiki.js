// instiki.yml
import test from 'ava';
import textile from '../src';

test( 'instiki:1', function ( t ) {
  let tx = "_Hi, <span class=\"newWikiWord\">Joe Bob<a href=\"../show/JoeBob\">?</a></span>, this should all be in italic!_";
  t.is( textile.convert( tx ),
    "<p><em>Hi, <span class=\"newWikiWord\">Joe Bob<a href=\"../show/JoeBob\">?</a></span>, this should all be in italic!</em></p>", tx );
});


test( 'instiki:2', function ( t ) {
  let tx = "*this <span>span</span> is strong*";
  t.is( textile.convert( tx ),
    "<p><strong>this <span>span</span> is strong</strong></p>", tx );
});


test( 'instiki:3', function ( t ) {
  let tx = "*this <span>Camel Thing<a href=\"../show/CamelThing\">?</a></span> is strong*";
  t.is( textile.convert( tx ),
    "<p><strong>this <span>Camel Thing<a href=\"../show/CamelThing\">?</a></span> is strong</strong></p>", tx );
});


test( 'instiki:4', function ( t ) {
  let tx = "_this <span>span</span> is italic_";
  t.is( textile.convert( tx ),
    "<p><em>this <span>span</span> is italic</em></p>", tx );
});


/*test( 'instiki:5', function ( t ) {
  let tx = "%{color:red}nested span because of <span><span class=\"newWikiWord\">Camel Word<a href=\"../show/CamelWord\">?</a></span></span>%";
  t.is( textile.convert( tx ),
    "<p><span style=\"color:red;\">nested span because of <span><span class=\"newWikiWord\">Camel Word<a href=\"../show/CamelWord\">?</a></span></span></span></p>", tx );
});*/


test( 'instiki:6', function ( t ) {
  let tx = "h2. Version History\n\n\
* \"Version\n\
0.0\":http://www.threewordslong.com/render-0-8-9b.patch - Early version using MD5 hashes.\n\
* \"Version\n\
0.1\":http://www.threewordslong.com/chunk-0-1.patch.gz - First cut of new system. Much cleaner.\n\
* \"Version 0.2\":http://www.threewordslong.com/chunk-0-2.patch.gz - Fixed problem with \"authors\" page and some tests.";
  t.is( textile.convert( tx ),
    "<h2>Version History</h2>\n\
<ul>\n\
\t<li><a href=\"http://www.threewordslong.com/render-0-8-9b.patch\">Version<br />\n\
0.0</a> &#8211; Early version using MD5 hashes.</li>\n\
\t<li><a href=\"http://www.threewordslong.com/chunk-0-1.patch.gz\">Version<br />\n\
0.1</a> &#8211; First cut of new system. Much cleaner.</li>\n\
\t<li><a href=\"http://www.threewordslong.com/chunk-0-2.patch.gz\">Version 0.2</a> &#8211; Fixed problem with &#8220;authors&#8221; page and some tests.</li>\n\
</ul>", tx );
});


test( 'instiki:7', function ( t ) {
  let tx = "--richSeymour --whyTheLuckyStiff";
  t.is( textile.convert( tx ),
    "<p>&#8212;richSeymour &#8212;whyTheLuckyStiff</p>", tx );
});
