import * as ajax from '../ajaxAction'
import * as types from '../mutation-types'

const state = {
}

// getters
const getters = {
}

// actions
const actions = {
  addProject ({ commit, state }, params) {
    let callback = params.callback;
  	delete params.callback;
    ajax.get("/home/project/add", params, (data) => {
      callback && callback(data);
    });
  },
  editProject ({ commit, state }, params) {
    let callback = params.callback;
  	delete params.callback;
    ajax.get("/home/project/edit", params, (data) => {
      callback && callback(data);
    });
  },
  deleteProject ({ commit, state }, params) {
    let callback = params.callback;
  	delete params.callback;
    ajax.get("/home/project/delete", params, (data) => {
      callback && callback(data);
    });
  }
}

// mutations
const mutations = {
}

export default {
  state,
  getters,
  actions,
  mutations
}
