<template>
  <div>
    <span v-if="this.error">{{ this.error }}</span>
    <span v-else-if="!this.isLoaded">Loading...</span>
    <div class="jumbotron" v-if="this.isLoaded">
      <h1 class="display-3">Gear List</h1>
      <span>Link: aaa</span>
      <product-card v-if="this.helmet" v-bind:product="this.helmet" useReplacementButton="true" />
      <placeholder-product-card productType="helmet" v-else />

      <product-card v-if="this.jacket" v-bind:product="this.jacket" useReplacementButton="true" />
      <placeholder-product-card productType="jacket" v-else />

      <product-card v-if="this.pants" v-bind:product="this.pants" useReplacementButton="true" />
      <placeholder-product-card productType="pants" v-else />

      <product-card v-if="this.boots" v-bind:product="this.boots" useReplacementButton="true" />
      <placeholder-product-card productType="boots" v-else />

      <product-card v-if="this.gloves" v-bind:product="this.gloves" useReplacementButton="true" />
      <placeholder-product-card productType="gloves" v-else />
    </div>
  </div>
</template>

<script>
import http from 'axios'
import ProductCard from '../components/ProductCard.vue'
import PlaceholderProductCard from '../components/PlaceholderProductCard.vue'

export default {
  name: 'ProductSetDetails',
  components: {
    'product-card': ProductCard,
    'placeholder-product-card': PlaceholderProductCard
  },
  props: ['productSetID'],
  data () {
    return {
      helmet: null,
      jacket: null,
      pants: null,
      boots: null,
      gloves: null,
      isLoaded: false,
      error: null
    }
  },
  async mounted () {
    let resp = null
    try {
      resp = await http.get(`${this.$environment.apiBaseURL}/v1/product-sets/${this.productSetID}`)
      this.helmet = resp.data.helmetProduct
      this.jacket = resp.data.jacketProduct
      this.pants = resp.data.pantsProduct
      this.boots = resp.data.bootsProduct
      this.gloves = resp.data.glovesProduct
      this.isLoaded = true
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
</script>

<style>
</style>
