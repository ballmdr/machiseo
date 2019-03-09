<template>
  <v-app dark>
    <nav-bar></nav-bar>
    <v-content>
      <v-container grid-list-md>
        <nuxt />
      </v-container>
    </v-content>
  <footer-com></footer-com>
  </v-app>
</template>

<script>
import NavBar from '~/components/NavBar'
import Footer from '~/components/Footer'

export default {
  components: { NavBar, 'footer-com': Footer }
}
</script>

<style>
.application {
  font-family: 'Kanit', sans-serif;
  font-size: 16px;
  color: #9ab !important;
  background-color: #2c3440 !important;
}
h1, h2, h3, h4 {
  color: white !important;
}
.container {
  max-width: 1200px;
}
.v-card {
  border-radius: 10px;
}
a {
  text-decoration: none;
  color: white;
}

</style>
