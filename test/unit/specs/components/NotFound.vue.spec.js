import NotFound from '../../../../src/components/NotFound.vue'
import { mount } from 'vue-test-utils'

describe('NotFound.vue', () => {
  it('should complete the progress bar when it finishes loading', () => {
    let finished = false
    const $Progress = {
      finish: () => {
        finished = true
      }
    }
    mount(NotFound, {
      mocks: {$Progress}
    })
    expect(finished).toBe(true)
  })
})
