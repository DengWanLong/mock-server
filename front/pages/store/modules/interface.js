import * as ajax from '../ajaxAction'
import * as types from '../mutation-types'

const state = {
}

// getters
const getters = {
}

// actions
const actions = {
  addInterface ({ commit, state }, params) {
    let callback = params.callback;
  	delete params.callback;
    ajax.post("/home/interface/add", params, (data) => {
      callback && callback(data);
    });
  },
  editInterface ({ commit, state }, params) {
    let callback = params.callback;
  	delete params.callback;
    ajax.post("/home/interface/edit", params, (data) => {
      callback && callback(data);
    });
  },
  deleteInterface ({ commit, state }, params) {
    let callback = params.callback;
  	delete params.callback;
    ajax.get("/home/interface/delete", params, (data) => {
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
