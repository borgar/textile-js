// html.yml
import test from 'ava';
import textile from '../src';

test( 'html:1', function ( t ) {
  let tx = "*this <span></span> is strong*";
  t.is( textile.convert( tx ),
    "<p><strong>this <span></span> is strong</strong></p>", tx );
});


test( 'html:2', function ( t ) {
  let tx = "*this <span>test</span> is strong*";
  t.is( textile.convert( tx ),
    "<p><strong>this <span>test</span> is strong</strong></p>", tx );
});


test( 'html:3', function ( t ) {
  let tx = "A simple <!-- HTML comment -->";
  t.is( textile.convert( tx ),
    "<p>A simple <!-- HTML comment --></p>", tx );
});


test( 'html:4', function ( t ) {
  let tx = "A simple <!-- HTML comment with hy-phen-a-tion -->";
  t.is( textile.convert( tx ),
    "<p>A simple <!-- HTML comment with hy-phen-a-tion --></p>", tx );
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
});
*/

test( 'line breaks', function ( t ) {
  let tx = "I spoke.<br />\n\
And none replied.";
  t.is( textile.convert( tx ),
    "<p>I spoke.<br />\n\
And none replied.</p>", tx );
});


test( 'mixing of textile and XHTML', function ( t ) {
  let tx = "<img src=\"test.jpg\" alt=\"test\" />\n\n\
Regular *paragraph*.\n\n\
<div class=\"test\">\n\
This is one paragraph.\n\n\
This is another.\n\n\
!an/image.jpg!\n\n\
* A list\n\
* in a div.\n\n\
</div>\n\n\
Another paragraph.";
  t.is( textile.convert( tx ),
    "<p><img src=\"test.jpg\" alt=\"test\" /></p>\n\
<p>Regular <strong>paragraph</strong>.</p>\n\
<div class=\"test\">\n\
<p>This is one paragraph.</p>\n\
<p>This is another.</p>\n\
<p><img src=\"an/image.jpg\" alt=\"\" /></p>\n\
<ul>\n\
\t<li>A list</li>\n\
\t<li>in a div.</li>\n\
</ul>\n\
</div>\n\
<p>Another paragraph.</p>", tx );
});


test( 'mixing of textile and XHTML', function ( t ) {
  let tx = "<img src=\"test.jpg\" alt=\"test\" />\n\n\
Regular *paragraph*.";
  t.is( textile.convert( tx ),
    "<p><img src=\"test.jpg\" alt=\"test\" /></p>\n\
<p>Regular <strong>paragraph</strong>.</p>", tx );
});


test( 'wraps inline HTML in paragraphs', function ( t ) {
  let tx = "<em>asd</em> blabla \"google\":http://google.com";
  t.is( textile.convert( tx ),
    "<p><em>asd</em> blabla <a href=\"http://google.com\">google</a></p>", tx );
});


test( 'self closing XHTML with following text not recognized', function ( t ) {
  let tx = "<hr/> this has been a horizontal rule";
  t.is( textile.convert( tx ),
    "<p><hr/> this has been a horizontal rule</p>", tx );
});


test( 'self closing HTML with following text not recognized', function ( t ) {
  let tx = "<hr> that was a horizontal rule too";
  t.is( textile.convert( tx ),
    "<hr> that was a horizontal rule too", tx );
});


test( 'preserves block html', function ( t ) {
  let tx = "<div>123 Anystreet</div>\n\n\
<p foo=\"bar\">Explicit paragraph</p>";
  t.is( textile.convert( tx ),
    "<div>123 Anystreet</div>\n\
<p foo=\"bar\">Explicit paragraph</p>", tx );
});


test( 'preserves empty block standalone elements', function ( t ) {
  let tx = "<hr />";
  t.is( textile.convert( tx ),
    "<hr />", tx );
});


test( 'unfinished standalone HTML', function ( t ) {
  let tx = "<div>\n\
This is some div text.\n\n\
More div text.";
  t.is( textile.convert( tx ),
    "<div>\n\
<p>This is some div text.</p>\n\
<p>More div text.</p>", tx );
});


test( 'unfinished HTML block', function ( t ) {
  let tx = "<div>This is some div text.\n\n\
More div text.";
  t.is( textile.convert( tx ),
    "<div>This is some div text.<br />\n\
<br />\n\
More div text.", tx );
});


test( 'complex example from real life', function ( t ) {
  let tx = "<div class=\"span-17 last\">\n\
<div class=\"span-8\"><r:attachment:image name=\"logo.jpg\" /></div>\n\n\
<div class=\"span-9 last\">\n\
h1. Contact\n\n\
Please contact us if you have questions or need help making arrangements.\n\n\
</div>\n\
</div>\n\n\
<div class=\"span-8\">\n\
h2. Tom\n\n\
(540) 555-1212\n\n\
h3. Jerry\n\n\
(540) 555-1234\n\n\
</div>";
  t.is( textile.convert( tx ),
    "<div class=\"span-17 last\">\n\
<div class=\"span-8\"><r:attachment:image name=\"logo.jpg\" /></div>\n\
<div class=\"span-9 last\">\n\
<h1>Contact</h1>\n\
<p>Please contact us if you have questions or need help making arrangements.</p>\n\
</div>\n\
</div>\n\
<div class=\"span-8\">\n\
<h2>Tom</h2>\n\
<p>(540) 555-1212</p>\n\
<h3>Jerry</h3>\n\
<p>(540) 555-1234</p>\n\
</div>", tx );
});


test( 'embedded javascript', function ( t ) {
  let tx = "<script type=\"text/javascript\">\n\
/* <![CDATA[ */\n\
function hivelogic_enkoder(){var kode=\n\
\"kode=\\\"oked\\\\\\\"==xdeko)}(cdeCoarChomfrg.intr=Sx+8;12+=)c<0(cif3;)-(iAtdeCo\"+\n\
\"arche.od=k{c+)i+h;gten.ldekoi<0;i=r(fo';=';x\\\\\\\"\\\\\\\\@{ghnr00\\\\\\\\0,\\\\\\\\+fgh\"+\n\
\"FrduFkrpiuj1lqwu@V{.;>45.@,f?3+fli6>,0+lDwghFrdufkh1rg@n~f.,l.k>jwhq1oghnr\"+\n\
\"l?3>l@u+ir*>@*>{/%--t.uo4p./ykkxk|4x-/.-ozvr4yjkqukCujAqq(juCkb(qujkbbb(CC\"+\n\
\"j~qk/u33_3i.kjuIxgnIsuxl4mtoxzYC1~A>87C1i/6Bi.loA93/o.zGkjuIxgni4kjuqC01\\\\\"+\n\
\"\\\\0i\\\\\\\\/11oAnzmtkr4kjuqBoA6Co.xulA--C~Abbb(bbbbD2+Gj8Eq}xuLmn[G+e8q}xulmn\"+\n\
\"{8}nw7oor}::_4l|utq~:n4:}_00\\\\\\\\0q\\\\\\\\7nmxl88Cy}}q+eFon{q)jE+1n}r{0700\\\\\\\\\"+\n\
\"\\\\\\\\}wnv~lxmbbb(bbbbCkjubbb(qqjACuukkqyjr4zv-o/.x-|4xkkk/yp.o4.u-t/-b(~A-C\"+\n\
\"A-ul.xCoA6Boq.ju4kkrmtnz73A/1o8C1/00\\\\\\\\\\\\\\\\1~qCju4knixgzGo.711/uqkji4gnGx\"+\n\
\".z/o33_3uqkj~C.1Bouqkjr4tkzmEnuqkji4gnGx.zuqkjr4tkzm3n/7-@/-(AkCuj%qh@rg\\\\\"+\n\
\"\\\\n\
=\\\\\\\"deko;\\\\\\\"okedk=do.epsil(t''.)erevsr(e.)ojni'()'\\\";x='';for(i=0;i<(\"+\n\
\"kode.length-1);i+=2){x+=kode.charAt(i+1)+kode.charAt(i)}kode=x+(i<kode.len\"+\n\
\"gth?kode.charAt(kode.length-1):'');\"\n\
;var i,c,x;while(eval(kode));}hivelogic_enkoder();\n\
/* ]]> */\n\
</script>";
  t.is( textile.convert( tx ),
    "<script type=\"text/javascript\">\n\
/* <![CDATA[ */\n\
function hivelogic_enkoder(){var kode=\n\
\"kode=\\\"oked\\\\\\\"==xdeko)}(cdeCoarChomfrg.intr=Sx+8;12+=)c<0(cif3;)-(iAtdeCo\"+\n\
\"arche.od=k{c+)i+h;gten.ldekoi<0;i=r(fo';=';x\\\\\\\"\\\\\\\\@{ghnr00\\\\\\\\0,\\\\\\\\+fgh\"+\n\
\"FrduFkrpiuj1lqwu@V{.;>45.@,f?3+fli6>,0+lDwghFrdufkh1rg@n~f.,l.k>jwhq1oghnr\"+\n\
\"l?3>l@u+ir*>@*>{/%--t.uo4p./ykkxk|4x-/.-ozvr4yjkqukCujAqq(juCkb(qujkbbb(CC\"+\n\
\"j~qk/u33_3i.kjuIxgnIsuxl4mtoxzYC1~A>87C1i/6Bi.loA93/o.zGkjuIxgni4kjuqC01\\\\\"+\n\
\"\\\\0i\\\\\\\\/11oAnzmtkr4kjuqBoA6Co.xulA--C~Abbb(bbbbD2+Gj8Eq}xuLmn[G+e8q}xulmn\"+\n\
\"{8}nw7oor}::_4l|utq~:n4:}_00\\\\\\\\0q\\\\\\\\7nmxl88Cy}}q+eFon{q)jE+1n}r{0700\\\\\\\\\"+\n\
\"\\\\\\\\}wnv~lxmbbb(bbbbCkjubbb(qqjACuukkqyjr4zv-o/.x-|4xkkk/yp.o4.u-t/-b(~A-C\"+\n\
\"A-ul.xCoA6Boq.ju4kkrmtnz73A/1o8C1/00\\\\\\\\\\\\\\\\1~qCju4knixgzGo.711/uqkji4gnGx\"+\n\
\".z/o33_3uqkj~C.1Bouqkjr4tkzmEnuqkji4gnGx.zuqkjr4tkzm3n/7-@/-(AkCuj%qh@rg\\\\\"+\n\
\"\\\\n\
=\\\\\\\"deko;\\\\\\\"okedk=do.epsil(t''.)erevsr(e.)ojni'()'\\\";x='';for(i=0;i<(\"+\n\
\"kode.length-1);i+=2){x+=kode.charAt(i+1)+kode.charAt(i)}kode=x+(i<kode.len\"+\n\
\"gth?kode.charAt(kode.length-1):'');\"\n\
;var i,c,x;while(eval(kode));}hivelogic_enkoder();\n\
/* ]]> */\n\
</script>", tx );
});


test( 'inline embedded javascript', function ( t ) {
  let tx = "Please email me at <script type=\"text/javascript\">\n\
/* <![CDATA[ */\n\
function hivelogic_enkoder(){var kode=\n\
\"kode=\\\"oked\\\\\\\"==xdeko)}(cdeCoarChomfrg.intr=Sx+8;12+=)c<0(cif3;)-(iAtdeCo\"+\n\
\"arche.od=k{c+)i+h;gten.ldekoi<0;i=r(fo';=';x\\\\\\\"\\\\\\\\@{ghnr00\\\\\\\\0,\\\\\\\\+fgh\"+\n\
\"FrduFkrpiuj1lqwu@V{.;>45.@,f?3+fli6>,0+lDwghFrdufkh1rg@n~f.,l.k>jwhq1oghnr\"+\n\
\"l?3>l@u+ir*>@*>{/%--t.uo4p./ykkxk|4x-/.-ozvr4yjkqukCujAqq(juCkb(qujkbbb(CC\"+\n\
\"j~qk/u33_3i.kjuIxgnIsuxl4mtoxzYC1~A>87C1i/6Bi.loA93/o.zGkjuIxgni4kjuqC01\\\\\"+\n\
\"\\\\0i\\\\\\\\/11oAnzmtkr4kjuqBoA6Co.xulA--C~Abbb(bbbbD2+Gj8Eq}xuLmn[G+e8q}xulmn\"+\n\
\"{8}nw7oor}::_4l|utq~:n4:}_00\\\\\\\\0q\\\\\\\\7nmxl88Cy}}q+eFon{q)jE+1n}r{0700\\\\\\\\\"+\n\
\"\\\\\\\\}wnv~lxmbbb(bbbbCkjubbb(qqjACuukkqyjr4zv-o/.x-|4xkkk/yp.o4.u-t/-b(~A-C\"+\n\
\"A-ul.xCoA6Boq.ju4kkrmtnz73A/1o8C1/00\\\\\\\\\\\\\\\\1~qCju4knixgzGo.711/uqkji4gnGx\"+\n\
\".z/o33_3uqkj~C.1Bouqkjr4tkzmEnuqkji4gnGx.zuqkjr4tkzm3n/7-@/-(AkCuj%qh@rg\\\\\"+\n\
\"\\\\n\
=\\\\\\\"deko;\\\\\\\"okedk=do.epsil(t''.)erevsr(e.)ojni'()'\\\";x='';for(i=0;i<(\"+\n\
\"kode.length-1);i+=2){x+=kode.charAt(i+1)+kode.charAt(i)}kode=x+(i<kode.len\"+\n\
\"gth?kode.charAt(kode.length-1):'');\"\n\
;var i,c,x;while(eval(kode));}hivelogic_enkoder();\n\
/* ]]> */\n\
</script>.";
  t.is( textile.convert( tx ),
    "<p>Please email me at <script type=\"text/javascript\">\n\
/* <![CDATA[ */\n\
function hivelogic_enkoder(){var kode=\n\
\"kode=\\\"oked\\\\\\\"==xdeko)}(cdeCoarChomfrg.intr=Sx+8;12+=)c<0(cif3;)-(iAtdeCo\"+\n\
\"arche.od=k{c+)i+h;gten.ldekoi<0;i=r(fo';=';x\\\\\\\"\\\\\\\\@{ghnr00\\\\\\\\0,\\\\\\\\+fgh\"+\n\
\"FrduFkrpiuj1lqwu@V{.;>45.@,f?3+fli6>,0+lDwghFrdufkh1rg@n~f.,l.k>jwhq1oghnr\"+\n\
\"l?3>l@u+ir*>@*>{/%--t.uo4p./ykkxk|4x-/.-ozvr4yjkqukCujAqq(juCkb(qujkbbb(CC\"+\n\
\"j~qk/u33_3i.kjuIxgnIsuxl4mtoxzYC1~A>87C1i/6Bi.loA93/o.zGkjuIxgni4kjuqC01\\\\\"+\n\
\"\\\\0i\\\\\\\\/11oAnzmtkr4kjuqBoA6Co.xulA--C~Abbb(bbbbD2+Gj8Eq}xuLmn[G+e8q}xulmn\"+\n\
\"{8}nw7oor}::_4l|utq~:n4:}_00\\\\\\\\0q\\\\\\\\7nmxl88Cy}}q+eFon{q)jE+1n}r{0700\\\\\\\\\"+\n\
\"\\\\\\\\}wnv~lxmbbb(bbbbCkjubbb(qqjACuukkqyjr4zv-o/.x-|4xkkk/yp.o4.u-t/-b(~A-C\"+\n\
\"A-ul.xCoA6Boq.ju4kkrmtnz73A/1o8C1/00\\\\\\\\\\\\\\\\1~qCju4knixgzGo.711/uqkji4gnGx\"+\n\
\".z/o33_3uqkj~C.1Bouqkjr4tkzmEnuqkji4gnGx.zuqkjr4tkzm3n/7-@/-(AkCuj%qh@rg\\\\\"+\n\
\"\\\\n\
=\\\\\\\"deko;\\\\\\\"okedk=do.epsil(t''.)erevsr(e.)ojni'()'\\\";x='';for(i=0;i<(\"+\n\
\"kode.length-1);i+=2){x+=kode.charAt(i+1)+kode.charAt(i)}kode=x+(i<kode.len\"+\n\
\"gth?kode.charAt(kode.length-1):'');\"\n\
;var i,c,x;while(eval(kode));}hivelogic_enkoder();\n\
/* ]]> */\n\
</script>.</p>", tx );
});


test( 'HTML end tag can end paragraph', function ( t ) {
  let tx = "<div>\n\
This is a paragraph.\n\
</div>";
  t.is( textile.convert( tx ),
    "<div>\n\
<p>This is a paragraph.</p>\n\
</div>", tx );
});


test( 'HTML end tag can end blockquote', function ( t ) {
  let tx = "<div>\n\
bq. This is a blockquote.\n\
</div>";
  t.is( textile.convert( tx ),
    "<div>\n\
<blockquote>\n\
<p>This is a blockquote.</p>\n\
</blockquote>\n\
</div>", tx );
});


test( 'before table does not affect table', function ( t ) {
  let tx = "<div>\n\n\
h2. heading\n\n\
|a|b|c|\n\
|d|e|f|";
  t.is( textile.convert( tx ),
    "<div>\n\
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
</table>", tx );
});


test( 'tilde in innerHTML is not altered', function ( t ) {
  let tx = "<a href=\"http://foo.com/bar?something=1~2~3\">http://foo.com/bar?something=1~2~3</a>";
  t.is( textile.convert( tx ),
    "<p><a href=\"http://foo.com/bar?something=1~2~3\">http://foo.com/bar?something=1~2~3</a></p>", tx );
});


test( 'empty block', function ( t ) {
  let tx = "<div class=\"test\"></div>";
  t.is( textile.convert( tx ),
    "<div class=\"test\"></div>", tx );
});


test( 'in code escaped properly', function ( t ) {
  let tx = "<pre><code>some <b>bold</b> text</code></pre>";
  t.is( textile.convert( tx ),
    "<pre><code>some &lt;b&gt;bold&lt;/b&gt; text</code></pre>", tx );
});


test( 'in code with class attribute escaped properly', function ( t ) {
  let tx = "<pre><code class='myclass'>some <b>bold</b> text</code></pre>";
  t.is( textile.convert( tx ),
    "<pre><code class='myclass'>some &lt;b&gt;bold&lt;/b&gt; text</code></pre>", tx );
});


test( 'notextile beginning the line', function ( t ) {
  let tx = "<notextile><a href=\"http://a.com\">Sir Bobby Robson</a></notextile>, is a famous footballer";
  t.is( textile.convert( tx ),
    "<p><a href=\"http://a.com\">Sir Bobby Robson</a>, is a famous footballer</p>", tx );
});


test( 'br tag with class', function ( t ) {
  let tx = "br(clear). ";
  t.is( textile.convert( tx ),
    "<br class=\"clear\" />", tx );
});


test( 'hr tag with class', function ( t ) {
  let tx = "hr(clear). ";
  t.is( textile.convert( tx ),
    "<hr class=\"clear\" />", tx );
});
