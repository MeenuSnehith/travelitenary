<template>
  <v-sheet class="pa-12" rounded>
    <h1 class="text-center">Login</h1>
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
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show1 ? 'text' : 'password'"
          @click:append="show1 = !show1"
        ></v-text-field>
        

        <br>

        <v-btn
          :disabled="!form"
          :loading="loading"
          block
          color="primary"
          size="large"
          type="submit"
          variant="elevated"
          rounded="xl"
          @click="loginClick"
        >
          Login
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
      Login Success. Please wait while redirecting...
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
      snackbar: false,
      timeout: 2000,
      show1: false,
      show2: true,
      show3: false,
      show4: false,
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
      loginClick(){
        this.snackbar = true;
        setTimeout(() => (router.push('/')), 2000)
        
      }
    }
  }

</script>
