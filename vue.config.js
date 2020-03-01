module.exports = {
  devServer: {
    proxy: {
      '/api-proxy': {
        target: 'https://api-staging.atgatt.co',
        changeOrigin: true,
        pathRewrite: {
          '^/api-proxy': ''
        }
      }
    }
  }
}
