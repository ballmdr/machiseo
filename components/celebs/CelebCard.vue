<template>
  <span>
    <v-badge
      overlap
      color="purple"
      :value="celeb.field_instagram"
      bottom
    >
      <v-icon slot="badge">fab fa-instagram</v-icon>
      <v-avatar style="cursor:pointer" size="150" @click="$router.push(celeb.path.alias)"><v-img :src="baseUrl + celeb.field_celeb_profile.url"></v-img></v-avatar>
    </v-badge>
    <div style="font-weight:bold;"><nuxt-link :to="celeb.path.alias">{{ celeb.title }}</nuxt-link></div>
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
