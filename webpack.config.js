var path = require('path');
module.exports = {
    entry: './public/script/main.js',
    output: {
    path: path.resolve(__dirname, 'public/script/'), // string
    filename: 'serve.js',
    publicPath: './public/script/'
  }
}
