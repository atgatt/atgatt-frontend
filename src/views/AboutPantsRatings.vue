<template>
  <div class="jumbotron">
    <h1 class="display-3">About Pants Ratings</h1>
    <hr class="my-4">
    <div id="ratings-accordion" role="tablist">
      <div class="card">
        <div class="card-header" role="tab" id="score-info-card">
          <h5 class="mb-0">
            <a class="collapsed" data-toggle="collapse" href="#collapse-score-info" role="button" aria-expanded="false" aria-controls="collapse-score-info">
              How are safety scores calculated?
            </a>
          </h5>
        </div>
        <div id="collapse-score-info" class="collapse show" role="tabpanel" aria-labelledby="score-info-card">
          <div class="card-body">
            Our safety score is a weighted average of the CE certifications achieved by the armor in each impact zone of a given product.
            Specifically, we weight each certification as follows: <br /><br />
            <code>
              CE Score For Each Zone = (0 if armor is not supported) OTHERWISE (0.5 if there's a slot for you to install armor) OTHERWISE (0.75 if CE level 1 armor is included) OTHERWISE (0.95 if CE level 2 armor is included) <br /><br />
              Add 0.05 to the CE Score if the armor is "CE Approved"<br /><br />

              Safety Score = 0.33333 * (Tailbone-CE-Score + Knee-CE-Score + Hip-CE-Score)
            </code>
          </div>
        </div>
      </div>
        <div class="card">
          <div class="card-header" role="tab" id="score-info-card">
            <h5 class="mb-0">
              <a class="collapsed" data-toggle="collapse" href="#collapse-impact-score-info" role="button" aria-expanded="false" aria-controls="collapse-impact-score-info">
                What does the score in each impact zone indicate?
              </a>
            </h5>
          </div>
          <div id="collapse-impact-score-info" class="collapse show" role="tabpanel" aria-labelledby="score-info-card">
            <div class="card-body">
              The color in each impact zone represents a particular impact rating, specifically referring to the peak force transmitted in a crash simulation scenario as tested by
              CE, or in many cases, the manufacturer of the gear. Items that are not tested by CE independently receive a slightly lower score for this reason.
              Below is a chart explaining the different colors used in each zone:
              <br>
              <br>
              <img src="../assets/impact-zones-key.jpg">
              <br>
              <br>
              <table class="table table-bordered table-condensed">
                <thead>
                  <th>Color (Score)</th>
                  <th>Peak Transmitted Force</th>
                </thead>
                <tbody>
                  <tr>
                    <th>Green (CE Level 2: Approved)</th>
                    <td>9 Kn (Back/Spine), 20 Kn (Everything else)</td>
                  </tr>
                  <tr>
                    <th>Yellow (CE Level 2: Certified/Tested)</th>
                    <td>9 Kn (Back/Spine), 20 Kn (Everything else)</td>
                  </tr>
                  <tr>
                    <th>Orange (CE Level 1: Approved)</th>
                    <td>18 Kn (Back/Spine), 35 Kn (Everything else)</td>
                  </tr>
                  <tr>
                    <th>Brown (Not Used)</th>
                    <td>N/A, Reserved for future use</td>
                  </tr>
                  <tr>
                    <th>Red (CE Level 1: Certified/Tested)</th>
                    <td>18 Kn (Back/Spine), 35 Kn (Everything else)</td>
                  </tr>
                  <tr>
                    <th>Black (No Armor Support)</th>
                    <td>N/A</td>
                  </tr>
                  <tr>
                    <th>Clear (Supply Your Own)</th>
                    <td>N/A</td>
                  </tr>
                </tbody>
              </table>
              <span>
                NOTE: CE Certified/Tested gear is <strong>not</strong> assumed to have been independently verified by CE. CE Approved gear is assumed to have been verified by CE, which is why it gets a slightly higher score.
              </span>
              Click <a href="https://en.wikipedia.org/wiki/Motorcycle_armor">here</a> to learn further details about CE certified motorcycle gear.
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutPantsRatings',
  mounted () {
    this.$Progress.finish()
  }
}
</script>

<style>
</style>
