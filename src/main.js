// import { createApp } from "vue";
// import App from "./App.vue";
// import "./registerServiceWorker";
// import router from "./router";
// import store from "./store";
// import "materialize-css/dist/js/materialize.min";

import Vue from 'vue'
import Vuelidate from 'vuelidate'
import Paginate from 'vuejs-paginate'
import App from './App.vue'
import router from './router'
import store from './store'
import dateFilter from '@/filters/date.filters'
import currencyFilter from '@/filters/currency.filters'
import localizeFilter from '@/filters/localize.filter'
import messagePlugin from '@/utils/message.plugin'
import titlePlugin from '@/utils/title.plugin'
import tooltipDirective from '@/directives/tooltip.directive.js'
import Loader from '@/components/app/loader.vue'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
// обезличеные импорты ( не имп-ют объект) всегда ставить в конец
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'

Vue.use(Vuelidate)
Vue.use(messagePlugin)
Vue.use(titlePlugin)
Vue.component('Loader', Loader)
// теперь в каждом компоненте появляется св-во validations
Vue.component('Paginate', Paginate)

Vue.filter('date', dateFilter)
Vue.filter('currency', currencyFilter)
Vue.filter('localize', localizeFilter)
Vue.directive('tooltip', tooltipDirective)

Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: 'AIzaSyAoj58hTnaPUA58akql2L-BLIvHiy2NoMo',
  authDomain: 'vue-crm-81a51.firebaseapp.com',
  projectId: 'vue-crm-81a51',
  storageBucket: 'vue-crm-81a51.appspot.com',
  messagingSenderId: '562520898364',
  appId: '1:562520898364:web:8f64c9ed7480ff38043c39'
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
//метод будет вызываться, когда фб найдет какие-либо локальныш данные полиьзователз
//которые позволят поддерживать авто-авторизацию
//если cb сработает, то тогда выз-ем рендер приложения
//  + проверяем, не было ли пр-е  app уже запущенно

//TODO проверить рзботу  с другими версиями node.
