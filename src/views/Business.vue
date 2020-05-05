<template>
  <div>
    <Navbar />
    <v-row center>
      <v-col cols="6" offset="3">
        <h2>Fotos del estilo</h2>
      <input class="my-2" type="file"  @change="onFileSelected">
      <input class="my-2" type="file"  @change="twoFileSelected">
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
import firebase from 'firebase'

export default {
  name: 'Partner',
  data () {
    return {
      categories: [],
      categoryfilter: '',
      selectedFile: null,
      selectedFiletwo: null,
      picture: '',
      picturetwo: '',
      facebook: '',
      instagram: '',
      user: {},
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
    onFileSelected (event) {
      this.selectedFile = event.target.files[0]
      this.onUpload()
    },
    onUpload () {
      const storageRef = firebase.storage().ref(`imagenes/${this.selectedFile.name}`)
      const task = storageRef.put(this.selectedFile)

      task.on('state_changed', () => {
        task.snapshot.ref.getDownloadURL().then((url) => {
          this.picture = url
        })
      })
    },
    twoFileSelected (event) {
      this.selectedFiletwo = event.target.files[0]
      this.twoUpload()
    },
    twoUpload () {
      const storageRef = firebase.storage().ref(`imagenes/${this.selectedFiletwo.name}`)
      const task = storageRef.put(this.selectedFiletwo)

      task.on('state_changed', () => {
        task.snapshot.ref.getDownloadURL().then((url) => {
          this.picturetwo = url
        })
      })
    },
    createStyle () {
      const newStyle = {
        description: this.description,
        content: this.incluye,
        price_min: this.min_price,
        price_max: this.max_price,
        category: this.categoryfilter,
        img: [this.picture, this.picturetwo]
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
