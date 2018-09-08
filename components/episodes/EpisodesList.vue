<template>
<div>
  <v-layout row wrap>
    <v-flex xs6 sm4 md3 lg2 v-for="(ep, index) in episodes" :key="index" style="cursor:pointer" @click="showEp(index)">
      <v-card light>
        <v-img :aspect-ratio="16/9" :src="tmpBaseUrl + ep.field_thumbnail.url"></v-img>
      <v-card-text>
        {{ ep.title }}
      </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
  <v-layout row justify-center>
    <v-dialog v-model="epDialog" scrollable max-width="800px">
      <v-card light>
        <v-card-title class="purple white--text headline">{{ title }}</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 100%; padding:50px;">
          <v-responsive :aspect-ratio="16/9" contain>
            <v-carousel>
              <v-carousel-item
                v-for="(item,i) in imgStreaming"
                :key="i"
                :src="tmpBaseUrl + item.url"
              ></v-carousel-item>
            </v-carousel>
<!--<agile :arrows="false" :speed="750"
    :timing="'linear'" :fade="true"
    :autoplay="true" :pauseOnHover="false">
    <div class="slide" v-for="(item,i) in 5" :key="i"><v-img :src="tmpBaseUrl + imgStreaming[i].url"></v-img></div>
</agile>-->
          </v-responsive>
          <p v-html="body"></p>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="purple white--text">
          <v-btn round @click.native="showEp(epIndex - 1)"><v-icon>skip_previous</v-icon>ตอนที่แล้ว</v-btn>
          <v-btn round @click.native="epDialog = false">Close</v-btn>
          <v-btn round @click.native="showEp(epIndex + 1)">ตอนต่อไป<v-icon>skip_next</v-icon></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</div>
</template>

<script>
export default {
  props: ['episodes'],
  data () {
    return {
      tmpBaseUrl: process.env.baseUrl,
      epDialog: false,
      body: null,
      title: null,
      epIndex: null,
      imgStreaming: []
    }
  },
  methods: {
    closeEpDialog () {
      this.epDialog = false
    },
    showEp (index) {
      this.epDialog = false
      this.body = this.episodes[index].body.processed
      this.title = this.episodes[index].title
      this.epIndex = index
      this.imgStreaming = this.episodes[index].field_img_streaming
      this.epDialog = true
    }
  },
  mounted(){
    console.log(this.episodes)
  }
}
</script>
