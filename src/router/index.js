// router/index.js

import Vue from 'vue';
import VueRouter from 'vue-router';
import LandingPage from '../components/LandingPage.vue';
import LoginPage from '../components/LoginDialog.vue';
import UserTypeDestinationPage from '../components/UserTypeDestinationPage.vue'; // Import UserTypeDestinationPage component

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
    path: '/user-type-destination', // Define the route for /user-type-destination
    name: 'UserTypeDestinationPage',
    component: UserTypeDestinationPage
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
