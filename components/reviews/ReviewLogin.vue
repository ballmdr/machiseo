<template>
  <v-card color="primary">
    <v-card-title>
      <v-layout align-center justify-center row wrap fill-height>
        <v-flex xs12 sm6>
          <h4>มาให้เรตติ้งกันเถอะ ล็อกอินคลิกเลย</h4>
        </v-flex>
        <v-flex xs12 sm6>
          <login></login>
        </v-flex>
      </v-layout>
    </v-card-title>
  </v-card>
</template>

<script>
import Login from '~/components/users/Login'

export default {
  components: {
    Login
  }
}
</script>
