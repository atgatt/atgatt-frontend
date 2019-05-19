import Vue from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export function registerGlobalComponents () {
  Vue.filter('capitalize', function (value) {
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
  })

  Vue.component('font-awesome-icon', FontAwesomeIcon)
}
