import Vue  from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: '',
    password: ''
  },
  mutations: {
    Set_UserInfo(state, userinfo) {
      state.username = userinfo.password;
      state.password = userinfo.password;
    }
  },
  actions: {
    setUserInfo({commit}, userinfo) {
      commit('Set_UserInfo', userinfo);
    }
  },
  getters: {
    getUsername: (state) => state.username
  }
})