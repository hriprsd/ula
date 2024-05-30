<template>
  <!--Copyright Notice : © 2024 Comcast-->
  <v-dialog v-model="localShow" max-width="600">
    <v-card>
      <v-card-title class="headline">Register</v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-text-field
            v-model="name"
            label="Name"
            :rules="[v => !!v || 'Name is required']"
            required
          ></v-text-field>
          <v-text-field
            v-model="ntid"
            label="NTID"
            :rules="[v => !!v || 'NTID is required']"
            required
          ></v-text-field>
          <v-text-field
            v-model="mobile"
            label="Mobile Number"
            :rules="[v => !!v || 'Mobile number is required']"
            required
          ></v-text-field>
          <v-text-field
            v-model="location"
            label="Location (Ex: Kamatchi Hospital, Pallikaranai)"
            :rules="[v => !!v || 'Location is required']"
            required
          ></v-text-field>
          <v-text-field
            v-model="password"
            label="Password"
            :type="'password'"
            :rules="[v => !!v || 'Password is required']"
            required
          ></v-text-field>
          <v-checkbox
            v-model="isPilot"
            label="Are you a pilot?"
          ></v-checkbox>
          <!-- Show vehicle details fields only if 'Are you a pilot?' is checked -->
          <v-expand-transition>
            <div v-if="isPilot">
              <v-select
                v-model="vehicleType"
                :items="['2-wheeler', '4-wheeler']"
                label="Vehicle Type"
                :rules="[v => !!v || 'Vehicle type is required']"
                required
                @change="handleVehicleTypeChange"
              ></v-select>
              <v-text-field
                v-model="vehicleNumber"
                label="Vehicle Number"
                :rules="[v => !!v || 'Vehicle number is required']"
                required
              ></v-text-field>
              <v-text-field
                v-model="vehicleModel"
                label="Vehicle Model"
                :rules="[v => !!v || 'Vehicle model is required']"
                required
              ></v-text-field>
              <v-text-field
                v-model="vehicleColor"
                label="Vehicle color"
                :rules="[v => !!v || 'Vehicle color is required']"
                required
              ></v-text-field>
              <v-text-field
                v-model="vehicleMake"
                label="Vehicle Make"
                :rules="[v => !!v || 'Vehicle make is required']"
                required
              ></v-text-field>
              <v-text-field
                v-if="vehicleType === '4 wheeler'"
                v-model="seats"
                label="Number of Seats"
                :rules="[v => !!v || 'Number of seats is required']"
                required
              ></v-text-field>
            </div>
          </v-expand-transition>
        </v-form>
      </v-card-text>
      {{ statusMsg }}
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="register">Register</v-btn>
        <v-btn color="grey darken-1" text @click="close">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from 'axios';
export default {
  props: {
    show: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      name: '',
      ntid: '',
      mobile: '',
      location: '',
      password: '',
      isPilot: false,
      vehicleType: '',
      vehicleNumber: '',
      vehicleModel: '',
      seats: '',
      vehicleColor: '',
      vehicleMake: '',
      valid: false,
      localShow: this.show,
      statusMsg: ''
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
    register() {
      if (this.$refs.form.validate()) {
        const data = {
          user_name: this.name,
          user_nt_id: this.ntid,
          mobile_number: this.mobile,
          location: this.location,
          passphrase: this.password,
          user_type_id: this.isPilot? '1' : '2',
          vehicle_number: this.vehicleNumber,
          vehicle_model: this.vehicleModel,
          number_of_seats: this.vehicleType,
          vehicle_type: this.vehicleType,
          vehicle_make:  this.vehicleMake,
          vehicle_color: this.vehicleColor
        };

        // Add vehicle details to data only if the user is a pilot
        if (this.isPilot) {
          Object.assign(data, {
            vehicleType: this.vehicleType,
            vehicleNumber: this.vehicleNumber,
            vehicleModel: this.vehicleModel,
            seats: this.vehicleType === '2 wheeler' ? '1' : this.seats
          });
        }
        
        // Make an API call to register
        axios.post('https://your-backend-api/signup', {
          data
        })
        .then(response => response.json())
        .then(data => {
          this.statusMsg = 'Registration successful! Please Loging to continue.';
          console.log(data);
          this.close();
        })
        .catch(error => {
          console.error('Error:', error);
        });
      }
    }
  }
};
</script>

<style scoped>
/* Add component specific styles here if needed */
</style>
