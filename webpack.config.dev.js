"use strict";
var path = require("path");
const merge = require("webpack-merge");
const common = require("./webpack.config.common.js");
/* var BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin; */

module.exports = merge(common, {
  // plugins: [new BundleAnalyzerPlugin({ generateStatsFile: true })],
  output: {
    filename: "[name]app.js",
    path: path.resolve(__dirname, "webpackbuilddev"),
    publicPath: "/GraspLogoAnimationApp/js/"
  },
  devtool: "source-map"
});
