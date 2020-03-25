const webpack = require('webpack')
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/myDist' : '/', //部署应用包时的基本 URL
  outputDir: 'myDist', //打包目录
  indexPath: 'index.html',
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        Popper: ['popper.js', 'default']
      })
    ]
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://192.168.10.166:8080', //代理接口
        changeOrigin: true,
        pathRewrite: {
          '^/api': '' //代理的路径
        }
      }
    }
  }
}
