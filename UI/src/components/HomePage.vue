<template>
  <!--Copyright Notice : © 2024 Comcast-->
  <v-container class="fill-height d-flex flex-column justify-center align-center">
    <!-- Image -->
    <v-img src="../assets/car_image.jpg" contain height="200"></v-img>

    <!-- Card with Login and Register buttons -->
    <v-card class="text-center pa-5 mt-5 align-center justify-center elevation-4" width="70vw" color="purple-darken-2">
      <v-card-title class="headline primary--text text-h4 align-center justify-center">🅤🅛🅐</v-card-title>
      <v-card-text>
        <v-row>
        <v-btn block :color="darkMode ? 'lime darken-3' : 'blue lighten-1'" class="ma-2" @click="showLoginDialog = true">Login</v-btn></v-row>
        <v-row>
        <v-btn block :color="darkMode ? 'teal darken-3' : 'green lighten-1'" class="ma-2" @click="showRegisterDialog = true">Register</v-btn>
      </v-row>
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
      required: false
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
