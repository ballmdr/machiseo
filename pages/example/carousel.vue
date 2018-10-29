<template>
  <div >
    <div v-swiper:mySwiper="swiperOption">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(banner, index) in banners" :key="index">
        <v-avatar size="250"><v-img :src="banner"></v-img></v-avatar>
      </div>
    </div>
    <div class="swiper-pagination swiper-pagination-bullets"></div>
  </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        banners: [
          'http://machiseo.com:8080/sites/default/files/2018-09/lee-joon-gi-540x683.jpg',
          'http://machiseo.com:8080/sites/default/files/2018-09/lee-joon-gi-540x683.jpg',
          'http://machiseo.com:8080/sites/default/files/2018-09/lee-joon-gi-540x683.jpg'
        ],
        swiperOption: {
          loop: true,
          slidesPerView: 'auto',
          centeredSlides: true,
          spaceBetween: 30,
          pagination: {
            el: '.swiper-pagination',
            dynamicBullets: true
          },
          on: {
            slideChange() {
              console.log('onSlideChangeEnd', this);
            },
            tap() {
              console.log('onTap', this);
            }
          }
        }
      }
    },
    mounted() {
      console.log('app init', this)
      setTimeout(() => {
        this.banners.push('/5.jpg')
        console.log('banners update')
      }, 3000)
      console.log(
        'This is current swiper instance object', this.mySwiper, 
        'I will slideTo banners 3')
       this.mySwiper.slideTo(3)
    }
  
  }
</script>

<style scoped>

</style>