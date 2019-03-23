<template>
  <v-layout row wrap justify-center>
    <v-flex xs12 style="margin-bottom:55px;">
      <series-nav></series-nav>
    </v-flex>
    <v-flex xs12>
      <nuxt-child :key="$route.params.term" />
    </v-flex>
  </v-layout>
</template>

<script>
import SeriesNav from '~/components/series/SeriesNav'

export default {
  components: { SeriesNav }
}
</script>
