const path = require('path');

module.exports = {
  entry: {
    main: './src/app.js',
    home: './src/index.js',
    users: './src/user.js',
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'build')
  },
  module: {
    rules: [
      {
        test: /.css$/,
        use: ['style-loader','css-loader'] //справа на лево пропускает через лоадеры
      }
    ]
  }
};
