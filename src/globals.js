import Vue from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { capitalize } from './lib/text'

export function registerGlobalComponents () {
  Vue.filter('capitalize', capitalize)
  Vue.component('font-awesome-icon', FontAwesomeIcon)
}
