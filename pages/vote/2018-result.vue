<template>
  <v-layout column>
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
export default {
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
  },
  async asyncData ({ app, env }) {
    const votes = await app.$axios.$get(env.voteServer + '/vote/result/list')
    return { votes }
  }
}
</script>
