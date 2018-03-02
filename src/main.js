// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueProgressBar from 'vue-progressbar'
import VueSelect from 'vue-select'
import App from './App'

import NavBar from './components/common/layout/NavBar.vue'
import NavItem from './components/common/layout/NavItem.vue'
import Footer from './components/common/layout/Footer.vue'
import Modal from './components/common/Modal.vue'

import ProductFilterSidebar from './components/ProductFilterSidebar.vue'
import ProductCard from './components/ProductCard.vue'
import ProductCertificationBadge from './components/ProductCertificationBadge.vue'
import SharpImpactZone from './components/SharpImpactZone.vue'
import EmailSignup from './components/EmailSignup.vue'
import router from './router'

import '../node_modules/jquery/dist/jquery.slim.min'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/font-awesome/css/font-awesome.min.css'

import http from 'axios'

Vue.config.productionTip = false

// Register global components
Vue.component('v-select', VueSelect)
Vue.component('nav-bar', NavBar)
Vue.component('nav-item', NavItem)
Vue.component('app-footer', Footer)
Vue.component('product-card', ProductCard)
Vue.component('product-certification-badge', ProductCertificationBadge)
Vue.component('sharp-impact-zone', SharpImpactZone)
Vue.component('modal', Modal)
Vue.component('product-filter-sidebar', ProductFilterSidebar)
Vue.component('email-signup', EmailSignup)

// Register extensions to Vue itself
Vue.use(VueProgressBar)

function startApp (environment) {
  // Initialize analytics
  try {
    // eslint-disable-next-line
    amplitude.getInstance().init(environment.amplitudeAPIKey)
  } catch (e) {
    console.error('Failed to initialize amplitude: ', e)
  }

  // Set up environment variables middleware
  Vue.use({
    install: function (Vue, options) {
      Vue.prototype.$environment = environment
    }
  })

  // Have Vue render the app
  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
  })
}

// Try to fetch environment settings, then start the app
http.get('/.environment/environment.json').then(response => {
  startApp(response.data)
}).catch(() => {
  console.warn('Could not determine environment; assuming local dev environment')
  startApp({
    apiBaseUrl: '/api-proxy',
    amplitudeAPIKey: '487025f65c0f02ce86dc6df875b01d24'
  })
})
