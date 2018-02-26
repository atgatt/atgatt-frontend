<template>
  <div class="product-card">
    <div class="row product-header">
      <div class="col my-auto">
        <h4 class="my-auto"><strong>{{product.manufacturer}}</strong> <small>{{product.model}}</small><small v-if="product.modelAlias"> ({{product.modelAlias}})</small></h4>
        <i>{{formattedSubtype}} - {{product.safetyPercentage}}% Safety Score <i v-on:click="toggleRatingsModal" class="fa fa-info-circle" /></i>
      </div>
      <div v-on:click="trackBuyButtonClick" class="col buy-btn-col my-auto">
        <a v-bind:href="formattedBuyURL" target="_blank" class="btn buy-product-btn btn-success"><i class="fa fa-amazon"/> <strong>Buy on Amazon for {{formattedPrice}}</strong></a>
        <img src="//ir-na.amazon-adsystem.com/e/ir?t=crashtested-20&l=ur2&o=1" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
      </div>
    </div>
    <div class="row product-body">
      <div v-on:click="trackBuyButtonClick" class="col-4 col-lg align-self-center">
        <a target="_blank" v-bind:href="formattedBuyURL">
          <img v-if="product.imageUrl" class="product-image" width="200" height="200" v-bind:src="product.imageUrl"/>
          <i v-else class="fa fa-question-circle fa-5x missing-product-image"/>
        </a>
      </div>
      <div class="col-8 col-lg align-self-center">
        <ul name="certifications-list" class="fa-ul certifications-list">
          <label class="certifications-label" for="certifications-list">Certifications</label>
          <product-certification-badge v-bind:certification="product.certifications.SHARP" certificationName="SHARP" />
          <product-certification-badge v-bind:certification="product.certifications.ECE" certificationName="ECE - 22.05" />
          <product-certification-badge v-bind:certification="product.certifications.SNELL" certificationName="SNELL - M2015" />
          <product-certification-badge v-bind:certification="product.certifications.DOT" certificationName="DOT" />
        </ul>
      </div>
      <div class="col-3 col-lg align-self-center">
        <sharp-impact-zone
          v-bind:certification="product.certifications.SHARP"
          zoneId="top"
        />
      </div>
      <div class="col-3 col-lg align-self-center">
        <sharp-impact-zone
          v-bind:certification="product.certifications.SHARP"
          zoneId="left"
        />
      </div>
      <div class="col-3 col-lg align-self-center">
        <sharp-impact-zone
          v-bind:certification="product.certifications.SHARP"
          zoneId="right"
        />
      </div>
      <div class="col-3 col-lg align-self-center">
        <sharp-impact-zone
          v-bind:certification="product.certifications.SHARP"
          zoneId="rear"
        />
      </div>
    </div>
    <modal v-if="isRatingsModalVisible" v-on:close="toggleRatingsModal">
      <h1 slot="header">Safety Score and Certification Details</h1>
      <div slot="body">
        <div class="alert alert-warning" role="alert">
          Warning: We've recently been notified that some helmet manufacturers claim to use slightly different internal head shapes for their helmets in each region. Said helmets may or may not be marketed under the same manufacturer and model, and these differences in head shapes may or may not lead to the "same" helmet performing differently in a crash scenario depending on which region you buy the helmet in. In essence, note that there are pros and cons to each certification in terms of how testing is conducted, and no single certification can be perfect. Bottom line: for maximum safety, we believe it's best to diversify and buy a helmet that has <b>all</b> of the well-known certifications (SHARP, ECE, SNELL, and DOT).
        </div>
        <div id="ratings-accordion" role="tablist">
          <div class="card">
            <div class="card-header" role="tab" id="score-info-card">
              <h5 class="mb-0">
                <a class="collapsed" data-toggle="collapse" href="#collapse-score-info" role="button" aria-expanded="false" aria-controls="collapse-score-info">
                  How are safety scores calculated?
                </a>
              </h5>
            </div>
            <div id="collapse-score-info" class="collapse" role="tabpanel" aria-labelledby="score-info-card" data-parent="#ratings-accordion">
              <div class="card-body">
                Our safety score is a weighted average of the crash test scores obtained from SHARP combined with the certifications obtained from SNELL, DOT, and ECE.
                Specifically, we weight each certification as follows: <br/><br/>
                <code>
                  Safety Score = 0.15 * ECE + 0.05 * DOT +  0.3 * SNELL + 0.5 * (SHARP-Left-Percentage * 0.20 + SHARP-Right-Percentage * 0.20 + SHARP-TopFront-Percentage * 0.20 + SHARP-TopRear-Percentage * 0.20 + SHARP-Rear-Percentage * 0.20)
                </code>
                <br />
                <br />
                <ul>
                  <li>ECE / DOT/ SNELL are assigned a score of 1 if said certification exists, and 0 if it does not.</li>
                  <li>SHARP Percentages are calculated by dividing the raw score for each impact zone (which is a value from 0 to 5) by the maximum score (i.e. Raw-Score / 5)</li>
                  <li>SHARP is weighted the highest due to differences in testing methodology that we believe are beneficial to the rider. SNELL is weighted heavily for similar reasons. See the pane below for more information.</li>
                </ul>
              </div>
            </div>
           </div>
           <div class="card">
            <div class="card-header" role="tab" id="ratings-info-card">
              <h5 class="mb-0">
                <a class="collapsed" data-toggle="collapse" href="#collapse-ratings-info" role="button" aria-expanded="false" aria-controls="collapse-ratings-info">
                  What do each of the certifications mean for this helmet?
                </a>
              </h5>
            </div>
            <div id="collapse-ratings-info" class="collapse" role="tabpanel" aria-labelledby="ratings-info-card" data-parent="#ratings-accordion">
              <div class="card-body">
                This helmet has acheived one or more certifications. Here are some important notes about each certification that we display on this website:
                <br/>
                <br/>
                <ul>
                  <li>
                    <b>SHARP</b> certifications are independently conducted certifications meant for the European market, and their testing caters to speeds encountered on European roads. Helmets rated by SHARP are given a score from 1-5 Stars, but this metric should be ignored since the actual crash test ratings can vary between helmets with the same star rating. In other words, two "5 Star" helmets are not necessarily alike. Despite these facts, we believe that Americans should strongly consider the crash data that SHARP produces for each helmet. This is because SHARP buys and tests their helmets directly off the shelf and provides the most detailed helmet ratings available, including specific crash test data and color-coded impact scores for each test. In addition, many helmets sold in North America are exactly the same as their European counterparts and happen to be rated by SHARP too, so their data is relevant regardless of where you live in these cases.
                  </li>
                  <br/>
                  <li>
                    <b>SNELL</b> M2015 certifications are somewhat alike to SHARP certifications in that they're independently conducted and the testing methodology is similar, but SNELL mostly tests helmets sold in North America with few exceptions. As such, their testing caters to speeds encountered on North American roads. Another important difference compared to SHARP is that SNELL sources their helmets directly from the manufacturer, so these samples may or may not be representative of what you will find on store shelves.
                  </li>
                  <br/>
                  <li>
                    <b>ECE</b> 22.05 is the latest standard for motorcycle helmets determined by the Economic Commission for Europe. Usually, track days require a helmet rated by ECE at the bare minimum. This standard is quite similar to DOT, but it is not based on the honor system.
                  </li>
                  <br/>
                  <li>
                    <b>DOT</b> (Federal Motor Vehicle Safety Standard No. 218) certifications are meant for the North American market, but they are inadequate because they rely on an honor system to consider a helmet "certified." This means that helmet manufacturers can easily cheat and falsely claim that their helmet is DOT certified when in reality it is not.
                  </li>
                </ul>
                If you're confused, more detailed explanations of each certification can be found <a target="_blank" href="http://www.revzilla.com/common-tread/helmet-safety-ratings-101">here</a>.
              </div>
            </div>
           </div>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
import formatCurrency from '../lib/currency'
export default {
  name: 'ProductCard',
  props: ['product'],
  data () {
    return {
      isRatingsModalVisible: false,
      isSafetyModalVisible: false
    }
  },
  computed: {
    formattedPrice: function () {
      const priceInUsd = this.product.priceInUsdMultiple / 100.0
      return priceInUsd > 0 ? formatCurrency(priceInUsd) : 'a mystery price!'
    },
    formattedSubtype: function () {
      return this.product.subtype.charAt(0).toUpperCase() + this.product.subtype.slice(1)
    },
    formattedBuyURL: function () {
      const buyUrl = this.product.buyUrl
      if (buyUrl) {
        return buyUrl
      }

      const manufacturer = this.product.manufacturer
      const model = this.product.model

      return `https://www.amazon.com/gp/search?ie=UTF8&tag=crashtested-20&linkCode=ur2&linkId=2a2896b54f76421e38228d42e244bfbb&camp=1789&creative=9325&index=automotive&keywords=${manufacturer} ${model}`
    }
  },
  methods: {
    trackBuyButtonClick: function () {
      // Amplitude is globally defined, disabling ESLint so that it doesn't complain about an unknown global variable
      // eslint-disable-next-line
      amplitude.getInstance().logEvent('buyButtonClicked', {
        'uuid': this.product.uuid,
        'manufacturer': this.product.manufacturer,
        'model': this.product.model,
        'priceInUsdMultiple': this.product.priceInUsdMultiple,
        'safetyPercentage': this.product.safetyPercentage
      })
    },
    toggleRatingsModal: function () {
      this.isRatingsModalVisible = !this.isRatingsModalVisible
    },
    toggleSafetyModal: function () {
      this.isSafetyModalVisible = !this.isSafetyModalVisible
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.missing-product-image {
  min-width: 200px;
  margin-left: 0.5em;
}

.buy-btn-col {
  text-align: right;
}
.product-card {
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 1rem;
  padding-bottom: 0rem;
  background-color: #f3f3f3
}

.product-header {
  border-bottom: 1px solid #ccc;
  padding-bottom: 1rem;
}

.product-body {
  background-color: white;
  padding: 1rem;
}

.product-image, .missing-product-image {
  padding: 1rem;
  border-radius: 20%;
}

.centered-content {
  align-items: center;
  justify-content: center;
}

.overall-rating {
  border: 1px solid #ccc;
  border-radius: 5px;
}

.score-text {
  font-size: small;
}

.manufacturer {
  font-weight: bold;
}

.card-row {
  padding-left: 0.4rem;
}

.certifications-label {
  font-size: larger;
}

.buy-product-btn {
  background: -webkit-linear-gradient(top,#f7dfa5,#f0c14b);
  background: linear-gradient(to bottom,#f7dfa5,#f0c14b);
  border-color: lightslategray;
  color: #111;
  font-weight: 100;
}

.buy-product-btn:hover {
  background: -webkit-linear-gradient(top,#f7dfa5,#f0c14b);
  background: linear-gradient(to bottom,#f7dfa5,#f0c14b);
  color: initial;
  font-weight: 100;
}

.buy-product-btn:focus, .buy-product-btn.focus {
  box-shadow: 0 0 0 0.2rem #f0c14b;
}

.buy-product-btn:not(:disabled):not(.disabled):active, .buy-product-btn:not(:disabled):not(.disabled).active,
.show > .buy-product-btn.dropdown-toggle {
  color: #111;
  background-color: #f7dfa5;
  border-color: #f0c14b;
}

.buy-product-btn:not(:disabled):not(.disabled):active:focus, .buy-product-btn:not(:disabled):not(.disabled).active:focus,
.show > .buy-product-btn.dropdown-toggle:focus {
  box-shadow: 0 0 0 0.2rem #f0c14b;
}
</style>
