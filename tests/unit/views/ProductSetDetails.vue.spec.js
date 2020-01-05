import ProductSetDetails from '../../../src/views/ProductSetDetails.vue'
import { shallowMount } from '@vue/test-utils'
import { registerGlobalComponents } from '../../../src/globals'

describe('ProductSetDetails.vue', () => {
  let wrapper = null
  let component = null

  let $http = null
  let $Progress = null
  const mockGetResponse = {
    data: {
      'helmetProduct': { 'id': 1, 'manufacturer': 'manu', 'model': 'model', 'helmetCertifications': { 'SHARP': null }, 'subtype': 'modular', 'type': 'helmet' },
      'jacketProduct': { 'id': 2, 'manufacturer': 'manu', 'model': 'model', 'helmetCertifications': { 'SHARP': null }, 'subtype': 'modular', 'type': 'helmet' },
      'pantsProduct': { 'id': 3, 'manufacturer': 'manu', 'model': 'model', 'helmetCertifications': { 'SHARP': null }, 'subtype': 'modular', 'type': 'helmet' },
      'bootsProduct': { 'id': 4, 'manufacturer': 'manu', 'model': 'model', 'helmetCertifications': { 'SHARP': null }, 'subtype': 'modular', 'type': 'helmet' },
      'glovesProduct': { 'id': 5, 'manufacturer': 'manu', 'model': 'model', 'helmetCertifications': { 'SHARP': null }, 'subtype': 'modular', 'type': 'helmet' }
    }
  }

  registerGlobalComponents()

  it('should return the current url as the selfLink()', async () => {
    $http = { get: jest.fn() }
    $http.get.mockReturnValue(mockGetResponse)
    $Progress = { finish: jest.fn() }
    const $environment = { apiBaseURL: 'unittest' }

    wrapper = shallowMount(ProductSetDetails, {
      mocks: {
        $http,
        $Progress,
        $environment
      }
    })
    component = wrapper.vm
    component.$mount()
    await component.$nextTick()

    expect(component.selfLink).toBe('http://localhost/')
  })

  it('should set all of the data properties related to products when mounted', async () => {
    $http = { get: jest.fn() }
    $http.get.mockReturnValue(mockGetResponse)
    $Progress = { finish: jest.fn() }
    const $environment = { apiBaseURL: 'unittest' }

    wrapper = shallowMount(ProductSetDetails, {
      mocks: {
        $http,
        $Progress,
        $environment
      }
    })
    component = wrapper.vm
    component.$mount()

    await component.$nextTick()
    expect(component.helmet).toBe(mockGetResponse.data.helmetProduct)
    expect(component.jacket).toBe(mockGetResponse.data.jacketProduct)
    expect(component.pants).toBe(mockGetResponse.data.pantsProduct)
    expect(component.boots).toBe(mockGetResponse.data.bootsProduct)
    expect(component.gloves).toBe(mockGetResponse.data.glovesProduct)
    expect(component.error).toBe(null)
    expect(component.isLoaded).toBe(true)
  })

  it('should set the error when mounted with a faulty API', async () => {
    $http = { get: jest.fn() }
    $http.get.mockImplementation(() => { throw new Error('something went wrong') })
    $Progress = { finish: jest.fn() }
    const $environment = { apiBaseURL: 'unittest' }

    wrapper = shallowMount(ProductSetDetails, {
      mocks: {
        $http,
        $Progress,
        $environment
      }
    })
    component = wrapper.vm
    component.$mount()
    await component.$nextTick()
    expect(component.helmet).toBe(null)
    expect(component.jacket).toBe(null)
    expect(component.pants).toBe(null)
    expect(component.boots).toBe(null)
    expect(component.gloves).toBe(null)
    expect(component.error).toContain('internal error')
    expect(component.isLoaded).toBe(false)
  })

  it('should set the error when mounted with an API that returns a valid error', async () => {
    $http = { get: jest.fn() }
    $http.get.mockImplementation(() => {
      const err = new Error()
      err.response = { data: { 'message': 'expected' } }
      throw err
    })
    $Progress = { finish: jest.fn() }
    const $environment = { apiBaseURL: 'unittest' }

    wrapper = shallowMount(ProductSetDetails, {
      mocks: {
        $http,
        $Progress,
        $environment
      }
    })
    component = wrapper.vm
    component.$mount()
    await component.$nextTick()
    expect(component.helmet).toBe(null)
    expect(component.jacket).toBe(null)
    expect(component.pants).toBe(null)
    expect(component.boots).toBe(null)
    expect(component.gloves).toBe(null)
    expect(component.error).toBe('expected')
    expect(component.isLoaded).toBe(false)
  })
})
