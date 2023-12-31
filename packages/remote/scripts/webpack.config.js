const path = require("path");

const { DllPlugin, ProgressPlugin } = require("webpack");

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

module.exports = function configFactory(params) {
  const {
    mode = "development",
    globalObject = "wx",
    entry = "remote",
    outputPath = "./",
  } = params;

  return {
    mode,
    devtool: false,
    context: process.cwd(),
    entry: {
      [entry]: mode === "development" ? DEV_DLL_LIBRARY : PRO_DLL_LIBRARY,
    },
    output: {
      path: path.resolve(process.cwd(), "./dist", outputPath),
      filename: "[name].js",
      library: {
        name: "[name]",
        type: "global",
      },
      globalObject,
    },
    resolve: {
      symlinks: true,
      extensions: [".js", ".jsx"],
      //    mainFields: ["main", "browser", "module", "jsnext:main"],
    },
    module: {
      rules: [
        {
          test: /\.(?:js|mjs|cjs)$/,
          use: [
            {
              loader: "babel-loader",
            },
            // {
            //   loader: "@linaria/webpack-loader",
            //   options: {
            //     sourceMap: mode !== "production",
            //   },
            // },
          ],
        },
      ],
    },
    plugins: [
      new ProgressPlugin(),
      new CleanWebpackPlugin(),
      new DllPlugin({
        context: path.resolve(process.cwd(), "../../"),
        path: path.resolve(
          process.cwd(),
          "./dist",
          outputPath,
          "[name]-manifest.json"
        ),
        name: "[name]",
        format: true,
      }),
    ],
  };
};
