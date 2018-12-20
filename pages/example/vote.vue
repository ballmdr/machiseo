<template>
  <v-layout column>
    <v-flex xs12>
      <v-form>
        <v-text-field v-model="path" label="path"></v-text-field>
        <v-btn color="primary" round @click="addSerie">เพิ่มซีรีส์</v-btn>
      </v-form>
    </v-flex>
    <v-flex xs12>
      <v-container>
        <v-layout row wrap>
          <v-flex xs3 v-for="serie in series" :key="serie.id">
            <v-img style="border-radius:10px;" :src="baseUrl + serie.poster"></v-img>
            <div v-text="serie.title"></div>
          </v-flex>
        </v-layout>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
import { getSerieObj } from '~/assets/js/util'
import { getSerieByUuid } from '~/assets/js/api'

export default {
  data () {
    return {
      path: '',
      baseUrl: process.env.baseUrl
    }
  },
  methods: {
    async addSerie () {
      if (this.path === '') {
        this.$toast.error('ยังไม่ใส่ Path')
      } else {
        const router = await this.$axios.get('/router/translate-path?path=' + this.path)
        let serie = await getSerieByUuid(router.data.entity.uuid, '?include=field_poster')
        serie = getSerieObj(serie)
        try {
          await this.$axios.$post(process.env.voteServer + '/vote/final/series/add', serie)
          this.$toast.success('เพิ่มแล้ว')
          this.path = ''
          this.series.unshift(serie)
        } catch (e) {
          this.$toast.error('ERROR')
        }
      }
    }
  },
  async asyncData ({ app, env }) {
    const series = await app.$axios.$get(env.voteServer + '/vote/final/series')
    return { series }
  }
}
</script>
