import AddToProductSetButton from '../../../src/components/AddToProductSetButton.vue'
import { shallowMount } from '@vue/test-utils'
import { registerGlobalComponents } from '../../../src/globals'
import { SOURCE_PRODUCT_SET_ID_KEY } from '../../../src/lib/constants'

describe('AddToProductSetButton.vue', () => {
  let wrapper = null
  let component = null

  let $http, $toasted, $router

  const mockProduct = {
    'uuid': 'mockuuid'
  }

  const mockAddResponse = { data: { 'id': 'mockrespid' } }
  registerGlobalComponents()

  beforeEach(() => {
    localStorage.removeItem(SOURCE_PRODUCT_SET_ID_KEY)
    $http = { post: jest.fn() }
    $http.post.mockReturnValue(mockAddResponse)
    $toasted = { show: jest.fn() }

    const $environment = { apiBaseURL: 'unittest' }
    $router = []
    wrapper = shallowMount(AddToProductSetButton, {
      propsData: {
        'product': mockProduct
      },
      mocks: {
        $http,
        $toasted,
        $router,
        $environment
      }
    })
    component = wrapper.vm
    component.$mount()
  })

  it('should redirect to the correct product set when the request is successful', async () => {
    await component.upsertItemOnActiveGearSet()
    expect($router.length).toBe(1)
    expect($router[0].path).toBe(`/motorcycle-gear/${mockAddResponse.data.id}`)
    expect(component.isLoading).toBe(false)

    expect($toasted.show).toHaveBeenCalledTimes(1)
    expect($toasted.show.mock.calls[0][1].type).toBe('success')
    expect(localStorage.getItem(SOURCE_PRODUCT_SET_ID_KEY)).toBe(mockAddResponse.data.id)
  })

  it('should show an error toast when the request is unsuccessful', async () => {
    $http.post.mockImplementation(() => { throw new Error('something went wrong') })

    await component.upsertItemOnActiveGearSet()
    expect($router.length).toBe(0)
    expect(component.isLoading).toBe(false)

    expect($toasted.show).toHaveBeenCalledTimes(1)
    expect($toasted.show.mock.calls[0][1].type).toBe('error')
    expect(localStorage.getItem(SOURCE_PRODUCT_SET_ID_KEY)).toBe(null)
  })
})
