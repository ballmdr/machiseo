<template>
  <v-card light>
    <v-toolbar flat class="primary white--text font-weight-bold title">สปอยด์ {{ $store.state.series.serie.title }} ตอนที่ {{ $store.state.episodes.ep[currentEp].title }}
      <v-spacer></v-spacer>
      <v-btn icon dark @click="$emit('closeDialog')"><v-icon>far fa-times-circle</v-icon></v-btn>
    </v-toolbar>
    <v-layout column>
      <v-flex xs8>
        <v-carousel style="max-height:280px;" hide-delimiters
        next-icon="far fa-arrow-alt-circle-right"
        prev-icon="far fa-arrow-alt-circle-left"
        >
          <v-carousel-item
            style="background-color:black;"
            v-for="(item,i) in $store.state.episodes.ep[currentEp].field_img_streaming"
            :key="i"
          >
          <v-chip color="warning" class="numpic">{{ i+1 }}/{{$store.state.episodes.ep[currentEp].field_img_streaming.length}}</v-chip>
          <v-img :src="baseUrl + item.url" style="max-width:500px;margin:auto;"></v-img>
          </v-carousel-item>
        </v-carousel>
      </v-flex>
      <v-flex xs8 style="overflow:auto;" id="ep-show-container">
        <v-card-text style="padding:50px;">
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
  data() {
    return {
      baseUrl: process.env.baseUrl
    }
  },
  watch: {
    currentEp () {
      let container = this.$el.querySelector("#ep-show-container")
      container.scrollTop = 0
    }
  }
}
</script>

<style scoped>
.v-carousel .numpic {
  position: absolute;
  top: 20px;
  left: 671px;
  z-index: 5;
}
</style>