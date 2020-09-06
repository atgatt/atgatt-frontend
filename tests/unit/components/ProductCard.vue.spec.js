import ProductCard from '../../../src/components/ProductCard.vue'
import { shallowMount } from '@vue/test-utils'
import { registerGlobalComponents } from '../../../src/globals'

describe('ProductCard.vue', () => {
  registerGlobalComponents()
  it('should initialize correctly', () => {
    let wrapper = shallowMount(ProductCard, {
      props: ['product'],
      propsData: {
        'product': { 'manufacturer': 'manu', 'model': 'model', 'helmetCertifications': { 'SHARP': null }, 'subtype': 'modular', 'type': 'helmet' }
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
        'product': { 'manufacturer': 'manu', 'model': 'model', 'helmetCertifications': { 'SHARP': null }, 'subtype': 'modular', 'imageKey': 'img/helmets/lul.jpg', 'type': 'helmet' }
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

  it('should return the correct and capitalized alt text', () => {
    let wrapper = shallowMount(ProductCard, {
      props: ['product'],
      propsData: {
        'product': { 'manufacturer': 'manu', 'model': 'model', 'helmetCertifications': { 'SHARP': null }, 'subtype': 'modular', 'imageKey': 'img/helmets/lul.jpg', 'type': 'helmet' }
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
    expect(component.altText).toBe('Manu model motorcycle helmet')
  })

  it('should return the isForDisplay model alias as the model to be displayed when isForDisplay is true', () => {
    let wrapper = shallowMount(ProductCard, {
      props: ['product'],
      propsData: {
        'product': { 'manufacturer': 'manu', 'model': 'model', 'modelAliases': [{ 'isForDisplay': false, 'modelAlias': 'donotdisplayme' }, { 'isForDisplay': true, 'modelAlias': 'displayme' }], 'helmetCertifications': { 'SHARP': null }, 'subtype': 'modular', 'imageKey': 'img/helmets/lul.jpg', 'type': 'helmet' }
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
        'product': { 'manufacturer': 'manu', 'model': 'model', 'modelAliases': [{ 'isForDisplay': false, 'modelAlias': 'donotdisplayme' }, { 'isForDisplay': false, 'modelAlias': 'alsodontdisplayme' }], 'helmetCertifications': { 'SHARP': null }, 'subtype': 'modular', 'imageKey': 'img/helmets/lul.jpg', 'type': 'helmet' }
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
        'product': { 'manufacturer': 'manu', 'model': 'model', 'modelAliases': [], 'helmetCertifications': { 'SHARP': null }, 'subtype': 'modular', 'imageKey': 'img/helmets/lul.jpg', 'type': 'helmet' }
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
        'product': { 'manufacturer': 'manu', 'model': 'model', 'modelAliases': null, 'helmetCertifications': { 'SHARP': null }, 'subtype': 'modular', 'imageKey': 'img/helmets/lul.jpg', 'type': 'helmet' }
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

  it('should return an encoded model when the model contains special characters', () => {
    let wrapper = shallowMount(ProductCard, {
      props: ['product'],
      propsData: {
        'product': { 'manufacturer': 'Alpinestars', 'model': 'T-Missile Drystar Jacket For Tech Air Race Black/White/Red / XL [Blemished - Very Good]', 'modelAliases': null, 'helmetCertifications': { 'SHARP': null }, 'subtype': 'modular', 'imageKey': 'img/helmets/lul.jpg', 'type': 'helmet' }
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
    expect(component.uriEncodedModel).toBe('T-Missile%20Drystar%20Jacket%20For%20Tech%20Air%20Race%20Black%2FWhite%2FRed%20%2F%20XL%20%5BBlemished%20-%20Very%20Good%5D')
  })

  it('should return an encoded manufacturer when the manufacturer contains special characters', () => {
    let wrapper = shallowMount(ProductCard, {
      props: ['product'],
      propsData: {
        'product': { 'manufacturer': 'T-Missile Drystar Jacket For Tech Air Race Black/White/Red / XL [Blemished - Very Good]', 'model': 'model', 'modelAliases': null, 'helmetCertifications': { 'SHARP': null }, 'subtype': 'modular', 'imageKey': 'img/helmets/lul.jpg', 'type': 'helmet' }
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
    expect(component.uriEncodedManufacturer).toBe('T-Missile%20Drystar%20Jacket%20For%20Tech%20Air%20Race%20Black%2FWhite%2FRed%20%2F%20XL%20%5BBlemished%20-%20Very%20Good%5D')
  })
})
