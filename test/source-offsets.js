import test from 'tape';
import { parseTree, Element, CommentNode, ExtendedNode } from '../src/index.js';

const EXND = '..';
const COMM = '###';

function parse (tx) {
  const tree = parseTree(tx);
  const struct = [];

  tree.visit(node => {
    if (node instanceof Element || node instanceof CommentNode || node instanceof ExtendedNode) {
      const { start, end } = node.pos;
      let tagName = node.tagName;
      if (node instanceof CommentNode) {
        tagName = COMM;
      }
      if (node instanceof ExtendedNode) {
        tagName = EXND;
      }
      struct.push([
        tagName,
        [ start, end ],
        tx.slice(start, end)
      ]);
    }
  });

  return struct;
}

test('p', t => {
  t.deepEqual(
    parse('one\n\ntwo'),
    [ [ 'p', [ 0, 5 ], 'one\n\n' ],
      [ 'p', [ 5, 8 ], 'two' ] ],
    'auto paragraphs'
  );
  t.deepEqual(
    parse('p. one\n\np. two'),
    [ [ 'p', [ 0, 8 ], 'p. one\n\n' ],
      [ 'p', [ 8, 14 ], 'p. two' ] ],
    'named paragraphs'
  );
  t.deepEqual(
    parse('p.. one\n\ntwo'),
    [ [ EXND, [ 0, 12 ], 'p.. one\n\ntwo' ],
      [ 'p', [ 0, 9 ], 'p.. one\n\n' ],
      [ 'p', [ 9, 12 ], 'two' ] ],
    'extended paragraph'
  );
  t.end();
});

test('###', t => {
  t.deepEqual(
    parse('one\n\n###. comment\n\ntwo'),
    [ [ 'p', [ 0, 5 ], 'one\n\n' ],
      [ 'p', [ 19, 22 ], 'two' ] ],
    'named comment'
  );
  t.deepEqual(
    parse('###.. one\n\ntwo\n\np. foo'),
    [ [ EXND, [ 0, 16 ], '###.. one\n\ntwo\n\n' ],
      [ 'p', [ 16, 22 ], 'p. foo' ] ],
    'extended comment'
  );
  t.deepEqual(
    parse('p. one\n\n###. comment\n\np. two'),
    [ [ 'p', [ 0, 8 ], 'p. one\n\n' ],
      [ 'p', [ 22, 28 ], 'p. two' ] ],
    'comment in between paragraphs'
  );
  const tree = parseTree('one\n\n###. comment\n\ntwo');
  const comment = tree.children[2];
  t.is(comment.nodeType, Element.HIDDEN_NODE, 'comment exists in ast (nodeType)');
  t.is(comment.data, 'comment', 'comment exists in ast (data)');
  t.is(comment.pos.start, 5, 'comment exists in ast (start)');
  t.end();
});

test('bc', t => {
  t.deepEqual(
    parse('bc. one\n\nbc. two'),
    [ [ 'pre', [ 0, 9 ], 'bc. one\n\n' ],
      [ 'code', [ 4, 9 ], 'one\n\n' ],
      [ 'pre', [ 9, 16 ], 'bc. two' ],
      [ 'code', [ 13, 16 ], 'two' ] ]
  );
  t.deepEqual(
    parse('bc.. one\n\ntwo'),
    [ [ EXND, [ 0, 13 ], 'bc.. one\n\ntwo' ],
      [ 'pre', [ 0, 13 ], 'bc.. one\n\ntwo' ],
      [ 'code', [ 5, 13 ], 'one\n\ntwo' ] ]
  );
  t.end();
});

test('bq', t => {
  t.deepEqual(
    parse('bq. one\n\nbq. two'),
    [ [ 'blockquote', [ 0, 9 ], 'bq. one\n\n' ],
      [ 'p', [ 4, 9 ], 'one\n\n' ],
      [ 'blockquote', [ 9, 16 ], 'bq. two' ],
      [ 'p', [ 13, 16 ], 'two' ] ]
  );
  t.deepEqual(
    parse('bq.. one\n\ntwo'),
    [ [ EXND, [ 0, 13 ], 'bq.. one\n\ntwo' ],
      [ 'blockquote', [ 0, 13 ], 'bq.. one\n\ntwo' ],
      [ 'p', [ 5, 10 ], 'one\n\n' ],
      [ 'p', [ 10, 13 ], 'two' ] ]
  );
  t.deepEqual(
    parse('bq.:http://example.com/ one two three'),
    [ [ 'blockquote', [ 0, 37 ], 'bq.:http://example.com/ one two three' ],
      [ 'p', [ 24, 37 ], 'one two three' ] ]
  );
  t.end();
});

test('fn#', t => {
  t.deepEqual(
    parse('fn1. one\n\nfn2. two'),
    [ [ 'p', [ 0, 10 ], 'fn1. one\n\n' ],
      [ 'a', [ 2, 3 ], '1' ],
      [ 'sup', [ 2, 3 ], '1' ],
      [ 'p', [ 10, 18 ], 'fn2. two' ],
      [ 'a', [ 12, 13 ], '2' ],
      [ 'sup', [ 12, 13 ], '2' ] ],
    'named footnote'
  );
  t.deepEqual(
    parse('fn1.. one\n\ntwo'),
    [ [ EXND, [ 0, 14 ], 'fn1.. one\n\ntwo' ],
      [ 'p', [ 0, 14 ], 'fn1.. one\n\ntwo' ],
      [ 'a', [ 2, 3 ], '1' ],
      [ 'sup', [ 2, 3 ], '1' ],
      [ 'br', [ 9, 10 ], '\n' ],
      [ 'br', [ 10, 11 ], '\n' ]
    ],
    'extended footnote'
  );
  t.deepEqual(
    parse('one[1] two'),
    [ [ 'p', [ 0, 10 ], 'one[1] two' ],
      [ 'sup', [ 3, 6 ], '[1]' ],
      [ 'a', [ 3, 6 ], '[1]' ] ],
    'footnote reference'
  );
  t.end();
});

test('h#', t => {
  t.deepEqual(
    parse('h1. one\n\nh1. two'),
    [ [ 'h1', [ 0, 9 ], 'h1. one\n\n' ],
      [ 'h1', [ 9, 16 ], 'h1. two' ] ],
    'h1'
  );
  t.deepEqual(
    parse('h1.. one\n\ntwo'),
    [ [ EXND, [ 0, 13 ], 'h1.. one\n\ntwo' ],
      [ 'h1', [ 0, 10 ], 'h1.. one\n\n' ],
      [ 'h1', [ 10, 13 ], 'two' ] ],
    'h1 extended'
  );
  t.deepEqual(
    parse('h2. one\n\nh2. two'),
    [ [ 'h2', [ 0, 9 ], 'h2. one\n\n' ],
      [ 'h2', [ 9, 16 ], 'h2. two' ] ],
    'h2'
  );
  t.deepEqual(
    parse('h2.. one\n\ntwo'),
    [ [ EXND, [ 0, 13 ], 'h2.. one\n\ntwo' ],
      [ 'h2', [ 0, 10 ], 'h2.. one\n\n' ],
      [ 'h2', [ 10, 13 ], 'two' ] ],
    'h2 extended'
  );
  t.deepEqual(
    parse('h3. one\n\nh3. two'),
    [ [ 'h3', [ 0, 9 ], 'h3. one\n\n' ],
      [ 'h3', [ 9, 16 ], 'h3. two' ] ],
    'h3'
  );
  t.deepEqual(
    parse('h3.. one\n\ntwo'),
    [ [ EXND, [ 0, 13 ], 'h3.. one\n\ntwo' ],
      [ 'h3', [ 0, 10 ], 'h3.. one\n\n' ],
      [ 'h3', [ 10, 13 ], 'two' ] ],
    'h3 extended'
  );
  t.deepEqual(
    parse('h4. one\n\nh4. two'),
    [ [ 'h4', [ 0, 9 ], 'h4. one\n\n' ],
      [ 'h4', [ 9, 16 ], 'h4. two' ] ],
    'h4'
  );
  t.deepEqual(
    parse('h4.. one\n\ntwo'),
    [ [ EXND, [ 0, 13 ], 'h4.. one\n\ntwo' ],
      [ 'h4', [ 0, 10 ], 'h4.. one\n\n' ],
      [ 'h4', [ 10, 13 ], 'two' ] ],
    'h4 extended'
  );
  t.end();
});

test('notextile', t => {
  t.deepEqual(
    parse('notextile. <b>one</b>\n\np. <b>two</b>'),
    [ [ 'b', [ 11, 21 ], '<b>one</b>' ],
      [ 'p', [ 23, 36 ], 'p. <b>two</b>' ],
      [ 'b', [ 26, 36 ], '<b>two</b>' ] ],
    'notextile block'
  );
  t.deepEqual(
    parse('p.. one\n\nnotextile. <b>middle</b>\n\ntwo'),
    [ [ EXND, [ 0, 9 ], 'p.. one\n\n' ],
      [ 'p', [ 0, 9 ], 'p.. one\n\n' ],
      [ 'b', [ 20, 33 ], '<b>middle</b>' ],
      [ 'p', [ 35, 38 ], 'two' ] ],
    'notextile in between paragraphs'
  );
  t.deepEqual(
    parse('notextile.. <b>one</b>\n\n<b>two</b>'),
    [ [ EXND, [ 0, 34 ], 'notextile.. <b>one</b>\n\n<b>two</b>' ],
      [ 'b', [ 12, 22 ], '<b>one</b>' ],
      [ 'b', [ 24, 34 ], '<b>two</b>' ] ],
    'extended notextile block'
  );
  t.deepEqual(
    parse('notextile. <img /> <b><u>x<i>foo</b>'),
    [ [ 'img', [ 11, 18 ], '<img />' ],
      [ 'b', [ 19, 36 ], '<b><u>x<i>foo</b>' ],
      [ 'u', [ 22, 32 ], '<u>x<i>foo' ],
      [ 'i', [ 26, 32 ], '<i>foo' ] ],
    'notextile auto closing html'
  );
  t.end();
});

test('pre', t => {
  t.deepEqual(
    parse('pre. one\n\npre. two'),
    [ [ 'pre', [ 0, 10 ], 'pre. one\n\n' ],
      [ 'pre', [ 10, 18 ], 'pre. two' ] ],
    'named pre'
  );
  t.deepEqual(
    parse('pre.. one\n\ntwo'),
    [ [ EXND, [ 0, 14 ], 'pre.. one\n\ntwo' ],
      [ 'pre', [ 0, 14 ], 'pre.. one\n\ntwo' ] ],
    'extended pre'
  );
  t.end();
});

test('HTML', t => {
  // FIXME: add more tests for singletons!
  t.deepEqual(
    parse('<div>\n<div>\nfoo\n</div>\n</div>'),
    [ [ 'div', [ 0, 29 ], '<div>\n<div>\nfoo\n</div>\n</div>' ],
      [ 'div', [ 6, 22 ], '<div>\nfoo\n</div>' ] ],
    'blocks'
  );
  t.deepEqual(
    parse('<div>\n<ins>\nfoo\n</ins>\n</div>'),
    [ [ 'div', [ 0, 29 ], '<div>\n<ins>\nfoo\n</ins>\n</div>' ],
      [ 'ins', [ 6, 22 ], '<ins>\nfoo\n</ins>' ] ],
    'inlines'
  );
  t.deepEqual(
    parse('<div>\n<code>\nfoo\n</code>\n</div>'),
    [ [ 'div', [ 0, 31 ], '<div>\n<code>\nfoo\n</code>\n</div>' ],
      [ 'code', [ 6, 24 ], '<code>\nfoo\n</code>' ] ],
    'inline code'
  );
  t.deepEqual(
    parse('<div>\n<ins>\n<b>foo</b>\n</ins>\n</div>'),
    [ [ 'div', [ 0, 36 ], '<div>\n<ins>\n<b>foo</b>\n</ins>\n</div>' ],
      [ 'ins', [ 6, 29 ], '<ins>\n<b>foo</b>\n</ins>' ],
      [ 'b', [ 12, 22 ], '<b>foo</b>' ] ],
    'nested inlines'
  );
  t.deepEqual(
    parse('foo\n\n<div>\n<div>\nfoo\n</div>\n</div>'),
    [ [ 'p', [ 0, 5 ], 'foo\n\n' ],
      [ 'div', [ 5, 34 ], '<div>\n<div>\nfoo\n</div>\n</div>' ],
      [ 'div', [ 11, 27 ], '<div>\nfoo\n</div>' ] ],
    'prefixed blocks'
  );
  t.deepEqual(
    parse('foo\n\n<div>\n<ins>\n<b>foo</b>\n</ins>\n</div>'),
    [ [ 'p', [ 0, 5 ], 'foo\n\n' ],
      [ 'div', [ 5, 41 ], '<div>\n<ins>\n<b>foo</b>\n</ins>\n</div>' ],
      [ 'ins', [ 11, 34 ], '<ins>\n<b>foo</b>\n</ins>' ],
      [ 'b', [ 17, 27 ], '<b>foo</b>' ] ],
    'prefixed nested inlines'
  );
  t.deepEqual(
    parse('foo <b /> bar\n\nbaz <b /> foo'),
    [ [ 'p', [ 0, 15 ], 'foo <b /> bar\n\n' ],
      [ 'b', [ 4, 9 ], '<b />' ],
      [ 'p', [ 15, 28 ], 'baz <b /> foo' ],
      [ 'b', [ 19, 24 ], '<b />' ] ],
    'inline singletons'
  );
  t.deepEqual(
    parse('foo\n\n<div />\n\nbar'),
    [ [ 'p', [ 0, 5 ], 'foo\n\n' ],
      [ 'div', [ 5, 14 ], '<div />\n\n' ],
      [ 'p', [ 14, 17 ], 'bar' ] ],
    'prefixed singleton block'
  );
  t.deepEqual(
    parse('<pre>\nfoo\n\nbar\n</pre>\nbaz'),
    [ [ 'pre', [ 0, 22 ], '<pre>\nfoo\n\nbar\n</pre>\n' ],
      [ 'p', [ 22, 25 ], 'baz' ] ],
    'pre block'
  );
  t.deepEqual(
    parse('<style>\nfoo\n\nbar\n</style>\nbaz'),
    [ [ 'style', [ 0, 26 ], '<style>\nfoo\n\nbar\n</style>\n' ],
      [ 'p', [ 26, 29 ], 'baz' ] ],
    'style block'
  );
  t.deepEqual(
    parse('<script>\nfoo\n\nbar\n</script>\nbaz'),
    [ [ 'script', [ 0, 28 ], '<script>\nfoo\n\nbar\n</script>\n' ],
      [ 'p', [ 28, 31 ], 'baz' ] ],
    'script block'
  );
  t.deepEqual(
    parse('<notextile>\nfoo\n\nbar\n</notextile>\nbaz'),
    [ [ 'p', [ 34, 37 ], 'baz' ] ],
    'notextile block'
  );
  t.deepEqual(
    parse('<div>\n<notextile>\n<b>foo</b>\n</notextile>\n</div>'),
    [ [ 'div', [ 0, 48 ], '<div>\n<notextile>\n<b>foo</b>\n</notextile>\n</div>' ],
      [ 'b', [ 18, 28 ], '<b>foo</b>' ] ],
    'notextile inline'
  );
  t.deepEqual(
    parse('<div>\n<code><b>foo</b></code>\n</div>'),
    [ [ 'div', [ 0, 36 ], '<div>\n<code><b>foo</b></code>\n</div>' ],
      [ 'code', [ 6, 29 ], '<code><b>foo</b></code>' ] ],
    'notextile inline'
  );
  t.end();
});

test('HTML comments', t => {
  t.deepEqual(
    parse('one\n\n<!-- comment -->\n\ntwo'),
    [ [ 'p', [ 0, 5 ], 'one\n\n' ],
      [ COMM, [ 5, 23 ], '<!-- comment -->\n\n' ],
      [ 'p', [ 23, 26 ], 'two' ] ],
    'block level comment'
  );
  t.deepEqual(
    parse('<!-- comment -->\n\np. foo'),
    [ [ COMM, [ 0, 18 ], '<!-- comment -->\n\n' ],
      [ 'p', [ 18, 24 ], 'p. foo' ] ],
    'comment prefixes content'
  );
  t.deepEqual(
    parse('p. one\n\n<!-- comment -->\n\np. two'),
    [ [ 'p', [ 0, 8 ], 'p. one\n\n' ],
      [ COMM, [ 8, 26 ], '<!-- comment -->\n\n' ],
      [ 'p', [ 26, 32 ], 'p. two' ] ],
    'comment in between paragraphs'
  );
  t.deepEqual(
    parse('p. one <!-- comment --> two'),
    [ [ 'p', [ 0, 27 ], 'p. one <!-- comment --> two' ],
      [ COMM, [ 7, 23 ], '<!-- comment -->' ] ],
    'inline comment'
  );
  t.end();
});

test('ruler', t => {
  t.deepEqual(
    parse('one\n\n---\n\ntwo'),
    [ [ 'p', [ 0, 5 ], 'one\n\n' ],
      [ 'hr', [ 5, 10 ], '---\n\n' ],
      [ 'p', [ 10, 13 ], 'two' ] ],
    'hr'
  );
  t.end();
});

test('lists', t => {
  t.deepEqual(
    parse('* one\n** two\n* three'),
    [ [ 'ul', [ 0, 6 ], '* one\n' ],
      [ 'li', [ 0, 6 ], '* one\n' ],
      [ 'ul', [ 6, 13 ], '** two\n' ],
      [ 'li', [ 6, 13 ], '** two\n' ],
      [ 'li', [ 13, 20 ], '* three' ] ],
    'unordered'
  );
  t.deepEqual(
    parse('# one\n## two\n# three'),
    [ [ 'ol', [ 0, 6 ], '# one\n' ],
      [ 'li', [ 0, 6 ], '# one\n' ],
      [ 'ol', [ 6, 13 ], '## two\n' ],
      [ 'li', [ 6, 13 ], '## two\n' ],
      [ 'li', [ 13, 20 ], '# three' ] ],
    'ordered'
  );
  t.deepEqual(
    parse('# one\n** two\n# three'),
    [ [ 'ol', [ 0, 6 ], '# one\n' ],
      [ 'li', [ 0, 6 ], '# one\n' ],
      [ 'ul', [ 6, 13 ], '** two\n' ],
      [ 'li', [ 6, 13 ], '** two\n' ],
      [ 'li', [ 13, 20 ], '# three' ] ],
    'mixed'
  );
  t.deepEqual(
    parse('# _one_\n* <b>two</b>'),
    [ [ 'ol', [ 0, 8 ], '# _one_\n' ],
      [ 'li', [ 0, 8 ], '# _one_\n' ],
      [ 'em', [ 2, 7 ], '_one_' ],
      [ 'li', [ 8, 20 ], '* <b>two</b>' ],
      [ 'b', [ 10, 20 ], '<b>two</b>' ] ],
    'with phrase content'
  );
  t.end();
});

test('definition lists', t => {
  t.deepEqual(
    parse(`prefix

- foo := def1
- xyz
- bar := def2
- baz := def3
...*extended* =:

postfix`),
    [ [ 'p', [ 0, 8 ], 'prefix\n\n' ],
      [ 'dl', [ 8, 74 ], '- foo := def1\n- xyz\n- bar := def2\n- baz := def3\n...*extended* =:\n\n' ],
      [ 'dt', [ 8, 14 ], '- foo ' ],
      [ 'dd', [ 14, 22 ], ':= def1\n' ],
      [ 'dt', [ 22, 28 ], '- xyz\n' ],
      [ 'dt', [ 28, 34 ], '- bar ' ],
      [ 'dd', [ 34, 42 ], ':= def2\n' ],
      [ 'dt', [ 42, 48 ], '- baz ' ],
      [ 'dd', [ 48, 74 ], ':= def3\n...*extended* =:\n\n' ],
      [ 'p', [ 51, 69 ], 'def3\n...*extended*' ],
      [ 'br', [ 55, 56 ], '\n' ],
      [ 'strong', [ 59, 69 ], '*extended*' ],
      [ 'p', [ 74, 81 ], 'postfix' ] ],
    'complex with content'
  );
  t.end();
});

test('table', t => {
  t.deepEqual(
    parse(`prefix

table(cls). summary
|^.
|_. a |_. <ins>b</ins> |
|~.
|\\2=. <del>footer</del> |
|-.
| 1 | _2_ |

suffix`),
    [ [ 'p', [ 0, 8 ], 'prefix\n\n' ],
      [ 'table', [ 8, 104 ], 'table(cls). summary\n|^.\n|_. a |_. <ins>b</ins> |\n|~.\n|\\2=. <del>footer</del> |\n|-.\n| 1 | _2_ |\n\n' ],
      [ 'thead', [ 28, 57 ], '|^.\n|_. a |_. <ins>b</ins> |\n' ],
      [ 'tr', [ 32, 57 ], '|_. a |_. <ins>b</ins> |\n' ],
      [ 'th', [ 32, 38 ], '|_. a ' ],
      [ 'th', [ 38, 55 ], '|_. <ins>b</ins> ' ],
      [ 'ins', [ 42, 54 ], '<ins>b</ins>' ],
      [ 'tfoot', [ 57, 87 ], '|~.\n|\\2=. <del>footer</del> |\n' ],
      [ 'tr', [ 61, 87 ], '|\\2=. <del>footer</del> |\n' ],
      [ 'td', [ 61, 85 ], '|\\2=. <del>footer</del> ' ],
      [ 'del', [ 67, 84 ], '<del>footer</del>' ],
      [ 'tbody', [ 87, 104 ], '|-.\n| 1 | _2_ |\n\n' ],
      [ 'tr', [ 91, 103 ], '| 1 | _2_ |\n' ],
      [ 'td', [ 91, 95 ], '| 1 ' ],
      [ 'td', [ 95, 101 ], '| _2_ ' ],
      [ 'em', [ 97, 100 ], '_2_' ],
      [ 'p', [ 104, 110 ], 'suffix' ] ],
    'complex with content'
  );
  t.end();
});

test('inline tags', t => {
  t.deepEqual(
    parse('one *two* three'),
    [ [ 'p', [ 0, 15 ], 'one *two* three' ],
      [ 'strong', [ 4, 9 ], '*two*' ] ],
    'strong'
  );
  t.deepEqual(
    parse('one **two** three'),
    [ [ 'p', [ 0, 17 ], 'one **two** three' ],
      [ 'b', [ 4, 11 ], '**two**' ] ],
    'b'
  );
  t.deepEqual(
    parse('one _two_ three'),
    [ [ 'p', [ 0, 15 ], 'one _two_ three' ],
      [ 'em', [ 4, 9 ], '_two_' ] ],
    'em'
  );
  t.deepEqual(
    parse('one __two__ three'),
    [ [ 'p', [ 0, 17 ], 'one __two__ three' ],
      [ 'i', [ 4, 11 ], '__two__' ] ],
    'i'
  );
  t.deepEqual(
    parse('one -two- three'),
    [ [ 'p', [ 0, 15 ], 'one -two- three' ],
      [ 'del', [ 4, 9 ], '-two-' ] ],
    'del'
  );
  t.deepEqual(
    parse('one @two@ three'),
    [ [ 'p', [ 0, 15 ], 'one @two@ three' ],
      [ 'code', [ 4, 9 ], '@two@' ] ],
    'code'
  );
  t.deepEqual(
    parse('one ~two~ three'),
    [ [ 'p', [ 0, 15 ], 'one ~two~ three' ],
      [ 'sub', [ 4, 9 ], '~two~' ] ],
    'sub'
  );
  t.deepEqual(
    parse('one ^two^ three'),
    [ [ 'p', [ 0, 15 ], 'one ^two^ three' ],
      [ 'sup', [ 4, 9 ], '^two^' ] ],
    'sup'
  );
  t.deepEqual(
    parse('one %two% three'),
    [ [ 'p', [ 0, 15 ], 'one %two% three' ],
      [ 'span', [ 4, 9 ], '%two%' ] ],
    'span'
  );
  t.deepEqual(
    parse('one +two+ three'),
    [ [ 'p', [ 0, 15 ], 'one +two+ three' ],
      [ 'ins', [ 4, 9 ], '+two+' ] ],
    'ins'
  );
  t.deepEqual(
    parse('one ??two?? three'),
    [ [ 'p', [ 0, 17 ], 'one ??two?? three' ],
      [ 'cite', [ 4, 11 ], '??two??' ] ],
    'cite'
  );
  t.deepEqual(
    parse('one [*two*] three'),
    [ [ 'p', [ 0, 17 ], 'one [*two*] three' ],
      [ 'strong', [ 4, 11 ], '[*two*]' ] ],
    'fenced strong'
  );
  t.deepEqual(
    parse('one [**two**] three'),
    [ [ 'p', [ 0, 19 ], 'one [**two**] three' ],
      [ 'b', [ 4, 13 ], '[**two**]' ] ],
    'fenced b'
  );
  t.deepEqual(
    parse('one [@two@] three'),
    [ [ 'p', [ 0, 17 ], 'one [@two@] three' ],
      [ 'code', [ 4, 11 ], '[@two@]' ] ],
    'fenced code'
  );
  t.end();
});

test('linebreak', t => {
  t.deepEqual(
    parse('one\ntwo\nthree'),
    [ [ 'p', [ 0, 13 ], 'one\ntwo\nthree' ],
      [ 'br', [ 3, 4 ], '\n' ],
      [ 'br', [ 7, 8 ], '\n' ] ],
    'breaks'
  );
  t.end();
});

test('image', t => {
  t.deepEqual(
    parse('one !/carver.png! three'),
    [ [ 'p', [ 0, 23 ], 'one !/carver.png! three' ],
      [ 'img', [ 4, 17 ], '!/carver.png!' ] ],
    'basic image'
  );
  t.deepEqual(
    parse('one !/carver.png!:link three'),
    [ [ 'p', [ 0, 28 ], 'one !/carver.png!:link three' ],
      [ 'a', [ 4, 22 ], '!/carver.png!:link' ],
      [ 'img', [ 4, 17 ], '!/carver.png!' ] ],
    'image with link'
  );
  t.end();
});

test('abbreviations', t => {
  t.deepEqual(
    parse('one HTML two'),
    [ [ 'p', [ 0, 12 ], 'one HTML two' ],
      [ 'span', [ 4, 8 ], 'HTML' ] ],
    'smallcaps'
  );
  t.deepEqual(
    parse('one HTML(def) two'),
    [ [ 'p', [ 0, 17 ], 'one HTML(def) two' ],
      [ 'abbr', [ 4, 13 ], 'HTML(def)' ],
      [ 'span', [ 4, 13 ], 'HTML(def)' ] ],
    'acronym'
  );
  t.end();
});

test('link', t => {
  t.deepEqual(
    parse('one "foo":bar three'),
    [ [ 'p', [ 0, 19 ], 'one "foo":bar three' ],
      [ 'a', [ 4, 13 ], '"foo":bar' ] ],
    'basic link'
  );
  t.deepEqual(
    parse('foo "one _two_ three":url bar'),
    [ [ 'p', [ 0, 29 ], 'foo "one _two_ three":url bar' ],
      [ 'a', [ 4, 25 ], '"one _two_ three":url' ],
      [ 'em', [ 9, 14 ], '_two_' ] ],
    'basic link'
  );
  t.end();
});
