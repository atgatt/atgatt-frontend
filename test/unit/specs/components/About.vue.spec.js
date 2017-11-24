// Import Vue and the component being tested
import Vue from 'vue'
import About from '../../../../src/components/About.vue'
// Here are some Jasmine 2.0 tests, though you can
// use any test runner / assertion library combo you prefer
describe('About', () => {
  // Inspect the raw component options
  it('has a mounted hook', () => {
    assert.equal(typeof About.mounted, 'function')
  })
  // Mount an instance and inspect the render output
  it('renders without errors', () => {
    const Ctor = Vue.extend(About)
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
