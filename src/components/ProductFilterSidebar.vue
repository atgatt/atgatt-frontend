<template>
  <div class="sidebar">
    <form>
      <div class="form-group">
        <label for="manufacturer">Manufacturer</label>
        <input type="text" class="form-control" v-model="manufacturer" id="manufacturer" placeholder="Enter a manufacturer" v-on:keyup="applyFilters">
      </div>
      <div class="form-group">
        <label for="manufacturer">Model</label>
        <input type="text" class="form-control" v-model="model" id="model" placeholder="Enter a model" v-on:keyup="applyFilters">
      </div>
      <div class="form-group">
        <div>Certifications</div>
        <div class="form-check form-check-inline">
          <label class="form-check-label">
            <input class="form-check-input" v-model="certifications.SHARP" type="checkbox" id="sharp-checkbox" v-on:change="applyFilters"> SHARP
          </label>
        </div>
        <div class="form-check form-check-inline">
          <label class="form-check-label">
            <input class="form-check-input" v-model="certifications.SNELL" type="checkbox" id="snell-checkbox" v-on:change="applyFilters"> SNELL
          </label>
        </div>
        <div class="form-check form-check-inline">
          <label class="form-check-label">
            <input class="form-check-input" v-model="certifications.ECE" type="checkbox" id="ece-checkbox" v-on:change="applyFilters"> ECE
          </label>
        </div>
        <div class="form-check form-check-inline">
          <label class="form-check-label">
            <input class="form-check-input" v-model="certifications.DOT" type="checkbox" id="dot-checkbox" v-on:change="applyFilters"> DOT
          </label>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <button type="button" v-on:click="resetFilters" class="btn btn-secondary btn-block"><i class="fa fa-reset"/> Reset</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'ProductFilterSidebar',
  data () {
    return {
      manufacturer: null,
      model: null,
      certifications: {
        SHARP: false,
        SNELL: false,
        ECE: false,
        DOT: false
      },
      impactZoneMinimums: {
        left: 0,
        right: 0,
        top: {
          front: 0,
          rear: 0
        },
        rear: 0
      },
      minPrice: 0,
      maxPrice: null
    }
  },
  methods: {
    applyFilters: function () {
      this.$emit('filtersChanged', this.$data)
    },
    resetFilters: function () {
      this.manufacturer = null
      this.model = null
      this.certifications = {
        SHARP: false,
        SNELL: false,
        ECE: false,
        DOT: false
      }
      this.impactZoneMinimums = {
        left: 0,
        right: 0,
        top: {
          front: 0,
          rear: 0
        },
        rear: 0
      }
      this.minPrice = 0
      this.maxPrice = 0

      this.applyFilters()
    }
  },
  mounted () {
    this.applyFilters()
  }
}
</script>

<style scoped>

</style>
