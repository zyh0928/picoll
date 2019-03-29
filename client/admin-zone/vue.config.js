// const webpack = require("webpack");

module.exports = {
  productionSourceMap: !1,
  outputDir: "/tmp/admin-zone",
  devServer: {
    port: 9029,
    proxy: {
      "/api": {
        target: "http://localhost:9028/admin",
        changeOrigin: !0,
        ws: !0,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  },

  configureWebpack: {
    devtool: "source-map"
    //   plugins: [
    //     new webpack.ProvidePlugin({
    //       axios: "axios"
    //     })
    //   ]
  },

  css: {
    loaderOptions: {
      stylus: {
        import: [`~@/style/_color`, `~@/style/_mixin`]
      }
      // sass: {
      //   data: `@import "~@/style/color";@import "~@/style/mixin";`
      // }
    }
  }
};
