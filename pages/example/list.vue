<template>
  <v-layout column>
    <v-flex  xs12 v-for="list in lists" :key="list._id" class="list-card">
      <list-card :listID="list._id" :listName="list.name"></list-card>
    </v-flex>
  </v-layout>
</template>

<script>
import ListCard from '~/components/lists/ListCard'

export default {
  components: { ListCard },
  async asyncData({ app, env }) {
    const lists = await app.$axios.$get(env.restMongoUrl + '/list/admin')
    return { lists }
  }
}
</script>

<style scoped>
.list-card {
  height: 400px;
}
</style>