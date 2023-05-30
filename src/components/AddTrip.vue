<template>
  <v-sheet>
    <v-card class="mx-auto px-6 py-8" max-width="100%">
      <v-form
        v-model="form"
        @submit.prevent="onSubmit"
      >
      <h4 class="text-center">Please fill Trip details</h4>
        <v-container>
          <v-row>
            <v-col
              cols="12"
              md="8"
            >
              <v-text-field
              v-model="title"
              :readonly="loading"
              :rules="[required]"
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
              :readonly="loading"
              :rules="[required]"
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
              :readonly="loading"
              :rules="[required]"
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
              :readonly="loading"
              :rules="[required]"
              clearable
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
              :readonly="loading"
              :rules="[required]"
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
              :readonly="loading"
              :rules="[required]"
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
              :readonly="loading"
              :rules="[required]"
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
              :readonly="loading"
              :rules="[required]"
              class="mb-2"
              clearable
              label="Description"
            ></v-textarea>
            </v-col>

          </v-row>

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
                    :readonly="loading"
                    class="mb-2"
                    clearable
                    label="Thumbnail URL"
                  ></v-text-field>
                </v-card-title>
              </v-card>
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
              :disabled="!form"
              :loading="loading"
              block
              color="primary"
              size="large"
              type="submit"
              variant="elevated"
              rounded="xl"
              @click="addNewTrip"
            >
              Add
            </v-btn>
            </v-col>
          </v-row>
        </v-container>
        
        <br/>

        
      </v-form>
    </v-card>

    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
    >
      Registeration Success. Please wait while redirecting...
    </v-snackbar>


    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
    >
      Trip added Successfully.
    </v-snackbar>
  </v-sheet>
</template>

<script>
import TripsService from '@/services/TripsService'
import router from '../router'

  export default {
    data: () => ({
      form: false,

      title: null,
      cost: null,
      decription: null,
      to: null,
      from: null,
      nights: null,
      days: null,
      location: null,
      URL: "",
      loading: false,

      snackbar: false,
      timeout: 2000,
    }),

    methods: {
      onSubmit () {
        if (!this.form) return

        this.loading = true

        setTimeout(() => (this.loading = false), 2000)
      },
      required (v) {
        return !!v || 'Field is required'
      },
      async addNewTrip(){
        try{
          await TripsService.addTrip({
              tripTitle: this.title,
              location: this.location,
              days: this.days,
              nights: this.nights,
              costperperson: this.cost,
              fromdate: this.from,
              todate: this.to,
              description: this.decription,
              thumbnailURL: this.URL
          }).then((response)=> {
                console.log(response)
                if(response.statusText == "OK"){
                  this.$store.commit('seteditTripId', response.data.id)
                  this.clearFields()
                  this.snackbar = true
                  setTimeout(() => (router.push('/updatetrip')), 1000)
                }
              }
          )
        }
        catch(err){
          console.log(err)
          console.log(err.response.data.error)
          this.showError(err.response.data.error)
        }
      },
      clearFields(){
        this.title = ""
        this.location = ""
        this.days = ""
        this.nights = ""
        this.cost = ""
        this.from = ""
        this.to = ""
        this.decription = ""
      }
    },
    watch: {
    
    }
  }
</script>
