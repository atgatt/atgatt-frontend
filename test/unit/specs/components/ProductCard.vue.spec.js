import ProductCard from '../../../../src/components/ProductCard.vue'
import { shallow } from '@vue/test-utils'

describe('ProductCard.vue', () => {
  it('should initialize correctly', () => {
    let wrapper = shallow(ProductCard, {
      props: ['product'],
      propsData: {
        'product': {'manufacturer': 'manu', 'model': 'model', 'certifications': {'SHARP': null}, 'subtype': 'modular'}
      }
    })
    let component = wrapper.vm
    expect(component).toBeTruthy()
  })
})
