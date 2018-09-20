<template>   
  <v-card color="infoBgcolor" class="black--text">
    <v-layout row wrap>
      <v-flex xs12 sm7>
        <v-card dark color="accent">
        <v-card-title primary-title >
          <h1 class="display-2">{{ serie.title }}</h1>
        </v-card-title>
        <v-card-actions class="pa-3">
          <div class="d-flex">
            <v-rating
              :value="value"
              color="yellow darken-1"
              dense
              half-increments
              readonly
              size="20"
            ></v-rating>
            <div class="ml-2 grey--text text--darken-2">
              <span>{{ value }}</span>
              <span>({{ reviews }})</span>
            </div>
          </div>
        </v-card-actions>
        </v-card>
        <v-divider light></v-divider>
        <v-card light color="bgText">
          <v-card-text class="subheading">{{ serie.synopsis }}</v-card-text>
        </v-card>
        <v-divider light></v-divider>
        <v-card-text><span v-html="serie.body"></span></v-card-text>
      </v-flex>
      <v-flex xs12 sm5>
        <v-card hover>
          <div @click="posterClick()" style="cursor:pointer">
          <v-img :src="baseUrl + serie.posters[0].url" :aspect-ratio="9/16" slot="img">
          <v-layout
            slot="placeholder"
            fill-height
            align-center
            justify-center
            ma-0
          >
            <v-progress-circular indeterminate color="purple"></v-progress-circular>
          </v-layout></v-img>
        </div>
        </v-card>
      </v-flex>
      <v-dialog v-model="posterDialog"
          transition="dialog-bottom-transition"
          max-width="800" @closeDialog="dialog = false">
        <v-card dark>
        <v-toolbar card light color="warning">
          <v-btn icon light @click="closePoster()">
            <v-icon>close</v-icon>
          </v-btn>
          <h2 class="headline">ตัวอย่างซีรีส์และรูปอื่นๆ</h2>
        </v-toolbar>
        <info-card-poster :posters="serie.posters" :trailors="serie.trailors" :otherImgs="serie.otherImgs"></info-card-poster>
        </v-card>
      </v-dialog>
    </v-layout>
  </v-card>
</template>

<script>
import InfoCardPoster from '~/components/series/InfoCardPoster'

export default {
  components: {
    'info-card-poster': InfoCardPoster
  },
  props: ['serie'],
  data: () => ({
    reviews: 413,
    value: 4.5,
    posterDialog: false,
    baseUrl: process.env.baseUrl
  }),
  methods: {
    posterClick () {
      this.posterDialog = true
    },
    closePoster () {
      this.posterDialog = false
    }
  },
}
</script>

<style scoped>
.bottom-gradient {
  background-image: linear-gradient(to top, rgba(0, 0, 0, 0.4) 0%, transparent 72px);
}
</style>