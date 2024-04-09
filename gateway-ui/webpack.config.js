const path = require('path');

module.exports = {
  entry: './src/entry.ts',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: [/node_modules/, /stories/],
      },
    ],
  },
  target: 'web', 
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    fallback: {
        "os": require.resolve("os-browserify/browser"),
        "crypto": require.resolve("crypto-browserify"),
        "path": require.resolve("path-browserify"),
        "vm": require.resolve("vm-browserify"),
        "stream": require.resolve("stream-browserify")
    }
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    static: path.join(__dirname, "dist"),
    compress: true,
    port: 4000,
  },
};