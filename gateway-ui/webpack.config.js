const path = require('path');
const webpack = require("webpack");

module.exports = {
  entry: './src/index.tsx',
  devtool : 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.ts(x)?$/,
        use: 'ts-loader',
        exclude: [/node_modules/, /stories/, /cypress/, /.storybook/],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
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
        "stream": require.resolve("stream-browserify"),
        "process/browser": require.resolve("process/browser")
    },
    alias: {
      '@emotion/use-insertion-effect-with-fallbacks': path.resolve(__dirname,'./node_modules/@emotion/use-insertion-effect-with-fallbacks/dist/emotion-use-insertion-effect-with-fallbacks.cjs.prod.js'),
      '@emotion/react': path.resolve(__dirname,'./node_modules/@emotion/react/dist/emotion-react.browser.esm.js'),
      '@identity.com/did-bnb-client': path.resolve(__dirname,'./node_modules/@identity.com/did-bnb-client'),
    },
    fullySpecified: false
  }, 
  externals: [
    /^\@mui\/material/,
    /^\@mui\/icons-material.*/,
    /^react/,
    /^\@emotion\/react/,
    /^\@emotion\/styled/
  ],
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'module',
  },
  devServer: {
    static: path.join(__dirname, "dist"),
    compress: true,
    port: 4000,
  },
  experiments: {
    outputModule: true
  },
  optimization: {
    nodeEnv: 'production'
  },
}