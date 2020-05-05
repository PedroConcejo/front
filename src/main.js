import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import firebase from 'firebase'

Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: 'AIzaSyA1-zQQCKcyHZEuzTFZUDj2LHhd-i5yHWM',
  authDomain: 'recuerdosphoto-890b9.firebaseapp.com',
  databaseURL: 'https://recuerdosphoto-890b9.firebaseio.com',
  projectId: 'recuerdosphoto-890b9',
  storageBucket: 'recuerdosphoto-890b9.appspot.com',
  messagingSenderId: '609296482581',
  appId: '1:609296482581:web:b0232f1fc4b8e22333a91c'
}
firebase.initializeApp(firebaseConfig)

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
