<template>
  <v-card color="orange" @click="$router.push(serie.path)" style="cursor:pointer;margin:10px;" class=" hvr-bob">
    
       <v-card-title primary-title>
          <nuxt-link :to='serie.path'><h3 class="headline">{{ serie.title }}</h3></nuxt-link>
        </v-card-title>
        <v-img
      height="200px"
      :src="checkUrl(serie.cover)"
    >
    </v-img>
   <!-- <v-card-title primary-title>
      <v-flex xs6 v-for="celeb in serie.celebs" :key="celeb.uuid">
        <div><v-avatar><v-img :src="checkUrl(celeb.profile)"></v-img></v-avatar>
          {{ celebName(celeb.title) }}
        </div>
      </v-flex>
    </v-card-title>-->
   <!-- <v-card-actions>
      <v-btn flat color="orange text-xs-right">อ่านสปลอยล์</v-btn>
    </v-card-actions>-->
  </v-card>
      <!--
  <v-card @click="$router.push(serie.path)" style="cursor:pointer;max-height:300px;" class="hvr-bob">
    <v-toolbar dense color="primary"><span style="font-weight:bold;">อันดับ {{ serie.rank }} : <nuxt-link :to="serie.path">{{ serie.title }}</nuxt-link>&nbsp;</span>     
      <v-spacer></v-spacer>
   <v-icon large style="margin-bottom:10px;" color="red">fab fa-hotjar</v-icon> 
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
    <v-img
      max-width="300"
      style="border-radius:10px;" 
      :src="checkUrl(serie.poster)"
      >
    </v-img>
    <v-card-title>
        <h3>นักแสดงนำ</h3>
        <v-flex xs12 v-for="celeb in serie.celebs" :key="celeb.uuid">
          <div><v-avatar size="50"><v-img :src="checkUrl(celeb.profile)"></v-img></v-avatar>
          {{ celebName(celeb.title) }}
          </div>
        </v-flex>
    </v-card-title>
   <v-flex xs4>
        <h3 style="margin-bottom:10px;">รีวิว</h3>
        <p v-for="(review, index) in reviews" :key="review.id" v-if="index > 0" class="hvr-back-pulse" style="cursor:pointer">
          <v-divider dark></v-divider>
          <v-tooltip top max-width="300">
            <span slot="activator" v-html="$options.filters.truncate(review.cooked, 50)"></span>
            <span class="subheading" v-html="review.cooked"></span>
          </v-tooltip>
        </p>
      </v-flex> 
      

  </v-card>-->
</template>

<script>
export default {
  props: ['serie'],
  data () {
    return {
      reviews: []
    }
  },
  mounted () {
    //console.log(this.serie)
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
      const res = name.split(' ')
      return res[0]
    },
    checkUrl(url) {
      const link = url.split('://')
      if (link[0] !== 'https'){
        return process.env.cdnUrl + url
      } else {
        return url
      }
    }
  }
}
</script>
