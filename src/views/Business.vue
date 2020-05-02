<template>
  <div>
    <Navbar />
     <v-row center>
      <v-col cols="6" offset="3">
        <input type="file" @change="onFileChanged">
<button @click="onUpload">Upload!</button>
        <h2>
          {{ user }}
        </h2>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Api from '../services/Api'

export default {
  name: 'Partner',
  data () {
    return {
      user: {},
      selectedFile: null,
      tab: 0
    }
  },
  components: {
    Navbar
  },
  computed: {
    rate: function () {
      var arr = this.ratings
      var res = []
      for (let i = 0; i < arr.length; i++) {
        res.push(arr[i].rate)
      }
      const finalRating = res.reduce((prev, curr) => {
        return prev + curr
      }, 0)

      return (finalRating / arr.length)
    }
  },
  methods: {
    onFileChanged (event) {
      this.selectedFile = event.target.files[0]
    },
    onUpload () {
    // upload file
    },
    signup () {
      const newUser = {
        name: this.username,
        email: this.email,
        password: this.password,
        location: this.userlocation,
        role: 'partner'
      }

      Api.createStyle(newUser)
        .then(response => {
          localStorage.setItem('token', response.token)
          this.dialog = false
          this.$router.push('/business')
        })
        .catch(err => console.log(err))
    }
  },
  async created () {
    this.user = await Api.getMe()
  }
}

</script>
