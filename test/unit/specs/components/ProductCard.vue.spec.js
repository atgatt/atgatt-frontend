import ProductCard from '../../../../src/components/ProductCard.vue'
import { shallow } from '@vue/test-utils'

describe('ProductCard.vue', () => {
  let wrapper = null
  let component = null
  const mockExistingUrl = 'http://existingurl.com'
  const expectedAmazonSearchUrl = 'https://www.amazon.com/gp/search?ie=UTF8&tag=crashtested-20&linkCode=ur2&linkId=2a2896b54f76421e38228d42e244bfbb&camp=1789&creative=9325&index=aps&keywords=manu model'

  beforeEach(() => {
    wrapper = shallow(ProductCard, {
      props: ['product'],
      propsData: {
        'product': {'manufacturer': 'manu', 'model': 'model', 'amazonBuyURL': mockExistingUrl, 'amazonPriceInUSDMultiple': 12345, 'certifications': {'SHARP': null}, 'subtype': 'modular'}
      }
    })
    component = wrapper.vm
  })

  it('should correctly format amazon buy button URLs using the buyUrl when buyUrl is defined', () => {
    component.$mount()
    expect(component.formattedAmazonBuyURL).toBe(mockExistingUrl)
  })

  it('should correctly format amazon buy button URLs using the Amazon search url when buyUrl is empty', () => {
    component.$mount()
    component.product.amazonBuyURL = ''
    expect(component.formattedAmazonBuyURL).toBe(expectedAmazonSearchUrl)
  })

  it('should correctly format amazon buy button URLs using the Amazon search url when buyUrl is undefined', () => {
    component.$mount()
    component.product.amazonBuyURL = undefined
    expect(component.formattedAmazonBuyURL).toBe(expectedAmazonSearchUrl)
  })

  it('should correctly format amazon buy button URLs using the Amazon search url when buyUrl is null', () => {
    component.$mount()
    component.product.amazonBuyURL = null
    expect(component.formattedAmazonBuyURL).toBe(expectedAmazonSearchUrl)
  })

  it('should correctly format the amazon price when the price is greater than $0', () => {
    component.$mount()
    expect(component.formattedAmazonPrice).toBe('$123.45')
  })

  it('should correctly format the amazon price when the price is $0', () => {
    component.$mount()
    component.product.amazonPriceInUSDMultiple = 0
    expect(component.formattedAmazonPrice).toBe('a mystery price!')
  })

  it('should correctly format the amazon price when the price is less than $0', () => {
    component.$mount()
    component.product.amazonPriceInUSDMultiple = -100000
    expect(component.formattedAmazonPrice).toBe('a mystery price!')
  })

  it('should correctly format the amazon price when the price is fractional', () => {
    component.$mount()
    component.product.amazonPriceInUSDMultiple = 1
    expect(component.formattedAmazonPrice).toBe('$0.01')
  })
})
