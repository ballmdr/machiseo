import jsonApiClient from './jsonApiClient'
const jsonApi = jsonApiClient()

export async function findOneSerieByTitle (title) {
  const query = {
    include: 'field_poster',
    filter: {
      page: {
        title: title
      }
    }
  }
  return await jsonApi.get('series', query, title)
}