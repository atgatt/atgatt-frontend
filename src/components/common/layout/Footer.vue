<template>
    <footer class="footer">
      <span class="text-muted">© {{currentYear}} CrashTested. Portions of the product data © SHARP under the <a href="http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/">Open Government License v3.0</a>, except where otherwise stated.</span>
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
    height: 60px; /* Set the fixed height of the footer here */
    background-color: #f5f5f5;
    position: absolute;
    text-align: center;
    padding-top: 20px;
}
</style>
