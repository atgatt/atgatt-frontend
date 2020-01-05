import ModifyProductOnProductSetButton from '../../../src/components/ModifyProductOnProductSetButton.vue'
import { shallowMount } from '@vue/test-utils'
import { registerGlobalComponents } from '../../../src/globals'

describe('ModifyProductOnProductSetButton.vue', () => {
  let wrapper = null
  let component = null

  registerGlobalComponents()

  describe('when the product is a replacement', () => {
    beforeEach(() => {
      wrapper = shallowMount(ModifyProductOnProductSetButton, {
        propsData: {
          'productType': 'helmet',
          'isForReplacement': 'true'
        },
        stubs: ['router-link']
      })
      component = wrapper.vm
      component.$mount()
    })

    it('should return a centered wrapper class', () => {
      expect(component.wrapperClass).not.toContain('center')
    })

    it('should return the replacement text', () => {
      expect(component.productTypeText).toBe('Replace Helmet')
    })

    it('should return the exchange icon', () => {
      expect(component.actionIcon).toBe('exchange-alt')
    })
  })

  describe('when the product is not a replacement', () => {
    beforeEach(() => {
      wrapper = shallowMount(ModifyProductOnProductSetButton, {
        propsData: {
          'productType': 'helmet'
        },
        stubs: ['router-link']
      })
      component = wrapper.vm
      component.$mount()
    })

    it('should return a right-aligned wrapper class', () => {
      expect(component.wrapperClass).toContain('center')
    })

    it('should return the add text', () => {
      expect(component.productTypeText).toBe('Add Helmet')
    })

    it('should return the add icon', () => {
      expect(component.actionIcon).toBe('plus')
    })
  })
})
