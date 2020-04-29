
<template>
<div>
    <v-card
    color="grey lighten-4"
    flat
    tile
  >
    <v-toolbar v-if="isToken" dark>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title>Recuerdos</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon @click="logout">
        <v-icon>mdi-exit-to-app</v-icon>
      </v-btn>

    </v-toolbar>
     <v-toolbar v-else dark>
      <Partnerauth :location="location" />
      <v-toolbar-title>Recuerdos</v-toolbar-title>
      <v-spacer></v-spacer>
      <Login />
      <Signup :location="location" />
    </v-toolbar>
  </v-card>

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
      this.$router.push('/')
    },
    create () {
      this.$router.push('/create')
    },
    back () {
      this.$router.go(-1)
    }
  }
}
</script>
