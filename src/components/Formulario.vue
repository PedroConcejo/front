<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn class="ma-2" outlined color="red" v-on="on">Contact</v-btn>
      </template>
      <v-card v-if="isToken">
          <v-card-title>
          <span class="headline">Contact</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <h2>{{user.name}}</h2>
              </v-col>
              <v-col cols="12">
                <h2>{{user.email}}</h2>
              </v-col>
               <v-col cols="12" sm="6" md="4">
                <v-text-field label="Subject*" v-model="subject"
            prepend-icon="mdi-account-circle"
            :rules="userRules" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea label="Formulario*" v-model="formulario"
            prepend-icon="mdi-account-circle"
            required></v-textarea>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="send">Send</v-btn>
        </v-card-actions>
      </v-card>
      <v-card v-else>
         <v-card-title>
          <span class="headline">Create Account and Send Message</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="Name*" v-model="username"
            prepend-icon="mdi-account-circle"
            :rules="userRules" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Email*"  v-model="email"
            :rules="emailRules"
            prepend-icon="mdi-email" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Password*"  v-model="userPassword"
            :type="showPassword ? 'text' : 'password'"
            prepend-icon="mdi-lock"
            :rules="passwordRule"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
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
                <v-col cols="12" sm="6" md="4">
                <v-text-field label="Subject*" v-model="subject"
            prepend-icon="mdi-account-circle"
            :rules="userRules" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea label="Formulario*" v-model="formulario"
            prepend-icon="mdi-account-circle"
            required></v-textarea>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="signup">Send and Create</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import Api from '../services/Api'

export default {
  data () {
    return {
      userlocation: '',
      formulario: '',
      subject: '',
      dialog: false,
      showPassword: false,
      userPassword: '',
      user: null,
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
  props: {
    location: Array
  },
  computed: {
    isToken: function () {
      return !!localStorage.getItem('token')
    }
  },
  methods: {
    signup () {
      const newUser = {
        name: this.username,
        email: this.email,
        password: this.userPassword,
        location: this.userlocation
      }
      const room = {
        subject: this.subject,
        partner: this.$route.params.partnerid
      }

      Api.signup(newUser)
        .then(response => {
          localStorage.setItem('token', response.token)
          Api.startRoom(room)
            .then(response => {
              const mensaje = {
                msg: this.formulario
              }
              Api.newMsn(response._id, mensaje)
                .then(response => { this.dialog = false })
                .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    },
    async getMe () {
      if (this.isToken) {
        const user = await Api.getMe()
        return (this.user = user)
      }
    }
  },
  mounted () {
    this.getMe()
  }
}
</script>
