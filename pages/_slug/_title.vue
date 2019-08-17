<template>
  <v-layout row wrap>
    <v-flex xs12 sm8>
      <v-card class="node-card" light>
        <v-card-title class="grey">
          <v-layout row wrap>
            <v-flex xs4 sm3 @click="$router.push(serie.path.alias)" style="cursor:pointer;">
              <v-img contain max-width="150" max-height="200" :src="checkUrl(serie.field_poster[0].url)" class="card-media-img"></v-img>
            </v-flex>
            <v-flex xs8 sm9>
              <nuxt-link :to="serie.path.alias"><h2 class="primary--text">{{ serie.title }}</h2></nuxt-link>
              <small v-html="serie.body.processed"></small>
            </v-flex>
          </v-layout>
        </v-card-title>
        <hr />
        <v-carousel hide-delimiters
          v-model="num_pic"
        >
          <v-carousel-item
            style="background-color:black;"
            v-for="(item,i) in img_streaming"
            :key="i"
          >
          <v-chip color="warning" class="numpic" style="color:black">{{ i+1 }}/{{ episodes[ep_index].field_img_streaming.length }}</v-chip>
          <v-img style="margin:auto" :src="baseUrl + item.url" ></v-img>
          </v-carousel-item>
        </v-carousel>
        <v-card-text><h1 class="headline black--text">สปอยด์ {{ serie.title }} ตอนที่ {{ ep_title }}</h1></v-card-text>
        <v-card-text v-html="ep_body"></v-card-text>
      </v-card>
    </v-flex>
    <v-flex xs12 sm4>
      <v-layout row wrap>
        <v-flex xs12>
          <adsbygoogle />
        </v-flex>
        <v-flex xs6 sm10 v-for="(ep, index) in episodes" :key="ep.id" style="cursor:pointer;margin:auto;" @click="showEp(index)">
          <episode-card :ep="ep"></episode-card>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import { getAllEpisodesBySeriesPath, getSerieByPath } from '~/assets/js/api'
import EpisodeCard from '~/components/episodes/EpisodeCard'

export default {
  components: { EpisodeCard },
  data () {
    return {
      baseUrl: process.env.baseUrl,
      num_pic: 0,
    }
  },
  mounted(){
    console.log(this.episodes)
  },
  async asyncData ({ params, store, env }) {
    const episodes = await getAllEpisodesBySeriesPath(params.slug)
    const serie = await getSerieByPath(params.slug, env)
    await store.dispatch('episodes/setEpWithData', episodes)
    await store.dispatch('series/setSerie', serie)
    let ep_index = null
    episodes.forEach((el, index) => {
      if (el.title === params.title)
        ep_index = index
    })
    const ep_title = params.title
    const ep_body = episodes[ep_index].body.processed
    const img_streaming = episodes[ep_index].field_img_streaming
    return { episodes, ep_index, serie, ep_title, ep_body, img_streaming }
  },
  head () {
    const canonical = `https://www.machiseo.com${this.$route.path}`
    const synopsis = this.$options.filters.truncate(this.ep_body, 150)
    const image = this.checkUrl(this.episodes[this.ep_index].field_thumbnail.url)
    const title = 'สปอยด์ ' + this.serie.title + ' ตอนที่ ' + this.ep_title
    return {
      title: title,
      meta: [
        { hid: 'description', name: 'description', content: synopsis },
        { hid: 'og_type', name: 'og:type', content: 'article' },
        { hid: 'og_title', name: 'og:title', content: title },
        { hid: 'og_description', name: 'og:description', content: synopsis },
        { hid: 'og_image', name: 'og:image', content: image },
        { hid: 'og_url', name: 'og:url', content: canonical },
        { hid: 'og_sitename', name: 'og:site_name', content: 'มาชิสซอ Machiseo.com' },
        { hid: 'twitter_title', name: 'twitter:title', content: title },
        { hid: 'twitter_description', name: 'twitter:description', content: synopsis },
        { hid: 'twitter_image', name: 'twitter:image', content: image },
        { hid: 'twitter_site', name: 'twitter:site', content: '@machiseo' },
        { hid: 'twitter_creator', name: 'twitter:creator', content: '@machiseo' }
      ],
      link: [
        { rel: 'canonical', href: canonical }
      ]
    }
  },
  methods:{
    checkUrl(url) {
      const link = url.split('://')
      if (link[0] !== 'https'){
        return process.env.cdnUrl + url
      } else {
        return url
      }
    },
    showEp (index) {
      this.ep_title = this.episodes[index].title
      this.ep_body = this.episodes[index].body.processed
      this.img_streaming = this.episodes[index].field_img_streaming
      this.num_pic = 0
      //window.scrollTo(0,0, behavior: 'smooth')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  },
}
</script>

<style scoped>
.poster-right{
  text-align: right;
}
.node-card{
  padding: 5px;
}
.node-title{
  padding: 20px;
}
@media only screen and (min-width: 200px) {
  .v-carousel {
    max-height: 210px !important;
  }
  .v-carousel .numpic {
    position: absolute;
    top: 150px !important;
    left: 80% !important;
    z-index: 5;
    font-size:12px;
  }
  .v-window-item{
    height: 280px !important;
  }
  .v-image{
    max-width: 300px !important;
    height: 200px !important;
  }
}

@media only screen and (min-width: 400px) {
  .v-carousel {
    max-height: 230px !important;
  }
  .v-carousel .numpic {
    position: absolute;
    top: 160px !important;
    left: 80% !important;
    z-index: 5;
    font-size:12px;
  }
}

@media only screen and (min-width: 768px) {
  .v-carousel {
    max-height: 280px !important;
  }
  .v-carousel .numpic {
    position: absolute;
    top: 220px !important;
    left: 80% !important;
    z-index: 5;
    font-size:12px;
  }
  .v-image{
    max-width: 400px !important;
    height: 280px !important;
  }
}

@media only screen and (min-width: 1024px) {
  .v-carousel {
    max-height: 1000px !important;
  }
  .v-carousel .numpic {
    position: absolute;
    top: 40% !important;
    left: 85% !important;
    z-index: 5;
    font-size:16px;
  }
  .v-window-item{
    height:1000px !important;
  }
  .v-image{
    width: 100% !important;
    max-width: 850px !important;
    height: 500px !important;
  }
}
</style>