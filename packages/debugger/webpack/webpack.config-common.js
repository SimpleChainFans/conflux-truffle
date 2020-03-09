const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  entry: "./debugger",

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        query: {
          presets: [["babel-preset-env", { targets: { node: "6.14" } }]],
          plugins: [
            "@babel/plugin-proposal-object-rest-spread",
            "@babel/plugin-transform-runtime"
          ],
          sourceType: "module"
        },
        include: [path.resolve(__dirname, "..", "lib")]
      }
    ]
  },

  target: "node",

  mode: "production",

  output: {
    library: "Debugger",
    libraryTarget: "umd",
    umdNamedDefine: true,

    filename: "debugger.js",
    path: path.join(__dirname, "..", "dist"),
    devtoolModuleFilenameTemplate: "[absolute-resource-path]",
    devtoolFallbackModuleFilenameTemplate: "[absolute-resource-path]?[hash]"
  },

  resolve: {
    alias: {
      lib: path.resolve(__dirname, "../lib"),
      test: path.resolve(__dirname, "../test")
    },
    modules: [path.resolve(__dirname, ".."), "node_modules"]
  },

  // in order to ignore all modules in node_modules folder
  externals: [
    nodeExternals({
      modulesFromFile: true,
      whitelist: ["node-interval-tree"]
    })
  ],

  devtool: "source-map"
};
