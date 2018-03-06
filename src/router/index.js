import Vue from 'vue'
import Router from 'vue-router'
import Ratings from '../components/Ratings'
import About from '../components/About'
import NotFound from '../components/NotFound'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Safe Motorcycle Helmets',
      component: Ratings
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '*',
      name: 'Not Found',
      component: NotFound
    }
  ]
})
