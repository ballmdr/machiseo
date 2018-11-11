<template>
  <span>
      <v-badge
        overlap
        style="z-index:5;background: linear-gradient(to bottom right, #C90A6D, #FF48A0);border-radius:5px;"
      >
        <v-icon slot="badge">fab fa-instagram</v-icon>
    <v-avatar size="150"><v-img :src="baseUrl + celeb.field_celeb_profile.url"></v-img></v-avatar>
      </v-badge>
    <h2><nuxt-link :to="celeb.path.alias">{{ celeb.title }}</nuxt-link></h2>
  </span>
</template>

<script>
export default {
  props: ['celeb'],
  data () {
    return {
      baseUrl: process.env.baseUrl
    }
  }
}
</script>
