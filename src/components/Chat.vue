<template>
  <div min-width="300">
    <v-row>
      <v-col cols="3">
        <v-card class="mx-auto">
          <v-list>
            <v-list-item-group v-model="model" mandatory color="indigo">
              <v-list-item
                v-for="item in rooms"
                :key="item._id"
                @click="message(item._id)"
              >
                <v-avatar color="orange" size="20">
                  <img :src="item.partner.img" />
                </v-avatar>

                <v-list-item-content>
                  <v-list-item-title
                    v-text="item.partner.name"
                  ></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="7" justify="center">
        <v-content>
          <v-container>
            <v-layout align-center justify-center>
              <v-flex>
                <v-card class="elevation-12" color="teal lighten-5
">
                  <v-toolbar dark color="teal lighten-3
">
                    <v-toolbar-title>Chat</v-toolbar-title>
                    <v-btn icon @click="chatdelete">
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </v-toolbar>
                  <v-card-text>
                    <v-list ref="chat" id="logs">
                      <template v-for="(item, index) in msg">
                        <v-subheader v-if="item" :key="index">{{
                          item.msg
                        }}</v-subheader>
                      </template>
                    </v-list>
                  </v-card-text>
                  <v-card-actions>
                    <v-form @submit.prevent="submit">
                      <v-text-field
                        v-model="newmsg"
                        label="Message"
                        single-line
                        solo-inverted
                      ></v-text-field>
                      <v-btn
                        fab
                        dark
                        small
                        color="teal lighten-3"
                        @click="send"
                      >
                        Send
                      </v-btn>
                    </v-form>
                  </v-card-actions>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-content>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Api from '../services/Api'

export default {
  name: 'Chat',
  data () {
    return {
      rooms: null,
      msg: null,
      newmsg: null,
      roomid: null,
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
  methods: {
    async getMyRooms () {
      const all = await Api.getMyRooms()
      return (this.rooms = all)
    },
    async message (id) {
      this.roomid = id
      const all = await Api.getMessageByRoom(id)
      return (this.msg = all)
    },
    async send () {
      const message = {
        msg: this.newmsg
      }
      await Api.newMsn(this.roomid, message)
        .then(response => {
          this.msg.push(response)
          this.newmsg = ''
        })
        .catch(err => console.log(err))
    },
    chatdelete () {
      Api.deleteRoom(this.roomid).then(res => {
        location.reload()
      })
    }
  },
  mounted () {
    this.getMyRooms()
  }
}
</script>

<style></style>
