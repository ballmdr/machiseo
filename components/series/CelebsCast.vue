<template>
  <div style="cursor:pointer" @click="$router.push(celeb.path.alias)">
    <v-avatar size="150"><v-img :src="baseUrl + celeb.field_celeb_profile.url"></v-img></v-avatar>
    <h3><nuxt-link :to="celeb.path.alias">{{ celeb.title }}</nuxt-link></h3>
  </div>
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

<style scoped>
h3 a {
  text-decoration: none;
  color: #FDFEFF;
}
</style>