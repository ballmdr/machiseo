import { getAllEpisodesBySeriesPath } from '~/assets/js/api'

export const state = () => ({
  ep: []
})

export const mutations = {
  setEp (state, payload) {
    state.ep = payload
  },
  setDialog (state, payload) {
    state.showDialog = payload
  }
}

export const actions = {
  async setEp ({ commit }, path) {
    const episodes = await getAllEpisodesBySeriesPath(path)
    commit('setEp', episodes)
  }
}
