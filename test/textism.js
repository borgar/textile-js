// textism.yml
import test from 'ava';
import textile from '../src';

test( 'header one', function ( t ) {
  let tx = "h1. Header 1";
  t.is( textile.convert( tx ),
    "<h1>Header 1</h1>", tx );
});


test( 'header two', function ( t ) {
  let tx = "h2. Header 2";
  t.is( textile.convert( tx ),
    "<h2>Header 2</h2>", tx );
});


test( 'header three', function ( t ) {
  let tx = "h3. Header 3";
  t.is( textile.convert( tx ),
    "<h3>Header 3</h3>", tx );
});


test( 'header four', function ( t ) {
  let tx = "h4. Header 4";
  t.is( textile.convert( tx ),
    "<h4>Header 4</h4>", tx );
});


test( 'header five', function ( t ) {
  let tx = "h5. Header 5";
  t.is( textile.convert( tx ),
    "<h5>Header 5</h5>", tx );
});


test( 'header six', function ( t ) {
  let tx = "h6. Header 6";
  t.is( textile.convert( tx ),
    "<h6>Header 6</h6>", tx );
});


test( 'blockquote', function ( t ) {
  let tx = "Any old text.\n\n\
bq. A block quotation.\n\n\
Any old text.\n\
";
  t.is( textile.convert( tx ),
    "<p>Any old text.</p>\n\
<blockquote>\n\
<p>A block quotation.</p>\n\
</blockquote>\n\
<p>Any old text.</p>", tx );
});


test( 'textism:8', function ( t ) {
  let tx = "# A first item\n\
# A second item\n\
# A third item\n\
# A fourth item";
  t.is( textile.convert( tx ),
    "<ol>\n\
\t<li>A first item</li>\n\
\t<li>A second item</li>\n\
\t<li>A third item</li>\n\
\t<li>A fourth item</li>\n\
</ol>", tx );
});


test( 'textism:9', function ( t ) {
  let tx = "* A first item\n\
* A second item\n\
* A third item\n\
* A fourth item\n\
";
  t.is( textile.convert( tx ),
    "<ul>\n\
\t<li>A first item</li>\n\
\t<li>A second item</li>\n\
\t<li>A third item</li>\n\
\t<li>A fourth item</li>\n\
</ul>", tx );
});


test( 'textism:10', function ( t ) {
  let tx = "_a phrase_";
  t.is( textile.convert( tx ),
    "<p><em>a phrase</em></p>", tx );
});


test( 'textism:11', function ( t ) {
  let tx = "__a phrase__";
  t.is( textile.convert( tx ),
    "<p><i>a phrase</i></p>", tx );
});


test( 'textism:12', function ( t ) {
  let tx = "*a phrase*";
  t.is( textile.convert( tx ),
    "<p><strong>a phrase</strong></p>", tx );
});


test( 'textism:13', function ( t ) {
  let tx = "**a phrase**";
  t.is( textile.convert( tx ),
    "<p><b>a phrase</b></p>", tx );
});


test( 'textism:14', function ( t ) {
  let tx = "Nabokov's ??Pnin??";
  t.is( textile.convert( tx ),
    "<p>Nabokov&#8217;s <cite>Pnin</cite></p>", tx );
});


test( 'del part of word', function ( t ) {
  let tx = "A very [-extra-]ordinary day.";
  t.is( textile.convert( tx ),
    "<p>A very <del>extra</del>ordinary day.</p>", tx );
});


test( 'del part of word that contains a hyphen', function ( t ) {
  let tx = "An [-extra-extra-]ordinary day.";
  t.is( textile.convert( tx ),
    "<p>An <del>extra-extra</del>ordinary day.</p>", tx );
});


test( 'del a phrase', function ( t ) {
  let tx = "Delete -a phrase- this way.";
  t.is( textile.convert( tx ),
    "<p>Delete <del>a phrase</del> this way.</p>", tx );
});


test( 'del a phrase that contains hyphens', function ( t ) {
  let tx = "Delete -a no-nonsense phrase- this way.";
  t.is( textile.convert( tx ),
    "<p>Delete <del>a no-nonsense phrase</del> this way.</p>", tx );
});


test( 'textism:19', function ( t ) {
  let tx = "+a phrase+";
  t.is( textile.convert( tx ),
    "<p><ins>a phrase</ins></p>", tx );
});


test( 'textism:20', function ( t ) {
  let tx = "^a phrase^";
  t.is( textile.convert( tx ),
    "<p><sup>a phrase</sup></p>", tx );
});


test( 'textism:21', function ( t ) {
  let tx = "~a phrase~";
  t.is( textile.convert( tx ),
    "<p><sub>a phrase</sub></p>", tx );
});


test( 'textism:22', function ( t ) {
  let tx = "%(myclass)SPAN%";
  t.is( textile.convert( tx ),
    "<p><span class=\"myclass\"><span class=\"caps\">SPAN</span></span></p>", tx );
});


test( 'textism:23', function ( t ) {
  let tx = "%{color:red}red%";
  t.is( textile.convert( tx ),
    "<p><span style=\"color:red\">red</span></p>", tx );
});


test( 'textism:24', function ( t ) {
  let tx = "%[fr]rouge%";
  t.is( textile.convert( tx ),
    "<p><span lang=\"fr\">rouge</span></p>", tx );
});


test( 'textism:25', function ( t ) {
  let tx = "_(big)red_";
  t.is( textile.convert( tx ),
    "<p><em class=\"big\">red</em></p>", tx );
});


test( 'textism:26', function ( t ) {
  let tx = "p=. A centered paragraph.";
  t.is( textile.convert( tx ),
    "<p style=\"text-align:center\">A centered paragraph.</p>", tx );
});


test( 'textism:27', function ( t ) {
  let tx = "p(bob). A paragraph";
  t.is( textile.convert( tx ),
    "<p class=\"bob\">A paragraph</p>", tx );
});


test( 'textism:28', function ( t ) {
  let tx = "p{color:#ddd}. A paragraph";
  t.is( textile.convert( tx ),
    "<p style=\"color:#ddd\">A paragraph</p>", tx );
});


test( 'textism:29', function ( t ) {
  let tx = "p[fr]. A paragraph";
  t.is( textile.convert( tx ),
    "<p lang=\"fr\">A paragraph</p>", tx );
});


test( 'textism:30', function ( t ) {
  let tx = "h2()>. right-aligned header2, indented 1em both side";
  t.is( textile.convert( tx ),
    "<h2 style=\"padding-left:1em;padding-right:1em;text-align:right\">right-aligned header2, indented 1em both side</h2>", tx );
});


test( 'textism:31', function ( t ) {
  let tx = "h3=. centered header";
  t.is( textile.convert( tx ),
    "<h3 style=\"text-align:center\">centered header</h3>", tx );
});


test( 'textism:32', function ( t ) {
  let tx = "!>/image.gif! right-aligned image";
  t.is( textile.convert( tx ),
    "<p><img align=\"right\" src=\"/image.gif\" alt=\"\" /> right-aligned image</p>", tx );
});


test( 'textism:33', function ( t ) {
  let tx = "p[no]{color:red}. A Norse of a different colour.";
  t.is( textile.convert( tx ),
    "<p style=\"color:red\" lang=\"no\">A Norse of a different colour.</p>", tx );
});


test( 'textism:34', function ( t ) {
  let tx = "|This|is|a|simple|table|\n\
|This|is|a|simple|row|";
  t.is( textile.convert( tx ),
    "<table>\n\
\t<tr>\n\
\t\t<td>This</td>\n\
\t\t<td>is</td>\n\
\t\t<td>a</td>\n\
\t\t<td>simple</td>\n\
\t\t<td>table</td>\n\
\t</tr>\n\
\t<tr>\n\
\t\t<td>This</td>\n\
\t\t<td>is</td>\n\
\t\t<td>a</td>\n\
\t\t<td>simple</td>\n\
\t\t<td>row</td>\n\
\t</tr>\n\
</table>", tx );
});


test( 'textism:35', function ( t ) {
  let tx = "table{border:1px solid black}.\n\
|This|is|a|row|\n\
|This|is|a|row|";
  t.is( textile.convert( tx ),
    "<table style=\"border:1px solid black\">\n\
\t<tr>\n\
\t\t<td>This</td>\n\
\t\t<td>is</td>\n\
\t\t<td>a</td>\n\
\t\t<td>row</td>\n\
\t</tr>\n\
\t<tr>\n\
\t\t<td>This</td>\n\
\t\t<td>is</td>\n\
\t\t<td>a</td>\n\
\t\t<td>row</td>\n\
\t</tr>\n\
</table>", tx );
});


test( 'textism:36', function ( t ) {
  let tx = "{background:#ddd}. |This|is|a|row|";
  t.is( textile.convert( tx ),
    "<table>\n\
\t<tr style=\"background:#ddd\">\n\
\t\t<td>This</td>\n\
\t\t<td>is</td>\n\
\t\t<td>a</td>\n\
\t\t<td>row</td>\n\
\t</tr>\n\
</table>", tx );
});


test( 'textism:37', function ( t ) {
  let tx = "|{background:#ddd}. Cell with gray background|\n\
|\\2. Cell spanning 2 columns|\n\
|/3. Cell spanning 3 rows|\n\
|>. Right-aligned cell|";
  t.is( textile.convert( tx ),
    "<table>\n\
\t<tr>\n\
\t\t<td style=\"background:#ddd\">Cell with gray background</td>\n\
\t</tr>\n\
\t<tr>\n\
\t\t<td colspan=\"2\">Cell spanning 2 columns</td>\n\
\t</tr>\n\
\t<tr>\n\
\t\t<td rowspan=\"3\">Cell spanning 3 rows</td>\n\
\t</tr>\n\
\t<tr>\n\
\t\t<td style=\"text-align:right\">Right-aligned cell</td>\n\
\t</tr>\n\
</table>", tx );
});


test( 'basics', function ( t ) {
  let tx = "h2{color:green}. This is a title\n\n\
h3. This is a subhead\n\n\
p{color:red}. This is some text of dubious character. Isn't the use of \"quotes\" just lazy writing -- and theft of 'intellectual property' besides? I think the time has come to see a block quote.\n\n\
bq[fr]. This is a block quote. I'll admit it's not the most exciting block quote ever devised.\n\n\
Simple list:\n\n\
# one\n\
# two\n\
# three\n\n\
Multi-level list:\n\n\
# one\n\
## aye\n\
## bee\n\
## see\n\
# two\n\
## x\n\
## y\n\
# three\n\
";
  t.is( textile.convert( tx ),
    "<h2 style=\"color:green\">This is a title</h2>\n\
<h3>This is a subhead</h3>\n\
<p style=\"color:red\">This is some text of dubious character. Isn&#8217;t the use of &#8220;quotes&#8221; just lazy writing &#8212; and theft of &#8216;intellectual property&#8217; besides? I think the time has come to see a block quote.</p>\n\
<blockquote lang=\"fr\">\n\
<p lang=\"fr\">This is a block quote. I&#8217;ll admit it&#8217;s not the most exciting block quote ever devised.</p>\n\
</blockquote>\n\
<p>Simple list:</p>\n\
<ol>\n\
\t<li>one</li>\n\
\t<li>two</li>\n\
\t<li>three</li>\n\
</ol>\n\
<p>Multi-level list:</p>\n\
<ol>\n\
\t<li>one\n\
\t<ol>\n\
\t\t<li>aye</li>\n\
\t\t<li>bee</li>\n\
\t\t<li>see</li>\n\
\t</ol></li>\n\
\t<li>two\n\
\t<ol>\n\
\t\t<li>x</li>\n\
\t\t<li>y</li>\n\
\t</ol></li>\n\
\t<li>three</li>\n\
</ol>", tx );
});

