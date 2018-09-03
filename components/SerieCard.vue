<template>
  <v-hover>
    <v-card
      slot-scope="{ hover }"
      :class="`elevation-${hover ? 12 : 2}`"
      class="mx-auto"
      width="344"
    >
      <v-img
        :aspect-ratio="9/16"
        :src="serie.poster"
        @click="$router.push('/series/' + serie.title)"
      ><v-layout
                      slot="placeholder"
                      fill-height
                      align-center
                      justify-center
                      ma-0
                    >
                      <v-progress-circular indeterminate color="purple"></v-progress-circular>
                    </v-layout>
                   <!-- <div class="fill-height bottom-gradient"></div> --></v-img>
      <v-card-title>
        <div>
          <span class="headline">{{ serie.title }}</span>
          <div class="d-flex">
            <v-rating
              :value="value"
              color="amber"
              dense
              half-increments
              readonly
              size="14"
            ></v-rating>
            <div class="ml-2 grey--text text--darken-2">
              <span>{{ value }}</span>
              <span>({{ reviews }})</span>
            </div>
          </div>
        </div>
      </v-card-title>
      <v-spacer></v-spacer>
      <v-card-actions>
        <v-icon dark="">rate_review</v-icon>
        <small>{{ serie.reviews_count }}</small>
      </v-card-actions>
    </v-card>
  </v-hover>
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