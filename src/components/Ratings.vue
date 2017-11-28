<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-3 product-filter-sidebar">
        <product-filter-sidebar v-on:filtersChanged="onFiltersChangedAsync" />
      </div>
      <div v-if="results.length" class="col-9 product-results">
        <div v-for="result in results" v-bind:key="result.uid">
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
    fetchDataAsync: async function () {
      const promise = new Promise((resolve, reject) => {
        let results = []
        setTimeout(() => {
          results = [{
            'uid': 'abc',
            'amazonProductId': 'A12341QC',
            'manufacturer': 'Shoei',
            'model': 'RF-SR',
            'imageUrl': 'https://www.shoei-helmets.com/pub/media/catalog/product/cache/1/image/700x560/e9c3970ab036de70892d86c6d221abfe/x/-/x-fourteen-white_2_2.png',
            'priceInUsd': '399.99',
            'certifications': {
              'SNELL': {},
              'ECE': {},
              'DOT': {}
            },
            'score': '76'
          },
          {
            'uid': 'def',
            'type': 'helmet',
            'subtype': 'fullface',
            'amazonProductId': 'A45561QB',
            'manufacturer': 'Shoei',
            'model': 'RF-1200',
            'imageUrl': 'https://www.shoei-helmets.com/pub/media/catalog/product/cache/1/image/700x560/e9c3970ab036de70892d86c6d221abfe/x/-/x-fourteen-white_2_2.png',
            'priceInUsd': '499.99',
            'certifications': {
              'SHARP': {
                'ratingType': 'stars',
                'ratingValue': '4',
                'impactZoneRatings': {
                  'left': 5,
                  'right': 4,
                  'top': {
                    'front': 0,
                    'rear': 5
                  },
                  'rear': 3
                }
              },
              'SNELL': {},
              'ECE': {},
              'DOT': {}
            },
            'score': '70'
          },
          {
            'uid': 'ghi',
            'type': 'helmet',
            'subtype': 'fullface',
            'amazonProductId': 'A45561QB',
            'manufacturer': 'Shoei',
            'model': 'RF-1100',
            'imageUrl': 'https://www.shoei-helmets.com/pub/media/catalog/product/cache/1/image/700x560/e9c3970ab036de70892d86c6d221abfe/x/-/x-fourteen-white_2_2.png',
            'priceInUsd': '259.99',
            'certifications': {
              'SHARP': {
                'ratingType': 'stars',
                'ratingValue': '3',
                'impactZoneRatings': {
                  'left': 5,
                  'right': 4,
                  'top': {
                    'front': 3,
                    'rear': 2
                  },
                  'rear': 1
                }
              },
              'SNELL': {},
              'ECE': {},
              'DOT': {}
            },
            'score': '65'
          },
          {
            'uid': 'jkl',
            'type': 'helmet',
            'subtype': 'fullface',
            'amazonProductId': 'A45561QB',
            'manufacturer': 'Shoei',
            'model': 'Qwest',
            'imageUrl': 'https://sharp.dft.gov.uk/wp-content/uploads/2017/03/shoei-xr-1100-150x150.jpg',
            'priceInUsd': '299.99',
            'certifications': {
              'SHARP': {
                'ratingType': 'stars',
                'ratingValue': '5',
                'impactZoneRatings': {
                  'left': 5,
                  'right': 4,
                  'top': {
                    'front': 0,
                    'rear': 5
                  },
                  'rear': 3
                }
              },
              'SNELL': {},
              'ECE': {},
              'DOT': {}
            },
            'score': '80'
          }]

          resolve(results)
        }, 500)
      })
      return promise
    },
    onFiltersChangedAsync: async function (filters) {
      this.isLoaded = false
      this.results = []
      this.$Progress.start()

      try {
        this.results = await this.fetchDataAsync()
        this.isLoaded = true
        this.$Progress.finish()
      } catch (err) {
        console.err('Got an exception while loading data: ', err)
        this.isLoaded = true
        this.results = []
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
</style>
