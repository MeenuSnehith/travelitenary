<template>
  <v-sheet>
    <v-card class="mx-auto px-10 py-8" max-width="85%">
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-img
              :src= "thumbnailURL"
              max-height="350"
              class="bg-grey-lighten-2"
            ></v-img>
            <v-card-title class="text-h6">
              {{title}}
            </v-card-title>
            <v-card-actions>
              <v-btn
                color="teal-accent-4"
                variant="elevated"
                rounded="xl"
                v-show="this.$store.state.isUserLoggedIn && this.$store.state.permission != 'Admin' && !joined"
                @click="joinTrip"
              >
                Join Trip
              </v-btn>
              <v-btn
                color="teal-accent-4"
                variant="elevated"
                rounded="xl"
                v-show="this.$store.state.isUserLoggedIn && this.$store.state.permission != 'Admin' && joined"
              >
                Joined
              </v-btn>
              <v-btn
                color="teal-accent-4"
                variant="elevated"
                rounded="xl"
                v-show="this.$store.state.permission == 'Admin'"
                @click="editTrip"
              >
                Edit Trip
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <br/>
      
      <v-row>
        <v-col
          cols="12"
          md="12"
        >
          <h3>Location: </h3>
          <p>{{location}}</p>
        </v-col>
      </v-row>

      <v-row>
        <v-col
          cols="12"
          md="12"
        >
          <h3>Cost per person: </h3>
          <p>{{cost}} $</p>
        </v-col>
        
      </v-row>

      <v-row>
        <v-col
          cols="12"
          md="2"
        >
          <h3>Days: </h3>
          <p>{{days}}</p>
        </v-col>
        <v-col
          cols="12"
          md="2"
        >
          <h3>Nights: </h3>
          <p>{{nights}}</p>
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <h3>From: </h3>
          <p>{{from}}</p>
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <h3>To: </h3>
          <p>{{to}}</p>
        </v-col>
      </v-row>
      <br/>
      <v-divider></v-divider>
      <br/>
      <v-row>
        <v-col cols="12">
          <v-carousel v-model="activeImg" :key="this.tripimgs">
            <v-carousel-item
              :src="img"
              cover
              v-for= "img in tripimgs" v-bind:key="img"
            ></v-carousel-item>
          </v-carousel>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <h3>Description</h3>
          <p>{{decription}}</p>
        </v-col>
      </v-row>

      <br/>
      <v-divider></v-divider>
      <br/>

      <v-row>
        <v-col cols="12">
          <h3>Detailed Plan</h3>
          
          <v-timeline side="end">
            <v-timeline-item
              v-for= "item in itenarys"
              v-bind:key= "item"
              size="small"
            >
              <v-alert
                :value="true"
                width="500"
              >
                <v-row>
                  <v-col cols="2">
                    <h4>Day:&nbsp;{{item.day}}</h4>
                  </v-col>
                  <v-col cols="6">
                    <h4>{{item.activity}}</h4>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="2"></v-col>
                  <v-col cols="6">
                    <h4>Location:</h4><p>{{item.location}}</p>
                    <img :src="item.locationIMG" width="150" height="100">
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="2"></v-col>
                  <v-col cols="6">
                    <h4>Hotel:</h4><p>{{item.hotelName}}</p>
                    <img :src="item.hotelIMG" width="150" height="100">
                  </v-col>
                </v-row>
              </v-alert>
            </v-timeline-item>
          </v-timeline>
        </v-col>
      </v-row>

    </v-card>

    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
    >
      
    </v-snackbar>
    <v-overlay
      :model-value="loadingOverlay"
      class="align-center justify-center"
      :persistent="diableOverlay"
    >
      <v-progress-circular
        color="primary"
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
  </v-sheet>
  
</template>

<script>
import TripsService from '@/services/TripsService'
import ItinerarysService from '@/services/ItinerarysService'
import TripImagesService from '@/services/TripImagesService'
import JoinTripsService from '@/services/JoinTripsService'
import router from '../router'

  export default {
    data: () => ({
      loadingOverlay: false,
      diableOverlay:true,
      getTripDetailsCount: 0,

      thumbnailURL: "",
      title: "",
      cost: null,
      decription: "",
      to: null,
      from: null,
      nights: null,
      days: null,
      location: null,
      tripimgs: [],
      itenarys: [],
      tripID: "",
      activeImg: 0,
      joined: false,
      username: ""
    }),

    methods: {
      async GetTripsDetails(){
        console.log("get trip: "+this.tripid)
        await TripsService.getTrip({
            tripID: this.tripID
          }).then((response)=>{
          this.trips = response.data
          this.title = this.trips.tripTitle
          this.location = this.trips.location
          this.cost = this.trips.costperperson
          this.days = this.trips.days
          this.nights = this.trips.nights
          this.decription = this.trips.description
          this.from = this.trips.fromdate
          this.to = this.trips.todate
          this.thumbnailURL = this.trips.thumbnailURL

          this.getTripDetailsCount = this.getTripDetailsCount + 1
        })
        console.log(this.trips)
      },
      getTripID(){
        this.tripID = this.$store.state.viewTripId
        this.username = this.$store.state.username
        console.log("view trip: " + this.tripID)
      },
      async GetItinerarysDetails(){
        await ItinerarysService.getItinerarys({
            tripID: this.tripID
          }).then((response)=>{
            console.log(response)
            response.data.forEach(element => {
              console.log(element)
              this.itenarys.push({
                day: element.day,
                activity: element.activity,
                location: element.location,
                locationIMG: element.locationIMG,
                hotelName: element.hotelName,
                hotelIMG: element.hotelIMG
              })
            });
          this.getTripDetailsCount = this.getTripDetailsCount + 1
        })
      },
      async GetTripImagesDetails(){
        await TripImagesService.getTripImages({
            tripID: this.tripID
          }).then((response)=>{
            console.log(response)
            response.data.forEach(element => {
              console.log(element)
              this.tripimgs.push(element.ImageURL)
            });
          this.getTripDetailsCount = this.getTripDetailsCount + 1
        })
      },
      editTrip(){
        this.$store.commit('setviewTripId', this.tripID)
        this.$store.commit('seteditTripId', this.tripID)
        router.push("/updatetrip")
      },
      async joinTrip(){
        console.log("Join trip")
        console.log(this.username)
        console.log(this.tripID)
        if(this.username != "" && this.tripID != ""){
          await JoinTripsService.addJoinedTrip({
            userID: this.username,
            tripID: this.tripID
          }).then((response)=>{
            console.log(response)
            this.joined = true
          })
        }
      },
      async checkTripJoined(){
        console.log("Check Join trip")
        if(this.username != "" && this.tripID != ""){
          await JoinTripsService.checkIsJoinedTrips({
            userID: this.username,
            tripID: this.tripID
          }).then((response)=>{
            console.log(response)
            this.joined = response.data.joined
          })
        }
      }
    },
    watch: {
      getTripDetailsCount: function(){
        console.log("loading count: "+ this.getTripDetailsCount)
        if(this.getTripDetailsCount >= 3){
          this.loadingOverlay = false
        }
      }
    },
    beforeMount() {
      this.loadingOverlay = true
      this.getTripID()
      this.checkTripJoined()
      this.GetTripsDetails()
      this.GetItinerarysDetails()
      this.GetTripImagesDetails()
    }
  }
</script>
