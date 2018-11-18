<template>
  <episodes-list></episodes-list>
</template>

<script>
import { getEpisodesBySerie, getSmallSerieByPath } from '~/assets/js/api'
import EpisodesList from '~/components/episodes/EpisodesList'

export default {
  components: { EpisodesList },
  head () {
    const canonical = `https://www.machiseo.com${this.$route.path}`
    const synopsis = 'สปอยด์ : ' + this.$options.filters.truncate(this.$store.state.episodes.ep[0].body.processed, 150)
    const title = 'สปอยด์ : ' + this.$store.state.series.serie.title + ' - ซีรีส์เกาหลี'
    const image = process.env.baseUrl + this.$store.state.episodes.ep[0].field_thumbnail.url
    return {
      title: title,
      meta: [
        { hid: 'description', name: 'description', content: synopsis },
        { hid: 'og_type', name: 'og:type', content: 'article' },
        { hid: 'og_title', name: 'og:title', content: title + ' - มาชิสซอ' },
        { hid: 'og_description', name: 'og:description', content: synopsis },
        { hid: 'og_image', name: 'og:image', content: image },
        { hid: 'og_url', name: 'og:url', content: canonical },
        { hid: 'og_sitename', name: 'og:site_name', content: 'มาชิสซอ Machiseo.com'},
        { hid: 'twitter_title', name: 'twitter:title', content: title },
        { hid: 'twitter_description', name: 'twitter:description', content: synopsis },
        { hid: 'twitter_image', name: 'twitter:image', content: image },
        { hid: 'twitter_site', name: 'twitter:site', content: '@machiseo' },
        { hid: 'twitter_creator', name: 'twitter:creator', content: '@machiseo' }
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
