<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-3 product-filter-sidebar">
        <div class="sidebar">
          <form>
            <div class="form-group">
              <label for="manufacturer">Manufacturer</label>
              <input type="text" class="form-control" id="manufacturer" placeholder="Enter a manufacturer">
            </div>
            <div class="form-group">
              <label for="manufacturer">Model</label>
              <input type="text" class="form-control" id="model" placeholder="Enter a model">
            </div>
          </form>
          <button class="btn btn-primary btn-block">Apply</button>
          <button class="btn btn-secondary btn-block">Reset</button>
        </div>
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
      isLoaded: false
    }
  },
  mounted () {
    setTimeout(() => {
      this.results = [{
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
            'ratingValue': '4'
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
            'ratingValue': '3'
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
        'imageUrl': 'https://www.shoei-helmets.com/pub/media/catalog/product/cache/1/image/700x560/e9c3970ab036de70892d86c6d221abfe/x/-/x-fourteen-white_2_2.png',
        'priceInUsd': '299.99',
        'certifications': {
          'SHARP': {
            'ratingType': 'stars',
            'ratingValue': '5'
          },
          'SNELL': {},
          'ECE': {},
          'DOT': {}
        },
        'score': '80'
      }]

      this.isLoaded = true
      this.$Progress.finish()
    }, 500)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.product-filter-sidebar {
  border-right: 1px solid #ccc;
  padding-top: 0.5rem;
}

.product-results {
  padding-top: 0.5rem;
}
</style>
