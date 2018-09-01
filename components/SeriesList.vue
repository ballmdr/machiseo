<template>
  <v-layout row wrap>
    <v-flex d-flex xs6 sm4 md3 lg2 v-for="(serie, key) in series" :key="key">
      <SerieCard :serie="serie" />
    </v-flex>
  </v-layout>
</template>

<script>
import SerieCard from '~/components/SerieCard'

export default {
  components: { SerieCard },
  props: ['series']
}
</script>
