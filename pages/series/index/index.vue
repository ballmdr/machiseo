<template>
  <v-layout row wrap justify-center>
    <v-flex xs12 sm6 md5 lg4 v-for="serie in series" :key="serie.id">
      <serie-card :serie="serie"></serie-card>
    </v-flex>
    <v-flex xs12 class="text-xs-center">
      <v-progress-circular
        indeterminate
        color="amber"
      ></v-progress-circular>
    </v-flex>
  </v-layout>
</template>

<script>
import SerieCard from '~/components/series/SerieCard'
import { getSeriesList } from '~/assets/js/api'

export default {
  layout: 'browse',
  components: { SerieCard },
  data () {
    return {
      limit: 10
    }
  },
  mounted() {
    window.onscroll = () => {
      let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight
      if (bottomOfWindow) {
        getSeriesList(this.offset, this.limit).then(newSeries => {
          this.offset += 10
          for (let i=0;i<newSeries.length;i++) {
            this.series.push(newSeries[i])
          }
        })        
      }
    }
  },
  async asyncData() {
    let offset = 0
    const series = await getSeriesList(offset)
    offset += 10
    return { offset, series }
  }
}
</script>
