<template>
  <v-layout row wrap>
    <v-flex xs12 sm6 md4 lg3 v-for="serie in series" :key="serie.id" class="margin-block">
      <serie-card :serie="serie"></serie-card>
    </v-flex>
  </v-layout>
</template>

<script>
import SerieCard from '~/components/series/SerieCard'

export default {
  components: { SerieCard },
  props: ['series']
}
</script>

<style scoped>
.margin-block {
  margin-top: -70px;
}
</style>