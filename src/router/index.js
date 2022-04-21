import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AssetList from '../components/AssetList'
import PurchseList from '../components/PurchseList'

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
        path: '/purchse',
        name: 'purchse',
        component: PurchseList
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
