import Vue from 'vue'
import App from './App.vue'
import router from './router'

import VueProgressBar from 'vue-progressbar'

import '../node_modules/jquery/dist/jquery.slim.min'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import 'vue-select/dist/vue-select.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faTimes, faCheck, faQuestionCircle, faInfoCircle, faMotorcycle, faUndo, faFilter, faExclamationTriangle, faCartPlus, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'
import { registerGlobalComponents } from './globals'
library.add(faTimes, faCheck, faQuestionCircle, faInfoCircle, faMotorcycle, faUndo, faFilter, faExclamationTriangle, faCartPlus, faExternalLinkAlt)
registerGlobalComponents()

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
  apiBaseURL: process.env.VUE_APP_API_BASE_URL,
  amplitudeAPIKey: process.env.VUE_APP_AMPLITUDE_API_KEY,
  staticBaseURL: process.env.VUE_APP_STATIC_BASE_URL,
  butterAPIKey: process.env.VUE_APP_BUTTER_API_KEY
})
