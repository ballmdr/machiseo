<template>
  <v-layout row wrap>
    <v-flex xs12 sm8>
      <v-card class="node-card" flat>
        <v-card-title class="bg-gradient">
          <v-layout row wrap>
            <v-flex xs4 sm3 @click="$router.push(serie.path.alias)" style="cursor:pointer;">
              <v-img contain max-width="150" max-height="200" :src="checkUrl(serie.field_poster[0].uri.url)" class="card-media-img"></v-img>
            </v-flex>
            <v-flex xs8 sm9>
              <nuxt-link :to="serie.path.alias"><h1 class="primary--text">{{ serie.title }}</h1></nuxt-link>
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
          <v-img  style="margin:auto" :src="baseUrl + item.uri.url" ></v-img>
          </v-carousel-item>
        </v-carousel>
        <v-card-text><h1 class="headline">สปอยล์ {{ serie.title }} ตอนที่ {{ ep_title }}</h1></v-card-text>
        <v-card-text v-html="ep_body" style="line-height:30px;">
        </v-card-text>
      </v-card>
      <div id="disqus_thread"></div>
    </v-flex>
    <v-flex xs12 sm4>
     <!--   <v-flex xs6 sm10 v-for="(ep, index) in episodes" :key="ep.id" style="cursor:pointer;margin:auto;" @click="showEp(index)">
          <episode-card :ep="ep"></episode-card>
        </v-flex> -->
      <v-layout row wrap>
        <v-flex xs6 sm10 v-for="ep in episodes" :key="ep.id" style="padding:0px;cursor:pointer;margin-bottom:10px;padding-left:5px;" @click="$router.push(ep.path.alias)">
          <episode-card :ep="ep" ></episode-card>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import { getEpisodesBySerie, getSerieByPath } from '~/assets/js/api'
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
    //console.log(this.episodes)
  },
  async asyncData ({ params, store, env, redirect }) {

    //const episodes = await getAllEpisodesBySeriesPath(params.slug)
    //console.log(params)
    if (params.slug !== 'series' & typeof(params.title) === 'undefined') {
      redirect('/series/' + params.slug)
      return 0
    }
    const  serie = await getSerieByPath(params.slug, env)

    const episodes = await getEpisodesBySerie(serie.id)
    await store.dispatch('episodes/setEpWithData', episodes)
    await store.dispatch('series/setSerie', serie)
    let ep_index = null
    episodes.forEach((el, index) => {
      if (el.title === params.title)
        ep_index = index
    })
    //console.log(episodes)
    //console.log('dd')
    const ep_title = params.title
    const ep_body = episodes[ep_index].body.processed
    const img_streaming = episodes[ep_index].field_img_streaming
    return { episodes, ep_index, serie, ep_title, ep_body, img_streaming }
  },
  head () {
    const canonical = `https://www.machiseo.com${this.$route.path}`
    const synopsis = this.$options.filters.truncate(this.ep_body, 150)
    const image = this.checkUrl(this.episodes[this.ep_index].field_thumbnail.uri.url)
    const title = 'สปอยล์ ' + this.serie.title + ' ตอนที่ ' + this.ep_title
    return {
      title: title,
      meta: [
        { hid: 'description', name: 'description', content: synopsis.replace(/<\/?[^>]+(>|$)/g, "") },
        { property: 'og:type', content: 'article' },
        { property: 'og:title', content: title },
        { property: 'og:description', content: synopsis.replace(/<\/?[^>]+(>|$)/g, "") },
        { property: 'og:image', content: image },
        { property: 'og:image:width', content: "900" },
        { property: 'og:image:height', content: '500' },
        { property: 'og:url', content: canonical },
        { property: 'og:site_name', content: 'มาชิสซอ! Machiseo.com' },
        { hid: 'twitter_title', name: 'twitter:title', content: title },
        { hid: 'twitter_description', name: 'twitter:description', content: synopsis.replace(/<\/?[^>]+(>|$)/g, "") },
        { hid: 'twitter_image', name: 'twitter:image', content: image },
        { hid: 'twitter_site', name: 'twitter:site', content: '@kodhithd' },
        { hid: 'twitter_creator', name: 'twitter:creator', content: '@kodhithd' }
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
      window.scrollTo({ top: 500, behavior: 'smooth' })
    }
  },
}
</script>

<style scoped>
.bg-gradient{
background: rgb(2,0,36);
background: linear-gradient(90deg, rgba(2,0,36,1) 28%, rgba(121,82,179,1) 91%, rgba(121,82,179,1) 100%);
}
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
