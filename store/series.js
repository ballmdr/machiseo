import { getSmallSerieByPath } from '~/assets/js/api'

export const state = () => ({
  serie: null,
  title: ''
})

export const mutations = {
  setSerie(state, payload) {
    state.serie = payload
  },
  setTitle(state, payload) {
    state.title = payload
  }
}

export const actions = {
  async setSerie({ commit }, path) {
    const serie = await getSmallSerieByPath(path)
    commit('setSerie', serie)
  }
}

export const getters = {
  nid(state) {
    return state.serie.nid
  }
}