<template>
  <!--Copyright Notice : © 2024 Comcast-->
  <v-container class="fill-height">
    <v-app-bar app dark color="primary">
      <v-toolbar-title>Welcome, {{ userName }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="logout">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Form for selecting user type and destination -->
    <v-card max-width="500px" class="mx-auto mt-4">
      <v-card-title class="headline">Role & Destination</v-card-title>
      <v-card-text>
        <v-form>
          <v-select v-model="userType" :items="userTypes" label="User Type" required></v-select>
          <v-select v-model="destination" :items="destinations" label="Destination" required></v-select>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="submit" color="primary">Submit</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      userType: '',
      destination: '',
      userTypes: ['Pilot', 'Passenger'],
      destinations: ['Home', 'Office'],
      userName: 'Kamalesh Prabakar' // Replace with actual user's name
    };
  },
  methods: {
    submit() {
      // Handle form submission, for demonstration, let's log the selections
      console.log('Selected User Type:', this.userType);
      console.log('Selected Destination:', this.destination);

      // Redirect to the appropriate page based on user type selection
      if (this.userType === 'Pilot') {
        this.$router.push('/pilot-view');
      } else if (this.userType === 'Passenger') {
        this.$router.push('/passenger-view');
      }
    },
    logout() {
      // Clear any session data or perform any other necessary cleanup
      // For demonstration purposes, let's log a message
      console.log('Logging out...');
      this.$router.push('/');

      // After performing logout actions, you can redirect to the login page
      // For example, if you're using Vue Router:
      //
    }
  }
};
</script>

<style scoped>
.fill-height {
  height: 100%;
}
</style>
