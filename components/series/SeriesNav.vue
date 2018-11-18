<template>
  <v-layout column justify-center>
    <v-flex xs12 class="text-xs-center">
      <v-menu open-on-hover down offset-y>
        <v-btn
          round
          slot="activator"
          color="warning"
          dark
          class="black--text"
        >แนวซีรีส์
        </v-btn>
        <v-list>
          <v-list-tile
            v-for="type in seriesType"
            :key="type.id"
          >
          <v-btn flat style="width:100%;margin:0" nuxt :to="'/series/type/' + type.name">{{ type.name }}</v-btn>
          </v-list-tile>
        </v-list>
      </v-menu>
      <v-menu open-on-hover down offset-y>
        <v-btn
        round
          slot="activator"
          color="warning"
          dark
          class="black--text"
        >
          ปีที่เริ่มฉาย
        </v-btn>
        <v-list>
          <v-list-tile
            v-for="year in seriesYear"
            :key="year.id"
          >
            <v-btn flat style="width:100%;margin:0" nuxt :to="'/series/year/' + year.name">{{ year.name }}</v-btn>
          </v-list-tile>
        </v-list>
      </v-menu>
          <v-menu open-on-hover down offset-y>
        <v-btn
        round
          slot="activator"
          color="warning"
          dark
          class="black--text"
        >
          ช่องที่ฉาย
        </v-btn>
        <v-list>
          <v-list-tile
            v-for="channel in seriesChannel"
            :key="channel.id"
          >
            <v-btn flat style="width:100%;margin:0" nuxt :to="'/series/channel/' + channel.name">{{ channel.name }}</v-btn>
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
