import { getSeriesCard } from '~/assets/js/apiWaterwheel'

export const state = () => {
  series: []
  page: 0
  currentSerie: null
}

export const mutations = {
  setSeries (state, payload) {
    state.series = payload
    state.page = 1
  },
  setCurrentSerie (state, payload) {
    state.currentSerie = payload
  }
}

export const getters = {
  getPage (state) {
    return state.page
  },
  getSerie: (state) => (title) => {
    return state.series.find(serie => serie.title === title)
  }
}

export const actions = {
  async GET_SERIES_LIST ({ commit }) {
    const series = await getSeriesCard(5)
    commit('setSeries', series)
  },
  loadCurrentSerie ({ commit }, title) {
    const serie = state.series.find(serie => serie.title === title)
    localhost.log(serie)
    commit('setCurrentSerie', serie)
  }
}