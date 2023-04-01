import Vue from 'vue'
import VueRouter from 'vue-router'
import manager from "@/views/Manager/Manager.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home',
    name: '大概框架',
    component: manager,
    children:[
      {path: '/waitGoods',name:'waitGoods',component: () => import('../views/Goods/WaitGoods.vue')},
      {path: '/sellGoods',name:'sellGoods',component: () => import('../views/Goods/SellGoods.vue')},
      {path: '/adventGoods',name:'adventGoods',component: () => import('../views/Goods/AdventGoods.vue')},


      {path: '/about',name: 'about',component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')},
      {path: '/home',name:'home',component: () => import('../views/Goods/HomeView.vue')},
      {path: '/goodDetail',name:'goodDetail',component: () => import('../views/GoodDetail.vue' )}
    ]
  },
  {path: '/login',name: 'login',component: () => import('../views/LoginView.vue')},

]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) =>{
  console.log("to"+to.path)
  console.log("from"+from.path)
  let token = window.localStorage.getItem("user_token")?JSON.parse(localStorage.getItem("user_token")):null
  console.log(token)
  if (token == null && to.path !== '/login'){
    next({path:'/login'})
  }
  next()

})

export default router
