<template>
  <span>
    <v-badge
      overlap
      color="purple"
      :value="celeb.field_instagram"
      bottom
    >
      <v-icon slot="badge">fab fa-instagram</v-icon>
      <v-avatar style="cursor:pointer" size="150" @click="$router.push(celeb.path.alias)"><v-img :src="profile_img"></v-img></v-avatar>
    </v-badge>
    <div style="font-weight:bold;"><nuxt-link :to="celeb.path.alias">{{ celeb.title }}</nuxt-link></div>
  </span>
</template>

<script>
export default {
  props: ['celeb'],
  data () {
    return {
      profile_img: this.celeb.field_celeb_profile.uri.url
    }
  },
  mounted(){
    //console.log(this.celeb)
    const link = this.profile_img.split('://')
    if (link[0] !== 'https') {
      this.profile_img = process.env.cdnUrl + this.profile_img
    }
  }
}
</script>
