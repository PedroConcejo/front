<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn class="ma-2" outlined rounded color="#ECEFF1" v-on="on">Iniciar Sesion</v-btn>

      </template>
      <v-card>
        <v-card-title>
          <span class="headline">User Login</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Email*"
                  v-model="email"
                  :rules="emailRules"
                  prepend-icon="mdi-email"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Password*"
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  prepend-icon="mdi-lock"
                  :rules="passwordRule"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="showPassword = !showPassword"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
          <v-spacer></v-spacer>
          <v-alert type="error" :value="alert">
      Wrong password.
    </v-alert>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false"
            >Close</v-btn
          >
          <v-btn color="blue darken-1" text @click="login">Login</v-btn>
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
      dialog: false,
      alert: false,
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],
      email: '',
      showPassword: false,
      password: '',
      passwordRule: [
        v => !!v || 'Password is required',
        v => v.length >= 6 || 'Password must be more than 6 characters'
      ]
    }
  },
  methods: {
    login () {
      const user = {
        email: this.email,
        password: this.password
      }

      Api.login(user)
        .then(response => {
          if (response.error) {
            console.log(response.error)
            this.alert = true
          } else {
            localStorage.setItem('token', response.token)
            localStorage.setItem('role', response.role)
            this.alert = false
            location.reload()
          }
        })
        .catch(err => console.log(err))
    }
  }
}
</script>
