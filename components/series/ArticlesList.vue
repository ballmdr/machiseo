<template>
    <v-layout row wrap justify-center align-center>
        <v-flex xs12 sm5 md4 v-for="article in articles" :key="article.id" class="hvr-float" style="margin:10px">
            <v-card color="orange" style="cursor:pointer" @click.native="$router.push(article.path.alias)">
                <v-card-title><nuxt-link :to="article.path.alias">{{ article.title }}</nuxt-link></v-card-title>
                <v-img class="elevation-6" max-height="150" :src="checkUrl(article.field_thumbnail_article.uri.url)"></v-img>
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
