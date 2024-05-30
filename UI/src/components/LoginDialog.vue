<template>
  <!--Copyright Notice : © 2024 Comcast-->
  <div>
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
        {{ statusMsg }}
        <v-spacer></v-spacer>
        <v-btn color="primary" :loading="isLoginLoading" @click="login">Login</v-btn>
        <v-btn text @click="close">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  </div>
</template>

<script>
import axios from 'axios';
import { mapActions } from 'vuex';
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
      localShow: true,
      userType:'',
      destination:'',
      RoleDestDialog:false,
      isLoginLoading:false,
      statusMsg:'' // Flag for showing error dialog
    };
  },
  mounted() {
    this.$refs.form.resetValidation();
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
    ...mapActions(['setToken']),
    close() {
      this.localShow = false;
    },
    login() {
      if (this.$refs.form.validate()) {
        this.isLoginLoading = true;
let data = JSON.stringify({
  "username": this.ntid,
  "password": this.password
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'http://localhost:3000/login',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
  console.log('Login successful:', response.data);
            const token = response.data.token;
            this.statusMsg = 'Login successful';
            this.$store.dispatch('setToken', token);
            this.localShow=false;
            this.$router.push({ name: 'ChooseDialog' });
})
.catch((error) => {
  console.error('Login failed:', error);
            this.statusMsg = 'Login failed';
}).finally(() => {
            this.isLoginLoading = false;
          });

      
      }
    },
    // userRoleSubmit() {
    //   if (this.userType === 'Pilot') {
    //     axios.get('/startRide', { headers: { Authorization: `Bearer ${this.$store.state.token}` }, params: { user_nt_id: this.ntid, trip_type: this.destination==='Home'? '1':'2' }})
    //       .then(response => {
    //         console.log('Ride started:', response.data);
    //       })
    //       .catch(error => {
    //         console.error('Failed to start ride:', error);
    //       });
    //     this.$router.push({ name: 'PilotHome' });
    //   } else {
    //     axios.get('/getAvailableRides', { headers: { Authorization: `Bearer ${this.$store.state.token}` }, params: { user_nt_id: this.ntid }})
    //       .then(response => {
    //         console.log('Ride started:', response.data);
    //       })
    //       .catch(error => {
    //         console.error('Failed to start ride:', error);
    //       });
    //     this.$router.push({ name: 'PassengerHome' });
    //   }
    // }
  }
};
</script>
