<template>
  <v-app>
    <v-main>
      <v-container fluid>
        <LandingPage />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import LandingPage from './components/LandingPage.vue';

export default {
  name: 'App',
  components: {
    LandingPage
  },
  data() {
    return {
      darkMode: false
    };
  }
};
</script>

<style>
/* Add global styles here if needed */
</style>
