
export const state = () => ({
  serie: null,
  title: ''
})

export const mutations = {
  setSerie (state, payload) {
    state.serie = payload
  },
  setTitle (state, payload) {
    state.title = payload
  }
}

export const actions = {
  async setSerie ({ commit }, serie) {
    // const serie = await getSerieByPath(path)
    commit('setSerie', serie)
  }
}

export const getters = {
  getSerie (state) {
    return state.serie
  },
  nid (state) {
    return state.serie.nid
  }
}
