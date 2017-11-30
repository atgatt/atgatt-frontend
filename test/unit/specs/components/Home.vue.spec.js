// Import Vue and the component being tested
import Vue from 'vue'
import Home from '../../../../src/components/Home.vue'
import router from '../../../../src/router'
describe('Home', () => {
  // Inspect the raw component options
  it('has a mounted hook', () => {
    assert.equal(typeof Home.mounted, 'function')
  })
  // Mount an instance and inspect the render output
  it('completes the progress bar when it finishes loading', () => {
    const Ctor = Vue.extend(Home)
    var finished = false
    const instance = new Ctor({
      router
    })
    instance.$Progress = {
      finish: () => {
        finished = true
      }
    }
    instance.$mount()
    assert.equal(finished, true)
  })
})
