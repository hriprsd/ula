<template>
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
            label="Location"
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
          <v-expand-transition>
            <div v-if="isPilot">
              <v-text-field
                v-model="vehicleType"
                label="Vehicle Type (2 wheeler or 4 wheeler)"
                :rules="[v => !!v || 'Vehicle type is required']"
                required
              ></v-text-field>
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
                v-model="seats"
                label="Number of Seats"
                :rules="[v => !!v || 'Number of seats is required']"
                required
              ></v-text-field>
            </div>
          </v-expand-transition>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="register">Register</v-btn>
        <v-btn color="grey darken-1" text @click="close">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
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
    register() {
      if (this.$refs.form.validate()) {
        const data = {
          name: this.name,
          ntid: this.ntid,
          mobile: this.mobile,
          location: this.location,
          password: this.password,
          isPilot: this.isPilot,
          vehicleType: this.vehicleType,
          vehicleNumber: this.vehicleNumber,
          vehicleModel: this.vehicleModel,
          seats: this.seats
        };

        // Make an API call to register
        fetch('https://your-backend-api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
          // Handle response
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