<template>
  <v-app dark>
    <nav-bar></nav-bar>
    <v-content class="preventcopy">
      <v-container grid-list-md >
        <nuxt-link to="/series/my-lovely-liar"><v-img src="https://cdn.machiseo.net/sites/default/files/lair_head.jpg"></v-img></nuxt-link>
        <br>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer
      dark
      height="auto"
    >

    </v-footer>
  <div class="before-foot"></div>
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
ul.footer-link-list {
  list-style-type: none;
}
.before-foot {
  margin-bottom: 50px;
  display: block;
  height: 100px;
}
.application {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, '.SFNSText-Regular', sans-serif;
  -webkit-font-smoothing: subpixel-antialiased;
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
.preventcopy {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.poster-thumbnail {
  cursor:pointer;
  border-radius:15px;
  max-height:350px;
}
</style>
