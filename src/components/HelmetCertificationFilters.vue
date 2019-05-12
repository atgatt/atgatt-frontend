<template>
  <div class="form-group">
    <div class="form-check">
      <label class="form-check-label">
        <input
          class="form-check-input"
          v-model="isSHARPChecked"
          type="checkbox"
          id="sharp-checkbox"
        > SHARP Certification
      </label>
    </div>
    <div v-if="certifications.SHARP" class="form-group">
      <label for="min-sharp-stars-slider">Number of SHARP Stars</label>
      <vue-slider
        ref="slider"
        id="min-sharp-stars-slider"
        v-bind="SHARPSliderOptions"
        v-model="certifications.SHARP.stars"
      ></vue-slider>
      <div class="form-group">
        <label for="left-impact-zone-rating-slider">Left Impact Rating</label>
        <vue-slider
          ref="slider"
          id="left-impact-zone-rating-slider"
          v-bind="impactZoneSliderOptions"
          v-model="certifications.SHARP.impactZoneMinimums.left"
        ></vue-slider>
      </div>
      <div class="form-group">
        <label for="right-impact-zone-rating-slider">Right Impact Rating</label>
        <vue-slider
          ref="slider"
          id="right-impact-zone-rating-slider"
          v-bind="impactZoneSliderOptions"
          v-model="certifications.SHARP.impactZoneMinimums.right"
        ></vue-slider>
      </div>
      <div class="form-group">
        <label for="rear-impact-zone-rating-slider">Rear Impact Rating</label>
        <vue-slider
          ref="slider"
          id="rear-impact-zone-rating-slider"
          v-bind="impactZoneSliderOptions"
          v-model="certifications.SHARP.impactZoneMinimums.rear"
        ></vue-slider>
      </div>
      <div class="form-group">
        <label for="top-front-impact-zone-rating-slider">Top-Front Impact Rating</label>
        <vue-slider
          ref="slider"
          id="top-front-impact-zone-rating-slider"
          v-bind="impactZoneSliderOptions"
          v-model="certifications.SHARP.impactZoneMinimums.top.front"
        ></vue-slider>
      </div>
      <div class="form-group">
        <label for="top-rear-impact-zone-rating-slider">Top-Rear Impact Rating</label>
        <vue-slider
          ref="slider"
          id="top-rear-impact-zone-rating-slider"
          v-bind="impactZoneSliderOptions"
          v-model="certifications.SHARP.impactZoneMinimums.top.rear"
        ></vue-slider>
      </div>
    </div>
    <div class="form-check">
      <label class="form-check-label">
        <input
          class="form-check-input"
          v-model="certifications.ECE"
          type="checkbox"
          id="ece-checkbox"
        > ECE Certification
      </label>
    </div>
    <div class="form-check">
      <label class="form-check-label">
        <input
          class="form-check-input"
          v-model="certifications.SNELL"
          type="checkbox"
          id="snell-checkbox"
        > SNELL Certification
      </label>
    </div>
    <div class="form-check">
      <label class="form-check-label">
        <input
          class="form-check-input"
          v-model="certifications.DOT"
          type="checkbox"
          id="dot-checkbox"
        > DOT Certification
      </label>
    </div>
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

export default {
  name: 'HelmetCertificationFilters',
  components: {
    vueSlider
  },
  props: ['certifications'],
  data () {
    return {
      impactZoneSliderOptions: {
        min: 0,
        max: 5,
        tooltip: 'hover',
        sliderStyle: function (value) {
          const backgroundColorIndex = value === 0 ? 0 : value
          if (
            backgroundColorIndex > sliderBackgroundColors.length ||
            backgroundColorIndex < 0
          ) {
            throw new Error('Background color index out of range')
          }
          const newBackgroundColor =
            sliderBackgroundColors[backgroundColorIndex]
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
      isSHARPChecked: false
    }
  },
  watch: {
    isSHARPChecked: {
      handler (val) {
        this.toggleSHARP(val)
      }
    },
    certifications: {
      handler (val) {
        this.isSHARPChecked = Boolean(val.SHARP)
      }
    }
  },
  methods: {
    toggleSHARP (isEnabled) {
      this.certifications.SHARP = !isEnabled
        ? null
        : {
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
  }
}
</script>

<style>
</style>
