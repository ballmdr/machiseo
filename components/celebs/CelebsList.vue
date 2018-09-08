<template>
  <div>
    <v-layout row wrap>
      <v-flex xs6 sm4 md3 lg3 v-for="(celeb, index) in celebs" :key="index" style="cursor:pointer" class="text-xs-center" @click="showCeleb(index)">
        <v-card dark>
          <v-avatar size="200"><v-img :aspect-ratio="1/1" :src="tmpBaseUrl + celeb.field_celeb_profile.url"></v-img></v-avatar>
          <v-card-title class="headline">
            {{ celeb.title }}
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
    <v-dialog v-model="celebDialog" scrollable max-width="800px">
      <v-card dark>
        <v-card-title class="red white--text headline">
          <v-avatar size="64"><v-img :src="tmpBaseUrl + profilePic"></v-img></v-avatar>
          &nbsp;{{ title }}
          <v-spacer></v-spacer>
          <v-btn icon dark @click.native="celebDialog = false"><v-icon>close</v-icon></v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 100%; padding:50px;">
          <v-card light>
            <v-card-title class="headline">ซีรีส์ที่เล่น</v-card-title>
            <v-card-text>
              <v-layout row wrap>
                <v-flex xs6 sm4 md3 lg2 v-for="(serie, j) in series" :key="j">
                  <v-card dark>
                    
                    <v-card-text>{{ serie.title }} </v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>
          <v-card light>
            <v-card-title class="headline">รางวัล</v-card-title>
            <v-card-text>
              <p v-html="reward"></p>
            </v-card-text>
          </v-card>

        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ['celebs'],
  data () {
    return {
      tmpBaseUrl: process.env.baseUrl,
      celebDialog: false,
      title: null,
      profilePic: null,
      reward: null,
      series: null
    }
  },
  methods: {
    showCeleb (index) {
      this.profilePic = this.celebs[index].field_celeb_profile.url
      this.title = this.celebs[index].title
      this.reward = this.celebs[index].field_celeb_reward.processed
      this.series = this.celebs[index].field_series_actors
      this.celebDialog = true
    }
  }
}
</script>
