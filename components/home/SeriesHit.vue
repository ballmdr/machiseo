<template>
  <v-layout row wrap justify-center align-center>
    <v-flex d-flex xs6 sm5 md4 lg4 v-for="serie in seriesHit" :key="serie.uuid" >
      <series-hit-card :serie="serie"></series-hit-card>
    </v-flex>
  </v-layout>
</template>

<script>
import SeriesHitCard from '~/components/home/SeriesHitCard'

export default {
  props: ['seriesHit'],
  components: { SeriesHitCard }
}
</script>

<style scoped>

</style>