export const state = () => {
  userDone: false
}

export const getters = {
  getUserDone(state) {
    return state.userDone
  }
}

export const mutations = {
  setUserDone(state) {
    state.userDone = true
  },
  clearUserDone(state) {
    state.userDone = false
  }
}

export const actions = {
  setUserDone({ commit }) {
    commit('setUserDone')
  },
  clearUserDone({ commit }) {
    commit('clearUserDone')
  }
}