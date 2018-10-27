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

export default {

  methods: {
    async auth0() {
      const res = await this.$auth.loginWith('auth0')
      this.$toast.show('Loggin')
    }
  },
  mounted() {
    this.$axios.$get(process.env.restMongoUrl + '/users/sub/' + this.$auth.$state.user.sub).then(user => {
      if (user.length > 0) {
        // user exist
        if (this.$auth.$state.user.name !== user[0].name || this.$auth.$state.user.picture !== user[0].picture) {
          this.$axios.$put(process.env.restMongoUrl + '/users/update/' + user[0]._id, this.$auth.$state.user)
        }
      } else {
        // not exist
        this.$axios.$post(process.env.restMongoUrl + '/users/create', this.$auth.$state.user)
      }
    })
  }
}
</script>
