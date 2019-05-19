<template>
  <ul name="certifications-list" class="fa-ul certifications-list">
    <label class="certifications-label d-none d-lg-block" for="certifications-list">Certifications</label>
    <product-certification-badge v-bind:certification="product.helmetCertifications.SHARP" certificationName="SHARP" />
    <product-certification-badge v-bind:certification="product.helmetCertifications.ECE" certificationName="ECE - 22.05" />
    <product-certification-badge v-bind:certification="product.helmetCertifications.SNELL" certificationName="SNELL - M2015" />
    <product-certification-badge v-bind:certification="product.helmetCertifications.DOT" certificationName="DOT" />
  </ul>
</template>

<script>
import ProductCertificationBadge from './ProductCertificationBadge'
export default {
  name: 'HelmetCertificationBadges',
  props: ['product'],
  components: {
    'product-certification-badge': ProductCertificationBadge
  }
}
</script>

<style scoped>
.certifications-label {
  font-size: larger;
}
</style>
