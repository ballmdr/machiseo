<template>
  <div>
    <v-btn @click="auth0">AUTH0</v-btn>
    <v-btn @click="logout">Logout</v-btn>
    <v-divider></v-divider>
    <v-flex xs12 v-if="$auth.loggedIn">LOG IN</v-flex>
    <v-flex xs12 v-else>NOT LOG</v-flex>
  </div>
</template>

<script>
export default {

  methods: {
    async facebook() {
      const res = await this.$auth.loginWith('facebook').catch(e => {
        this.$toast.show('Error', {icon: "fingerprint"});
      })
      this.$toast.success('Logged In!')
    },
    async auth0() {
      const res = await this.$auth.loginWith('auth0')
      this.$toast.show('Loggin')
    },
    async logout() {
      await this.$auth.logout()
    }
  }
}
</script>
