<template>
  <v-layout row wrap>
    <v-flex v-if="loading">
      <v-progress-circular
        :size="70"
        :width="7"
        color="purple"
        indeterminate
      ></v-progress-circular>
    </v-flex>
    <v-flex class="hvr-grow episode" xs6 sm4 v-for="(ep, index) in episodes" :key="ep.id" style="cursor:pointer" @click="showEp(index)">
      <v-card dark>
        <v-img :src="baseUrl + ep.field_thumbnail.url"></v-img>
        <div class="number">ตอนที่ {{ ep.title }}</div>
      </v-card>
    </v-flex>
    <v-dialog fullscreen hide-overlay transition="dialog-bottom-transition" v-model="epDialog" scrollable max-width="1100px">
      <v-card light>
        <v-toolbar class="purple white--text headline">{{ fieldName }} {{ title }}
          <v-spacer></v-spacer>
          <v-btn icon dark @click="closeEpDialog()"><v-icon>close</v-icon></v-btn>
        </v-toolbar>
        <v-layout column>
          <v-flex xs12>
              <v-carousel style="max-height:400px;">
                <v-carousel-item
                  v-for="(item,i) in imgStreaming"
                  :key="i"
                  :src="baseUrl + item.url"
                ></v-carousel-item>
              </v-carousel>
          </v-flex>
          <v-flex xs12 style="overflow:auto;">
            <v-card-text style="padding:50px;">
              <p v-html="body" style="overflow:auto;"></p>
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
  </v-layout>
</template>

<script>
import { getEpisodesBySerie } from '~/assets/js/api'

export default {
  props: ['uuid'],
  data () {
    return {
      loading: true,
      episodes: [],
      baseUrl: process.env.baseUrl,
      epDialog: false,
      body: null,
      title: null,
      epIndex: null,
      imgStreaming: [],
      fieldName: ''
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
      this.fieldName = this.episodes[index].field_series_korea.name
      this.epIndex = index
      this.imgStreaming = this.episodes[index].field_img_streaming
      this.epDialog = true
    }
  },
  mounted() {
    getEpisodesBySerie(this.uuid).then(episodes => {
      this.episodes = episodes
      this.loading = false
      console.log(episodes)
    })
  }
}
</script>

<style scoped>
.episode .number {
  position: absolute;
  bottom: -8px;
  left: -4%;
  background: #303030;
  padding: 5px 10px;
  color: #FFFFFF;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
}
</style>