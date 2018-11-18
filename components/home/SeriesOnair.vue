<template>
  <div v-swiper:seriesOnairSwiper="swiperOption">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="serie in series" :key="serie.id">
        <poster-card :serie="serie"></poster-card>
      </div>
    </div>
  </div>
</template>

<script>
import PosterCard from '~/components/series/PosterCard'

export default {
  props: ['series'],
  components: { PosterCard },
  data () {
    return {
      swiperOption: {
        slidesPerView: 5,
        spaceBetween: 50,
        // init: false,
        pagination: {
          el: '.swiper-pagination',
          clickable: false
        },
        breakpoints: {
          1024: {
            slidesPerView: 5,
            spaceBetween: 40
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 30
          },
          640: {
            slidesPerView: 3,
            spaceBetween: 20
          },
          320: {
            slidesPerView: 2,
            spaceBetween: 10
          }
        }
      }
    }
  }
}
</script>
