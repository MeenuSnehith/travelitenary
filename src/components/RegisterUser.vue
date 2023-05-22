<template>
  <v-sheet class="pa-12" rounded>
    <h1 class="text-center">Register</h1>
    <br/>
    <v-card class="mx-auto px-6 py-8" max-width="344">
      <v-form
        v-model="form"
        @submit.prevent="onSubmit"
      >
        <v-text-field
          v-model="email"
          :readonly="loading"
          :rules="[required]"
          class="mb-2"
          clearable
          label="Email"
        ></v-text-field>

        <v-text-field
          v-model="password"
          :readonly="loading"
          :rules="[required]"
          clearable
          label="Password"
          placeholder="Enter your password"
          onch
        ></v-text-field>

        <v-text-field
          v-model="passwordConfirm"
          :readonly="loading"
          :rules="[required]"
          clearable
          label="Confirm Password"
          placeholder="Enter your password"
        ></v-text-field>

        <v-alert
          variant="outlined"
          type="warning"
          prominent
          border="top"
          value="passwordAlert"
          v-show="showAlert"
        >
          {{alertMessage}}
        </v-alert>
        
        <br/>

        <v-btn
          :disabled="!form"
          :loading="loading"
          block
          color="primary"
          size="large"
          type="submit"
          variant="elevated"
          rounded="xl"
          @click="registerClick"
        >
          Register
        </v-btn>
        <br/>
        <v-btn
          block
          color="primary"
          size="small"
          variant="plain"
          rounded="xl"
          to= "/"
        >
          Go to Home
        </v-btn>

      </v-form>
    </v-card>

    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
    >
      Registeration Success. Please wait while redirecting...
    </v-snackbar>

  </v-sheet>
</template>

<script>
import router from '../router'

  export default {
    data: () => ({
      form: false,
      email: null,
      password: null,
      passwordConfirm: null,
      loading: false,
      showAlert: false,
      alertMessage: "",
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
      registerClick(){
        this.snackbar = true;
        setTimeout(() => (router.push('/')), 2000)
        
      },
    },
    watch: {
    password: function () {
      if(this.password != this.passwordConfirm){
        this.alertMessage = "Password and Confirm Password must be same";
        this.showAlert = true;
        console.log(this.password);
      }
      else{
        this.showAlert = false;
      }
    },
    passwordConfirm: function () {
      if(this.password != this.passwordConfirm){
        this.alertMessage = "Password and Confirm Password must be same";
        this.showAlert = true;
        console.log(this.password);
      }
      else{
        this.showAlert = false;
      }
    }
  }
  }
</script>
