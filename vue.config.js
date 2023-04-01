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
        target: 'http://localhost:8080',
        // target: 'http://192.168.135.99:8080',

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



