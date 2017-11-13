<template>
    <div class="card product-card">
        <div class="card-header">
            <span><strong>{{product.manufacturer}}</strong> {{product.model}}</span>
        </div>
        <div class="card-body">
            <div class="row card-row">
                <div class="col-2 overall-rating">
                    <h1>{{product.score}}%</h1>
                    <span class="score-text">safety score</span> 
                    <i v-on:click="showHelp" class="fa fa-info-circle"/>
                </div>
                <div class="col-2">
                    <img width="100%" height="100%" v-bind:src="product.imageUrl"></img>
                </div>
                <div class="col-6">
                    Certifications:
                    <ul>
                        <li v-if="product.certifications.SHARP">
                            SHARP: {{product.certifications.SHARP.stars}} stars
                        </li>
                        <li v-if="product.certifications.ECE">ECE</li>
                        <li v-if="product.certifications.SNELL">SNELL</li>
                        <li v-if="product.certifications.DOT">DOT</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: ['product'],
  methods: {
    showHelp: () => {
      alert('This score is a weighted average of all the scores associated with each certification. If a product is missing a particular certification, then it is assigned a score of 0 for that certification.')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.product-card {
    margin-bottom: 0.5rem;
}

.overall-rating {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.score-text {
    padding-left: 0.5rem;
    font-size: small;
}

i.fa-info-circle {
    padding-left: 0.2rem;
    color: skyblue;
    cursor: pointer;
}

.card-row {
    padding-left: 0.4rem;
}
</style>
