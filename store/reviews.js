
export const state = () => ({
    review: null
})

export const getters = {
    getReview(state){
        return state.review
    }
}

export const mutations = {
    setReview(state, payload){
        state.review = payload
    }
}

export const actions = {
    setReview({ commit }, review){
        commit('setReview', review)
    }
}