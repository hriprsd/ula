<template>
  <!--Copyright Notice : © 2024 Comcast-->
  <v-container class="">
    <!-- Vuetify app bar -->
    <v-app-bar app dark color="primary">
      <v-toolbar-title>Passenger's Dashboard</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="logout">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Card content -->
    <v-card class="mt-8" width="95vw">
      <v-card-title class="headline">Ride Offers</v-card-title>
      <v-divider></v-divider>
      <!-- Displaying multiple ride offers -->
      <div v-if="rideOffers.length === 0">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-subtitle>
              <span>No ride offers available</span>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </div>
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
          <v-btn :color="btnColor" @click="requestRide(offer.user_nt_id)">{{btnText}}</v-btn>
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
      btnText: 'Request Ride',
      detailsVisible: {},
      btnColor:"primary" // Object to track details visibility for each offer
    };
  },
  mounted() {
    this.getAvailableRides();
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
              console.log('Ride requested successfully');
              this.btnText = 'Request sent';
              setInterval(() => {
                this.isRideRequestAccepted();
              }, 10000);
          })
          .catch((error) => {
              console.log(error);
            });
            },
    getAvailableRides() {
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
        }
        ,
      isRideRequestAccepted() {
        let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: 'http://localhost:3000/isRideRequestAccepted',
                headers: { 
                  Authorization: `${this.$store.state.token}`
                }
            };

                axios.request(config)
                    .then((response) => {
                console.log(JSON.stringify(response.data));
                  this.btnText = 'Request accepted';
                  this.btnColor = "success";
                  this.rideRequestAcceptSeen();
                    })
                .catch((error) => {
                console.log(error);
                });
        },
        rideRequestAcceptSeen(){
          let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: 'http://localhost:3000/rideRequestAcceptSeen',
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
