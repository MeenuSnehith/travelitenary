<template>
<div :key="trips">
  <v-row class="text-right"> 
    <v-col col="12" mb="2">
      <v-btn
        prepend-icon="mdi-account-circle"
        @click="refreshAllTrips = !refreshAllTrips"
      >
        <template v-slot:prepend>
          <v-icon color="primary">mdi-refresh</v-icon>
        </template>
          Refresh
        </v-btn>
    </v-col>
  </v-row>
  
  <div class="d-flex align-center flex-column"  v-for="trip in trips" v-bind:key="trip.id">
    <br/>
    <v-card width="60%">
      <v-img
        :src="trip.thumbnailURL"
        height="200px"
        cover
      ></v-img>
      <v-card-item>
        <v-card-title>{{trip.tripTitle}}</v-card-title>

        <v-card-subtitle>Location: {{trip.location}}</v-card-subtitle>
      </v-card-item>

      <v-card-text>
        {{trip.description}}
        <p>
          Days: {{trip.days}} --- Nights: {{trip.nights}} ---- from: {{trip.fromdate}} - to: {{trip.todate}}
        </p>
      </v-card-text>
      <v-card-actions>
        <v-btn class="ms-2" variant="outlined" size="small" @click="openTrip(trip.id)">
          View Trip
        </v-btn>
      </v-card-actions>
    </v-card>
    <br/>
  </div>
  </div>
</template>

<script>
import TripsService from '@/services/TripsService'
import router from '../router'

  export default {
    data: () => ({
      trips: null,
      refreshAllTrips: false
    }),

    methods: {
      async GetAllTrips(){
        await TripsService.getAllTrips().then((response)=>{
          this.trips = response.data
        })
        console.log(this.trips)
      },
      openTrip(tripid){
        this.$store.commit('setviewTripId', tripid)
        router.push("/viewtrip")
      }
    },
    beforeMount() {
      this.GetAllTrips()
    },
    watch: {
      refreshAllTrips: function(){
        this.trips = []
        console.log(this.refreshAllTrips)
        this.GetAllTrips()
      }
    }
  }
</script>
