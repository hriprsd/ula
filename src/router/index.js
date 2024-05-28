// router/index.js

import Vue from 'vue';
import VueRouter from 'vue-router';
import LandingPage from '../components/LandingPage.vue';
import LoginPage from '../components/LoginDialog.vue';
import UserTypeDestinationPage from '../components/UserTypeDestinationPage.vue';
import PilotView from '../components/PilotView.vue'; // Import PilotView component
import PassengerView from '../components/PassengerView.vue'; // Import PassengerView component

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'LandingPage',
    component: LandingPage
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage
  },
  {
    path: '/user-type-destination',
    name: 'UserTypeDestinationPage',
    component: UserTypeDestinationPage
  },
  {
    path: '/pilot-view', // Define the route for the pilot view
    name: 'PilotView',
    component: PilotView
  },
  {
    path: '/passenger-view', // Define the route for the passenger view
    name: 'PassengerView',
    component: PassengerView
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
