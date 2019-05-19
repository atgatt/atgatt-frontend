<template>
  <div class="container-fluid">
    <div class="row">
      <div class="d-none d-lg-block col-lg-3 product-filter-sidebar">
        <product-filter-sidebar v-bind:initialManufacturer="initialManufacturer" v-bind:initialModel="initialModel" v-bind:type="type" v-on:filtersChanged="onFiltersChangedAsync" />
      </div>
      <div class="col-12 col-lg-9 product-results">
        <div class="row sort-row">
          <div class="col-4 col-lg-3">
            <div class="form-group">
              <label for="sortBy">Sort By:</label>
              <select v-model="order.field" id="orderByField" class="form-control">
                <option value="document->>'safetyPercentage'">Safety</option>
                <option value="document->>'searchPriceCents'">Price</option>
                <option value="document->>'manufacturer'">Manufacturer</option>
                <option value="document->>'model'">Model</option>
              </select>
            </div>
          </div>
          <div class="d-none d-lg-block col-lg-6"></div>
          <div class="col-4 col-lg-3">
            <div class="form-group">
              <label for="orderByDirection">Direction:</label>
              <select v-model="order.descending" id="orderByDirection" class="form-control">
                <option value="false">Lowest First</option>
                <option value="true">Highest First</option>
              </select>
            </div>
          </div>
          <div class="col-4 d-lg-none d-xs-block">
            <div class="form-group">
              <label for="toggleFilters">Filters:</label>
              <button id="toggleFilters" v-on:click="toggleFilters" class="btn btn-info"><font-awesome-icon icon="filter" /> {{toggleFiltersText}}</button>
            </div>
          </div>
        </div>
        <div v-show="showFilters" class="d-xs-block d-lg-none product-filter-sidebar">
          <product-filter-sidebar v-bind:initialManufacturer="initialManufacturer" v-bind:initialModel="initialModel" v-bind:type="type" v-bind:show-filters="showFilters" v-on:filtersChanged="onFiltersChangedAsync" />
        </div>
        <hr class="d-xs-block d-lg-none sort-separator" />
        <div v-if="results.length">
          <div v-for="result in results" v-bind:key="result.uuid">
            <product-card v-bind:product="result" />
          </div>
        </div>
        <div v-if="results.length" class="load-more-button">
          <button v-if="hasMore" class="btn btn-info" v-on:click="loadMoreAsync">Load More</button>
        </div>
        <div v-else class="col-12 product-results">
          <span v-if="isLoaded"><font-awesome-icon icon="exclamation-triangle" class="no-results-icon" /> There are no products that match your current set of filters.</span>
          <span v-else>Loading...</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import http from 'axios'
import ProductCard from '../components/ProductCard'
import ProductFilterSidebar from '../components/ProductFilterSidebar'

export default {
  name: 'Ratings',
  props: ['initialManufacturer', 'initialModel', 'type'],
  components: {
    'product-card': ProductCard,
    'product-filter-sidebar': ProductFilterSidebar
  },
  data () {
    return {
      results: [],
      isLoaded: false,
      start: 0,
      limit: 10,
      currFilters: null,
      showFilters: false,
      hasMore: true,
      order: {
        field: 'document->>\'safetyPercentage\'',
        descending: true
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
  computed: {
    toggleFiltersText: function () {
      return this.showFilters ? 'Hide' : 'Show'
    }
  },
  methods: {
    fetchDataAsync: async function (filters) {
      this.currFilters = filters
      const request = Object.assign({}, filters)
      request.start = this.start
      request.limit = this.limit
      request.type = this.type

      const order = Object.assign({}, this.order)

      // TODO: for some reason, when the dropdown is clicked then the value is a string, otherwise its a bool
      order.descending = order.descending === 'true' || order.descending === true
      request.order = order

      const response = await http.post(`${this.$environment.apiBaseURL}/v1/products/filter`, request)
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
        // eslint-disable-next-line
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
    },
    toggleFilters: function () {
      this.showFilters = !this.showFilters
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.sort-separator {
  margin-top: -0.1em;
}

#toggleFilters {
  width: 100%;
}

.product-results {
  padding-top: 0.5rem;
}

.product-filter-sidebar {
  border-right: 1px solid #ccc;
  padding-top: 0.5rem;
}

/* xs through md */
@media only screen and (min-device-width : 0px) and (max-device-width : 991px) {
  .product-filter-sidebar {
    border-right: none;
    padding-top: 0;
  }
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

.no-results-icon {
  color: orange;
}
</style>
