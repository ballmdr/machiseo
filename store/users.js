export const state = () => ({
  user: {
    nid: '',
    subId: '',
    picture: '',
    name: ''
  }
})

export const getters = {
  getUser (state) {
    return state.user
  },
  subId (state) {
    return state.user.sub_id
  },
  picture (state) {
    return state.user.picture
  },
  name (state) {
    return state.user.name
  }
}

export const mutations = {
  setUser (state, payload) {
    state.user = payload
  }
}

export const actions = {
  setUser ({ commit }, userObj) {
    commit('setUser', userObj)
  }
}
