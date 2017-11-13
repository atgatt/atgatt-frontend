<template>
    <div class="card product-card">
        <div class="card-header">
            <span><strong>{{product.manufacturer}}</strong> {{product.model}}</span>
        </div>
        <div class="card-body">
            <div class="row card-row">
                <div class="col col-xl-3 overall-rating">
                    <div class="row">
                        <div class="col-4">
                        </div>
                        <div class="col-8">
                            <h1 class="score">{{product.score}}%</h1>
                        </div>
                    </div>
                    <div class="row score-text-row">
                        <div class="col-4">
                        </div>
                        <div class="col-8">
                            <span class="score-text">safety score</span><i v-on:click="showHelp" class="fa fa-info-circle"/>
                        </div>
                    </div>
                    <div class="row certifications-row">
                        <div class="col-6 align-self-center">
                            <ul class="fa-ul">
                                <li v-if="product.certifications.SHARP">
                                    <i class="fa-li fa fa-check cert" />
                                    <span class="badge badge-success">
                                        SHARP - {{product.certifications.SHARP.stars}} stars
                                    </span>
                                </li>
                                <li v-else>
                                    <i class="fa-li fa fa-times cert-missing" />
                                    <span class="badge badge-danger">
                                        SHARP
                                    </span>
                                </li>

                                <li v-if="product.certifications.ECE">
                                    <i class="fa-li fa fa-check cert" />
                                    <span class="badge badge-success">
                                        ECE 22.05
                                    </span>
                                </li>
                                <li v-else>
                                    <i class="fa-li fa fa-times cert-missing" />
                                    <span class="badge badge-danger">
                                        ECE 22.05
                                    </span>
                                </li>

                                <li v-if="product.certifications.SNELL">
                                    <i class="fa-li fa fa-check cert" />
                                    <span class="badge badge-success">
                                        SNELL M2015
                                    </span>
                                </li>
                                <li v-else>
                                    <i class="fa-li fa fa-times cert-missing" />
                                    <span class="badge badge-danger">
                                        SNELL M2015
                                    </span>
                                </li>

                                <li v-if="product.certifications.DOT">
                                    <i class="fa-li fa fa-check cert" />
                                    <span class="badge badge-success">
                                        DOT
                                    </span>
                                </li>
                                <li v-else>
                                    <i class="fa-li fa fa-times cert-missing" />
                                    <span class="badge badge-danger">
                                        DOT
                                    </span>
                                </li>
                            </ul>
                        </div>
                        <div class="col-6 align-self-center">
                            <img width="100%" height="100%" v-bind:src="product.imageUrl"></img>
                        </div>
                    </div>
                </div>
                <div class="col col-xl-9">
                    Certifications:
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

.centered-content {
    align-items: center;
    justify-content: center;
}

.overall-rating {
    border: 1px solid #ccc;
    border-radius: 5px;
}

.score {
    padding-left: 0.5rem;
}

.score-text {
    padding-left: 0.5rem;
    font-size: small;
}

.score-text-row {
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #ccc;
}

i.fa-info-circle {
    padding-left: 0.2rem;
    color: skyblue;
    cursor: pointer;
}

.card-row {
    padding-left: 0.4rem;
}

.cert {
    color: #28a745;
}

.cert-missing {
    color: #dc3545;
}
</style>
