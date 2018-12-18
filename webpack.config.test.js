"use strict";
var path = require("path");
var webpack = require("webpack");
const merge = require("webpack-merge");
const common = require("./webpack.config.common.js");
var TestPreProcess = require("./testpreprocess.js");

var testPreProcess = new TestPreProcess();

module.exports = merge(common, {
  plugins: [new webpack.optimize.UglifyJsPlugin({ minimize: true })],
  output: {
    filename: "[name]app.js",
    path: path.resolve(__dirname, "webpackbuildtest"),
    publicPath: "/d3js/DiabetesAtlasD3/scripts/"
  }
});
