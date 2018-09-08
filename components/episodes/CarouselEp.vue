<template>
  <v-carousel>
    <v-carousel-item
      v-for="(item,i) in imgStreaming"
      :key="i"
      :src="tmpBaseUrl + item.url"
    ></v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  props: ['imgStreaming'],
  data () {
    return {
      tmpBaseUrl: process.env.baseUrl
    }
  }
}
</script>
