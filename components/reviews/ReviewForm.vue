<template>
  <v-card color="primary" >
    <v-card-title>
      <v-avatar size="38"><v-img :src="$store.getters['users/picture']"></v-img></v-avatar>&nbsp;&nbsp;<span class="headline">{{ $store.getters['users/name'] }}</span>
    </v-card-title>
    <v-btn @click="$auth.logout()">Logout</v-btn>
    <v-divider dark></v-divider>
    <v-card-actions>
      <v-rating v-model="currentScore" color="yellow" half-increments hover></v-rating>
      <!--<v-btn @click="setScore(1)" :class="{'selecting': currentScore == 1}">1</v-btn>
      <v-btn @click="setScore(2)" :class="{'selecting': currentScore == 2}">2</v-btn>
      <v-btn @click="setScore(3)" :class="{'selecting': currentScore == 3}">3</v-btn>
      <v-btn @click="setScore(4)" :class="{'selecting': currentScore == 4}">4</v-btn>-->
    </v-card-actions>
    <v-card-text>
      <v-textarea
        dark
        flat
        v-model="review_text"
        label="เขียนรีวิว"
        outline
      ></v-textarea>
      <v-btn large round color="warning" @click="reviewSave"><span style="color:black">โพสต์รีวิว</span></v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
import { getUserObj } from '~/assets/js/util'

export default {
  data () {
    return {
      currentScore: 0,
      review_text: '',
      user: {},
      reviewObj: {}
    }
  },
  methods: {
    setScore(selectedScore) {
      this.currentScore = selectedScore
    },
    async updateUser(){
      const tmp_user = await this.$axios.$get(process.env.restMongoUrl + '/users/' + this.$store.getters['users/subId'])
      if (tmp_user.length > 0){
        /* User exists -> update user */
        await this.$axios.$put(process.env.restMongoUrl + '/users/update/' + tmp_user[0]._id, this.$store.getters['users/getUser'])
      } else {
        /* User not exists -> create user */
        await this.$axios.$post(process.env.restMongoUrl + '/users/create', this.$store.getters['users/getUser'])
      }
    },
    async reviewSave () {
      this.updateUser()
      this.reviewObj = {
        serie_id: String(this.$store.getters['series/nid']),
        sub_id: this.$store.getters['users/subId'],
        review_text: this.review_text,
        score: this.currentScore,
        tag: []
      }
      await this.$axios.$post(process.env.restMongoUrl + '/reviews/create', this.reviewObj)
      //this.$store.dispatch('reviews/setReview', this.reviewObj)
      this.clearForm()
      this.$emit('reviewUpdateNew')
    },
    clearForm(){
      this.currentScore = 0
      this.review_text = ''
      this.tag = []
    }
  }
}
</script>


<style scoped>
.no-vote {
  color: grey;
}      
.selecting {
  color: green;
}                                    
</style> 