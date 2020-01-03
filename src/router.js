import Vue from 'vue'
import Router from 'vue-router'
import Ratings from './views/Ratings.vue'
import ProductDetails from './views/ProductDetails.vue'

Vue.use(Router)

function getRatingsProps (route, type) {
  return {
    initialManufacturer: route.params.initialManufacturer,
    initialModel: route.params.initialModel,
    type: type
  }
}

function getRatingsRoute (type, pathSuffix) {
  return {
    path: `/motorcycle-${pathSuffix || type}/`,
    component: Ratings,
    props: (route) => getRatingsProps(route, type)
  }
}

function getDetailsProps (route, type) {
  return {
    initialManufacturer: route.params.initialManufacturer,
    initialModel: route.params.initialModel,
    type: type,
    uuid: route.params.uuid
  }
}

function getDetailsRoute (type, pathPrefix) {
  return {
    path: `/${pathPrefix || type}/buy/:initialManufacturer/:initialModel/:uuid`,
    component: ProductDetails,
    props: (route) => getDetailsProps(route, type)
  }
}

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/motorcycle-helmets/',
      alias: '/',
      component: Ratings,
      props: (route) => getRatingsProps(route, 'helmet')
    },
    getRatingsRoute('jacket', 'jackets'),
    getRatingsRoute('pants'),
    getRatingsRoute('boots'),
    getRatingsRoute('gloves'),
    {
      path: '/about-helmet-ratings',
      component: () => import(/* webpackChunkName: "abouthelmetratings" */ './views/AboutHelmetRatings.vue')
    },
    {
      path: '/about-jacket-ratings',
      component: () => import(/* webpackChunkName: "aboutjacketratings" */ './views/AboutJacketRatings.vue')
    },
    {
      path: '/about-pants-ratings',
      component: () => import(/* webpackChunkName: "aboutpantsratings" */ './views/AboutPantsRatings.vue')
    },
    {
      path: '/about-boots-ratings',
      component: () => import(/* webpackChunkName: "aboutbootsratings" */ './views/AboutBootsRatings.vue')
    },
    {
      path: '/about-gloves-ratings',
      component: () => import(/* webpackChunkName: "aboutbootsratings" */ './views/AboutGlovesRatings.vue')
    },
    {
      path: '/about-us',
      component: () => import(/* webpackChunkName: "aboutus" */ './views/AboutUs.vue')
    },
    getDetailsRoute('helmets'),
    getDetailsRoute('jacket', 'jackets'),
    getDetailsRoute('pants'),
    getDetailsRoute('boots'),
    getDetailsRoute('gloves'),
    {
      path: '/motorcycle-gear/:productSetID',
      component: () => import(/* webpackChunkName: "productsetdetails" */ './views/ProductSetDetails.vue'),
      props: true
    },
    {
      path: '*',
      component: () => import(/* webpackChunkName: "notfound" */ './views/NotFound.vue')
    }
  ]
})
