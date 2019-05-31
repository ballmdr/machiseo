<template>
  <v-layout row wrap>
    <v-flex class="hvr-reveal" xs12 sm6 md4 v-for="(episode, index) in episodes" :key="episode.id" @click="showEp(index)">
      <episode-card-poster :ep="episode"></episode-card-poster>
    </v-flex>
    <v-flex xs12 class="text-xs-center">
      <infinite-loading @infinite="infiniteHandler"></infinite-loading>
    </v-flex>
    <v-dialog fullscreen  v-model="epDialog" transition="dialog-bottom-transition" scrollable max-width="900px">
      <episode-show-one :ep="ep" :imgStreaming="imgStreaming" @closeDialog="epDialog = false"></episode-show-one>
    </v-dialog>
  </v-layout>
</template>

<script>
import { getAllEpisodes, getImgStreamingByUuid } from '~/assets/js/api'
import EpisodeCardPoster from '~/components/episodes/EpisodeCardPoster'
import EpisodeShowOne from '~/components/episodes/EpisodeShowOne'

export default {
  components: { EpisodeCardPoster, EpisodeShowOne },
  data () {
    return {
      epDialog: false,
      imgStreaming: null,
      baseUrl: process.env.baseUrl
    }
  },
  head () {
    const canonical = `https://www.machiseo.com${this.$route.path}`
    const synopsis = 'สปอยด์ : ' + this.$options.filters.truncate(this.ep.body.processed, 150)
    const title = 'สปอยด์รายตอน - ซีรีส์เกาหลี'
    const image = this.checkUrl(this.ep.field_thumbnail.url)
    return {
      title: title,
      meta: [
        { hid: 'description', name: 'description', content: synopsis },
        { hid: 'og_type', name: 'og:type', content: 'article' },
        { hid: 'og_title', name: 'og:title', content: title + ' - มาชิสซอ' },
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
  methods: {
    checkUrl(url) {
      const link = url.split('://')
      if (link[0] !== 'https'){
        return process.env.cdnUrl + url
      } else {
        return url
      }
    },
    async showEp (index) {
      this.epDialog = true
      this.ep = this.episodes[index]
      const res = await getImgStreamingByUuid(this.ep.uuid)
      this.imgStreaming = res.field_img_streaming
    },
    infiniteHandler($state) {
      if (!this.empty) {
        getAllEpisodes(this.offset, this.limit).then(newEpisodes => {
          this.offset += 9
          if (newEpisodes.length < this.limit) {
            this.empty = true
            $state.complete()
          }
          for (let i = 0; i < newEpisodes.length; i++) {
            this.episodes.push(newEpisodes[i])
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
    const episodes = await getAllEpisodes(offset, limit)
    if (episodes.length < limit) {
      empty = true
    }
    offset += 9
    const ep = episodes[0]
    return { empty, offset, limit, episodes, ep }
  }
}
</script>
