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
        title: res.data.data[i].attributes.title,
        poster: await this.getPoster(res.data.data[i].attributes.uuid)
      })
    }
    return series
  }
}

export default api
