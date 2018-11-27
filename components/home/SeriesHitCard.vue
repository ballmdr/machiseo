<template>
  <v-card @click="$router.push(serie.path)" style="cursor:pointer;max-height:300px;" class="hvr-grow">
    <v-toolbar dense color="primary"><span style="font-weight:bold;">#{{ serie.rank }} : <nuxt-link :to="serie.path">{{ serie.title }}</nuxt-link>&nbsp;</span>     
      <v-spacer></v-spacer>
      <v-progress-circular
      :rotate="360"
      size="60"
      width="5"
      :value="serie.score"
      color="warning"
      >
        {{ serie.score }}%
      </v-progress-circular>
    </v-toolbar>
    <v-layout row style="height:230px;">
      <v-flex xs5 style="padding-left:20px;padding-bottom:20px;">
        <v-img
        max-width="300"
        style="border-radius:10px;" 
        :src="baseUrl + serie.poster"
        ></v-img>
      </v-flex>
      <v-flex xs7>
        <h3>คู่พระนาง</h3>
        <v-flex xs12 v-for="celeb in serie.celebs" :key="celeb.uuid">
          <div><v-avatar size="50"><v-img :src="baseUrl + celeb.profile"></v-img></v-avatar>
          {{ celebName(celeb.title) }}
          </div>
        </v-flex>
      </v-flex>
     <!-- <v-flex xs4>
        <h3 style="margin-bottom:10px;">รีวิว</h3>
        <p v-for="(review, index) in reviews" :key="review.id" v-if="index > 0" class="hvr-back-pulse" style="cursor:pointer">
          <v-divider dark></v-divider>
          <v-tooltip top max-width="300">
            <span slot="activator" v-html="$options.filters.truncate(review.cooked, 50)"></span>
            <span class="subheading" v-html="review.cooked"></span>
          </v-tooltip>
        </p>
      </v-flex> -->
    </v-layout>
  </v-card>
</template>

<script>
export default {
  props: ['serie'],
  data () {
    return {
      reviews: [],
      baseUrl: process.env.baseUrl
    }
  },
  mounted() {
    /*
    const tmpHeaders = this.$axios.defaults.headers
    this.$axios.defaults.headers = {
      "Accept": "application/json"
    }
    this.$axios.$get(process.env.discourseUrl + '/t/' + this.serie.topic_id + '/posts.json')
      .then(res => {
        this.reviews = res.post_stream.posts
      }).catch(err => {
        console.log(err.response.data)
      }).finally(() => {
        this.$axios.defaults.headers = tmpHeaders
        console.log(this.reviews)
      }) */
  },
  methods: {
    celebName (name) {
      const res = name.split(" ")
      return res[0]
    }
  }
}
</script>
