import Vue from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export function registerGlobalComponents () {
  Vue.component('font-awesome-icon', FontAwesomeIcon)
}
