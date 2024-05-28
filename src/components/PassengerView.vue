<template>
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
        <v-list-item @click="toggleDetails(offer.id)">
          <v-list-item-content>
            <v-list-item-title>{{ offer.from }} to {{ offer.to }}</v-list-item-title>
            <v-list-item-subtitle>
              <v-icon class="mr-1">mdi-map-marker</v-icon>
              <span>{{ offer.location }}</span>
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-icon>{{ detailsVisible[offer.id] ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
          </v-list-item-action>
        </v-list-item>
        <v-divider v-if="detailsVisible[offer.id]"></v-divider>
        <v-list-item v-if="detailsVisible[offer.id]">
          <v-list-item-content>
            <v-list-item-subtitle>
              <v-icon class="mr-1">mdi-account</v-icon>
              <span>{{ offer.name }}</span>
            </v-list-item-subtitle>
            <v-list-item-subtitle>
              <v-icon class="mr-1">mdi-phone</v-icon>
              <span>{{ offer.contactNumber }}</span>
            </v-list-item-subtitle>
            <v-list-item-subtitle>
              <v-icon class="mr-1">mdi-car-info</v-icon>
              <span>{{ offer.vehicleType }}</span>
            </v-list-item-subtitle>
            <v-list-item-subtitle>
              <v-icon class="mr-1">mdi-car</v-icon>
              <span>{{ offer.vehicleNumber }}</span>
            </v-list-item-subtitle>
            <v-list-item-subtitle>
              <v-icon class="mr-1">mdi-seat</v-icon>
              <span>{{ offer.seats }}</span>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      rideOffers: [
        {
          id: 1,
          from: 'Home',
          to: 'Chennai One IT SEZ',
          location: 'Chennai One IT SEZ',
          contactNumber: '+91 8838682284',
          name: 'John Doe',
          vehicleType: 'Toyota Innova Crysta',
          vehicleNumber: 'TN12 AZ 3434',
          seats: 4
        },
        {
          id: 2,
          from: 'Office',
          to: 'Marina Beach',
          location: 'Chennai Marina Beach',
          contactNumber: '+91 9876543210',
          name: 'Jane Doe',
          vehicleType: 'Honda City',
          vehicleNumber: 'TN34 XY 5678',
          seats: 3
        },
        {
          id: 3,
          from: 'Home',
          to: 'Guindy',
          location: 'Guindy Industrial Estate',
          contactNumber: '+91 8765432109',
          name: 'Alice Smith',
          vehicleType: 'Maruti Suzuki Swift',
          vehicleNumber: 'TN56 ZY 2345',
          seats: 4
        },
        {
          id: 4,
          from: 'Home',
          to: 'OMR',
          location: 'OMR',
          contactNumber: '+91 7654321098',
          name: 'Bob Johnson',
          vehicleType: 'Hyundai Creta',
          vehicleNumber: 'TN78 GH 3456',
          seats: 4
        },
        {
          id: 5,
          from: 'Home',
          to: 'T Nagar',
          location: 'T Nagar',
          contactNumber: '+91 6543210987',
          name: 'Charlie Brown',
          vehicleType: 'Ford EcoSport',
          vehicleNumber: 'TN90 JK 4567',
          seats: 4
        },
        {
          id: 6,
          from: 'Home',
          to: 'Velachery',
          location: 'Velachery',
          contactNumber: '+91 5432109876',
          name: 'David Wilson',
          vehicleType: 'Honda Civic',
          vehicleNumber: 'TN12 LM 5678',
          seats: 4
        },
        {
          id: 7,
          from: 'Home',
          to: 'Adyar',
          location: 'Adyar',
          contactNumber: '+91 4321098765',
          name: 'Eve Davis',
          vehicleType: 'Toyota Fortuner',
          vehicleNumber: 'TN34 NO 6789',
          seats: 4
        },
        {
          id: 8,
          from: 'Home',
          to: 'Nungambakkam',
          location: 'Nungambakkam',
          contactNumber: '+91 3210987654',
          name: 'Frank Miller',
          vehicleType: 'Skoda Octavia',
          vehicleNumber: 'TN56 PQ 7890',
          seats: 4
        }
      ],
      detailsVisible: {} // Object to track details visibility for each offer
    };
  },
  mounted() {
    // Initialize detailsVisible object with false for each offer
    this.rideOffers.forEach(offer => {
      this.$set(this.detailsVisible, offer.id, false);
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
