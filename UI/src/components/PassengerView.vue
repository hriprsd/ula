<template>
  <!--Copyright Notice : © 2024 Comcast-->
  <v-container class="fill-height">
    <!-- Vuetify app bar -->
    <v-app-bar app dark color="primary">
      <v-toolbar-title>Passenger's Dashboard</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="logout">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Card content -->
    <v-card class="max-width mt-8">
      <v-card-title class="headline">Ride Offers</v-card-title>
      <v-divider></v-divider>
      <!-- Displaying multiple ride offers -->
      <v-card v-for="offer in rideOffers" :key="offer.id" class="mb-4">
        <v-list-item >
          <v-list-item-action>
            </v-list-item-action>
          <v-list-item-content>
            <v-list-item-subtitle>
              <v-icon class="mr-1">mdi-account</v-icon>
              <span>{{ offer.user_name }}</span>
            </v-list-item-subtitle>
            <v-list-item-subtitle>
              <v-icon class="mr-1">mdi-phone</v-icon>
              <span>{{ offer.mobile_number }}</span>
            </v-list-item-subtitle>
            <v-list-item-subtitle>
              <v-icon class="mr-1">mdi-car</v-icon>
              <span>{{ offer.vehicle_number }}</span>
            </v-list-item-subtitle>
            <v-list-item-subtitle>
              <v-icon class="mr-1">mdi-car-info</v-icon>
              <span>{{ offer.model }}</span>
            </v-list-item-subtitle>
            <v-list-item-subtitle>
              <v-icon class="mr-1">mdi-seat</v-icon>
              <span>{{ offer.available_seats }}</span>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-card-actions>
          <v-btn color="primary" outlined text @click="requestRide(offer.user_nt_id)">Request Ride</v-btn>
        </v-card-actions>
      </v-card>
    </v-card>
  </v-container>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      rideOffers: [
        
      ],
      detailsVisible: {} // Object to track details visibility for each offer
    };
  },
  mounted() {
    // Initialize detailsVisible object with false for each offer
    let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: 'http://localhost:3000/getAvailableRides?trip_type=1',
                headers: { 
                  Authorization: `${this.$store.state.token}`
                }
            };

                axios.request(config)
                    .then((response) => {
                console.log(JSON.stringify(response.data));
                this.rideOffers = response.data;
                    })
                .catch((error) => {
                console.log(error);
                });
  },
  methods: {
    toggleDetails(offerId) {
      // Toggle details visibility for the clicked offer
      this.$set(this.detailsVisible, offerId, !this.detailsVisible[offerId]);
    },
    logout() {
      // Logic for logout
      console.log('Logging out...');
      this.$router.push('/');
    },
    requestRide(userNtid) {
      // Logic to request a ride
      console.log('Requesting ride...');
      let data = JSON.stringify({
            "pilot_id": userNtid,
            "user_nt_id": this.$store.state.decodedUserDetails.user_nt_id
            });

            let config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: 'http://localhost:3000/requestRide',
          headers: { 
          'Content-Type': 'application/json',
          Authorization: `${this.$store.state.token}`
          },
          data : data
            };

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});
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
.mt-8 {
  margin-top: 64px;
}
</style>
