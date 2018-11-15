<template>
  <v-layout row wrap justify-center>
    <v-flex xs12>
      <h1 v-if="!root">{{ $store.state.series.serie.title }}</h1>
      <h2 :class="{'grey--text subheading': !root}">สปอยด์รายตอน - ซีรีส์เกาหลี</h2>
    </v-flex>
    <v-flex xs12>
      <nuxt-child :key="$route.params.ep" />
    </v-flex>
  </v-layout>
</template>

<script>

export default {
  data () {
    return {
      root: true
    }
  },
  mounted() {
    console.log('route', this.$route.params)
    if (typeof (this.$route.params.ep) !== 'undefined') {
      this.root = false
    } else { 
      this.root = true
    }
  }
}
</script>
