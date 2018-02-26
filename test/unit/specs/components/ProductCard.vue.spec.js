import ProductCard from '../../../../src/components/ProductCard.vue'
import { shallow } from '@vue/test-utils'

describe('ProductCard.vue', () => {
  let wrapper = null
  let component = null
  const mockExistingUrl = 'http://existingurl.com'
  const expectedAmazonSearchUrl = 'https://www.amazon.com/gp/search?ie=UTF8&tag=crashtested-20&linkCode=ur2&linkId=2a2896b54f76421e38228d42e244bfbb&camp=1789&creative=9325&index=automotive&keywords=manu model'

  beforeEach(() => {
    wrapper = shallow(ProductCard, {
      props: ['product'],
      propsData: {
        'product': {'manufacturer': 'manu', 'model': 'model', 'buyUrl': mockExistingUrl, 'priceInUsdMultiple': 12345, 'certifications': {'SHARP': null}, 'subtype': 'modular'}
      }
    })
    component = wrapper.vm
  })

  it('should correctly format buy button URLs using the buyUrl when buyUrl is defined', () => {
    component.$mount()
    expect(component.formattedBuyURL).toBe(mockExistingUrl)
  })

  it('should correctly format buy button URLs using the Amazon search url when buyUrl is empty', () => {
    component.$mount()
    component.product.buyUrl = ''
    expect(component.formattedBuyURL).toBe(expectedAmazonSearchUrl)
  })

  it('should correctly format buy button URLs using the Amazon search url when buyUrl is undefined', () => {
    component.$mount()
    component.product.buyUrl = undefined
    expect(component.formattedBuyURL).toBe(expectedAmazonSearchUrl)
  })

  it('should correctly format buy button URLs using the Amazon search url when buyUrl is null', () => {
    component.$mount()
    component.product.buyUrl = null
    expect(component.formattedBuyURL).toBe(expectedAmazonSearchUrl)
  })

  it('should correctly format the price when the price is greater than $0', () => {
    component.$mount()
    expect(component.formattedPrice).toBe('$123.45')
  })

  it('should correctly format the price when the price is $0', () => {
    component.$mount()
    component.product.priceInUsdMultiple = 0
    expect(component.formattedPrice).toBe('a mystery price!')
  })

  it('should correctly format the price when the price is less than $0', () => {
    component.$mount()
    component.product.priceInUsdMultiple = -100000
    expect(component.formattedPrice).toBe('a mystery price!')
  })

  it('should correctly format the price when the price is fractional', () => {
    component.$mount()
    component.product.priceInUsdMultiple = 1
    expect(component.formattedPrice).toBe('$0.01')
  })
})
