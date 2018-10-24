<template>
  <v-layout row wrap justify-center>
    <v-flex xs12>
      <v-alert
        :value="true"
        color="warning"
      >
      <h1 class="headline" style="color:black">ซีรีส์เกาหลี ปี {{ $route.params.year }}</h1>
      </v-alert>
    </v-flex>
    <v-flex xs12>
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
import { getSeriesByYear } from '~/assets/js/api'
import SerieCardGroup from '~/components/series/SerieCardGroup'

export default {
  components: { SerieCardGroup },
  mounted() {
    window.onscroll = () => {
      let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight
      if (bottomOfWindow) {
        if (!this.empty) {
          getSeriesByYear(this.offset, this.limit, this.year).then(newSeries => {
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
  async asyncData({ params }) {
    let offset = 0
    let limit = 9
    let empty = false
    const year = params.year
    const series = await getSeriesByYear(offset, limit, year)
    offset += 9
    if (series.length < limit) {
      empty = true
    }
    return { offset, limit, year, series }
  }
}
</script>