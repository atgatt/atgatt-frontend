import ProductFilterSidebar from '../../../../src/components/ProductFilterSidebar.vue'
import { shallow } from 'vue-test-utils'

const expectedInitialFilters = {
  manufacturer: null,
  model: null,
  subtypes: [],
  certifications: {
    SHARP: null,
    SNELL: false,
    ECE: false,
    DOT: false
  },
  usdPriceRange: [0, 2000],
  order: {
    field: 'id'
  }
}

const expectedSliderBackgroundColors = [
  '#303030',
  '#CC3628',
  '#703D29',
  '#ED9500',
  '#FCEB00',
  '#489B27'
]

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

  it('should format the price range label in USD', () => {
    const labelText = component.$data.usdPriceRangeSliderOptions.formatter('some text')
    expect(labelText).toBe('$some text')
  })

  it('should format impact zones with the first color when the index is <= 0', () => {
    const backgroundColorObj = component.$data.impactZoneSliderOptions.sliderStyle(0)
    expect(backgroundColorObj.backgroundColor).toBe(expectedSliderBackgroundColors[0])
  })

  it('should format impact zones with the correct color when the index is positive', () => {
    let backgroundColorObj = component.$data.impactZoneSliderOptions.sliderStyle(3)
    expect(backgroundColorObj.backgroundColor).toBe(expectedSliderBackgroundColors[2])
  })

  it('should throw an error when the selected index is greater than the length of the colors array', () => {
    expect(() => {
      component.$data.impactZoneSliderOptions.sliderStyle(12)
    }).toThrow()
  })

  it('should throw an error when the selected index is less than 0', () => {
    expect(() => {
      component.$data.impactZoneSliderOptions.sliderStyle(-1)
    }).toThrow()
  })
})
