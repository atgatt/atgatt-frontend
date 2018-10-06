import NotFound from '../../../src/views/NotFound.vue'
import { mount } from '@vue/test-utils'
import { registerGlobalComponents } from '../../../src/globals'

describe('NotFound.vue', () => {
  registerGlobalComponents()

  it('should complete the progress bar when it finishes loading', () => {
    let finished = false
    const $Progress = {
      finish: () => {
        finished = true
      }
    }
    mount(NotFound, {
      mocks: { $Progress }
    })
    expect(finished).toBe(true)
  })
})
