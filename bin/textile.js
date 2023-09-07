#!/usr/bin/env node
/* globals process */
import fs from 'fs';
import textile from '../src/index.js';

// clean arguments
const args = [];
process.argv.slice(2).forEach(function (m, i, s) {
  if ((s = /^([^=]+)=(.*)$/.exec(m))) {
    args.push(s[1], s[2]);
  }
  else {
    args.push(m);
  }
});

// parse arguments
const options = {};
while (args.length) {
  const arg = args.shift();
  if (arg === '-i' || arg === '--input') {
    options.input = args.shift();
  }
  else if (arg === '-o' || arg === '--output') {
    options.output = args.shift();
  }
  else {
    if (!options.files) { options.files = []; }
    options.files.push(arg);
  }
}

// input overrides file arguments
if (options.input) {
  options.files = [ options.input ];
}

// writer
let data = '';
function writeData () {
  const output = textile(data);
  if (options.output) {
    fs.writeFileSync(options.output, output);
  }
  else {
    process.stdout.write(output + '\n');
  }
}

// file or stdin?
if (options.files) {
  data = fs.readFileSync(options.files[0], 'utf8');
  writeData();
}
else {
  const stdin = process.stdin;
  stdin.setEncoding('utf8');
  stdin.on('data', text => (data += text));
  stdin.on('end', writeData);
  stdin.resume();
}
