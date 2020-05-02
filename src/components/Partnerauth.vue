<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn  class="ma-2" block outlined rounded color="#ECEFF1" v-on="on"> <v-icon>mdi-briefcase</v-icon>Empresas</v-btn>
      </template>

       <v-tabs>
         <v-tab :key="1" :value="1">
        Login
         </v-tab>
          <v-tab :key="2" :value="2">
        Signup
         </v-tab>
      <v-tab-item :key="1" :href="1">
        <v-card flat tile>
          <v-card-text>
            <v-row justify="center">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Login</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">User Login</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field label="Email*" v-model="email" :rules="emailRules"
            prepend-icon="mdi-email" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Password*" v-model="password" :type="showPassword ? 'text' : 'password'"
            prepend-icon="mdi-lock"
            :rules="passwordRule"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword" required></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="login">Login</v-btn>
        </v-card-actions>
      </v-card>
  </v-row></v-card-text>
        </v-card>
      </v-tab-item>
       <v-tab-item :key="2" :href="2">
        <v-card flat tile>
          <v-card-text> <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Signup</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="Business Name*" v-model="username"
            prepend-icon="mdi-account-circle"
            :rules="userRules" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Email*"  v-model="email"
            :rules="emailRules"
            prepend-icon="mdi-email" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Password*"  v-model="password"
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
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="signup">Save</v-btn>
        </v-card-actions>
      </v-card></v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
    </v-dialog>
  </v-row>
</template>

<script>
import Api from '../services/Api'

export default {
  data () {
    return {
      userlocation: '',
      dialog: false,
      showPassword: false,
      password: '',
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
  methods: {
    signup () {
      const newUser = {
        name: this.username,
        email: this.email,
        password: this.password,
        location: this.userlocation,
        role: 'partner'
      }

      Api.signup(newUser)
        .then(response => {
          localStorage.setItem('token', response.token)
          this.dialog = false
          this.$router.push('/business')
        })
        .catch(err => console.log(err))
    },
    login () {
      const user = {
        email: this.email,
        password: this.password
      }

      Api.login(user)
        .then(response => {
          if (response.error) {
            console.log(response.error)
          } else {
            localStorage.setItem('token', response.token)
            this.dialog = false
            this.$router.push('/business')
          }
        })
        .catch(err => console.log(err))
    }
  }
}
</script>
