import { reqSearchInfo } from "@/api";
import { SEARCH } from "../mutation-types";
const state = {
  /**
   * searchInfo{
   *  goodsList： 商品
   *  attrsList,
   *  trademarkList：品牌
   * }
   */
  searchInfo: {},
};

const mutations = {
  [SEARCH.SAVE_SEARCH_INFO](state, data) {
    state.searchInfo = data;
  },
};

const actions = {
  async getSearchInfo({ commit }, searchParams) {
    const result = await reqSearchInfo(searchParams);
    if (result.code === 200) {
      commit(SEARCH.SAVE_SEARCH_INFO, result.data);
    }
  },
};

const getters = {
  goodsList(state) {
    return state.searchInfo.goodsList;
  },

  attrsList(state) {
    return state.searchInfo.attrsList;
  },

  trademarkList(state) {
    return state.searchInfo.trademarkList;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
