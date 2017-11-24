<template>
    <div class="product-card">
      <div class="row">
        <div class="col">
          <span class="manufacturer">{{product.manufacturer}}</span>
          <span>{{product.model}}</span>
        </div>
      </div>
      <div class="row safety-score-row">
        <div class="col">
          <span class="score-text">{{product.score}}% safety score<i v-on:click="showHelp" class="fa fa-info-circle"/></span>
        </div>
      </div>
      <div class="row">
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
  props: ['product'],
  methods: {
    showHelp: () => {
      alert(
        'This score is a weighted average of all the scores associated with each certification. If a product is missing a particular certification, then it is assigned a score of 0 for that certification.'
      )
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.product-card {
  margin-bottom: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 1rem;
}

.product-image {
  padding: 1rem;
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

.safety-score-row {
  border-bottom: 1px solid #ccc;
  padding-bottom: 1rem;
}

.manufacturer {
  font-weight: bold;
}

i.fa-info-circle {
  padding-left: 0.2rem;
  cursor: pointer;
}

.card-row {
  padding-left: 0.4rem;
}
</style>
