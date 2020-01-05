<template>
  <form class="form-inline">
    <button class="btn btn-primary" v-on:click="routeToProductSet" type="button">My Gear</button>
  </form>
</template>

<script>
import { SOURCE_PRODUCT_SET_ID_KEY } from '../lib/constants'
export default {
  name: 'my-gear-nav-item',
  methods: {
    routeToProductSet () {
      const productSetID = localStorage.getItem(SOURCE_PRODUCT_SET_ID_KEY)
      if (!productSetID) {
        this.$toasted.show('You don\'t have any products added to your gear yet. Click the \'Add to My Gear\' button next to any product to enable this page!', {
          icon: { name: 'exclamation-triangle' },
          type: 'warning',
          theme: 'bubble',
          position: 'top-right',
          duration: 2500
        })
        return
      }

      this.$router.push({ path: `/motorcycle-gear/${productSetID}` })
    }
  }
}
</script>

<style>
.new-text {
  padding-left: 5px;
}
</style>
