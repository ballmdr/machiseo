<template>
<div>
  <v-flex xs12 text-xs-center fill-height>
    <v-responsive :aspect-ratio="16/9" max-height="400">
      <v-card height="100%"><span v-html="bigScreen"></span></v-card>
    </v-responsive>
  </v-flex>
  <v-flex xs12>
    <v-layout row align-center-start fill-height>
      <v-flex xs2 v-for="(item, i) in playList" :key="i">
        <v-responsive contain class="thumbnail" @click="changeSlide(i)" style="cursor:pointer"><v-img :aspect-ratio="1/1" :src="item.thumbnail"></v-img></v-responsive>
      </v-flex>
    </v-layout>
  </v-flex>
</div>
</template>

<script>
import { getYoutubeId } from '~/assets/js/util'

export default {
  props: ['posters', 'trailors', 'otherImgs'],
  data () {
    return {
      bigScreen: null,
      playList: [],
      src: null
    }
  },
  created () {
    this.playList = []
    let len = this.trailors.length
    for (let i = 0; i < len; i++) {
      const youtubeId = getYoutubeId(this.trailors[i])
      const tmp = {
        code: '<iframe width="100%" height="100%" src="//www.youtube.com/embed/' + youtubeId + '" frameborder="0" allowfullscreen></iframe>',
        thumbnail: 'https://img.youtube.com/vi/' + youtubeId + '/default.jpg',
        type: 'vid'
      }
      this.playList.push(tmp)
    }
    len = this.posters.length
    for (let i = 0; i < len; i++) {
      const tmp = {
        code: '<img src="' + process.env.baseUrl + this.posters[i].uri.url + '" height="100%">',
        thumbnail: process.env.baseUrl + this.posters[i].uri.url,
        type: 'img'
      }
      this.playList.push(tmp)
    }
    len = this.otherImgs.length
    for (let i = 0; i < len; i++) {
      const tmp = {
        code: '<img src="' + process.env.baseUrl + this.otherImgs[i].uri.url + '" height="100%">',
        thumbnail: process.env.baseUrl + this.otherImgs[i].uri.url,
        type: 'img'
      }
      this.playList.push(tmp)
    }
    this.bigScreen = this.playList[0].code
  },
  methods: {
    changeSlide (index) {
      this.bigScreen = this.playList[index].code
    }
  }
}
</script>

<style scoped>

</style>