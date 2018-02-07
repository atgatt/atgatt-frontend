<template>
  <div class="jumbotron">
    <h1 class="display-3">About Us</h1>
    <hr class="my-4">
    <p>CrashTested was built by a small team of Software Engineers working out of San Diego, California. Click <a href="mailto:hello@crashtested.co">here</a> to contact us. We source our ratings by aggregating data from widely known organizations such as SHARP, SNELL, ECE, and DOT.</p>

      <div id="accordion" role="tablist">
      <div class="card">
        <div class="card-header" role="tab" id="terms-of-service-card">
          <h5 class="mb-0">
            <a class="collapsed" data-toggle="collapse" href="#collapse-terms-of-service" role="button" aria-expanded="false" aria-controls="collapse-terms-of-service">
              Terms of Service
            </a>
          </h5>
        </div>
        <div id="collapse-terms-of-service" class="collapse" role="tabpanel" aria-labelledby="terms-of-service-card" data-parent="#accordion">
          <div class="card-body">
            Terms of Service Body
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-header" role="tab" id="privacy-policy-card">
          <h5 class="mb-0">
            <a class="collapsed" data-toggle="collapse" href="#collapse-privacy-policy" role="button" aria-expanded="false" aria-controls="collapse-privacy-policy">
              Privacy Policy
            </a>
          </h5>
        </div>
        <div id="collapse-privacy-policy" class="collapse" role="tabpanel" aria-labelledby="privacy-policy-card" data-parent="#accordion">
          <div class="card-body">
            Privacy Policy Body
          </div>
        </div>
      </div>
</div>
  </div>
</template>

<script>
export default {
  name: 'About',
  mounted () {
    this.$Progress.finish()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
