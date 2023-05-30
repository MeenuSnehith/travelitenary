<template>
  <v-card>
    <v-tabs
      v-model="tab"
      color="deep-purple-accent-4"
      align-tabs="start"
    >
      <v-tab :value="1">All Trips</v-tab>
      <v-tab :value="2" v-show="this.$store.state.permission == 'Admin'">Add Trip</v-tab>
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
        <AddTrip/>
      </v-window-item>
    </v-window>
  </v-card>
</template>

<script>
import AddTrip from './AddTrip.vue'
import AllTrips from './AllTrips.vue'

  export default {
    components: { AddTrip,  AllTrips},
    data: () => ({
      tab: null,
    }),

    methods: {
      
    },
  }
</script>
