<template>
    <div v-if="product">
        <div class="row product-details">
            <div class="col-12 col-lg-9">
                <section class="prices-header">
                    <h5>Prices</h5>
                </section>
                <div class="row prices-details">
                    <section class="col col-lg-4 prices-item">
                        <a target="_blank" v-bind:href="formattedRevzillaBuyURL">
                            <img alt="product image" v-if="this.product.imageKey" class="product-image" width="100" height="100" v-bind:src="imageURL"/>
                            <font-awesome-icon v-else icon="question-circle" size="5x" class="missing-product-image" />
                        </a>
                    </section>
                    <section class="col col-lg-4 prices-item">
                        <a target="_blank" v-bind:href="formattedRevzillaBuyURL">
                            <img alt="revzilla logo" class="product-image" width="259" height="49" src="../assets/revzilla.png"/>
                        </a>
                    </section>
                    <section class="col col-lg-4 prices-item">
                        <buy-on-revzilla-button v-bind:product="product"/>
                        <add-to-product-set-button v-bind:product="product" />
                    </section>
                </div>
            </div>
            <div class="col-12 col-lg-3">
                <section class="product-name">
                    <h6>{{this.product.type | capitalize}}</h6>
                    <h3>{{`${this.product.manufacturer} ${formattedModel}`}}</h3>
                </section>

                <section class="specification-header">
                    <h5>Specifications</h5>
                </section>
                <section class="specification-item">
                    <strong>Manufacturer</strong>
                    <p>{{this.product.manufacturer}}</p>
                    <hr>
                </section>
                <section class="specification-item">
                    <strong>Model(s)</strong>
                    <p>{{this.product.model}}</p>
                    <hr>
                </section>
                <section class="specification-item">
                    <strong>Product Type</strong>
                    <p>{{product.subtype | capitalize}} {{product.type | capitalize}}</p>
                    <hr>
                </section>
                <section class="specification-item" v-if="this.product.materials">
                    <strong>Materials</strong>
                    <p>{{this.product.materials | capitalize}}</p>
                    <hr>
                </section>
                <section class="specification-item" v-if="this.product.retentionSystem">
                    <strong>Retention System</strong>
                    <p>{{this.product.retentionSystem}}</p>
                    <hr>
                </section>
                <section class="specification-item" v-if="this.product.weightInLbs">
                    <strong>Weight (lbs)</strong>
                    <p>{{Math.round(this.product.weightInLbs * 100) / 100}}</p>
                    <hr>
                </section>
                <section class="specification-item" v-if="product.sizes && product.sizes.length">
                    <strong>Sizes</strong>
                    <p>{{this.product.sizes.join(', ')}}</p>
                    <hr>
                </section>
            </div>
        </div>
    </div>
    <div v-else-if="error">
        <small>
            <font-awesome-icon icon="times" class="error-times"/> <span class="error-message">{{error}}</span>
        </small>
    </div>
</template>

<script>
import formatCurrency from '../lib/currency'
import HelmetCertificationBadges from '../components/HelmetCertificationBadges'
import JacketCertificationBadges from '../components/JacketCertificationBadges'
import SharpImpactZone from '../components/SharpImpactZone'
import CEImpactZone from '../components/CEImpactZone'
import BuyOnRevzillaButton from '../components/BuyOnRevzillaButton'
import AddToProductSetButtonVue from '../components/AddToProductSetButton.vue'

const REVZILLA_SEARCH_URL = 'http://www.anrdoezrs.net/links/8505854/type/dlg/https://www.revzilla.com/search?_utf8=%E2%9C%93&query='

export default {
  name: 'ProductDetails',
  components: {
    'helmet-certification-badges': HelmetCertificationBadges,
    'jacket-certification-badges': JacketCertificationBadges,
    'sharp-impact-zone': SharpImpactZone,
    'jacket-impact-zone': CEImpactZone,
    'buy-on-revzilla-button': BuyOnRevzillaButton,
    'add-to-product-set-button': AddToProductSetButtonVue
  },
  props: ['uuid'],
  data () {
    return {
      product: null,
      error: ''
    }
  },
  async mounted () {
    await this.getProductDetailsAsync(this.uuid)
  },
  computed: {
    // todo these are copied from ProductDetails.vue, where should it live?
    formattedModel: function () {
      const aliases = this.product.modelAliases
      let modelToUse = this.product.model
      if (aliases && aliases.length) {
        const aliasObjForDisplay = aliases.find(alias => alias.isForDisplay)
        if (aliasObjForDisplay) {
          modelToUse = aliasObjForDisplay.modelAlias
        }
      }
      return modelToUse
    },
    formattedRevzillaBuyURL: function () {
      if (this.product.isDiscontinued) {
        return `${REVZILLA_SEARCH_URL}${this.product.manufacturer}+${this.product.type}`
      }

      const buyUrl = this.product.revzillaBuyURL
      if (buyUrl) {
        return buyUrl
      }

      const manufacturer = this.product.manufacturer
      const model = this.formattedModel

      return `${REVZILLA_SEARCH_URL}${manufacturer}+${model}`
    },
    imageURL: function () {
      return this.$environment.staticBaseURL + '/' + this.product.imageKey
    },
    productPrice: function () {
      const priceInUSD = this.product.revzillaPriceCents / 100.0
      return priceInUSD > 0 ? `${formatCurrency(priceInUSD)}` : `N/A`
    }
  },
  methods: {
    getProductDetailsAsync: async function (uuid) {
      this.$Progress.start()
      try {
        const resp = await this.$http.get(`${this.$environment.apiBaseURL}/v1/products/${uuid}`)
        this.product = resp.data
      } catch (err) {
        if (err && err.response && err.response.data && err.response.data.message) {
          this.error = err.response.data.message
        } else {
          this.error = 'The server encountered an internal error. Try again in a few moments.'
        }
      }

      this.$Progress.finish()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.specification-header {
  margin-top: 32px;
  margin-left: 48px;
  margin-right: 48px;
  border-bottom-style: solid;
  border-bottom-width: 1px;
}

.product-name {
    margin: 32px 48px;
}

.prices-header {
  margin-top: 32px;
  margin-left: 48px;
  margin-right: 48px;
  border-bottom-style: solid;
  border-bottom-width: 1px;
}

.specification-item {
  margin-left: 48px;
  margin-right: 32px;
  margin-top: 16px;
}

.product-details {
  margin-right: 0;
}

.missing-product-image {
  min-width: 200px;
  margin-left: 0.5em;
}

.prices-details {
  margin-left: 32px;
  margin-right: 32px;
  margin-top: 16px;
}

.prices-item {
  margin-top: 16px;
}

@media only screen and (min-device-width : 0px) and (max-device-width : 991px) {
  .prices-details {
    text-align: center;
  }

  .product-name{
    text-align: center;
  }

  .specification-item {
    text-align: center;
  }

  .specification-header{
    text-align: center;
  }

  .prices-header {
    display: none;
  }
}

.error-message {
  color: #d33342;
}

.error-times {
  color: #d33342;
}
</style>
