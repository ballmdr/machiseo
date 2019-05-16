<template>
  <v-layout row wrap>
    
    <v-flex xs12>
      <v-layout row wrap>
        <v-flex xs4>
          <v-img contain max-width="200" class="elevation-6" style="border-radius:12px;" :src="base_url + serie.field_poster[0].url"></v-img>
        </v-flex>
        <v-flex xs1 v-for="celeb in serie.field_celeb" :key=celeb.uuid>
          <v-avatar><v-img :src="base_url + celeb.field_celeb_profile.url"></v-img></v-avatar>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex xs12>
      <h1>{{ article[0].title }}</h1>
    </v-flex>
    <v-flex xs10>
      <v-card>
        <v-card-text v-html="article[0].body.processed"></v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { getArticleById, getSerieCelebByUuid } from '~/assets/js/api'

export default {
  data () {
    return {
      base_url: process.env.baseUrl
    }
  },
  mounted() {
    //console.log('article', this.article)
    //console.log('serie', this.serie)
  },
  async asyncData ({ app, params, env, store }) {
    const article = await getArticleById(params.nid)
    const serie = await getSerieCelebByUuid(article[0].field_series_main[0].id)
    return { article, serie }
  }
}
</script>
