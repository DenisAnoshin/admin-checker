import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/HomePage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta:{  header: true, auth: true },
  },
  {
    path: '/add-request',
    name: 'Add request',
    component: () => import('../pages/AddRequestPage.vue'),
    meta:{  header: true, auth: true  },
    
  },
  {
    path: '/request/:id?',
    name: 'Request',
    component: () => import('../pages/RequestPage.vue'),
    meta:{  header: true, auth: true  }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../pages/LoginPage.vue'),
    meta:{  header: false }
  },
  {
    path: '/notifications',
    name: 'Notifications',
    component: () => import('../pages/NotificationPage.vue'),
    meta:{  header: true, auth: true  }
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if(to.path == '/login' && localStorage.getItem('auth')){
    next({ path: '/' });
  }
  if (to.matched.some(record => record.meta.auth)) {
    if (!localStorage.getItem('auth')) {
      next({ path: '/login' });
    } else {
      next();
    }
  } else {
    next();
  }
});
export default router