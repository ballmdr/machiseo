<template>
  <div v-swiper:latestEpSwiper="swiperOption">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="ep in episodes" :key="ep.id">
        <episode-card :ep="ep"></episode-card>
      </div>
    </div>
  </div>
</template>

<script>
import EpisodeCard from '~/components/episodes/EpisodeCard'

export default {
  props: ['episodes'],
  components: { EpisodeCard },
  data () {
    return {
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

