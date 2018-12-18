"use strict";
var path = require("path");
var webpack = require("webpack");

module.exports = {
  context: path.resolve(__dirname),
  entry: {
    main: ["babel-polyfill", "./js/main.js"] // babel-polyfill is required for IE-11 'Promise' support
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "commons",
      filename: "commons.js"
    }),
    new webpack.optimize.ModuleConcatenationPlugin()
  ],

  resolve: {
    modules: [".", "node_modules"],
    alias: {
      TweenMax: "lib/TweenMax.min",
      TweenLite: "lib/TweenLite.min",
      TimelineMax: "lib/TimelineMax.min",
      DrawSVGPlugin: "lib/DrawSVGPlugin.min",
      bootstrap: "lib/bootstrap.min",
      d3: "lib/d3_v4.min",
      jquery: "lib/jquery.min"
    }
  },
  module: {
    loaders: [
      {
        test: /\.html$/,
        loaders: ["raw-loader"],
        exclude: [/node_modules/],
        include: ["/HtmlTemplates/", "/html/"]
      }
    ]
  },
  resolveLoader: {
    alias: {
      text: "raw-loader"
    }
  }
};
