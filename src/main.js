import Vue from 'vue'
import App from './App.vue'
import router from './router'
import initAuthMiddleware from './lib/authMiddleware'

import VueProgressBar from 'vue-progressbar'

import '../node_modules/jquery/dist/jquery.slim.min'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import 'vue-select/dist/vue-select.css'

import { library, dom } from '@fortawesome/fontawesome-svg-core'
import { faTimes, faCheck, faQuestionCircle, faInfoCircle, faMotorcycle, faUndo, faFilter, faExclamationTriangle, faCartPlus, faExternalLinkAlt, faCaretDown, faPlus, faSpinner, faExchangeAlt, faLink } from '@fortawesome/free-solid-svg-icons'
import { registerGlobalComponents } from './globals'
import Toasted from 'vue-toasted'
import http from 'axios'

function startApp (environment) {
  // eslint-disable-next-line
  console.info('Starting app with environment: ', environment)

  // Font awesome configuration
  library.add(faTimes, faCheck, faQuestionCircle, faInfoCircle, faMotorcycle, faUndo, faFilter, faExclamationTriangle, faCartPlus, faExternalLinkAlt, faCaretDown, faPlus, faSpinner, faExchangeAlt, faLink)
  dom.watch()

  // Register global components
  registerGlobalComponents()

  // Disable production tip
  Vue.config.productionTip = false

  // Set up toast notifications middleware
  Vue.use(Toasted, {
    iconPack: 'fontawesome'
  })

  // Set up progress bar middleware
  Vue.use(VueProgressBar)

  // Set up a few common services (environment variables middleware, http middleware)
  Vue.use({
    install: function (Vue, options) {
      Vue.prototype.$environment = environment
      Vue.prototype.$http = http
    }
  })

  Vue.use(initAuthMiddleware(environment.auth0Domain, environment.auth0ClientID, environment.auth0Audience))

  // Have Vue render the app
  new Vue({
    router,
    render: h => h(App)
  }).$mount('#app')
}

startApp({
  apiBaseURL: process.env.VUE_APP_API_BASE_URL,
  staticBaseURL: process.env.VUE_APP_STATIC_BASE_URL,
  showLogin: process.env.VUE_APP_SHOW_LOGIN,
  auth0Domain: process.env.VUE_APP_AUTH_DOMAIN,
  auth0ClientID: process.env.VUE_APP_AUTH_CLIENT_ID,
  auth0Audience: process.env.VUE_APP_AUTH_AUDIENCE
})
