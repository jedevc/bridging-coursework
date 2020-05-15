const path = require("path");

module.exports = {
  entry: {
    filename: "./src/index.js",
  },
  output: {
    path: path.resolve(__dirname, "static/frontend"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader",
        ],
      },
    ],
  },
};
