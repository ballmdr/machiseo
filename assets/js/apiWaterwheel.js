const Waterwheel = require('waterwheel');
const waterwheel = new Waterwheel({
  base: process.env.baseUrl,
  timeout: 3000,
  accessCheck: false
});
import jsonapiParse from "jsonapi-parse"


export async function getAllReviewBySerie(id) {
  const query = {
    filter: {
      comment_type: {
        value: 'comment'
      }
    }
  }
  const res = await waterwheel.jsonapi.get('comment', query)
  console.log(res)
  // console.log(jsonapiParse.parse(res).data)
  // return await jsonApi.get('comment', query)
}

export async function findOneSerieByTitle(title) {
  const query = {
    filter: {
      title: {
        value: title
      }
    },
    include: 'field_poster'
  }
  const res = await waterwheel.jsonapi.get('series', query)
  return jsonapiParse.parse(res).data
}