<template>
  <div>
    <Navbar />
    <v-row center>
      <v-col cols="6" offset="3">
        <input type="file" @change="onFileChanged" />
        <button @click="onUpload">Upload!</button>
      </v-col>
    </v-row>
    <v-row center>
      <v-col cols="2" offset="3">
        <v-avatar color="orange" size="100">
          <img :src="user.img" />
        </v-avatar>
        <h2>{{ user.name }}</h2>
      </v-col>
      <v-col cols="2">
        <v-text-field
          label="Facebook URL*"
          v-model="facebook"
          prepend-icon="mdi-facebook"
          required
        ></v-text-field>

        <v-text-field
          label="Instagram URL*"
          v-model="instagram"
          prepend-icon="mdi-instagram"
          required
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row center>
      <v-col cols="3" offset="3">
        <v-select
          outlined
          :items="categories"
          label="Tipo de Sesion"
          name="category"
          v-model="categoryfilter"
          item-text="name"
          item-value="_id"
          color="teal"
        ></v-select>
      </v-col>
    </v-row>
    <v-row center>
      <v-col cols="6" offset="3">
        <v-divider></v-divider>
        <v-col cols="4">
          <h2>Descripcion</h2>
        </v-col>
        <v-col cols="8">
          <v-textarea
            label="Descripcion de lo que se va hacer en la sesion"
            v-model="description"
          ></v-textarea>
        </v-col>
        <v-col cols="6">
          <h2>Que incluye</h2>
        </v-col>
        <v-col cols="8">
          <v-textarea
            label="Que tipo de archivos y formatos que se entregan"
            v-model="incluye"
          ></v-textarea>
        </v-col>
        <v-col cols="4">
          <h2>Precio</h2>
        </v-col>
        <v-col cols="4">
          <v-text-field
            label="Precio minimo de la sesion"
            v-model="min_price"
          ></v-text-field>
          <v-text-field
            label="Precio maximo de la sesion"
            v-model="max_price"
          ></v-text-field>
        </v-col>
         <v-btn class="ma-2" outlined color="teal" @click="createStyle"
          >Crear Sesion</v-btn
        >
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Api from '../services/Api'

export default {
  name: 'Partner',
  data () {
    return {
      categories: [],
      categoryfilter: '',
      facebook: '',
      instagram: '',
      user: {},
      selectedFile: null,
      incluye: '',
      description: '',
      min_price: null,
      max_price: null
    }
  },
  components: {
    Navbar
  },
  methods: {
    onFileChanged (event) {
      this.selectedFile = event.target.files[0]
    },
    onUpload () {
      // upload file
    },
    createStyle () {
      const newStyle = {
        description: this.description,
        content: this.incluye,
        price_min: this.min_price,
        price_max: this.max_price,
        category: this.categoryfilter
      }

      Api.createStyle(newStyle)
        .then(response => {
          this.$router.push('/profile')
        })
        .catch(err => console.log(err))
    }
  },
  async created () {
    this.user = await Api.getMe()
    this.categories = await Api.getAllCategories()
  }
}
</script>
