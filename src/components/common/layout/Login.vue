<template>
  <div class="nav-link" v-if="showLogin">
    <div v-if="!isAuthenticated">
      <a class="nav-link" href="#" @click.prevent="login">Login</a>
    </div>
    <div v-else>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          {{this.profile.email}}&nbsp;<img class="profile-picture" width="25" height="25" v-bind:src="this.profile.picture" />
        </a>
        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" href="#" @click.prevent="logout">
            Log Out
          </a>
        </div>
      </li>
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
      console.error('Failed to renew auth token: ', e)
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
      this.isAuthenticated = data.loggedIn
      this.profile = data.profile
    }
  }
}
</script>

<style scoped>
  .profile-picture {
    border-radius: 50%;
    vertical-align: top;
  }
</style>
