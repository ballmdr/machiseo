<template>
  <div>
    <div>User: <v-text-field outline dark v-model="user.name"></v-text-field></div>
    <div>Email: <v-text-field dark v-model="user.quote"></v-text-field></div>
    <v-btn @click="submit">Submit</v-btn>
    <div v-for="userData in users" :key="userData._id">
      <div>ID: {{ userData._id }}</div>
      <div>Name: {{ userData.name }}</div>
      <div>Quote: {{ userData.quote }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      user: {
        name: '',
        quote: ''
      }
    }
  },
  methods: {
    async submit () {
      const res = await this.$axios.$post('http://localhost:3000/quotes', this.user)
      this.user.name = ''
      this.user.quote = ''
      console.log(res)
    }
  },
  async asyncData ({app}) {
    const res = await app.$axios.$get('http://localhost:3000/')
    const users = []
    res.forEach(element => {
      users.push(element)
    });
    return { users }
  }
}
</script>
