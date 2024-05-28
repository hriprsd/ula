<template>
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
    <v-card class="max-width mt-8"> <!-- Adjusted margin-top -->
      <v-card-title class="headline">Details</v-card-title>
      <v-divider></v-divider>
      <v-list-item @click="toggleDetails">
        <v-list-item-content>
          <v-list-item-title>{{ ride.from }} to {{ ride.to }}</v-list-item-title>
          <v-list-item-subtitle>
            <v-icon class="mr-1">mdi-map-marker</v-icon>
            <span>{{ ride.location }}</span>
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-icon>{{ detailsVisible ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
        </v-list-item-action>
      </v-list-item>
      <v-divider v-if="detailsVisible"></v-divider>
      <v-list-item v-if="detailsVisible">
        <v-list-item-content>
          <v-list-item-subtitle>
            <v-icon class="mr-1">mdi-account</v-icon>
            <span>{{ ride.name }}</span>
          </v-list-item-subtitle>
          <v-list-item-subtitle>
            <v-icon class="mr-1">mdi-phone</v-icon>
            <span>{{ ride.contactNumber }}</span>
          </v-list-item-subtitle>
          <v-list-item-subtitle>
            <v-icon class="mr-1">mdi-car-info</v-icon>
            <span>{{ ride.vehicleType }}</span>
          </v-list-item-subtitle>
          <v-list-item-subtitle>
            <v-icon class="mr-1">mdi-car</v-icon>
            <span>{{ ride.vehicleNumber }}</span>
          </v-list-item-subtitle>
          <v-list-item-subtitle>
            <v-icon class="mr-1">mdi-seat</v-icon>
            <span>{{ ride.seats }}</span>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-btn color="red" class="mt-4" @click="endTrip">End Trip</v-btn>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      ride: {
        from: 'Pondychery',
        to: 'Chennai One IT SEZ',
        location: 'Chennai One IT SEZ',
        contactNumber: '+91 8838682284',
        name: 'Elumalai Vasan',
        vehicleType: 'Toyota Innova Crysta',
        vehicleNumber: 'TN12 AZ 3434',
        seats: 4
      },
      detailsVisible: false
    };
  },
  methods: {
    toggleDetails() {
      this.detailsVisible = !this.detailsVisible;
    },
    endTrip() {
      // Logic to end the trip
      console.log('Trip ended');
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
