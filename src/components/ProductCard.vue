<template>
    <div class="card product-card">
        <div class="card-header">
            <span><strong>{{product.manufacturer}}</strong> {{product.model}}</span>
        </div>
        <div class="card-body">
            some other text
        </div>
    </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: ['product']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.product-card {
    margin-bottom: 0.5rem;
}
</style>
