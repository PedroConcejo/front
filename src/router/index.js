import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Partner from '../views/Partner.vue'
import Profile from '../views/Profile.vue'
import Business from '../views/Business.vue'
import BusinessStyles from '../views/Showstyles.vue'
import StylesById from '../views/StylesById.vue'

import Api from '../services/Api'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/partners/:partnerid',
    name: 'Partner',
    component: Partner
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    beforeEnter (to, from, next) {
      if (!localStorage.getItem('token')) {
        next({
          name: 'Home'
        })
      } else { next() }
    }
  },
  {
    path: '/business',
    name: 'Business',
    component: Business,
    beforeEnter (to, from, next) {
      if (Api.partnerControl() === null) {
        next({
          name: 'Home'
        })
      } else { next() }
    }
  },
  {
    path: '/business/styles',
    name: 'BusinessStyles',
    component: BusinessStyles,
    beforeEnter (to, from, next) {
      if (!localStorage.getItem('token')) {
        next({
          name: 'Home'
        })
      } else { next() }
    }
  },
  {
    path: '/business/styles/:styleid',
    name: 'StylesById',
    component: StylesById,
    beforeEnter (to, from, next) {
      if (!localStorage.getItem('token')) {
        next({
          name: 'Home'
        })
      } else { next() }
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
