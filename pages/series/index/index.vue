<template>
  <v-layout row wrap justify-center>
    <v-flex x12>
      <serie-card-group :series="series"></serie-card-group>
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
import SerieCardGroup from '~/components/series/SerieCardGroup'
import { getSeriesList } from '~/assets/js/api'

export default {
  components: { SerieCardGroup },
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
    let limit = 10
    const series = await getSeriesList(offset, limit)
    offset += 10
    return { offset, limit, series }
  }
}
</script>
