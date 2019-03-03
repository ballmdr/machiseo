<template>
  <v-layout row wrap>
    <v-flex d-flex class="hvr-float" style="cursor:pointer" xs5 sm3 v-for="(id, index) in youtubeId" :key="index" @click="openTrailor(index)">
      <v-img style="width:100%" :src="'https://img.youtube.com/vi/' + id + '/default.jpg'"></v-img>
    </v-flex>
    <v-dialog v-model="trailorDialog" max-width="500px">
      <v-card>
        <v-card-title>
          ตัวอย่างซีรีส์​
        </v-card-title>
        <v-card-text>
          <iframe width="100%" height="100%" :src="'//www.youtube.com/embed/' + currentId" frameborder="0" allowfullscreen></iframe>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" flat @click="trailorDialog = false">ปิด</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { getYoutubeId } from '~/assets/js/util'

export default {
  props: ['trailors'],
  data () {
    return {
      youtubeId: [],
      trailorDialog: false,
      currentId: null
    }
  },
  methods: {
    openTrailor (index) {
      this.currentId = this.youtubeId[index]
      this.trailorDialog = true
    }
  },
  mounted () {
    for (let i = 0; i < this.trailors.length; i++) {
      this.youtubeId[i] = getYoutubeId(this.trailors[i])
    }
  }
}
</script>
