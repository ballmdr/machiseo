import axios from 'axios'


const api = {

  async getPoster (uuid) {
    const { data } = await axios.get(process.env.baseUrl + '/jsonapi/series/' + uuid + '/field_poster')
    let tmpPoster
    if (typeof (data.data[0]) === 'undefined') {
      tmpPoster = ''
    } else {
      tmpPoster = process.env.baseUrl + data.data[0].attributes.url
    }
    return tmpPoster
  },
  async getSeriesCard (url) {
    const res = await axios.get(process.env.baseUrl + url)
    let series = []
    const len = res.data.data.length
    for (let i = 0; i < len; i++) {
      series.push({
        uuid: res.data.data[i].attributes.uuid,
        title: res.data.data[i].attributes.title,
        poster: await this.getPoster(res.data.data[i].attributes.uuid),
        body: res.data.data[i].attributes.body.processed,
        synopsis: res.data.data[i].attributes.field_synopsis,
        trailors: res.data.data[i].attributes.field_trailor,
        reviews_count: res.data.data[i].attributes.field_reviews.comment_count
      })
    }
    return series
  },
  async getSerieInfo (title) {
    const { data } = await axios.get(process.env.baseUrl + '/jsonapi/series?filter[title]=' + title + '&include=field_poster')
    let serie = []
    serie.title = data.data[0].attributes.titles
    serie.poster = process.env.baseUrl + data.included[0].attributes.url
    serie.body = data.data[0].attributes.body.processed
    serie.synopsis = data.data[0].attributes.field_synopsis
    return { serie }
  }
}

export default api
