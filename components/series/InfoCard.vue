<template>   
    <v-layout row wrap>
      <v-flex xs12 sm7>
        <v-card-title primary-title >
          <slot name="title"></slot>
          <slot name="tag"></slot>
        </v-card-title>
        <v-divider dark></v-divider>
        <v-card-text class="subheading"><slot name="synopsis"></slot></v-card-text>
        <v-divider dark></v-divider>
        <v-card-text><slot name="body"></slot></v-card-text>
      </v-flex>
      <v-flex xs12 sm5 style="padding:20px;">
        <slot name="poster"></slot>
      </v-flex>
    </v-layout>

</template>
