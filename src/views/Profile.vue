<template>
  <div cols="12" sm="8" md="7" lg="5">
    <Navbar />
    <v-row justify="center">
      <v-card>
        <v-card-title>
          <span class="headline">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row justify="center">
              <v-col cols="12" sm="7" justify="center">
                <v-avatar color="orange" size="100">
                  <img :src="user.img" />
                </v-avatar>
                <v-spacer></v-spacer>
                <input
                  class="my-2"
                  type="file"
                  multiple
                  @change="onFileSelected"
                />
              </v-col>
              <v-col cols="12" sm="7">
                <v-text-field
                  label="Name*"
                  v-model="user.name"
                  prepend-icon="mdi-account-circle"
                  :rules="userRules"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="7">
                <v-text-field
                  label="Email*"
                  v-model="user.email"
                  :rules="emailRules"
                  prepend-icon="mdi-email"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="7">
                <v-select
                  prepend-icon="mdi-map-marker"
                  :items="location"
                  name="location"
                  label="Select a location"
                  item-value="_id"
                  v-model="userlocation"
                  item-text="name"
                >
                </v-select>
              </v-col>
              <v-col cols="12" sm="7">
          <v-btn class="ma-2" outlined rounded color="black" @click="update">Update</v-btn>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>

        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <Password />
        </v-card-actions>
      </v-card>
    </v-row>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Password from '@/components/Password.vue'
import firebase from 'firebase'
import Api from '../services/Api'

export default {
  name: 'Profile',
  data () {
    return {
      location: null,
      selectedFile: null,
      user: {},
      picture: '',
      userlocation: '',
      dialog: false,
      showPassword: false,
      userPassword: '',
      passwordRule: [
        v => !!v || 'Password is required',
        v => v.length >= 6 || 'Password must be more than 6 characters'
      ],
      username: '',
      userRules: [v => !!v || 'Username is required'],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ]

    }
  },
  components: {
    Navbar,
    Password
  },
  methods: {
    onFileSelected (event) {
      this.selectedFile = event.target.files[0]
      this.onUpload()
    },
    onUpload () {
      const storageRef = firebase.storage().ref(`imagenes/${this.selectedFile.name}`)
      const task = storageRef.put(this.selectedFile)

      task.snapshot.ref.getDownloadURL().then((url) => {
        this.picture = url
        console.log(this.picture)
      })
    },
    update () {
      if (this.picture === '') {
        this.picture = this.user.img
      }
      const updateUser = {
        name: this.user.name,
        email: this.user.email,
        location: this.userlocation,
        img: this.picture
      }

      Api.updateUser(updateUser)
        .then(response => {
          this.user = response
        })
        .catch(err => console.log(err))
    }
  },
  async created () {
    this.location = await Api.getAllLocations()
    this.user = await Api.getMe()
  }
}
</script>

<style lang="scss" scoped></style>
