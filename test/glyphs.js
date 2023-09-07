/* eslint-disable quotes */
import test from 'tape';
import textile from '../src/index.js';

test('Basic glyphs', t => {
  t.is(textile.convert(`"Textile(c)" is a registered(r) 'trademark' of Textpattern(tm) -- or TXP(That's textpattern!) -- at least it was - back in '88 when 2x4 was (+/-)5(o)C ... QED!`),
    `<p>“Textile©” is a registered® ‘trademark’ of Textpattern™ — or <abbr title="That&#39;s textpattern!"><span class="caps">TXP</span></abbr> — at least it was – back in ’88 when 2×4 was ±5°C … <span class="caps">QED</span>!</p>`);
  t.is(textile.convert(`p{font-size:200%;}. 2(1/4) 3(1/2) 4(3/4)`),
    `<p style="font-size:200%">2¼ 3½ 4¾</p>`);
  t.is(textile.convert(`"." ".." "..." '.' '..' '...' Allow quoted periods.`),
    `<p>“.” “..” “…” ‘.’ ‘..’ ‘…’ Allow quoted periods.</p>`);
  t.end();
});

test('Basic glyphs as entities', t => {
  const opts = { glyph_entities: true };
  t.is(textile.convert(`"Textile(c)" is a registered(r) 'trademark' of Textpattern(tm) -- or TXP(That's textpattern!) -- at least it was - back in '88 when 2x4 was (+/-)5(o)C ... QED!`, opts),
    `<p>&#8220;Textile&#169;&#8221; is a registered&#174; &#8216;trademark&#8217; of Textpattern&#8482; &#8212; or <abbr title="That&#39;s textpattern!"><span class="caps">TXP</span></abbr> &#8212; at least it was &#8211; back in &#8217;88 when 2&#215;4 was &#177;5&#176;C &#8230; <span class="caps">QED</span>!</p>`);
  t.is(textile.convert(`p{font-size:200%;}. 2(1/4) 3(1/2) 4(3/4)`, opts),
    `<p style="font-size:200%">2&#188; 3&#189; 4&#190;</p>`);
  t.is(textile.convert(`"." ".." "..." '.' '..' '...' Allow quoted periods.`, opts),
    `<p>&#8220;.&#8221; &#8220;..&#8221; &#8220;&#8230;&#8221; &#8216;.&#8217; &#8216;..&#8217; &#8216;&#8230;&#8217; Allow quoted periods.</p>`);
  t.end();
});

test('Dimensions', t => {
  t.is(textile.convert(`[1/2] x [1/4] and (1/2)" x [1/4]" and (1/2)' x (1/4)'`),
    `<p>½ × ¼ and ½″ × ¼″ and ½′ × ¼′</p>`);
  t.is(textile.convert(`(2 x 10) X (3 / 4) x (200 + 64)`),
    `<p>(2 × 10) × (3 / 4) × (200 + 64)</p>`);
  t.is(textile.convert(`1 x 1 = 1`),
    `<p>1 × 1 = 1</p>`);
  t.is(textile.convert(`1 x1 = 1`),
    `<p>1 ×1 = 1</p>`);
  t.is(textile.convert(`1x 1 = 1`),
    `<p>1× 1 = 1</p>`);
  t.is(textile.convert(`1x1 = 1`),
    `<p>1×1 = 1</p>`);
  t.is(textile.convert(`1 X 1 = 1`),
    `<p>1 × 1 = 1</p>`);
  t.is(textile.convert(`1 X1 = 1`),
    `<p>1 ×1 = 1</p>`);
  t.is(textile.convert(`1X 1 = 1`),
    `<p>1× 1 = 1</p>`);
  t.is(textile.convert(`1X1 = 1`),
    `<p>1×1 = 1</p>`);
  t.is(textile.convert(`What is 1 x 1?`),
    `<p>What is 1 × 1?</p>`);
  t.is(textile.convert(`What is 1x1?`),
    `<p>What is 1×1?</p>`);
  t.is(textile.convert(`What is 1 X 1?`),
    `<p>What is 1 × 1?</p>`);
  t.is(textile.convert(`What is 1X1?`),
    `<p>What is 1×1?</p>`);
  t.is(textile.convert(`1 x 2 x 3 = 6`),
    `<p>1 × 2 × 3 = 6</p>`);
  t.is(textile.convert(`1x2x3=6`),
    `<p>1×2×3=6</p>`);
  t.is(textile.convert(`1x2 x 1x3 = 6`),
    `<p>1×2 × 1×3 = 6</p>`);
  t.is(textile.convert(`2' x 2' = 4 sqft.`),
    `<p>2′ × 2′ = 4 sqft.</p>`);
  t.is(textile.convert(`2'x 2' = 4 sqft.`),
    `<p>2′× 2′ = 4 sqft.</p>`);
  t.is(textile.convert(`2' x2' = 4 sqft.`),
    `<p>2′ ×2′ = 4 sqft.</p>`);
  t.is(textile.convert(`2'x2' = 4 sqft.`),
    `<p>2′×2′ = 4 sqft.</p>`);
  t.is(textile.convert(`2' X 2' = 4 sqft.`),
    `<p>2′ × 2′ = 4 sqft.</p>`);
  t.is(textile.convert(`2'X 2' = 4 sqft.`),
    `<p>2′× 2′ = 4 sqft.</p>`);
  t.is(textile.convert(`2' X2' = 4 sqft.`),
    `<p>2′ ×2′ = 4 sqft.</p>`);
  t.is(textile.convert(`2'X2' = 4 sqft.`),
    `<p>2′×2′ = 4 sqft.</p>`);
  t.is(textile.convert(`2" x 2" = 4 sqin.`),
    `<p>2″ × 2″ = 4 sqin.</p>`);
  t.is(textile.convert(`2'4"`),
    `<p>2′4″</p>`);
  t.is(textile.convert(`2"x 2" = 4 sqin.`),
    `<p>2″× 2″ = 4 sqin.</p>`);
  t.is(textile.convert(`2" x2" = 4 sqin.`),
    `<p>2″ ×2″ = 4 sqin.</p>`);
  t.is(textile.convert(`2"x2" = 4 sqin.`),
    `<p>2″×2″ = 4 sqin.</p>`);
  t.is(textile.convert(`2" X 2" = 4 sqin.`),
    `<p>2″ × 2″ = 4 sqin.</p>`);
  t.is(textile.convert(`2"X 2" = 4 sqin.`),
    `<p>2″× 2″ = 4 sqin.</p>`);
  t.is(textile.convert(`2" X2" = 4 sqin.`),
    `<p>2″ ×2″ = 4 sqin.</p>`);
  t.is(textile.convert(`2"X2" = 4in[^2^].`),
    `<p>2″×2″ = 4in<sup>2</sup>.</p>`);
  t.is(textile.convert(`What is 1.2 x 3.5?`),
    `<p>What is 1.2 × 3.5?</p>`);
  t.is(textile.convert(`What is .2 x .5?`),
    `<p>What is .2 × .5?</p>`, 'What is .2 x .5?');
  t.is(textile.convert(`What is 1.2x3.5?`),
    `<p>What is 1.2×3.5?</p>`);
  t.is(textile.convert(`What is .2x.5?`),
    `<p>What is .2×.5?</p>`);
  t.is(textile.convert(`What is 1.2' x3.5'?`),
    `<p>What is 1.2′ ×3.5′?</p>`);
  t.is(textile.convert(`What is .2"x .5"?`),
    `<p>What is .2″× .5″?</p>`);
  t.is(textile.convert(`1 x $10.00 x -£ 1.23 x ¥20,000 x -¤120.00 x ฿1,000,000 x -€110,00`),
    `<p>1 × $10.00 × -£ 1.23 × ¥20,000 × -¤120.00 × ฿1,000,000 × -€110,00</p>`);
  t.end();
});

test('Punctuation', t => {
  t.is(textile.convert(`Greengrocers' apostrophe's.`),
    `<p>Greengrocers’ apostrophe’s.</p>`);
  t.is(textile.convert(`'"I swear it was in '62, captain," replied I.'`),
    `<p>‘“I swear it was in ’62, captain,” replied I.’</p>`);
  t.is(textile.convert(`Dad said; "Mum said: 'It's a beautiful day viz-a-viz a picnic, isn't it?' -- _I think_."`),
    `<p>Dad said; “Mum said: ‘It’s a beautiful day viz-a-viz a picnic, isn’t it?’ — <em>I think</em>.”</p>`);
  t.is(textile.convert(`"'I swear it's true, captain,' replied I, 'Here's your list: 2 apples, a banana & a papaya.'"`),
    `<p>“‘I swear it’s true, captain,’ replied I, ‘Here’s your list: 2 apples, a banana &amp; a papaya.’”</p>`);
  t.is(textile.convert(`in '88. blah. In the '90s blah. He's in his '90s' now.`),
    `<p>in ’88. blah. In the ’90s blah. He’s in his ‘90s’ now.</p>`);
  t.is(textile.convert(`Happened in '89.`),
    `<p>Happened in ’89.</p>`);
  t.is(textile.convert(`in '89`),
    `<p>in ’89</p>`);
  t.is(textile.convert(`in '89\x20`),
    `<p>in ’89 </p>`);
  t.is(textile.convert(`Happened in '89. it did.`),
    `<p>Happened in ’89. it did.</p>`);
  t.is(textile.convert(`File '1.png'. '1.' '1' '10m' '1.txt'`),
    `<p>File ‘1.png’. ‘1.’ ‘1’ ‘10m’ ‘1.txt’</p>`);
  t.is(textile.convert(`NATO(North Atlantic Treaty Organisation)'s pretty big.`),
    `<p><abbr title="North Atlantic Treaty Organisation"><span class="caps">NATO</span></abbr>’s pretty big.</p>`);
  t.is(textile.convert(`ABC()'s poor knees.`),
    `<p><span class="caps">ABC</span>’s poor knees.</p>`);
  t.is(textile.convert(`ABC('s poor knees.`),
    `<p><span class="caps">ABC</span>(‘s poor knees.</p>`);
  t.is(textile.convert(`ABC)'s poor knees.`),
    `<p><span class="caps">ABC</span>)’s poor knees.</p>`);
  t.is(textile.convert(`Here is a %(example)'spanned'% word.`),
    `<p>Here is a <span class="example">‘spanned’</span> word.</p>`);
  t.is(textile.convert(`The NHS(National Health Service)' charter states...`),
    `<p>The <abbr title="National Health Service"><span class="caps">NHS</span></abbr>’ charter states…</p>`);
  t.end();
});

test('Dashes and ellipsis', t => {
  t.is(textile.convert(`You know the Italian proverb -- Chi ha compagno ha padrone.`),
    `<p>You know the Italian proverb — Chi ha compagno ha padrone.</p>`);
  t.is(textile.convert(`You know the Italian proverb--Chi ha compagno ha padrone.`),
    `<p>You know the Italian proverb—Chi ha compagno ha padrone.</p>`);
  t.is(textile.convert(`You know the Italian proverb - Chi ha compagno ha padrone.`),
    `<p>You know the Italian proverb – Chi ha compagno ha padrone.</p>`);
  t.is(textile.convert(`You know the Italian proverb-Chi ha compagno ha padrone.`),
    `<p>You know the Italian proverb-Chi ha compagno ha padrone.</p>`);
  t.is(textile.convert(`You know the Italian proverb... Chi ha compagno ha padrone.`),
    `<p>You know the Italian proverb… Chi ha compagno ha padrone.</p>`);
  t.is(textile.convert(`You know the Italian proverb...Chi ha compagno ha padrone.`),
    `<p>You know the Italian proverb…Chi ha compagno ha padrone.</p>`);
  t.end();
});

test('Tricky Open Quotes...', t => {
  t.is(textile.convert(`citation ["(Berk.) Hilton"], see`),
    `<p>citation [“(Berk.) Hilton”], see</p>`);
  t.is(textile.convert(`[Papers "blah blah."]`),
    `<p>[Papers “blah blah.”]</p>`);
  t.is(textile.convert(`Hello ("Mum")...`),
    `<p>Hello (“Mum”)…</p>`);
  t.is(textile.convert(`Hello ["(mum) & dad"], see...`),
    `<p>Hello [“(mum) &amp; dad”], see…</p>`);
  t.is(textile.convert(`Hello ("[mum] & dad"), see...`),
    `<p>Hello (“[mum] &amp; dad”), see…</p>`);
  t.is(textile.convert(`Hello {"(mum) & dad"}, see...`),
    `<p>Hello {“(mum) &amp; dad”}, see…</p>`);
  t.is(textile.convert(`["Well, well (well)"] ...`),
    `<p>[“Well, well (well)”] …</p>`);
  t.is(textile.convert(`citation ['(Berk.) Hilton'], see`),
    `<p>citation [‘(Berk.) Hilton’], see</p>`);
  t.is(textile.convert(`[Papers "blah blah."]`),
    `<p>[Papers “blah blah.”]</p>`);
  t.is(textile.convert(`Hello ('Mum')...`),
    `<p>Hello (‘Mum’)…</p>`);
  t.is(textile.convert(`Hello ['(mum) & dad'], see...`),
    `<p>Hello [‘(mum) &amp; dad’], see…</p>`);
  t.is(textile.convert(`Hello ('[mum] & dad'), see...`),
    `<p>Hello (‘[mum] &amp; dad’), see…</p>`);
  t.is(textile.convert(`Hello {'(mum) & dad'}, see...`),
    `<p>Hello {‘(mum) &amp; dad’}, see…</p>`);
  t.is(textile.convert(`['Well, well (well)'] ...`),
    `<p>[‘Well, well (well)’] …</p>`);
  t.end();
});
