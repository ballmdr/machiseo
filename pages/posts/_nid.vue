<template>
  <v-layout row wrap>
   <!-- <v-flex xs12>
      <v-layout row wrap>
        <v-flex xs4>
          <v-img contain max-width="200" class="elevation-6" style="border-radius:12px;" :src="base_url + serie.field_poster[0].url"></v-img>
        </v-flex>
        <v-flex xs1 v-for="celeb in serie.field_celeb" :key=celeb.uuid>
          <v-avatar><v-img :src="base_url + celeb.field_celeb_profile.url"></v-img></v-avatar>
        </v-flex>
      </v-layout>
    </v-flex> -->
    <v-flex xs12>
      <h1>{{ article[0].title }}</h1>
    </v-flex>
    <v-flex xs12 sm10>
      <v-card>
        <v-card-text v-html="article[0].body.processed" class='img-width'></v-card-text>
      </v-card>
    </v-flex>
    <v-flex xs12 sm12 md8 style="margin:auto;">
      <nuxt-link :to="serie.path.alias"><h3>{{ serie.title }}</h3></nuxt-link>
      <v-layout row wrap>
        <v-flex xs4 style="cursor:pointer;" @click="$router.push(serie.path.alias)">
          <v-img contain max-width="150" class="elevation-6" style="border-radius:12px;" :src="checkUrl(serie.field_poster[0].url)"></v-img>
        </v-flex>
        <v-flex xs8>
          <v-layout row wrap>
            <v-flex xs6 v-for="celeb in serie.field_celeb" :key=celeb.uuid>
              <v-avatar><v-img :src="checkUrl(celeb.field_celeb_profile.url)"></v-img></v-avatar> {{ celeb.title | celebTitle  }}
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex xs12 v-if="articles.length > 0">
      <h2>ฉากเด็ดในเรื่อง</h2>
      <articles-list :articles="articles"></articles-list>
    </v-flex>
  </v-layout>
</template>

<script>
import { getArticleById, getSerieCelebByUuid, getSeriesArticlesById } from '~/assets/js/api'
import ArticlesList from '~/components/series/ArticlesList'

export default {
  data () {
    return {

    }
  },
  components: { ArticlesList },
  filters: {
    celebTitle: function (value) {
      if (!value) return ''
      const str = value.split(' ')
      return str[0]
    }
  },
  methods: {
    checkUrl(url) {
      const link = url.split('://')
      if (link[0] !== 'https'){
        return process.env.cdnUrl + url
      } else {
        return url
      }
    }
  },
  head () {
    const canonical = `https://www.machiseo.com${this.$route.path}`
    const synopsis = this.$options.filters.truncate(this.article[0].body.processed, 150)
    const title = this.article[0].title + ' - ' + this.serie.title
    return {
      title: title,
      meta: [
        { hid: 'description', name: 'description', content: synopsis },
        { hid: 'og_type', name: 'og:type', content: 'article' },
        { hid: 'og_title', name: 'og:title', content: title },
        { hid: 'og_description', name: 'og:description', content: synopsis },
        { hid: 'og_image', name: 'og:image', content: this.baseUrl + this.serie.field_poster[0].url },
        { hid: 'og_url', name: 'og:url', content: canonical },
        { hid: 'og_sitename', name: 'og:site_name', content: 'มาชิสซอ Machiseo.com' },
        { hid: 'twitter_title', name: 'twitter:title', content: title },
        { hid: 'twitter_description', name: 'twitter:description', content: synopsis },
        { hid: 'twitter_image', name: 'twitter:image', content: this.baseUrl + this.serie.field_poster[0].url },
        { hid: 'twitter_site', name: 'twitter:site', content: '@machiseo' },
        { hid: 'twitter_creator', name: 'twitter:creator', content: '@machiseo' }
      ],
      link: [
        { rel: 'canonical', href: canonical }
      ]
    }
  },
  mounted() {
    console.log('article', this.article)
    //console.log('serie', this.serie)
  },
  async asyncData ({ app, params, env, store }) {
    const article = await getArticleById(params.nid)
    const serie = await getSerieCelebByUuid(article[0].field_series_main[0].id)
    const articles = await getSeriesArticlesById(serie.nid)
    return { article, serie, articles }
  }
}
</script>

<style >
img{
  width: 100% !important;
}
</style>