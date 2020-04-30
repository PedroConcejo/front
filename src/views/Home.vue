<template>
  <div class="home">
    <Navbar :location="location" />

     <v-row>
     <v-col  offset="3" class="d-flex" cols="12" sm="6">
         <v-select
          :items="categories"
          label="Tipo de Sesion"
          name="category"
          v-model="categoryfilter"
          item-text="name"
        ></v-select>
        <v-select
          :items="location"
          label="Ubicacion"
          name="location"
          v-model="locationfilter"
          item-text="name"
        ></v-select>
         <v-btn class="ma-2" outlined color="black" @click="search">Buscar</v-btn>
      </v-col>
    </v-row>
    <Partnerlist :partners="partners" class="b" />
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
      partners: null,
      categoryfilter: '',
      locationfilter: ''
    }
  },
  components: {
    Navbar,
    Footer,
    Partnerlist
  },
  methods: {
    async search () {
      const location = this.locationfilter === 'Todas las Localizaciones' ? '' : this.locationfilter
      const style = this.categoryfilter === 'Todos los estilos' ? '' : this.categoryfilter
      const all = await api.getAllByStyles('', location, style)
      return (this.partners = all)
    },
    async getAllCategories () {
      const all = await api.getAllCategories()
      all.unshift('Todos los estilos')
      return (this.categories = all)
    },
    async getAllLocations () {
      const all = await api.getAllLocations()
      all.unshift('Todas las Localizaciones')
      return (this.location = all)
    },
    async getAllByStyles () {
      const all = await api.getAllByStyles()
      return (this.partners = all)
    }
  },
  mounted () {
    this.getAllCategories()
    this.getAllLocations()
    this.getAllByStyles()
  }
}
</script>
<style>
.b {
  margin-bottom: 100px;
}
</style>
