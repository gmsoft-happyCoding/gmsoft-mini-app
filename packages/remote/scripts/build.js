const webpack = require("webpack");

const configFactory = require("./webpack.config");

// 需要打包的 集中规则
const compilers = [
  {
    mode: "development",
    entry: "remote-wx-dev",
    globalObject: "wx",
    outputPath: "./dev-wx",
  },
  {
    mode: "development",
    entry: "remote-dd-dev",
    globalObject: "dd",
    outputPath: "./dev-dd",
  },
  {
    mode: "production",
    entry: "remote-wx-pro",
    globalObject: "wx",
    outputPath: "./pro-wx",
  },
  {
    mode: "production",
    entry: "remote-dd-pro",
    globalObject: "dd",
    outputPath: "./pro-dd",
  },
];

compilers.reduce(async (pre, cur) => {
  try {
    await pre;
    return new Promise((resolve, reject) => {
      const compiler = webpack(configFactory(cur));

      compiler.run((err, stats) => {
        if (err || stats.hasErrors()) {
          console.log(
            stats.toString({
              // 增加控制台颜色开关
              colors: true,
            })
          );
          reject(err);
        }

        console.log(`${cur.entry}:构建完成`);

        resolve();
      });
    });
  } catch (error) {
    process.exit();
  }
}, Promise.resolve());
