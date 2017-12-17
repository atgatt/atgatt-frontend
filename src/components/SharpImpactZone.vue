<template>
  <div>
    <div class="impact-zone" v-on:click="toggleHelpModal">
      <div class="row">
        <div class="col impact-zone-text">
          <img v-if="this.certification" class="impact-zone-image" v-bind:src="url" />
          <i v-else class="fa fa-question fa-5x"/>
        </div>
      </div>
      <div class="row">
        <div class="col impact-zone-text">
          <span>{{zoneText}} <i class="fa fa-info-circle" /></span>
        </div>
      </div>
    </div>
    <modal v-if="isModalVisible" v-on:close="toggleHelpModal">
      <h1 slot="header">{{capitalizedZoneId}} Impact Zone</h1>
      <p v-if="this.certification" slot="body">
        The color in the {{zoneId}} impact zone represents a particular impact rating, specifically referring to peak brain acceleration in a crash simulatino scenario as tested by <a target="_blank" href="https://sharp.dft.gov.uk/sharp-testing/#impact-zone">SHARP</a>.
        Below is a chart explaining the different colors used in each zone:
        <br /><br />
        <img v-if="this.certification" class="impact-zone-image" v-bind:src="url" />
        <img src="/static/impact-zones-key.jpg"/>
        <br /><br />
        <span v-if="isTopZone">NOTE: There are actually <strong>two</strong> sub-zones for top side impacts: front and rear. Therefore, there are two different ratings for this overall zone.</span>
        Click <a href="https://sharp.dft.gov.uk/sharp-testing/#impact-zone">here</a> to learn further details about how these ratings were calculated.
      </p>
      <p v-else slot="body">
        The {{zoneId}} impact zone rating is unknown because this helmet has not yet been rated by <a target="_blank" href="https://sharp.dft.gov.uk">SHARP</a>.
      </p>
    </modal>
  </div>
</template>

<script>
export default {
  name: 'SharpImpactZone',
  props: ['zoneId', 'certification'],
  data () {
    return {
      isModalVisible: false
    }
  },
  computed: {
    url: function () {
      if (this.certification) {
        const rating = this.certification.impactZoneRatings[this.zoneId]
        if (!this.isTopZone) {
          return `/static/${this.zoneId}-${rating}.jpg`
        }
        return `/static/${this.zoneId}-${rating.front}-${rating.rear}.jpg`
      }
      return null
    },
    capitalizedZoneId: function () {
      return this.zoneId.charAt(0).toUpperCase() + this.zoneId.slice(1)
    },
    zoneText: function () {
      return `${this.capitalizedZoneId} impact`
    },
    isTopZone: function () {
      return this.zoneId === 'top'
    }
  },
  methods: {
    toggleHelpModal: function () {
      this.isModalVisible = !this.isModalVisible
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
}

.impact-zone {
  cursor: pointer;
}
</style>
