<template>
  <div v-swiper:latestEpSwiper="swiperOption">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(ep, index) in episodes" :key="ep.id" @click="showEp(index)">
        <episode-card-poster :ep="ep"></episode-card-poster>
      </div>
    </div>
    <v-dialog v-model="epDialog" transition="dialog-bottom-transition" scrollable max-width="900px">
      <episode-show-one :ep="ep" :imgStreaming="imgStreaming" @closeDialog="epDialog = false"></episode-show-one>
    </v-dialog>
  </div>
</template>

<script>
import { getImgStreamingByUuid } from '~/assets/js/api'
import EpisodeCardPoster from '~/components/episodes/EpisodeCardPoster'
import EpisodeShowOne from '~/components/episodes/EpisodeShowOne'

export default {
  props: ['episodes'],
  components: { EpisodeCardPoster, EpisodeShowOne },
  methods: {
    async showEp(index) {
      this.epDialog = true
      this.ep = this.episodes[index]
      const res = await getImgStreamingByUuid(this.ep.uuid)
      this.imgStreaming = res.field_img_streaming
    }
  },
  data () {
    return {
      epDialog: false,
      ep: this.episodes[0],
      imgStreaming: null,
      swiperOption: {
        slidesPerView: 3,
        spaceBetween: 50,
        // init: false,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        breakpoints: {
          1024: {
            slidesPerView: 2,
            spaceBetween: 40
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 30
          },
          640: {
            slidesPerView: 1,
            spaceBetween: 20
          },
          320: {
            slidesPerView: 1,
            spaceBetween: 10
          }
        }
      }
    }
  }

}
</script>

