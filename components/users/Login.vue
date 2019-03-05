<template>
    <div>
        <v-btn @click="github">github</v-btn> 
        <v-btn @click="google">google</v-btn>
        <v-btn @click="facebook">facebook</v-btn>
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
    }
  }
}
</script>

