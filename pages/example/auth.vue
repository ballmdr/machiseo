<template>
  <div>
    <v-btn @click="facebook">Facebook</v-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  mounted() {},
  watch: {},
  components: {},
  methods: {
    google() {
      
    },
    async facebook(){
      await this.$auth.loginWith('facebook').catch(e => {
        this.$toast.show('Error', {icon: "fingerprint"});
      })
    }
  }
}
</script>
