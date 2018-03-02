<template>
  <div class="row">
    <div class="col-4">
      <div v-if="!hasSignedUp" class="input-group">
          <input v-if="!isButtonDisabled" v-model="email" type="text" class="form-control" placeholder="Enter your email...">
          <input v-else v-model="email" type="text" class="form-control disabled" disabled>
          <span class="input-group-btn">
            <button v-if="!isButtonDisabled && !isEmailEmpty" v-on:click="signUp" class="btn btn-success" type="button">Sign Up</button>
            <button v-else class="btn btn-success disabled" type="button" disabled>Sign Up</button>
          </span>
      </div>
      <div v-if="error">
        <small>
          <i class="fa fa-times error-times"/> <span class="error-message">{{error}}</span>
        </small>
      </div>
      <div v-else-if="hasSignedUp">
        <i class="fa fa-check success-check"/> Thanks for signing up! We'll notify you when we're planning to release new features.
      </div>
    </div>
  </div>
</template>

<script>
import http from 'axios'
export default {
  name: 'EmailSignup',
  data () {
    return {
      email: '',
      hasSignedUp: false,
      isButtonDisabled: false,
      error: ''
    }
  },
  methods: {
    signUp: async function () {
      try {
        this.hasSignedUp = false
        this.error = ''
        this.isButtonDisabled = true

        await http.post(`${this.$environment.apiBaseUrl}/v1/marketing/email`, {'email': this.email})
        this.hasSignedUp = true
      } catch (err) {
        if (err && err.response && err.response.data && err.response.data.message) {
          this.error = err.response.data.message
        } else {
          this.error = 'The server encountered an internal error. Try again in a few moments.'
        }

        this.isButtonDisabled = false
      }
    }
  },
  computed: {
    isEmailEmpty: function () {
      return !this.email || (this.email && this.email.trim().length <= 0)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.success-check {
  color: #28a745;
}

.error-message {
  color: #d33342;
}

.error-times {
  color: #d33342;
}

.disabled {
  cursor: not-allowed;
}
</style>
