<template>
  <v-flex d-flex xs4>
    <v-card color="grey lighten-3" light>
      <v-card-title>
        <v-avatar size="36px">
          <slot name="user_picture"></slot>
        </v-avatar>
        <v-spacer></v-spacer>
        <slot name="username"></slot>
      </v-card-title>
      <v-divider light></v-divider>
      <v-card-text>
        <slot name="comment_body"></slot>
      </v-card-text>
    </v-card>
  </v-flex>
</template>
