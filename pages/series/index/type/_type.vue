<template>
  <v-layout row wrap justify-center>
    <v-flex xs12>
      <v-alert
        :value="true"
        color="warning"
      >
      <h1 class="headline" style="color:black">ซีรีส์เกาหลี แนว{{ $route.params.type }}</h1>
      </v-alert>
    </v-flex>
    <v-flex xs12>
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
import { getSeriesByType } from '~/assets/js/api'
import SerieCardGroup from '~/components/series/SerieCardGroup'

export default {
  components: { SerieCardGroup },
  mounted() {
    window.onscroll = () => {
      let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight
      if (bottomOfWindow) {
        getSeriesByType(this.offset, this.limit, this.type).then(newSeries => {
          this.offset += 10
          for (let i=0;i<newSeries.length;i++) {
            this.series.push(newSeries[i])
          }
        })        
      }
    }
  },
  async asyncData({ params }) {
    let offset = 0
    let limit = 10
    const type = params.type
    const series = await getSeriesByType(offset, limit, type)
    offset += 10
    return { offset, limit, type, series }
  }
}
</script>