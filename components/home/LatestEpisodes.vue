<template>
  <div v-swiper:latestEpSwiper="swiperOption">
    <div class="swiper-wrapper">
      <div class="swiper-slide">
        <v-card dark color="primary" flat style="cursor:pointer;" @click="$router.push('/episodes')">
          <v-card-title style="height:200px;"><div style="margin:auto;font-size:24px;">ดูทั้งหมด</div></v-card-title>
        </v-card>
      </div>
      <div class="swiper-slide" v-for="(ep, index) in episodes" :key="ep.id" @click="showEp(index)">
        <episode-card-poster :ep="ep"></episode-card-poster>
      </div>
      <div class="swiper-slide">
        <v-card dark color="primary" flat style="cursor:pointer;" @click="$router.push('/episodes')">
          <v-card-title style="height:200px;"><div style="margin:auto;font-size:24px;">ดูทั้งหมด</div></v-card-title>
        </v-card>
      </div>
    </div>
    <v-dialog v-model="epDialog" transition="dialog-bottom-transition" scrollable max-width="900px">
      <episode-show-one :currentEp="currentEp" :ep="ep" :imgStreaming="imgStreaming" @closeDialog="epDialog = false"></episode-show-one>
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
      this.currentEp = index
      const res = await getImgStreamingByUuid(this.ep.uuid)
      this.imgStreaming = res.field_img_streaming
    }
  },
  data () {
    return {
      epDialog: false,
      ep: this.episodes[0],
      imgStreaming: null,
      currentEp: 0,
      swiperOption: {
        initialSlide: 2,
        slidesPerView: 3.5,
        spaceBetween: 30,
        centeredSlides: true,
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