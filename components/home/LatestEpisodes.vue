<template>
  <div v-swiper:latestEpSwiper="swiperOption">
    <div class="swiper-wrapper">
      <div class="swiper-slide">
        <v-card dark color="primary" flat style="cursor:pointer;" @click="$router.push('/episodes')">
          <v-card-title style="height:200px;"><div style="margin:auto;font-size:24px;">ดูทั้งหมด</div></v-card-title>
        </v-card>
      </div>
      <div class="swiper-slide" v-for="ep in episodes" :key="ep.id">
        <episode-card-poster :ep="ep"></episode-card-poster>
      </div>
      <div class="swiper-slide">
        <v-card dark color="primary" flat style="cursor:pointer;" @click="$router.push('/episodes')">
          <v-card-title style="height:200px;"><div style="margin:auto;font-size:24px;">ดูทั้งหมด</div></v-card-title>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
import { getImgStreamingByUuid } from '~/assets/js/api'
import EpisodeCardPoster from '~/components/episodes/EpisodeCardPoster'

export default {
  props: ['episodes'],
  components: { EpisodeCardPoster },
  methods: {
    async showEp (index) {
      this.epDialog = true
      this.ep = this.episodes[index]
      this.currentEp = index
      const res = await getImgStreamingByUuid(this.ep.uuid)
      this.imgStreaming = res.field_img_streaming
    },
    getEpPath (serie_path, ep_title) {
      const link = serie_path
      const path = link.split('/')
      return '/' + path[2] + '/' + ep_title
    }
  },
  data () {
    return {
      epDialog: false,
      ep: this.episodes[0],
      imgStreaming: null,
      currentEp: 0,
      swiperOption: {
        initialSlide: 1,
        slidesPerView: 3.5,
        spaceBetween: 0,
        centeredSlides: false,
        breakpoints: {
          1024: {
            slidesPerView: 2.5,
            spaceBetween: 0
          },
          768: {
            slidesPerView: 2.5,
            spaceBetween: 0
          },
          640: {
            slidesPerView: 1.1,
            spaceBetween: 0
          }
        }
      }
    }
  }

}
</script>

<style scoped>
  .swiper-slide {
    width: 60%;
  }
  .swiper-slide:nth-child(2n) {
      width: 40%;
  }
  .swiper-slide:nth-child(3n) {
      width: 20%;
  }
</style>
