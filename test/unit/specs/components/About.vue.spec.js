import About from '../../../../src/components/About.vue'
import { mount } from '@vue/test-utils'

describe('About.vue', () => {
  it('should complete the progress bar when it finishes loading', () => {
    let finished = false
    const $Progress = {
      finish: () => {
        finished = true
      }
    }
    mount(About, {
      mocks: {$Progress}
    })
    expect(finished).toBe(true)
  })
})
