<template>
  <v-card color="infoBgcolor" class="black--text">
    <v-layout row>
      <v-flex xs7>
        <v-card-title primary-title>
          <slot name="title"></slot>
        </v-card-title>
        <v-card-actions class="pa-3">
          <div class="d-flex">
            <v-rating
              :value="value"
              color="yellow darken-1"
              dense
              half-increments
              readonly
              size="20"
            ></v-rating>
            <div class="ml-2 grey--text text--darken-2">
              <span>{{ value }}</span>
              <span>({{ reviews }})</span>
            </div>
          </div>
        </v-card-actions>
         <v-card color="purple">
           <v-card-text><slot name="synopsis"></slot></v-card-text>
        </v-card>
        <v-divider light></v-divider>
        <v-card-text><slot name="body"></slot></v-card-text>
      </v-flex>
      <v-flex xs5>
        <slot name="img"></slot>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    reviews: 413,
    value: 4.5
  })
}
</script>

<style scoped>
.bottom-gradient {
  background-image: linear-gradient(to top, rgba(0, 0, 0, 0.4) 0%, transparent 72px);
}
</style>