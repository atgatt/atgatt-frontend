<template>
  <div class="product-card">
    <div class="row product-header">
      <div class="col my-auto">
        <h4 class="my-auto"><strong>{{product.manufacturer}}</strong> <small>{{product.model}}</small></h4>
      </div>
      <div class="col buy-btn-col my-auto">
        <a href="#" class="btn btn-success"><i class="fa fa-amazon"/> <strong>Buy for ${{product.priceInUsd}}</strong></a>
      </div>
    </div>
    <div class="row product-body">
      <div class="col align-self-center">
        <img class="product-image" width="200" height="200" v-bind:src="product.imageUrl"></img>
      </div>
      <div class="col align-self-center">
        <ul name="certifications-list" class="fa-ul">
          <label for="certifications-list">Certifications:</label>
          <product-certification-badge v-bind:certification="product.certifications.SHARP" certificationName="SHARP" />
          <product-certification-badge v-bind:certification="product.certifications.SNELL" certificationName="SNELL" />
          <product-certification-badge v-bind:certification="product.certifications.ECE" certificationName="ECE" />
          <product-certification-badge v-bind:certification="product.certifications.DOT" certificationName="DOT" />
        </ul>
      </div>
      <div class="col align-self-center">
        <sharp-impact-zone
          v-bind:certification="product.certifications.SHARP"
          zoneId="left"
        />
      </div>
      <div class="col align-self-center">
        <sharp-impact-zone
          v-bind:certification="product.certifications.SHARP"
          zoneId="right"
        />
      </div>
      <div class="col align-self-center">
        <sharp-impact-zone
          v-bind:certification="product.certifications.SHARP"
          zoneId="rear"
        />
      </div>
      <div class="col align-self-center">
        <sharp-impact-zone
          v-bind:certification="product.certifications.SHARP"
          zoneId="top"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: ['product']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.buy-btn-col {
  text-align: right;
}
.product-card {
  margin-bottom: 0.5rem;
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

.product-body {
  background-color: white;
}

.product-image {
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
</style>
