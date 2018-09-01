<template>
  <v-card dark height="100%">
    <v-card-media>
      <img :src="serie.poster" class="image" width="100%" height="100%" @click="$router.push('/series/'+serie.title)" style="cursor:pointer">
    </v-card-media>
    <v-card-title class="headline">
      <nuxt-link :to="'/series/' + serie.title" :title="serie.title">{{ serie.title }}</nuxt-link>
    </v-card-title>
  </v-card>
</template>

<script>

export default {
  props: ['serie']
}
</script>
