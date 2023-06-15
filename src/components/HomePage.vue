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
    </v-window>
  </v-card>
</template>

<script>
import AddTrip from './AddTrip.vue'
import AllTrips from './AllTrips.vue'
import MyTrips from './MyTrips.vue'

  export default {
    components: { AddTrip, MyTrips,  AllTrips},
    data: () => ({
      tab: null,
    }),

    methods: {
      
    },
  }
</script>
