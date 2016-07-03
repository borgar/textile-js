function getJSON ( file ) {
  return JSON.parse( require( 'fs' ).readFileSync( file, 'utf8' ) );
}

function fail ( err ) {
  console.log( err );
  process.exit( 1 );
}

function exec ( cmd, callback ) {
  require( 'child_process' ).exec( cmd, function ( err, stdout, stderr ) {
    if ( err ) { fail( err ); }
    callback && callback( stdout, stderr );
  });
}

const packg = getJSON( 'package.json' );
const bower = getJSON( 'bower.json' );
const version = packg.version;
const http = require( 'http' );

// ensure bower and npm versions are the same
if ( bower.version !== version ) {
  fail( 'Bower and NPM versions don\'t match' );
}

// is tagging needed?
const tagname = `v${ version }`;
exec( `git tag --list ${ tagname }`, o => {
  if ( o.split( '\n' ).filter( Boolean )[ 0 ] ) {
    // already tagged, we're done here
    updateNPM();
  }
  else {
    const tag = `git tag -a ${ tagname } -m 'Version ${ tagname }'`;
    exec( tag, o => {
      // push new tag to github
      exec( `git push origin ${ tagname }`, updateNPM );
    });
  }
});

// update NPM with latest
function updateNPM () {
  http.request({ 'host': 'registry.npmjs.org', 'path': '/' + packg.name },
    response => {
      let str = '';
      response.on( 'data', d => ( str += d ) );
      response.on( 'end', () => {
        const npmInfo = JSON.parse( str );
        if ( version !== npmInfo['dist-tags'].latest ) {
          // latest is not this version - so we can push a new one
          exec( 'npm publish .' );
        }
      });
    })
    .end();
}
