<template>
  <v-layout column>
    <v-flex xs12>
      <v-card color="grey lighten-2" light>
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
    </v-flex>
    <v-flex xs12>
      <v-card color="grey lighten-3" light>
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
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: ['user', 'review'],
  data () {
    return {
      tmpBaseUrl: process.env.baseUrl
    }
  }
}
</script>
