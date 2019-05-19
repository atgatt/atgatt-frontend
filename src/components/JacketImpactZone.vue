<template>
  <div class="impact-zone">
    <div class="row">
      <div class="col impact-zone-text">
        <img class="impact-zone-image" v-bind:src="zoneDetails.url" />
      </div>
    </div>
    <div class="row">
      <div class="col impact-zone-text">
        <div class="row">
          <div class="col">
            <span class="zone-rating-text">{{zoneDetails.text}}</span>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <span>{{zoneId | capitalize}} <font-awesome-icon icon="info-circle" /></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const APPROVED_TEXT = 'CE Approved'

export default {
  name: 'JacketImpactZone',
  props: ['certification', 'zoneId'],
  computed: {
    zoneDetails () {
      // TODO: this should probably move to the backend, which should return a number to map to the image instead of hardcoding black/empty/orange/red etc.
      if (!this.certification) {
        return { text: 'No Armor Support', url: require(`../assets/jackets/${this.zoneId}/black.jpg`) }
      }

      if (this.certification.isEmpty) {
        return { text: 'Sold Separately', url: require(`../assets/jackets/empty.jpg`) }
      }

      const levelText = this.certification.isLevel2 ? 'CE Level 2' : 'CE Level 1'

      if (this.certification.isApproved) {
        return { text: levelText, subText: APPROVED_TEXT, url: this.certification.isLevel2 ? require(`../assets/jackets/${this.zoneId}/green.jpg`) : require(`../assets/jackets/${this.zoneId}/orange.jpg`) }
      }

      return { text: levelText, subText: APPROVED_TEXT, url: this.certification.isLevel2 ? require(`../assets/jackets/${this.zoneId}/yellow.jpg`) : require(`../assets/jackets/${this.zoneId}/red.jpg`) }
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
