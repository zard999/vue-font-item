/**
 * 1. 这个home.js文件是专门用于处理home组件（主页面）
 * */
import { reqCategoryListData } from "@/api";
import { HOME } from "../mutation-types";
const state = {
  categoryList: [],
};

const mutations = {
  // 存取三级导航数据
  [HOME.SAVE_CATEGORY_LIST_DATA](state, data) {
    state.categoryList = data.slice(0, 15);
  },
};

const actions = {
  // 异步获取三级导航的数据
  async getCategoryListData({ commit }) {
    const result = await reqCategoryListData();
    console.log(result);
    if (result.code === 200) {
      commit(HOME.SAVE_CATEGORY_LIST_DATA, result.data);
    }
  },
};

const getters = {
  categoryList() {
    return state.categoryList;
  },
};

export default {
  namespaced: true, // 开启命名空间
  state,
  actions,
  mutations,
  getters,
};
