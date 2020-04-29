<template>
  <v-card
    class="mx-auto mt-10"
    max-width="400"
  >
    <v-carousel :show-arrows="false">
    <v-carousel-item
      v-for="(img, idx) in partner.img" :key="idx"
      :src="img" reverse-transition="fade-transition"
      transition="fade-transition"
    ></v-carousel-item>
  </v-carousel>

    <v-card-subtitle class="pb-0">{{partner.user.name}}</v-card-subtitle>

    <v-card-text class="text--primary">
      <div>{{partner.user.location.name}}</div>

      <div>{{partner.category.name}}</div>
    </v-card-text>

    <v-card-actions>
      <v-btn
      outlined color="red"
        text
         @click="ver(partner.user._id)"
      >
        Ver
      </v-btn>

    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    partner: Object
  },
  methods: {
    ver (id) {
      this.$router.push(`/partners/${id}`)
    }
  }

}
</script>

<style lang="scss" scoped>

</style>
