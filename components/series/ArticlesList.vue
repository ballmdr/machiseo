<template>
    <v-layout row wrap>
        <v-flex xs12 sm6 v-for="article in articles" :key="article.uuid" class="hvr-glow" >
            <v-card style="cursor:pointer" @click.native="$router.push('/posts/' + article.nid)">
                <v-img class="elevation-6" max-height="150" :src="base_url + article.field_thumbnail_article.url"></v-img>
                <v-card-title><nuxt-link :to="'/posts/' + article.nid">{{ article.title }}</nuxt-link></v-card-title>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
export default {
    props: ['articles'],
    data () {
        return {
            base_url: process.env.baseUrl
        }
    },
    mounted() {
        //console.log('article list', this.articles)
    }
}
</script>
