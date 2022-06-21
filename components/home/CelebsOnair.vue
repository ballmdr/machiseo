<template>
  <div v-swiper:celebOnairSwiper="swiperOption">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="celeb in celebs" :key="celeb.id">
        <celeb-card :celeb="celeb"></celeb-card>
      </div>
    </div>
  </div>
</template>

<script>
import CelebCard from '~/components/celebs/CelebCard'

export default {
  components: { CelebCard },
  props: ['series'],
  mounted () {
    for (let i = 0; i < this.series.length; i++) {
      if (this.series[i].field_celeb.length > 0) {
        this.celebs.push(this.series[i].field_celeb[0])
        if (typeof this.series[i].field_celeb[1] !== 'undefined') {
          this.celebs.push(this.series[i].field_celeb[1])
        }
      }
    }
  },
  data () {
    return {
      celebs: [],
      swiperOption: {
        slidesPerView: 5,
        spaceBetween: 50,
        // init: false,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        breakpoints: {
          1024: {
            slidesPerView: 4,
            spaceBetween: 40
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 30
          },
          640: {
            slidesPerView: 2,
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
