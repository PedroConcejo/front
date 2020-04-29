<template>
  <div class="home">
    <Navbar :location="location" />

     <v-row>
     <v-col  offset="3" class="d-flex" cols="12" sm="6">
        <v-select
          :items="categories"
          label="Tipo de Sesion"
          name="category"
          v-model="category"
          item-text="name"
        ></v-select> <v-select
          :items="location"
          label="Ubicacion"
          name="location"
          v-model="location"
          item-text="name"
        ></v-select>
         <v-btn class="ma-2" outlined color="black">Buscar</v-btn>
      </v-col>
    </v-row>
    <Partnerlist :partners="partners"/>
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import api from '../services/Api'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import Partnerlist from '@/components/Partnerlist.vue'

export default {
  name: 'Home',
  data () {
    return {
      categories: null,
      location: null,
      partners: null
    }
  },
  components: {
    Navbar,
    Footer,
    Partnerlist
  },
  methods: {
    async getAllCategories () {
      const all = await api.getAllCategories()
      return (this.categories = all)
    },
    async getAllLocations () {
      const all = await api.getAllLocations()
      return (this.location = all)
    },
    async getAllPartners () {
      const all = await api.getAllPartners()
      return (this.partners = all)
    }
  },
  mounted () {
    this.getAllCategories()
    this.getAllLocations()
    this.getAllPartners()
  }
}
</script>
