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
        Required Certifications
      </h5>
      <div class="form-group">
        <div class="form-check">
          <label class="form-check-label">
            <input class="form-check-input" v-model="isSHARPChecked" type="checkbox" id="sharp-checkbox"> SHARP
          </label>
        </div>
        <div v-if="filters.certifications.SHARP" class="form-group">
          <label for="min-sharp-stars-slider">Number of SHARP Stars</label>
          <vue-slider ref="slider" id="min-sharp-stars-slider" v-bind="SHARPSliderOptions" v-model="filters.certifications.SHARP.stars"></vue-slider>
          <div class="form-group">
            <label for="left-impact-zone-rating-slider">Left Impact Rating</label>
            <vue-slider ref="slider" id="left-impact-zone-rating-slider" v-bind="impactZoneSliderOptions" v-model="filters.certifications.SHARP.impactZoneMinimums.left"></vue-slider>
          </div>
          <div class="form-group">
            <label for="right-impact-zone-rating-slider">Right Impact Rating</label>
            <vue-slider ref="slider" id="right-impact-zone-rating-slider" v-bind="impactZoneSliderOptions" v-model="filters.certifications.SHARP.impactZoneMinimums.right"></vue-slider>
          </div>
          <div class="form-group">
            <label for="rear-impact-zone-rating-slider">Rear Impact Rating</label>
            <vue-slider ref="slider" id="rear-impact-zone-rating-slider" v-bind="impactZoneSliderOptions" v-model="filters.certifications.SHARP.impactZoneMinimums.rear"></vue-slider>
          </div>
          <div class="form-group">
            <label for="top-front-impact-zone-rating-slider">Top-Front Impact Rating</label>
            <vue-slider ref="slider" id="top-front-impact-zone-rating-slider" v-bind="impactZoneSliderOptions" v-model="filters.certifications.SHARP.impactZoneMinimums.top.front"></vue-slider>
          </div>
          <div class="form-group">
            <label for="top-rear-impact-zone-rating-slider">Top-Rear Impact Rating</label>
            <vue-slider ref="slider" id="top-rear-impact-zone-rating-slider" v-bind="impactZoneSliderOptions" v-model="filters.certifications.SHARP.impactZoneMinimums.top.rear"></vue-slider>
          </div>
        </div>
        <div class="form-check">
          <label class="form-check-label">
            <input class="form-check-input" v-model="filters.certifications.ECE" type="checkbox" id="ece-checkbox"> ECE
          </label>
        </div>
        <div class="form-check">
          <label class="form-check-label">
            <input class="form-check-input" v-model="filters.certifications.SNELL" type="checkbox" id="snell-checkbox"> SNELL
          </label>
        </div>
        <div class="form-check">
          <label class="form-check-label">
            <input class="form-check-input" v-model="filters.certifications.DOT" type="checkbox" id="dot-checkbox"> DOT
          </label>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import VueSelect from 'vue-select'
import vueSlider from 'vue-slider-component'
import formatCurrency from '../lib/currency'

const sliderBackgroundColors = [
  '#303030',
  '#CC3628',
  '#703D29',
  '#ED9500',
  '#FCEB00',
  '#489B27'
]

function getDefaultData () {
  return {
    subtypeMultiselectOptions: [
      { value: 'full', label: 'Full Face' },
      { value: 'modular', label: 'Modular' }
    ],
    impactZoneSliderOptions: {
      min: 0,
      max: 5,
      tooltip: 'hover',
      sliderStyle: function (value) {
        const backgroundColorIndex = value === 0 ? 0 : value
        if (backgroundColorIndex > sliderBackgroundColors.length || backgroundColorIndex < 0) {
          throw new Error('Background color index out of range')
        }
        const newBackgroundColor = sliderBackgroundColors[backgroundColorIndex]
        return {
          backgroundColor: newBackgroundColor
        }
      }
    },
    SHARPSliderOptions: {
      min: 1,
      max: 5,
      tooltip: 'hover'
    },
    usdPriceRangeSliderOptions: {
      min: 0,
      max: 140000,
      tooltip: 'hover',
      formatter: function (value) {
        return formatCurrency(parseInt(value / 100.0))
      }
    },
    isSHARPChecked: false,
    filters: {
      subtypes: [],
      manufacturer: null,
      model: null,
      certifications: {
        SHARP: null,
        SNELL: false,
        ECE: false,
        DOT: false
      },
      usdPriceRange: [0, 140000],
      order: {
        field: 'document->>\'safetyPercentage\'',
        descending: true
      },
      excludeDiscontinued: false
    }
  }
}

export default {
  name: 'ProductFilterSidebar',
  components: {
    vueSlider,
    'v-select': VueSelect
  },
  props: ['showFilters', 'initialManufacturer', 'initialModel'],
  data () {
    return getDefaultData()
  },
  watch: {
    filters: {
      handler (val) {
        this.applyFilters()
      },
      deep: true
    },
    isSHARPChecked: {
      handler (val) {
        this.toggleSHARP(val)
      }
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
  methods: {
    applyFilters () {
      this.$emit('filtersChanged', this.filters)
    },
    resetFilters () {
      Object.assign(this.$data, getDefaultData())
      // HACK: workaround for a vue-select bug - force the UI to be cleared once we click "reset" since it doesn't do this on its own
      this.$nextTick(() => this.$refs.subtypesmultiselect.clearSelection())
    },
    toggleSHARP (isEnabled) {
      this.filters.certifications.SHARP = !isEnabled ? null : {
        stars: 1,
        impactZoneMinimums: {
          left: 0,
          right: 0,
          top: {
            front: 0,
            rear: 0
          },
          rear: 0
        }
      }
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
