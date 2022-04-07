import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AssetList from '../components/AssetList'
import ToBuyList from '../components/ToBuyList'

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
        component: AssetList
      },
      {
        path: '/toBuy',
        name: 'toBuy',
        component: ToBuyList
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
