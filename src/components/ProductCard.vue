<template>
  <div class="product-card">
    <div class="row product-header">
      <div class="col-12 col-lg my-auto">
        <router-link :to="{ path: `/${this.buyURLPrefix}/buy/${this.uriEncodedManufacturer}/${this.uriEncodedModel}/${this.product.uuid}` }" >
          <h4 class="my-auto">
            <strong>{{`${product.manufacturer} ${formattedModel}`}}</strong> <small class="model-aliases" v-if="formattedModelAliases"> ({{formattedModelAliases}})</small>
          </h4>
        </router-link>
        <router-link :to="ratingsURL" class="badge badge-primary product-badge">
          {{product.safetyPercentage}}% Safety Score
        </router-link>
        <span class="badge badge-secondary product-badge">
          {{product.subtype | capitalize}} {{product.type | capitalize}}
        </span>
        <span v-if="product.isDiscontinued" class="badge badge-danger product-badge">
          Discontinued
        </span>
      </div>
      <div class="col-12 col-lg my-auto">
        <buy-on-revzilla-button v-bind:product="product" />
        <modify-product-on-product-set-button v-if="this.useReplacementButton" v-bind:productType="this.product.type" isForReplacement="true" />
        <add-to-product-set-button v-else v-bind:product="product" />
      </div>
    </div>
    <div class="row product-body">
      <div class="col-12 col-lg align-self-center">
        <a target="_blank" v-bind:href="formattedRevzillaBuyURL">
          <img v-if="product.imageKey" class="product-image" width="200" height="200" v-bind:src="imageURL" v-bind:alt="this.altText" />
          <font-awesome-icon v-else icon="question-circle" size="5x" class="missing-product-image" />
        </a>
      </div>
      <div class="col-12 col-lg align-self-center">
        <helmet-certification-badges v-if="isHelmet" v-bind:product="product" />
        <jacket-certification-badges v-else-if="isJacket" v-bind:product="product" />
        <pants-certification-badges v-else-if="isPants" v-bind:product="product" />
        <boots-certification-badges v-else-if="isBoots" v-bind:product="product" />
        <gloves-certification-badges v-else v-bind:product="product" />
      </div>
      <div class="col-6 col-lg impact-zone-col">
        <sharp-impact-zone v-if="isHelmet" v-bind:certification="product.helmetCertifications.SHARP" zoneId="top" />
        <ce-impact-zone v-bind:productType="product.type" v-else-if="isJacket" v-bind:certification="product.jacketCertifications.chest" assetsSubDir="jackets" zoneId="chest" />
        <ce-impact-zone v-bind:productType="product.type" v-else-if="isPants" v-bind:certification="product.pantsCertifications.tailbone" assetsSubDir="pants" zoneId="tailbone" />
        <ce-impact-zone v-bind:productType="product.type" v-else-if="isBoots" v-bind:certification="product.bootsCertifications.overall" assetsSubDir="boots" zoneId="overall" />
        <ce-impact-zone v-bind:productType="product.type" v-else v-bind:certification="product.glovesCertifications.overall" assetsSubDir="gloves" zoneId="overall" />
      </div>
      <div class="col-6 col-lg impact-zone-col">
        <sharp-impact-zone v-if="isHelmet" v-bind:certification="product.helmetCertifications.SHARP" zoneId="left" />
        <ce-impact-zone v-bind:productType="product.type" v-else-if="isJacket" v-bind:certification="product.jacketCertifications.elbow" assetsSubDir="jackets" zoneId="elbow" />
        <ce-impact-zone v-bind:productType="product.type" v-else-if="isPants" v-bind:certification="product.pantsCertifications.knee" assetsSubDir="pants" zoneId="knee" />
      </div>
      <div class="col-6 col-lg impact-zone-col">
        <sharp-impact-zone v-if="isHelmet" v-bind:certification="product.helmetCertifications.SHARP" zoneId="right" />
        <ce-impact-zone v-bind:productType="product.type" v-else-if="isJacket" v-bind:certification="product.jacketCertifications.shoulder" assetsSubDir="jackets" zoneId="shoulder" />
        <ce-impact-zone v-bind:productType="product.type" v-else-if="isPants" v-bind:certification="product.pantsCertifications.hip" assetsSubDir="pants" zoneId="hip" />
      </div>
      <div class="col-6 col-lg impact-zone-col">
        <sharp-impact-zone v-if="isHelmet" v-bind:certification="product.helmetCertifications.SHARP" zoneId="rear" />
        <ce-impact-zone v-bind:productType="product.type" v-else-if="isJacket" v-bind:certification="product.jacketCertifications.back" assetsSubDir="jackets" zoneId="back" />
      </div>
    </div>
  </div>
</template>

<script>
import HelmetCertificationBadges from '../components/HelmetCertificationBadges'
import JacketCertificationBadges from '../components/JacketCertificationBadges'
import PantsCertificationBadges from '../components/PantsCertificationBadges'
import BootsCertificationBadges from '../components/BootsCertificationBadges'
import GlovesCertificationBadges from '../components/GlovesCertificationBadges'
import SharpImpactZone from '../components/SharpImpactZone'
import CEImpactZone from './CEImpactZone'
import BuyOnRevzillaButton from '../components/BuyOnRevzillaButton'
import AddToProductSetButton from './AddToProductSetButton.vue'
import ModifyProductOnProductSetButton from './ModifyProductOnProductSetButton.vue'
import { capitalize } from '../lib/text'

const REVZILLA_SEARCH_URL = 'http://www.anrdoezrs.net/links/8505854/type/dlg/https://www.revzilla.com/search?_utf8=%E2%9C%93&query='

export default {
  name: 'ProductCard',
  components: {
    'helmet-certification-badges': HelmetCertificationBadges,
    'jacket-certification-badges': JacketCertificationBadges,
    'pants-certification-badges': PantsCertificationBadges,
    'boots-certification-badges': BootsCertificationBadges,
    'gloves-certification-badges': GlovesCertificationBadges,
    'sharp-impact-zone': SharpImpactZone,
    'ce-impact-zone': CEImpactZone,
    'buy-on-revzilla-button': BuyOnRevzillaButton,
    'add-to-product-set-button': AddToProductSetButton,
    'modify-product-on-product-set-button': ModifyProductOnProductSetButton
  },
  props: ['product', 'useReplacementButton'],
  computed: {
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
    buyURLPrefix: function () {
      if (this.product.type.endsWith('s')) {
        return `motorcycle-${this.product.type}`
      }
      return `motorcycle-${this.product.type}s`
    },
    isHelmet: function () {
      return this.product.type === 'helmet'
    },
    isJacket: function () {
      return this.product.type === 'jacket'
    },
    isPants: function () {
      return this.product.type === 'pants'
    },
    isBoots: function () {
      return this.product.type === 'boots'
    },
    isGloves: function () {
      return this.product.type === 'gloves'
    },
    imageURL: function () {
      return this.$environment.staticBaseURL + '/' + this.product.imageKey
    },
    altText: function () {
      return capitalize(`${this.product.manufacturer} ${this.formattedModel} motorcycle ${this.product.type}`)
    },
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
    uriEncodedModel: function () {
      return encodeURIComponent(this.formattedModel)
    },
    uriEncodedManufacturer: function () {
      return encodeURIComponent(this.product.manufacturer)
    },
    formattedModelAliases: function () {
      const aliases = this.product.modelAliases
      if (aliases && aliases.length) {
        const aliasObjsNotForDisplay = aliases.filter(alias => !alias.isForDisplay)
        const aliasObjForDisplay = aliases.find(alias => alias.isForDisplay)

        const aliasesNotForDisplay = aliasObjsNotForDisplay ? aliasObjsNotForDisplay.map(alias => alias.modelAlias) : []
        let combinedAliases
        if (aliasObjForDisplay) {
          combinedAliases = [this.product.model, ...aliasesNotForDisplay]
        } else {
          combinedAliases = aliasesNotForDisplay
        }
        return combinedAliases.join(', ')
      }
      return null
    },
    ratingsURL () {
      return `about-${this.product.type}-ratings`
    }
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
