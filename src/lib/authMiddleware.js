import { AuthService, LOGIN_EVENT } from './authService'

export default function initAuthMiddleware (auth0Domain, auth0ClientID, auth0Audience) {
  return {
    install (Vue) {
      const authService = new AuthService(auth0Domain, auth0ClientID, auth0Audience)
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
