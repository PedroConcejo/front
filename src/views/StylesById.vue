<template>
  <div class="about">
    <Navbar />
    <v-row center>
      <v-col cols="6" offset="3">
        <v-carousel :show-arrows="false">
          <v-carousel-item
            v-for="(img, idx) in style.img"
            :key="idx"
            :src="img"
            reverse-transition="fade-transition"
            transition="fade-transition"
          ></v-carousel-item>
        </v-carousel>
        <h2>
          {{ style.user.name }}
          <v-rating
            v-model="rate"
            background-color="orange lighten-3"
            color="orange"
            readonly
            half-increments
          ></v-rating>
        </h2>
        <v-col> <v-btn outlined color="teal" text @click="update">
        Actualizar
      </v-btn></v-col>
        <v-tabs v-model="tab" background-color="teal lighten-3">
          <v-tab>
            {{ style.category.name }}
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <h2>
                  <span class="mdi mdi-format-align-center"></span>
                  Description
                </h2>
                 <v-textarea
            label="Descripcion de lo que se va hacer en la sesion"
            v-model="style.description"
          ></v-textarea>
              </v-card-text>
              <v-card-text>
                <h2>
                  <span class="mdi mdi-checkbox-marked-outline"></span>
                  Content
                </h2>
                <v-textarea
            label="Que tipo de archivos y formatos que se entregan"
            v-model="style.content"
          ></v-textarea>
              </v-card-text>
              <v-card-text>
                <h2>
                  <span class="mdi mdi-currency-eur"></span>
                  Price
                </h2>
                <v-text-field
            label="Precio minimo de la sesion"
            v-model="style.price_min"
          ></v-text-field>
          <v-text-field
            label="Precio maximo de la sesion"
            v-model="style.price_max"
          ></v-text-field>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-col>
    </v-row>
  </div>
</template>
<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar.vue'
import Api from '../services/Api'

export default {
  name: 'Partner',
  data () {
    return {
      style: [],
      tab: 0,
      location: [],
      ratings: []
    }
  },
  components: {
    Navbar
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
    update () {
      const updateStyle = {
        description: this.style.description,
        content: this.style.content,
        price_min: this.style.price_min,
        price_max: this.style.price_max
      }

      Api.updateStyle(updateStyle, this.$route.params.styleid)
        .then(response => {
          location.reload()
        })
        .catch(err => console.log(err))
    }
  },
  async created () {
    this.style = await Api.getStyle(this.$route.params.styleid)
  }

}

</script>
