"use strict";
var path = require("path");
var webpack = require("webpack");
const merge = require("webpack-merge");
const common = require("./webpack.config.common.js");
var ProdPreProcess = require("./prodpreprocess.js");

var prodPreProcess = new ProdPreProcess();

module.exports = merge(common, {
  plugins: [
    new webpack.optimize.UglifyJsPlugin({ minimize: true }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production")
    })
  ],
  output: {
    filename: "[name]app.js",
    path: path.resolve(__dirname, "webpackbuildprod"),
    publicPath: "/grasp/Diabetes/scripts/"
  }
});
