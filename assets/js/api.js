import apiClient from '~/assets/js/apiClient'
import jsonapiParse from 'jsonapi-parse'
const prefix = '/jsonapi'

export async function getSerieById (id) {
  const { data } = await apiClient.get(prefix + '/series?filter[nid]=' + id + '&include=field_poster,field_celeb,field_celeb.field_celeb_profile,field_episode_series,field_episode_series.field_thumbnail,field_serie_year,field_series_type')
  return jsonapiParse.parse(data).data
}
