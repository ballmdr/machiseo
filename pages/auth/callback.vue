<template>
  <div></div>
</template>

<script>
export default {
  mounted () {
    const url = localStorage.getItem('ori_url')
    localStorage.removeItem('ori_url')
    this.$router.push(url)
  }
}
</script>
