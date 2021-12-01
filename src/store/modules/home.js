/**
 * 1. 这个home.js文件是专门用于处理home组件（主页面）
 * */
import { reqCategoryListData, reqBanner, reqFloors } from "@/api";
import { HOME } from "../mutation-types";
const state = {
  categoryList: [],
  bannerList: [],
  floorsList: [],
};

const mutations = {
  // 存取三级导航数据
  [HOME.SAVE_CATEGORY_LIST_DATA](state, data) {
    state.categoryList = data.slice(0, 15);
  },

  // 存取轮播图数据
  [HOME.SAVE_BANNER](state, data) {
    state.bannerList = data;
  },

  // 存取楼层数据
  [HOME.SAVE_FLOOR](state, data) {
    state.floorsList = data;
  },
};

const actions = {
  // 异步获取三级导航的数据
  async getCategoryListData({ commit }) {
    const result = await reqCategoryListData();
    if (result.code === 200) {
      commit(HOME.SAVE_CATEGORY_LIST_DATA, result.data);
    }
  },

  // 异步获取轮播图数据
  async getBanner({ commit }) {
    const result = await reqBanner();
    if (result.code === 200) {
      commit(HOME.SAVE_BANNER, result.data);
    }
  },

  // 异步获取楼层数据
  async getFloorsList({ commit }) {
    const result = await reqFloors();
    if (result.code === 200) {
      commit(HOME.SAVE_FLOOR, result.data);
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
