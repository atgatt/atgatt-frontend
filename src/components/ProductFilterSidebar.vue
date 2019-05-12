<template>
  <div class="sidebar">
    <form>
      <div class="row">
        <div class="col">
          <h5>General</h5>
        </div>
        <div class="col reset-button-col">
          <button type="button" v-on:click="resetFilters" class="btn btn-sm btn-secondary btn-block"><font-awesome-icon icon="undo" /> Reset Filters</button>
        </div>
      </div>
      <div class="form-group">
        <label for="manufacturer">Manufacturer</label>
        <input type="text" class="form-control" v-model="filters.manufacturer" id="manufacturer-input" placeholder="Start typing a manufacturer...">
      </div>
      <div class="form-group">
        <label for="manufacturer">Model</label>
        <input type="text" class="form-control" v-model="filters.model" id="model-input" placeholder="Start typing a model...">
      </div>
      <div class="form-group">
        <label for="type">Type</label>
        <v-select ref="subtypesmultiselect" multiple v-model="filters.subtypes" v-bind:reduce="option => option.value" v-bind:options="subtypeMultiselectOptions" placeholder="Select one or more types..."></v-select>
      </div>
      <div class="form-group">
        <label for="price-slider">Price Range</label>
        <vue-slider ref="priceslider" id="price-slider" v-bind="usdPriceRangeSliderOptions" v-model="filters.usdPriceRange"></vue-slider>
      </div>
      <div class="form-group">
        <div class="form-check">
          <label class="form-check-label">
            <input class="form-check-input" v-model="filters.excludeDiscontinued" type="checkbox" id="exclude-discontinued-checkbox"> Exclude discontinued products
          </label>
        </div>
      </div>
      <h5>
        Requirements
      </h5>
      <helmet-certification-filters v-if="shouldShowHelmetFilters" v-bind:certifications="filters.helmetCertifications" />
      <jacket-certification-filters v-else v-bind:certifications="filters.jacketCertifications" />
    </form>
  </div>
</template>

<script>
import VueSelect from 'vue-select'
import vueSlider from 'vue-slider-component'
import formatCurrency from '../lib/currency'
import HelmetCertificationFilters from './HelmetCertificationFilters'
import JacketCertificationFilters from './JacketCertificationFilters'

function getDefaultData (type) {
  const data = {
    subtypeMultiselectOptions: [],
    usdPriceRangeSliderOptions: {
      min: 0,
      max: 140000,
      tooltip: 'hover',
      formatter: function (value) {
        return formatCurrency(parseInt(value / 100.0))
      }
    },
    filters: {
      subtypes: [],
      manufacturer: null,
      model: null,
      helmetCertifications: null,
      jacketCertifications: null,
      usdPriceRange: [0, 140000],
      order: {
        field: 'document->>\'safetyPercentage\'',
        descending: true
      },
      excludeDiscontinued: false
    }
  }

  switch (type) {
    case 'helmet':
      data.filters.helmetCertifications = {
        SHARP: null,
        SNELL: false,
        ECE: false,
        DOT: false
      }

      data.subtypeMultiselectOptions = [
        { value: 'full', label: 'Full Face' },
        { value: 'modular', label: 'Modular' }
      ]
      break
    case 'jacket':
      data.filters.jacketCertifications = {
        shoulder: null,
        elbow: null,
        back: null,
        chest: null,
        fitsAirbag: false
      }

      data.subtypeMultiselectOptions = [
        { value: 'leather', label: 'Leather' },
        { value: 'goretex', label: 'Gore-Tex' },
        { value: 'textile', label: 'Textile' }
      ]
      break
  }

  return data
}

export default {
  name: 'ProductFilterSidebar',
  components: {
    vueSlider,
    'v-select': VueSelect,
    'helmet-certification-filters': HelmetCertificationFilters,
    'jacket-certification-filters': JacketCertificationFilters
  },
  props: ['showFilters', 'initialManufacturer', 'initialModel', 'type'],
  data () {
    return getDefaultData(this.type)
  },
  watch: {
    filters: {
      handler (val) {
        this.applyFilters()
      },
      deep: true
    },
    showFilters: {
      handler (val) {
        if (val) {
          // HACK: workaround for a vue slider component bug - refresh once the component is visible to make sure it has the correct dimensions
          this.$nextTick(() => this.$refs.priceslider.refresh())
        }
      }
    }
  },
  computed: {
    shouldShowHelmetFilters: function () {
      return this.type === 'helmet'
    }
  },
  methods: {
    applyFilters () {
      this.$emit('filtersChanged', this.filters)
    },
    resetFilters () {
      Object.assign(this.$data, getDefaultData(this.type))
      // HACK: workaround for a vue-select bug - force the UI to be cleared once we click "reset" since it doesn't do this on its own
      this.$nextTick(() => this.$refs.subtypesmultiselect.clearSelection())
    }
  },
  async mounted () {
    if (this.initialManufacturer && this.initialModel) {
      this.filters.manufacturer = this.initialManufacturer
      this.filters.model = this.initialModel
    }

    await this.$nextTick()
    this.applyFilters()
  }
}
</script>

<style scoped>
.reset-button-col {
  text-align: right;
}
</style>
