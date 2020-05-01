<template>
  <div cols="12" sm="8" md="7" lg="5">
    <Navbar />
    <v-row>
      <v-col cols="3">
        <v-card class="mx-auto" max-width="400">
          <v-list>
            <v-list-item-group v-model="model" mandatory color="indigo">
              <v-list-item
                v-for="(item, i) in items"
                :key="i"
                @click="item.click"
              >
                <v-list-item-icon>
                  <v-icon v-text="item.icon"></v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title v-text="item.text"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>
      <v-col v-if="profile" cols="4" offset="1">
        <Account :location="location" :user="user" />
      </v-col>
      <v-col v-if="message" cols="8">
        <Chat />
      </v-col>
      <v-col v-if="rating" cols="4" offset="1">
        Rating
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Account from '@/components/Account.vue'
import Chat from '@/components/Chat.vue'
import api from '../services/Api'

export default {
  name: 'Profile',
  data () {
    return {
      profile: true,
      message: false,
      rating: false,
      location: null,
      user: null,
      items: [
        {
          icon: 'mdi-account-settings',
          text: 'Profile',
          click: () => {
            this.message = this.rating = false
            this.profile = true
          }
        },
        {
          icon: 'mdi-email',
          text: 'Message',
          click: () => {
            this.profile = this.rating = false
            this.message = true
          }
        },
        {
          icon: 'mdi-star',
          text: 'Rating',
          click: () => {
            this.message = this.profile = false
            this.rating = true
          }
        }
      ],
      model: 1
    }
  },
  components: {
    Navbar,
    Account,
    Chat
  },
  methods: {
    async getAllLocations () {
      const all = await api.getAllLocations()
      return (this.location = all)
    },
    async getMe () {
      const user = await api.getMe()
      return (this.user = user)
    }
  },
  mounted () {
    this.getAllLocations()
    this.getMe()
  }
}
</script>

<style lang="scss" scoped></style>
