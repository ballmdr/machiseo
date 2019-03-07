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
      <infinite-loading @infinite="infiniteHandler"></infinite-loading>
    </v-flex>
  </v-layout>
</template>

<script>
import { getSeriesByYear } from '~/assets/js/api'
import SerieCardGroup from '~/components/series/SerieCardGroup'

export default {
  components: { SerieCardGroup },
  methods: {
    infiniteHandler($state) {
      if (!this.empty) {
        getSeriesByYear(this.offset, this.limit, this.year).then(newSeries => {
          this.offset += 9
          if (newSeries.length < this.limit) {
            this.empty = true
            $state.complete()
          }
          for (let i = 0; i < newSeries.length; i++) {
            this.series.push(newSeries[i])
          }
          $state.loaded()
        })
      }
    }
  },
  async asyncData ({ params }) {
    let offset = 0
    let limit = 9
    let empty = false
    const year = params.year
    const series = await getSeriesByYear(offset, limit, year)
    offset += 9
    if (series.length < limit) {
      empty = true
    }
    return { empty, offset, limit, year, series }
  }
}
</script>