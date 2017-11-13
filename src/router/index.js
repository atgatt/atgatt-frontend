import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import Products from '../components/Products'
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
      path: '/products',
      name: 'Products',
      component: Products
    },
    {
      path: '/about',
      name: 'About',
      component: About
    }
  ]
})
