<template>
  <div>
    <v-row>
    <v-col>
    <v-card color="grey lighten-4" flat tile>
      <v-toolbar v-if="isToken" dark>
      <v-col cols='1'>
        <v-btn icon @click="home">
          <v-icon>mdi-camera</v-icon>
        </v-btn>
</v-col>
<v-col cols='2'>
        <v-toolbar-title>Recuerdos</v-toolbar-title>
        </v-col>
<v-col cols='2' offset='7'>

        <v-btn icon>
          <v-icon>mdi-email</v-icon>
        </v-btn>

        <v-btn icon @click="profile">
          <v-icon>mdi-account</v-icon>
        </v-btn>

        <v-btn icon @click="logout">
          <v-icon>mdi-exit-to-app</v-icon>
        </v-btn>
        </v-col>

      </v-toolbar>
      <v-toolbar v-else dark>
        <Partnerauth :location="location" />
        <v-toolbar-title>Recuerdos</v-toolbar-title>
        <v-spacer></v-spacer>
        <Login />
        <Signup :location="location" />
      </v-toolbar>
    </v-card>
    </v-col>
    </v-row>
  </div>
</template>

<script>
import Partnerauth from '@/components/Partnerauth.vue'
import Login from '@/components/Login.vue'
import Signup from '@/components/Signup.vue'

export default {
  name: 'Home',
  props: {
    location: Array
  },
  components: {
    Partnerauth,
    Login,
    Signup
  },
  computed: {
    isToken: function () {
      return !!localStorage.getItem('token')
    }
  },
  methods: {
    logout () {
      localStorage.clear()
      location.reload()
    },
    profile () {
      this.$router.push('/profile')
    },
    home () {
      this.$router.push('/')
    },
    back () {
      this.$router.go(-1)
    }
  }
}
</script>
