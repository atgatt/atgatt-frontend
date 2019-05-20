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
      path: '/about-helmet-ratings',
      component: () => import(/* webpackChunkName: "abouthelmetratings" */ './views/AboutHelmetRatings.vue')
    },
    {
      path: '/about-us',
      component: () => import(/* webpackChunkName: "aboutus" */ './views/AboutUs.vue')
    },
    {
      path: '*',
      component: () => import(/* webpackChunkName: "notfound" */ './views/NotFound.vue')
    }
  ]
})
