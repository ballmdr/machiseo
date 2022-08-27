<template>
  <v-layout row wrap justify-center>
    <h1>ซีรีย์เกาหลี</h1>
    <v-flex x12>
      <serie-card-group :series="series"></serie-card-group>
    </v-flex>
    <v-flex xs12 class="text-xs-center">
      <infinite-loading @infinite="infiniteHandler"></infinite-loading>
    </v-flex>
  </v-layout>
</template>

<script>
import SerieCardGroup from '~/components/series/SerieCardGroup'
import { getSeriesListWithYear } from '~/assets/js/api'

export default {
  components: { SerieCardGroup },
  head () {
    const canonical = `https://www.machiseo.com${this.$route.path}`
    const synopsis = 'เรื่องย่อซีรีย์เกาหลี อ่านสปอยล์รายตอน นักแสดง ตัวละคร'
    const title = 'ซีรีย์เกาหลี ซีรีส์เกาหลี เรื่องย่อ สปอยล์รายตอน นักแสดง ตัวละคร'
    return {
      title: title,
      meta: [
        { hid: 'description', name: 'description', content: synopsis },
      ],
      link: [
        { rel: 'canonical', href: canonical }
      ]
    }
  },
  methods: {
    infiniteHandler($state) {
      if (!this.empty) {
        getSeriesListWithYear(this.offset, this.limit, this.year[this.index]).then(newSeries => {
          this.offset += 9
          if (newSeries.length < this.limit) {
            if (this.index < this.year.length) {
              this.index++
              this.offset = 0
            } else {
              this.empty = true
              $state.complete()
            }
          }
          for (let i = 0; i < newSeries.length; i++) {
            this.series.push(newSeries[i])
          }
          $state.loaded()
        })
      }
    }
  },
  async asyncData () {
    let offset = 0
    let limit = 9
    let empty = false
    let year = ['2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015', '2014', '2013', '2012', '2011', '2010', 'ก่อน%202010']
    let index = 0
    let series = await getSeriesListWithYear(offset, limit, year[index])
    if (series.length < limit) {
      index++
      const seriesMore = await getSeriesListWithYear(offset, limit, year[index])
      series = series.concat(seriesMore)
      if (seriesMore.length < limit) {
        index++
      }
    }
    offset += 9
    return { year, index, empty, offset, limit, series }
  }
}
</script>
