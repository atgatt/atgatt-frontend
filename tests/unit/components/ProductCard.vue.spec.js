import ProductCard from '../../../src/components/ProductCard.vue'
import { shallowMount } from '@vue/test-utils'
import { registerGlobalComponents } from '../../../src/globals'

describe('ProductCard.vue', () => {
  registerGlobalComponents()
  it('should initialize correctly', () => {
    let wrapper = shallowMount(ProductCard, {
      props: ['product'],
      propsData: {
        'product': { 'manufacturer': 'manu', 'model': 'model', 'certifications': { 'SHARP': null }, 'subtype': 'modular' }
      }
    })
    let component = wrapper.vm
    expect(component).toBeTruthy()
  })

  it('should render the correct image url with the static base url as a prefix and the imageKey as a suffix', () => {
    let wrapper = shallowMount(ProductCard, {
      props: ['product'],
      propsData: {
        'product': { 'manufacturer': 'manu', 'model': 'model', 'certifications': { 'SHARP': null }, 'subtype': 'modular', 'imageKey': 'img/helmets/lul.jpg' }
      },
      mocks: {
        '$environment': {
          'staticBaseURL': 'http://static.mock.com'
        }
      }
    })
    let component = wrapper.vm
    expect(component).toBeTruthy()
    expect(component.imageURL).toBe('http://static.mock.com/img/helmets/lul.jpg')
  })
})
