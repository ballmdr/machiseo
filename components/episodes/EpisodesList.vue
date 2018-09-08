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
    <v-dialog v-model="epDialog" scrollable max-width="1100px">
      <v-card light>
        <v-toolbar class="purple white--text headline">{{ title }}
          <v-spacer></v-spacer>
          <v-btn icon dark @click="closeEpDialog()"><v-icon>close</v-icon></v-btn>
        </v-toolbar>
        <v-layout row style="height:500px">
          <v-flex xs6 justify-center>
              <v-responsive :aspect-ratio="16/9">
                <carousel-ep :imgStreaming="imgStreaming"></carousel-ep>
              </v-responsive>
          </v-flex>
          <v-flex xs6 style="overflow:auto;">
            <v-card-text style="padding:50px;">
              <p v-html="body"></p>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-card-actions class="purple white--text">
          <v-spacer></v-spacer>
          <v-btn round @click.native="showEp(epIndex - 1)"><v-icon>skip_previous</v-icon>ตอนที่แล้ว</v-btn>
          <v-btn round @click.native="epDialog = false">Close</v-btn>
          <v-btn round @click.native="showEp(epIndex + 1)">ตอนต่อไป<v-icon>skip_next</v-icon></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</div>
</template>

<script>
import CarouselEp from '~/components/episodes/CarouselEp'

export default {
  props: ['episodes'],
  components: { 'carousel-ep': CarouselEp },
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
  }
}
</script>
