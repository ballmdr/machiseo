<template>
  <div></div>
</template>

<script>
export default {
  async fetch ({ app, store }) {
    await app.$auth.logout()
    store.dispatch('users/clearUserDone')
  }
}
</script>
