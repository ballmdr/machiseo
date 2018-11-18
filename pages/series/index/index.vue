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
import { getSeriesList, getSeriesListWithYear } from '~/assets/js/api'

export default {
  components: { SerieCardGroup },
  mounted() {
    window.onscroll = () => {
      let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight
      if (bottomOfWindow) {
        if (!this.empty) {
          getSeriesListWithYear(this.offset, this.limit, this.year[this.index]).then(newSeries => {
            this.offset += 9
            if (newSeries.length < this.limit) {
              if (this.index < this.year.length) {
                this.index++
                this.offset = 0
              } else {
                this.empty = true
              }
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
    let year = ['2018', '2017', '2016', '2015', '2014', '2013', '2012', '2011', '2010', 'ก่อน%202010']
    let index = 0
    const series = await getSeriesListWithYear(offset, limit, year[index])
    if (series.length < limit) {
      if (index < year.length) {
        index++
      } else {
        empty = true
      }
    }
    offset += 9
    return { year, index, empty, offset, limit, series }
  }
}
</script>
