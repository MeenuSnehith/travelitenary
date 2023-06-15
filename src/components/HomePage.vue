<template>
  <v-card>
    <v-tabs
      v-model="tab"
      color="deep-purple-accent-4"
      align-tabs="start"
    >
      <v-tab :value="1">All Trips</v-tab>
      <v-tab :value="2" v-show="this.$store.state.isUserLoggedIn && this.$store.state.permission != 'Admin'">My Trip</v-tab>
      <v-tab :value="3" v-show="this.$store.state.permission == 'Admin'">Add Trip</v-tab>
      <v-tab :value="4" v-show="this.$store.state.permission == 'Admin'">Locations</v-tab>
      <v-tab :value="5" v-show="this.$store.state.permission == 'Admin'">Hotels</v-tab>
      <v-tab :value="6">Notifications</v-tab>
    </v-tabs>
    <v-window v-model="tab">
      <v-window-item
        :key="1"
        :value="1"
      >
        <AllTrips/>
      </v-window-item>
      <v-window-item
        :key="2"
        :value="2"
      >
        <MyTrips/>
      </v-window-item>
      <v-window-item
        :key="3"
        :value="3"
      >
        <AddTrip/>
      </v-window-item>
      <v-window-item
        :key="4"
        :value="4"
      >
        <AllLocations/>
      </v-window-item>
      <v-window-item
        :key="5"
        :value="5"
      >
        <AllHotels/>
      </v-window-item>
      <v-window-item
        :key="6"
        :value="6"
      >
        <AllNotifications/>
      </v-window-item>
    </v-window>
  </v-card>
</template>

<script>
import AddTrip from './AddTrip.vue'
import AllTrips from './AllTrips.vue'
import MyTrips from './MyTrips.vue'
import AllLocations from './AllLocations.vue'
import AllHotels from './AllHotels.vue'
import AllNotifications from './AllNotifications.vue'

  export default {
    components: { AddTrip, MyTrips,  AllTrips, AllLocations, AllHotels, AllNotifications},
    data: () => ({
      tab: null,
    }),

    methods: {
      
    },
  }
</script>
