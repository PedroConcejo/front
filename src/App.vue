<template>
  <v-app>
    <v-content>
      <v-container>
        <router-view> </router-view>
      </v-container>
    </v-content>
    <Footer />
  </v-app>
</template>

<script>
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    Footer
  },
  data: () => ({})
}
</script>
