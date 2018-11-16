<template>
  <v-card light>
    <v-toolbar flat class="primary white--text font-weight-bold title">สปอยด์ {{ ep.field_series_episode.title }} ตอนที่ {{ ep.title }}
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
            v-for="(item,i) in imgStreaming"
            :key="i"
          >
          <v-chip color="warning" class="numpic">{{ i+1 }}/{{ep.field_img_streaming.length}}</v-chip>
          <v-img :src="baseUrl + item.url" style="max-width:500px;margin:auto;"></v-img>
          </v-carousel-item>
        </v-carousel>
      </v-flex>
      <v-flex xs8 style="overflow:auto;" id="ep-show-container">
        <v-card-text style="padding:50px;">
          <p v-html="ep.body.processed"></p>
        </v-card-text>
      </v-flex>
    </v-layout>
    <v-card-actions class="primary white--text">
      <v-spacer></v-spacer>
      <v-btn round @click="$router.push('/episodes/' + path)"><v-icon>far fa-list-alt</v-icon>&nbsp;ดูทุกตอน</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: ['ep', 'imgStreaming'],
  data () {
    return {
      baseUrl: process.env.baseUrl
    }
  },
  computed: {
    path() {
      let str = this.ep.field_series_episode.path.alias
      str = str.replace('/series/', '')
      return str
    }
  }
}
</script>
