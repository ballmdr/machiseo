<template>
  <v-layout row wrap>
    <v-flex xs12 sm6 md5 lg4 v-for="serie in series" :key="serie.id">
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
