const webpack = require("webpack");

const configFactory = require("./webpack.config");

// 需要打包的 集中规则
const compilers = [
  {
    mode: "development",
    entry: "remote-weapp-development",
    globalObject: "wx",
    outputPath: "./weapp-development",
  },
  {
    mode: "development",
    entry: "remote-dd-development",
    globalObject: "dd",
    outputPath: "./dd-development",
  },
  {
    mode: "production",
    entry: "remote-weapp-production",
    globalObject: "wx",
    outputPath: "./weapp-production",
  },
  {
    mode: "production",
    entry: "remote-dd-production",
    globalObject: "dd",
    outputPath: "./dd-production",
  },
];

compilers.reduce(async (pre, cur) => {
  try {
    await pre;
    console.log(`${cur.entry}:开始构建`);
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
        } else {
          console.log(`${cur.entry}:构建完成`);
          resolve();
        }

        // 关闭编译
        compiler.close((closeErr) => {});
      });
    });
  } catch (error) {
    process.exit();
  }
}, Promise.resolve());
