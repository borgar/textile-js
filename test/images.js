// images.yml
import test from 'ava';
import textile from '../src';

test( 'images:1', function ( t ) {
  let tx = "This is an !image.jpg!";
  t.is( textile.convert( tx ),
    "<p>This is an <img src=\"image.jpg\" alt=\"\" /></p>", tx );
});


test( 'images:2', function ( t ) {
  let tx = "This is an !image.jpg(with alt text)!";
  t.is( textile.convert( tx ),
    "<p>This is an <img src=\"image.jpg\" title=\"with alt text\" alt=\"with alt text\" /></p>", tx );
});


test( 'images:3', function ( t ) {
  let tx = "This is an !http://example.com/i/image.jpg!";
  t.is( textile.convert( tx ),
    "<p>This is an <img src=\"http://example.com/i/image.jpg\" alt=\"\" /></p>", tx );
});


test( 'images:4', function ( t ) {
  let tx = "This is an !http://example.com/i/image.jpg#a1!";
  t.is( textile.convert( tx ),
    "<p>This is an <img src=\"http://example.com/i/image.jpg#a1\" alt=\"\" /></p>", tx );
});


test( 'images:5', function ( t ) {
  let tx = "This is an !image.jpg!.";
  t.is( textile.convert( tx ),
    "<p>This is an <img src=\"image.jpg\" alt=\"\" />.</p>", tx );
});


test( 'images:6', function ( t ) {
  let tx = "This is an !image.jpg(with alt text)!.";
  t.is( textile.convert( tx ),
    "<p>This is an <img src=\"image.jpg\" title=\"with alt text\" alt=\"with alt text\" />.</p>", tx );
});


test( 'images:7', function ( t ) {
  let tx = "This is an !http://example.com/i/image.jpg!.";
  t.is( textile.convert( tx ),
    "<p>This is an <img src=\"http://example.com/i/image.jpg\" alt=\"\" />.</p>", tx );
});


test( 'images:8', function ( t ) {
  let tx = "This is an !http://example.com/i/image.jpg#a1!.";
  t.is( textile.convert( tx ),
    "<p>This is an <img src=\"http://example.com/i/image.jpg#a1\" alt=\"\" />.</p>", tx );
});


test( 'images:9', function ( t ) {
  let tx = "This is not an image!!!";
  t.is( textile.convert( tx ),
    "<p>This is not an image!!!</p>", tx );
});


test( 'images:10', function ( t ) {
  let tx = "This is not an! image!";
  t.is( textile.convert( tx ),
    "<p>This is not an! image!</p>", tx );
});


test( 'images:11', function ( t ) {
  let tx = "This is an !http://example.com/i/image.jpg!:#1";
  t.is( textile.convert( tx ),
    "<p>This is an <a href=\"#1\"><img src=\"http://example.com/i/image.jpg\" alt=\"\" /></a></p>", tx );
});


test( 'images:12', function ( t ) {
  let tx = "This is an !http://example.com/i/image.jpg!:#a";
  t.is( textile.convert( tx ),
    "<p>This is an <a href=\"#a\"><img src=\"http://example.com/i/image.jpg\" alt=\"\" /></a></p>", tx );
});


test( 'images:13', function ( t ) {
  let tx = "This is an !http://example.com/i/image.jpg!:#a1";
  t.is( textile.convert( tx ),
    "<p>This is an <a href=\"#a1\"><img src=\"http://example.com/i/image.jpg\" alt=\"\" /></a></p>", tx );
});


test( 'images:14', function ( t ) {
  let tx = "This is an !http://example.com/i/image.jpg!:#a10";
  t.is( textile.convert( tx ),
    "<p>This is an <a href=\"#a10\"><img src=\"http://example.com/i/image.jpg\" alt=\"\" /></a></p>", tx );
});


test( 'images:15', function ( t ) {
  let tx = "This is an !http://example.com/i/image.jpg!:index.html";
  t.is( textile.convert( tx ),
    "<p>This is an <a href=\"index.html\"><img src=\"http://example.com/i/image.jpg\" alt=\"\" /></a></p>", tx );
});


test( 'images:16', function ( t ) {
  let tx = "This is an !http://example.com/i/image.jpg!:index.html#1";
  t.is( textile.convert( tx ),
    "<p>This is an <a href=\"index.html#1\"><img src=\"http://example.com/i/image.jpg\" alt=\"\" /></a></p>", tx );
});


test( 'images:17', function ( t ) {
  let tx = "This is an !http://example.com/i/image.jpg!:index.html#a1";
  t.is( textile.convert( tx ),
    "<p>This is an <a href=\"index.html#a1\"><img src=\"http://example.com/i/image.jpg\" alt=\"\" /></a></p>", tx );
});


test( 'images:18', function ( t ) {
  let tx = "This is an !http://example.com/i/image.jpg!:index.html#a10";
  t.is( textile.convert( tx ),
    "<p>This is an <a href=\"index.html#a10\"><img src=\"http://example.com/i/image.jpg\" alt=\"\" /></a></p>", tx );
});


test( 'images:19', function ( t ) {
  let tx = "This is an !http://example.com/i/image.jpg!:index.html?foo=bar";
  t.is( textile.convert( tx ),
    "<p>This is an <a href=\"index.html?foo=bar\"><img src=\"http://example.com/i/image.jpg\" alt=\"\" /></a></p>", tx );
});


test( 'images:20', function ( t ) {
  let tx = "This is an !http://example.com/i/image.jpg!:index.html?foo=bar#1";
  t.is( textile.convert( tx ),
    "<p>This is an <a href=\"index.html?foo=bar#1\"><img src=\"http://example.com/i/image.jpg\" alt=\"\" /></a></p>", tx );
});


test( 'images:21', function ( t ) {
  let tx = "This is an !http://example.com/i/image.jpg!:index.html?foo=bar#a";
  t.is( textile.convert( tx ),
    "<p>This is an <a href=\"index.html?foo=bar#a\"><img src=\"http://example.com/i/image.jpg\" alt=\"\" /></a></p>", tx );
});


test( 'images:22', function ( t ) {
  let tx = "This is an !http://example.com/i/image.jpg!:index.html?foo=bar#a1";
  t.is( textile.convert( tx ),
    "<p>This is an <a href=\"index.html?foo=bar#a1\"><img src=\"http://example.com/i/image.jpg\" alt=\"\" /></a></p>", tx );
});


test( 'images:23', function ( t ) {
  let tx = "This is an !http://example.com/i/image.jpg!:index.html?foo=bar#a10";
  t.is( textile.convert( tx ),
    "<p>This is an <a href=\"index.html?foo=bar#a10\"><img src=\"http://example.com/i/image.jpg\" alt=\"\" /></a></p>", tx );
});


test( 'images:24', function ( t ) {
  let tx = "This is an !http://example.com/i/image.jpg!:http://example.com/";
  t.is( textile.convert( tx ),
    "<p>This is an <a href=\"http://example.com/\"><img src=\"http://example.com/i/image.jpg\" alt=\"\" /></a></p>", tx );
});


test( 'images:25', function ( t ) {
  let tx = "This is an !http://example.com/i/image.jpg!:http://example.com/#1";
  t.is( textile.convert( tx ),
    "<p>This is an <a href=\"http://example.com/#1\"><img src=\"http://example.com/i/image.jpg\" alt=\"\" /></a></p>", tx );
});


test( 'images:26', function ( t ) {
  let tx = "This is an !http://example.com/i/image.jpg!:http://example.com/#a";
  t.is( textile.convert( tx ),
    "<p>This is an <a href=\"http://example.com/#a\"><img src=\"http://example.com/i/image.jpg\" alt=\"\" /></a></p>", tx );
});


test( 'images:27', function ( t ) {
  let tx = "This is an !http://example.com/i/image.jpg!:http://example.com/#a1";
  t.is( textile.convert( tx ),
    "<p>This is an <a href=\"http://example.com/#a1\"><img src=\"http://example.com/i/image.jpg\" alt=\"\" /></a></p>", tx );
});


test( 'images:28', function ( t ) {
  let tx = "This is an !http://example.com/i/image.jpg!:http://example.com/#a10";
  t.is( textile.convert( tx ),
    "<p>This is an <a href=\"http://example.com/#a10\"><img src=\"http://example.com/i/image.jpg\" alt=\"\" /></a></p>", tx );
});


test( 'images:29', function ( t ) {
  let tx = "This is an !http://example.com/i/image.jpg!:http://example.com/index.html";
  t.is( textile.convert( tx ),
    "<p>This is an <a href=\"http://example.com/index.html\"><img src=\"http://example.com/i/image.jpg\" alt=\"\" /></a></p>", tx );
});


test( 'images:30', function ( t ) {
  let tx = "This is an !http://example.com/i/image.jpg!:http://example.com/index.html#1";
  t.is( textile.convert( tx ),
    "<p>This is an <a href=\"http://example.com/index.html#1\"><img src=\"http://example.com/i/image.jpg\" alt=\"\" /></a></p>", tx );
});


test( 'images:31', function ( t ) {
  let tx = "This is an !http://example.com/i/image.jpg!:http://example.com/index.html#a";
  t.is( textile.convert( tx ),
    "<p>This is an <a href=\"http://example.com/index.html#a\"><img src=\"http://example.com/i/image.jpg\" alt=\"\" /></a></p>", tx );
});


test( 'images:32', function ( t ) {
  let tx = "This is an !http://example.com/i/image.jpg!:http://example.com/index.html#a1";
  t.is( textile.convert( tx ),
    "<p>This is an <a href=\"http://example.com/index.html#a1\"><img src=\"http://example.com/i/image.jpg\" alt=\"\" /></a></p>", tx );
});


test( 'images:33', function ( t ) {
  let tx = "This is an !http://example.com/i/image.jpg!:http://example.com/index.html#a10";
  t.is( textile.convert( tx ),
    "<p>This is an <a href=\"http://example.com/index.html#a10\"><img src=\"http://example.com/i/image.jpg\" alt=\"\" /></a></p>", tx );
});


test( 'images:34', function ( t ) {
  let tx = "This is an !http://example.com/i/image.jpg!:http://example.com/index.html?foo=bar";
  t.is( textile.convert( tx ),
    "<p>This is an <a href=\"http://example.com/index.html?foo=bar\"><img src=\"http://example.com/i/image.jpg\" alt=\"\" /></a></p>", tx );
});


test( 'images:35', function ( t ) {
  let tx = "This is an !http://example.com/i/image.jpg!:http://example.com/index.html?foo=bar#1";
  t.is( textile.convert( tx ),
    "<p>This is an <a href=\"http://example.com/index.html?foo=bar#1\"><img src=\"http://example.com/i/image.jpg\" alt=\"\" /></a></p>", tx );
});


test( 'images:36', function ( t ) {
  let tx = "This is an !http://example.com/i/image.jpg!:http://example.com/index.html?foo=bar#a";
  t.is( textile.convert( tx ),
    "<p>This is an <a href=\"http://example.com/index.html?foo=bar#a\"><img src=\"http://example.com/i/image.jpg\" alt=\"\" /></a></p>", tx );
});


test( 'images:37', function ( t ) {
  let tx = "This is an !http://example.com/i/image.jpg!:http://example.com/index.html?foo=bar#a1";
  t.is( textile.convert( tx ),
    "<p>This is an <a href=\"http://example.com/index.html?foo=bar#a1\"><img src=\"http://example.com/i/image.jpg\" alt=\"\" /></a></p>", tx );
});


test( 'images:38', function ( t ) {
  let tx = "This is an !http://example.com/i/image.jpg!:http://example.com/index.html?foo=bar#a10";
  t.is( textile.convert( tx ),
    "<p>This is an <a href=\"http://example.com/index.html?foo=bar#a10\"><img src=\"http://example.com/i/image.jpg\" alt=\"\" /></a></p>", tx );
});


test( 'images:39', function ( t ) {
  let tx = "This is an !http://example.com/i/image.jpg!:http://example.com/index.html?foo=bar&a=b";
  t.is( textile.convert( tx ),
    "<p>This is an <a href=\"http://example.com/index.html?foo=bar&amp;a=b\"><img src=\"http://example.com/i/image.jpg\" alt=\"\" /></a></p>", tx );
});


test( 'images:40', function ( t ) {
  let tx = "This is an !http://example.com/i/image.jpg!:http://example.com/index.html?foo=bar&a=b#1";
  t.is( textile.convert( tx ),
    "<p>This is an <a href=\"http://example.com/index.html?foo=bar&amp;a=b#1\"><img src=\"http://example.com/i/image.jpg\" alt=\"\" /></a></p>", tx );
});


test( 'images:41', function ( t ) {
  let tx = "This is an !http://example.com/i/image.jpg!:http://example.com/index.html?foo=bar&a=b#a";
  t.is( textile.convert( tx ),
    "<p>This is an <a href=\"http://example.com/index.html?foo=bar&amp;a=b#a\"><img src=\"http://example.com/i/image.jpg\" alt=\"\" /></a></p>", tx );
});


test( 'images:42', function ( t ) {
  let tx = "This is an !http://example.com/i/image.jpg!:http://example.com/index.html?foo=bar&a=b#a1";
  t.is( textile.convert( tx ),
    "<p>This is an <a href=\"http://example.com/index.html?foo=bar&amp;a=b#a1\"><img src=\"http://example.com/i/image.jpg\" alt=\"\" /></a></p>", tx );
});


test( 'images:43', function ( t ) {
  let tx = "This is an !http://example.com/i/image.jpg!:http://example.com/index.html?foo=bar&a=b#a10";
  t.is( textile.convert( tx ),
    "<p>This is an <a href=\"http://example.com/index.html?foo=bar&amp;a=b#a10\"><img src=\"http://example.com/i/image.jpg\" alt=\"\" /></a></p>", tx );
});


test( 'images:44', function ( t ) {
  let tx = "This is an !http://example.com/i/image.jpg!:http://example.com/index.html?foo=bar&a=b.";
  t.is( textile.convert( tx ),
    "<p>This is an <a href=\"http://example.com/index.html?foo=bar&amp;a=b\"><img src=\"http://example.com/i/image.jpg\" alt=\"\" /></a>.</p>", tx );
});


test( 'images:45', function ( t ) {
  let tx = "This is an !http://example.com/i/image.jpg!:http://example.com/index.html?foo=bar&a=b#1.";
  t.is( textile.convert( tx ),
    "<p>This is an <a href=\"http://example.com/index.html?foo=bar&amp;a=b#1\"><img src=\"http://example.com/i/image.jpg\" alt=\"\" /></a>.</p>", tx );
});


test( 'images:46', function ( t ) {
  let tx = "This is an !http://example.com/i/image.jpg!:http://example.com/index.html?foo=bar&a=b#a.";
  t.is( textile.convert( tx ),
    "<p>This is an <a href=\"http://example.com/index.html?foo=bar&amp;a=b#a\"><img src=\"http://example.com/i/image.jpg\" alt=\"\" /></a>.</p>", tx );
});


test( 'images:47', function ( t ) {
  let tx = "This is an !http://example.com/i/image.jpg!:http://example.com/index.html?foo=bar&a=b#a1.";
  t.is( textile.convert( tx ),
    "<p>This is an <a href=\"http://example.com/index.html?foo=bar&amp;a=b#a1\"><img src=\"http://example.com/i/image.jpg\" alt=\"\" /></a>.</p>", tx );
});


test( 'images:48', function ( t ) {
  let tx = "This is an !http://example.com/i/image.jpg!:http://example.com/index.html?foo=bar&a=b#a10.";
  t.is( textile.convert( tx ),
    "<p>This is an <a href=\"http://example.com/index.html?foo=bar&amp;a=b#a10\"><img src=\"http://example.com/i/image.jpg\" alt=\"\" /></a>.</p>", tx );
});


test( 'images:49', function ( t ) {
  let tx = "This is an !http://example.com/i/image.jpg!:http://example.com/index.html?foo=bar&a=b, but this is not.";
  t.is( textile.convert( tx ),
    "<p>This is an <a href=\"http://example.com/index.html?foo=bar&amp;a=b\"><img src=\"http://example.com/i/image.jpg\" alt=\"\" /></a>, but this is not.</p>", tx );
});


test( 'images:50', function ( t ) {
  let tx = "This is an !http://example.com/i/image.jpg!:http://example.com/index.html?foo=bar&a=b#1, but this is not.";
  t.is( textile.convert( tx ),
    "<p>This is an <a href=\"http://example.com/index.html?foo=bar&amp;a=b#1\"><img src=\"http://example.com/i/image.jpg\" alt=\"\" /></a>, but this is not.</p>", tx );
});


test( 'images:51', function ( t ) {
  let tx = "This is an !http://example.com/i/image.jpg!:http://example.com/index.html?foo=bar&a=b#a, but this is not.";
  t.is( textile.convert( tx ),
    "<p>This is an <a href=\"http://example.com/index.html?foo=bar&amp;a=b#a\"><img src=\"http://example.com/i/image.jpg\" alt=\"\" /></a>, but this is not.</p>", tx );
});


test( 'images:52', function ( t ) {
  let tx = "This is an !http://example.com/i/image.jpg!:http://example.com/index.html?foo=bar&a=b#a1, but this is not.";
  t.is( textile.convert( tx ),
    "<p>This is an <a href=\"http://example.com/index.html?foo=bar&amp;a=b#a1\"><img src=\"http://example.com/i/image.jpg\" alt=\"\" /></a>, but this is not.</p>", tx );
});


test( 'images:53', function ( t ) {
  let tx = "(This is an !http://example.com/i/image.jpg!:http://example.com/index.html?foo=bar&a=b#a10)  This is not.";
  t.is( textile.convert( tx ),
    "<p>(This is an <a href=\"http://example.com/index.html?foo=bar&amp;a=b#a10\"><img src=\"http://example.com/i/image.jpg\" alt=\"\" /></a>)  This is not.</p>", tx );
});


test( 'images:54', function ( t ) {
  let tx = "(This is an !http://example.com/i/image.jpg!:http://example.com/index.html?foo=bar&a=b)  This is not.";
  t.is( textile.convert( tx ),
    "<p>(This is an <a href=\"http://example.com/index.html?foo=bar&amp;a=b\"><img src=\"http://example.com/i/image.jpg\" alt=\"\" /></a>)  This is not.</p>", tx );
});


test( 'images:55', function ( t ) {
  let tx = "(This is an !http://example.com/i/image.jpg!:http://example.com/index.html?foo=bar&a=b#1)  This is not.";
  t.is( textile.convert( tx ),
    "<p>(This is an <a href=\"http://example.com/index.html?foo=bar&amp;a=b#1\"><img src=\"http://example.com/i/image.jpg\" alt=\"\" /></a>)  This is not.</p>", tx );
});


test( 'images:56', function ( t ) {
  let tx = "(This is an !http://example.com/i/image.jpg!:http://example.com/index.html?foo=bar&a=b#a)  This is not.";
  t.is( textile.convert( tx ),
    "<p>(This is an <a href=\"http://example.com/index.html?foo=bar&amp;a=b#a\"><img src=\"http://example.com/i/image.jpg\" alt=\"\" /></a>)  This is not.</p>", tx );
});


test( 'images:57', function ( t ) {
  let tx = "(This is an !http://example.com/i/image.jpg!:http://example.com/index.html?foo=bar&a=b#a1)  This is not.";
  t.is( textile.convert( tx ),
    "<p>(This is an <a href=\"http://example.com/index.html?foo=bar&amp;a=b#a1\"><img src=\"http://example.com/i/image.jpg\" alt=\"\" /></a>)  This is not.</p>", tx );
});


test( 'images:58', function ( t ) {
  let tx = "(This is an !http://example.com/i/image.jpg!:http://example.com/index.html?foo=bar&a=b#a10)  This is not.";
  t.is( textile.convert( tx ),
    "<p>(This is an <a href=\"http://example.com/index.html?foo=bar&amp;a=b#a10\"><img src=\"http://example.com/i/image.jpg\" alt=\"\" /></a>)  This is not.</p>", tx );
});


test( 'image with relative src with dot', function ( t ) {
  let tx = "!../../image.jpg!";
  t.is( textile.convert( tx ),
    "<p><img src=\"../../image.jpg\" alt=\"\" /></p>", tx );
});


test( 'image with class', function ( t ) {
  let tx = "!(myclass)image.jpg!";
  t.is( textile.convert( tx ),
    "<p><img class=\"myclass\" src=\"image.jpg\" alt=\"\" /></p>", tx );
});


test( 'image with class and dotspace', function ( t ) {
  let tx = "!(myclass). image.jpg!";
  t.is( textile.convert( tx ),
    "<p><img class=\"myclass\" src=\"image.jpg\" alt=\"\" /></p>", tx );
});


test( 'image with class and relative src with dots', function ( t ) {
  let tx = "!(myclass)../../image.jpg!";
  t.is( textile.convert( tx ),
    "<p><img class=\"myclass\" src=\"../../image.jpg\" alt=\"\" /></p>", tx );
});


test( 'image with class and dotspace and relative src with dots', function ( t ) {
  let tx = "!(myclass). ../../image.jpg!";
  t.is( textile.convert( tx ),
    "<p><img class=\"myclass\" src=\"../../image.jpg\" alt=\"\" /></p>", tx );
});


test( 'image with style', function ( t ) {
  let tx = "!{color:red}image.jpg!";
  t.is( textile.convert( tx ),
    "<p><img style=\"color:red\" src=\"image.jpg\" alt=\"\" /></p>", tx );
});


test( 'image with style and dotspace', function ( t ) {
  let tx = "!{color:red}. image.jpg!";
  t.is( textile.convert( tx ),
    "<p><img style=\"color:red\" src=\"image.jpg\" alt=\"\" /></p>", tx );
});


test( 'image attributes has ampersand html entity in alt and title', function ( t ) {
  let tx = "!/pictures/cat_and_fox.jpg(Trady Blix & The cartoon fox)!";
  t.is( textile.convert( tx ),
    "<p><img src=\"/pictures/cat_and_fox.jpg\" title=\"Trady Blix &amp; The cartoon fox\" alt=\"Trady Blix &amp; The cartoon fox\" /></p>", tx );
});


test( 'image attributes has double quote html entity in alt and title', function ( t ) {
  let tx = "!/pictures/bacon.jpg(The fox said: \"Have some chunky bacon\")!";
  t.is( textile.convert( tx ),
    "<p><img src=\"/pictures/bacon.jpg\" title=\"The fox said: &quot;Have some chunky bacon&quot;\" alt=\"The fox said: &quot;Have some chunky bacon&quot;\" /></p>", tx );
});


test( 'image attributes has single quote html entity in alt and title', function ( t ) {
  let tx = "!/pictures/bacon.jpg(The fox said: 'Have some chunky bacon')!";
  t.is( textile.convert( tx ),
    "<p><img src=\"/pictures/bacon.jpg\" title=\"The fox said: &#39;Have some chunky bacon&#39;\" alt=\"The fox said: &#39;Have some chunky bacon&#39;\" /></p>", tx );
});


test( 'in square brackets', function ( t ) {
  let tx = "This is an [!image.jpg!] you see.";
  t.is( textile.convert( tx ),
    "<p>This is an <img src=\"image.jpg\" alt=\"\" /> you see.</p>", tx );
});


test( 'with link in square brackets', function ( t ) {
  let tx = "This is an [!image.jpg!:http://example.com/] you see.";
  t.is( textile.convert( tx ),
    "<p>This is an <a href=\"http://example.com/\"><img src=\"image.jpg\" alt=\"\" /></a> you see.</p>", tx );
});


test( 'url containing parentheses', function ( t ) {
  let tx = "!http://commons.wikimedia.org/wiki/File:Rubis_sur_calcite_2(Vietnam).jpg!";
  t.is( textile.convert( tx ),
    "<p><img src=\"http://commons.wikimedia.org/wiki/File:Rubis_sur_calcite_2(Vietnam).jpg\" alt=\"\" /></p>", tx );
});


test( 'with alt and url containing parentheses', function ( t ) {
  let tx = "!http://commons.wikimedia.org/wiki/File:Rubis_sur_calcite_2(Vietnam).jpg(a big rock)!";
  t.is( textile.convert( tx ),
    "<p><img src=\"http://commons.wikimedia.org/wiki/File:Rubis_sur_calcite_2(Vietnam).jpg\" title=\"a big rock\" alt=\"a big rock\" /></p>", tx );
});


test( 'with link that contains parentheses', function ( t ) {
  let tx = "!image.jpg(Alt text with (parentheses).)!";
  t.is( textile.convert( tx ),
    "<p><img src=\"image.jpg\" title=\"Alt text with (parentheses).\" alt=\"Alt text with (parentheses).\" /></p>", tx );
});


test( 'with link and title and text afterward', function ( t ) {
  let tx = "!/image_r.jpg(description)!:image.jpg text.";
  t.is( textile.convert( tx ),
    "<p><a href=\"image.jpg\"><img src=\"/image_r.jpg\" title=\"description\" alt=\"description\" /></a> text.</p>", tx );
});

