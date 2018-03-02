<template>
    <footer class="footer">
      <div>
        <span class="text-muted">© {{currentYear}} CrashTested. Portions of the helmet data © SHARP under the <a href="http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/">Open Government License v3.0</a>.</span>
      </div>
      <div>
        <router-link v-bind:to="'about'">About</router-link> —
        <router-link v-bind:to="'about'">Terms of Service</router-link> —
        <router-link v-bind:to="'about'">Privacy Policy</router-link>
      </div>
    </footer>
</template>

<script>
export default {
  name: 'nav-bar',
  computed: {
    currentYear: function () {
      return new Date().getFullYear()
    }
  }
}
</script>

<style scoped>
.footer {
    bottom: 0;
    width: 100%;
    height: 80px; /* Set the fixed height of the footer here */
    background-color: #f5f5f5;
    position: absolute;
    text-align: center;
    padding-top: 20px;
}
</style>
