// router/index.js

import Vue from 'vue';
import VueRouter from 'vue-router';
import HomePage from '../components/HomePage.vue';
//import LoginPage from '../components/LoginDialog.vue';
//import UserTypeDestinationPage from '../components/UserTypeDestinationPage.vue';
import ChooseDialog from '../components/ChooseDialog.vue';
import PilotView from '../components/PilotView.vue'; // Import PilotView component
import PassengerView from '../components/PassengerView.vue'; // Import PassengerView component

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/choose',
    name: 'ChooseDialog',
    component: ChooseDialog
  },
  {
    path: '/ride-start',
    name: 'pilot-rides',
    component: PilotView
  },
  {
    path: '/available-rides',
    name: 'passenger-rides',
    component: PassengerView
  }
  
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
