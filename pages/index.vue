<template>
  <v-layout row wrap>
    <v-flex xs12 class="box">
      <h2 class="text_header">สปอยล์ซีรีส์เกาหลีตอนล่าสุด</h2>
      <latest-episodes :episodes="episodes"></latest-episodes>
    </v-flex>
    <v-divider style="margin:25px;"></v-divider>
    <v-flex xs12 class="box">
      <h2 class="text_header">ซีรีส์เกาหลีออนแอร์</h2>
      <series-onair :series="onair"></series-onair>
    </v-flex>
    <v-divider style="margin:25px;"></v-divider>
    <v-flex xs12 class="box">
      <h2 class="text_header">ซีรีส์เกาหลีมาแรง</h2>
      <series-sticky :series="sticky"></series-sticky>
    </v-flex>
    <v-flex xs12 class="box">
      <h2 class="text_header">ซีรีส์เกาหลีแนะนำ</h2>
      <series-sticky :series="recommended"></series-sticky>
    </v-flex>
<!--   <v-flex xs12>
      <h2>บทความ</h2>
      <v-divider></v-divider>
      <articles-list :articles="articles"></articles-list>
    </v-flex>
  -->
  <!--  <v-flex xs12 sm6>
      <h2>OST อัพเดท</h2>
      <sound-cloud :soundCloudId="soundId"></sound-cloud>
    </v-flex>
    <v-flex xs12 sm6 class="text-xs-center">
      <h2><nuxt-link to="/series/when-weather-fine">When the Weather is Fine</nuxt-link>&nbsp;<v-icon large style="margin-bottom:10px;">fas fa-video</v-icon></h2>
      <viu-widget :vid_id="widgetId" :serie_title="widgetTitle"></viu-widget>
    </v-flex>
  -->

   <!-- <v-flex xs12 class="box">
      <h2>ดาราเกาหลีที่กำลังออนแอร์</h2>
      <v-divider></v-divider>
      <celebs-onair :series="onair"></celebs-onair>
    </v-flex> -->
  </v-layout>
</template>

<script>
import { getLatestEpisodes, getSeriesOnair, getSeriesSticky, getSeriesRecommended, getSeriesArticles } from '~/assets/js/api'
import SeriesHitCard from '~/components/home/SeriesHitCard'
import LatestEpisodes from '~/components/home/LatestEpisodes'
import SeriesOnair from '~/components/home/SeriesOnair'
import SeriesSticky from '~/components/home/SeriesSticky'
import SeriesRecommended from '~/components/home/SeriesRecommended'
import CelebsOnair from '~/components/home/CelebsOnair'
import ViuWidget from '~/components/series/ViuWidget'
import SoundCloud from '~/components/home/SoundCloud'
import ArticlesList from '~/components/series/ArticlesList'

export default {
  components: { SeriesHitCard, LatestEpisodes, SeriesOnair, SeriesSticky, SeriesRecommended, CelebsOnair, ViuWidget, SoundCloud, ArticlesList },
  data () {
    return {
      widgetId: '247279',
      widgetTitle: 'When the Weather is Fine',
      soundId: '4767794'
    }
  },
  mounted(){
    //console.log(this.articles)
    //console.log(this.episodes)
  },
  async asyncData ({ app, env }) {
    const episodes = await getLatestEpisodes(10)
    const onair = await getSeriesOnair()
    const sticky = await getSeriesSticky()
    const recommended = await getSeriesRecommended()
    const seriesHit = await app.$axios.$get(env.restMongoUrl + '/series_hit')
    const articles = await getSeriesArticles()
    console.log(typeof(sticky))
    return { episodes, onair, seriesHit, articles, sticky, recommended }
  }
}
</script>

<style scoped>
.box {
  margin-bottom:5px;
}

/* The hero image */
.hero-image {
  /* Use "linear-gradient" to add a darken background effect to the image (photographer.jpg). This will make the text easier to read */
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://i.ytimg.com/vi/YubXq6Fh4S0/maxresdefault.jpg");

  /* Set a specific height */
  height: 300px;

  /* Position and center the image to scale nicely on all screens */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
}

/* Place text in the middle of the image */
.hero-text {
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
}
.text_header {
  text-align: center;
  margin-bottom: 20px;
}
</style>

