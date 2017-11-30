// Import Vue and the component being tested
import Vue from 'vue'
import NotFound from '../../../../src/components/NotFound.vue'
describe('NotFound', () => {
  // Inspect the raw component options
  it('has a mounted hook', () => {
    assert.equal(typeof NotFound.mounted, 'function')
  })
  // Mount an instance and inspect the render output
  it('completes the progress bar when it finishes loading', () => {
    const Ctor = Vue.extend(NotFound)
    var finished = false
    const instance = new Ctor()
    instance.$Progress = {
      finish: () => {
        finished = true
      }
    }
    instance.$mount()
    assert.equal(finished, true)
  })
})
