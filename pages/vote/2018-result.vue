<template>
  <v-layout column>
    <v-flex xs12>
      <v-card>
        <v-card-title>ชาร์ตผลโหวตล่าสุด | ปิดโหวตรอบแรกวันที่ 20 ธันวาคม 2018 | คัดเลือก 10 เรื่องเข้าชิง</v-card-title>
        <v-card-text>
          <donut-chart :data="doughnutChartData" :options="{ legend: { display: false }, maintainAspectRatio: false }"></donut-chart>
          <v-layout row wrap>
            <v-flex @click="$router.push(score.path)" class="hvr-reveal" xs6 sm3 md2 lg2 v-for="(score, index) in scoreList" :key="score._id">
              <v-img style="cursor:pointer;border-radius:15px;" :src="baseUrl + score.poster"></v-img>
              <div>#{{ index+1 }} : {{ score.score }} คะแนน</div>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-flex>
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
    </v-flex>
  </v-layout>
</template>

<script>
import DonutChart from '~/components/DonutChart'

function getRandomColor() {
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
      baseUrl: process.env.baseUrl
    }
  },
  head () {
    const canonical = `https://www.machiseo.com${this.$route.path}`
    const synopsis = 'ผลโหวตล่าสุด ซีรีส์เกาหลีแห่งปี 2018 กับ มาชิสซอ และโคตรฮิต'
    return {
      title: 'ผลโหวตล่าสุด ซีรีส์เกาหลีแห่งปี 2018 - มาชิสซอ',
      meta: [
        { hid: 'description', name: 'description', content: synopsis },
        { hid: 'og_type', name: 'og:type', content: 'article' },
        { hid: 'og_title', name: 'og:title', content: 'ผลโหวตล่าสุด ซีรีส์เกาหลีแห่งปี 2018' },
        { hid: 'og_description', name: 'og:description', content: synopsis },
        { hid: 'og_image', name: 'og:image', content: 'https://machiseo.net/sites/default/files/vote-2018.jpg' },
        { hid: 'og_url', name: 'og:url', content: canonical },
        { hid: 'og_sitename', name: 'og:site_name', content: 'มาชิสซอ Machiseo.com'},
        { hid: 'twitter_title', name: 'twitter:title', content: 'ผลโหวตล่าสุด ซีรีส์เกาหลีแห่งปี 2018' },
        { hid: 'twitter_description', name: 'twitter:description', content: synopsis },
        { hid: 'twitter_image', name: 'twitter:image', content: 'https://machiseo.net/sites/default/files/vote-2018.jpg' },
        { hid: 'twitter_site', name: 'twitter:site', content: '@machiseo' },
        { hid: 'twitter_creator', name: 'twitter:creator', content: '@machiseo' }
      ],
      link: [
        { rel: 'canonical', href: canonical }
      ]
    }
  },
  mounted() {
    console.log('all vote', this.votes)
    console.log('scorelist', this.scoreList)
    console.log('title', this.scoreList.map((e) => { return e.title }))
  },
  async asyncData ({ app, env }) {
    const votes = await app.$axios.$get(env.voteServer + '/vote/result/list')
    const scoreList = await app.$axios.$get(env.voteServer + '/vote/series/score')
    return { 
      votes, scoreList,
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
