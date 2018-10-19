<template>
  <v-layout column justify-center>
    <v-flex xs12 class="text-xs-center">
      <v-menu open-on-hover down offset-y>
        <v-btn
          slot="activator"
          color="primary"
          dark
        >
            แนวซีรีส์
        </v-btn>
        <v-list>
          <v-list-tile
            v-for="type in seriesType"
            :key="type.id"
            style="cursor:pointer"
          >
            <v-list-tile-title><nuxt-link :to="'/series/type/' + type.name">{{ type.name }}</nuxt-link></v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
      <v-menu open-on-hover down offset-y>
        <v-btn
          slot="activator"
          color="primary"
          dark
        >
          ปีที่เริ่มออนแอร์
        </v-btn>
        <v-list>
          <v-list-tile
            v-for="year in seriesYear"
            :key="year.id"
            style="cursor:pointer"
          >
            <v-list-tile-title><nuxt-link :to="'/series/year/' + year.name">{{ year.name }}</nuxt-link></v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
            <v-menu open-on-hover down offset-y>
        <v-btn
          slot="activator"
          color="primary"
          dark
        >
          ช่องที่ฉาย
        </v-btn>
        <v-list>
          <v-list-tile
            v-for="channel in seriesChannel"
            :key="channel.id"
            style="cursor:pointer"
          >
            <v-list-tile-title><nuxt-link :to="'/series/channel/' + channel.name">{{ channel.name }}</nuxt-link></v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-flex>
  </v-layout>
</template>

<script>
import { getSeriesType, getSeriesYear, getSeriesChannel } from '~/assets/js/api'

export default {
  data () {
    return {
      seriesType: [],
      seriesYear: [],
      seriesChannel: []
    }
  },
  mounted() {
    getSeriesType().then(seriesType => {
      this.seriesType = seriesType
    })
    getSeriesYear().then(seriesYear => {
      this.seriesYear = seriesYear
    })
    getSeriesChannel().then(seriesChannel => {
      this.seriesChannel = seriesChannel
    })
  }
}
</script>

<style scoped>
.myactive {
  background-color: white;
}
</style>
