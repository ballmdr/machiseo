<template>
  <v-layout row justify-center>
    <v-btn round flat large color="warning">ปี</v-btn>
    <v-btn round flat large color="warning">ช่อง</v-btn>
    <v-btn round flat large color="warning">ประเภท</v-btn>
  </v-layout>
</template>

<script>
export default {
  async asyncData({ app }) {
    const year = await app.$axios.$get('/jsonapi/taxonomy_term/serie_year')
    console.log(year)
  }
}
</script>
