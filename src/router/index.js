import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import Ratings from '../components/Ratings'
import About from '../components/About'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/ratings',
      name: 'Ratings',
      component: Ratings
    },
    {
      path: '/about',
      name: 'About',
      component: About
    }
  ]
})
