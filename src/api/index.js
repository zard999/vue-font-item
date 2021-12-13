/**
 *  1. 这个文件是统一用来处理发送请求的 也就是说所有的请求都在这里进行处理
 *  2. 只需要暴露相应的接口即可
 *  3. 优点：将来更新或是维护的时候，在此处进行统一修改
 **/
// 1. 引入axios，也就是ajax这个文件，然后发送请求
import ajax from "./ajax";
import mockAjax from "./mockAjax";

// 2. 将发生请求的操作封装到函数当中，向外暴露
export const reqCategoryListData = () =>
  ajax.get("/product/getBaseCategoryList");

export const reqBanner = () => mockAjax.get("/banner");

export const reqFloors = () => mockAjax.get("/floors");

// 获取search的商品数据
export const reqSearchInfo = (searchParams) => ajax.post("/list", searchParams);

// 获取商品详情
export const reqDetailInfo = (skuld) => ajax.get(`/item/${skuld}`);

// 添加选中的商品到购物车
export const reqAddOrUpdateShopCart = (skuId, skuNum) =>
  ajax.post(`/cart/addToCart/${skuId}/${skuNum}`);

// 获取购物车数据
export const reqShopCartList = () => ajax.get("/cart/cartList");

// 切换商品选中状态
export const reqUpdateIsChecked = (skuId, isChecked) =>
  ajax.get(`/cart/checkCart/${skuId}/${isChecked}`);

// 请求修改购物车所有的选中状态
export const reqUpdateCartListCheckAll = (isChecked, skuIdList) =>
  ajax.post(`/cart/batchCheckCart/${isChecked}`, skuIdList);

// 删除单个购物车商品
export const reqDeleteOneCartList = (skuId) =>
  ajax.delete(`/cart/deleteCart/${skuId}`);

// 批量删除多个购物车商品
export const reqDeleteIsCheckCartList = (obj) =>
  ajax.delete("/cart/batchDeleteCart", obj);

// 获取验证码
export const reqGetCode = (phone) =>
  ajax.get(`/user/passport/sendCode/${phone}`);

// 注册
export const reqUserRegister = (userInfo) =>
  ajax.post("/user/passport/register", userInfo);

// 登录
export const reqUserLogin = (userInfo) =>
  ajax.post("/user/passport/login", userInfo);

// 获取用户信息
export const reqGetUserInfo = () => ajax.get("/user/passport/auth/getUserInfo");

// 退出登录
export const reqUserLogout = () => ajax.get("/user/passport/logout");

// 获取用户地址信息
export const reqUserAddressList = () => {
  return ajax({
    url: "/user/userAddress/auth/findUserAddressList",
    method: "get",
  });
};

// 获取交易商品信息
export const reqTradeInfo = () => {
  return ajax({
    url: "/order/auth/trade",
    method: "get",
  });
};
