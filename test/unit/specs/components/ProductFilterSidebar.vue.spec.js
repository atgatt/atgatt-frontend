import ProductFilterSidebar from '../../../../src/components/ProductFilterSidebar.vue'
import { shallow } from 'vue-test-utils'

const expectedInitialFilters = {
  manufacturer: null,
  model: null,
  certifications: {
    SHARP: false,
    SNELL: false,
    ECE: false,
    DOT: false
  },
  minimumSHARPStars: 1,
  impactZoneMinimums: {
    left: 1,
    right: 1,
    top: {
      front: 1,
      rear: 1
    },
    rear: 1
  },
  priceRangeInUSD: [0, 10000]
}

describe('ProductFilterSidebar.vue', () => {
  let wrapper = null
  let component = null

  beforeEach(() => {
    wrapper = shallow(ProductFilterSidebar)
    component = wrapper.vm
  })

  it('should emit a filtersChanged event when it finishes loading', () => {
    component.$mount()
    expect(wrapper.emitted().filtersChanged).toBeTruthy()
    expect(component.filters).toEqual(expectedInitialFilters)
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
})
