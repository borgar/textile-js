// definitions.yml
import test from 'ava';
import textile from '../src';

test( 'redcloth definition list', function ( t ) {
  let tx = "here is a RedCloth definition list:\n\n\
- yes := no\n\
- no:=no\n\
- maybe:= yes";
  t.is( textile.convert( tx ),
    "<p>here is a RedCloth definition list:</p>\n\
<dl>\n\
\t<dt>yes</dt>\n\
\t<dd>no</dd>\n\
\t<dt>no</dt>\n\
\t<dd>no</dd>\n\
\t<dt>maybe</dt>\n\
\t<dd>yes</dd>\n\
</dl>", tx );
});


test( 'with line breaks', function ( t ) {
  let tx = "- term := you can have line breaks\n\
just like other lists\n\
- line-spanning\n\
term := hey, slick!";
  t.is( textile.convert( tx ),
    "<dl>\n\
\t<dt>term</dt>\n\
\t<dd>you can have line breaks<br />\n\
just like other lists</dd>\n\
\t<dt>line-spanning<br />\n\
term</dt>\n\
\t<dd>hey, slick!</dd>\n\
</dl>", tx );
});


test( 'double terms', function ( t ) {
  let tx = "You can have multiple terms before a definition:\n\n\
- textile\n\
- fabric\n\
- cloth := woven threads";
  t.is( textile.convert( tx ),
    "<p>You can have multiple terms before a definition:</p>\n\
<dl>\n\
\t<dt>textile</dt>\n\
\t<dt>fabric</dt>\n\
\t<dt>cloth</dt>\n\
\t<dd>woven threads</dd>\n\
</dl>", tx );
});


test( 'not a definition list', function ( t ) {
  let tx = "- textile\n\
- fabric\n\
- cloth";
  t.is( textile.convert( tx ),
    "<p>- textile<br />\n\
- fabric<br />\n\
- cloth</p>", tx );
});


test( 'long definition list', function ( t ) {
  let tx = "here is a long definition\n\n\
- some term := \n\
*sweet*\n\n\
yes\n\n\
ok =:\n\
- regular term := no";
  t.is( textile.convert( tx ),
    "<p>here is a long definition</p>\n\
<dl>\n\
\t<dt>some term</dt>\n\
\t<dd><p><strong>sweet</strong></p>\n\
<p>yes</p>\n\
<p>ok</p></dd>\n\
\t<dt>regular term</dt>\n\
\t<dd>no</dd>\n\
</dl>", tx );
});

