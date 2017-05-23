import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import mock from './modules/mock'
import users from './modules/users'
import project from './modules/project'
import interfaces from './modules/interface'
import createLogger from '../../plugins/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    mock,
    users,
    project,
    interfaces
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
});
