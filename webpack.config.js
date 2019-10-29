/* globals process */
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const env = process.env.WEBPACK_ENV;
const plugins = [];
let ext = '.js';

if (env === 'min') {
  plugins.push(new UglifyJsPlugin());
  ext = '.min.js';
}

module.exports = {
  mode: 'production',
  entry: path.resolve('./src/index.js'),
  devtool: 'source-map',
  output: {
    path: path.resolve('./lib'),
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
