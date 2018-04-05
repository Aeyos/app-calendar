const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: './src/main.jsx',
  output: {
    path: __dirname,
    filename: 'public/js/bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({ use: 'css-loader' }),
      },
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        },
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin('public/css/styles.css'),
    new webpack.EnvironmentPlugin({ NODE_ENV: 'development' }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [__dirname, 'node_modules'],
  },
};
