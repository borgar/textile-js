const test = require('tape');
const textile = require('../src');

test('poignant:1', function (t) {
  const tx = `* [*H*]attric: *DO*
|*D*|Diversity|
|*O*|Obstacles|`;

  t.is(textile.convert(tx, { inlineTables: true }),
    `<ul>
\t<li><strong>H</strong>attric: <strong>DO</strong><br />
<table>
\t<tr>
\t\t<td><strong>D</strong></td>
\t\t<td>Diversity</td>
\t</tr>
\t<tr>
\t\t<td><strong>O</strong></td>
\t\t<td>Obstacles</td>
\t</tr>
</table></li>
</ul>`, tx);
  t.end();
});


