test('html.yml', function () {


// =[ 1 ]==============================================================================


equal(textile.convert( // The textile

  "*this <span></span> is strong*"

), // Should output

  "<p><strong>this <span></span> is strong</strong></p>");


// =[ 2 ]==============================================================================


equal(textile.convert( // The textile

  "*this <span>test</span> is strong*"

), // Should output

  "<p><strong>this <span>test</span> is strong</strong></p>");


// =[ 3 ]==============================================================================


equal(textile.convert( // The textile

  "A simple <!-- HTML comment -->"

), // Should output

  "<p>A simple <!-- HTML comment --></p>");


// =[ 4 ]==============================================================================


equal(textile.convert( // The textile

  "A simple <!-- HTML comment with hy-phen-a-tion -->"

), // Should output

  "<p>A simple <!-- HTML comment with hy-phen-a-tion --></p>");


// =[ 5 ]==============================================================================


equal(textile.convert( // The textile

  "<ul>\n"+
  "\t<li>You can put HTML code right in Textile.</li>\n"+
  "\t<li>It will not insert a break between elements</li>\n"+
  "\t<li>or wrap it all in a p tag.</li>\n"+
  "\t<li>It should insert a hard break\n"+
  "if you break.</li>\n"+
  "</ul>"

), // Should output

  "<ul>\n"+
  "\t<li>You can put <span class=\"caps\">HTML</span> code right in Textile.</li>\n"+
  "\t<li>It will not insert a break between elements</li>\n"+
  "\t<li>or wrap it all in a p tag.</li>\n"+
  "\t<li>It should insert a hard break<br />\n"+
  "if you break.</li>\n"+
  "</ul>"

,"no breaks between HTML elements");


// =[ 6 ]==============================================================================


equal(textile.convert( // The textile

  "I spoke.<br />\n"+
  "And none replied."

), // Should output

  "<p>I spoke.<br />\n"+
  "And none replied.</p>"

,"line breaks");


// =[ 7 ]==============================================================================


equal(textile.convert( // The textile

  "<img src=\"test.jpg\" alt=\"test\" />\n"+
  "\n"+
  "Regular *paragraph*.\n"+
  "\n"+
  "<div class=\"test\">\n"+
  "This is one paragraph.\n"+
  "\n"+
  "This is another.\n"+
  "\n"+
  "!an/image.jpg!\n"+
  "\n"+
  "* A list\n"+
  "* in a div.\n"+
  "\n"+
  "</div>\n"+
  "\n"+
  "Another paragraph."

), // Should output

  "<p><img src=\"test.jpg\" alt=\"test\" /></p>\n"+
  "<p>Regular <strong>paragraph</strong>.</p>\n"+
  "<div class=\"test\">\n"+
  "<p>This is one paragraph.</p>\n"+
  "<p>This is another.</p>\n"+
  "<p><img src=\"an/image.jpg\" alt=\"\" /></p>\n"+
  "<ul>\n"+
  "\t<li>A list</li>\n"+
  "\t<li>in a div.</li>\n"+
  "</ul>\n"+
  "</div>\n"+
  "<p>Another paragraph.</p>"

,"mixing of textile and XHTML");


// =[ 8 ]==============================================================================


equal(textile.convert( // The textile

  "<img src=\"test.jpg\" alt=\"test\" />\n"+
  "\n"+
  "Regular *paragraph*."

), // Should output

  "<p><img src=\"test.jpg\" alt=\"test\" /></p>\n"+
  "<p>Regular <strong>paragraph</strong>.</p>"

,"mixing of textile and XHTML");


// =[ 9 ]==============================================================================


equal(textile.convert( // The textile

  "<em>asd</em> blabla \"google\":http://google.com"

), // Should output

  "<p><em>asd</em> blabla <a href=\"http://google.com\">google</a></p>"

,"wraps inline HTML in paragraphs");


// =[ 10 ]==============================================================================


equal(textile.convert( // The textile

  "<hr/> this has been a horizontal rule"

), // Should output

  "<p><hr/> this has been a horizontal rule</p>"

,"self closing XHTML with following text not recognized");


// =[ 11 ]==============================================================================


equal(textile.convert( // The textile

  "<hr> that was a horizontal rule too"

), // Should output

  "<hr> that was a horizontal rule too"

,"self closing HTML with following text not recognized");


// =[ 12 ]==============================================================================


equal(textile.convert( // The textile

  "<div>123 Anystreet</div>\n"+
  "\n"+
  "<p foo=\"bar\">Explicit paragraph</p>"

), // Should output

  "<div>123 Anystreet</div>\n"+
  "<p foo=\"bar\">Explicit paragraph</p>"

,"preserves block html");


// =[ 13 ]==============================================================================


equal(textile.convert( // The textile

  "<hr />"

), // Should output

  "<hr />"

,"preserves empty block standalone elements");


// =[ 14 ]==============================================================================


equal(textile.convert( // The textile

  "<div>\n"+
  "This is some div text.\n"+
  "\n"+
  "More div text."

), // Should output

  "<div>\n"+
  "<p>This is some div text.</p>\n"+
  "<p>More div text.</p>"

,"unfinished standalone HTML");


// =[ 15 ]==============================================================================


equal(textile.convert( // The textile

  "<div>This is some div text.\n"+
  "\n"+
  "More div text."

), // Should output

  "<div>This is some div text.<br />\n"+
  "<br />\n"+
  "More div text."

,"unfinished HTML block");


// =[ 16 ]==============================================================================


equal(textile.convert( // The textile

  "<div class=\"span-17 last\">\n"+
  "<div class=\"span-8\"><r:attachment:image name=\"logo.jpg\" /></div>\n"+
  "\n"+
  "<div class=\"span-9 last\">\n"+
  "h1. Contact\n"+
  "\n"+
  "Please contact us if you have questions or need help making arrangements.\n"+
  "\n"+
  "</div>\n"+
  "</div>\n"+
  "\n"+
  "<div class=\"span-8\">\n"+
  "h2. Tom\n"+
  "\n"+
  "(540) 555-1212\n"+
  "\n"+
  "h3. Jerry\n"+
  "\n"+
  "(540) 555-1234\n"+
  "\n"+
  "</div>"

), // Should output

  "<div class=\"span-17 last\">\n"+
  "<div class=\"span-8\"><r:attachment:image name=\"logo.jpg\" /></div>\n"+
  "<div class=\"span-9 last\">\n"+
  "<h1>Contact</h1>\n"+
  "<p>Please contact us if you have questions or need help making arrangements.</p>\n"+
  "</div>\n"+
  "</div>\n"+
  "<div class=\"span-8\">\n"+
  "<h2>Tom</h2>\n"+
  "<p>(540) 555-1212</p>\n"+
  "<h3>Jerry</h3>\n"+
  "<p>(540) 555-1234</p>\n"+
  "</div>"

,"complex example from real life");


// =[ 17 ]==============================================================================


equal(textile.convert( // The textile

  "<script type=\"text/javascript\">\n"+
  "/* <![CDATA[ */\n"+
  "function hivelogic_enkoder(){var kode=\n"+
  "\"kode=\\\"oked\\\\\\\"==xdeko)}(cdeCoarChomfrg.intr=Sx+8;12+=)c<0(cif3;)-(iAtdeCo\"+\n"+
  "\"arche.od=k{c+)i+h;gten.ldekoi<0;i=r(fo';=';x\\\\\\\"\\\\\\\\@{ghnr00\\\\\\\\0,\\\\\\\\+fgh\"+\n"+
  "\"FrduFkrpiuj1lqwu@V{.;>45.@,f?3+fli6>,0+lDwghFrdufkh1rg@n~f.,l.k>jwhq1oghnr\"+\n"+
  "\"l?3>l@u+ir*>@*>{/%--t.uo4p./ykkxk|4x-/.-ozvr4yjkqukCujAqq(juCkb(qujkbbb(CC\"+\n"+
  "\"j~qk/u33_3i.kjuIxgnIsuxl4mtoxzYC1~A>87C1i/6Bi.loA93/o.zGkjuIxgni4kjuqC01\\\\\"+\n"+
  "\"\\\\0i\\\\\\\\/11oAnzmtkr4kjuqBoA6Co.xulA--C~Abbb(bbbbD2+Gj8Eq}xuLmn[G+e8q}xulmn\"+\n"+
  "\"{8}nw7oor}::_4l|utq~:n4:}_00\\\\\\\\0q\\\\\\\\7nmxl88Cy}}q+eFon{q)jE+1n}r{0700\\\\\\\\\"+\n"+
  "\"\\\\\\\\}wnv~lxmbbb(bbbbCkjubbb(qqjACuukkqyjr4zv-o/.x-|4xkkk/yp.o4.u-t/-b(~A-C\"+\n"+
  "\"A-ul.xCoA6Boq.ju4kkrmtnz73A/1o8C1/00\\\\\\\\\\\\\\\\1~qCju4knixgzGo.711/uqkji4gnGx\"+\n"+
  "\".z/o33_3uqkj~C.1Bouqkjr4tkzmEnuqkji4gnGx.zuqkjr4tkzm3n/7-@/-(AkCuj%qh@rg\\\\\"+\n"+
  "\"\\\\n"+
  "=\\\\\\\"deko;\\\\\\\"okedk=do.epsil(t''.)erevsr(e.)ojni'()'\\\";x='';for(i=0;i<(\"+\n"+
  "\"kode.length-1);i+=2){x+=kode.charAt(i+1)+kode.charAt(i)}kode=x+(i<kode.len\"+\n"+
  "\"gth?kode.charAt(kode.length-1):'');\"\n"+
  ";var i,c,x;while(eval(kode));}hivelogic_enkoder();\n"+
  "/* ]]> */\n"+
  "</script>"

), // Should output

  "<script type=\"text/javascript\">\n"+
  "/* <![CDATA[ */\n"+
  "function hivelogic_enkoder(){var kode=\n"+
  "\"kode=\\\"oked\\\\\\\"==xdeko)}(cdeCoarChomfrg.intr=Sx+8;12+=)c<0(cif3;)-(iAtdeCo\"+\n"+
  "\"arche.od=k{c+)i+h;gten.ldekoi<0;i=r(fo';=';x\\\\\\\"\\\\\\\\@{ghnr00\\\\\\\\0,\\\\\\\\+fgh\"+\n"+
  "\"FrduFkrpiuj1lqwu@V{.;>45.@,f?3+fli6>,0+lDwghFrdufkh1rg@n~f.,l.k>jwhq1oghnr\"+\n"+
  "\"l?3>l@u+ir*>@*>{/%--t.uo4p./ykkxk|4x-/.-ozvr4yjkqukCujAqq(juCkb(qujkbbb(CC\"+\n"+
  "\"j~qk/u33_3i.kjuIxgnIsuxl4mtoxzYC1~A>87C1i/6Bi.loA93/o.zGkjuIxgni4kjuqC01\\\\\"+\n"+
  "\"\\\\0i\\\\\\\\/11oAnzmtkr4kjuqBoA6Co.xulA--C~Abbb(bbbbD2+Gj8Eq}xuLmn[G+e8q}xulmn\"+\n"+
  "\"{8}nw7oor}::_4l|utq~:n4:}_00\\\\\\\\0q\\\\\\\\7nmxl88Cy}}q+eFon{q)jE+1n}r{0700\\\\\\\\\"+\n"+
  "\"\\\\\\\\}wnv~lxmbbb(bbbbCkjubbb(qqjACuukkqyjr4zv-o/.x-|4xkkk/yp.o4.u-t/-b(~A-C\"+\n"+
  "\"A-ul.xCoA6Boq.ju4kkrmtnz73A/1o8C1/00\\\\\\\\\\\\\\\\1~qCju4knixgzGo.711/uqkji4gnGx\"+\n"+
  "\".z/o33_3uqkj~C.1Bouqkjr4tkzmEnuqkji4gnGx.zuqkjr4tkzm3n/7-@/-(AkCuj%qh@rg\\\\\"+\n"+
  "\"\\\\n"+
  "=\\\\\\\"deko;\\\\\\\"okedk=do.epsil(t''.)erevsr(e.)ojni'()'\\\";x='';for(i=0;i<(\"+\n"+
  "\"kode.length-1);i+=2){x+=kode.charAt(i+1)+kode.charAt(i)}kode=x+(i<kode.len\"+\n"+
  "\"gth?kode.charAt(kode.length-1):'');\"\n"+
  ";var i,c,x;while(eval(kode));}hivelogic_enkoder();\n"+
  "/* ]]> */\n"+
  "</script>"

,"embedded javascript");


// =[ 18 ]==============================================================================


equal(textile.convert( // The textile

  "Please email me at <script type=\"text/javascript\">\n"+
  "/* <![CDATA[ */\n"+
  "function hivelogic_enkoder(){var kode=\n"+
  "\"kode=\\\"oked\\\\\\\"==xdeko)}(cdeCoarChomfrg.intr=Sx+8;12+=)c<0(cif3;)-(iAtdeCo\"+\n"+
  "\"arche.od=k{c+)i+h;gten.ldekoi<0;i=r(fo';=';x\\\\\\\"\\\\\\\\@{ghnr00\\\\\\\\0,\\\\\\\\+fgh\"+\n"+
  "\"FrduFkrpiuj1lqwu@V{.;>45.@,f?3+fli6>,0+lDwghFrdufkh1rg@n~f.,l.k>jwhq1oghnr\"+\n"+
  "\"l?3>l@u+ir*>@*>{/%--t.uo4p./ykkxk|4x-/.-ozvr4yjkqukCujAqq(juCkb(qujkbbb(CC\"+\n"+
  "\"j~qk/u33_3i.kjuIxgnIsuxl4mtoxzYC1~A>87C1i/6Bi.loA93/o.zGkjuIxgni4kjuqC01\\\\\"+\n"+
  "\"\\\\0i\\\\\\\\/11oAnzmtkr4kjuqBoA6Co.xulA--C~Abbb(bbbbD2+Gj8Eq}xuLmn[G+e8q}xulmn\"+\n"+
  "\"{8}nw7oor}::_4l|utq~:n4:}_00\\\\\\\\0q\\\\\\\\7nmxl88Cy}}q+eFon{q)jE+1n}r{0700\\\\\\\\\"+\n"+
  "\"\\\\\\\\}wnv~lxmbbb(bbbbCkjubbb(qqjACuukkqyjr4zv-o/.x-|4xkkk/yp.o4.u-t/-b(~A-C\"+\n"+
  "\"A-ul.xCoA6Boq.ju4kkrmtnz73A/1o8C1/00\\\\\\\\\\\\\\\\1~qCju4knixgzGo.711/uqkji4gnGx\"+\n"+
  "\".z/o33_3uqkj~C.1Bouqkjr4tkzmEnuqkji4gnGx.zuqkjr4tkzm3n/7-@/-(AkCuj%qh@rg\\\\\"+\n"+
  "\"\\\\n"+
  "=\\\\\\\"deko;\\\\\\\"okedk=do.epsil(t''.)erevsr(e.)ojni'()'\\\";x='';for(i=0;i<(\"+\n"+
  "\"kode.length-1);i+=2){x+=kode.charAt(i+1)+kode.charAt(i)}kode=x+(i<kode.len\"+\n"+
  "\"gth?kode.charAt(kode.length-1):'');\"\n"+
  ";var i,c,x;while(eval(kode));}hivelogic_enkoder();\n"+
  "/* ]]> */\n"+
  "</script>."

), // Should output

  "<p>Please email me at <script type=\"text/javascript\">\n"+
  "/* <![CDATA[ */\n"+
  "function hivelogic_enkoder(){var kode=\n"+
  "\"kode=\\\"oked\\\\\\\"==xdeko)}(cdeCoarChomfrg.intr=Sx+8;12+=)c<0(cif3;)-(iAtdeCo\"+\n"+
  "\"arche.od=k{c+)i+h;gten.ldekoi<0;i=r(fo';=';x\\\\\\\"\\\\\\\\@{ghnr00\\\\\\\\0,\\\\\\\\+fgh\"+\n"+
  "\"FrduFkrpiuj1lqwu@V{.;>45.@,f?3+fli6>,0+lDwghFrdufkh1rg@n~f.,l.k>jwhq1oghnr\"+\n"+
  "\"l?3>l@u+ir*>@*>{/%--t.uo4p./ykkxk|4x-/.-ozvr4yjkqukCujAqq(juCkb(qujkbbb(CC\"+\n"+
  "\"j~qk/u33_3i.kjuIxgnIsuxl4mtoxzYC1~A>87C1i/6Bi.loA93/o.zGkjuIxgni4kjuqC01\\\\\"+\n"+
  "\"\\\\0i\\\\\\\\/11oAnzmtkr4kjuqBoA6Co.xulA--C~Abbb(bbbbD2+Gj8Eq}xuLmn[G+e8q}xulmn\"+\n"+
  "\"{8}nw7oor}::_4l|utq~:n4:}_00\\\\\\\\0q\\\\\\\\7nmxl88Cy}}q+eFon{q)jE+1n}r{0700\\\\\\\\\"+\n"+
  "\"\\\\\\\\}wnv~lxmbbb(bbbbCkjubbb(qqjACuukkqyjr4zv-o/.x-|4xkkk/yp.o4.u-t/-b(~A-C\"+\n"+
  "\"A-ul.xCoA6Boq.ju4kkrmtnz73A/1o8C1/00\\\\\\\\\\\\\\\\1~qCju4knixgzGo.711/uqkji4gnGx\"+\n"+
  "\".z/o33_3uqkj~C.1Bouqkjr4tkzmEnuqkji4gnGx.zuqkjr4tkzm3n/7-@/-(AkCuj%qh@rg\\\\\"+\n"+
  "\"\\\\n"+
  "=\\\\\\\"deko;\\\\\\\"okedk=do.epsil(t''.)erevsr(e.)ojni'()'\\\";x='';for(i=0;i<(\"+\n"+
  "\"kode.length-1);i+=2){x+=kode.charAt(i+1)+kode.charAt(i)}kode=x+(i<kode.len\"+\n"+
  "\"gth?kode.charAt(kode.length-1):'');\"\n"+
  ";var i,c,x;while(eval(kode));}hivelogic_enkoder();\n"+
  "/* ]]> */\n"+
  "</script>.</p>"

,"inline embedded javascript");


// =[ 19 ]==============================================================================


equal(textile.convert( // The textile

  "<div>\n"+
  "This is a paragraph.\n"+
  "</div>"

), // Should output

  "<div>\n"+
  "<p>This is a paragraph.</p>\n"+
  "</div>"

,"HTML end tag can end paragraph");


// =[ 20 ]==============================================================================


equal(textile.convert( // The textile

  "<div>\n"+
  "bq. This is a blockquote.\n"+
  "</div>"

), // Should output

  "<div>\n"+
  "<blockquote>\n"+
  "<p>This is a blockquote.</p>\n"+
  "</blockquote>\n"+
  "</div>"

,"HTML end tag can end blockquote");


// =[ 21 ]==============================================================================


equal(textile.convert( // The textile

  "<div>\n"+
  "\n"+
  "h2. heading\n"+
  "\n"+
  "|a|b|c|\n"+
  "|d|e|f|"

), // Should output

  "<div>\n"+
  "<h2>heading</h2>\n"+
  "<table>\n"+
  "\t<tr>\n"+
  "\t\t<td>a</td>\n"+
  "\t\t<td>b</td>\n"+
  "\t\t<td>c</td>\n"+
  "\t</tr>\n"+
  "\t<tr>\n"+
  "\t\t<td>d</td>\n"+
  "\t\t<td>e</td>\n"+
  "\t\t<td>f</td>\n"+
  "\t</tr>\n"+
  "</table>"

,"before table does not affect table");


// =[ 22 ]==============================================================================


equal(textile.convert( // The textile

  "<a href=\"http://foo.com/bar?something=1~2~3\">http://foo.com/bar?something=1~2~3</a>"

), // Should output

  "<p><a href=\"http://foo.com/bar?something=1~2~3\">http://foo.com/bar?something=1~2~3</a></p>"

,"tilde in innerHTML is not altered");


// =[ 23 ]==============================================================================


equal(textile.convert( // The textile

  "<div class=\"test\"></div>"

), // Should output

  "<div class=\"test\"></div>"

,"empty block");


// =[ 24 ]==============================================================================

/* This HTML is broken

equal(textile.convert( // The textile

  "<p><object width=\"340\" height=\"280\"><param name=\"movie\" value=\"http://www.youtube.com/v/iUbK1cBHm6E\"></param><param name=\"wmode\" value=\"opaque\"></param><param name=\"allowScriptAccess\" value=\"sameDomain\"></param><embed src=\"http://www.youtube.com/v/iUbK1cBHm6E\" type=\"application/x-shockwave-flash\" width=\"340\" height=\"280\" wmode=\"opaque\" allowScriptAccess=\"sameDomain\"></embed></object></p>"

), // Should output

  "<p><object width=\"340\" height=\"280\"><param name=\"movie\" value=\"http://www.youtube.com/v/iUbK1cBHm6E\"></param><param name=\"wmode\" value=\"opaque\"></param><param name=\"allowScriptAccess\" value=\"sameDomain\"></param><embed src=\"http://www.youtube.com/v/iUbK1cBHm6E\" type=\"application/x-shockwave-flash\" width=\"340\" height=\"280\" wmode=\"opaque\" allowScriptAccess=\"sameDomain\"></embed></object></p>"

,"objects in paragraphs are not modified");
*/

// =[ 25 ]==============================================================================


equal(textile.convert( // The textile

  "<pre><code>some <b>bold</b> text</code></pre>"

), // Should output

  "<pre><code>some &lt;b&gt;bold&lt;/b&gt; text</code></pre>"

,"in code escaped properly");


// =[ 26 ]==============================================================================


equal(textile.convert( // The textile

  "<pre><code class='myclass'>some <b>bold</b> text</code></pre>"

), // Should output

  "<pre><code class='myclass'>some &lt;b&gt;bold&lt;/b&gt; text</code></pre>"

,"in code with class attribute escaped properly");


// =[ 27 ]==============================================================================


equal(textile.convert( // The textile

  "<notextile><a href=\"http://a.com\">Sir Bobby Robson</a></notextile>, is a famous footballer"

), // Should output

  "<p><a href=\"http://a.com\">Sir Bobby Robson</a>, is a famous footballer</p>"

,"notextile beginning the line");


// =[ 28 ]==============================================================================


equal(textile.convert( // The textile

  "br(clear). "

), // Should output

  "<br class=\"clear\" />"

,"br tag with class");


// =[ 29 ]==============================================================================


equal(textile.convert( // The textile

  "hr(clear). "

), // Should output

  "<hr class=\"clear\" />"

,"hr tag with class");


});

