<template>
  <v-card
    class="mx-auto mt-10"
    max-width="400"
  >
    <v-img
      class="white--text align-end"
      height="200px"
      src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
    >
    </v-img>

    <v-card-subtitle class="pb-0">{{partner.name}}</v-card-subtitle>

    <v-card-text class="text--primary">
      <div>Whitehaven Beach</div>

      <div>{{partner.location.name}}</div>
    </v-card-text>

    <v-card-actions>
      <v-btn
        color="red"
        text
      >
        Mostrar
      </v-btn>

    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    partner: Object
  }

}
</script>

<style lang="scss" scoped>

</style>
