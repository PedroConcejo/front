<template>
  <div cols="12" sm="8" md="7" lg="5">
    <Navbar />
    <Partnerlist :partners="partners" />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Api from '../services/Api'
import Partnerlist from '@/components/Partnerlist.vue'

export default {
  name: 'Profile',
  data () {
    return {
      partners: []
    }
  },
  components: {
    Navbar,
    Partnerlist

  },
  methods: {

  },
  async created () {
    this.partners = await Api.getMyFavDisplay()
  }
}
</script>

<style lang="scss" scoped></style>
