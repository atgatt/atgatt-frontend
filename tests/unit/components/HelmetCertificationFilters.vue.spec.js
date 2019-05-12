import HelmetCertificationFilters from '../../../src/components/HelmetCertificationFilters.vue'
import { shallowMount } from '@vue/test-utils'
import { registerGlobalComponents } from '../../../src/globals'
const expectedSliderBackgroundColors = [
  '#303030',
  '#CC3628',
  '#703D29',
  '#ED9500',
  '#FCEB00',
  '#489B27'
]

describe('HelmetCertificationFilters.vue', () => {
  let wrapper = null
  let component = null
  registerGlobalComponents()

  beforeEach(() => {
    wrapper = shallowMount(HelmetCertificationFilters, {
      propsData: {
        'certifications': {
          SHARP: null
        }
      }
    })
    component = wrapper.vm
    component.$mount()
  })

  it('should set all of the SHARP impact zone ratings to zero and stars to 1 when toggleSHARP(true) is called', () => {
    component.toggleSHARP(true)
    expect(component.certifications.SHARP).toEqual({ 'impactZoneMinimums': { 'left': 0, 'rear': 0, 'right': 0, 'top': { 'front': 0, 'rear': 0 } }, 'stars': 1 })
  })

  it('should set the SHARP filter object back to null when toggleSHARP(false) is called', () => {
    component.toggleSHARP(true)
    expect(component.certifications.SHARP).not.toBe(null)
    component.toggleSHARP(false)
    expect(component.certifications.SHARP).toBe(null)
  })

  it('should format impact zones with the first color when the index is 0', () => {
    let backgroundColorObj = component.$data.impactZoneSliderOptions.sliderStyle(0)
    expect(backgroundColorObj.backgroundColor).toBe(expectedSliderBackgroundColors[0])
  })

  it('should format impact zones with the correct color when the index is positive', () => {
    let backgroundColorObj = component.$data.impactZoneSliderOptions.sliderStyle(2)
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
