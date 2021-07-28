const path = require('path');

module.exports = {
  devtool: 'inline-source-map',
  entry: require.resolve('./index.ts'),
  mode: 'development',
  module: {
    rules: [
      { test: /\.ts$/, loader: "ts-loader" }
    ]
  },
  output: {
    filename: 'index.js',
    iife: true,
    path: path.resolve(__dirname),
  }
};
