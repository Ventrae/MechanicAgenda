import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/views/Index.vue'
import Admin from '@/views/Admin.vue'
import Agenda from "@/views/Agenda.vue";
import Profile from "@/views/Profile.vue";
import Navigation from "@/components/general/Navigation.vue";

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
    }
  },
  {
    path: '/admin',
    name: 'admin',
    components: {
      navigation: Navigation,
      default: Admin
    }
  },
  {
    path: '/profile',
    name: 'profile',
    components: {
      navigation: Navigation,
      default: Profile
    }
  }
];

// @ts-ignore
const router = new VueRouter({
  routes
});

export default router
