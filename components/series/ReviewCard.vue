<template>
  <v-flex d-flex xs4>
    <v-card color="grey lighten-3" light>
      <v-card-title>
        <v-avatar size="36px">
          <v-img src="https://instagram.fbkk5-3.fna.fbcdn.net/vp/d63cd395cb4d6f453c50e79787c9570d/5C227B11/t51.2885-19/s150x150/33736505_1402745126538480_3094634983147438080_n.jpg"></v-img>
        </v-avatar>
      </v-card-title>
      <v-divider light></v-divider>
      <v-card-text>
        <slot name="comment_body"></slot>
      </v-card-text>
    </v-card>
  </v-flex>
</template>
