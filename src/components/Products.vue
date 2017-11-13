<template>
  <div class="row">
    <div class="col-4 product-filter-sidebar">
      <form>
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
        </div>
      </form>
    </div>
    <div v-if="results.length" class="col-8 product-results">
      <div v-for="result in results" v-bind:key="result.uid">
        <product-card v-bind:product="result" />
      </div>
      <button type="button" class="btn btn-primary">Load more...</button>
    </div>
    <div v-else class="col-8 product-results">
      <span>There are no products that match your current set of filters.</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Products',
  data () {
    return {
      results: []
    }
  },
  mounted () {
    setTimeout(() => {
      this.results = [{
        'uid': 'abc',
        'amazonProductId': 'A12341QC',
        'manufacturer': 'Shoei',
        'model': 'RF-SR',
        'imageUrl': 'https://picsum.photos/200/200/?random',
        'priceInUsd': '399.99',
        'certifications': {
          'SNELL': {},
          'ECE': {},
          'DOT': {}
        }
      },
      {
        'uid': 'def',
        'type': 'helmet',
        'subtype': 'fullface',
        'amazonProductId': 'A45561QB',
        'manufacturer': 'Shoei',
        'model': 'RF-1200',
        'imageUrl': 'https://picsum.photos/200/200/?random',
        'priceInUsd': '499.99',
        'certifications': {
          'SHARP': {
            'rating': '4'
          },
          'SNELL': {},
          'ECE': {},
          'DOT': {}
        }
      }]

      this.$Progress.finish()
    }, 500)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.product-filter-sidebar {
  border-right: 0.1rem solid black;
  padding-top: 0.5rem;
}

.product-results { 
  padding-top: 0.5rem;
}
</style>
