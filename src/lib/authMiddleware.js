import { AuthService, LOGIN_EVENT } from './authService'

export default function initAuthMiddleware (auth0Domain, auth0ClientID) {
  return {
    install (Vue) {
      const authService = new AuthService(auth0Domain, auth0ClientID)
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
}
