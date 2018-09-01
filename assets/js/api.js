const api = {
  async getPoster (app, uuid) {
    const { data } = await app.$axios.$get('/jsonapi/series/' + uuid + '/field_poster')
    let tmpPoster
    if (typeof (data[0]) === 'undefined') {
      tmpPoster = ''
    } else {
      tmpPoster = process.env.baseUrl + data[0].attributes.url
    }
    return tmpPoster
  },
  async getSeriesCard (app, url) {
    const res = await app.$axios.$get(url)
    let series = []
    const len = res.data.length
    for (let i = 0; i < len; i++) {
      series.push({
        title: res.data[i].attributes.title,
        poster: await this.getPoster(app, res.data[i].attributes.uuid)
      })
    }
    return series
  }
}

export default api
