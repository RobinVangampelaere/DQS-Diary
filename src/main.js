import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router'
import firebase from 'firebase/app'
import 'firebase/firebase-firestore'
import 'firebase/firebase-auth'
import db from "./firestore";
import { firestorePlugin } from 'vuefire'
import moment from 'moment'
import './registerServiceWorker'

import { routes } from './routes'
import store from './store/store'

//----------
//Needs to be reformated to not import full vuematerial package
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

Vue.use(VueMaterial)
//-----------------

Vue.use(Router);
Vue.use(firestorePlugin)
Vue.config.productionTip = false
Vue.prototype.moment = moment

const router = new Router({
  mode: 'history',
  routes
});

// router.beforeEach((to, from, next) => {
//   const currentUser = firebase.auth().currentUser;
//   const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
//   const requiresAnonym = to.matched.some(record => record.meta.requiresAnonym);

//   if (requiresAuth && !currentUser) next('login');
//   else if (requiresAnonym && currentUser) next('dashboard');
//   else next();
// });

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    db.collection('users').doc(user.uid).get().then((docSnapshot) => {
      store.commit("login", user.uid);
      if (!docSnapshot.exists) {
        db.collection('users').doc(user.uid).set({
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          uid: user.uid
        })
      }
    }).then(() => {
      new Vue({
        router,
        store,
        render: h => h(App),
      }).$mount('#app')
    })
  } else {
    new Vue({
      router,
      store,
      render: h => h(App),
    }).$mount('#app')
  }
});
