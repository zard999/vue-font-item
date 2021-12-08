import { reqUserLogin, reqLogout } from "@/api";
import { USER } from "../mutation-types";
const state = {
  userInfo: {
    name: localStorage.getItem("userName"),
    token: localStorage.getItem("token"),
  },
};

const mutations = {
  [USER.SAVE_USER_INFO](state, payload) {
    state.userInfo.name = payload.name;
    state.userInfo.token = payload.token;
  },

  [USER.REMOVE_USER_INFO](state) {
    state.userInfo.name = "";
    state.userInfo.token = "";
  },
};

const actions = {
  async getUserInfo({ commit }, user) {
    const result = await reqUserLogin(user);
    if (result.code === 200) {
      commit(USER.SAVE_USER_INFO, result.data);
      localStorage.setItem("userName", result.data.name);
      localStorage.setItem("token", result.data.token);
    }
  },

  async userLogout({ commit }) {
    const result = await reqLogout();
    if (result.code === 200) {
      // 清除本地存储token和vuex中的token
      localStorage.removeItem("userName");
      localStorage.removeItem("token");
      commit(USER.REMOVE_USER_INFO);
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
