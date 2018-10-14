<template>
  <v-app dark>
    <nav-bar></nav-bar>
    <v-content>
      <v-container grid-list-xl>
        <series-nav></series-nav>
        <nuxt />
      </v-container>
    </v-content>
  <footer-com></footer-com>
  </v-app>
</template>

<script>
import NavBar from '~/components/NavBar'
import Footer from '~/components/Footer'
import SeriesNav from '~/components/series/SeriesNav'

  export default {
    components: { NavBar, 'footer-com': Footer, SeriesNav }
  }
</script>

<style>
.container {
  max-width: 1200px;
}
</style>
