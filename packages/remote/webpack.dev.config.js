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
  // "@linaria/react",
  // "@linaria/core",
  "@gmsoft-mini-app/react-hanger",
  "@gmsoft-mini-app/state-container",
];

const DEV_DLL_LIBRARY = PRO_DLL_LIBRARY.concat("react-reconciler");

module.exports = {
  mode: "development",
  devtool: false,
  entry: {
    ["remote-dev"]: DEV_DLL_LIBRARY,
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
  resolve: {
    symlinks: true,
    extensions: [".js", ".jsx"],
    mainFields: ["main", "browser", "module", "jsnext:main"],
  },
  module: {
    rules: [
      {
        test: /\.(?:js|mjs|cjs)$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [["@babel/preset-env", { modules: "commonjs" }]],
              plugins: [["@babel/plugin-transform-runtime"]],
            },
          },
          // {
          //   loader: "@linaria/webpack-loader",
          //   options: {
          //     sourceMap: process.env.NODE_ENV !== "production",
          //   },
          // },
        ],
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
