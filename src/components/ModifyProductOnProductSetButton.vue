<template>
    <div :class="wrapperClass">
        <div>
            <router-link :to="productTypeURL" class="btn revzilla-buy-btn"><font-awesome-icon v-bind:icon="actionIcon"/>&nbsp;
              <strong>
                &nbsp;{{ productTypeText }}
              </strong>
            </router-link>
        </div>
    </div>
</template>

<script>
import { capitalize } from '../lib/text'
export default {
  name: 'AddToProductSetButton',
  data () {
    return {
      'isLoading': false
    }
  },
  props: ['productType', 'isForReplacement'],
  computed: {
    productTypeURL () {
      let urlSuffix = ''

      switch (this.productType) {
        case 'helmet':
        case 'jacket':
          urlSuffix = `${this.productType}s`
          break
        default:
          urlSuffix = this.productType
          break
      }
      return `/motorcycle-${urlSuffix}`
    },
    wrapperClass () {
      return this.isForReplacement ? 'col-12 col-lg buy-btn-col my-auto' : 'col-12 col-lg buy-btn-col-center my-auto'
    },
    productTypeText () {
      const capitalizedProductType = capitalize(this.productType)
      return this.isForReplacement ? `Replace ${capitalizedProductType}` : `Add ${capitalizedProductType}`
    },
    actionIcon () {
      return this.isForReplacement ? 'exchange-alt' : 'plus'
    }
  }
}
</script>

<style scoped>
.disabled {
  cursor: not-allowed;
}

.buy-btn-col {
  text-align: right;
}

.buy-btn-col-center {
  text-align: center;
}

.revzilla-buy-btn {
  background: -webkit-linear-gradient(top,lightblue,skyblue);
  background: linear-gradient(to bottom,lightblue,skyblue);
  border-color: lightslategray;
  color: #111;
  font-weight: 100;
  white-space: normal;
  width: 100%;
  max-width: 300px;
}
.revzilla-buy-btn:hover {
  background: -webkit-linear-gradient(top,lightblue,skyblue);
  background: linear-gradient(to bottom,lightblue,skyblue);
  color: initial;
  font-weight: 100;
}
.revzilla-buy-btn:focus, .revzilla-buy-btn.focus {
  box-shadow: 0 0 0 0.2rem skyblue;
}
.revzilla-buy-btn:not(:disabled):not(.disabled):active, .revzilla-buy-btn:not(:disabled):not(.disabled).active,
.show > .revzilla-buy-btn.dropdown-toggle {
  color: #111;
  background-color: lightblue;
  border-color: skyblue;
}
.revzilla-buy-btn:not(:disabled):not(.disabled):active:focus, .revzilla-buy-btn:not(:disabled):not(.disabled).active:focus,
.show > .revzilla-buy-btn.dropdown-toggle:focus {
  box-shadow: 0 0 0 0.2rem skyblue;
}

@media only screen and (min-device-width : 0px) and (max-device-width : 991px) {
  .buy-btn-col {
      padding-top: 5px;
      text-align: center;
  }
}

</style>
