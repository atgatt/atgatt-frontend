<template>
  <ul name="certifications-list" class="fa-ul certifications-list">
    <label class="certifications-label d-none d-lg-block" for="certifications-list">Certifications</label>
    <ce-certification-badge v-bind:certification="product.jacketCertifications.shoulder" regionName="Shoulder" />
    <ce-certification-badge v-bind:certification="product.jacketCertifications.elbow" regionName="Elbow" />
    <ce-certification-badge v-bind:certification="product.jacketCertifications.back" regionName="Back" />
    <ce-certification-badge v-bind:certification="product.jacketCertifications.chest" regionName="Chest" />
    <product-certification-badge v-bind:certification="product.jacketCertifications.fitsAirbag" certificationName="Airbag Support" />
  </ul>
</template>

<script>
import CECertificationBadge from './CECertificationBadge'
import ProductCertificationBadge from './ProductCertificationBadge.vue'

export default {
  name: 'JacketCertificationBadges',
  components: {
    'ce-certification-badge': CECertificationBadge,
    'product-certification-badge': ProductCertificationBadge
  },
  props: ['product']
}
</script>

<style scoped>
.certifications-label {
  font-size: larger;
}
</style>
