module.exports = {
  publicPath: '/weather-app/',
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = 'Vue Weather App'
        return args
      })
  }
}
