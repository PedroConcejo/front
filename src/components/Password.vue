<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn class="ma-2" outlined rounded color="black" v-on="on">Cambiar Contraseña</v-btn>

      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Cambiar Contraseña</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
           <v-text-field
                  label="Actual password*"
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  prepend-icon="mdi-lock"
                  :rules="passwordRule"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="showPassword = !showPassword"
                  required
                ></v-text-field>
            <v-text-field
                  label="New password*"
                  v-model="newPassword"
                  :type="showPassword ? 'text' : 'password'"
                  prepend-icon="mdi-lock"
                  :rules="passwordRule"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="showPassword = !showPassword"
                  required
                ></v-text-field>
           <v-text-field
                  label="Repeat new password*"
                  v-model="confirmPassword"
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
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false"
            >Close</v-btn
          >
          <v-btn color="blue darken-1" text @click="updatePsw">Cambiar</v-btn>
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
      password: '',
      newPassword: '',
      confirmPassword: '',
      dialog: false,
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],
      email: '',
      showPassword: false,
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
          } else {
            localStorage.setItem('token', response.token)
            localStorage.setItem('role', response.role)
            location.reload()
          }
        })
        .catch(err => console.log(err))
    },
    updatePsw () {
      const newPassword = {
        actualPassword: this.password,
        newPassword: this.confirmPassword
      }
      Api.changePassword(newPassword)
      this.dialog = false
    }
  }
}
</script>
