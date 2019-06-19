import authService, { LOGIN_EVENT } from './authService'

export default {
  install (Vue) {
    Vue.prototype.$auth = authService

    Vue.mixin({
      created () {
        if (this.handleLoginEvent) {
          authService.addListener(LOGIN_EVENT, this.handleLoginEvent)
        }
      },

      destroyed () {
        if (this.handleLoginEvent) {
          authService.removeListener(LOGIN_EVENT, this.handleLoginEvent)
        }
      }
    })
  }
}
