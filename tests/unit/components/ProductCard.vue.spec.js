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
      },
      stubs: ['router-link']
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
      },
      stubs: ['router-link']
    })
    let component = wrapper.vm
    expect(component).toBeTruthy()
    expect(component.imageURL).toBe('http://static.mock.com/img/helmets/lul.jpg')
  })

  it('should return the isForDisplay model alias as the model to be displayed when isForDisplay is true', () => {
    let wrapper = shallowMount(ProductCard, {
      props: ['product'],
      propsData: {
        'product': { 'manufacturer': 'manu', 'model': 'model', 'modelAliases': [{ 'isForDisplay': false, 'modelAlias': 'donotdisplayme' }, { 'isForDisplay': true, 'modelAlias': 'displayme' }], 'certifications': { 'SHARP': null }, 'subtype': 'modular', 'imageKey': 'img/helmets/lul.jpg' }
      },
      mocks: {
        '$environment': {
          'staticBaseURL': 'http://static.mock.com'
        }
      },
      stubs: ['router-link']
    })
    let component = wrapper.vm
    expect(component).toBeTruthy()
    expect(component.formattedModel).toBe('displayme')
    expect(component.formattedModelAliases).toBe('model, donotdisplayme')
  })

  it('should not change the model to be displayed when there are not any aliases that have a isForDisplay flag set to true', () => {
    let wrapper = shallowMount(ProductCard, {
      props: ['product'],
      propsData: {
        'product': { 'manufacturer': 'manu', 'model': 'model', 'modelAliases': [{ 'isForDisplay': false, 'modelAlias': 'donotdisplayme' }, { 'isForDisplay': false, 'modelAlias': 'alsodontdisplayme' }], 'certifications': { 'SHARP': null }, 'subtype': 'modular', 'imageKey': 'img/helmets/lul.jpg' }
      },
      mocks: {
        '$environment': {
          'staticBaseURL': 'http://static.mock.com'
        }
      },
      stubs: ['router-link']
    })
    let component = wrapper.vm
    expect(component).toBeTruthy()
    expect(component.formattedModel).toBe('model')
    expect(component.formattedModelAliases).toBe('donotdisplayme, alsodontdisplayme')
  })

  it('should not change the model to be displayed when the list of aliases is empty', () => {
    let wrapper = shallowMount(ProductCard, {
      props: ['product'],
      propsData: {
        'product': { 'manufacturer': 'manu', 'model': 'model', 'modelAliases': [], 'certifications': { 'SHARP': null }, 'subtype': 'modular', 'imageKey': 'img/helmets/lul.jpg' }
      },
      mocks: {
        '$environment': {
          'staticBaseURL': 'http://static.mock.com'
        }
      },
      stubs: ['router-link']
    })
    let component = wrapper.vm
    expect(component).toBeTruthy()
    expect(component.formattedModel).toBe('model')
    expect(component.formattedModelAliases).toBeFalsy()
  })

  it('should not change the model to be displayed when the list of aliases is null', () => {
    let wrapper = shallowMount(ProductCard, {
      props: ['product'],
      propsData: {
        'product': { 'manufacturer': 'manu', 'model': 'model', 'modelAliases': null, 'certifications': { 'SHARP': null }, 'subtype': 'modular', 'imageKey': 'img/helmets/lul.jpg' }
      },
      mocks: {
        '$environment': {
          'staticBaseURL': 'http://static.mock.com'
        }
      },
      stubs: ['router-link']
    })
    let component = wrapper.vm
    expect(component).toBeTruthy()
    expect(component.formattedModel).toBe('model')
    expect(component.formattedModelAliases).toBeFalsy()
  })
})
