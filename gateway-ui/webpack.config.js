const path = require('path');


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
        "stream": require.resolve("stream-browserify")
    },
    alias: {
      'react': path.resolve(__dirname, './node_modules/react'),
      'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
      '@emotion/use-insertion-effect-with-fallbacks': path.resolve(__dirname,'./node_modules/@emotion/use-insertion-effect-with-fallbacks/dist/emotion-use-insertion-effect-with-fallbacks.cjs.prod.js'),
      '@emotion/react': path.resolve(__dirname,'./node_modules/@emotion/react/dist/emotion-element-eec0d725.cjs.prod.js')
    }
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
  externals: {      
    // Don't bundle react or react-dom      
    react: {          
        commonjs: "react",          
        commonjs2: "react",          
        amd: "React",          
        root: "React"      
    },      
    "react-dom": {          
        commonjs: "react-dom",          
        commonjs2: "react-dom",          
        amd: "ReactDOM",          
        root: "ReactDOM"      
    }  
  }, 
  devServer: {
    static: path.join(__dirname, "dist"),
    compress: true,
    port: 4000,
  },
};