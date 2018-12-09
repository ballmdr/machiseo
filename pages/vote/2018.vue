<template>
  <v-layout row wrap>
    <v-flex xs12 sm3 md4 d-flex>
      <v-card flat>
        <v-card-text>
          <v-layout column>
            <v-flex xs12>คลิกเพื่อลบออก</v-flex>
            <v-flex class="hvr-reveal text-xs-center" style="cursor:pointer" xs12 v-for="(element, index) in listVote" :key="index" @click="removeVote(index)">
              <v-img style="margin:auto;border-radius:15px;" max-width="150" :src="baseUrl + element.poster"></v-img>
              {{ element.title }}
            </v-flex>
          </v-layout>
          <v-text-field v-model="author" label="ชื่อผู้โหวต (ไม่ใส่ก็ได้)"> </v-text-field>
          </v-card-text>
          <v-card-actions>
          <v-spacer></v-spacer><v-btn large round color="warning" @click="voteConfirm" style="color:black;margin-bottom:15px;">{{ listVote.length }}/10 โหวต</v-btn>
          </v-card-actions>
          <v-btn style="" color="primary">ดูคะแนนโหวตล่าสุด</v-btn>
      </v-card>
    </v-flex>
    <v-flex xs12 sm9 md8 class="text-xs-center">
      <v-card flat class="scroll">
        <v-card-text>
          <v-layout row wrap>
            <v-flex xs12>คลิกเลือกซีรีส์ที่ชื่นชอบ | ซีรีส์เรียงตามตัวอักษร</v-flex>
              <v-flex style="cursor:pointer" @click="addVote(index)" class="hvr-reveal" xs6 sm4 md3 lg2 v-for="(serie, index) in series" :key="index">
                  <v-img style="border-radius:15px;margin:auto;" max-width="100" :src="baseUrl + serie.poster"></v-img>
                  {{ serie.title }}
              </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-flex>
      <v-dialog v-model="checkDialog" persistent max-width="300">
        <v-card color="primary">
          <v-card-title><span style="font-size: 24px;">เลือกได้ไม่เกินสิบเรื่องนะจ๊ะ</span></v-card-title>
          <v-card-text>คลิกซีรีส์ที่เลือกเพื่อลบออก</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn round color="warning" flat @click="checkDialog = false" style="color:black">ได้เลย</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="confirmDialog" persistent max-width="300">
        <v-card color="primary">
          <v-card-title><span style="font-size: 24px;">ยืนยันการโหวต</span></v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn round color="red" flat @click="confirmDialog = false" style="color:black">ปิด</v-btn> <v-btn round color="success" flat @click="voteSave" style="color:black">ยืนยัน</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-bottom-nav
        app
        value="true"
        color="primary"
        fixed
        height="40"
      >
        <v-chip color="warning" @click="voteConfirm" style="padding-left:90px;">{{ listVote.length }}/10 คลิกโหวตตรงนี้ได้เลย</v-chip>
      </v-bottom-nav>
  </v-layout>
</template>

<script>
import { getSeriesByYear } from '~/assets/js/api'

export default {
  data () {
    return {
      listVote: [],
      baseUrl: process.env.baseUrl,
      author: '',
      checkDialog: false,
      confirmDialog: false
    }
  },
  head () {
    const canonical = `https://www.machiseo.com${this.$route.path}`
    const synopsis = 'โหวตซีรีส์เกาหลียอดฮิตแห่งปี 2018 กับ มาชิสซอ และโคตรฮิต'
    return {
      title: 'ร่วมโหวตซีรีส์เกาหลีแห่งปี 2018 - มาชิสซอ',
      meta: [
        { hid: 'description', name: 'description', content: synopsis },
        { hid: 'og_type', name: 'og:type', content: 'article' },
        { hid: 'og_title', name: 'og:title', content: 'ร่วมโหวตซีรีส์เกาหลีแห่งปี 2018 - มาชิสซอ' },
        { hid: 'og_description', name: 'og:description', content: synopsis },
        { hid: 'og_image', name: 'og:image', content: 'https://machiseo.net/sites/default/files/vote-2018.jpg' },
        { hid: 'og_url', name: 'og:url', content: canonical },
        { hid: 'og_sitename', name: 'og:site_name', content: 'มาชิสซอ Machiseo.com'},
        { hid: 'twitter_title', name: 'twitter:title', content: 'ร่วมโหวตซีรีส์เกาหลีแห่งปี 2018' },
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
  methods: {
    addVote(index) {
      this.listVote.unshift(this.series[index])
      this.series.splice(index, 1)
    },
    removeVote (index) {
      this.series.unshift(this.listVote[index])
      this.listVote.splice(index, 1)
    },
    voteConfirm () {
      this.confirmDialog = true
    },
    async voteSave () {
      this.confirmDialog = false
      if (this.listVote.length > 10) {
        this.checkDialog = true
      } else if (this.listVote.length === 0) {
        this.$toast.error("เลือกซีรีส์ก่อนจ้า")
      } else {
        this.$toast.show("กำลังโหวต รอก่อนจ้า")
        if (this.author === '') {
          this.author = 'ไม่ระบุชื่อ'
        }
        const bucket = {
          author: this.author,
          series: this.listVote
        }
        try {
          await this.$axios.post(process.env.voteServer + '/vote/add', bucket)
          for (let i=0;i<bucket.series.length;i++) {
            await this.$axios.put(process.env.voteServer + '/vote/series/score/add/' + bucket.series[i]._id)
          }
          this.$toast.success('โหวตสำเร็จ')
          this.listVote = []
        } catch (e) {
          this.$toast.error(e)
        }
      }
    }
  },
  mounted() {
    console.log('series', this.series)
  },
  async asyncData ({ app, env }) {
    const series = await app.$axios.$get(env.voteServer + '/vote/series')
    return { series }
  }
}
</script>

<style scoped>
.dragArea{
  min-height: 50px;	
}
</style>