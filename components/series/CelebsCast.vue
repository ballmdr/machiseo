<template>
  <div v-swiper:mySwiper="swiperOption">
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
    props: ['celebs'],
    components: { CelebCard },
    mounted () {
      //console.log(this.celebs)
    },
    data () {
      return {
        swiperOption: {
          slidesPerView: 5,
          spaceBetween: 30,
          // init: false,
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
          breakpoints: {
            1024: {
              slidesPerView: 4,
              spaceBetween: 30
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
