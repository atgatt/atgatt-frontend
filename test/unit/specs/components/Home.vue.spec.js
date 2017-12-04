import Home from '../../../../src/components/Home.vue'
import { mount } from 'vue-test-utils'

describe('Home.vue', () => {
  it('should complete the progress bar when it finishes loading', () => {
    let finished = false
    const $Progress = {
      finish: () => {
        finished = true
      }
    }
    mount(Home, {
      mocks: {$Progress}
    })
    expect(finished).toBe(true)
  })
})
