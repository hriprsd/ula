<template>
  <v-container class="fill-height d-flex flex-column justify-center align-center">
    <!-- Image -->
    <v-img src="../assets/car_image.jpg" contain height="200"></v-img>

    <!-- Card with Login and Register buttons -->
    <v-card class="text-center pa-5 mt-5 align-center justify-center" :color="darkMode ? 'indigo darken-4' : 'dark-blue lighten-3'" dark>
      <v-card-title class="headline white--text align-center justify-center">ula ~ உலா</v-card-title>
      <v-card-text>
        <v-btn :color="darkMode ? 'lime darken-3' : 'blue lighten-1'" class="ma-2" @click="showLoginDialog = true">Login</v-btn>
        <v-btn :color="darkMode ? 'teal darken-3' : 'green lighten-1'" class="ma-2" @click="showRegisterDialog = true">Register</v-btn>
      </v-card-text>
    </v-card>

    <!-- Login and Register Dialogs -->
    <LoginDialog v-if="showLoginDialog" :show="showLoginDialog" @close="showLoginDialog = false" />
    <RegisterDialog v-if="showRegisterDialog" :show="showRegisterDialog" @close="showRegisterDialog = false" />
  </v-container>
</template>

<script>
import LoginDialog from './LoginDialog.vue';
import RegisterDialog from './RegisterDialog.vue';

export default {
  components: {
    LoginDialog,
    RegisterDialog
  },
  props: {
    darkMode: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      showLoginDialog: false,
      showRegisterDialog: false
    };
  }
};
</script>

<style scoped>
.fill-height {
  height: 100vh;
}
.text-center {
  text-align: center;
}
</style>
