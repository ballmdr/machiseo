<template>
  <v-card color="primary">
    <v-card-title>
      <v-btn @click="auth0" large color="warning"><span style="color:black">เข้าสู่ระบบเพื่อรีวิว</span></v-btn>
      <v-btn @click="github">github</v-btn> 
      <v-btn @click="google">google</v-btn>
      <v-btn @click="facebook">facebook</v-btn>
    </v-card-title>
  </v-card>
</template>

<script>
export default {
  methods: {
    async auth0 () {
      await this.$auth.loginWith('auth0')
    },
    async github () {
      await this.$auth.loginWith('github')
    },
    async google () {
      await this.$auth.loginWith('google')
    },
    async facebook () {
      await this.$auth.loginWith('facebook')
    }
  }
}
</script>
