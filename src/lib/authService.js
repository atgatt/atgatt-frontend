import auth0 from 'auth0-js'
import EventEmitter from 'events'

export const LOGIN_EVENT = 'loginEvent'
const LOCAL_STORAGE_KEY = 'loggedIn'

export class AuthService extends EventEmitter {
  idToken = null
  profile = null
  tokenExpiry = null

  webAuth = null

  constructor (domain, clientID) {
    super()

    this.webAuth = new auth0.WebAuth({
      domain: domain,
      redirectUri: `${window.location.origin}`,
      clientID: clientID,
      responseType: 'token id_token',
      scope: 'openid profile email'
    })
  }

  // Starts the user login flow
  login (customState) {
    this.webAuth.authorize({
      appState: customState
    })
  }

  // Handles the callback request from Auth0
  handleAuthentication () {
    return new Promise((resolve, reject) => {
      this.webAuth.parseHash((err, authResult) => {
        if (err) {
          console.log(err)
        } else {
          this.localLogin(authResult)
          resolve(authResult.idToken)
        }
      })
    })
  }

  localLogin (authResult) {
    this.idToken = authResult.idToken
    this.profile = authResult.idTokenPayload

    // Convert the JWT expiry time from seconds to milliseconds
    this.tokenExpiry = new Date(this.profile.exp * 1000)

    localStorage.setItem(LOCAL_STORAGE_KEY, 'true')

    this.emit(LOGIN_EVENT, {
      loggedIn: true,
      profile: authResult.idTokenPayload,
      state: authResult.appState || {}
    })
  }

  renewTokens () {
    return new Promise((resolve, reject) => {
      if (localStorage.getItem(LOCAL_STORAGE_KEY) !== 'true') {
        console.log('Not logged in')
      }

      this.webAuth.checkSession({}, (err, authResult) => {
        if (err) {
          reject(err)
        } else {
          this.localLogin(authResult)
          resolve(authResult)
        }
      })
    })
  }

  logOut () {
    localStorage.removeItem(LOCAL_STORAGE_KEY)

    this.idToken = null
    this.tokenExpiry = null
    this.profile = null

    this.webAuth.logout({
      returnTo: window.location.origin
    })

    this.emit(LOGIN_EVENT, { loggedIn: false })
  }

  isAuthenticated () {
    return (
      Date.now() < this.tokenExpiry &&
      localStorage.getItem(LOCAL_STORAGE_KEY) === 'true'
    )
  }
}
