const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');


module.exports = {
context : __dirname+ '/components',
  entry : {
     personDept : './personDept/index.js',
     simulation: './simulation/index.js',
  },
  output: {
      path: __dirname + '/public',
    filename: '[name].js'
  },
  watch : NODE_ENV == 'development',
  watchOptions: {
      aggregateTimeout: 100
  },
  plugins: [
      new webpack.NoEmitOnErrorsPlugin()
  ],
  optimization: {
      minimize: NODE_ENV=="production"
  }





}