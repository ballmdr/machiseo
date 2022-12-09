<template>
  <episodes-list></episodes-list>
</template>

<script>
// import { getEpisodesBySerie, getSmallSerieByPath } from '~/assets/js/api'
import EpisodesList from '~/components/episodes/EpisodesList'

export default {
  components: { EpisodesList },
  head () {
    const canonical = `https://www.kodhit.com${this.$route.path}`
    const synopsis = 'สปอยล์ : ' + this.$options.filters.truncate(this.$store.state.episodes.ep[0].body.processed, 150)
    const title = 'สปอย : ' + this.$store.state.series.serie.title + ' ทุกตอน'
    const image = process.env.baseUrl + this.$store.state.episodes.ep[0].field_thumbnail.url
    return {
      title: title,
      meta: [
        { hid: 'description', name: 'description', content: synopsis },
        { hid: 'og_type', name: 'og:type', content: 'article' },
        { hid: 'og_title', name: 'og:title', content: title + ' สปอยทุกตอน' },
        { hid: 'og_description', name: 'og:description', content: synopsis },
        { hid: 'og_image', name: 'og:image', content: image },
        { hid: 'og_url', name: 'og:url', content: canonical },
        { hid: 'og_sitename', name: 'og:site_name', content: 'โคตรฮิต! Kodhit.com' },
        { hid: 'twitter_title', name: 'twitter:title', content: title },
        { hid: 'twitter_description', name: 'twitter:description', content: synopsis },
        { hid: 'twitter_image', name: 'twitter:image', content: image },
        { hid: 'twitter_site', name: 'twitter:site', content: '@kodhithd' },
        { hid: 'twitter_creator', name: 'twitter:creator', content: '@kodhithd' }
      ],
      link: [
        { rel: 'canonical', href: canonical }
      ]
    }
  },
  async fetch ({ params, env, store }) {
    await store.dispatch('series/setSerie', params.title)
    await store.dispatch('episodes/setEp', params.title)
  }
}
</script>
