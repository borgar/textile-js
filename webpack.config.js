const path = require( 'path' );
const TerserPlugin = require('terser-webpack-plugin');
const WebpackAutoInject = require( 'webpack-auto-inject-version' );

const env = process.env.WEBPACK_ENV;
const plugins = [];
let ext = '.js';

if ( env === 'min' ) {
  plugins.push( new TerserPlugin() );
  ext = '.min.js';
}
plugins.push(
  new WebpackAutoInject({
    SHORT: 'textile-js | https://github.com/GehDoc/textile-js',
    PACKAGE_JSON_PATH: './package.json',
    components: {
      InjectAsComment: true
    },
    componentsOptions: {
      InjectAsComment: {
        tag: 'Build version: {version} - {date}', // default
        dateFormat: 'isoDateTime',
        multiLineCommentType: false // default
      }
    }
  })
);

module.exports = {
  mode: 'production',
  entry: path.resolve( './src/index.js' ),
  devtool: 'source-map',
  output: {
    path: path.resolve( './lib' ),
    filename: 'textile' + ext,
    library: 'textile',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    globalObject: 'this'
  },
  optimization: {
    minimizer: plugins
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [ [ '@babel/preset-env', {
              targets: {
                browsers: [
                  '>0.25%', 'not op_mini all'
                ]
              }
            } ] ]
          }
        }
      }
    ]
  }
};
