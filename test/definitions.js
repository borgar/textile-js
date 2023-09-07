import test from 'tape';
import textile from '../src/index.js';
// definitions.yml

test('redcloth definition list', t => {
  const tx = `here is a RedCloth definition list:

- yes := no
- no:=no
- maybe:= yes`;
  t.is(textile.convert(tx),
    `<p>here is a RedCloth definition list:</p>
<dl>
\t<dt>yes</dt>
\t<dd>no</dd>
\t<dt>no</dt>
\t<dd>no</dd>
\t<dt>maybe</dt>
\t<dd>yes</dd>
</dl>`, tx);
  t.end();
});


test('with line breaks', t => {
  const tx = `- term := you can have line breaks
just like other lists
- line-spanning
term := hey, slick!`;
  t.is(textile.convert(tx),
    `<dl>
\t<dt>term</dt>
\t<dd>you can have line breaks<br />
just like other lists</dd>
\t<dt>line-spanning<br />
term</dt>
\t<dd>hey, slick!</dd>
</dl>`, tx);
  t.end();
});


test('double terms', t => {
  const tx = `You can have multiple terms before a definition:

- textile
- fabric
- cloth := woven threads`;
  t.is(textile.convert(tx),
    `<p>You can have multiple terms before a definition:</p>
<dl>
\t<dt>textile</dt>
\t<dt>fabric</dt>
\t<dt>cloth</dt>
\t<dd>woven threads</dd>
</dl>`, tx);
  t.end();
});


test('not a definition list', t => {
  const tx = `- textile
- fabric
- cloth`;
  t.is(textile.convert(tx),
    `<p>- textile<br />
- fabric<br />
- cloth</p>`, tx);
  t.end();
});


test('long definition list', t => {
  const tx = `here is a long definition

- some term := 
*sweet*

yes

ok =:
- regular term := no`;
  t.is(textile.convert(tx),
    `<p>here is a long definition</p>
<dl>
\t<dt>some term</dt>
\t<dd><p><strong>sweet</strong></p>
<p>yes</p>
<p>ok</p></dd>
\t<dt>regular term</dt>
\t<dd>no</dd>
</dl>`, tx);
  t.end();
});

