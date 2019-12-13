import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/views/Index.vue'
import Admin from '@/views/Admin.vue'
import Agenda from "@/views/Agenda.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'index',
    component: Index
  },
  {
    path: '/agenda',
    name: 'agenda',
    component: Agenda
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin
  }
];

const router = new VueRouter({
  routes
});

export default router
