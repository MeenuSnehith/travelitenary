<template>
  <v-sheet>
    <v-card class="mx-auto px-10 py-8" max-width="85%" color="red-lighten-4">
      <v-row>
        <v-col
          cols="12"
        >
          <p>Once trip is deleted its lost forever.</p>
        </v-col>

      </v-row>
      <v-row>
        <v-col
        cols="12"
        md="5"
        >
        </v-col>
        <v-col
          cols="12"
          md="2"
        >
          <v-btn
            block
            color="red-darken-1"
            size="large"
            variant="elevated"
            rounded="xl"
            @click="deleteTrip"
          >
            Delete Trip
          </v-btn>
        </v-col>
      </v-row>
    </v-card>

    <br/> 

    <v-card class="mx-auto px-10 py-8" max-width="85%">
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-img
              :src= "URL"
              max-height="350"
              class="bg-grey-lighten-2"
            ></v-img>
            <v-card-title class="text-h6">
              <v-text-field
                v-model="URL"
                class="mb-2"
                clearable
                label="Thumbnail URL"
              ></v-text-field>
            </v-card-title>
          </v-card>
        </v-col>
      </v-row>
      <br/>
      
      <v-row>
        <v-col
          cols="12"
          md="8"
        >
          <v-text-field
            v-model="title"
            clearable
            label="Title"
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="cost"
            label="Cost per Person (in $)"
            type="number"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          md="12"
        >
          <v-text-field
          v-model="location"
          clearable
          label="Location"
          ></v-text-field>
        </v-col>
      </v-row>
          <v-row>
            <v-col
              cols="12"
              md="2"
            >
              <v-text-field
              v-model="days"
              label="No of Days"
              type="number"
            ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="2"
            >
              <v-text-field
              v-model="nights"
              label="No of Nights"
              type="number"
            ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
              v-model="from"
              type="date"
              label="From date"
            ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
              v-model="to"
              type="date"
              label="To date"
            ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="12"
              md="12"
            >
              <v-textarea
              v-model="decription"
              class="mb-2"
              clearable
              label="Description"
            ></v-textarea>
            </v-col>

          </v-row>
          <v-row>
            <v-col
              cols="12"
              md="5"
            >
            </v-col>
            <v-col
              cols="12"
              md="2"
            >
            <v-btn
              block
              color="primary"
              size="large"
              variant="elevated"
              rounded="xl"
              @click="UpdateTripDetails"
            >
              Save
            </v-btn>
            </v-col>
          </v-row>
    </v-card>

    <br/> 

    <v-card class="mx-auto px-10 py-8" max-width="85%">
      <v-row>
        <v-col cols="12">
          <v-carousel v-model="activeImg" :key="this.tripimgs">
            <v-carousel-item
              :src="img.url"
              cover
              v-for= "img in tripimgs" v-bind:key="img"
            ></v-carousel-item>
          </v-carousel>
        </v-col>
      </v-row>
      
      <br/>
      
      <v-row>
        <v-col cols="10">
          <v-text-field
            v-model="imgURL"
            class="mb-2"
            clearable
            label="Thumbnail URL"
          ></v-text-field>
        </v-col>
        <v-col cols="1">
          <v-btn 
            size="x-large"
            value="Addnewurl"
            @click="addImg">
            <v-icon>mdi-plus-circle-outline</v-icon>
            Add
          </v-btn>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-list>
            <v-list-item
              v-for="img in tripimgs"
              :key="img"
              :title="img.url"
            >
              <template v-slot:append>
                <v-btn
                  color="red"
                  icon="mdi-minus-circle-outline"
                  variant="text"
                  @click="deleteImg(img)"
                ></v-btn>
              </template>
            </v-list-item>
        </v-list>
        </v-col>
      </v-row>

      <v-row>
            <v-col
              cols="12"
              md="5"
            >
            </v-col>
            <v-col
              cols="12"
              md="2"
            >
            <v-btn
              block
              color="primary"
              size="large"
              variant="elevated"
              rounded="xl"
              @click="UpdateImg"
            >
              Save
            </v-btn>
            </v-col>
          </v-row>
    </v-card>
    <br/> 

    <v-card class="mx-auto px-10 py-8" max-width="85%">
      <v-row>
        <v-col cols="2">
          <v-text-field
            v-model="dayIt"
            class="mb-2"
            label="Day"
            type="number"
          ></v-text-field>
        </v-col>
        <v-col cols="8">
          <v-text-field
            v-model="itenary"
            class="mb-2"
            clearable
            label="Location"
          ></v-text-field>
        </v-col>
        <v-col cols="1">
          <v-btn 
            size="x-large"
            value="AddNewItenary"
            @click="addItenary">
            <v-icon>mdi-plus-circle-outline</v-icon>
            Add
          </v-btn>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
        <v-list>
          <v-list-item
            v-for="it in itenarys"
            :key="it.day"
            :title="it.data"
          >
            <template v-slot:append>
              <v-btn
                color="red"
                icon="mdi-minus-circle-outline"
                variant="text"
                @click="deleteItenary(it)"
              ></v-btn>
            </template>
          </v-list-item>
        </v-list>


        </v-col>
      </v-row>

      <v-row>
            <v-col
              cols="12"
              md="5"
            >
            </v-col>
            <v-col
              cols="12"
              md="2"
            >
            <v-btn
              block
              color="primary"
              size="large"
              variant="elevated"
              rounded="xl"
              @click="UpdateItinerarys"
            >
              Save
            </v-btn>
            </v-col>
          </v-row>
    </v-card>
    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
    >
      {{snackbarMsg}}
    </v-snackbar>

  </v-sheet>
</template>

<script>
//import router from '../router'
import TripsService from '@/services/TripsService'
import ItinerarysService from '@/services/ItinerarysService'
import TripImagesService from '@/services/TripImagesService'

  export default {
    data: () => ({
      form: false,
      loading: false,
      snackbar: false,
      timeout: 2000,
      activeImg: 0,

      tripID: "",
      URL: "",
      title: null,
      cost: null,
      decription: null,
      to: null,
      from: null,
      nights: null,
      days: null,
      location : null,
      imgURL: "",
      tripimgs: [],
      deleteImgURLs:[],
      addImgURLs:[],
      itenary: "",
      dayIt: "",
      itenarys: [],
      deleteItenarys: [],
      addItenarys: [],
      snackbarMsg: ""
    }),

    methods: {
      addImg(){
        if(this.imgURL != ""){
          this.tripimgs.push({
                id: "",
                url: this.imgURL
              })
          this.addImgURLs.push(this.imgURL)
          this.imgURL = ""
        }
      },
      deleteImg(imgAry) {
        console.log("delete image" + imgAry.id)
        this.tripimgs.splice(this.tripimgs.indexOf(imgAry), 1);
        if(imgAry.id != ""){
          this.deleteImgURLs.push(imgAry.id)
        }
        else{
          //if no id mean its added Img so remove from addIt array
          this.addImgURLs.splice(this.addImgURLs.indexOf(imgAry), 1);
        }
        },

      addItenary(){
        if(this.dayIt != "" && this.itenary != ""){
          this.itenarys.push({
                id: "",
                day: this.dayIt,
                location: this.itenary,
                data: "Day " + this.dayIt + ": " + this.itenary
              })
          this.addItenarys.push({
                day: this.dayIt,
                location: this.itenary
              })
          this.itenary = ""
          this.dayIt = ""
        }
        else{
          this.showSnackles("Please fill day and location to add Itinerary.")
        }
      },
      deleteItenary(delItenary) {
          console.log("del click: "+ delItenary)
          this.itenarys.splice(this.itenarys.indexOf(delItenary), 1);
          if(delItenary.id != ""){
            this.deleteItenarys.push(delItenary.id)
          }
          else{
            //if no id mean its added IT so remove from addIt array
            this.addItenarys.splice(this.addItenarys.indexOf(delItenary), 1);
          }
      },

      getTripID(){
        this.tripID = this.$store.state.editTripId
        console.log("Edit trip: " + this.tripID)
      },

      async GetTripsDetails(){
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
          this.URL = this.trips.thumbnailURL
        })
        console.log("Trip Details : "+this.trips)
      },
      async GetItinerarysDetails(){
        await ItinerarysService.getItinerarys({
            tripID: this.tripID
          }).then((response)=>{
            console.log("Itinerary" + response)
            response.data.forEach(element => {
              console.log(element)
              this.itenarys.push({
                id: element.id,
                day: element.day,
                location: element.location,
                data: "Day " + element.day + ": " + element.location
              })
            });
        })
      },
      async GetTripImagesDetails(){
        await TripImagesService.getTripImages({
            tripID: this.tripID
          }).then((response)=>{
            console.log("Trip imgs: "+response)
            response.data.forEach(element => {
              console.log(element)
              this.tripimgs.push({
                id: element.id,
                url: element.ImageURL
              })
            });
            console.log("img after push: "+this.tripimgs)
        })

      },
      async UpdateTripDetails(){
          await TripsService.UpdateTrip({
            id: this.tripID,
            tripTitle: this.title,
            location: this.location,
            days: this.days,
            nights: this.nights,
            costperperson: this.cost,
            fromdate: this.from,
            todate: this.to,
            description: this.decription,
            thumbnailURL: this.URL 
          }).then((response)=>{
            console.log("Itinerary" + response)
            response.data.forEach(element => {
              console.log(element)
              this.showSnackles("Trip details updated succesfully.")
            });
        })
      },
      UpdateItinerarys(){
        //delete IT
        this.deleteItenarys.forEach(element => {
          this.delItinerary(element)
        });
        //add IT
        this.addItenarys.forEach(element => {
          this.addItinerary(element)
        });
      },
      async delItinerary(ItId){
        await ItinerarysService.deleteItinerarys({
            id: ItId
          }).then((response)=>{
            console.log("Itinerary" + response)
            this.showSnackles("Itinerary(s) DELETED succesfully.")
        })
      },
      async addItinerary(itObj){
        await ItinerarysService.addItinerary({
            day: itObj.day,
            location: itObj.location,
            tripID: this.tripID
          }).then((response)=>{
            console.log("Itinerary" + response)
            this.showSnackles("Itinerary details updated succesfully.")
        })
      },
      UpdateImg(){
        console.log("del ary: "+this.deleteImgURLs)
        this.deleteImgURLs.forEach(element => {
          console.log(element)
          this.delTripImg(element)
        });
        this.addImgURLs.forEach(elementadd => {
          console.log("add: "+elementadd)
          this.addTripImg(elementadd)
        });
      },
      async delTripImg(ImgId){
        console.log("add: "+ImgId)
        await TripImagesService.deleteTripImages({
            id: ImgId
          }).then((response)=>{
            console.log("TripIMG" + response)
            this.showSnackles("Trip image(s) DELETED succesfully.")
        })
      },
      async addTripImg(imgURL){
        console.log(imgURL)
        await TripImagesService.addTripImages({
            ImageURL: imgURL,
            tripID: this.tripID
          }).then((response)=>{
            console.log("TripIMG" + response)
            this.showSnackles("Trip images updated succesfully.")
        })
      },
      showSnackles(message){
        this.snackbarMsg = message
        this.snackbar = true
      }
    },
    watch: {
    
    },
    beforeMount() {
      this.getTripID()
      this.GetTripsDetails()
      this.GetItinerarysDetails()
      this.GetTripImagesDetails()
    }
  }
</script>
