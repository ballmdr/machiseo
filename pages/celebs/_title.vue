<template>
  <v-layout row wrap>
    <v-flex xs4>
      <v-card color="primary">
        <v-layout justify-center>
          <v-card-title>
            <v-avatar size="200"><v-img :src="baseUrl + celeb.field_celeb_profile.url"></v-img></v-avatar>
          </v-card-title>
        </v-layout>
        <v-card-text>     
          <h1 class="headline" style="text-align:center">{{ celeb.title }}</h1>
          <p class="subheading" style="padding:20px" v-html="celeb.body.processed"></p>
        </v-card-text>
        <v-card-text>
        <!-- <p class="subheading" style="padding:20px" v-html="celeb.field_celeb_reward.processed"></p> -->
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex xs8>
      <v-layout row wrap>
        <v-flex class="hvr-float-shadow" xs4 v-for="serie in celeb.field_series_actors" :key="serie.id" style="cursor:pointer" @click="$router.push(serie.path.alias)">
        <v-img :src="baseUrl + serie.field_poster[0].url" class="card-media-img"></v-img>
          <h2>{{ serie.title }}</h2>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex xs12 d-flex>
      <masonry
        :cols="4"
        :gutter="15"
        >
        <div v-for="(img, index) in celeb.field_other_img" :key="index">
          <img :src="baseUrl + img.url" class="card-media-img"/>
        </div>
      </masonry>
    </v-flex>
  </v-layout>
</template>

<script>
import { getCelebByPath } from '~/assets/js/api'


export default {
  
  data () {
    return {
      baseUrl: process.env.baseUrl
    }
  },
  head () {
    return {
      title: this.celeb.title
    }
  },
  async asyncData({ params, env }) {
    const celeb = await getCelebByPath(params.title, env)
    return { celeb }
  }
}
</script>

<style scoped>
.card-media-img {
  box-shadow: 0 4px 6px rgba(0, 0, 0, .3);
  width: 100%;
}

</style>
