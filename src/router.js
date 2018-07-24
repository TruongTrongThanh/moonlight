import Vue from 'vue'
import Router from 'vue-router'

const Home = () => import('Pages/Home')
const Register = () => import('Pages/Register')
const Login = () => import('Pages/Login')

const MangaUpload = () => import('Pages/user/MangaUpload')

Vue.use(Router)

export function createRouter() {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        name: 'Home',
        component: Home
      },
      {
        path: '/register',
        name: 'Register',
        component: Register
      },
      {
        path: '/login',
        name: 'Login',
        component: Login
      },
      {
        path: '/manga-upload',
        name: 'MangaUpload',
        component: MangaUpload
      }
    ]
  })
}