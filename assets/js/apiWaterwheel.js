const Waterwheel = require('waterwheel');
const waterwheel = new Waterwheel({
  base: process.env.baseUrl,
  timeout: 3000,
  accessCheck: false
});
import jsonapiParse from "jsonapi-parse"

export async function getUserById (id) {
  const query = {
    include: 'user_picture'
  }
  const res = await waterwheel.jsonapi.get('user', query, id)
  return jsonapiParse.parse(res).data
}

export async function findOneSerieByTitle(title) {
  const query = {
    filter: {
      title: {
        value: title
      }
    },
    include: 'field_poster, field_other_img'
  }
  const res = await waterwheel.jsonapi.get('series', query)
  return jsonapiParse.parse(res).data
}

export async function getSeriesCard (limit = 5) {
  const query = {
    page: {
      limit
    },
    include: 'field_poster',
    sort: '-nid'
  }
  const res = await waterwheel.jsonapi.get('series', query)
  return jsonapiParse.parse(res).data
}