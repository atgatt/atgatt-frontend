// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueProgressBar from 'vue-progressbar'
import App from './App'

import NavBar from './components/common/layout/NavBar.vue'
import NavItem from './components/common/layout/NavItem.vue'
import Footer from './components/common/layout/Footer.vue'
import Modal from './components/common/Modal.vue'

import ProductFilterSidebar from './components/ProductFilterSidebar.vue'
import ProductCard from './components/ProductCard.vue'
import ProductCertificationBadge from './components/ProductCertificationBadge.vue'
import SharpImpactZone from './components/SharpImpactZone.vue'
import router from './router'

import '../node_modules/jquery/dist/jquery.slim.min'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/font-awesome/css/font-awesome.min.css'
import '../node_modules/vue-multiselect/dist/vue-multiselect.min.css'

import http from 'axios'

Vue.config.productionTip = false

// Register global components
Vue.component('nav-bar', NavBar)
Vue.component('nav-item', NavItem)
Vue.component('app-footer', Footer)
Vue.component('product-card', ProductCard)
Vue.component('product-certification-badge', ProductCertificationBadge)
Vue.component('sharp-impact-zone', SharpImpactZone)
Vue.component('modal', Modal)
Vue.component('product-filter-sidebar', ProductFilterSidebar)

// Register extensions to Vue itself
Vue.use(VueProgressBar)

function startVue (environment) {
  Vue.use({
    install: function (Vue, options) {
      Vue.prototype.$environment = environment
    }
  })

  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
  })
}

// Try to fetch environment settings, then start Vue
http.get('/.environment/environment.json').then(response => {
  startVue(response.data)
}).catch(() => {
  console.warn('Could not determine environment; assuming local dev environment')
  startVue({
    apiBaseUrl: '/api-proxy'
  })
})
