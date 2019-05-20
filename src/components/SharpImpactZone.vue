<template>
  <div>
    <div class="impact-zone" v-on:click="toggleHelpModal">
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
              <span class="zone-rating-text" v-if="isTopZone && topZoneRatingText">{{topZoneRatingText[0]}}, {{topZoneRatingText[1]}}</span>
              <span class="zone-rating-text" v-else>{{zoneRatingText}}</span>
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
    <modal v-if="isModalVisible" v-on:close="toggleHelpModal">
      <h1 slot="header">{{zoneId | capitalize}} Impact Zone</h1>
      <div v-if="certification" slot="body">
        The color in the {{zoneId}} impact zone represents a particular impact rating, specifically referring to peak brain acceleration in a crash simulation scenario as tested by <a target="_blank" href="https://sharp.dft.gov.uk/sharp-testing/#impact-zone">SHARP</a>.
        Below is a chart explaining the different colors used in each zone:
        <br /><br />
        <img v-if="certification" class="impact-zone-image" v-bind:src="url" />
        <img src="../assets/impact-zones-key.jpg"/>
        <br /><br />
        <div id="accordion">
          <div class="card">
            <div class="card-header" role="tab" id="score-info-card">
              <h5 class="mb-0">
                <a class="collapsed" data-toggle="collapse" href="#collapse-score-info" role="button" aria-expanded="false" aria-controls="collapse-score-info">
                  What does the score in the {{zoneId}} impact zone indicate?
                </a>
              </h5>
            </div>
            <div id="collapse-score-info" class="collapse" role="tabpanel" aria-labelledby="score-info-card" data-parent="#accordion">
              <div class="card-body">
                <table class="table table-bordered table-condensed">
                  <thead>
                    <th>Color (Score)</th>
                    <th>Peak Brain Acceleration</th>
                  </thead>
                  <tbody>
                  <tr>
                    <th>
                      Green (5)
                    </th>
                    <td>
                      275g
                    </td>
                  </tr>
                  <tr>
                    <th>
                      Yellow (4)
                    </th>
                    <td>
                      300g
                    </td>
                  </tr>
                  <tr>
                    <th>
                      Orange (3)
                    </th>
                    <td>
                      400g
                    </td>
                  </tr>
                  <tr>
                    <th>
                      Brown (2)
                    </th>
                    <td>
                      420g
                    </td>
                  </tr>
                  <tr>
                    <th>
                      Red (1)
                    </th>
                    <td>
                      500g
                    </td>
                  </tr>
                  <tr>
                    <th>
                      Black (0)
                    </th>
                    <td>
                      More than 500g
                    </td>
                  </tr>
                </tbody></table>
                <span v-if="isTopZone">NOTE: There are actually <strong>two</strong> sub-zones for top side impacts: front and rear. Therefore, there are two different ratings for this overall zone.</span>
                Click <a href="https://sharp.dft.gov.uk/sharp-testing/#impact-zone">here</a> to learn further details about how these ratings were calculated.
              </div>
            </div>
           </div>
        </div>
      </div>
      <div v-else slot="body">
        The {{zoneId}} impact zone rating is unknown because this helmet has not yet been rated by <a target="_blank" href="https://sharp.dft.gov.uk">SHARP</a>.
      </div>
    </modal>
  </div>
</template>

<script>
import Modal from '../components/common/Modal'
export default {
  name: 'SharpImpactZone',
  components: {
    'modal': Modal
  },
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
          return require(`../assets/helmets/${this.zoneId}-${rating}.jpg`)
        }
        return require(`../assets/helmets/${this.zoneId}-${rating.rear}-${rating.front}.jpg`)
      }
      return null
    },
    zoneRatingText: function () {
      if (this.certification) {
        const rating = this.certification.impactZoneRatings[this.zoneId]
        return `${rating}/5`
      }
      return null
    },
    topZoneRatingText: function () {
      if (this.certification) {
        const rating = this.certification.impactZoneRatings[this.zoneId]
        return [`${rating.front}/5 Front`, `${rating.rear}/5 Rear`]
      }
      return null
    },
    zoneLabelText: function () {
      return `${this.zoneId} Impact`
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
