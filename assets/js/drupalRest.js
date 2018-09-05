import axios from 'axios'
import jsonapiParse from 'jsonapi-parse'

export async function getRecentCommentFromSerie (uuid) {
  const { data } = await axios.get(process.env.baseUrl + '/rest/recent_comment/' + uuid)
  return jsonapiParse.parse(data)
}

export async function getRecentReply (cid) {
  const { data } = await axios.get(process.env.baseUrl + '/rest/recent_reply/' + cid)
  return jsonapiParse.parse(data)
}