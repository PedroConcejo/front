import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Partner from '../views/Partner.vue'
import Profile from '../views/Profile.vue'
import Messages from '../views/Messages.vue'
import Ratings from '../views/Ratings.vue'
import Business from '../views/Business.vue'
import BusinessStyles from '../views/Showstyles.vue'
import StylesById from '../views/StylesById.vue'
import Favorites from '../views/Favorites.vue'
import Messagespartner from '../views/Messagespartner.vue'

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
    path: '/messages',
    name: 'Messages',
    component: Messages,
    beforeEnter (to, from, next) {
      if (!localStorage.getItem('token')) {
        next({
          name: 'Home'
        })
      } else { next() }
    }
  },
  {
    path: '/favorites',
    name: 'Favorites',
    component: Favorites,
    beforeEnter (to, from, next) {
      if (!localStorage.getItem('token')) {
        next({
          name: 'Home'
        })
      } else { next() }
    }
  },
  {
    path: '/ratings',
    name: 'Ratings',
    component: Ratings,
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
      if (!localStorage.getItem('token')) {
        next({
          name: 'Home'
        })
      }
      if (localStorage.getItem('role') !== 'partner') {
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
      }
      if (localStorage.getItem('role') !== 'partner') {
        next({
          name: 'Home'
        })
      } else { next() }
    }
  },
  {
    path: '/messages/partner',
    name: 'Messagespartner',
    component: Messagespartner,
    beforeEnter (to, from, next) {
      if (!localStorage.getItem('token')) {
        next({
          name: 'Home'
        })
      }
      if (localStorage.getItem('role') !== 'partner') {
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
      }
      if (localStorage.getItem('role') !== 'partner') {
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
