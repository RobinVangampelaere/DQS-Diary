import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import authStore from './modules/authStore'
import dataStore from './modules/dataStore'

export default new Vuex.Store({
  modules: {
    authStore,
    dataStore
  }
});
