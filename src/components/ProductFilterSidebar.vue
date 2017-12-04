<template>
  <div class="sidebar">
    <form>
      <h5>
        General
      </h5>
      <div class="form-group">
        <label for="manufacturer">Manufacturer</label>
        <input type="text" class="form-control" v-model="filters.manufacturer" id="manufacturer" placeholder="Start typing a manufacturer..." v-on:keyup="applyFilters">
      </div>
      <div class="form-group">
        <label for="manufacturer">Model</label>
        <input type="text" class="form-control" v-model="filters.model" id="model" placeholder="Start typing a model..." v-on:keyup="applyFilters">
      </div>
      <h5>
        Certifications
      </h5>
      <div class="form-group">
        <div class="form-check">
          <label class="form-check-label">
            <input class="form-check-input" v-model="filters.certifications.SHARP" type="checkbox" id="sharp-checkbox"> SHARP
          </label>
        </div>
        <div class="form-group">
          <vue-slider ref="slider" id="min-sharp-stars-slider" v-bind="SHARPSliderOptions" v-model="filters.minimumSHARPStars"></vue-slider>
          <label for="min-sharp-stars-slider">Minimum Number of SHARP Stars</label>
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
      <h5>
        Minimum Impact Zone Ratings
      </h5>
      <div class="form-group">
        <vue-slider ref="slider" id="left-impact-zone-rating-slider" v-bind="impactZoneSliderOptions" v-model="filters.impactZoneMinimums.left"></vue-slider>
        <label for="left-impact-zone-rating-slider">Left</label>
      </div>
      <div class="form-group">
        <vue-slider ref="slider" id="right-impact-zone-rating-slider" v-bind="impactZoneSliderOptions" v-model="filters.impactZoneMinimums.right"></vue-slider>
        <label for="right-impact-zone-rating-slider">Right</label>
      </div>
      <div class="form-group">
        <vue-slider ref="slider" id="rear-impact-zone-rating-slider" v-bind="impactZoneSliderOptions" v-model="filters.impactZoneMinimums.rear"></vue-slider>
        <label for="rear-impact-zone-rating-slider">Rear</label>
      </div>
      <div class="form-group">
        <vue-slider ref="slider" id="top-front-impact-zone-rating-slider" v-bind="impactZoneSliderOptions" v-model="filters.impactZoneMinimums.top.front"></vue-slider>
        <label for="rear-impact-zone-rating-slider">Top: Front</label>
      </div>
      <div class="form-group">
        <vue-slider ref="slider" id="top-rear-impact-zone-rating-slider" v-bind="impactZoneSliderOptions" v-model="filters.impactZoneMinimums.top.rear"></vue-slider>
        <label for="rear-impact-zone-rating-slider">Top: Rear</label>
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
    impactZoneSliderOptions: {
      min: 1,
      max: 6,
      tooltip: 'never',
      sliderStyle: function (value) {
        const backgroundColorIndex = value === 0 ? 0 : (value - 1)
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
    filters: {
      manufacturer: null,
      model: null,
      certifications: {
        SHARP: false,
        SNELL: false,
        ECE: false,
        DOT: false
      },
      minimumSHARPStars: 1,
      impactZoneMinimums: {
        left: 1,
        right: 1,
        top: {
          front: 1,
          rear: 1
        },
        rear: 1
      },
      priceRangeInUSD: [0, 10000]
    }
  }
}

export default {
  name: 'ProductFilterSidebar',
  components: {
    vueSlider
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
    }
  },
  methods: {
    applyFilters () {
      this.$emit('filtersChanged', this.$data)
      window.scrollTo(0, 0)
    },
    resetFilters () {
      Object.assign(this.$data, getDefaultData())
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
</style>
