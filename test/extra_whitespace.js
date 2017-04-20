/* eslint-disable prefer-const, no-multi-str, quotes */
const test = require( 'tape' );
const textile = require( '../src' );
// extra_whitespace.yml

test( 'header with 1 blank line below', function ( t ) {
  let tx = "h1. Header\n\n\
text";
  t.is( textile.convert( tx ),
    "<h1>Header</h1>\n\
<p>text</p>", tx );
  t.end();
});


test( 'header with 2 blank lines below', function ( t ) {
  let tx = "h1. Header\n\n\n\
text";
  t.is( textile.convert( tx ),
    "<h1>Header</h1>\n\
<p>text</p>", tx );
  t.end();
});


test( 'header with 1 blank line above', function ( t ) {
  let tx = "text\n\n\
h1. Header";
  t.is( textile.convert( tx ),
    "<p>text</p>\n\
<h1>Header</h1>", tx );
  t.end();
});


test( 'header with 2 blank lines above', function ( t ) {
  let tx = "text\n\n\n\
h1. Header";
  t.is( textile.convert( tx ),
    "<p>text</p>\n\
<h1>Header</h1>", tx );
  t.end();
});

