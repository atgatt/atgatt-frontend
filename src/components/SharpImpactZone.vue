<template>
  <div>
    <router-link to="about-helmet-ratings" target="_blank">
      <div class="impact-zone">
        <div class="row">
          <div class="col impact-zone-text">
            <img v-if="certification" class="impact-zone-image" v-bind:src="url" v-bind:alt="this.altText" />
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
                <span>{{zoneLabelText | capitalize}} <font-awesome-icon icon="info-circle" /></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </router-link>
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
        if (this.isTopZone) {
          return require(`../assets/helmets/${this.zoneId}-${rating.rear}-${rating.front}.jpg`)
        }
        return require(`../assets/helmets/${this.zoneId}-${rating}.jpg`)
      }
      return null
    },
    zoneRatingText: function () {
      if (!this.certification) {
        return null
      }

      const rating = this.certification.impactZoneRatings[this.zoneId]
      if (this.isTopZone) {
        return `${rating.front}/5 Front, ${rating.rear}/5 Rear`
      }
      return `${rating}/5`
    },
    zoneLabelText: function () {
      return `${this.zoneId} Impact`
    },
    isTopZone: function () {
      return this.zoneId === 'top'
    },
    altText: function () {
      return `Motorcycle helmet (${this.zoneId}) with a SHARP score of ${this.zoneRatingText}`
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
