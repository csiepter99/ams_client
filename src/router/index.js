import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store';
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import AssetList from '../components/AssetList'
import PurchseList from '../components/PurchseList'
import MemberList from '../components/MemberList'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    name: 'home',
    component: HomeView,
    redirect: '/assets',
    children: [
      {
        path: '/assets',
        name: 'assets',
        component: AssetList,
        meta: { requiresAuth: true }
      },
      {
        path: '/purchse',
        name: 'purchse',
        component: PurchseList,
        meta: { requiresAuth: true }
      },
      {
        path: '/member',
        name: 'member',
        component: MemberList,
        meta: { requiresAuth: true },
        beforeEnter: (to, from, next) => {
          if (store.state.auth.roles.includes('ROLE_GENERAL_AFFAIRS')) {
            next();
          } else {
            next(from)
          }
        },
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (store.state.auth.isLogin) {
      next();
    } else {
      next({name: 'login'})
    }
  } else {
    next();
  }
})

export default router
