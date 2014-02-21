/*
 * This file implements a subset of the QUnit functions/features to allow 
 * running simple QUnit tests in Node.JS.
 *
 * Copyright (c) 2012 Borgar Þorsteinsson
 * Licensed under the terms of the MIT (LICENSE.txt) software license.
 *
 */

// set up environment:
var textile = require('../lib/textile.js');

// add some test files:
var $testfiles = [
  'converted/basic.js',
//  'converted/code.js',
//  'converted/definitions.js',
  'converted/extra_whitespace.js',
  'converted/filter_pba.js',
//  'converted/html.js',
  'converted/images.js',
//  'converted/instiki.js',
  'converted/links.js',
  'converted/poignant.js',
  'converted/table.js',
  'converted/textism.js',
  'converted/threshold.js',
  'block_comments.js',
  'jstextile-tests.js',
  'options.js'
];


/* -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

var $tests = [];
$tests.current_test;

function expect ( num ) {
  $tests.current_test.expected = num;
}

function ok ( value, message ) {
  $tests.current_test.results.push([ !!value, message ]);
}

function equal ( rest, exp, msg ) {
  try {
    require('assert').equal(rest, exp);
  }
  catch ( err ) {
    $tests.current_test.results.push([ false, msg + ', expected: ' + exp + ' result: ' + rest ]);
    return;
  }
  $tests.current_test.results.push([ true, msg ]);
}

function deepEqual ( rest, exp, msg ) {
  try {
    require('assert').deepEqual(rest, exp);
  }
  catch ( err ) {
    $tests.current_test.results.push([ false, msg + ', expected: ' + exp + ' result: ' + rest ]);
    return;
  }
  $tests.current_test.results.push([ true, msg ]);
}

function test ( testName /*, expected, callback, async */ ) {

  var tmap = {
    'object':'environment', 
    'boolean':'async',
    'function':'callback',
    'number':'expected'
  };

  $tests.current_test = {
    name: testName,
    expected: null,
    callback: null,
    context: {},
    async: false,  // TODO: async doesn't actually do anything :-/
    error: false,
    results: []
  };
  $tests.push( $tests.current_test );
  
  for (var i=1,l=arguments.length; i<l; i++) {
    $tests.current_test[ tmap[ typeof arguments[i] ] || 'error' ] = arguments[i];
  }
  try {
    $tests.current_test.callback.call( $tests.current_test.context );
  }
  catch ( err ) {
    $tests.current_test.results.push([ false, err ]);
  }

  if ( $tests.current_test.expected ) {
    if ( $tests.current_test.expected != $tests.current_test.results.length ) {
      $tests.current_test.results.push([ false, 'Expected ' + $tests.current_test.expected + ' assertions, but ' + $tests.current_test.results.length + ' were run' ]);
    }
  }
  
}


// ------------
// -- runner --
// ------------

// load tests - done first so it won't affect time measurement

$testfiles = $testfiles.map(function ( fn ) {
  var full_fn = require('path').join( __dirname, fn );
  try {
    return {
      script: require('fs').readFileSync( full_fn, 'utf8' ),
      filename: fn,
    };
  }
  catch ( err ) {
    console.log( 'Critical failure: Cannot load %s', fn );
    process.exit(1);
  }
});


console.log( '' ); // padding 
console.time( 'Tests total time' ); // time the run

// run the tests

$testfiles.forEach(function ( $test ) {
  try {
    eval( $test.script );
  }
  catch ( err ) {
    console.log( 'Critical failure in %s', $test.filename );
    console.log( err.message );
    console.log( err.stack );
    process.exit(1);
  }
});


// report outcome

(function(){

  function pad ( s, l ) {
    s = l + s;
    return s.substr( s.length - l.length, l.length );  
  }
  var total_ok = 0, total_fail = 0, total_tests = 0;
  for (var t=0,tl=$tests.length; t<tl; t++) {

    var test = $tests[t];
    var report = [];
    var ok = 0, fail = 0;

    for (var r=0,rl=test.results.length; r<rl; r++) {
      var res = test.results[r];
      if ( res[0] ) {
        ok++;
        total_ok++;
      }
      else {
        fail++;
        total_fail++;
      }
      report.push( '    %s. %s%s',
          pad(r,'    '), res[0]?'':'[FAIL]: ', res[1] );
    }

    total_tests += test.results.length;

    console.log( '%s. %s (%s, %s, %s)', 
        pad( t, '    ' ), test.name, fail, ok, test.results.length );

    if ( fail ) {
      console.log( report.join('\n') );
      console.log('');
    }

  }
  console.log( '' );
  console.timeEnd( 'Tests total time' );
  console.log( '%s tests of %s passed, %s failed',
                    total_ok, total_tests, total_fail );

})();
