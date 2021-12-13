module.exports = {
  lintOnSave: false,
  devServer: {
    proxy: {
      "/api": {
        // 只对路径(请求路由)以/api开头的请求进行代理转发(只咬它)
        target: "http://39.98.123.211", // 转发的目标url
        // 看最终请求的路径中是否有/api，即使真实路径没有，/api
        // pathRewrite: { "^/api": "" },
        changeOrigin: true, // 支持跨域
      },
    },
  },
};
