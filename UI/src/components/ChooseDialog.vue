<template>
    <!--Copyright Notice : © 2024 Comcast-->
    <v-card>
<v-dialog value="true" max-width="400">
    <v-card>
      <v-card-title class="headline">Role & Destination</v-card-title>
      <v-card-text>
        <v-select
          v-model="userType"
          :items="['Passenger', 'Pilot']"
          label="User Type"
          :rules="[v => !!v || 'User type is required']"
          required>
         </v-select>
         <v-select
          v-model="destination"
          :items="['Home','office']"
          label="Destination"
          :rules="[v => !!v || 'Destination is required']"
          required>
          </v-select>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="userRoleSubmit">{{buttonText}}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
    </v-card>
</template>
<script>
import { mapState } from 'vuex';
export default {
    name: 'LoginPage',
    data() {
      return {
        localShow: this.show,
        errorDialog: false,
        userType:'',
        destination:'',
        isLoginLoading:false,
        statusMsg:'',
        buttonText:'submit' // Flag for showing error dialog
      };
    },
    mounted() {
    },
    watch: {
      show(val) {
        this.localShow = val;
      },
      localShow(val) {
        if (!val) {
          this.$emit('close');
        }
      },
      userType(val) {
        if (val === 'Pilot') {
          this.buttonText = 'Start Ride';
        } else {
          this.buttonText = 'Look for Ride';
        }
      }

    },
    methods: {
        ...mapState(['decodedUserDetails']),
      close() {
        this.localShow = false;
      },
      test() {
        console.log('test');
        console.log(this.$store.state.key.decodedUserDetails);
      },
      userRoleSubmit() {
        if (this.userType === 'Pilot') {
            this.$store.commit('setTripType', this.destination === 'Home' ? 2 : 1);
            this.$router.push({ name: 'pilot-rides' });
        } else {
        this.$store.commit('setTripType', this.destination === 'Home' ? 2 : 1);
          this.$router.push({ name: 'passenger-rides' });
        }
      }
    }
  };
    </script>