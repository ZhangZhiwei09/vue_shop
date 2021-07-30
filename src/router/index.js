import Vue from 'vue'
import VueRouter from 'vue-router'
const Login= () =>import('../components/Login.vue')
const Home = () => import('../components/Home.vue')
const Welcome = () => import('../components/Welcome.vue')
const Users = () => import('../components/users/users.vue')
const Power = () => import('../components/power/power.vue')
const Roles = () => import('../components/power/roles.vue')
const Cate = () => import('../components/goods/categories.vue')
const Params = () => import('../components/goods/params.vue')
const GoodsList = () => import( '../components/goods/list.vue')
const Add = () => import( '../components/goods/add.vue')
const Order = () => import( '../components/order/order.vue')
const Report = () => import('../components/report/report.vue')

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/home',
    component: Home,
    redirect: '/Welcome',
    children: [
      { path: '/home', component: Welcome },
      { path: '/users', component: Users },
      { path: '/rights', component: Power },
      { path: '/roles', component: Roles },
      { path: '/categories', component: Cate },
      { path: '/params', component: Params },
      { path: '/goods', component: GoodsList },
      { path: '/goods/add', component: Add },
      { path: '/orders', component: Order },
      { path: '/reports', component: Report },
    ] 
  }
]

const router = new VueRouter({
  routes
})

// 挂载路由导航守卫,to表示将要访问的路径，from表示从哪里来，next是下一个要做的操作 next('/login')强制跳转login
router.beforeEach((to, from, next) => {
  // 访问登录页，放行
  if (to.path === '/login') return next()
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  // 没有token, 强制跳转到登录页
  if (!tokenStr) return next('/login')
  next()
})

export default router
