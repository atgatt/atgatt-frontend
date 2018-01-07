<template>
  <div class="sidebar">
    <form>
      <h5>
        General
      </h5>
      <div class="form-group">
        <label for="manufacturer">Manufacturer</label>
        <input type="text" class="form-control" v-model="filters.manufacturer" id="manufacturer" placeholder="Start typing a manufacturer...">
      </div>
      <div class="form-group">
        <label for="manufacturer">Model</label>
        <input type="text" class="form-control" v-model="filters.model" id="model" placeholder="Start typing a model...">
      </div>
      <div class="form-group">
        <label for="type">Type</label>
        <multiselect v-model="filters.subtypes" v-bind:options="subtypeMultiselectOptions" v-bind:multiple="true" track-by="id" label="name" placeholder="Select one or more types..."></multiselect>
      </div>
      <div class="form-group">
        <label for="rear-impact-zone-rating-slider">Price Range</label>
        <vue-slider ref="slider" id="price-slider" v-bind="usdPriceRangeSliderOptions" v-model="filters.usdPriceRange"></vue-slider>
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
            <label for="rear-impact-zone-rating-slider">Top-Front Impact Rating</label>
            <vue-slider ref="slider" id="top-front-impact-zone-rating-slider" v-bind="impactZoneSliderOptions" v-model="filters.certifications.SHARP.impactZoneMinimums.top.front"></vue-slider>
          </div>
          <div class="form-group">
            <label for="rear-impact-zone-rating-slider">Top-Rear Impact Rating</label>
            <vue-slider ref="slider" id="top-rear-impact-zone-rating-slider" v-bind="impactZoneSliderOptions" v-model="filters.certifications.SHARP.impactZoneMinimums.top.rear"></vue-slider>
          </div>
        </div>
        <div class="form-check">
          <label class="form-check-label">
            <input class="form-check-input" v-model="filters.certifications.SNELL" type="checkbox" id="snell-checkbox"> SNELL
          </label>
        </div>
        <div class="form-check">
          <label class="form-check-label">
            <input class="form-check-input" v-model="filters.certifications.ECE" type="checkbox" id="ece-checkbox"> ECE
          </label>
        </div>
        <div class="form-check">
          <label class="form-check-label">
            <input class="form-check-input" v-model="filters.certifications.DOT" type="checkbox" id="dot-checkbox"> DOT
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
import vueSlider from 'vue-slider-component'
import Multiselect from 'vue-multiselect'

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
      {id: 'fullface', name: 'Full Face'},
      {id: 'system', name: 'System'}
    ],
    impactZoneSliderOptions: {
      min: 1,
      max: 6,
      tooltip: 'never',
      sliderStyle: function (value) {
        const backgroundColorIndex = value === 0 ? 0 : (value - 1)
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
      max: 2000,
      tooltip: 'hover',
      formatter: function (value) {
        return `$${value}`
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
      usdPriceRange: [0, 2000],
      order: {
        field: 'id'
      }
    }
  }
}

export default {
  name: 'ProductFilterSidebar',
  components: {
    vueSlider,
    Multiselect
  },
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
    }
  },
  methods: {
    applyFilters () {
      this.$emit('filtersChanged', this.filters)
    },
    resetFilters () {
      Object.assign(this.$data, getDefaultData())
    },
    toggleSHARP (isEnabled) {
      this.filters.certifications.SHARP = !isEnabled ? null : {
        stars: 1,
        impactZoneMinimums: {
          left: 1,
          right: 1,
          top: {
            front: 1,
            rear: 1
          },
          rear: 1
        }
      }
    }
  },
  mounted () {
    this.applyFilters()
  }
}
</script>

<style scoped>
.form-check-label {
  padding-left: 1.15rem;
}

.multiselect {
  z-index: 4;
  font-size: inherit;
}
</style>
