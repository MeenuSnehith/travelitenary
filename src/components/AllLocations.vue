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
            <v-col cols="6">
              <v-text-field
                v-model="createLocIMG"
                class="mb-2"
                clearable
                label="Location Image URL"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="createLoc"
                class="mb-2"
                clearable
                label="Location"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="createLocDes"
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
                value="AddNewLocation"
                @click="createLocation()">
                <v-icon>mdi-plus-circle-outline</v-icon>
                Add Location
              </v-btn>
            </v-col>
          </v-row>
          <br/>
          <v-divider></v-divider>
          <br/>
          <v-virtual-scroll :items="allLoc" height="300" item-height="50">
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

                <v-list-item-title>{{ item.Address }}</v-list-item-title>
                <v-list-item-subtitle>{{ item.Description }}</v-list-item-subtitle>
                <template v-slot:append>
                  <v-btn size="small" variant="tonal" @click="editLocation(item)">
                    <v-icon color="orange-darken-4" end> mdi-pencil  </v-icon>&nbsp;
                    Edit
                  </v-btn>
                  &nbsp;
                  <v-btn size="small" variant="tonal" @click="deleteLocation(item)">
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
      <v-card class="mx-auto px-10 py-8" width="800px" height="800">
          <v-row>
            <v-col cols="12">
              <v-card>
                <v-img
                  :src= "editLocIMG"
                  max-height="350"
                  class="bg-grey-lighten-2"
                ></v-img>
                <v-card-title class="text-h6">
                  <v-text-field
                    v-model="editLocIMG"
                    class="mb-2"
                    clearable
                    label="Location Image URL"
                  ></v-text-field>
                </v-card-title>
              </v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="editLoc"
                class="mb-2"
                clearable
                label="Location"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-textarea
                v-model="editLocDes"
                class="mb-2"
                clearable
                label="Description"
              ></v-textarea>
              <v-text-field
                v-model="editLocID"
                v-show="false"
                label="id"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-btn 
                size="large"
                value="UpdateLocation"
                @click="updateLocation()">
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

      createLocIMG: "",
      createLoc: "",
      createLocDes: "",
      editLocIMG: "",
      editLoc: "",
      editLocDes: "",
      editLocID: "",
      allLoc: [],
      addLocAry: [],
      showLoc: [],
      lochtlOverlay: false,
      loadingMSG: "Loading..."
    }),

    methods: {
      async getLocation(){
        await ItinerarysService.getLocation().then((response)=>{
            response.data.forEach(element => {
              this.allLoc.push(element)
            });
            this.loadingOverlay = false
        })
      },
      async createLocation(){
        if(this.createLoc != "" && this.createLocIMG != null){
        this.loadingOverlay = true
          await ItinerarysService.addLocation({
            Address: this.createLoc,
            Description: this.createLocDes,
            ImageURL: this.createLocIMG
          }).then((response)=>{
            console.log("create Location: " + response)
            this.allLoc.push({
              "id" : response.data.id,
              "Address" : response.data.Address,
              "Description" : response.data.Description,
              "ImageURL" : response.data.ImageURL
            })
            
            this.addLocAry.push({
              "Address" : this.createLoc,
              "Description" : this.createLocDes,
              "ImageURL" : this.createLocIMG
            })
            this.createLoc = ""
            this.createLocDes = ""
            this.createLocIMG = ""
            
            this.loadingOverlay = false
          })
        }
          else{
            this.showSnackles("Please Fill Location and Location image URL to continue.")
          }
      },
      editLocation(loc){
        console.log(loc)
        this.editLoc = loc.Address
        this.editLocDes = loc.Description
        this.editLocIMG = loc.ImageURL
        this.editLocID = loc.id
        this.editOverlay = !this.editOverlay
      },
      async deleteLocation(loc){
        console.log(loc)
        this.loadingOverlay = true
        this.loadingMSG = "Deleting..."
        var deleteLoc = await ItinerarysService.deleteLocation(loc.id).then(()=> {
          this.loadingOverlay = false
          this.refreshAllTrips = !this.refreshAllTrips
        })
        console.log(deleteLoc)
      },
      async updateLocation(){
        console.log(this.editLocID)
        this.loadingOverlay = true
        this.loadingMSG = "Updating..."
        var uptLoc = await ItinerarysService.updateLocation(this.editLocID, {
          Address: this.editLoc,
          Description: this.editLocDes,
          ImageURL: this.editLocIMG
        }).then(() => {
          this.editOverlay = !this.editOverlay
          this.loadingOverlay = false
          this.refreshAllTrips = !this.refreshAllTrips
        })
        console.log("updated: "+ uptLoc)
      }
    },
    beforeMount() {
      this.loadingOverlay = true
      this.getLocation()
    },
    watch: {
      refreshAllTrips: function(){
        this.loadingOverlay = true
        this.allLoc = []
        this.getLocation()
      }
    }
  }
</script>
