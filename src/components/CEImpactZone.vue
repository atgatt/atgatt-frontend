<template>
  <div class="impact-zone">
    <router-link v-bind:to="linkURL" target="_blank">
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
              <span>{{zoneId | capitalize}}</span>
            </div>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'CEImpactZone',
  props: ['productType', 'certification', 'assetsSubDir', 'zoneId'],
  computed: {
    zoneDetails () {
      // NOTE: webpack doesn't know what to do with dynamic strings, so we need to copy paste ""../assets" to every single call to require() :(
      // TODO: this should probably move to the backend, which should return a number to map to the image instead of hardcoding black/empty/orange/red etc.
      if (!this.certification) {
        return { text: 'Uncertified', url: require(`../assets/${this.assetsSubDir}/${this.zoneId}/black.jpg`) }
      }

      if (this.certification.isEmpty) {
        return { text: 'Sold Separately', url: require(`../assets/${this.assetsSubDir}/empty.jpg`) }
      }

      const levelText = this.certification.isLevel2 ? 'CE Level 2' : 'CE Level 1'

      if (this.certification.isApproved) {
        return { text: levelText, url: this.certification.isLevel2 ? require(`../assets/${this.assetsSubDir}/${this.zoneId}/green.jpg`) : require(`../assets/${this.assetsSubDir}/${this.zoneId}/orange.jpg`) }
      }

      return { text: levelText, url: this.certification.isLevel2 ? require(`../assets/${this.assetsSubDir}/${this.zoneId}/yellow.jpg`) : require(`../assets/${this.assetsSubDir}/${this.zoneId}/red.jpg`) }
    },
    linkURL () {
      return `about-${this.productType}-ratings`
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
  padding-bottom: 1rem;
}

.zone-rating-text {
  font-size: x-small;
}
</style>
