// extra_whitespace.yml
import test from 'ava';
import textile from '../src';

test( 'header with 1 blank line below', function ( t ) {
  let tx = "h1. Header\n\n\
text";
  t.is( textile.convert( tx ),
    "<h1>Header</h1>\n\
<p>text</p>", tx );
});


test( 'header with 2 blank lines below', function ( t ) {
  let tx = "h1. Header\n\n\n\
text";
  t.is( textile.convert( tx ),
    "<h1>Header</h1>\n\
<p>text</p>", tx );
});


test( 'header with 1 blank line above', function ( t ) {
  let tx = "text\n\n\
h1. Header";
  t.is( textile.convert( tx ),
    "<p>text</p>\n\
<h1>Header</h1>", tx );
});


test( 'header with 2 blank lines above', function ( t ) {
  let tx = "text\n\n\n\
h1. Header";
  t.is( textile.convert( tx ),
    "<p>text</p>\n\
<h1>Header</h1>", tx );
});

