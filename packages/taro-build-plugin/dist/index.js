"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuildType = void 0;
const webpack_1 = require("webpack");
const path_1 = require("path");
const lodash_1 = require("lodash");
const fs_extra_1 = require("fs-extra");
var BuildType;
(function (BuildType) {
    /** 主包 */
    BuildType["MAIN_PACKAGE"] = "mainpackage";
    /* 分包 */
    BuildType["SUB_PACKAGE"] = "subpackage";
})(BuildType || (exports.BuildType = BuildType = {}));
exports.default = ({ outputRoot = "./dist/weapp" }) => (ctx, pluginOpts) => {
    const blended = ctx.runOpts.blended || ctx.runOpts.options.blended;
    const { appType } = pluginOpts;
    let entryName = "";
    // 开始编译前 钩子
    ctx.onBuildStart(() => { });
    // 编译中 对webpack进行操作钩子
    ctx.modifyWebpackChain((args) => {
        const { chain: webpackChain } = args;
        webpackChain.merge(Object.assign(Object.assign({}, (process.env.MAIN_APP_BUILD_TYPE === BuildType.SUB_PACKAGE
            ? { mode: process.env.NODE_ENV || "production" }
            : {})), { plugin: {
                DllReferencePlugin: {
                    plugin: webpack_1.DllReferencePlugin,
                    args: [
                        {
                            context: process.cwd(),
                            manifest: require((0, path_1.resolve)(process.cwd(), blended ? "../../dist/dll" : "./dist/dll", "./remote-manifest.json")),
                            sourceType: "global",
                        },
                    ],
                },
            }, output: {
                chunkLoadingGlobal: process.env.MAIN_APP_SUBMINIAPP_BUILD_PACKAGENAME || "webpackJsonp",
                globalObject: "gmsoft",
            }, optimization: {
                providedExports: true,
            } }));
        // 删除 react 解析问题
        webpackChain.resolve.alias.delete("react$");
        webpackChain.resolve.alias.delete("react-reconciler$");
        webpackChain.resolve.mainFields.prepend("main");
        // taro-react 依赖包
        webpackChain.resolve.alias.set("react-reconciler/constants", "react-reconciler/cjs/react-reconciler-constants.production.min.js");
        entryName = (0, lodash_1.get)(Object.keys((0, lodash_1.get)(webpackChain.toConfig(), "entry", {})), "0");
    });
    // 编译中 对文件进行操作钩子
    ctx.modifyBuildAssets((args) => {
        // 作为分包项目 不需要引入 公共js 由 主包负责引入
        if (blended)
            return;
        const { assets } = args;
        // 获得 CachedSource
        const cachedSource = (0, lodash_1.get)(assets, `${entryName}.js`);
        if (cachedSource) {
            // 获得 ConcatSource
            let source = cachedSource.original();
            if (source["_children"]) {
                source["_children"].unshift(`require("./remote-dev");\n`);
            }
        }
    });
    // 编译完成钩子
    ctx.onBuildFinish(() => {
        if (!blended)
            return;
        console.log("编译结束！");
        const rootPath = process.env.MAIN_APP_SUBMINIAPP_DIR;
        const outputPath = (0, path_1.resolve)(__dirname, "../", `${outputRoot}`);
        if (rootPath) {
            try {
                (0, fs_extra_1.removeSync)(rootPath);
            }
            catch (error) {
                console.log(`删除分包目录失败${rootPath}`);
                console.log(JSON.stringify(error));
                process.exit();
            }
            try {
                (0, fs_extra_1.copySync)(outputPath, rootPath);
            }
            catch (error) {
                console.log("拷贝失败！");
                console.log(JSON.stringify(error));
                process.exit();
            }
            console.log("拷贝结束！");
        }
    });
    // 构建完成钩子
    ctx.onBuildComplete(() => {
        // 只有不是 分包项目 都要复制
        if (blended)
            return;
        // 复制 dll文件到对应的小程序目录中
        const dllFilePath = (0, path_1.resolve)(process.cwd(), "./node_modules/@gmsoft-mini-app/remote/dist/remote-dev.js");
        const outputPath = (0, path_1.resolve)(process.cwd(), `${outputRoot}/remote-dev.js`);
        if ((0, fs_extra_1.existsSync)(dllFilePath)) {
            (0, fs_extra_1.copySync)(dllFilePath, outputPath, { overwrite: true });
        }
    });
};
