import * as ajax from '../ajaxAction'
import * as types from '../mutation-types'

const state = {
  projectList: []
}

// getters
const getters = {
  projectList: state => state.projectList
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
  },
  queryallProject({ commit, state }, params) {
    let callback = params.callback;
    delete params.callback;
    ajax.get("/home/project/queryall", params, (data) => {
      commit(types.SET_PROJECT_LIST, { data })
      callback && callback(data);
    });
  }
}

// mutations
const mutations = {
  [types.SET_PROJECT_LIST] (state, { data }) {
    state.projectList = data.data;
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}
