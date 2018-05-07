// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import firebase from 'firebase'
import { sync } from 'vuex-router-sync'

Vue.config.productionTip = false

firebase.initializeApp(store.getters.getFirebaseConfig)

let app

sync(store, router)

firebase.auth().onAuthStateChanged(
  function (user) {
    if (!app) {
      /* eslint-disable no-new */
      app = new Vue({
        el: '#app',
        store,
        router,
        components: { App },
        template: '<App/>'
      })
    }
  })
