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
    <br/>
    <v-card class="mx-auto px-10 py-8" width="90%" height="700">
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="createHtlIMG"
                class="mb-2"
                clearable
                label="Hotel Image URL"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="createHtl"
                class="mb-2"
                clearable
                label="Description"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-btn 
                size="large"
                value="AddNewHotel"
                @click="createHotel()">
                <v-icon>mdi-plus-circle-outline</v-icon>
                Add Hotel
              </v-btn>
            </v-col>
          </v-row>
          <br/>
          <v-divider></v-divider>
          <br/>
          <v-virtual-scroll :items="allHtl" height="300" item-height="50">
            <template v-slot:default="{ item }">
              <v-list-item>
                <template v-slot:prepend>
                  <v-avatar
                    rounded="0"
                    :image="item.ImageURL"
                    class="text-white"
                    size="90"
                  >
                  </v-avatar>
                </template>

                <v-list-item-title>{{ item.HotelName }}</v-list-item-title>
                <template v-slot:append>
                  <v-btn size="small" variant="tonal" @click="editHotel(item)">
                    <v-icon color="orange-darken-4" end> mdi-pencil  </v-icon>&nbsp;
                    Edit
                  </v-btn>
                  &nbsp;
                  <v-btn size="small" variant="tonal" @click="deleteHotel(item)">
                    <v-icon color="orange-darken-4" end> mdi-delete-empty </v-icon>&nbsp;
                    Delete
                  </v-btn>
                </template>
              </v-list-item>
            </template>
          </v-virtual-scroll>
        </v-card>
    

    <v-overlay
      :model-value="editOverlay"
      class="align-center justify-center"
    >
      <v-card class="mx-auto px-10 py-8" width="800px" height="700">
          <v-row>
            <v-col cols="12">
              <v-card>
                <v-img
                  :src= "editHtlIMG"
                  max-height="350"
                  class="bg-grey-lighten-2"
                ></v-img>
                <v-card-title class="text-h6">
                  <v-text-field
                    v-model="editHtlIMG"
                    class="mb-2"
                    clearable
                    label="Hotel Image URL"
                  ></v-text-field>
                </v-card-title>
              </v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="editHtl"
                class="mb-2"
                clearable
                label="Hotel"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="editHtlID"
                v-show="false"
                label="id"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-btn 
                size="large"
                value="UpdateHotel"
                @click="updateHtl()">
                <v-icon>mdi-content-save</v-icon> &nbsp;
                Save
              </v-btn>
            </v-col>
          </v-row>
          <br/>
      </v-card>    
    </v-overlay>

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
      <h3>{{loadingMSG}}</h3>
    </v-overlay>
  </div>
</template>

<script>
import ItinerarysService from '@/services/ItinerarysService'

  export default {
    data: () => ({
      trips: null,
      refreshAllTrips: false,
      loadingOverlay: false,
      editOverlay: false,
      diableOverlay:true,

      createHtlIMG: "",
      createHtl: "",
      editHtlIMG: "",
      editHtl: "",
      editHtlID: "",
      allHtl: [],
      addHtlAry: [],
      showHtl: [],
      lochtlOverlay: false,
      loadingMSG: "Loading..."
    }),

    methods: {
      async getHotel(){
        await ItinerarysService.getHotels().then((response)=>{
            response.data.forEach(element => {
              this.allHtl.push(element)
            });
            this.loadingOverlay = false
        })
      },
      async createHotel(){
        if(this.createHtl != "" && this.createHtlIMG != null){
        this.loadingOverlay = true
          await ItinerarysService.addHotel({
            HotelName: this.createHtl,
            ImageURL: this.createHtlIMG
          }).then((response)=>{
            console.log("create Location: " + response)
            this.allHtl.push({
              "id" : response.data.id,
              "HotelName" : response.data.HotelName,
              "ImageURL" : response.data.ImageURL
            })
            
            this.addHtlAry.push({
              "HotelName" : this.createHtl,
              "ImageURL" : this.createHtlIMG
            })
            this.createHtl = ""
            this.createHtlIMG = ""
            
            this.loadingOverlay = false
          })
        }
          else{
            this.showSnackles("Please Fill hotel name and Hoptel image URL to continue.")
          }
      },
      editHotel(hot){
        console.log(hot)
        this.editHtl = hot.HotelName
        this.editHtlIMG = hot.ImageURL
        this.editHtlID = hot.id
        this.editOverlay = !this.editOverlay
      },
      async deleteHotel(hot){
        console.log(hot)
        this.loadingOverlay = true
        this.loadingMSG = "Deleting..."
        var deleteHot = await ItinerarysService.deleteHotel(hot.id).then(()=> {
          this.loadingOverlay = false
          this.refreshAllTrips = !this.refreshAllTrips
        })
        console.log(deleteHot)
      },
      async updateHtl(){
        console.log(this.editHtlID)
        this.loadingOverlay = true
        this.loadingMSG = "Updating..."
        var uptHtl = await ItinerarysService.updateHotel(this.editHtlID, {
          HotelName: this.editHtl,
          ImageURL: this.editHtlIMG
        }).then(() => {
          this.editOverlay = !this.editOverlay
          this.loadingOverlay = false
          this.refreshAllTrips = !this.refreshAllTrips
        })
        console.log("updated: "+ uptHtl)
      }
    },
    beforeMount() {
      this.loadingOverlay = true
      this.getHotel()
    },
    watch: {
      refreshAllTrips: function(){
        this.loadingOverlay = true
        this.allHtl = []
        this.getHotel()
      }
    }
  }
</script>
