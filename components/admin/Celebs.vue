<template>
  <v-form>
    <v-layout row>
      <v-flex xs12 class="text-xs-right">
        <div v-for="(celeb, index) in celebs" :key="index">
          <v-layout row>
            <v-flex xs1 class="text-xs-right"><v-text-field v-model="celeb.rank"></v-text-field></v-flex>
            <v-flex xs4><v-text-field v-model="celeb.path" label="path"></v-text-field></v-flex>
            <v-flex xs1><v-btn flat small color="warning" round @click="del(index)">ลบ</v-btn></v-flex>
            <v-flex xs5><span v-text="celeb.title"></span></v-flex>
          </v-layout>
          <v-divider></v-divider>
        </div>
        <v-btn color="primary" round @click="addCeleb">เพิ่มดารา</v-btn>
        <v-btn color="warning" round @click="celebSave"><span class="black--text">บันทึก</span></v-btn>
      </v-flex>
    </v-layout>
  </v-form>
</template>

<script>
import { getCelebByUuid } from '~/assets/js/api'

export default {
  props: ['celebs'],
  methods: {
    del (index) {
      this.celebs.splice(index, 1)
    },
    addCeleb() {
      this.celebs.push({ path: '', rank: '' })
    },
    async celebSave () {
      for (let i=0;i<this.celebs.length;i++) {
        const router = await this.$axios.get('/router/translate-path?path=' + this.celebs[i].path)
        const res = await getCelebByUuid(router.data.entity.uuid)
        this.celebs[i].title = res.title
        this.celebs[i].uuid = res.id
        this.celebs[i].nid = res.nid
        this.celebs[i].profile = res.field_celeb_profile.url
        await this.$axios.get(process.env.restMongoUrl + '/admin/home/clear/celebs')
        await this.$axios.post(process.env.restMongoUrl + '/admin/home/save/celebs', this.celebs)
        const { data } = await this.$axios.get(process.env.restMongoUrl + '/admin/home/celebs')
        this.celebs = data
      }
    }
  }
}
</script>
