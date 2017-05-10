import * as ajax from '../ajaxAction'
import * as types from '../mutation-types'

const state = {
  userInfo: {}
}

// getters
const getters = {
  userInfo: state => state.userInfo
}

// actions
const actions = {
  login ({ commit, state }, params) {
    ajax.get("/login/index/login", params, (data) => {
      commit(types.SET_USER_INFO, { data })
      window.location = "/";
    });
  },
  logout({commit, state}) {
    ajax.get("/login/index/logout", {}, (data) => {
      commit(types.CLEAR_USER_INFO)
      window.location = "/login/login/login.html";
    });
  },
  getUserInfo({commit, state}) {
    ajax.get("/login/index/getuserinfo", {}, (data) => {
      commit(types.SET_USER_INFO, { data })
    });
  }
}

// mutations
const mutations = {
  [types.SET_USER_INFO] (state, { data }) {
    state.userInfo = data.data;
  },
  [types.CLEAR_USER_INFO] (state) {
    state.userInfo = null;
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
