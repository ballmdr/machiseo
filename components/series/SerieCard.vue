<template>

    <v-card class="movie box"
        style="cursor:pointer;"
        @click.native="$router.push(serie.path.alias)">
      <v-img class="movie-img" :src="baseUrl + serie.field_poster[0].uri.url"></v-img>
      <v-card-title class="box-caption">
        <nuxt-link :to="serie.path.alias"><h4>{{ serie.title }}</h4></nuxt-link>
        <!-- <v-rating dense v-model="serieScore" color="yellow" half-increments readonly></v-rating> -->
      </v-card-title>
      <v-card-actions v-if="serie.field_episode_series.length > 0"><v-spacer></v-spacer><v-icon color="warning">fas fa-book-reader</v-icon>&nbsp;มีสปอยด์</v-card-actions>
      <v-card-actions><v-spacer></v-spacer><small v-for="type in serie.field_series_type" :key="type.id">{{ type.name }}&nbsp;</small></v-card-actions>
    </v-card>


</template>

<script>
import { voteUpdate, voteResult } from '~/assets/js/api'

export default {
  props: ['serie'],
  //middleware: 'user-auth',
  data: () => ({
    baseUrl: process.env.baseUrl,
    poster: '',
    isAdmin: false,
    serieScore: 0
  }),
  // methods: {
  //   async vote () {
  //     await voteUpdate(this.serie.nid, this.serieScore)
  //     //console.log('vote')
  //   }
  // },
  // async mounted () {
  //   this.isAdmin = this.$store.getters['users/getIsAdmin']
  //   let serieScore = await voteResult(this.serie.nid)
  //   if (serieScore.length > 0) {
  //     this.serieScore = serieScore[1].value[0].value
  //   }
  //   else {
  //     this.serieScore = 0
  //   }
  // }
}
</script>

<style scoped>
.box{
  margin-left: 5px;
  margin-top: 10px !important;
  padding: 0px !important;
  height: 100%;
}
.movie{
/* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#ffffff+39,1e1b26+53&0+38,1+55 */
background: -moz-linear-gradient(top,  rgba(255,255,255,0) 38%, rgba(255,255,255,0.06) 39%, rgba(30,27,38,0.88) 53%, rgba(30,27,38,1) 55%); /* FF3.6-15 */
background: -webkit-linear-gradient(top,  rgba(255,255,255,0) 38%,rgba(255,255,255,0.06) 39%,rgba(30,27,38,0.88) 53%,rgba(30,27,38,1) 55%); /* Chrome10-25,Safari5.1-6 */
background: linear-gradient(to bottom,  rgba(255,255,255,0) 38%,rgba(255,255,255,0.06) 39%,rgba(30,27,38,0.88) 53%,rgba(30,27,38,1) 55%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00ffffff', endColorstr='#1e1b26',GradientType=0 ); /* IE6-9 */
}
.movie-img{
  -webkit-mask-image:
    -webkit-gradient(linear, left top, left bottom,
    color-stop(0.00,  rgba(0,0,0,1)),
    color-stop(0.35,  rgba(0,0,0,1)),
    color-stop(0.50,  rgba(0,0,0,1)),
    color-stop(0.65,  rgba(0,0,0,1)),
    color-stop(0.85,  rgba(0,0,0,0.6)),
    color-stop(1.00,  rgba(0,0,0,0)));
}
</style>
