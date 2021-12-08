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
export const reqShopCart = () => ajax.get("/cart/cartList");

// 切换商品选中状态
export const reqCheckCart = (skuID, isChecked) =>
  ajax.get(`/cart/checkCart/${skuID}/${isChecked}`);

// 删除选中商品
export const reqDelOnShopCartInfo = (skuId) =>
  ajax.delete(`/cart/deleteCart/${skuId}`);

// 获取验证码
export const reqCode = (phone) => ajax.get(`/user/passport/sendCode/${phone}`);

// 注册账号
export const reqRegister = (user) => ajax.post("/user/passport/register", user);

export const reqDelSelectedCartInfo = (cartInfo) =>
  ajax.delete("/cart/batchDeleteCart", cartInfo);

// 登录账户
export const reqUserLogin = (user) => ajax.post("/user/passport/login", user);

// 登出账户
export const reqLogout = () => ajax.get("/user/passport/logout");

// 结算
export const reqTrade = () => ajax.get("/order/auth/trade");
