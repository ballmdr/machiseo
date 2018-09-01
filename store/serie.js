import axios from 'axios'

export const state = () => {
  state: {
    series: []
  }
}

export const mutations = {
  setSerie (state, payload) {
    console.log(payload)
    state.series.push(payload)
  }
}

export const getters = {

}

export const actions = {
  async GET_SERIE ({ commit }, title) {
    const url = process.env.baseUrl + '/jsonapi/series?filter[title]=' + title + '&include=field_poster'
    const res = await axios.get(url)
    const serie = {
      uuid: res.data.data[0].attributes.uuid,
      title: res.data.data[0].attributes.title,
      poster: res.data.included[0].attributes.url
    }
    commit('setSerie', serie)
  }
}