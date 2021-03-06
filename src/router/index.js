import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/home.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/home', component: Home }

]

const router = new VueRouter({
  routes
})

//挂在路由守卫
router.beforeEach((to, from, next) => {
  // to  将要访问的路径， from 从哪个路径跳转而来，next() 放行函数:next('login')强制跳转
  if (to.path === '/login') {
    return next();
  }
  //get token to if
  const token = window.sessionStorage.getItem('token');
  //if !token  jump to login page to login.
  if (!token) {
    return next('/login');
  }
  next();
})
export default router
