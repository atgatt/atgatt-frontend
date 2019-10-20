import Vue from 'vue'
import Router from 'vue-router'
import Ratings from './views/Ratings.vue'

Vue.use(Router)

function getRatingsProps (route, type) {
  return {
    initialManufacturer: route.params.initialManufacturer,
    initialModel: route.params.initialModel,
    type: type
  }
}

function getRatingsRoute (type, pathPrefix) {
  return {
    path: `/${pathPrefix || type}/buy/:initialManufacturer?-:initialModel?`,
    alias: `/${pathPrefix || type}`,
    component: Ratings,
    props: (route) => getRatingsProps(route, type)
  }
}

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/helmets/buy/:initialManufacturer?-:initialModel?',
      alias: '/',
      component: Ratings,
      props: (route) => getRatingsProps(route, 'helmet')
    },
    getRatingsRoute('jacket', 'jackets'),
    getRatingsRoute('pants'),
    getRatingsRoute('boots'),
    getRatingsRoute('gloves'),
    {
      path: '/about',
      component: () => import(/* webpackChunkName: "aboutus" */ './views/About.vue')
    },
    {
      path: '*',
      component: () => import(/* webpackChunkName: "notfound" */ './views/NotFound.vue')
    }
  ]
})
