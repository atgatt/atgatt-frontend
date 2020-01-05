<template>
    <div class="col-12 col-lg buy-btn-col my-auto">
        <div>
            <button v-if="!isLoading" v-on:click="upsertItemOnActiveGearSet" class="btn revzilla-buy-btn"><font-awesome-icon icon="plus"/>&nbsp;
              <strong>
                &nbsp;Add to My Gear
              </strong>
            </button>
            <button v-else disabled class="btn revzilla-buy-btn"><font-awesome-icon icon="plus"/>&nbsp;
              <strong>
                <font-awesome-icon v-if="isLoading" icon="spinner" spin />&nbsp;Add to My Gear
              </strong>
            </button>
        </div>
    </div>
</template>

<script>
import { SOURCE_PRODUCT_SET_ID_KEY } from '../lib/constants'

export default {
  name: 'AddToProductSetButton',
  data () {
    return {
      'isLoading': false
    }
  },
  props: ['product'],
  methods: {
    async upsertItemOnActiveGearSet () {
      const sourceProductSetID = localStorage.getItem(SOURCE_PRODUCT_SET_ID_KEY) || null
      let resp = null
      let didEncounterError = false
      try {
        this.isLoading = true
        resp = await this.$http.post(`${this.$environment.apiBaseURL}/v1/product-sets`, {
          'sourceProductSetID': sourceProductSetID,
          'productID': this.product.uuid
        })
        this.$toasted.show('Added to gear set!', {
          icon: { name: 'check' },
          type: 'success',
          theme: 'bubble',
          position: 'top-right',
          duration: 2500
        })
      } catch (err) {
        this.$toasted.show('There was an error adding this product to your gear. Try again in a few moments.', {
          icon: { name: 'exclamation-triangle' },
          type: 'error',
          theme: 'bubble',
          position: 'top-right',
          duration: 2500
        })
        didEncounterError = true
      } finally {
        this.isLoading = false
      }

      if (resp && !didEncounterError) {
        const createdProductSetID = resp.data.id
        localStorage.setItem(SOURCE_PRODUCT_SET_ID_KEY, createdProductSetID)
        this.$router.push({ path: `/motorcycle-gear/${createdProductSetID}` })
      }
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
