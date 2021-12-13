import {
  reqAddOrUpdateShopCart,
  reqDeleteIsCheckCartList,
  reqDeleteOneCartList,
  reqShopCartList,
  reqUpdateCartListCheckAll,
  reqUpdateIsChecked,
} from "@/api";
import { SHOPCART } from "../mutation-types";
const state = {
  shopCartList: [],
};

const mutations = {
  [SHOPCART.SAVE_SHOP_CART_LIST](state, data) {
    state.shopCartList = data;
  },
};

const actions = {
  // 添加购物车或者更改数量
  async addOrUpdateShopCart(_, { skuId, skuNum }) {
    const result = await reqAddOrUpdateShopCart(skuId, skuNum);
    if (result.code === 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("failed"));
    }
  },

  // 异步获取购物车数据
  async getShopCartList({ commit }) {
    const result = await reqShopCartList();
    if (result.code === 200) {
      commit(SHOPCART.SAVE_SHOP_CART_LIST, result.data);
    }
  },

  //   切换单个选中状态
  async updateIsChecked(_, { skuId, isChecked }) {
    const result = await reqUpdateIsChecked(skuId, isChecked);
    if (result.code === 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("failed"));
    }
  },

  //   更新所有的选中状态
  async updateCartListCheckAll(_, { isChecked, skuIdList }) {
    const result = await reqUpdateCartListCheckAll(isChecked, skuIdList);
    console.log(result);
    if (result.code === 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("failed"));
    }
  },

  // 删除单个购物车商品
  async deleteOneCartList(_, skuId) {
    const result = await reqDeleteOneCartList(skuId);
    if (result.code === 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("failed"));
    }
  },

  //   批量删除多个购物车商品
  async deleteIsCheckCartList(_, obj) {
    const result = await reqDeleteIsCheckCartList(obj);
    console.log(result);
    if (result.code === 200) {
      return "ok";
    } else {
      return Promise.reject("failed");
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
