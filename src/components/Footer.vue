<template>
  <v-footer
    padless
    class="font-weight-medium"
  >
    <v-card
    color="teal lighten-3
"
      class="d-flex"
      flat
      tile
    >
      <v-card-title class="brand">
        <strong>Get connected with us on social networks!</strong>
        <v-spacer></v-spacer>
        {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
        <v-spacer></v-spacer>
        <v-btn
          v-for="icon in icons"
          :key="icon"
          class="mx-4"
          dark
          icon
        >
          <v-icon size="24px">{{ icon }}</v-icon>
        </v-btn>
      </v-card-title>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    icons: [
      'mdi-facebook',
      'mdi-twitter',
      'mdi-google-plus',
      'mdi-linkedin',
      'mdi-instagram'
    ]
  })
}
</script>
<style>
.footer {
  margin-top: 100px;
}
.brand {
    color: #eceff1;
    font-family: "Quicksand", sans-serif;
  }
</style>
