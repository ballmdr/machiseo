<template>
<v-container>
  <v-layout row wrap>
    <v-flex xs10 sm5 md4>
      <div class="wrapper">
        <div class="profile">
          <v-avatar size="200"><v-img :src="profile_img"></v-img></v-avatar>
          <h1 class="name">{{ celeb.title }}</h1>
          <p class="description" v-html="celeb.body.processed"></p>
        </div>
        <div class="social-icons">
          <div class="icon instagram" v-if="celeb.field_instagram !== null">
            <a target="_blank" :href="'https://www.instagram.com/' + celeb.field_instagram"><i class="fab fa-instagram"></i></a>
          </div>
          <div class="icon twitter" v-if="celeb.field_twitter !== null">
            <a target="_blank" :href="'https://www.twitter.com/' + celeb.field_twitter"><i class="fab fa-twitter"></i></a>
          </div>
        </div>
      </div>
    </v-flex>
    <v-flex xs12 sm7 md8 d-flex>
      <v-layout row wrap>
        <v-flex xs12>
          <h2>ซีรีย์เกาหลีที่ {{ celeb.title }} แสดง</h2>
        </v-flex>
        <v-flex class="hvr-float" xs6 sm6 md4 v-for="serie in celeb.field_series_actors" :key="serie.id" style="cursor:pointer">
          <poster-card :serie="serie"></poster-card>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
  <v-layout>
    <v-flex xs12 d-flex>
      <masonry
        :cols="{default: 4, 1000: 3, 700: 2, 400: 1}"
        :gutter="{default: '30px', 700: '15px'}"
        >
        <div v-for="(img, index) in celeb.field_other_img" :key="index">
          <img :src="checkUrl(img.url)" class="card-media-img"/>
        </div>
      </masonry>
    </v-flex>
  </v-layout>
  </v-container>
</template>

<script>
import { getCelebByPath } from '~/assets/js/api'
import PosterCard from '~/components/series/PosterCard'

export default {
  components: { PosterCard },
  data () {
    return {

    }
  },
  methods:{
    checkUrl(url){
      if (typeof url !== 'undefined'){
        const link = url.split('://')
        if (link[0] !== 'https'){
          return process.env.cdnUrl + url
        } else {
          return url
        }
      }
    }
  },

  head () {
    const canonical = `https://www.kodhit.com${this.$route.path}`
    const synopsis = 'ประวัติดารา ' + this.celeb.title + ' ผลงาน อินสตาแกรม ทวิตเตอร์'
    const title = this.celeb.title
    return {
      title: title,
      meta: [
        { hid: 'description', name: 'description', content: synopsis.replace(/<\/?[^>]+(>|$)/g, "") },
        { hid: 'og_type', name: 'og:type', property: 'og:type', content: 'article' },
        { hid: 'og_title', name: 'og:title', property: 'og:title', content: title },
        { hid: 'og_description', name: 'og:description', property: 'og:description', content: synopsis },
        { hid: 'og_image', name: 'og:image', property: 'og:image', content: this.profile_img },
        { hid: 'og_url', name: 'og:url', property: 'og:url', content: canonical },
        { hid: 'og_sitename', name: 'og:site_name', property: 'og:site_name', content: 'โคตรฮิต! Kodhit.com' },
        { hid: 'twitter_title', name: 'twitter:title', content: title },
        { hid: 'twitter_description', name: 'twitter:description', content: synopsis.replace(/<\/?[^>]+(>|$)/g, "") },
        { hid: 'twitter_image', name: 'twitter:image', content: this.profile_img },
        { hid: 'twitter_site', name: 'twitter:site', content: '@kodhithd' },
        { hid: 'twitter_creator', name: 'twitter:creator', content: '@kodhithd' }
      ],
      link: [
        { rel: 'canonical', href: canonical }
      ]
    }
  },
  async asyncData ({ params, env }) {
    const celeb = await getCelebByPath(params.title, env)
    let profile_img = celeb.field_celeb_profile.uri.url
    const link = profile_img.split('://')
    if (link[0] !== 'https') {
      profile_img = env.cdnUrl + profile_img
    }
    return { celeb, profile_img }
  }
}
</script>

<style scoped>
.card-media-img {
  box-shadow: 0 4px 6px rgba(0, 0, 0, .3);
  width: 100%;
}
.wrapper {
  background: #31394D;
  transition: background .6s ease;
  border-radius: 10px;
  padding: 20px 20px 20px 20px;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.2);
}
.wrapper .profile {
  margin-top: 2.2em;
  position: relative;
  margin: auto;
  text-align: center;
}
.wrapper .profile .thumbnail {
  width: 124px;
  height: 124px;
  display: flex;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 1.5em;
  border-radius: 100%;
  box-shadow: 0 13px 26px rgba(0, 0, 0, 0.2), 0 3px 6px rgba(0, 0, 0, 0.2);
}
.wrapper .profile .name {
  color: #FDFEFF;
  font-size: 24px;
  font-weight: 600;
  text-align: center;
}
.wrapper .profile .description {
  color: #FDFEFF;
  font-size: 14px;
  font-weight: 300;
  text-align: center;
  margin-bottom: 1.3em;
}
.wrapper .social-icons {
  margin: auto;
  display: flex;
}
.wrapper .social-icons .icon {
  display: flex;
  align-items: center;
  flex-direction: column;
}
.wrapper .social-icons .icon a {
  margin: 5px;
  color: #fff;
  width: 60px;
  height: 60px;
  font-size: 32px;
  line-height: 62px;
  text-align: center;
  border-radius: 30px;
  box-shadow: 0 13px 26px rgba(0, 0, 0, 0.2), 0 3px 6px rgba(0, 0, 0, 0.2);
}
.wrapper .social-icons .instagram a {
  background: linear-gradient(to bottom right, #C90A6D, #FF48A0);
}
.wrapper .social-icons .twitter a {
  background: linear-gradient(to bottom right, #5E5AEC, #3F9EFC);
}
.wrapper .social-icons .icon h4 {
  color: #FFFFFF;
  font-size: 1em;
  margin-top: 1.3em;
  margin-bottom: .2em;
}
.wrapper .social-icons .icon p {
  color: #666B7D;
  font-size: 12px;
}
</style>
