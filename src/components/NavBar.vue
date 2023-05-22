<template>
  <v-container>
    <div>
    <v-app-bar
        color="primary"
        density="compact"
      >
       
        <v-app-bar-title>Welcom to Tour Advisor</v-app-bar-title>

        <template v-slot:append>
          <div class="text-center">
            <v-btn
              prepend-icon="mdi-account-circle"
              to="/login"
              v-if="showLoginBtn"
            >
              <template v-slot:prepend>
                <v-icon color="warning"></v-icon>
              </template>
              Login
            </v-btn>
            <v-btn
              prepend-icon="mdi-account-circle"
              to="/register"
              v-if="showLoginBtn"
            >
              <template v-slot:prepend>
                <v-icon color="warning"></v-icon>
              </template>
              Register
            </v-btn>

            <v-btn
              prepend-icon="mdi-account-circle"
              v-if="!showLoginBtn"
            >
              <template v-slot:prepend>
                <v-icon color="warning"></v-icon>
              </template>
              {{UserName}}
            </v-btn>
          </div>
        </template>
      </v-app-bar>
      </div>
  </v-container>
</template>

<script>

export default {
  name: 'NavBar',

  data: () => ({
    showLoginBtn: true,
    UserName: "Karthik"
  }),
}
</script>
