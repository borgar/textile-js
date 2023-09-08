import path from 'path';
import TerserPlugin from 'terser-webpack-plugin';

export default {
  mode: 'production',
  entry: path.resolve('./src/index.js'),
  devtool: 'source-map',
  output: {
    path: path.resolve('./lib'),
    filename: 'textile.js',
    library: 'textile',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    globalObject: 'this'
  },
  optimization: {
    minimize: true,
    minimizer: [ new TerserPlugin({ extractComments: false }) ]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
};
