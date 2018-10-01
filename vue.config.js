module.exports = {
  devServer: {
    proxy: {
      '/api-proxy': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        pathRewrite: {
          '^/api-proxy': ''
        }
      }
    }
  }
}
