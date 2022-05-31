<template>
  <div class="text-xs-center" @click="$router.push(serie.path.alias)" style="cursor:pointer">
    <v-img :src="poster_img" class="poster"></v-img>
    <span style="font-weight:bold;"><nuxt-link :to="serie.path.alias">{{ serie.title }}</nuxt-link></span>
  </div>
</template>

<script>
export default {
  props: ['serie'],
  data () {
    return {
      poster_img_ori: this.serie.field_poster[0].uri.url
    }
  },
  mounted(){
    //console.log(this.serie)
    const link = this.poster_img_ori.split('://')
    if (link[0] !== 'https') {
      this.poster_img = process.env.cdnUrl + this.poster_img_ori
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