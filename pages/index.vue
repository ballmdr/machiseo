<template>
  <div>
    <v-btn @click="auth0">AUTH0</v-btn>
    <nuxt-link to="/auth/logout"><v-btn>Logout</v-btn></nuxt-link>
    <v-divider></v-divider>
    <v-flex xs12 v-if="$auth.loggedIn">LOG IN</v-flex>
    <v-flex xs12 v-else>NOT LOG</v-flex>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {

  methods: {
    ...mapMutations({
      clearUserDone: 'users/clearUserDone'
    }),
    async facebook() {
      const res = await this.$auth.loginWith('facebook').catch(e => {
        this.$toast.show('Error', {icon: "fingerprint"});
      })
      this.$toast.success('Logged In!')
    },
    async auth0() {
      const res = await this.$auth.loginWith('auth0')
      this.$toast.show('Loggin')
    }
  }
}
</script>
