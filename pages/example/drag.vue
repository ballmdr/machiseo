<template>
  <v-layout row>
    <v-flex xs4 d-flex>
      <v-card>
        <v-card-text>
          <draggable style="min-height:200px;" :list="listVote" :options="{group:'serie'}">
            <v-flex xs12>ลากมาตรงนี้ | คลิกที่รูปเพื่อลบออก</v-flex>
            <v-flex class="hvr-border-fade" style="cursor:pointer" xs12 v-for="(element, index) in listVote" :key="index" @click="removeVote(index)">
              <v-img max-width="150" :src="baseUrl + element.poster"></v-img>
              <span>{{ element.title }}</span>
            </v-flex>
          </draggable>
          <v-text-field v-model="author" label="ใส่ชื่อ (ไม่ใส่ก็ได้)"> </v-text-field>
          <v-btn round color="warning" @click="voteSave" style="color:black;">โหวต</v-btn>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex xs8>
      <v-layout row wrap>
        <draggable class="dragArea" v-model="series" :list="series" :options="{group:'serie'}">
          <v-flex @click="addVote(index)" class="hvr-reveal" xs6 v-for="(serie, index) in series" :key="index">
              <v-img width="200" :src="baseUrl + serie.poster"></v-img>
              {{ serie.title }} ({{ serie.score }})
          </v-flex>
        </draggable>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import draggable from 'vuedraggable'
import { getSeriesByYear } from '~/assets/js/api'

export default {
  components: {
    draggable
  },
  data () {
    return {
      listVote: [],
      baseUrl: process.env.baseUrl,
      author: ''
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
    async voteSave () {
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