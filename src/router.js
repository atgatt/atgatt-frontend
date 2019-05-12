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
    {
      path: '/jackets/buy/:initialManufacturer?-:initialModel?',
      alias: '/jackets',
      component: Ratings,
      props: (route) => getRatingsProps(route, 'jacket')
    },
    {
      path: '/about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '*',
      // route level code-splitting
      // this generates a separate chunk (notfound.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "notfound" */ './views/NotFound.vue')
    }
  ]
})
