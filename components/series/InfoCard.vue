<template>
  <v-card color="infoBack" class="black--text">
    <v-layout row>
      <v-flex xs7>
        <v-card-title primary-title>
            <h1 class="display-2">{{ serie.title }}</h1>
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
          <v-card-text>
            {{ serie.synopsis }}
          </v-card-text>
        </v-card>
        <v-divider light></v-divider>
        <v-card-text v-html="serie.body">
        </v-card-text>
      </v-flex>
      <v-flex xs5>
        <v-img :src="serie.poster" :aspect-ratio="9/16">
          <div class="fill-height bottom-gradient"></div>
        </v-img>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  props: ['serie'],
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