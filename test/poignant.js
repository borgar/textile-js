import test from 'tape';
import textile from '../src/index.js';
// poignant.yml

test('poignant:1', t => {
  const tx = `h3. False

!<i/blix-neg.gif(Shape of a cat.)!

_The cat Trady Blix.  Frozen in emptiness.  Immaculate whiskers rigid.  Placid eyes of lake.  Tail of warm icicle.  Sponsored by a Very Powerful Pause Button._

The darkness surrounding Blix can be called *negative space*.  Hang on to that phrase. Let it suggest that the emptiness has a negative connotation.  In a similar way, @nil@ has a slightly sour note that it whistles.

Generally speaking, everything in Ruby has a positive charge to it.  This spark flows through strings, numbers, regexps, all of it.  Only two keywords wear a shady cloak: @nil@ and @false@ draggin us down.

You can test that charge with an @if@ keyword.  It looks very much like the @do@ blocks we saw in the last chapter, in that both end with an @end@.

<pre>
  if plastic_cup
    print "Plastic cup is on the up 'n' up!"
  end
</pre>

If @plastic_cup@ contains either @nil@ or @false@, you won't see anything print to the screen.  They're not on the @if@ guest list.  So @if@ isn't going to run any of the code it's protecting.

But @nil@ and @false@ need not walk away in shame.  They may be of questionable character, but @unless@ runs a smaller establishment that caters to the bedraggled. The @unless@ keyword has a policy of only allowing those with a negative charge in. Who are: @nil@ and @false@.

<pre>
  unless plastic_cup
    print "Plastic cup is on the down low."
  end
</pre>

You can also use @if@ and @unless@ at the end of a single line of code, if that's all that is being protected.

<pre>
  print "Yeah, plastic cup is up again!" if plastic_cup
  print "Hardly. It's down." unless plastic_cup
</pre>

Now that you've met @false@, I'm sure you can see what's on next.`;
  t.is(textile.convert(tx),
    `<h3>False</h3>
<p><img align="left" src="i/blix-neg.gif" title="Shape of a cat." alt="Shape of a cat." /></p>
<p><em>The cat Trady Blix.  Frozen in emptiness.  Immaculate whiskers rigid.  Placid eyes of lake.  Tail of warm icicle.  Sponsored by a Very Powerful Pause Button.</em></p>
<p>The darkness surrounding Blix can be called <strong>negative space</strong>.  Hang on to that phrase. Let it suggest that the emptiness has a negative connotation.  In a similar way, <code>nil</code> has a slightly sour note that it whistles.</p>
<p>Generally speaking, everything in Ruby has a positive charge to it.  This spark flows through strings, numbers, regexps, all of it.  Only two keywords wear a shady cloak: <code>nil</code> and <code>false</code> draggin us down.</p>
<p>You can test that charge with an <code>if</code> keyword.  It looks very much like the <code>do</code> blocks we saw in the last chapter, in that both end with an <code>end</code>.</p>
<pre>
  if plastic_cup
    print "Plastic cup is on the up 'n' up!"
  end
</pre>
<p>If <code>plastic_cup</code> contains either <code>nil</code> or <code>false</code>, you won’t see anything print to the screen.  They’re not on the <code>if</code> guest list.  So <code>if</code> isn’t going to run any of the code it’s protecting.</p>
<p>But <code>nil</code> and <code>false</code> need not walk away in shame.  They may be of questionable character, but <code>unless</code> runs a smaller establishment that caters to the bedraggled. The <code>unless</code> keyword has a policy of only allowing those with a negative charge in. Who are: <code>nil</code> and <code>false</code>.</p>
<pre>
  unless plastic_cup
    print "Plastic cup is on the down low."
  end
</pre>
<p>You can also use <code>if</code> and <code>unless</code> at the end of a single line of code, if that’s all that is being protected.</p>
<pre>
  print "Yeah, plastic cup is up again!" if plastic_cup
  print "Hardly. It's down." unless plastic_cup
</pre>
<p>Now that you’ve met <code>false</code>, I’m sure you can see what’s on next.</p>`, tx);
  t.end();
});
