<template>
  <v-layout row wrap>
    <v-flex xs6>
      <v-layout row wrap>
        <draggable class="dragArea" v-model="series" :list="series" :options="{group:'serie'}">
          <v-flex xs6 v-for="(serie, index) in series" :key="index">
            <v-card style="padding:5px;">
              <v-img max-width="200" :src="baseUrl + serie.field_poster[0].url"></v-img>
              {{ serie.title }}
            </v-card>
          </v-flex>
        </draggable>
      </v-layout>
    </v-flex>
    <v-flex xs6>
      <v-layout row wrap>
        <draggable class="dragArea" :list="listVote" :options="{group:'serie'}">
          <v-flex xs6>Drag Here</v-flex>
          <v-flex xs6 v-for="(element, index) in listVote" :key="index">
            <v-img max-width="150" :src="baseUrl + element.field_poster[0].url"></v-img>
            <span>{{ element.title }}</span>
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
      myArray: [
        {name: 'item1'}, {name: 'igtem2'}, {name: 'item3'}
      ]
    }
  },
  mounted() {
    console.log(this.series)
  },
  async asyncData () {
    const series = await getSeriesByYear(0, 4, 2018)
    return { series }
  }
}
</script>

<style scoped>
.dragArea{
  min-height: 50px;	
}
</style>