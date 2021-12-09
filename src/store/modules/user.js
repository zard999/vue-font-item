import {
  reqGetCode,
  reqUserRegister,
  reqUserLogin,
  reqGetUserInfo,
  reqUserLogout,
} from "@/api";
import { getUserTempId } from "@/utils/userabout";
import { USER } from "../mutation-types";
const state = {
  userTempId: getUserTempId(),
  code: "",
  userInfo: "",
  token: localStorage.getItem("token_key"),
};

const mutations = {
  // 存储验证码
  [USER.SAVE_CODE](state, code) {
    state.code = code;
  },
  // 存储token
  [USER.SAVE_TOKEN](state, token) {
    state.token = token;
  },

  // 存储用户信息
  [USER.SAVE_USER_INFO](state, userInfo) {
    state.userInfo = userInfo;
  },

  // 清除token
  [USER.REMOVE_TOKEN](state) {
    state.token = "";
  },

  // 清除userInfo
  [USER.REMOVE_USER_INFO](state) {
    state.userInfo = "";
  },
};

const actions = {
  // 获取验证码
  async getCode({ commit }, phone) {
    const result = await reqGetCode(phone);
    if (result.code === 200) {
      commit(USER.SAVE_CODE, result.data);
      return result.data;
    } else {
      return Promise.reject(new Error("failed"));
    }
  },

  // 注册
  async userRegister(_, userInfo) {
    const result = await reqUserRegister(userInfo);
    if (result.code === 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("failed"));
    }
  },

  // 登录
  async userLogin({ commit }, userInfo) {
    const result = await reqUserLogin(userInfo);
    console.log(result);
    if (result.code === 200) {
      commit(USER.SAVE_TOKEN, result.data.token);
      // 自动登录
      localStorage.setItem("token_key", result.data.token);
      return "ok";
    } else {
      return Promise.reject(new Error("failed"));
    }
  },

  // 获取用户信息
  async getUserInfo({ commit }) {
    const result = await reqGetUserInfo();
    if (result.code === 200) {
      commit(USER.SAVE_USER_INFO, result.data);
      return "ok";
    } else {
      return Promise.reject(new Error("failed"));
    }
  },

  // 清除token
  async clearToken({ commit }) {
    localStorage.removeItem("token_key");
    commit(USER.REMOVE_TOKEN);
  },

  // 退出登录
  async userLogout({ commit, dispatch }) {
    const result = await reqUserLogout();
    if (result.code === 200) {
      // 清除用户信息
      commit(USER.REMOVE_USER_INFO);
      // 清除用户token
      dispatch("clearToken");
      return "ok";
    } else {
      return Promise.reject(new Error("failed"));
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
