<template>
  <div class="product-card">
    <div class="row product-header">
      <div class="col-12 col-lg my-auto">
      </div>
      <div class="col-12 col-lg my-auto">
        <modify-product-on-product-set-button v-bind:productType="this.productType" />
      </div>
    </div>
  </div>
</template>

<script>
import ModifyProductOnProductSetButton from './ModifyProductOnProductSetButton.vue'
export default {
  name: 'PlaceholderProductCard',
  props: ['productType'],
  components: {
    'modify-product-on-product-set-button': ModifyProductOnProductSetButton
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.missing-product-image {
  min-width: 200px;
  margin-left: 0.5em;
}

.impact-zone-col {
  align-self: center;
}

.product-card {
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 1rem;
  padding-bottom: 0rem;
  background-color: #f3f3f3
}

.product-header {
  border-bottom: 1px solid #ccc;
  padding-bottom: 1rem;
}

.ratings-router-link {
  padding-left: 0.5rem;
}

/* xs through md */
@media only screen and (min-device-width : 0px) and (max-device-width : 991px) {
  .buy-btn-col {
    padding-top: 5px;
    text-align: center;
  }

  .product-header {
    text-align: center;
  }

  .impact-zone-col {
    align-self: flex-start;
  }
}

.product-badge {
  margin-right: 3px;
}

.product-body {
  background-color: white;
  padding: 1rem;
  text-align: center;
}

.product-image, .missing-product-image {
  padding: 1rem;
  border-radius: 20%;
}

.centered-content {
  align-items: center;
  justify-content: center;
}

.overall-rating {
  border: 1px solid #ccc;
  border-radius: 5px;
}

.score-text {
  font-size: small;
}

.manufacturer {
  font-weight: bold;
}

.card-row {
  padding-left: 0.4rem;
}

.model-aliases {
  color: darkgray;
}
</style>
