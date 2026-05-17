import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import './convex.js'
import App from './app.vue'
import './assets/css/main.css'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: () => import('./pages/index.vue') },
    { path: '/processing/:id', component: () => import('./pages/processing/[id].vue') },
    { path: '/report/:id', component: () => import('./pages/report/[id].vue') },
    { path: '/fullReport', component: () => import('./pages/fullReport.vue') },
    { path: '/convex-test', component: () => import('./pages/convex-test.vue') },
  ]
})

const app = createApp(App)
app.use(router)
app.mount('#app')
