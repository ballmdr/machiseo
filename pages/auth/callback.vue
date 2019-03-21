<template>
  <div style="margin:auto">
    <v-progress-circular
      :size="50"
      color="amber"
      indeterminate
    ></v-progress-circular>
  </div>
</template>

<script>
export default {
  mounted () {
    const url = localStorage.getItem('ori_url')
    localStorage.removeItem('ori_url')
    if (url !== null) {
      this.$router.push(url)
    } else {
      this.$router.push('/')
    }
  }
}
</script>
