<template>
  <div style="cursor:pointer" @click="$router.push(celeb.path.alias)">
    <v-avatar size="150"><v-img :src="baseUrl + celeb.field_celeb_profile.url"></v-img></v-avatar>
    <h4>{{ celeb.title }}</h4>
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
