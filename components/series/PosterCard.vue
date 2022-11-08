<template>
  <div class="text-xs-center" @click="$router.push(serie.path.alias)" style="cursor:pointer">
    <v-img :src="poster_img" class="poster"></v-img>
    <span style="font-weight:bold;"><NuxtLink :to="serie.path.alias">{{ serie.title }}</NuxtLink></span>
  </div>
</template>

<script>
export default {
  props: ['serie'],
  data () {
    return {
      poster_img: this.serie.field_poster[0].uri.url
    }
  },
  mounted(){
    const link = this.poster_img.split('://')
    if (link[0] !== 'https') {
      this.poster_img = process.env.cdnUrl + this.poster_img
    } else {
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