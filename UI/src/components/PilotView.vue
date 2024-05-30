<template>
  <!--Copyright Notice : © 2024 Comcast-->
  <v-container class="fill-height">
    <!-- Vuetify app bar -->
    <v-app-bar app dark color="primary">
      <v-toolbar-title>Pilot's Dashboard</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="logout">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Card content -->
    <v-card class="max-width mt-8 pa-2"> <!-- Adjusted margin-top -->
      <v-card-title class="headline">Details</v-card-title>
      <v-divider></v-divider>
      <v-divider></v-divider>
      <v-list-item v-if="ride.length>0">
        <v-list-item-content>
          <v-list-item-subtitle>
            <v-icon class="mr-1">mdi-account</v-icon>
            <span>{{ ride[0].user_name }}</span>
          </v-list-item-subtitle>
          <v-list-item-subtitle>
            <v-icon class="mr-1">mdi-phone</v-icon>
            <span>{{ ride[0].mobile_number }}</span>
          </v-list-item-subtitle>
          <v-list-item-subtitle>
            <v-btn color="primary" @click="acceptRideRequest(ride.user_nt_id)">Accept Ride request</v-btn>
            <v-btn class="ml-3" color="error">deny</v-btn>
          </v-list-item-subtitle>
        </v-list-item-content>

      </v-list-item>
      <v-list-item v-else>
        <v-list-item-content>
          <v-list-item-subtitle>
            <span>No ride requests</span>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-card-actions>
      </v-card-actions>
    </v-card>
    <v-btn color="error" block @click="endTrip">{{ buttonText }}</v-btn>
  </v-container>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      ride: [],
      rideOffers:[],
      buttonText: 'End Trip',
    };
  },
  mounted() {
    setInterval(() => {
        this.getRideOffers();
      }, 20000);
    let config = {
                 method: 'get',
                maxBodyLength: Infinity,
                url: `http://localhost:3000/startRide?user_nt_id=${this.$store.state.decodedUserDetails.user_nt_id}&trip_type=1`,
                headers: {
                  authorization: `${this.$store.state.token}`
                 }
                };

            axios.request(config)
            .then((response) => {
                    console.log(JSON.stringify(response.data));
                    //this.$router.push({ name: 'PilotHome' });
                    setInterval(() => {
        this.getRideOffers();
      }, 5000);
                })
            .catch((error) => {
                console.log(error);
            });
  },
  methods: {
    toggleDetails() {
      this.detailsVisible = !this.detailsVisible;
    },
    endTrip() {
      let config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: `http://localhost:3000/endRide?pilot_id=${this.$store.state.decodedUserDetails.user_nt_id}`,
          headers: {
            Authorization: `${this.$store.state.token}`
           }
      };
          axios.request(config)
          .then((response) => {
             console.log(JSON.stringify(response.data));
             this.buttonText = 'Trip Ended';

          })
        .catch((error) => {
              console.log(error);
              });
      // Logic to end the trip
      console.log('Trip ended');
    },
    getRideOffers() {
      // Logic to get ride offers
      let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `http://localhost:3000/queryRideRequests?pilot_id=${this.$store.state.decodedUserDetails.user_nt_id}`,
      headers: { 
        Authorization: `${this.$store.state.token}`
      }
      };

        axios.request(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
            this.ride = response.data;
            console.log(this.ride);
        })
      .catch((error) => {
            console.log(error);
          });
      console.log('Getting ride offers...');
    },
    acceptRideRequest(user_nt_id) {
      // Logic to accept ride request
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `http://localhost:3000/acceptRide?pilot_id=${this.$store.state.decodedUserDetails.user_nt_id}&passenger_id=${user_nt_id}`,
        headers: {
          Authorization: `${this.$store.state.token}`
         }
        };

        axios.request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          })
          .catch((error) => {
          console.log(error);
          });
          console.log('Ride request accepted');
        },
    logout() {
      // Logic for logout
      console.log('Logging out...');
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
.fill-height {
  height: 100vh;
}
.max-width {
  max-width: 400px;
}
.headline {
  color: #3f51b5; /* Blue color for headline */
}
</style>
