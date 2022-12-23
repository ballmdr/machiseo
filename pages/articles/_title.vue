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
        <v-card-text v-html="article_body" class='img-width'></v-card-text>
        <div class="addthis_inline_share_toolbox"></div>
      </v-card>
    </v-flex>
    <v-flex xs12 sm10 md8 style="margin:auto;" v-if="serie !== ''">
      <v-card color="purple">
        <v-card-title>
          <nuxt-link :to="serie.path.alias"><h3>{{ serie.title }}</h3></nuxt-link>
        </v-card-title>
        <v-card-text>
          <v-layout row wrap>
            <v-flex xs4 style="cursor:pointer;" @click="$router.push(serie.path.alias)">
              <v-img contain max-width="150" class="elevation-6" style="border-radius:12px;" :src="checkUrl(serie.field_poster[0].uri.url)"></v-img>
            </v-flex>
            <v-flex xs8>
              <v-layout row wrap>
                <v-flex xs6 v-for="celeb in serie.field_celeb" :key=celeb.uuid>
                  <v-avatar><v-img :src="checkUrl(celeb.field_celeb_profile.uri.url)"></v-img></v-avatar> {{ celeb.title | celebTitle  }}
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex xs12 v-if="articles.length > 0">
      <h2>บทความอื่นๆ</h2>
      <articles-list :articles="articles"></articles-list>
    </v-flex>
  </v-layout>
</template>

<script>
import { getArticleById, getSerieCelebByUuid, getSeriesArticlesById, getArticleByPath } from '~/assets/js/api'
import ArticlesList from '~/components/series/ArticlesList'

export default {
  data () {
    return {
      article_body: ''
    }
  },
  components: { ArticlesList },
  filters: {
    celebTitle: function (value) {
      if (!value) return ''
      const str = value.split(' ')
      return str[0]
    },
    bodyFilter: function (value) {
      return value
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
    const title = this.article[0].title
    const image = ''
    return {
      title: title,
      meta: [
        { hid: 'description', name: 'description', content: synopsis },
        { hid: 'og_type', name: 'og:type', property: 'og:type', content: 'article' },
        { hid: 'og_title', name: 'og:title', property: 'og:title', content: title },
        { hid: 'og_description', name: 'og:description', property: 'og:description', content: synopsis },
        { hid: 'og_image', name: 'og:image', property: 'og:image', content: image },
        { hid: 'og_url', name: 'og:url', property: 'og:url', content: canonical },
        { hid: 'og_sitename', name: 'og:site_name', property: 'og:site_name', content: 'โคตรฮิต! Kodhit.com' },
        { hid: 'twitter_title', name: 'twitter:title', content: title },
        { hid: 'twitter_description', name: 'twitter:description', content: synopsis },
        { hid: 'twitter_image', name: 'twitter:image', content: image },
        { hid: 'twitter_site', name: 'twitter:site', content: '@kodhithd' },
        { hid: 'twitter_creator', name: 'twitter:creator', content: '@kodhithd' }
      ],
      link: [
        { rel: 'canonical', href: canonical }
      ]
    }
  },
  mounted() {

    this.article_body = this.article[0].body.processed.replaceAll('/sites/', 'https://www.machiseo.net/sites/')
  },
  async asyncData ({ app, params, env, store }) {
    //console.log('nid', params.nid)
    //console.log('title', params.title)

    //const article = await getArticleById(params.nid)
    const article = await getArticleByPath(params.title)

    let serie = ''
    let articles = []
    if (article[0].field_series_main.length > 0) {
      console.log('>0')
      serie = await getSerieCelebByUuid(article[0].field_series_main[0].id)
      articles = await getSeriesArticlesById(serie.id)
    } else {
      console.log('<0')
    }

    return { article, serie, articles }
  }
}
</script>

<style >
img{
  max-width: 100% !important;
}
</style>
