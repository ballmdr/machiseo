<template>
  <episodes-list></episodes-list>
</template>

<script>
import { getEpisodesBySerie, getSmallSerieByPath } from '~/assets/js/api'
import EpisodesList from '~/components/episodes/EpisodesList'

export default {
  components: { EpisodesList },
  data () {
    return {

    }
  },
  async fetch ({ params, env, store }) {
    await store.dispatch('series/setSerie', params.title)
    await store.dispatch('episodes/setEp', params.title)
  }
}
</script>
