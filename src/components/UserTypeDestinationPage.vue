<template>
  <v-container class="fill-height d-flex justify-center align-center">
    <v-card max-width="500px">
      <v-card-title class="headline">User Type & Destination</v-card-title>
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
      destinations: ['Home', 'Office']
    };
  },
  methods: {
    submit() {
      // Handle form submission, for demonstration, let's log the selections
      console.log('Selected User Type:', this.userType);
      console.log('Selected Destination:', this.destination);
    }
  }
};
</script>
