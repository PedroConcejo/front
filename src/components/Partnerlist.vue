<template>
  <div id="partners">
    <Partnercard v-for="partner in partners" :key="partner._id" :partner="partner" />
  </div>
</template>

<script>
import Partnercard from './Partnercard.vue'

export default {
  name: 'Partnerlist',
  props: {
    partners: Array
  },
  components: {
    Partnercard
  }
}
</script>

<style lang="scss" scoped>
#partners {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 10px;
}
#error-msg {
  font-size: 2rem;
  text-align: center;
  margin-top: 30vh;
  opacity: 0.5;
}
</style>
