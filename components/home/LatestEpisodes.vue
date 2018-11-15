<template>
  <div v-swiper:latestEpSwiper="swiperOption">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="ep in episodes" :key="ep.id">
        <episode-card-poster :ep="ep"></episode-card-poster>
      </div>
    </div>
  </div>
</template>

<script>
import EpisodeCardPoster from '~/components/episodes/EpisodeCardPoster'

export default {
  props: ['episodes'],
  components: { EpisodeCardPoster },
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

