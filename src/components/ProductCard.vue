<template>
  <div class="product-card">
    <div class="row product-header">
      <div class="col my-auto">
        <h4 class="my-auto"><strong>{{product.manufacturer}}</strong> <small>{{product.model}}</small><small v-if="product.modelAlias"> (also known as the {{product.modelAlias}})</small></h4>
      </div>
      <div v-on:click="trackBuyButtonClick" class="col buy-btn-col my-auto">
        <a v-bind:href="formattedBuyURL" target="_blank" class="btn buy-product-btn btn-success"><i class="fa fa-amazon"/> <strong>Buy on Amazon for {{formattedPrice}}</strong></a>
        <img src="//ir-na.amazon-adsystem.com/e/ir?t=crashtested-20&l=ur2&o=1" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
      </div>
    </div>
    <div class="row product-body">
      <div class="col-4 col-lg align-self-center">
        <img v-if="product.imageUrl" class="product-image" width="200" height="200" v-bind:src="product.imageUrl"/>
        <i v-else class="fa fa-question fa-5x missing-product-image"/>
      </div>
      <div class="col-8 col-lg align-self-center">
        <ul name="certifications-list" class="fa-ul certifications-list">
          <label class="certifications-label" for="certifications-list">Certifications:</label>
          <product-certification-badge v-bind:certification="product.certifications.SHARP" certificationName="SHARP" />
          <product-certification-badge v-bind:certification="product.certifications.ECE" certificationName="ECE" />
          <product-certification-badge v-bind:certification="product.certifications.SNELL" certificationName="SNELL" />
          <product-certification-badge v-bind:certification="product.certifications.DOT" certificationName="DOT" />
        </ul>
      </div>
      <div class="col-3 col-lg align-self-center">
        <sharp-impact-zone
          v-bind:certification="product.certifications.SHARP"
          zoneId="top"
        />
      </div>
      <div class="col-3 col-lg align-self-center">
        <sharp-impact-zone
          v-bind:certification="product.certifications.SHARP"
          zoneId="left"
        />
      </div>
      <div class="col-3 col-lg align-self-center">
        <sharp-impact-zone
          v-bind:certification="product.certifications.SHARP"
          zoneId="right"
        />
      </div>
      <div class="col-3 col-lg align-self-center">
        <sharp-impact-zone
          v-bind:certification="product.certifications.SHARP"
          zoneId="rear"
        />
      </div>
    </div>
  </div>
</template>

<script>
import formatCurrency from '../lib/currency'
export default {
  name: 'ProductCard',
  props: ['product'],
  computed: {
    formattedPrice: function () {
      const priceInUsd = this.product.priceInUsdMultiple / 100.0
      return priceInUsd > 0 ? formatCurrency(priceInUsd) : 'a mystery price!'
    },

    formattedBuyURL: function () {
      const buyUrl = this.product.buyUrl
      if (buyUrl) {
        return buyUrl
      }

      const manufacturer = this.product.manufacturer
      const model = this.product.model

      return `https://www.amazon.com/gp/search?ie=UTF8&tag=crashtested-20&linkCode=ur2&linkId=2a2896b54f76421e38228d42e244bfbb&camp=1789&creative=9325&index=automotive&keywords=${manufacturer} ${model}`
    }
  },
  methods: {
    trackBuyButtonClick: function () {
      // Amplitude is globally defined, disabling ESLint so that it doesn't complain about an unknown global variable
      // eslint-disable-next-line
      amplitude.getInstance().logEvent('buyButtonClicked', {
        'uuid': this.product.uuid,
        'manufacturer': this.product.manufacturer,
        'model': this.product.model,
        'priceInUsdMultiple': this.product.priceInUsdMultiple
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.buy-btn-col {
  text-align: right;
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

.product-body {
  background-color: white;
  padding: 1rem;
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

.certifications-label {
  font-size: larger;
}

.buy-product-btn {
  background: -webkit-linear-gradient(top,#f7dfa5,#f0c14b);
  background: linear-gradient(to bottom,#f7dfa5,#f0c14b);
  border-color: lightslategray;
  color: #111;
  font-weight: 100;
}

.buy-product-btn:hover {
  background: -webkit-linear-gradient(top,#f7dfa5,#f0c14b);
  background: linear-gradient(to bottom,#f7dfa5,#f0c14b);
  color: initial;
  font-weight: 100;
}

.buy-product-btn:focus, .buy-product-btn.focus {
  box-shadow: 0 0 0 0.2rem #f0c14b;
}

.buy-product-btn:not(:disabled):not(.disabled):active, .buy-product-btn:not(:disabled):not(.disabled).active,
.show > .buy-product-btn.dropdown-toggle {
  color: #111;
  background-color: #f7dfa5;
  border-color: #f0c14b;
}

.buy-product-btn:not(:disabled):not(.disabled):active:focus, .buy-product-btn:not(:disabled):not(.disabled).active:focus,
.show > .buy-product-btn.dropdown-toggle:focus {
  box-shadow: 0 0 0 0.2rem #f0c14b;
}
</style>
