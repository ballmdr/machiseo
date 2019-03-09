<template>
  <v-card light>
    <v-toolbar flat class="primary white--text font-weight-bold title">สปอยด์ {{ $store.state.series.serie.title }} ตอนที่ {{ $store.state.episodes.ep[currentEp].title }}
      <v-spacer></v-spacer>
      <v-btn icon dark @click="$emit('closeDialog')"><v-icon>far fa-times-circle</v-icon></v-btn>
    </v-toolbar>
    <v-layout :column="$vuetify.breakpoint.smAndDown">
      <v-flex xs8 sm8 md7 style="background-color:white; max-height:220px;">
        <v-carousel hide-delimiters
          style="max-height:280px;"
          next-icon="far fa-arrow-alt-circle-right"
          prev-icon="far fa-arrow-alt-circle-left"
        >
          <v-carousel-item
            style="background-color:black;"
            v-for="(item,i) in $store.state.episodes.ep[currentEp].field_img_streaming"
            :key="i"
          >
          <v-chip color="warning" class="numpic" style="color:black">{{ i+1 }}/{{$store.state.episodes.ep[currentEp].field_img_streaming.length}}</v-chip>
          <v-img :src="baseUrl + item.url" style="max-width:500px;margin:auto;"></v-img>
          </v-carousel-item>
        </v-carousel>
      </v-flex>
      <v-flex xs8 sm8 md5 style="overflow:auto;" id="ep-show-container">
        <v-card-text style="padding:25px;">
          <p v-html="$store.state.episodes.ep[currentEp].body.processed"></p>
        </v-card-text>
      </v-flex>
    </v-layout>
    <v-card-actions class="primary white--text">
      <v-spacer></v-spacer>
      <v-btn v-if="currentEp !== $store.state.episodes.ep.length - 1" round @click="currentEp++">ตอนที่แล้ว&nbsp;<v-icon>far fa-hand-point-left</v-icon></v-btn>
      <v-btn v-if="currentEp !== 0" round @click="currentEp--"><v-icon>far fa-hand-point-right</v-icon>&nbsp;ตอนต่อไป</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: ['currentEp'],
  data () {
    return {
      baseUrl: process.env.baseUrl
    }
  },
  watch: {
    currentEp () {
      let container = this.$el.querySelector('#ep-show-container')
      container.scrollTop = 0
    }
  }
}
</script>

<style scoped>

@media only screen and (min-width: 200px) {
  .v-carousel {
    max-height: 210px !important;
  }
  .v-carousel .numpic {
    position: absolute;
    top: 150px !important;
    left: 80% !important;
    z-index: 5;
    font-size:12px;
  }
  .v-window-item{
    height: 280px !important;
  }
  .v-image{
    max-width: 300px !important;
    height: 200px !important;
  }
}

@media only screen and (min-width: 400px) {
  .v-carousel {
    max-height: 230px !important;
  }
  .v-carousel .numpic {
    position: absolute;
    top: 160px !important;
    left: 80% !important;
    z-index: 5;
    font-size:12px;
  }
}

@media only screen and (min-width: 768px) {
  .v-carousel {
    max-height: 280px !important;
  }
  .v-carousel .numpic {
    position: absolute;
    top: 220px !important;
    left: 80% !important;
    z-index: 5;
    font-size:12px;
  }
  .v-image{
    max-width: 400px !important;
    height: 280px !important;
  }
}

@media only screen and (min-width: 1024px) {
  .v-carousel {
    max-height: 1000px !important;
  }
  .v-carousel .numpic {
    position: absolute;
    top: 40% !important;
    left: 85% !important;
    z-index: 5;
    font-size:16px;
  }
  .v-window-item{
    height:1000px !important;
  }
  .v-image{
    width: 100% !important;
    max-width: 850px !important;
    height: 500px !important;
  }
}

</style>