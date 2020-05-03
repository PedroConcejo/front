<template>
  <v-card class="mr-10 mt-10" max-width="400" elevation="9">
    <v-carousel :show-arrows="false">
      <v-carousel-item
        v-for="(img, idx) in partner.img"
        :key="idx"
        :src="img"
        reverse-transition="fade-transition"
        transition="fade-transition"
      ></v-carousel-item>
    </v-carousel>

    <v-card-title class="headline mb-1">{{ partner.user.name }}</v-card-title>

    <v-card-text class="text--primary">
      <div>{{ partner.category.name }}</div>
      <div>{{ partner.user.location.name }}</div>
    </v-card-text>

    <v-card-actions>
      <v-btn outlined color="teal" text @click="ver(partner.user._id)">
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

<style lang="scss" scoped></style>
