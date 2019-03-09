<template>
    <v-layout column>
      <v-flex xs12>
        <v-btn @click="auth0"  color="white"><v-icon color="facebook">fab fa-facebook-f</v-icon>&nbsp;&nbsp;&nbsp;<v-icon color="twitter">fab fa-twitter</v-icon>&nbsp;&nbsp;<v-icon color="google">fab fa-google</v-icon></v-btn>
      </v-flex>
      <!--<v-flex xs12>
        ปุ่มสำรอง <v-btn @click="facebook" icon color="facebook"><v-icon>fab fa-facebook</v-icon></v-btn>
        <v-btn @click="google" icon color="google"><v-icon>fab fa-google</v-icon></v-btn>
      </v-flex>-->
    </v-layout>
</template>

<script>
export default {
  methods: {
    setStorage () {
      localStorage.setItem("ori_url", window.location.pathname)
    },
    async auth0 () {
      this.setStorage()
      await this.$auth.loginWith('auth0')
    },
    async google () {
      this.setStorage()
      await this.$auth.loginWith('google')
    },
    async facebook () {
      await this.$auth.loginWith('facebook')
    },
    async twitter () {
      await this.$auth.loginWith('twitter')
    }
  }
}
</script>

