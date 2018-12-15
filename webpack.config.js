const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  target: "node",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist")
  },
  node: {
    __dirname: false,
    __filename: false
  },
  devtool: "eval-source-map",
  plugins: [
    new CleanWebpackPlugin(["dist"]),
    new CopyWebpackPlugin([
      {
        from: "src/data",
        to: "data",
        toType: "dir"
      }
    ])
  ]
};
