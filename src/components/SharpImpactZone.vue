<template>
  <div>
    <div class="row">
      <div class="col impact-zone-text">
        <img v-if="this.certification" class="impact-zone-image" v-bind:src="url" />
        <i v-if="!this.certification" class="fa fa-question fa-5x"/>
      </div>
    </div>
    <div class="row">
      <div class="col impact-zone-text">
        <span>{{zoneText}} <i class="fa fa-info-circle" /></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SharpImpactZone',
  props: ['zoneId', 'certification'],
  computed: {
    url: function () {
      if (this.certification) {
        const rating = this.certification.impactZoneRatings[this.zoneId]
        if (this.zoneId !== 'top') {
          return `/static/${this.zoneId}-${rating}.jpg`
        }
        return `/static/${this.zoneId}-${rating.front}-${rating.rear}.jpg`
      }
      return null
    },
    zoneText: function () {
      const capitalizedZoneId = this.zoneId.charAt(0).toUpperCase() + this.zoneId.slice(1)
      return `${capitalizedZoneId} impact`
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.impact-zone-image {
  width: 100%;
  height: 100%;
  max-width: 200px;
  max-height: 200px;
}

.impact-zone-text {
  text-align: center;
  font-size: small
}
</style>
