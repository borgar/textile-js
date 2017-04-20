/* eslint-disable prefer-const, no-multi-str, quotes */
const test = require( 'tape' );
const textile = require( '../src' );

/*

Textile has a problem with blocks when mixed with HTML.

What it does, traditionally, is to split everything up by "\n\n" and consider
each of the items as a block. If the block starts with a known block handler
syntax, then it gets converted accordingly.

*/

test( 'Block level tag parsing', t => {
  const tx = `A
p. inside
A`;
  const op = `<p>A<br />
p. inside<br />
A</p>`;
  t.is( textile.convert( tx ), op, tx ); t.end();
});


test( 'An auto-paragraph', function ( t ) {
  const tx = `A paragraph.

Another paragraph.`;
  const op = `<p>A paragraph.</p>
<p>Another paragraph.</p>`;
  t.is( textile.convert( tx ), op, tx ); t.end();
});


test( 'Intra-block line breaks', function ( t ) {
  const tx = `A paragraph with
a line break.`;
  const op = `<p>A paragraph with<br />
a line break.</p>`;
  t.is( textile.convert( tx ), op, tx ); t.end();
});

/*

HTML blocks are parsed as blocks if they start with one of the allowed HTML block
tags. Inside the block, as normal, block level tags are not parsed but phrases are.
No automatic-linebreaking happens inside HTML.

All of this leads to a bunch of interesting complications.

For this textile:

```
<div>
p. This is a block.
</div>
```

One might expect either one of the following treatments:

```
<div>
<p>This is a block.</p>
</div>
```

Or:

```
<div>A<br />
p. This is a block.<br />
A</div>
```

But in fact, the whole thing is a "HTML block", and is
handled specifically as such: Phrase level things are parsed,
but not linebroken:

```
<div>
p. This is *a block*.
With two lines.
</div>
```

*/

test( 'Block level markup is not parsed inside HTML', t => {
  const tx = `<div>
p. This is *a block*.
With two lines.
</div>`;
  const op = `<div>
p. This is <strong>a block</strong>.
With two lines.
</div>`;
  t.is( textile.convert( tx ), op, tx ); t.end();
});

/*

Of course, this means that \n\n inside a HTML structure will cause havoc:

```
<div>
p. This is *a block*.

With two lines.
</div>
````

```
<p><div><br />
p. This is <strong>a block</strong>.</p>

<p>With two lines.<br />
</div></p>
```

A user is supped to be able to escape the textile linebreaking with spaces, but
has limited usefulness:

```
 <div>
p. This is *a block*.

With two lines.
 </div>
```

```
<p><div><br />
p. This is <strong>a block</strong>.</p>

<p>With two lines.
 </div></p>
```

Because, it only works "sometimes":

```
 <div>

p. This is *a block*.

 </div>
```

```
<p><div></p>

<p>This is <strong>a block</strong>.</p>

 </div>
```

Textile-JS disregards all of these and treats HTML blocks with
the HTML parsing rules regarless of any leading spaces.

*/

test( 'Don\'t chunk blocks inside HTML', t => {
  const tx = `Some text

 <div>

p. inside

p. inside

 </div>`;
  const op = `<p>Some text</p>
<div>
<p>inside</p>
<p>inside</p>
</div>`;
  t.is( textile.convert( tx ), op, tx ); t.end();
});


// This is different from PHP behaviour, but there
// is no sane rationale for the PHP outcome which
// I don't believe is useful to anyone.
test( 'Don\'t chunk blocks inside HTML', t => {
  const tx = `<div>
p. This is *a block*.

With two lines.
</div>`;
  const op = `<div>
<p>This is <strong>a block</strong>.</p>
<p>With two lines.</p>
</div>`;
  t.is( textile.convert( tx ), op, tx ); t.end();
});


test( "Spaces don't matter to HTML.", t => {
  const tx = ` <div>
p. This is *a block*.

With two lines.
 </div>`;
  const op = `<div>
<p>This is <strong>a block</strong>.</p>
<p>With two lines.</p>
</div>`;
  t.is( textile.convert( tx ), op, tx ); t.end();
});


test( "Spaces don't matter to HTML.", t => {
  const tx = ` <div>
p. This is *a block*.
 </div>`;
  const op = `<div>
p. This is <strong>a block</strong>.
</div>`;
  t.is( textile.convert( tx ), op, tx ); t.end();
});


