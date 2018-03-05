<template>
    <footer class="footer">
      <div class="footer-text">
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
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 80px;
    background-color: #f5f5f5;
    text-align: center;
}

.footer-text {
    padding-top: 1em;
}

@media only screen and (min-device-width : 320px) and (max-device-width : 480px) {
  .footer-text {
    padding-top: 0.1em;
  }
}

</style>
