<template>
  <div class="home">
    <Navbar :location="location" />
    <v-row>
<v-col cols='3'>
        <Vertical :categories="categories" :location="location" v-on:search='search'/>
      </v-col>
      <v-col cols="9" class="d-flex flex-wrap mx-auto">
    <Partnerlist :partners="partners" class="b" />

      </v-col>
    </v-row>
  </div>
</template>

<script>
// @ is an alias to /src
import api from '../services/Api'
import Navbar from '@/components/Navbar.vue'
import Partnerlist from '@/components/Partnerlist.vue'
import Vertical from '@/components/Verticalsearchbar.vue'

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
    Partnerlist,
    Vertical
  },
  methods: {
    async search (user, categoryfilter, locationfilter) {
      const location =
        locationfilter === 'Todas las Localizaciones'
          ? ''
          : locationfilter
      const style =
        categoryfilter === 'Todos los estilos' ? '' : categoryfilter
      const all = await api.getAllByStyles(user, location, style)
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
