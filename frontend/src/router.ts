import Dashboard from "./Dashboard.vue"
import Home from "./Home.vue"
import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from "./composables"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    {
      path: '/dashboard',
      component: Dashboard,
      beforeEnter: ((to, from, next) => {
        useAuth().getSessionData().then(data => {
          if (!data || !data.isLoggedIn) {
            alert('Please login first')

            next('/')
            
            return
          }

          sessionStorage.setItem('username', data.username)

          next()
        })
      })
    },
  ]
})

export { router }
