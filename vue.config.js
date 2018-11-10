module.exports = {
  devServer: {
    proxy: {
      '/api-proxy': {
        target: 'https://api-staging.crashtested.co',
        changeOrigin: true,
        pathRewrite: {
          '^/api-proxy': ''
        }
      }
    }
  }
}
