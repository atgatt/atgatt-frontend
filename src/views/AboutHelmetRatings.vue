<template>
  <div class="jumbotron">
    <h1 class="display-3">About Helmet Ratings</h1>
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
            Our safety score is a weighted average of the crash test scores obtained from SHARP combined with the certifications obtained from SNELL, DOT, and ECE.
            Specifically, we weight each certification as follows: <br /><br />
            <code>
              Safety Score = 0.10 * ECE + 0.08 * SNELL +  0.02 * DOT + 0.8 * (SHARP-Left-Percentage * 0.20 + SHARP-Right-Percentage * 0.20 + SHARP-TopFront-Percentage * 0.20 + SHARP-TopRear-Percentage * 0.20 + SHARP-Rear-Percentage * 0.20)
            </code>
            <br />
            <br />
            <label>Notes:</label>
            <ul>
              <li>ECE / DOT/ SNELL are assigned a score of 1 if said certification exists, and 0 if it does not.</li>
              <li>SHARP Percentages are calculated by dividing the raw score for each impact zone (which is a value from 0 to 5) by the maximum score (i.e. Raw-Score / 5)</li>
              <li>SHARP is weighted the highest due to differences in testing methodology that we believe are beneficial to the rider. SNELL is weighted higher than DOT or ECE for similar reasons. See the "What does each certification mean?" pane below for more information.</li>
            </ul>
            <label>Caveats:</label><br />
            <ul>
              <li>If SHARP hasn't rated the helmet yet, we adjust the weights as follows:<br /> <br />
                <code>
                  SNELL Weight = 0.65 (up from 0.2) <br />
                  ECE Weight = 0.1 (up from 0.08) <br />
                  DOT Weight = 0.05 (up from 0.02) <br />
                </code>
                <br/>
                Note that the above does not add up to 100% on purpose - this is to give the helmet a slight penalty for missing the SHARP certification.
              </li>
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
          <div id="collapse-ratings-info" class="collapse show" role="tabpanel" aria-labelledby="ratings-info-card">
            <div class="card-body">
              <div class="alert alert-warning" role="alert">
                Warning: We've recently been notified that some helmet manufacturers claim to use slightly different internal head shapes for their helmets in different countries around the world. These differences in head shapes may or may not lead to the "same" helmet performing differently in a crash scenario depending on which region you buy the helmet in. Bottom line: for maximum safety, we believe it's best to diversify and buy a helmet that has <b>all</b> of the well-known certifications (SHARP, ECE, SNELL, and DOT).
              </div>
              Each helmet listed on CrashTested has acheived one or more certifications. Here are some important notes about each certification that we display on this website:
              <br/>
              <br/>
              <ul>
                <li>
                  <b>SHARP</b> certifications are independently conducted certifications meant for the European market, and their testing caters to crashes encountered on European roads (based off the findings in the <a href="https://ec.europa.eu/transport/road_safety/sites/roadsafety/files/pdf/projects_sources/cost327_final_report.pdf">COST-327 report</a>). Helmets rated by SHARP are given a score from 1-5 Stars, but this metric can be misleading since the actual crash test ratings can vary between helmets with the same star rating. In other words, two "5 Star" helmets are not necessarily alike. Despite these facts, we believe that Americans should strongly consider the crash data that SHARP produces for each helmet. This is because SHARP buys and tests their helmets directly off the shelf and provides the most detailed helmet ratings available, including specific crash test data and color-coded impact scores for each test. In addition, many helmets sold in North America are exactly the same as their European counterparts and happen to be rated by SHARP too, so their data is relevant regardless of where you live in these cases.
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
        <div class="card">
          <div class="card-header" role="tab" id="score-info-card">
            <h5 class="mb-0">
              <a class="collapsed" data-toggle="collapse" href="#collapse-impact-score-info" role="button" aria-expanded="false" aria-controls="collapse-impact-score-info">
                What does the score each impact zone indicate?
              </a>
            </h5>
          </div>
          <div id="collapse-impact-score-info" class="collapse show" role="tabpanel" aria-labelledby="score-info-card">
            <div class="card-body">
              The color in each impact zone represents a particular impact rating, specifically referring to peak brain acceleration in a crash simulation scenario as tested by
              <a target="_blank" href="https://sharp.dft.gov.uk/sharp-testing/#impact-zone">SHARP</a>.
              Below is a chart explaining the different colors used in each zone:
              <br>
              <br>
              <img src="../assets/impact-zones-key.jpg">
              <br>
              <br>
              <table class="table table-bordered table-condensed">
                <thead>
                  <th>Color (Score)</th>
                  <th>Peak Brain Acceleration</th>
                </thead>
                <tbody>
                  <tr>
                    <th>Green (5)</th>
                    <td>275g</td>
                  </tr>
                  <tr>
                    <th>Yellow (4)</th>
                    <td>300g</td>
                  </tr>
                  <tr>
                    <th>Orange (3)</th>
                    <td>400g</td>
                  </tr>
                  <tr>
                    <th>Brown (2)</th>
                    <td>420g</td>
                  </tr>
                  <tr>
                    <th>Red (1)</th>
                    <td>500g</td>
                  </tr>
                  <tr>
                    <th>Black (0)</th>
                    <td>More than 500g</td>
                  </tr>
                </tbody>
              </table>
              <span>
                NOTE: There are actually <strong>two</strong> sub-zones for top side impacts: front and rear. Therefore, there are two different ratings for this overall zone.
              </span>
              Click <a href="https://sharp.dft.gov.uk/sharp-testing/#impact-zone">here</a> to learn further details about how these ratings were calculated.
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutHelmetRatings',
  mounted () {
    this.$Progress.finish()
  }
}
</script>

<style>
</style>
