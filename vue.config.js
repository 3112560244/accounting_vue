const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
})


module.exports = {
  publicPath: './',
  productionSourceMap: false,
  devServer: {
    proxy: {
      '/v1':{
        target: 'http://localhost:8088',
        changeOrigin: true,
        //重写路径
        pathRewrite:{
          '/v1':''
        }
      },
      '/actuator':{
        target: 'http://localhost:9527',
        changeOrigin: true,
      }
    }
  }
}



