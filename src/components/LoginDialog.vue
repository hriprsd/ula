<template>
  <v-dialog v-model="localShow" max-width="500">
    <v-card>
      <v-card-title class="headline">Login</v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-text-field
            v-model="ntid"
            label="NTID"
            :rules="[v => !!v || 'NTID is required']"
            required
          ></v-text-field>
          <v-text-field
            v-model="password"
            label="Password"
            :type="'password'"
            :rules="[v => !!v || 'Password is required']"
            required
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="login">Login</v-btn>
        <v-btn text @click="close">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
    name: 'LoginPage',
  props: {
    show: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      ntid: '', // Test user's NTID
      password: '', // Test user's password
      valid: false,
      localShow: this.show
    };
  },
  watch: {
    show(val) {
      this.localShow = val;
    },
    localShow(val) {
      if (!val) {
        this.$emit('close');
      }
    }
  },
  methods: {
    close() {
      this.localShow = false;
    },
    login() {
      if (this.$refs.form.validate()) {
        // Simulating a successful login for demonstration
        // In a real application, you should make an API call to validate the credentials
        const testUserNTID = 'testuser'; // Test user's NTID
        const testUserPassword = 'testpassword'; // Test user's password

        if (this.ntid == testUserNTID && this.password == testUserPassword) {
          // Redirect to user-type-destination page upon successful login
          this.$router.push('/user-type-destination');
          this.close();
        } else {
          // Handle invalid credentials
          console.error('Invalid credentials');
        }
      }
    }
  }
};
</script>
