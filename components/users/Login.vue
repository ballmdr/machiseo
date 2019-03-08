<template>
    <div>
        <v-btn @click="facebook" icon><v-icon>fab fa-facebook-f</v-icon></v-btn>
        <!--<v-btn @click="twitter" icon><v-icon>fab fa-twitter</v-icon></v-btn>-->
        <v-btn @click="google" icon><v-icon>fab fa-google</v-icon></v-btn>
    </div>
</template>

<script>
export default {
  methods: {
    setStorage () {
      localStorage.setItem("ori_url", window.location.pathname)
    },
    async github () {
      await this.$auth.loginWith('github')
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

