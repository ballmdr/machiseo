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

    }
  },
  computed: {
    root() {
      if (Object.keys(this.$route.params).length === 0) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>
