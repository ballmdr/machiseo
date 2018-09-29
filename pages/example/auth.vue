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
      const res = await this.$auth.loginWith('facebook').catch(e => {
        this.$toast.show('Error', {icon: "fingerprint"});
      })
      this.$toast.success('Logged In!')
    },
    async logout() {
      await this.$auth.logout()
    }
  }
}
</script>
