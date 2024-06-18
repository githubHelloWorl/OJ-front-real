const { defineConfig } = require("@vue/cli-service");
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");

module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack(config) {
    config.plugin("monaco").use(new MonacoWebpackPlugin());
    config.plugin("html").tap((args) => {
      // 修改 html-webpack-plugin的配置
      args[0].title = "OJ判题系统";
      return args;
    });
  },

  // 开发环境配置
  devServer: {
    // 设置主机名
    // host: "101.37.20.106",
    // 设置端口号
    port: 8087,
  },

  // 基本路径
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
  // assetsPublicPath: "/",

  // 输出文件目录
  // outputDir: "dist",

  // 静态资源目录
  assetsDir: "static",
  // assetsSubDirectory: "static"
});
