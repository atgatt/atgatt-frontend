import ProductFilterSidebar from '../../../src/components/ProductFilterSidebar.vue'
import { shallowMount } from '@vue/test-utils'
import { registerGlobalComponents } from '../../../src/globals'
const expectedInitialFilters = {
  manufacturer: null,
  model: null,
  subtypes: [],
  helmetCertifications: null,
  jacketCertifications: null,
  usdPriceRange: [0, 140000],
  order: {
    field: 'document->>\'safetyPercentage\'',
    descending: true
  },
  excludeDiscontinued: false
}

describe('ProductFilterSidebar.vue', () => {
  let wrapper = null
  let component = null
  registerGlobalComponents()

  beforeEach(() => {
    wrapper = shallowMount(ProductFilterSidebar)
    component = wrapper.vm
    component.$refs.subtypesmultiselect = { clearSelection: function () {} }
  })

  it('should emit a filtersChanged event when it finishes loading', () => {
    component.$mount()
    component.$nextTick(() => {
      expect(wrapper.emitted().filtersChanged).toBeTruthy()
      expect(component.filters).toEqual(expectedInitialFilters)
    })
  })

  it('should filter by the manufacturer and model if they are supplied as props', () => {
    wrapper = shallowMount(ProductFilterSidebar, {
      props: ['initialManufacturer', 'initialModel'],
      propsData: {
        'initialManufacturer': 'manu',
        'initialModel': 'somemodel'
      }
    })
    component = wrapper.vm

    component.$mount()
    component.$nextTick(() => {
      expect(wrapper.emitted().filtersChanged).toBeTruthy()

      const expectedFiltersWithChangedModel = Object.assign({}, expectedInitialFilters)
      expectedFiltersWithChangedModel.manufacturer = 'manu'
      expectedFiltersWithChangedModel.model = 'somemodel'

      expect(component.filters).toEqual(expectedFiltersWithChangedModel)
    })
  })

  it('should reset filters to the default values when resetFilters() is called', (next) => {
    component.filters.minPrice = 69.1337
    expect(component.filters).not.toEqual(expectedInitialFilters)
    component.resetFilters()
    component.$nextTick(() => {
      expect(component.filters).toEqual(expectedInitialFilters)
      expect(wrapper.emitted().filtersChanged).toBeTruthy()
      next()
    })
  })

  it('should format the price range label in USD', () => {
    let labelText = component.$data.usdPriceRangeSliderOptions.formatter('352')
    expect(labelText).toBe('$3.00')

    labelText = component.$data.usdPriceRangeSliderOptions.formatter('35000')
    expect(labelText).toBe('$350.00')
  })
})
