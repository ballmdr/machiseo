import apiClient from '~/assets/js/apiClient'
import jsonapiParse from 'jsonapi-parse'
const prefix = '/jsonapi'

export async function getSerieByTitle (title) {
  const { data } = await apiClient.get(prefix + '/series?filter[title]=' + title + '&include=field_poster,field_celeb,field_celeb.field_celeb_profile,field_episode_series,field_episode_series.field_thumbnail,field_other_img')
  return jsonapiParse.parse(data).data
}
