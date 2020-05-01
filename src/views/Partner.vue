<template>
  <div class="about">
    <Navbar />
    <v-row center>
      <v-col cols="6" offset="3">
        <v-carousel :show-arrows="false">
          <v-carousel-item
            v-for="(img, idx) in styles[tab].img"
            :key="idx"
            :src="img"
            reverse-transition="fade-transition"
            transition="fade-transition"
          ></v-carousel-item>
        </v-carousel>
        <h2>
          {{ styles[0].user.name }}
          <v-rating
            v-model="rate"
            background-color="orange lighten-3"
            color="orange"
            readonly
            half-increments
          ></v-rating>
          <Formulario :location="location" />
        </h2>

        <v-tabs v-model="tab" background-color="teal lighten-3">
          <v-tab v-for="(style, idx) in styles" :key="idx">
            {{ style.category.name }}
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item v-for="(style, idx) in styles" :key="idx">
            <v-card flat>
              <v-card-text>
                <h2>
                  <span class="mdi mdi-format-align-center"></span>
                  Description
                </h2>
                {{ style.description }}
              </v-card-text>
              <v-card-text>
                <h2>
                  <span class="mdi mdi-checkbox-marked-outline"></span>
                  Content
                </h2>
                {{ style.content }}
              </v-card-text>
              <v-card-text>
                <h2>
                  <span class="mdi mdi-currency-eur"></span>
                  Price
                </h2>
                {{ style.price_min }} to {{ style.price_max }}
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
        <Addrating :ratings="ratings" />
        <Showrating :ratings="ratings" />
      </v-col>
    </v-row>
  </div>
</template>
<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar.vue'
import Formulario from '@/components/Formulario.vue'
import Addrating from '@/components/Addrating.vue'
import Showrating from '@/components/Showrating.vue'
import api from '../services/Api'

export default {
  name: 'Partner',
  data () {
    return {
      styles: null,
      tab: 0,
      location: null,
      ratings: null
    }
  },
  components: {
    Navbar,
    Formulario,
    Addrating,
    Showrating
  },
  computed: {
    rate: function () {
      var arr = this.ratings
      var res = []
      for (let i = 0; i < arr.length; i++) {
        res.push(arr[i].rate)
      }
      const finalRating = res.reduce((prev, curr) => {
        return prev + curr
      }, 0)

      return (finalRating / arr.length)
    }
  },
  methods: {
    async getPartnerStyles () {
      const all = await api.getPartnerStyles(this.$route.params.partnerid)
      return (this.styles = all)
    },
    async getAllLocations () {
      const all = await api.getAllLocations()
      return (this.location = all)
    },
    async getPartnerRatings () {
      const all = await api.getPartnerRatings(this.$route.params.partnerid)
      return (this.ratings = all)
    }
  },
  mounted () {
    this.getPartnerStyles()
    this.getAllLocations()
    this.getPartnerRatings()
  }
}
</script>
