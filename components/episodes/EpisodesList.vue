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
    <v-flex class="hvr-grow" xs6 sm4 v-for="(ep, index) in $store.state.episodes.ep" :key="ep.id" style="cursor:pointer" @click="showEp(index)">
      <episode-card :ep="ep"></episode-card>
    </v-flex>
    <v-dialog transition="dialog-bottom-transition" v-model="showDialog" scrollable max-width="900px">
      <episode-show @closeDialog="showDialog = false" :showDialog="showDialog" :currentEp="currentEp"></episode-show>
    </v-dialog>
  </v-layout>
</template>

<script>
import { getEpisodesBySerie } from '~/assets/js/api'
import EpisodeCard from '~/components/episodes/EpisodeCard'
import EpisodeShow from '~/components/episodes/EpisodeShow'

export default {
  components: { EpisodeCard, EpisodeShow },
  data () {  
    return {
      showDialog: false,
      loading: true,
      currentEp: 0
    }
  },
  methods: {
    closeEpDialog () {
      this.epDialog = false
    },
    showEp (index) {
      this.showDialog = true
      this.currentEp = index
    }
  },
  mounted() {
    if (this.$store.state.episodes.ep.length > 0) {
      this.loading = false
    }
  }
}
</script>

