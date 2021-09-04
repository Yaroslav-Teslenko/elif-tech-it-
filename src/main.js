import Vue from 'vue'
import Vuelidate from 'vuelidate'

import App from './App.vue'
import router from './router'
import store from './store'
import dateFilter from '@/filters/date.filters'

import messagePlugin from '@/utils/message.plugin'

import tooltipDirective from '@/directives/tooltip.directive.js'
import Loader from '@/components/app/loader.vue'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'

Vue.use(Vuelidate)
Vue.use(messagePlugin)

Vue.component('Loader', Loader)

Vue.filter('date', dateFilter)

Vue.directive('tooltip', tooltipDirective)

Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: 'AIzaSyCyEQc_FmL5pVrKHp9YMRzjf4JXs3f2xVg',
  authDomain: 'elfi-test.firebaseapp.com',
  databaseURL: 'https://elfi-test-default-rtdb.firebaseio.com',
  projectId: 'elfi-test',
  storageBucket: 'elfi-test.appspot.com',
  messagingSenderId: '260187137846',
  appId: '1:260187137846:web:a8030f7be1998690e53597'
}

firebase.initializeApp(firebaseConfig)
let app
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
