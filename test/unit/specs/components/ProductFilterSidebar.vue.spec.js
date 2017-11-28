// Import Vue and the component being tested
import Vue from 'vue'
import ProductFilterSidebar from '../../../../src/components/ProductFilterSidebar.vue'
describe('ProductFilterSidebar', () => {
  const expectedDefaultFilters = {
    manufacturer: null,
    model: null,
    certifications: {
      SHARP: false,
      SNELL: false,
      ECE: false,
      DOT: false
    },
    impactZoneMinimums: {
      left: 0,
      right: 0,
      top: {
        front: 0,
        rear: 0
      },
      rear: 0
    },
    minPrice: 0,
    maxPrice: null
  }

  // Inspect the raw component options
  it('has a mounted hook', () => {
    assert.equal(typeof ProductFilterSidebar.mounted, 'function')
  })
  // Mount an instance and inspect the render output
  it('emits a filtersChanged event when it finishes loading', () => {
    const Ctor = Vue.extend(ProductFilterSidebar)
    const instance = new Ctor()
    let eventEmitted = false
    instance.$emit = function (key, value) {
      if (key === 'filtersChanged') {
        eventEmitted = true
      }
    }
    instance.$mount()
    expect(eventEmitted).to.be.true
    expect(instance.$data).to.deep.equal(expectedDefaultFilters)
  })

  it('resets filters to the default values when reset is called', () => {
    const Ctor = Vue.extend(ProductFilterSidebar)
    const instance = new Ctor()
    let eventEmitted = false
    instance.$mount()
    instance.minPrice = 69.1337
    expect(instance.$data).to.not.deep.equal(expectedDefaultFilters)

    instance.$emit = function (key, value) {
      if (key === 'filtersChanged') {
        eventEmitted = true
      }
    }
    instance.resetFilters()

    expect(eventEmitted).to.be.true
    expect(instance.$data).to.deep.equal(expectedDefaultFilters)
  })
})
