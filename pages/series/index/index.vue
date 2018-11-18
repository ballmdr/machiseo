<template>
  <v-layout row wrap justify-center>
    <v-flex x12>
      <serie-card-group :series="series"></serie-card-group>
    </v-flex>
    <v-flex xs12 class="text-xs-center">
      <v-progress-circular v-if="!empty"
        indeterminate
        color="amber"
      ></v-progress-circular>
      <v-icon v-else>remove_circle_outline</v-icon>
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
        if (!this.empty) {
          getSeriesList(this.offset, this.limit).then(newSeries => {
            this.offset += 9
            if (newSeries.length < this.limit) {
              this.empty = true
            }
            for (let i=0;i<newSeries.length;i++) {
              this.series.push(newSeries[i])
            }
          })      
        }
      }
    }
  },
  async asyncData() {
    let offset = 0
    let limit = 9
    let empty = false
    const series = await getSeriesList(offset, limit)
    if (series.length < limit) {
      empty = true 
    }
    offset += 9
    return { empty, offset, limit, series }
  }
}
</script>
