// Imports (basic)
import Vue from 'vue'
import App from './App.vue'
import router from './router'

// Imports (bootstrap + burgers)
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/assets/scss/styles.scss';

// Firestore
// @ts-ignore
import VueFirestore from 'vue-firestore'
import Firebase from 'firebase'
import {firestoreConfig} from "@/api-keys";
require('firebase/firestore');
Vue.use(VueFirestore);
var firebaseApp = Firebase.initializeApp(firestoreConfig);
export const firestore = firebaseApp.firestore();



// Vue mounting
Vue.config.productionTip = false;
new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
