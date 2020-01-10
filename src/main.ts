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
import firebase from "firebase";
import {firestoreConfig} from "@/api-keys";
require('firebase/firestore');
Vue.use(VueFirestore);
var firebaseApp = Firebase.initializeApp(firestoreConfig);
export const firestore = firebaseApp.firestore();

// Vuex setup
import { store } from './store/store';

// Vue mounting
Vue.config.productionTip = false;

let app = '';

firebase.auth().onAuthStateChanged(()=>{
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})


