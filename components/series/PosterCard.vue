<template>
  <div class="text-xs-center" @click="$router.push(serie.path.alias)" style="cursor:pointer">
    <v-img :src="baseUrl + serie.field_poster[0].url" class="poster"></v-img>
    <span style="font-weight:bold;"><nuxt-link :to="serie.path.alias">{{ serie.title }}</nuxt-link></span>
  </div>
</template>

<script>
export default {
  props: ['serie'],
  data () {
    return {
      baseUrl: process.env.baseUrl
    }
  }
}
</script>

<style scoped>
.poster {
  max-width: 300px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, .3);
}
</style>