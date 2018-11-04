<template>
  <v-layout row wrap justify-center align-center>
    <v-flex d-flex xs10 sm10 md6 v-for="serie in sticky" :key="serie.id" >
      <v-card>
        <v-toolbar color="primary"><h3>{{ serie.title }} | เรตติ้งตอนล่าสุด&nbsp;</h3>     
          <v-progress-circular
          :rotate="360"
          size="60"
          width="5"
          value="85"
          color="warning"
          >
            85%
          </v-progress-circular>
          
        </v-toolbar>
        <v-layout row>
          <v-flex xs4>
            <v-img
            max-width="300"
            style="border-radius:10px;" 
            :src="baseUrl + serie.field_poster[0].url"
            ></v-img>
          </v-flex>
          <v-flex xs4>
            <h3>ดารานักแสดง</h3>
            <v-flex xs12 v-for="(celeb, index) in serie.field_celeb" :key="celeb.id">
              <div v-if="index < 4"><v-avatar size="50"><v-img :src="baseUrl + celeb.field_celeb_profile.url"></v-img></v-avatar>
              {{ celebName(celeb.title) }}
              </div>
            </v-flex>
          </v-flex>
          <v-flex xs4>
            <h3 style="margin-bottom:10px;">บทวิจารณ์</h3>
            <p>"รอเรื่องนี้เรื่องเดียว"</p>
            <p>"ยังกวนเหมือนเดิม ฮามาก"</p>
            <p>"พระเอกหล่อทะลุจอมาก หล่อยังกับหลุดออกมาจากเว็บตูน คุณพระ"</p>
          </v-flex>
        </v-layout>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: ['sticky'],
  data () {
    return {
      baseUrl: process.env.baseUrl
    }
  },
  methods: {
    celebName (name) {
      const res = name.split(" ")
      return res[0]
    }
  }
}
</script>

<style scoped>

</style>