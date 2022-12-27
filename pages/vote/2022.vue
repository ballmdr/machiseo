<template>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title><h1>โหวตซีรีส์เกาหลีแห่งปี 2022 รอบชิงชนะเลิศ</h1></v-card-title>
          <v-card-text>
            <p><strong>กติการอบชิงชนะเลิศ</strong><br>
            <list>
            <ol>โหวตได้ 1 เรื่องเท่านั้น</ol>
            <ol>โหวตได้คนละหนึ่งครั้ง</ol>
            <ol>รอบชิงชนะเลิศ ระหว่างวันที่ 20  ธันวาคม - 27 ธันวาคม เวลา 21.00 น.</ol>
            </list>
            </p>
            <p>
            ประกาศผลโหวตรอบชิงชนะเลิศ ในวันที่ 28 ธันวาคม 2022
            </p>
          </v-card-text>
        </v-card>
      </v-flex>
      <!-- <v-flex xs12>
        <v-btn nuxt large color="warning" to="/vote/2022-result" style="color:black">ปิดโหวตแล้วจ้า คลิกเพื่อดูผลโหวต</v-btn>
      </v-flex> -->
      <v-flex xs12 sm3 md3 d-flex fixed style="position:sticky">
        <v-card flat>
          <v-card-text>
            <v-layout column>
              <v-flex xs12>คลิกเพื่อลบออก</v-flex>

              <v-flex class="text-xs-center" style="cursor:pointer" xs12 v-for="(element, index) in listVote" :key="index" @click="removeVote(index)">
                <v-img style="margin:auto;border-radius:15px;" max-width="150" :src="baseUrl + element.poster"></v-img>
                {{ element.title }}
              </v-flex>
            </v-layout>
            </v-card-text>
            <v-card-actions>
            <v-spacer></v-spacer><v-btn large round color="warning" @click="voteConfirm" style="color:black;margin-bottom:15px;">{{ listVote.length }}/{{ max_vote }} โหวต</v-btn>
            </v-card-actions>
            <v-card-actions><v-spacer></v-spacer><v-btn color="primary" nuxt to="/vote/2022-result">ดูคะแนนโหวตล่าสุด</v-btn></v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs12 sm9 md9 class="text-xs-center">
        <v-card flat class="scroll">
          <v-card-text>
            <v-layout row wrap>
              <v-flex xs12><h2>โหวตได้สูงสุด {{ max_vote }} เรื่อง</h2></v-flex>
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
            <v-card-title><span style="font-size: 24px;">เลือกได้ไม่เกิน {{ max_vote }} เรื่องจ้า</span></v-card-title>
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
          <v-chip color="warning" @click="voteConfirm" style="padding-left:90px;">{{ listVote.length }}/{{ max_vote }} คลิกโหวตตรงนี้ได้เลย</v-chip>
        </v-bottom-nav>

    </v-layout>
</template>

<script>

  export default {
    data () {
      return {
        listVote: [],
        baseUrl: process.env.baseUrl,
        author: '',
        checkDialog: false,
        confirmDialog: false,
        max_vote: 1
      }
    },
    head () {
      const canonical = `https://www.machiseo.com${this.$route.path}`
      const synopsis = 'โหวตสุดยอดซีรีส์เกาหลีแห่งปี 2022 กับ โคตรฮิต!'
      return {
        title: 'โหวตซีรีส์เกาหลีแห่งปี 2022 - โคตรฮิต!',
        meta: [
          { hid: 'description', name: 'description', content: synopsis },
          { hid: 'og_type', name: 'og:type', content: 'article' },
          { hid: 'og_title', name: 'og:title', content: 'โหวตซีรีส์เกาหลีแห่งปี 2022 - โคตรฮิต!' },
          { hid: 'og_description', name: 'og:description', content: synopsis },
          { hid: 'og_image', name: 'og:image', content: 'https://cdn.machiseo.net/sites/default/files/vote-final-2022-poster.jpg' },
          { hid: 'og_url', name: 'og:url', content: canonical },
          { hid: 'og_sitename', name: 'og:site_name', content: 'โคตรฮิต+ Kodhit.com' },
          { hid: 'twitter_title', name: 'twitter:title', content: 'โหวตซีรีส์เกาหลีแห่งปี 2022' },
          { hid: 'twitter_description', name: 'twitter:description', content: synopsis },
          { hid: 'twitter_image', name: 'twitter:image', content: 'https://cdn.machiseo.net/sites/default/files/vote-final-2022-poster.jpg' },
          { hid: 'twitter_site', name: 'twitter:site', content: '@kodhithd' },
          { hid: 'twitter_creator', name: 'twitter:creator', content: '@kodhithd' }
        ],
        link: [
          { rel: 'canonical', href: canonical }
        ]
      }
    },
    methods: {
      addVote (index) {
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
      async checkValidIp (ip) {
        //check 1 ip 1 time
        const lastVote = await this.$axios.$post(process.env.voteServer + '/vote/last/ip', { ip: ip })
        console.log('last vote', lastVote)
        if (ip == '127.0.0.1' || ip == '183.88.131.250' || ip == '182.232.113.137') {
          return true
        }
        else if (lastVote === null || lastVote.length === 0) {
         return true
        } else {
         return false
        }

        //check 1 day 1 ip
        // try {
        //   const lastVote = await this.$axios.$post(process.env.voteServer + '/vote/last/ip', { ip: ip.ip })
        //   const now = new moment()
        //   //console.log(lastVote)
        //   if (lastVote.length === 0 || lastVote[0].time == null || lastVote[0].ip == null) {
        //     return true
        //   } else {
        //     const diff = moment.duration(now.diff(lastVote[0].time))
        //     if (diff._data.days > 0) {
        //       return  true
        //     } else {
        //       return false
        //     }
        //   }
        // } catch (e) {
        //   console.log(e)
        // }

      },
      async voteSave () {
        this.confirmDialog = false
        if (false) {
          this.$toast.error('ปิดโหวตแล้วจ้า')
        }
        else if (this.listVote.length > this.max_vote) {
          this.checkDialog = true
        } else if (this.listVote.length === 0) {
          this.$toast.error('เลือกซีรีส์ก่อนจ้า')
        } else {
          this.$toast.success('กำลังโหวต รอก่อนจ้า')
          // const ip = await this.$axios.$get("https://ipinfo.io")
          // const ip = ''
          let ip = await this.$axios.$get(process.env.voteServer + '/getip')
          ip = ip.split(',')
          ip = { ip: ip[0] }

          // if (true) {
          if (await this.checkValidIp(ip.ip)) {
            const bucket = {
              series: this.listVote,
              ip: ip
            }
            console.log(bucket)
            try {
              await this.$axios.post(process.env.voteServer + '/vote/add', bucket)
              for (let i=0;i<bucket.series.length;i++) {
                await this.$axios.put(process.env.voteServer + '/vote/final/series/score/add/' + bucket.series[i]._id)
              }
              this.$toast.success('โหวตสำเร็จ')
              this.listVote = []
              this.$router.push('/vote/2022-result')
            } catch (e) {
              this.$toast.error(e)
            }
          } else {
            this.$toast.error('โหวตได้ครั้งเดียวจ้า')
          }
        }
      }
    },
    async asyncData ({ app, env }) {
      const series = await app.$axios.$get(env.voteServer + '/vote/final/series')
      return { series }
    }
  }
</script>

<style scoped>
  .dragArea{
    min-height: 50px;
  }
</style>
