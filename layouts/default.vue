<template>
  <v-app dark>
    <nav-bar></nav-bar>
    <v-content class="preventcopy">
      <v-container grid-list-md >
        <nuxt-link to="/vote/2022-result"><v-img src="https://cdn.machiseo.net/sites/default/files/voteresult2022-banner.jpg"></v-img></nuxt-link>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer
      dark
      height="auto"
    >
      <v-card
        class="flex"
        flat
      >
      <v-card-text>
        <v-layout row wrap>
          <v-flex xs12 sm5 md4 lg4>
            <ul class="footer-link-list">
              <li><nuxt-link to='/series'>ซีรีส์เกาหลี</nuxt-link></li>
              <li><nuxt-link to="/series/year/2022">ซีรีส์เกาหลี 2022</nuxt-link></li>
              <li><nuxt-link to="/series/year/2021">ซีรีส์เกาหลี 2021</nuxt-link></li>
              <li><nuxt-link to="/series/year/2020">ซีรีส์เกาหลี 2020</nuxt-link></li>
              <li><nuxt-link to="/series/year/2019">ซีรีส์เกาหลี 2019</nuxt-link></li>
              <li><nuxt-link to="/series/year/2018">ซีรีส์เกาหลี 2018</nuxt-link></li>
              <li><nuxt-link to="/series/year/2017">ซีรีส์เกาหลี 2017</nuxt-link></li>
              <li><nuxt-link to="/series/year/2016">ซีรีส์เกาหลี 2016</nuxt-link></li>
              <li><nuxt-link to="/series/year/2015">ซีรีส์เกาหลี 2015</nuxt-link></li>
              <li><nuxt-link to="/series/year/2014">ซีรีส์เกาหลี 2014</nuxt-link></li>
              <li><nuxt-link to="/series/year/2013">ซีรีส์เกาหลี 2013</nuxt-link></li>
              <li><nuxt-link to="/series/year/2012">ซีรีส์เกาหลี 2012</nuxt-link></li>
              <li><nuxt-link to="/series/year/2011">ซีรีส์เกาหลี 2011</nuxt-link></li>
              <li><nuxt-link to="/series/year/2010">ซีรีส์เกาหลี 2010</nuxt-link></li>
            </ul>
          </v-flex>
          <v-flex xs12 sm5 md4 lg4>
            <ul class="footer-link-list">
              <li><nuxt-link to="/series/reborn-rich">Reborn Rich</nuxt-link></li>
              <li><nuxt-link to="/series/law-cafe">The Law Cafe</nuxt-link></li>
              <li><nuxt-link to="/series/big-mouth">Big Mouth</nuxt-link></li>
              <li><nuxt-link to="/series/my-roommate-gumiho">My roommate is a gumiho</nuxt-link></li>
              <li><nuxt-link to="/series/mr-queen">Mr Queen</nuxt-link></li>
              <li><nuxt-link to="/series/moon-lovers">Moon Lovers</nuxt-link></li>
              <li><nuxt-link to="/series/18-again">18 Again</nuxt-link></li>
              <li><nuxt-link to="/series/doom-your-service">Doom at your service</nuxt-link></li>
              <li><nuxt-link to="/series/vincenzo">Vincenzo</nuxt-link></li>
              <li><nuxt-link to="/series/it%E2%80%99s-okay-not-be-okay">It's ok to not be ok</nuxt-link></li>
              <li><nuxt-link to="/series/crash-landing-you">Crash landing on you</nuxt-link></li>
              <li><nuxt-link to="/series/police-university">Police University</nuxt-link></li>
              <li><nuxt-link to="/series/touch-your-heart">Touch your heart</nuxt-link></li>
              <li><nuxt-link to="/series/beauty-inside">The beauty inside</nuxt-link></li>
              <li><nuxt-link to="/series/crowned-clown">The crowned clown</nuxt-link></li>
              <li><nuxt-link to="/series/veil">The veil</nuxt-link></li>
              <li><nuxt-link to="/series/while-you-were-sleeping">While you were sleeping</nuxt-link></li>
              <li><nuxt-link to="/series/emperor-owner-mask">The emperor: owner of the mask</nuxt-link></li>
              <li><nuxt-link to="/series/suspicious-partner">Suspicious partner</nuxt-link></li>
            </ul>
          </v-flex>
        </v-layout>
      </v-card-text>
      </v-card>
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
