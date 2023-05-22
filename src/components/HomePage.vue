<template>
  <v-sheet class="pa-12" rounded>
    <h1 class="text-center">Welcome</h1>
    <br/>
  </v-sheet>
</template>

<script>
  export default {
    data: () => ({
      form: false,
      email: null,
      password: null,
      passwordConfirm: null,
      loading: false,
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
    },
  }
</script>
