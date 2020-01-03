<template>
    <div class="col-12 col-lg buy-btn-col my-auto">
        <div>
            <button v-on:click="redirectByProductType" class="btn revzilla-buy-btn"><font-awesome-icon icon="exchange-alt"/>&nbsp;
              <strong>
                &nbsp;Replace
              </strong>
            </button>
        </div>
    </div>
</template>

<script>
export default {
  name: 'AddToProductSetButton',
  data () {
    return {
      'isLoading': false
    }
  },
  props: ['product'],
  methods: {
    redirectByProductType () {
      let urlSuffix = ''

      switch (this.product.type) {
        case 'helmet':
        case 'jacket':
          urlSuffix = `${this.product.type}s`
          break
        default:
          urlSuffix = this.product.type
          break
      }
      this.$router.push({ path: `/motorcycle-${urlSuffix}` })
    }
  }
}
</script>

<style scoped>
.disabled {
  cursor: not-allowed;
}

.buy-btn-col {
  text-align: right;
}

.revzilla-buy-btn {
  background: -webkit-linear-gradient(top,lightblue,skyblue);
  background: linear-gradient(to bottom,lightblue,skyblue);
  border-color: lightslategray;
  color: #111;
  font-weight: 100;
  white-space: normal;
  width: 100%;
  max-width: 300px;
}
.revzilla-buy-btn:hover {
  background: -webkit-linear-gradient(top,lightblue,skyblue);
  background: linear-gradient(to bottom,lightblue,skyblue);
  color: initial;
  font-weight: 100;
}
.revzilla-buy-btn:focus, .revzilla-buy-btn.focus {
  box-shadow: 0 0 0 0.2rem skyblue;
}
.revzilla-buy-btn:not(:disabled):not(.disabled):active, .revzilla-buy-btn:not(:disabled):not(.disabled).active,
.show > .revzilla-buy-btn.dropdown-toggle {
  color: #111;
  background-color: lightblue;
  border-color: skyblue;
}
.revzilla-buy-btn:not(:disabled):not(.disabled):active:focus, .revzilla-buy-btn:not(:disabled):not(.disabled).active:focus,
.show > .revzilla-buy-btn.dropdown-toggle:focus {
  box-shadow: 0 0 0 0.2rem skyblue;
}

@media only screen and (min-device-width : 0px) and (max-device-width : 991px) {
  .buy-btn-col {
      padding-top: 5px;
      text-align: center;
  }
}

</style>
