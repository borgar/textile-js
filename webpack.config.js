// var mod = require('./package.json');
var path = require( 'path' );
var webpack = require( 'webpack' );

var env = process.env.WEBPACK_ENV;
var plugins = [];
var ext = '.js';

if ( env === 'min' ) {
  var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
  plugins.push( new UglifyJsPlugin({ 'minimize': true }) );
  ext = '.min.js';
}

module.exports = {
  'entry': path.resolve( './src/index.js' ),
  'devtool': 'source-map',
  'output': {
    'path': path.resolve( './lib' ),
    'filename': 'textile' + ext,
    'library': 'textile',
    'libraryTarget': 'umd',
    'umdNamedDefine': true
  },
  'plugins': plugins,
  'module': {
    'loaders': [
      {
        'test': /\.js$/,
        'loader': 'babel',
        'exclude': /(node_modules|bower_components)/,
        'query': {
          'presets': ['es2015'],
          'plugins': ['babel-plugin-add-module-exports']
        }
      },
      {
        'test': /\.js$/,
        'loader': 'eslint-loader',
        'exclude': /node_modules/
      }
    ]
  },
  'resolve': {
    'root': path.resolve( './src' ),
    'extensions': [ '', '.js' ]
  }
};
