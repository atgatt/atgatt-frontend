<template>
  <div class="impact-zone">
    <div class="row">
      <div class="col impact-zone-text">
        <img v-if="certification" class="impact-zone-image" v-bind:src="url" />
        <font-awesome-icon v-else icon="question-circle" size="5x" />
      </div>
    </div>
    <div class="row">
      <div class="col impact-zone-text">
        <div class="row">
          <div class="col">
            <span class="zone-rating-text">{{zoneRatingText}}</span>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <span>{{zoneLabelText}} <font-awesome-icon icon="info-circle" /></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'JacketImpactZone',
  props: ['certification'],
  computed: {
    url () {
      return null
    },
    zoneRatingText () {
      return 'sometexthere'
    }
  }
}
</script>

<style scoped>
.impact-zone-image {
  width: 100%;
  height: 100%;
  max-width: 200px;
  max-height: 200px;
}

.impact-zone-text {
  text-align: center;
  padding: 0;
}

.impact-zone {
  cursor: pointer;
  padding-bottom: 1rem;
}

.zone-rating-text {
  font-size: x-small;
}
</style>
