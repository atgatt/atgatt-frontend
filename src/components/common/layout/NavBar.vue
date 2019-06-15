<template>
  <nav class="navbar navbar-expand-lg navbar-dark app-navbar">
    <router-link class="navbar-brand" to="/"><font-awesome-icon icon="motorcycle" /> CrashTested</router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav mr-auto">
        <nav-item route="/" text="Helmet Ratings" exact="true" />
        <nav-item route="/jackets" text="Jacket Ratings" v-bind:isNew="true" />
        <nav-item route="/about-helmet-ratings" text="About Helmet Ratings" />
        <nav-item route="/about-jacket-ratings" text="About Jacket Ratings" />
        <nav-item route="/about-us" text="About Us" />
        <div class="nav-link" v-if="showLogin">
          <div v-if="!isAuthenticated">
            <a class="nav-link" href="#" @click.prevent="login">Login</a>
          </div>
          <div v-if="isAuthenticated">
            <a class="nav-link" href="#" @click.prevent="logout">Log out</a>
          </div>
        </div>
      </ul>
    </div>
  </nav>
</template>

<script>
import NavItem from './NavItem'
export default {
  name: 'nav-bar',
  components: {
    'nav-item': NavItem
  },
  data () {
    return {
      isAuthenticated: false,
      showLogin: this.$environment.showLogin === 'true'
    }
  },
  async created () {
    try {
      await this.$auth.renewTokens()
    } catch (e) {
      console.log(e)
    }
  },
  methods: {
    login () {
      this.$auth.login()
    },
    logout () {
      this.$auth.logOut()
    },
    handleLoginEvent (data) {
      console.log(data)
      this.isAuthenticated = data.loggedIn
      this.profile = data.profile
    }
  }
}
</script>

<style scoped>
.app-navbar {
  background-color: #0099ff;
}
</style>
