<template>
  <v-layout column>
    <v-flex xs12 v-for="celeb in celebs" :key="celeb.id">
        <celeb-card :celeb="celeb"></celeb-card>
    </v-flex>
  </v-layout>
</template>

<script>
import CelebCard from '~/components/celebs/CelebCard'

export default {
  props: ['celebs'],
  components: { CelebCard },
  data () {
    return {

    }
  }
}
</script>y
