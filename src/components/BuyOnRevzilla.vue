<template>
    <div class="col-12 col-lg buy-btn-col my-auto">
        <div>
            <a v-bind:href="formattedRevzillaBuyURL" target="_blank" class="btn revzilla-buy-btn"><font-awesome-icon icon="cart-plus"/>&nbsp;<strong>{{formattedRevzillaBuyText}}</strong></a>
        </div>
    </div>
</template>

<script>
import formatCurrency from '../lib/currency'

const REVZILLA_SEARCH_URL = 'http://www.anrdoezrs.net/links/8505854/type/dlg/https://www.revzilla.com/search?_utf8=%E2%9C%93&query='
const REVZILLA_BUY_TEXT_PREFIX = 'Buy on RevZilla for'

export default {
  name: 'BuyOnRevzilla',
  props: ['product'],
  computed: {
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
    formattedRevzillaBuyText: function () {
      if (this.product.isDiscontinued) {
        return `Buy another ${this.product.manufacturer} ${this.product.type} on RevZilla`
      }

      // Buy on RevZilla for {{formattedRevzillaPrice}}
      const priceInUSD = this.product.revzillaPriceCents / 100.0
      return priceInUSD > 0 ? `${REVZILLA_BUY_TEXT_PREFIX} ${formatCurrency(priceInUSD)}` : `${REVZILLA_BUY_TEXT_PREFIX} a mystery price!`
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
    }
  }
}
</script>

<style scoped>
.buy-btn-col {
  text-align: right;
}

.revzilla-buy-btn {
  background: -webkit-linear-gradient(top,#f7dfa5,#f0c14b);
  background: linear-gradient(to bottom,#f7dfa5,#f0c14b);
  border-color: lightslategray;
  color: #111;
  font-weight: 100;
  white-space: normal;
  width: 100%;
  max-width: 300px;
}
.revzilla-buy-btn:hover {
  background: -webkit-linear-gradient(top,#f7dfa5,#f0c14b);
  background: linear-gradient(to bottom,#f7dfa5,#f0c14b);
  color: initial;
  font-weight: 100;
}
.revzilla-buy-btn:focus, .revzilla-buy-btn.focus {
  box-shadow: 0 0 0 0.2rem #f0c14b;
}
.revzilla-buy-btn:not(:disabled):not(.disabled):active, .revzilla-buy-btn:not(:disabled):not(.disabled).active,
.show > .revzilla-buy-btn.dropdown-toggle {
  color: #111;
  background-color: #f7dfa5;
  border-color: #f0c14b;
}
.revzilla-buy-btn:not(:disabled):not(.disabled):active:focus, .revzilla-buy-btn:not(:disabled):not(.disabled).active:focus,
.show > .revzilla-buy-btn.dropdown-toggle:focus {
  box-shadow: 0 0 0 0.2rem #f0c14b;
}

@media only screen and (min-device-width : 0px) and (max-device-width : 991px) {
  .buy-btn-col {
      padding-top: 5px;
      text-align: center;
  }
}

</style>
