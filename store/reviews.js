
export const state = () => ({
  review: null,
  likeReview: []
})

export const getters = {
  getReview (state) {
    return state.review
  },
  likeReview (state) {
    return state.likeReview
  }
}

export const mutations = {
  setReview (state, payload) {
    state.review = payload
  },
  setLikeReview (state, payload) {
    state.likeReview = payload
  }
}

export const actions = {
  setReview ({ commit }, review) {
    commit('setReview', review)
  },
  setIpLike ({ commit }, likeReview) {
    commit('setLikeReview', likeReview)
  }
}
