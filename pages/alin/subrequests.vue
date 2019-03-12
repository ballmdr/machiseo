<template>
  <div></div>
</template>

<script>
// import jsonapiParse from 'jsonapi-parse'

export default {
  async mounted (limit = 5) {
    await this.$axios.$post('/subrequests?_format=json',
      [
        {
          'requestId': 'episodes',
          'action': 'view',
          'uri': '/jsonapi/episodes?page[limit]=5&sort=-nid&include=field_thumbnail,field_series_episode,field_series_episode.field_poster',
          'headers': { 'Accept': 'application/vnd.api+json' }
        },
        {
          'requestId': 'onair',
          'action': 'view',
          'uri': '/jsonapi/series?filter[field_on_air][condition][path]=field_on_air&filter[field_on_air][condition][operator]=%3D&filter[field_on_air][condition][value]=1&include=field_poster,field_celeb,field_celeb.field_celeb_profile',
          'headers': { 'Accept': 'application/vnd.api+json' }
        }
      ],
      {
        auth: {
          username: process.env.userDrupal,
          password: process.env.passDrupal
        }
      })
    // console.log(jsonapiParse.parse(JSON.parse(res['node#uri{0}'].body)))
    // console.log('res', res)
    // console.log('episodes', jsonapiParse.parse(res.episodes.body).data)
    // console.log('onair', jsonapiParse.parse(res.onair.body).data)
  }
}
</script>
