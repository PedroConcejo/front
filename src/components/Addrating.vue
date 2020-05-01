<template>
  <div class="pa-2">
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on }">
          <v-btn cblock text rounded class="teal--text" v-on="on"
            >+ Añadir comentario</v-btn
          >
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">Comentario</span>
          </v-card-title>

          <div class="text-center">
            <v-rating
              v-model="rating"
              background-color="orange lighten-3"
              color="orange"
              size="50"
            ></v-rating>
          </div>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-textarea
                    label="Comentario*"
                    v-model="comment"
                    required
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="teal lighten-3" text @click="dialog = false">Close</v-btn>
            <v-btn class="teal lighten-3" text @click="createrating">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
import Api from '../services/Api'

export default {
  data: () => ({
    dialog: false,
    rating: 0,
    comment: null
  }),
  props: {
    ratings: Array
  },
  methods: {
    createrating () {
      const rating = {
        rate: this.rating,
        partner: this.$route.params.partnerid,
        comment: this.comment
      }
      Api.createRating(rating)
        .then(response => {
          this.dialog = false
          this.rating.push(response)
        })
        .catch(err => console.log(err))
    }
  }
}
</script>
