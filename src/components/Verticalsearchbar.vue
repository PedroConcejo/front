<template>
  <v-card class="mx-auto" width="300">
    <v-list>
      <v-list-item>
        <v-list-item-title>SEARCH FOR A WALLPAPER</v-list-item-title>
      </v-list-item>

      <v-container>
        <v-row>
          <v-col cols="12">
            <input @keyup="search" v-model="author" placeholder="Seach Author" />
            <button>Search</button>
          </v-col>
        </v-row>
      </v-container>

      <v-container fluid>
        <p>Wallpaper Width:</p>

        <v-radio-group column>
          <v-radio label="0 - 3000" value="3000" @click="filterByWidth(3000)" ></v-radio>
          <v-radio label="3000 - 5000" value="5000" @click="filterByWidth(5000)"></v-radio>
          <v-radio label="+ 5000" value="8000" @click="filterByWidth(8000)"></v-radio>
        </v-radio-group>
      </v-container>

      <v-container fluid>
        <p>Wallpaper Height:</p>
        <v-radio-group v-model="height" :mandatory="false">
          <v-radio label="0 - 3000" value="3000" @click="filterByHeight(3000)"></v-radio>
          <v-radio label="3000 - 5000" value="5000" @click="filterByHeight(5000)"></v-radio>
          <v-radio label="+ 5000" value="8000" @click="filterByHeight(8000)"></v-radio>
        </v-radio-group>
      </v-container>
    </v-list>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    author: '',
    actualauthor: '',
    width: '',
    height: ''
  }),
  methods: {
    search () {
      this.$emit('search', this.author)
    },
    filterByWidth (width) {
      this.$emit('filterByWidth', width, this.height)
    },
    filterByHeight (height) {
      this.$emit('filterByHeight', height)
    }
  }
}
</script>

<style scooped>
</style>
