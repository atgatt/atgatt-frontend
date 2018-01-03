<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-3 product-filter-sidebar">
        <product-filter-sidebar v-on:filtersChanged="onFiltersChangedAsync" />
      </div>
      <div v-if="results.length" class="col-9 product-results">
        <div class="row">
          <div class="col-3">
            <div class="form-group">
              <label for="sortBy">Sort By:</label>
              <select v-model="order.field" id="orderByField" class="form-control">
                <option value="document->>'priceInUsd'">Price</option>
                <option value="document->>'manufacturer'">Manufacturer</option>
                <option value="document->>'model'">Model</option>
              </select>
            </div>
          </div>
          <div class="col-6"></div>
          <div class="col-3">
            <div class="form-group">
              <label for="orderByDirection">Direction:</label>
              <select v-model="order.descending" id="orderByDirection" class="form-control">
                <option value="false">Ascending</option>
                <option value="true">Descending</option>
              </select>
            </div>
          </div>
        </div>
        <div v-for="result in results" v-bind:key="result.uuid">
          <product-card v-bind:product="result" />
        </div>
        <div class="load-more-button">
          <button v-if="hasMore" class="btn btn-primary" v-on:click="loadMoreAsync">Load More</button>
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
      limit: 10,
      currFilters: null,
      hasMore: true,
      order: {
        field: 'document->>\'priceInUsd\'',
        descending: false
      }
    }
  },
  watch: {
    order: {
      async handler (val) {
        await this.onFiltersChangedAsync(this.currFilters)
      },
      deep: true
    }
  },
  methods: {
    fetchDataAsync: async function (filters) {
      this.currFilters = filters
      const request = Object.assign({}, filters)
      request.start = this.start
      request.limit = this.limit

      const order = Object.assign({}, this.order)
      order.descending = order.descending === 'true'
      request.order = order

      const response = await http.post(`${this.$environment.apiBaseUrl}/v1/products/filter`, request)
      return response.data
    },
    onFiltersChangedAsync: async function (filters) {
      this.isLoaded = false
      this.hasMore = true
      this.$Progress.start()
      this.start = 0
      try {
        this.results = await this.fetchDataAsync(filters)
      } catch (err) {
        console.error('Got an exception while loading data: ', err)
        this.results = []
      }

      this.$Progress.finish()
      this.isLoaded = true
    },
    loadMoreAsync: async function () {
      this.start += this.limit
      if (!this.currFilters) {
        throw new Error('Cannot load more when there are no filters applied')
      }

      const additionalResults = await this.fetchDataAsync(this.currFilters)
      if (additionalResults.length > 0) {
        this.results.push(...additionalResults)
      } else {
        this.hasMore = false
      }
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

.load-more-button {
  text-align: center;
  padding-bottom: 1rem;
}

.load-more-button > button {
  padding-left: 2rem;
  padding-right: 2rem;
  cursor: pointer;
}
</style>
