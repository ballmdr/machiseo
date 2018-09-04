<template>
<v-card dark flat>
  <v-container grid-list-xs>
    <v-layout align-center>
      <v-responsive :aspect-ratio="16/9">
        <span v-html="bigScreen"></span>
      </v-responsive>
    </v-layout>
    <v-layout row align-center-start fill-height>
      <v-flex xs3 v-for="(item, i) in playList" :key="i">
        <div @click="changeSlide(i)" style="cursor:pointer"><v-img :src="item.thumbnail"></v-img></div>
      </v-flex>
    </v-layout>
  </v-container>
</v-card>
</template>

<script>
import { getYoutubeId } from '~/assets/js/util'

export default {
  props: ['trailors', 'otherImgs'],
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
        code: '<iframe width="100%" height="480" src="//www.youtube.com/embed/' + youtubeId + '" frameborder="0" allowfullscreen></iframe>',
        thumbnail: 'https://img.youtube.com/vi/' + youtubeId + '/default.jpg',
        type: 'vid'
      }
      this.playList.push(tmp)
    }
    len = this.otherImgs.length
    for (let i =0; i < len; i++) {
      const tmp = {
        code: '<img src="' + process.env.baseUrl + this.otherImgs[i].url + '">',
        thumbnail: process.env.baseUrl + this.otherImgs[i].url,
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