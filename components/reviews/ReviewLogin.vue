<template>
  <v-card color="primary">
    <v-card-title>
      <v-btn @click="auth0" large color="warning"><span style="color:black">เข้าสู่ระบบเพื่อรีวิว</span></v-btn>
    </v-card-title>
  </v-card>
</template>

<script>
export default {
  methods: {
    async auth0() {
      await this.$auth.loginWith('auth0')
    }
  }
}
</script>
