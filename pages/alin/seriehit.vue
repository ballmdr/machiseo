<template>
  <v-form>
    <v-layout row>
      <v-flex xs12 class="text-xs-right">
        <div v-for="(serie, index) in series" :key="index">
          <v-layout row>
            <v-flex xs1 class="text-xs-right"><v-text-field v-model="serie.rank"></v-text-field></v-flex>
            <v-flex xs4><v-text-field v-model="serie.path" label="path"></v-text-field></v-flex>
            <v-flex xs1><v-text-field v-model="serie.score" label="score %"></v-text-field></v-flex>
            <v-flex xs4><v-text-field v-model="serie.cover" label="Cover"></v-text-field></v-flex>
            <v-flex xs1><v-btn flat small color="warning" round @click="del(index)">ลบ</v-btn></v-flex>
            <v-flex xs5><span v-text="serie.title"></span></v-flex>
          </v-layout>
          <v-divider></v-divider>
        </div>
        <v-btn color="primary" round @click="addSerie">เพิ่มซีรีส์</v-btn>
        <v-btn color="warning" round @click="serieHitSave"><span class="black--text">บันทึก</span></v-btn>
      </v-flex>
    </v-layout>
  </v-form>
</template>

<script>
import { getSerieCelebByUuid } from '~/assets/js/api'

export default {
  data () {
    return {
      series: []
    }
  },
  async asyncData ({ app }) {
    const { data } = await app.$axios.get(process.env.restMongoUrl + '/series_hit')
    const series = data
    return { series }
  },
  methods: {
    del (index) {
      this.series.splice(index, 1)
    },
    addSerie () {
      this.series.push({ path: '', score: '', rank: '', cover: '' })
    },
    async serieHitSave () {
      console.log(this.series)
      for (let i = 0; i < this.series.length; i++) {
        this.series[i].path = '/series/' + this.series[i].path.split('/series/')[1]

        const router = await this.$axios.get('/router/translate-path?path=' + this.series[i].path)
        const res = await getSerieCelebByUuid(router.data.entity.uuid)
        console.log('res', res)
        this.series[i].title = res.title
        this.series[i].uuid = res.id
        this.series[i].nid = res.nid
        this.series[i].poster = res.field_poster[0].uri.url
        this.series[i].topic_id = res.field_topic
        this.series[i].celebs = res.field_celeb
        this.series[i].cover = res.field_poster[0].uri.url
        // let celeb_length = Object.keys(this.series[i].celebs).length
        // if (celeb_length > 4) {
        //   celeb_length = 4
        // }

        // this.series[i].celebs = []
        // for  (let j = 0;j < celeb_length; j++) {
        //   this.series[i].celebs.push(
        //     {
        //       uuid: res.field_celeb[j].uuid,
        //       profile: res.field_celeb[j].field_celeb_profile.uri.url,
        //       path: res.field_celeb[j].path.alias,
        //       title: res.field_celeb[j].title
        //     }
        //   )
        // }
      }
      await this.$axios.get(process.env.restMongoUrl + '/series_hit/clear')
      await this.$axios.post(process.env.restMongoUrl + '/series_hit/save', this.series)
      const { data } = await this.$axios.get(process.env.restMongoUrl + '/series_hit')
      this.series = data
      
    }
  }
}
</script>
