<template>
  <div class="about">
    <Navbar />
    <v-row center>
      <v-col cols="6" offset="3">
      <v-carousel :show-arrows="false">
    <v-carousel-item
      v-for="(img, idx) in styles[tab].img" :key="idx"
      :src="img" reverse-transition="fade-transition"
      transition="fade-transition"
    ></v-carousel-item>
  </v-carousel>
  <h2>
    {{styles[0].user.name}}
    <Formulario />
  </h2>

   <v-tabs v-model="tab">
         <v-tab  v-for="(style, idx) in styles" :key="idx">
{{style.category.name}}
         </v-tab>
  </v-tabs>
       <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="(style, idx) in styles"
        :key="idx"
      >
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
            </h2 >
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
      </v-col>
    </v-row>
    <Footer />

  </div>
</template>
<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar.vue'
import Formulario from '@/components/Formulario.vue'
import Footer from '@/components/Footer.vue'
import api from '../services/Api'

export default {
  name: 'Partner',
  data () {
    return {
      styles: null,
      tab: 0
    }
  },
  components: {
    Navbar,
    Footer,
    Formulario
  },
  methods: {
    async getPartnerStyles () {
      const all = await api.getPartnerStyles(this.$route.params.partnerid)
      return (this.styles = all)
    }
  },
  mounted () {
    this.getPartnerStyles()
  }
}
</script>
