<template>
    <v-layout row wrap>
        <v-flex xs5 sm5 md4 v-for="article in articles" :key="article.uuid" class="hvr-float" >
            <v-card style="cursor:pointer" @click.native="$router.push('/posts/' + article.nid)">
                <v-img class="elevation-6" max-height="150" :src="checkUrl(article.field_thumbnail_article.uri.url)"></v-img>
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

        }
    },
    methods:{
        checkUrl(url) {
            const link = url.split('://')
            if (link[0] !== 'https'){
            return process.env.cdnUrl + url
            } else {
            return url
            }
        }
    },
    mounted() {
        //console.log('article list', this.articles)
    }
}
</script>
