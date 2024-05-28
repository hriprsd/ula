<template>
  <v-container class="fill-height d-flex flex-column justify-center align-center">
    <!-- Image -->
    <v-img src="../assets/car_image.jpg" contain height="200"></v-img>

    <!-- Card with Login and Register buttons -->
    <v-card class="text-center pa-5 mt-5">
    <v-card-title class="text-center headline align-center justify-center">Ula ~ உலா</v-card-title>
      <v-card-text>
        <v-btn class="ma-2" @click="showLoginDialog = true">Login</v-btn>
        <v-btn class="ma-2" @click="showRegisterDialog = true">Register</v-btn>
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
  name: 'LandingPage',
  components: {
    LoginDialog,
    RegisterDialog
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
