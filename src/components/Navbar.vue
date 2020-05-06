<template>
  <div>
    <v-row>
      <v-col>
        <v-card flat tile class="transparent">
          <v-toolbar
            v-if="isToken"
            color="teal lighten-3"
          >
            <v-col>
              <v-btn icon color="#ECEFF1" @click="back">
                <v-icon>mdi-arrow-left</v-icon>
              </v-btn>
              <v-btn v-if="isPartner" icon color="#ECEFF1" @click="business">
                <v-icon>mdi-briefcase</v-icon>
              </v-btn>
              <v-btn icon color="#ECEFF1" @click="home">
                <v-icon>mdi-home</v-icon>
              </v-btn>
            </v-col>
            <v-col>
              <v-toolbar-title>
                <v-btn href="/" text class="brand font-weight-black text-center">
Recuerdos
</v-btn></v-toolbar-title
              >
            </v-col>
            <v-col class="text-end">
               <v-btn icon color="#ECEFF1" @click="favorites">
                <v-icon>mdi-heart</v-icon>
              </v-btn>
              <v-btn icon color="#ECEFF1" @click="ratings">
                <v-icon>mdi-star</v-icon>
              </v-btn>
              <v-btn v-if="isPartner" icon color="#ECEFF1" @click="messagespartner">
                <v-icon>mdi-email</v-icon>
              </v-btn>
              <v-btn v-else icon color="#ECEFF1" @click="messages">
                <v-icon>mdi-email</v-icon>
              </v-btn>

              <v-btn icon color="#ECEFF1" @click="profile">
                <v-icon>mdi-account</v-icon>
              </v-btn>

              <v-btn icon color="#ECEFF1" @click="logout">
                <v-icon>mdi-exit-to-app</v-icon>
              </v-btn>
            </v-col>
          </v-toolbar>
          <v-toolbar
            v-if="!isToken"
            color="teal lighten-3"
          >
            <v-col>
              <Partnerauth :location="location" />
            </v-col>
            <v-col>
              <v-toolbar-title>
                 <v-btn href="/" text class="brand font-weight-black text-center">
Recuerdos
</v-btn></v-toolbar-title
              >
            </v-col>
            <v-spacer></v-spacer>
            <v-col>
              <Login />
            </v-col>
            <v-col>
              <Signup :location="location" />
            </v-col>
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
    },
    isPartner: function () {
      if (localStorage.getItem('role') === 'partner') {
        return true
      } else { return false }
    }
  },
  methods: {
    logout () {
      localStorage.clear()
      location.reload()
    },
    back () {
      this.$router.go(-1)
    },
    profile () {
      this.$router.push('/profile')
    },
    messages () {
      this.$router.push('/messages')
    },
    messagespartner () {
      this.$router.push('/messages/partner')
    },
    ratings () {
      this.$router.push('/ratings')
    },
    favorites () {
      this.$router.push('/favorites')
    },
    home () {
      this.$router.push('/')
    },
    business () {
      this.$router.push('/business/styles')
    }
  }
}
</script>

<style lang="scss" scoped>
* {
  text-decoration-line: none;
  .brand {
    color: #eceff1;
    font-family: "Quicksand", sans-serif;
  }
}
.max {
  width: auto !important;
}
.transparent {
  background-color: !important;
}
.v-navigation-drawer {
  width: 70% !important;
}
v-btn {
  color: #eceff1;
}
</style>
