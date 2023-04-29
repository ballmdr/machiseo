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
        slidesPerView: 5.5,
        spaceBetween: 10,
        // init: false,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        breakpoints: {
          1024: {
            slidesPerView: 4.5,
          },
          768: {
            slidesPerView: 3.5,
          },
          640: {
            slidesPerView: 3.5,
            spaceBetween: 5
          }
        }
      }
    }
  }
}
</script>
