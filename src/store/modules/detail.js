import { reqDetailInfo } from "@/api";
import { DETAIL } from "../mutation-types";
const state = {
  detailInfo: "",
};

const mutations = {
  // 存取详情数据
  [DETAIL.SAVE_DETAIL_INFO](state, payload) {
    state.detailInfo = payload;
  },
};

const actions = {
  // 异步获取详情数据
  async getDetailInfo({ commit }, skuld) {
    const result = await reqDetailInfo(skuld);
    if (result.code === 200) {
      commit(DETAIL.SAVE_DETAIL_INFO, result.data);
    }
  },
};

const getters = {
  // 商品名称价格
  categoryView(state) {
    return state.detailInfo.categoryView || {};
  },
  // 商品属性
  skuInfo(state) {
    return state.detailInfo.skuInfo || {};
  },
  // 平台属性
  spuSaleAttrList(state) {
    return state.detailInfo.spuSaleAttrList;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
