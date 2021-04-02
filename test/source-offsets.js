import test from 'tape';
import { parseTree, Element } from '../src/index.js';

function parse (tx) {
  const tree = parseTree(tx);
  const struct = [];

  tree.visit(node => {
    if (node instanceof Element) {
      if (node.tagName === 'root') { return; }
      const offset = node.pos ? node.pos.offset : null;
      const source = tx.slice(offset, offset + 40).replace(/(\n)[^\0]*$/, '$1');
      struct.push([
        node.tagName,
        offset,
        source
      ]);
    }
  });

  return struct;
}

test('p', t => {
  t.deepEqual(
    parse('one\n\ntwo'),
    [ [ 'p', 0, 'one\n' ],
      [ 'p', 5, 'two' ] ],
    'auto paragraphs'
  );
  t.deepEqual(
    parse('p. one\n\np. two'),
    [ [ 'p', 0, 'p. one\n' ],
      [ 'p', 8, 'p. two' ] ],
    'named paragraphs'
  );
  t.deepEqual(
    parse('p.. one\n\ntwo'),
    [ [ 'p', 0, 'p.. one\n' ],
      [ 'p', 9, 'two' ] ],
    'extended paragraph'
  );
  t.end();
});

test('###', t => {
  t.deepEqual(
    parse('one\n\n###. comment\n\ntwo'),
    [ [ 'p', 0, 'one\n' ],
      [ 'p', 19, 'two' ] ],
    'named comment'
  );
  t.deepEqual(
    parse('###.. one\n\ntwo\n\np. foo'),
    [ [ 'p', 16, 'p. foo' ] ],
    'extended comment'
  );
  t.deepEqual(
    parse('p. one\n\n###. comment\n\np. two'),
    [ [ 'p', 0, 'p. one\n' ],
      [ 'p', 22, 'p. two' ] ],
    'comment in between paragraphs'
  );
  const tree = parseTree('one\n\n###. comment\n\ntwo');
  const comment = tree.children[2];
  t.is(comment.nodeType, Element.HIDDEN_NODE, 'comment exists in ast (nodeType)');
  t.is(comment.data, 'comment', 'comment exists in ast (data)');
  t.is(comment.pos.offset, 5, 'comment exists in ast (offset)');
  t.end();
});

test('bc', t => {
  t.deepEqual(
    parse('bc. one\n\nbc. two'),
    [ [ 'pre', 0, 'bc. one\n' ],
      [ 'code', 0, 'bc. one\n' ],
      [ 'pre', 9, 'bc. two' ],
      [ 'code', 9, 'bc. two' ] ]
  );
  t.deepEqual(
    parse('bc.. one\n\ntwo'),
    [ [ 'pre', 0, 'bc.. one\n' ],
      [ 'code', 0, 'bc.. one\n' ] ]
  );
  t.end();
});

test('bq', t => {
  t.deepEqual(
    parse('bq. one\n\nbq. two'),
    [ [ 'blockquote', 0, 'bq. one\n' ],
      [ 'p', 4, 'one\n' ],
      [ 'blockquote', 9, 'bq. two' ],
      [ 'p', 13, 'two' ] ]
  );
  t.deepEqual(
    parse('bq.. one\n\ntwo'),
    [ [ 'blockquote', 0, 'bq.. one\n' ],
      [ 'p', 5, 'one\n' ],
      [ 'p', 10, 'two' ] ]
  );
  t.end();
});

test('fn#', t => {
  t.deepEqual(
    parse('fn1. one\n\nfn1. two'),
    [ [ 'p', 5, 'one\n' ],
      [ 'a', 5, 'one\n' ],
      [ 'sup', 5, 'one\n' ],
      [ 'p', 15, 'two' ],
      [ 'a', 15, 'two' ],
      [ 'sup', 15, 'two' ] ],
    'named footnote'
  );
  t.deepEqual(
    parse('fn1.. one\n\ntwo'),
    [ [ 'p', 6, 'one\n' ],
      [ 'a', 6, 'one\n' ],
      [ 'sup', 6, 'one\n' ],
      [ 'br', 9, '\n' ] ],
    'extended footnote'
  );
  t.deepEqual(
    parse('one[1] two'),
    [ [ 'p', 0, 'one[1] two' ],
      [ 'sup', 3, '[1] two' ],
      [ 'a', 3, '[1] two' ] ],
    'footnote reference'
  );
  t.end();
});

test('h#', t => {
  t.deepEqual(
    parse('h1. one\n\nh1. two'),
    [ [ 'h1', 0, 'h1. one\n' ],
      [ 'h1', 9, 'h1. two' ] ],
    'h1'
  );
  t.deepEqual(
    parse('h1.. one\n\ntwo'),
    [ [ 'h1', 0, 'h1.. one\n' ],
      [ 'h1', 10, 'two' ] ],
    'h1 extended'
  );
  t.deepEqual(
    parse('h2. one\n\nh2. two'),
    [ [ 'h2', 0, 'h2. one\n' ],
      [ 'h2', 9, 'h2. two' ] ],
    'h2'
  );
  t.deepEqual(
    parse('h2.. one\n\ntwo'),
    [ [ 'h2', 0, 'h2.. one\n' ],
      [ 'h2', 10, 'two' ] ],
    'h2 extended'
  );
  t.deepEqual(
    parse('h3. one\n\nh3. two'),
    [ [ 'h3', 0, 'h3. one\n' ],
      [ 'h3', 9, 'h3. two' ] ],
    'h3'
  );
  t.deepEqual(
    parse('h3.. one\n\ntwo'),
    [ [ 'h3', 0, 'h3.. one\n' ],
      [ 'h3', 10, 'two' ] ],
    'h3 extended'
  );
  t.deepEqual(
    parse('h4. one\n\nh4. two'),
    [ [ 'h4', 0, 'h4. one\n' ],
      [ 'h4', 9, 'h4. two' ] ],
    'h4'
  );
  t.deepEqual(
    parse('h4.. one\n\ntwo'),
    [ [ 'h4', 0, 'h4.. one\n' ],
      [ 'h4', 10, 'two' ] ],
    'h4 extended'
  );
  t.end();
});

test('notextile', t => {
  t.deepEqual(
    parse('notextile. <b>one</b>\n\np. <b>two</b>'),
    [ [ 'b', 11, '<b>one</b>\n' ],
      [ 'p', 23, 'p. <b>two</b>' ],
      [ 'b', 26, '<b>two</b>' ] ],
    'notextile block'
  );
  t.deepEqual(
    parse('p.. one\n\nnotextile. <b>middle</b>\n\ntwo'),
    [ [ 'p', 0, 'p.. one\n' ],
      [ 'b', 20, '<b>middle</b>\n' ],
      [ 'p', 35, 'two' ] ],
    'notextile in between paragraphs'
  );
  t.deepEqual(
    parse('notextile.. <b>one</b>\n\n<b>two</b>'),
    [ [ 'b', 12, '<b>one</b>\n' ],
      [ 'b', 24, '<b>two</b>' ] ],
    'extended notextile block'
  );
  t.end();
});

test('pre', t => {
  t.deepEqual(
    parse('pre. one\n\npre. two'),
    [ [ 'pre', 0, 'pre. one\n' ],
      [ 'pre', 10, 'pre. two' ] ],
    'named pre'
  );
  t.deepEqual(
    parse('pre.. one\n\ntwo'),
    [ [ 'pre', 0, 'pre.. one\n' ] ],
    'extended pre'
  );
  t.end();
});

test('HTML', t => {
  t.deepEqual(
    parse('<div>\n<div>\nfoo\n</div>\n</div>'),
    [ [ 'div', 0, '<div>\n' ],
      [ 'div', 6, '<div>\n' ] ],
    'blocks'
  );
  t.deepEqual(
    parse('<div>\n<ins>\nfoo\n</ins>\n</div>'),
    [ [ 'div', 0, '<div>\n' ],
      [ 'ins', 6, '<ins>\n' ] ],
    'inlines'
  );
  t.deepEqual(
    parse('<div>\n<code>\nfoo\n</code>\n</div>'),
    [ [ 'div', 0, '<div>\n' ],
      [ 'code', 6, '<code>\n' ] ],
    'inline code'
  );
  t.deepEqual(
    parse('<div>\n<ins>\n<b>foo</b>\n</ins>\n</div>'),
    [ [ 'div', 0, '<div>\n' ],
      [ 'ins', 6, '<ins>\n' ],
      [ 'b', 12, '<b>foo</b>\n' ] ],
    'nested inlines'
  );
  t.deepEqual(
    parse('foo\n\n<div>\n<div>\nfoo\n</div>\n</div>'),
    [ [ 'p', 0, 'foo\n' ],
      [ 'div', 5, '<div>\n' ],
      [ 'div', 11, '<div>\n' ] ],
    'prefixed blocks'
  );
  t.deepEqual(
    parse('foo\n\n<div>\n<div>\n<b>foo</b>\n</div>\n</div>'),
    [ [ 'p', 0, 'foo\n' ],
      [ 'div', 5, '<div>\n' ],
      [ 'div', 11, '<div>\n' ],
      [ 'b', 17, '<b>foo</b>\n' ] ],
    'prefixed nested inlines'
  );
  t.deepEqual(
    parse('foo <b /> bar\n\nbaz <b /> foo'),
    [ [ 'p', 0, 'foo <b /> bar\n' ],
      [ 'b', 4, '<b /> bar\n' ],
      [ 'p', 15, 'baz <b /> foo' ],
      [ 'b', 19, '<b /> foo' ] ],
    'inline singletons'
  );
  t.deepEqual(
    parse('<pre>\nfoo\n\nbar\n</pre>\nbaz'),
    [ [ 'pre', 0, '<pre>\n' ],
      [ 'p', 22, 'baz' ] ],
    'pre block'
  );
  t.deepEqual(
    parse('<style>\nfoo\n\nbar\n</style>\nbaz'),
    [ [ 'style', 0, '<style>\n' ],
      [ 'p', 26, 'baz' ] ],
    'style block'
  );
  t.deepEqual(
    parse('<script>\nfoo\n\nbar\n</script>\nbaz'),
    [ [ 'script', 0, '<script>\n' ],
      [ 'p', 28, 'baz' ] ],
    'script block'
  );
  t.deepEqual(
    parse('<notextile>\nfoo\n\nbar\n</notextile>\nbaz'),
    [ [ 'p', 34, 'baz' ] ],
    'notextile block'
  );
  t.deepEqual(
    parse('<div>\n<notextile>\n<b>foo</b>\n</notextile>\n</div>'),
    [ [ 'div', 0, '<div>\n' ],
      [ 'b', 18, '<b>foo</b>\n' ] ],
    'notextile inline'
  );
  t.deepEqual(
    parse('<div>\n<code><b>foo</b></code>\n</div>'),
    [ [ 'div', 0, '<div>\n' ],
      [ 'code', 6, '<code><b>foo</b></code>\n' ] ],
    'notextile inline'
  );
  t.end();
});

test('HTML comments', t => {
  t.deepEqual(
    parse('one\n\n<!-- comment -->\n\ntwo'),
    [ [ 'p', 0, 'one\n' ],
      [ 'p', 23, 'two' ] ],
    'block level comment'
  );
  t.deepEqual(
    parse('<!-- comment -->\n\np. foo'),
    [ [ 'p', 18, 'p. foo' ] ],
    'comment prefixes content'
  );
  t.deepEqual(
    parse('p. one\n\n<!-- comment -->\n\np. two'),
    [ [ 'p', 0, 'p. one\n' ],
      [ 'p', 26, 'p. two' ] ],
    'comment in between paragraphs'
  );
  t.deepEqual(
    parse('p. one <!-- comment --> two'),
    [ [ 'p', 0, 'p. one <!-- comment --> two' ] ],
    'inline comment'
  );
  t.end();
});

test('ruler', t => {
  t.deepEqual(
    parse('one\n\n---\n\ntwo'),
    [ [ 'p', 0, 'one\n' ],
      [ 'hr', 5, '---\n' ],
      [ 'p', 10, 'two' ] ],
    'hr'
  );
  t.end();
});

test('lists', t => {
  t.deepEqual(
    parse('* one\n** two\n* three'),
    [ [ 'ul', 0, '* one\n' ],
      [ 'li', 0, '* one\n' ],
      [ 'ul', 6, '** two\n' ],
      [ 'li', 6, '** two\n' ],
      [ 'li', 13, '* three' ] ],
    'unordered'
  );
  t.deepEqual(
    parse('# one\n## two\n# three'),
    [ [ 'ol', 0, '# one\n' ],
      [ 'li', 0, '# one\n' ],
      [ 'ol', 6, '## two\n' ],
      [ 'li', 6, '## two\n' ],
      [ 'li', 13, '# three' ] ],
    'ordered'
  );
  t.deepEqual(
    parse('# one\n** two\n# three'),
    [ [ 'ol', 0, '# one\n' ],
      [ 'li', 0, '# one\n' ],
      [ 'ul', 6, '** two\n' ],
      [ 'li', 6, '** two\n' ],
      [ 'li', 13, '# three' ] ],
    'mixed'
  );
  t.deepEqual(
    parse('# _one_\n* <b>two</b>'),
    [ [ 'ol', 0, '# _one_\n' ],
      [ 'li', 0, '# _one_\n' ],
      [ 'em', 2, '_one_\n' ],
      [ 'li', 8, '* <b>two</b>' ],
      [ 'b', 10, '<b>two</b>' ] ],
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
...*extended* =:`),
    [ [ 'p', 0, 'prefix\n' ],
      [ 'dl', 8, '- foo := def1\n' ],
      [ 'dt', 8, '- foo := def1\n' ],
      [ 'dd', 14, ':= def1\n' ],
      [ 'dt', 22, '- xyz\n' ],
      [ 'dt', 22, '- xyz\n' ],
      [ 'dd', 34, ':= def2\n' ],
      [ 'dt', 42, '- baz := def3\n' ],
      [ 'dd', 48, ':= def3\n' ],
      [ 'p', 51, 'def3\n' ],
      [ 'br', 55, '\n' ],
      [ 'strong', 59, '*extended* =:' ] ],
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
    [ [ 'p', 0, 'prefix\n' ],
      [ 'table', 8, 'table(cls). summary\n' ],
      [ 'thead', 28, '|^.\n' ],
      [ 'tr', 32, '|_. a |_. <ins>b</ins> |\n' ],
      [ 'th', 32, '|_. a |_. <ins>b</ins> |\n' ],
      [ 'th', 38, '|_. <ins>b</ins> |\n' ],
      [ 'ins', 42, '<ins>b</ins> |\n' ],
      [ 'tfoot', 57, '|~.\n' ],
      [ 'tr', 61, '|\\2=. <del>footer</del> |\n' ],
      [ 'td', 61, '|\\2=. <del>footer</del> |\n' ],
      [ 'del', 67, '<del>footer</del> |\n' ],
      [ 'tbody', 87, '|-.\n' ],
      [ 'tr', 91, '| 1 | _2_ |\n' ],
      [ 'td', 91, '| 1 | _2_ |\n' ],
      [ 'td', 95, '| _2_ |\n' ],
      [ 'em', 97, '_2_ |\n' ],
      [ 'p', 104, 'suffix' ] ],
    'complex with content'
  );
  t.end();
});

test('inline tags', t => {
  t.deepEqual(
    parse('one *two* three'),
    [ [ 'p', 0, 'one *two* three' ],
      [ 'strong', 4, '*two* three' ] ],
    'strong'
  );
  t.deepEqual(
    parse('one **two** three'),
    [ [ 'p', 0, 'one **two** three' ],
      [ 'b', 4, '**two** three' ] ],
    'b'
  );
  t.deepEqual(
    parse('one _two_ three'),
    [ [ 'p', 0, 'one _two_ three' ],
      [ 'em', 4, '_two_ three' ] ],
    'em'
  );
  t.deepEqual(
    parse('one __two__ three'),
    [ [ 'p', 0, 'one __two__ three' ],
      [ 'i', 4, '__two__ three' ] ],
    'i'
  );
  t.deepEqual(
    parse('one -two- three'),
    [ [ 'p', 0, 'one -two- three' ],
      [ 'del', 4, '-two- three' ] ],
    'del'
  );
  t.deepEqual(
    parse('one @two@ three'),
    [ [ 'p', 0, 'one @two@ three' ],
      [ 'code', 4, '@two@ three' ] ],
    'code'
  );
  t.deepEqual(
    parse('one ~two~ three'),
    [ [ 'p', 0, 'one ~two~ three' ],
      [ 'sub', 4, '~two~ three' ] ],
    'sub'
  );
  t.deepEqual(
    parse('one ^two^ three'),
    [ [ 'p', 0, 'one ^two^ three' ],
      [ 'sup', 4, '^two^ three' ] ],
    'sup'
  );
  t.deepEqual(
    parse('one %two% three'),
    [ [ 'p', 0, 'one %two% three' ],
      [ 'span', 4, '%two% three' ] ],
    'span'
  );
  t.deepEqual(
    parse('one +two+ three'),
    [ [ 'p', 0, 'one +two+ three' ],
      [ 'ins', 4, '+two+ three' ] ],
    'ins'
  );
  t.deepEqual(
    parse('one ??two?? three'),
    [ [ 'p', 0, 'one ??two?? three' ],
      [ 'cite', 4, '??two?? three' ] ],
    'cite'
  );
  t.end();
});

test('linebreak', t => {
  t.deepEqual(
    parse('one\ntwo\nthree'),
    [ [ 'p', 0, 'one\n' ],
      [ 'br', 3, '\n' ],
      [ 'br', 7, '\n' ] ],
    'breaks'
  );
  t.end();
});

test('image', t => {
  t.deepEqual(
    parse('one !/carver.png! three'),
    [ [ 'p', 0, 'one !/carver.png! three' ],
      [ 'img', 4, '!/carver.png! three' ] ],
    'basic image'
  );
  t.deepEqual(
    parse('one !/carver.png!:link three'),
    [ [ 'p', 0, 'one !/carver.png!:link three' ],
      [ 'a', 4, '!/carver.png!:link three' ],
      [ 'img', 4, '!/carver.png!:link three' ] ],
    'image with link'
  );
  t.end();
});

test('abbreviations', t => {
  t.deepEqual(
    parse('one HTML two'),
    [ [ 'p', 0, 'one HTML two' ],
      [ 'span', 4, 'HTML two' ] ],
    'smallcaps'
  );
  t.deepEqual(
    parse('one HTML(def) two'),
    [ [ 'p', 0, 'one HTML(def) two' ],
      [ 'abbr', 4, 'HTML(def) two' ],
      [ 'span', 4, 'HTML(def) two' ] ],
    'acronym'
  );
  t.end();
});

test('link', t => {
  t.deepEqual(
    parse('one "foo":bar three'),
    [ [ 'p', 0, 'one "foo":bar three' ],
      [ 'a', 4, '"foo":bar three' ] ],
    'basic link'
  );
  t.deepEqual(
    parse('foo "one _two_ three":url bar'),
    [ [ 'p', 0, 'foo "one _two_ three":url bar' ],
      [ 'a', 4, '"one _two_ three":url bar' ],
      [ 'em', 9, '_two_ three":url bar' ] ],
    'basic link'
  );
  t.end();
});
