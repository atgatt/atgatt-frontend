<template>
    <product-certification-badge v-bind:certification="certificationObject" v-bind:certificationName="certificationName" />
</template>

<script>
import ProductCertificationBadge from './ProductCertificationBadge'
export default {
  props: ['certification', 'regionName'],
  components: {
    'product-certification-badge': ProductCertificationBadge
  },
  computed: {
    certificationName () {
      if (!this.certification) {
        return `${this.regionName}: No Armor Support`
      }

      if (this.certification.isEmpty) {
        return `${this.regionName}: Sold Separately`
      }

      return `${this.regionName}: ${this.getCEText()}`
    },
    certificationObject () {
      if (this.certification && !this.certification.isEmpty) {
        return this.certification
      }

      return null
    }
  },
  methods: {
    getCEText () {
      if (!this.certification || this.certification.isEmpty) {
        return null
      }

      const levelText = this.certification.isLevel2 ? 'CE Level 2' : 'CE Level 1'
      if (this.certification.isApproved) {
        return `${levelText} (Approved)`
      }
      return levelText
    }
  }
}
</script>

<style scoped>

</style>
