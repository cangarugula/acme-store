module.exports = {
  entry: ['babel-polyfill', './src/index.js'],
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.js$/,
        loader: 'babel-loader'
      }
    ]
  }
};
