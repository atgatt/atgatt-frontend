<template>
  <div class="form-group">
    <div class="form-check">
      <label class="form-check-label">
        <input
          class="form-check-input"
          v-model="isSHARPChecked"
          type="checkbox"
        > SHARP Certification
      </label>
    </div>
    <div v-if="certifications.SHARP" class="form-group">
      <label>Number of SHARP Stars</label>
      <vue-slider
        ref="slider"
        v-bind="SHARPSliderOptions"
        v-model="certifications.SHARP.stars"
      ></vue-slider>
      <div class="form-group">
        <label>Left Impact Rating</label>
        <vue-slider
          ref="slider"
          v-bind="impactZoneSliderOptions"
          v-model="certifications.SHARP.impactZoneMinimums.left"
        ></vue-slider>
      </div>
      <div class="form-group">
        <label>Right Impact Rating</label>
        <vue-slider
          ref="slider"
          v-bind="impactZoneSliderOptions"
          v-model="certifications.SHARP.impactZoneMinimums.right"
        ></vue-slider>
      </div>
      <div class="form-group">
        <label>Rear Impact Rating</label>
        <vue-slider
          ref="slider"
          v-bind="impactZoneSliderOptions"
          v-model="certifications.SHARP.impactZoneMinimums.rear"
        ></vue-slider>
      </div>
      <div class="form-group">
        <label>Top-Front Impact Rating</label>
        <vue-slider
          ref="slider"
          v-bind="impactZoneSliderOptions"
          v-model="certifications.SHARP.impactZoneMinimums.top.front"
        ></vue-slider>
      </div>
      <div class="form-group">
        <label>Top-Rear Impact Rating</label>
        <vue-slider
          ref="slider"
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
        > ECE Certification
      </label>
    </div>
    <div class="form-check">
      <label class="form-check-label">
        <input
          class="form-check-input"
          v-model="certifications.SNELL"
          type="checkbox"
        > SNELL Certification
      </label>
    </div>
    <div class="form-check">
      <label class="form-check-label">
        <input
          class="form-check-input"
          v-model="certifications.DOT"
          type="checkbox"
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
  props: ['id', 'certifications'],
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

<style scoped>
</style>
