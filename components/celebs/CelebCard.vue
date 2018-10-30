<template>
  <span>
    <v-avatar size="150"><v-img :src="baseUrl + celeb.field_celeb_profile.url"></v-img></v-avatar>
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
