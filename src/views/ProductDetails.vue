<template>
    <div class="jumbotron" v-if="product">
        <div>
            <product-card v-bind:product="product" />
        </div>
        <div class="row product-details">
            <div class="col-12 col-lg-9">
                <div class="col-12 col-lg-12">
                    <section class="description-header">
                        <h5>Description</h5>
                    </section>
                    <section class="description-content" v-if="this.product.description">
                        <div>
                            <i>{{formattedDescription}}&nbsp;</i>
                            <span>
                                <a href="#" id="isReadMoreClicked" v-show="!this.isReadMoreClicked" v-on:click="triggerReadMore(true)">(Read More)</a>
                                <a href="#" id="isReadLessClicked" v-show="this.isReadMoreClicked" v-on:click="triggerReadMore(false)">(Read Less)</a>
                            </span>
                        </div>
                    </section>
                    <div class="description-content" v-if="!this.product.description">
                        <i>No description found.</i>
                    </div>
                </div>
            </div>

            <div class="col-12 col-lg-3">
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
import BuyOnRevzillaButton from '../components/BuyOnRevzillaButton'
import AddToProductSetButtonVue from '../components/AddToProductSetButton.vue'
import ProductCard from '../components/ProductCard'

const REVZILLA_SEARCH_URL = 'http://www.anrdoezrs.net/links/8505854/type/dlg/https://www.revzilla.com/search?_utf8=%E2%9C%93&query='
const MAX_DESCRIPTION_LENGTH = 1000

export default {
  name: 'ProductDetails',
  components: {
    'buy-on-revzilla-button': BuyOnRevzillaButton,
    'add-to-product-set-button': AddToProductSetButtonVue,
    'product-card': ProductCard
  },
  props: ['uuid'],
  data () {
    return {
      product: null,
      error: '',
      isReadMoreClicked: false
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
    formattedDescription: function () {
      const description = this.product.description
      if (!this.isReadMoreClicked && description.length > MAX_DESCRIPTION_LENGTH) {
        return description.substring(0, MAX_DESCRIPTION_LENGTH) + '...'
      }

      return description
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
    },
    triggerReadMore: function (b) {
      this.isReadMoreClicked = b
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

.description-header {
  margin-top: 32px;
  margin-left: 48px;
  margin-right: 48px;
  border-bottom-style: solid;
  border-bottom-width: 1px;
}

.description-content {
  margin: 32px 48px;
}

.specification-item {
  margin-left: 48px;
  margin-right: 32px;
  margin-top: 16px;
}

.product-details {
  margin: 32px 48px;
  justify-content: center;
}

@media only screen and (min-device-width : 0px) and (max-device-width : 991px) {
  .description-content {
    text-align: center;
    margin: 1px 1px;
  }

  .description-header {
    text-align: center;
  }

  .specification-item {
    text-align: center;
  }

  .specification-header{
    text-align: center;
  }
}

.error-message {
  color: #d33342;
}

.error-times {
  color: #d33342;
}
</style>
