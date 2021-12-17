import { reqTradeInfo } from "@/api";
import { TRADE } from "../mutation-types";

const state = {
  tradeInfo: {},
};

const mutations = {
  // 存储交易信息
  [TRADE.SAVE_TRADE_INFO](state, tradeInfo) {
    state.tradeInfo = tradeInfo;
  },
};

const actions = {
  // 获取交易信息
  async getTradeInfo({ commit }) {
    const result = await reqTradeInfo();
    if (result.code === 200) {
      commit(TRADE.SAVE_TRADE_INFO, result.data);
    }
  },
};

const getters = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
