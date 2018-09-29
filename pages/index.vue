<template>
  <div>
    <v-btn @click="facebook">Facebook</v-btn>
    <v-btn @click="logout">Logout</v-btn>
  </div>
</template>

<script>
export default {
  methods: {
    async facebook() {
      await this.$auth.loginWith('facebook')
      this.$toast.success('Logged In!')
    },
    async logout() {
      await this.$auth.logout()
      this.$toast.success('Logout')
    }
  }
}
</script>
