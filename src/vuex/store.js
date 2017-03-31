import Vue  from 'vue';
import Vuex from 'vuex';
import axios from 'axios'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: '',
    password: '',
    user_id:0,
    userUsage: [{type:"Hosts",used:0,total:5},
                {type:"CPU",used:0,total:6},
                {type:"Memory",used:0,total:8192}],
    vmItems:[]
  },
  mutations: {
    Set_UserInfo(state, userinfo) {
      state.username = userinfo.username;
      state.password = userinfo.password;
    },
    Set_UserID(state, user) {
      state.user_id = user.user_id;
    },
    Set_UserUsage(state, usage) {
      state.userUsage[0].used = 5 - usage.instance_left;
      state.userUsage[1].used = 6 - usage.cpu_left;
      state.userUsage[2].used = 8192 - usage.memory_left;
    },
    Set_UserVM(state, vms) {
      state.vmItems = vms
    }
  },
  actions: {
    SET_USER_INFO({commit}, userinfo) {
      commit('Set_UserInfo', userinfo);
    },
    SET_USER_ID({commit}, user) {
      commit('Set_UserID', user);
    },
    SET_USER_USAGE({commit}, usage) {
      commit('Set_UserUsage', usage);
    },
    FETCH_USER_VM(context){
      axios({
        method: 'patch',
        url: '/api/v1/environment/action',
        data: {user_id:context.state.user_id}
      }).then((response) => {
        let resp = JSON.parse(response.data.replace(/'([^']*)'/g,'"$1"'));
        console.log(resp);
        context.commit('Set_UserVM', resp.info);
      })
    },
    FETCH_USER_USAGE(context){
      console.log(context.state.username);
      console.log(context.state.password);
      axios({
        method: 'put',
        url: '/api/v1/account/user',
        data: {username:context.state.username,
              password:context.state.password}
      }).then((response) => {
        let resp = JSON.parse(response.data.replace(/'([^']*)'/g,'"$1"'));
        console.log(resp);
        context.commit('Set_UserUsage', resp.info);
      })
    }
  },
  getters: {
    getUsername: (state) => state.username,
    getUserID: (state) => state.user_id,
    getUserUsage: (state) => state.userUsage,
    getUserVM: (state) => state.vmItems,
  }
})