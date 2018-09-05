<template>
<div @click="dialog = true">
  <v-hover>
    <v-card color="grey lighten-3" light slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`">
      <v-card-title>
        <v-avatar size="36px">
          <v-img :src="tmpBaseUrl + user.user_picture.url"></v-img>
        </v-avatar>
        <v-spacer></v-spacer>
        <h5 class="headline">{{ user.name }}</h5>
      </v-card-title>
      <v-divider light></v-divider>
      <v-card-text>
        <span v-html="review.comment_body[0].processed"></span>
      </v-card-text>
    </v-card>
  </v-hover>
  <v-dialog v-model="dialog" scrollable max-width="800">
    <ReviewCardModal :review="review" :user="user" />
  </v-dialog>
</div>
</template>

<script>
import ReviewCardModal from './ReviewCardModal'

export default {
  components: { ReviewCardModal },
  props: ['review', 'user'],
  data () {
    return {
      tmpBaseUrl: process.env.baseUrl,
      dialog: false
    }
  }
}
</script>

