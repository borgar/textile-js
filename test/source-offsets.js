import test from 'tape';
import { parseTree } from '../src/index.js';

function simplify (node) {
  const tag = node.tagName || 'ROOT';
  let children = node.children && node.children.filter(d => d.nodeType === 1);
  if (children && children.length) {
    children = children.map(simplify);
    return [ tag, node.pos.offset, children ];
  }
  return [ tag, node.pos.offset ];
}

function parse (tx) {
  const tree = parseTree(tx);
  return simplify(tree);
}

test('paragraph', t => {
  t.deepEqual(
    parse('one\n\ntwo'),
    [ 'ROOT', 0, [ [ 'p', 0 ], [ 'p', 5 ] ] ]
  );
  t.deepEqual(
    parse('p. one\n\np. two'),
    [ 'ROOT', 0, [ [ 'p', 0 ], [ 'p', 8 ] ] ]
  );
  t.end();
});
