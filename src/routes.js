import Home from './views/Home.vue'
import History from './views/History.vue'
import Profile from './views/Profile.vue'

export const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/history',
    name: 'history',
    component: History,
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
    meta: {
      requiresAuth: true
    }
  },
];
