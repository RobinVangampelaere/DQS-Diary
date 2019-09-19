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

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) next('/');
  else next();
});

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    //console.log(user);
    // user.getIdToken().then(function (idToken) {
    //   console.log(idToken);
    // });
    db.collection('users').doc(user.uid).get().then((doc) => {
      if (!doc.exists) {
        addNewUser(user);
      }
      store.commit("login", user.uid);
    }).then(() => {
      renderApp();
    })
  } else {
    renderApp();
  }
});

function addNewUser(user) {
  db.collection('users').doc(user.uid).set({
    displayName: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
    uid: user.uid
  })
}

function renderApp() {
  new Vue({
    router,
    store,
    render: h => h(App),
  }).$mount('#app')
}