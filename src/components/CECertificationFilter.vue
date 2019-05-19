<template>
  <div>
    <div class="form-check">
      <label class="form-check-label">
        <input
          class="form-check-input"
          v-model="isCEChecked"
          type="checkbox"
        > {{region | capitalize}} Armor (CE)
      </label>
    </div>
    <div v-if="certifications[region]" class="form-group">
      <div class="row">
        <div class="col-1"></div>
        <div class="col-9">
          <div class="form-check">
            <label class="form-check-label">
              <input
                class="form-check-input"
                v-model="certifications[region].isLevel2"
                type="checkbox"
              > CE Level 2
            </label>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-1"></div>
        <div class="col-9">
          <div class="form-check">
            <label class="form-check-label">
              <input
                class="form-check-input"
                v-model="certifications[region].isApproved"
                type="checkbox"
              > CE Approved
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['region', 'certifications'],
  data () {
    return {
      isCEChecked: false
    }
  },
  watch: {
    isCEChecked: {
      handler (val) {
        this.toggleCE(val)
      }
    },
    certifications: {
      handler (val) {
        this.isCEChecked = Boolean(val[this.region])
      }
    }
  },
  methods: {
    toggleCE (isEnabled) {
      this.certifications[this.region] = !isEnabled ? null : {
        isLevel2: false,
        isApproved: false
      }
    }
  }
}
</script>

<style scoped>
.disabled-check {
  cursor: not-allowed;
}
</style>
