<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-3 product-filter-sidebar">
        <product-filter-sidebar v-on:filtersChanged="onFiltersChangedAsync" />
      </div>
      <div v-if="results.length" class="col-9 product-results">
        <div v-for="result in results" v-bind:key="result.uuid">
          <product-card v-bind:product="result" />
        </div>
      </div>
      <div v-else class="col-9 product-results">
        <span v-if="isLoaded">There are no products that match your current set of filters.</span>
        <span v-else>Loading...</span>
      </div>
    </div>
  </div>
</template>

<script>
import http from 'axios'
export default {
  name: 'Ratings',
  data () {
    return {
      results: [],
      isLoaded: false,
      start: 0,
      limit: 25
    }
  },
  methods: {
    fetchDataAsync: async function (filters) {
      const request = Object.assign({}, filters)
      request.start = this.start
      request.limit = this.limit

      const response = await http.post(`${this.$environment.apiBaseUrl}/v1/products/filter`, request)
      return response.data
    },
    onFiltersChangedAsync: async function (filters) {
      this.isLoaded = false
      this.$Progress.start()

      try {
        this.results = await this.fetchDataAsync(filters)
      } catch (err) {
        console.error('Got an exception while loading data: ', err)
        this.results = []
      }

      this.$Progress.finish()
      this.isLoaded = true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.product-results {
  padding-top: 0.5rem;
}

.product-filter-sidebar {
  border-right: 1px solid #ccc;
  padding-top: 0.5rem;
}
</style>
