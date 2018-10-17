<template>
  <div></div>
</template>

<script>
import jsonapiParse from 'jsonapi-parse'
export default {
  async mounted() {
    const res = await this.$axios.$post('/subrequests?_format=json', 
    [
      {
        "requestId": "router",
        "action": "view",
        "uri": "/router/translate-path?path=/series/moon-lovers",
        "headers": {"Accept": "application/vnd.application+json"}
      },
      {
        "requestId": "node",
        "action": "view",
        "uri": "/jsonapi/series/{{router.body@$.entity.uuid}}?include=field_poster,field_celeb,field_celeb.field_celeb_profile,field_series_type,field_serie_year",
        "Accept": "application/json",
        "waitFor": ["router"]
      }
    ], { auth: { username: process.env.userDrupal, password: process.env.passDrupal }})
    //console.log(jsonapiParse.parse(JSON.parse(res['node#uri{0}'].body)))
    console.log(jsonapiParse.parse(res['node#uri{0}'].body))
  }
}
</script>
