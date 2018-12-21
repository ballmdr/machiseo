<template>
  <div>IP: {{ ip }}</div>
</template>

<script>
export default {
  data () {
    return {
      ip: null
    }
  },
  async mounted() {
    this.ip = await this.$axios.$get(process.env.voteServer + '/getip')
  }
}
</script>
