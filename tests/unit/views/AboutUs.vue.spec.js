import AboutUs from '../../../src/views/AboutUs.vue'
import { mount } from '@vue/test-utils'
import { registerGlobalComponents } from '../../../src/globals'

describe('AboutUs.vue', () => {
  registerGlobalComponents()

  it('should complete the progress bar when it finishes loading', () => {
    let finished = false
    const $Progress = {
      finish: () => {
        finished = true
      }
    }
    mount(AboutUs, {
      mocks: { $Progress }
    })
    expect(finished).toBe(true)
  })
})
