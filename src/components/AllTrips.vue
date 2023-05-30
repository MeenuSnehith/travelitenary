<template>
<div>
  <div class="d-flex align-center flex-column"  v-for="trip in trips" v-bind:key="trip.id">
    <br/>
    <v-card width="80%">
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
    </v-card>
    <br/>
  </div>
  </div>
</template>

<script>
import TripsService from '@/services/TripsService'

  export default {
    data: () => ({
      trips: null,

    }),

    methods: {
      async GetAllTrips(){
        await TripsService.getAllTrips().then((response)=>{
          this.trips = response.data
        })
        console.log(this.trips)
      }
    },
    beforeMount() {
      this.GetAllTrips()
    },
  }
</script>
