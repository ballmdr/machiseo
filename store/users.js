export const state = () => {
  user: null
}

export const getters = {
  getUser(state){
    return state.user
  },
  subId(state){
    return state.user.sub_id
  }
}

export const mutations = {
  setUser(state, payload){
    state.user = payload
  }
}

export const actions = {
  setUser({ commit }, userObj) {
    commit('setUser', userObj)
  }
}