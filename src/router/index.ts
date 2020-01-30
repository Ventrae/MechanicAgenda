import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/views/Index.vue'
import Admin from '@/views/Admin.vue'
import Agenda from "@/views/Agenda.vue";
import Profile from "@/views/Profile.vue";
import Navigation from "@/components/general/Navigation.vue";
import firebase from "firebase";
import CreateTransaction from "@/views/CreateTransaction.vue";
import {store} from "../store/store";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'index',
    components: {
      default: Index
    }

  },
  {
    path: '/agenda',
    name: 'agenda',
    components: {
      navigation: Navigation,
      default: Agenda
    },
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/agenda/new',
    name: 'new',
    components: {
      navigation: Navigation,
      default: CreateTransaction
    },
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/admin',
    name: 'admin',
    components: {
      navigation: Navigation,
      default: Admin
    },
    meta: {
      requiresAuth: true
    },
    beforeEnter(to: any, from: any, next: { (): void; (arg0: { name: string; }): void; }) {
      if (store.state.currentUser.isOwner) {
        next();
      }
      else {
        // @ts-ignore
        next(false);
      }
    }
  },
  {
    path: '/profile',
    name: 'profile',
    components: {
      navigation: Navigation,
      default: Profile
    },
    meta: {
      requiresAuth: true
    }
  }
];

// @ts-ignore
const router = new VueRouter({
  routes
});


 router.beforeEach((to, from, next)=>{
   const currentUser = firebase.auth().currentUser;
   const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

   if (requiresAuth && !currentUser) next('agenda');
   // else if (!requiresAuth && currentUser) next('');
   else next();
 });


export default router
