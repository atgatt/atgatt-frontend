import About from '../../../src/views/About.vue'
import { mount } from '@vue/test-utils'
import { registerGlobalComponents } from '../../../src/globals'

describe('About.vue', () => {
  registerGlobalComponents()

  it('should complete the progress bar when it finishes loading', () => {
    let finished = false
    const $Progress = {
      finish: () => {
        finished = true
      }
    }
    mount(About, {
      mocks: { $Progress }
    })
    expect(finished).toBe(true)
  })
})
