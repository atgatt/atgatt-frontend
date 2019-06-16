<template>
    <div class="nav-link" v-if="showLogin">
        <div v-if="!isAuthenticated">
            <a class="nav-link" href="#" @click.prevent="login">Login</a>
        </div>
        <div v-if="isAuthenticated">
            <a class="nav-link" href="#" @click.prevent="logout">Log out</a>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Login',
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

</style>
