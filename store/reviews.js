
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
    for (let i=0;i<payload.length;i++) {
      state.likeReview.push(payload[i].review_like)
    }
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
