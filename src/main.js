import Vue from 'vue'
import App from './App.vue'
import router from './router'

import VueProgressBar from 'vue-progressbar'

import '../node_modules/jquery/dist/jquery.slim.min'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/font-awesome/css/font-awesome.min.css'

Vue.config.productionTip = false

Vue.use(VueProgressBar)

function startApp (environment) {
  // eslint-disable-next-line
  console.info('Starting app with environment: ', environment)
  // Initialize analytics
  try {
    // eslint-disable-next-line
    amplitude.getInstance().init(environment.amplitudeAPIKey)
  } catch (e) {
    // eslint-disable-next-line
    console.error('Failed to initialize amplitude: ', e)
  }

  // Set up environment variables middleware
  Vue.use({
    install: function (Vue, options) {
      Vue.prototype.$environment = environment
    }
  })

  // Have Vue render the app
  new Vue({
    router,
    render: h => h(App)
  }).$mount('#app')
}

startApp({
  apiBaseURL: process.env.VUE_APP_API_BASE_URL, // '/api-proxy',
  amplitudeAPIKey: process.env.VUE_APP_AMPLITUDE_API_KEY, // '487025f65c0f02ce86dc6df875b01d24'
  staticBaseURL: process.env.VUE_APP_STATIC_BASE_URL
})
