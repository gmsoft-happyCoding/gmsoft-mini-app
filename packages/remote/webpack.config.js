const path = require("path");

const { DllPlugin } = require("webpack");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const PRO_DLL_LIBRARY = [
  "react",
  "react-dom",
  "redux",
  "react-redux",
  "redux-saga",
  "dva-core",
  "dva-loading",
  "dva-model-creator",
  "@linaria/react",
  "@linaria/core",
  "@gmsoft-mini-app/react-hanger",
  "@gmsoft-mini-app/state-container",
];

const DEV_DLL_LIBRARY = PRO_DLL_LIBRARY.concat("react-reconciler");

console.log(process.cwd());

module.exports = {
  mode: "development",
  devtool: false,
  entry: {
    remote: DEV_DLL_LIBRARY,
  },
  //   entry: {
  //     remote:
  //       process.env.NODE_ENV === "development"
  //         ? DEV_DLL_LIBRARY
  //         : PRO_DLL_LIBRARY,
  //   },
  resolve: {
    // symlinks: true,
    extensions: [".js", ".jsx"],
    mainFields: ["main", "module", "browser"],
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].js",
    library: {
      name: "[name]",
      type: "global",
    },
    globalObject: "wx",
  },
  module: {
    rules: [
      {
        test: /\.(?:js|mjs|cjs)$/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new DllPlugin({
      context: path.resolve(process.cwd(), "../../"),
      path: path.resolve(__dirname, "./dist", "[name]-manifest.json"),
      name: "[name]",
      format: true,
    }),
  ],
};
