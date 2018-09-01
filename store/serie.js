import axios from 'axios'

export const state = () => {
  series: []
}

export const mutations = {
  setSerie (state, serie) {
    //state.series.push(serie)
  }
}

export const getters = {

}

export const actions = {
  async GET_SERIE ({ commit }, title) {
    const url = process.env.baseUrl + '/jsonapi/series?filter[title]=' + title + '&include=field_poster'
    const { data } = await axios.get(url)
    console.log(data)
    const serie = {
     // title: data.data[0].attributes.title,
     // poster: data.included[0].url
    }
    commit('setSerie', serie)
  }
}