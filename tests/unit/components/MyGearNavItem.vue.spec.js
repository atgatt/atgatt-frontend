import MyGearNavItem from '../../../src/components/MyGearNavItem.vue'
import { shallowMount } from '@vue/test-utils'
import { registerGlobalComponents } from '../../../src/globals'
import { SOURCE_PRODUCT_SET_ID_KEY } from '../../../src/lib/constants'

describe('MyGearNavItem.vue', () => {
  let wrapper = null
  let component = null
  let $router = null
  let $toasted = null

  registerGlobalComponents()

  beforeEach(() => {
    localStorage.removeItem(SOURCE_PRODUCT_SET_ID_KEY)
    $router = []
    $toasted = { show: jest.fn() }

    wrapper = shallowMount(MyGearNavItem, {
      mocks: {
        $router,
        $toasted
      }
    })
    component = wrapper.vm
    component.$mount()
  })

  it('should show a warning toast when the active product set ID is not defined', () => {
    component.routeToProductSet()
    expect($router.length).toBe(0)
    expect($toasted.show.mock.calls[0][1].type).toBe('warning')
  })

  it('should route the user to the correct motorcycle gear route when the active product set ID is defined', () => {
    localStorage.setItem(SOURCE_PRODUCT_SET_ID_KEY, 'someid')
    component.routeToProductSet()
    expect($router.length).toBe(1)
    expect($router[0].path).toBe('/motorcycle-gear/someid')
    expect($toasted.show).not.toHaveBeenCalled()
  })
})
