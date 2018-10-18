import apiClient from '~/assets/js/apiClient'
import jsonapiParse from 'jsonapi-parse'
const prefix = '/jsonapi'
const findRouterPath = "/router/translate-path?path="

export async function getSerieById (id) {
  const { data } = await apiClient.get(prefix + '/series?filter[nid]=' + id + '&include=field_poster,field_celeb,field_celeb.field_celeb_profile,field_episode_series,field_episode_series.field_thumbnail,field_serie_year,field_series_type')
  return jsonapiParse.parse(data).data
}

export async function getCelebById (id) {
  const { data } = await apiClient.get(prefix + '/celebs?filter[nid]=' + id + '&include=field_celeb_profile,field_series_actors,field_series_actors.field_poster')
  return jsonapiParse.parse(data).data
}

export async function getSerieByPath (path, env) {
  const uri = findRouterPath + "/series/" + path
  const { data } = await apiClient.post('/subrequests?_format=json', 
  [
    {
      "requestId": "router",
      "action": "view",
      "uri": uri,
      "headers": {"Accept": "application/vnd.application+json"}
    },
    {
      "requestId": "node",
      "action": "view",
      "uri": "/jsonapi/series/{{router.body@$.entity.uuid}}?include=field_poster,field_celeb,field_celeb.field_celeb_profile,field_series_type,field_serie_year",
      "Accept": "application/json",
      "waitFor": ["router"]
    }
  ], { auth: { username: env.userDrupal, password: env.passDrupal }})
  return jsonapiParse.parse(JSON.parse(data['node#uri{0}'].body)).data
}

export async function getCelebByPath (path, env) {
  const uri = findRouterPath + "/celebs/" + path
  const { data } = await apiClient.post('/subrequests?_format=json', 
  [
    {
      "requestId": "router",
      "action": "view",
      "uri": uri,
      "headers": {"Accept": "application/vnd.application+json"}
    },
    {
      "requestId": "node",
      "action": "view",
      "uri": "/jsonapi/celebs/{{router.body@$.entity.uuid}}?include=field_celeb_profile,field_other_img,field_series_actors,field_series_actors.field_poster",
      "Accept": "application/json",
      "waitFor": ["router"]
    }
  ], { auth: { username: env.userDrupal, password: env.passDrupal }})
  return jsonapiParse.parse(JSON.parse(data['node#uri{0}'].body)).data
}

export async function getSeriesList (offset = 0, limit = 10) {
  const { data } = await apiClient.get(prefix + '/series?page[offset]=' + offset + '&page[limit]=' + limit + '&include=field_poster,field_series_type,field_serie_year')
  return jsonapiParse.parse(data).data
}