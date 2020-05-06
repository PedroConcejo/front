<template>
  <v-card class="mx-auto" width="300" elevation="10">
    <v-list>
      <v-list-item>
        <v-list-item-title>  <v-btn class="ma-2" outlined color="teal" @click="search"
          >Buscar</v-btn
        ></v-list-item-title>
      </v-list-item>

      <v-form>
        <v-container>
          <v-row>
            <v-col cols="12">
             <input @keyup="search" v-model="user" placeholder="Buscar por Nombre" />
            </v-col>
          </v-row>
        </v-container>
      </v-form>
      <v-container fluid>
        <p>Tipo de Sesion:</p>
          <v-select
        outlined
          :items="categories"
          label="Tipo de Sesion"
          name="category"
          v-model="categoryfilter"
          item-text="name"
          color='teal'
        ></v-select>
      </v-container>

      <v-container fluid>
        <p>Ubicacion:</p>
         <v-select
        outlined
          :items="location"
          label="Ubicacion"
          name="location"
          v-model="locationfilter"
          item-text="name"
          color='teal'
        ></v-select>
      </v-container>
    </v-list>
  </v-card>
</template>

<script>

export default {
  data: () => ({
    categoryfilter: '',
    locationfilter: '',
    user: ''
  }),
  props: {
    location: Array,
    categories: Array
  },
  methods: {
    search () {
      this.$emit('search', this.user, this.categoryfilter, this.locationfilter)
    }
  }
}
</script>

<style scooped>
.weekDays-selector input {
  display: none !important;
}

.weekDays-selector input[type="checkbox"] + label {
  display: inline-block;
  border-radius: 6px;
  background: #dddddd;
  height: 40px;
  width: 30px;
  margin-right: 3px;
  line-height: 40px;
  text-align: center;
  cursor: pointer;
}

.weekDays-selector input[type="checkbox"]:checked + label {
  background: #2ad705;
  color: #ffffff;
}
</style>
