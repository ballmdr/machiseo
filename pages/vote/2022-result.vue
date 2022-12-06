<template>
    <v-layout column>
      <v-flex xs12>
        <h1>ผลโหวตซีรีส์เกาหลีแห่งปี 2022</h1> <!-- <small>#ปิดโหวตแล้วจ้า</small> -->
      </v-flex>

      <v-flex xs12>
        <v-card color="infoBgcolor">
          <v-card-text>
            <h3 style="color:#000 !important">ซีรีส์เกาหลี 2022 สิบอันดับแรก เรียลไทม์</h3>
              <div style="margin-bottom:20px;">
                <bar-chart :data="chartData" :options="{ legend: { display: false }, maintainAspectRatio: false }"></bar-chart>
              </div>
            <v-layout row wrap>
              <v-flex style="text-align:center" @click="$router.push(score.path)" xs6 sm4 md3 lg3 v-for="(score, index) in scoreList" :key="score._id">
                <v-img class="poster-thumbnail" :src="checkUrl(score.poster)"></v-img>
                <v-chip color="orange" style="padding:5px;">#{{ index+1 }} {{ score.title }} <br> {{ score.score }} คะแนน</v-chip>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 class="text-xs-center"><adsbygoogle /></v-flex>
      <v-flex xs12>
        <h2>คะแนนทั้งหมด เรียลไทม์</h2>
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

  function getRandomColor () {
    const letters = '0123456789ABCDEF'
    let color = '#'
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }
    return color
  }
  
  export default {

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
      const synopsis = 'ผลโหวตล่าสุด ซีรีส์เกาหลีแห่งปี 2022 กับ มาชิสซอ และโคตรฮิต'
      return {
        title: 'ผลโหวตล่าสุด ซีรีส์เกาหลีแห่งปี 2022 - มาชิสซอ',
        meta: [
          { hid: 'description', name: 'description', content: synopsis },
          { hid: 'og_type', name: 'og:type', content: 'article' },
          { hid: 'og_title', name: 'og:title', content: 'ผลโหวตล่าสุด ซีรีส์เกาหลีแห่งปี 2022' },
          { hid: 'og_description', name: 'og:description', content: synopsis },
          { hid: 'og_image', name: 'og:image', content: 'https://www.machiseo.net/sites/default/files/vote-2022.jpg' },
          { hid: 'og_url', name: 'og:url', content: canonical },
          { hid: 'og_sitename', name: 'og:site_name', content: 'มาชิสซอ Machiseo.com' },
          { hid: 'twitter_title', name: 'twitter:title', content: 'ผลโหวตล่าสุด ซีรีส์เกาหลีแห่งปี 2022' },
          { hid: 'twitter_description', name: 'twitter:description', content: synopsis },
          { hid: 'twitter_image', name: 'twitter:image', content: 'https://www.machiseo.net/sites/default/files/vote-2022.jpg' },
          { hid: 'twitter_site', name: 'twitter:site', content: '@machiseo' },
          { hid: 'twitter_creator', name: 'twitter:creator', content: '@machiseo' }
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
        chartData: {
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
