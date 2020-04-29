
<template>
     <v-toolbar  dark>
        <v-btn icon @click="back">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <Partnerauth :location="location" />
      <v-toolbar-title center>Recuerdos</v-toolbar-title>

      <v-spacer></v-spacer>
      <Login />
      <Signup :location="location" />

      <v-btn icon @click="create">
        <v-icon>mdi-table-edit</v-icon>
      </v-btn>
      <v-btn icon @click="logout">
        <v-icon>mdi-exit-to-app</v-icon>
      </v-btn>

    </v-toolbar>
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
