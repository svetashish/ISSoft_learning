const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const path = require("path");

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";
  
  const config = {
    entry: {
      main: "./src/app.js",
      home: "./src/index.js",
      users: "./src/user.js",
    },
    output: {
      filename: "[name].js",
      path: path.join(__dirname, "build"),
    },
    module: {
      rules: [
        {
          test: /.css$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : "style-loader",
            "css-loader",
          ], 
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        chunks: ["main"],
        minify: {
          collapseWhitespase: isProduction,
        }
      })
    ],
    devServer: {
      hot: true,
    },
  };

  if (isProduction) {
    config.plugins.push(
      new MiniCssExtractPlugin({
        filename: "[name].css",
      })
    );
  }

  return config;
};
