import * as ajax from '../ajaxAction'
import * as types from '../mutation-types'

const state = {
  data: {}
}

// getters
const getters = {
  data: state => state.data
}

// actions
const actions = {
  loadData ({ commit, state }, params) {
    ajax.get("/api/test/loadcity1", params, (data) => {
      commit(types.API_MOCK_DATA, { data })
    });
  }
}

// mutations
const mutations = {
  [types.API_MOCK_DATA] (state, { data }) {
    state.data = data.data.cityList;
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
