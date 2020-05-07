<template>
  <div cols="12" sm="8" md="7" lg="5">
    <Navbar />
    <row>
    <div id="ratings" max-width="400" cols="8" offset="2">
  <v-card v-for='(rating, idx) in ratings' :key='idx'
    outlined
    class="mr-10 mt-10"
    rounded
      border="left"
      elevation="5"
      colored-border
    max-width="400"
  >
    <v-card-title>
      <v-avatar color="orange" size="60"  class="elevation-6">
                  <img :src="rating.partner.img" />
                </v-avatar>
                <h2 class="ml-3">{{rating.partner.name}}</h2>
    </v-card-title>

    <v-card-text class="headline font-weight-bold">
      {{rating.comment}}
    </v-card-text>

    <v-card-actions>
      <v-list-item class="grow">

        <v-list-item-content>
          <v-list-item-title><div class="text-center">
            <v-rating v-model="rating.rate" background-color="orange lighten-3"
      color="orange" readonly></v-rating>
          </div></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-card-actions>
    <v-btn icon @click="ratingdelete(rating._id)">
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
  </v-card>
  </div>
  </row>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Api from '../services/Api'

export default {
  data () {
    return {
      ratings: null
    }
  },
  components: {
    Navbar
  },
  methods: {
    async getMyRating () {
      const user = await Api.getMyRating()
      return (this.ratings = user)
    },
    ratingdelete (id) {
      Api.deleteRating(id).then(res => {
        location.reload()
      })
    }
  },
  mounted () {
    this.getMyRating()
  }
}

</script>

<style lang="scss" scoped>
#ratings {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 10px;
}

</style>
