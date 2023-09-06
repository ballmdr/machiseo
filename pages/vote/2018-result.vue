<template>
  <v-layout column>
    <v-flex xs12>
      <h1>ผลโหวตซีรีส์เกาหลีแห่งปี 2018</h1><small>#ปิดโหวตแล้วจ้า</small>
    </v-flex>
    <v-flex xs12 class="text-xs-center"></v-flex>
    <v-flex xs12>
      <v-card>
        <v-card-text>
          <donut-chart :data="doughnutChartData" :options="{ legend: { display: false }, maintainAspectRatio: false }"></donut-chart>
          <v-layout row wrap>
            <v-flex @click="$router.push(score.path)" class="hvr-reveal" xs6 sm3 md2 lg2 v-for="(score, index) in scoreList" :key="score._id">
              <v-img style="cursor:pointer;border-radius:15px;" :src="checkUrl(score.poster)"></v-img>
              <div>#{{ index+1 }} : {{ score.score }} คะแนน</div>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex xs12>
      <h2>ผลโหวตรอบคัดเลือก</h2>
      <v-card><v-card-text><div v-for="(s,index) in scoreAll" :key="s._id">#{{index+1}} <nuxt-link nuxt :to="s.path" class="hvr-underline-from-left">{{ s.title }}</nuxt-link> | {{ s.score }} คะแนน</div></v-card-text></v-card>
    </v-flex>
    <!--
    <v-flex d-flex xs12 v-for="vote in votes" :key="vote._id">
      <v-card>
        <v-toolbar dense color="warning" style="color:black">โหวตโดย {{ vote.author }}</v-toolbar>
        <v-card-text>
          <v-layout row>
            <v-flex xs3 v-for="serie in vote.series" :key="serie._id">
              <v-img style="border-radius:15px;" max-height="200" max-width="150" :src="baseUrl + serie.poster"></v-img>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-flex> -->
  </v-layout>
</template>

<script>
import DonutChart from '~/components/DonutChart'

function getRandomColor () {
  const letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

export default {
  components: { DonutChart },
  data () {
    return {

    }
  },
  methods:{
    checkUrl(url) {
      const link = url.split('://')
      if (link[0] !== 'https'){
        return process.env.cdnUrl + url
      } else {
        return url
      }
    }
  },
  head () {
    const canonical = `https://www.machiseo.com${this.$route.path}`
    const synopsis = 'ผลโหวตล่าสุด ซีรีส์เกาหลีแห่งปี 2018 กับ โคตรฮิต+'
    return {
      title: 'ผลโหวตล่าสุด ซีรีส์เกาหลีแห่งปี 2018 - โคตรฮิต!',
      meta: [
        { hid: 'description', name: 'description', content: synopsis },
        { hid: 'og_type', name: 'og:type', content: 'article' },
        { hid: 'og_title', name: 'og:title', content: 'ผลโหวตล่าสุด ซีรีส์เกาหลีแห่งปี 2018' },
        { hid: 'og_description', name: 'og:description', content: synopsis },
        { hid: 'og_image', name: 'og:image', content: 'https://machiseo.net/sites/default/files/vote-2018.jpg' },
        { hid: 'og_url', name: 'og:url', content: canonical },
        { hid: 'og_sitename', name: 'og:site_name', content: 'มาชิสซอ Machiseo.com' },
        { hid: 'twitter_title', name: 'twitter:title', content: 'ผลโหวตล่าสุด ซีรีส์เกาหลีแห่งปี 2018' },
        { hid: 'twitter_description', name: 'twitter:description', content: synopsis },
        { hid: 'twitter_image', name: 'twitter:image', content: 'https://machiseo.net/sites/default/files/vote-2018.jpg' },
        { hid: 'twitter_site', name: 'twitter:site', content: '@kodhithd' },
        { hid: 'twitter_creator', name: 'twitter:creator', content: '@kodhithd' }
      ],
      link: [
        { rel: 'canonical', href: canonical }
      ]
    }
  },
  async asyncData ({ app, env }) {
    // const votes = await app.$axios.$get(env.voteServer + '/vote/result/list')
    const scoreList = await app.$axios.$get(env.voteServer + '/vote/series/score')
    const scoreAll = await app.$axios.$get(env.voteServer + '/vote/series/score/all')
    return {
      scoreList,
      scoreAll,
      doughnutChartData: {
        labels: scoreList.map((e) => { return e.title }),
        datasets: [
          {
            backgroundColor: scoreList.map(getRandomColor),
            data: scoreList.map((e) => { return e.score })
          }
        ]
      }
    }
  }
}
</script>
