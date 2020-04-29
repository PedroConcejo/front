<template>
  <div cols="12" sm="8" md="7" lg="5">
<Navbar />
 <v-card v-for="(style, idx) in styles" :key="idx"
    class="mx-auto mt-10"
    max-width="400"
  >
     <v-carousel :show-arrows="false">
    <v-carousel-item
      v-for="(img, idx) in style.img" :key="idx"
      :src="img" reverse-transition="fade-transition"
      transition="fade-transition"
    ></v-carousel-item>
  </v-carousel>

    <v-card-subtitle class="pb-0">{{style.user.name}}</v-card-subtitle>

    <v-card-text class="text--primary">
      <div>{{style.user.location.name}}</div>

      <div>{{style.category.name}}</div>
    </v-card-text>

    <v-card-actions>
      <v-btn
      outlined color="red"
        text
         @click="ver(style.user._id)"
      >
        Ver
      </v-btn>

    </v-card-actions>
  </v-card>
<Footer />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import api from '../services/Api'

export default {
  name: 'Profile',
  data () {
    return {
      styles: null
    }
  },
  components: {
    Navbar,
    Footer
  },
  methods: {
    async getAllByStyles () {
      const all = await api.getAllByStyles()
      return (this.styles = all)
    }
  },
  mounted () {
    this.getAllByStyles()
  }
}
</script>

<style lang="scss" scoped>

</style>
