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
      categories: [],
      location: [],
      partners: [],
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
      const style = categoryfilter === 'Todos los estilos' ? '' : categoryfilter
      this.partners = await api.getAllByStyles(user, location, style)
    }
  },
  async created () {
    const categories = await api.getAllCategories()
    this.categories = ['Todos los estilos', ...categories]

    const locations = await api.getAllLocations()
    this.location = ['Todas las Localizaciones', ...locations]
    console.log(this.locations)
    this.partners = await api.getAllByStyles()
  }
}
</script>
<style>
.b {
  margin-bottom: 100px;
}
</style>
