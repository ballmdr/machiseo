import axios from 'axios'

export async function getRecentCommentFromSerie (uuid) {
  const { data } = await axios.get('http://93.190.138.237/rest/recent/comment/' + uuid + '?_format=json')
  return data
}