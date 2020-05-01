<template>
<div>
 <v-card v-for='(rating, idx) in ratings' :key='idx'
    class="ma-5"
    outlined
    rounded
      border="left"
      elevation="5"
      colored-border
    max-width="400"
  >
    <v-card-title>
      <v-avatar color="orange" size="60"  class="elevation-6">
                  <img :src="rating.user.img" />
                </v-avatar>
                <h2 class="ml-3">{{rating.user.name}}</h2>
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
  </v-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    ok: 3
  }),
  props: {
    ratings: Array
  }

}
</script>

<style lang="scss" scoped>

</style>
