import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
import store from "@/store";
Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function (location, onResolve, onReject) {
  if (onResolve || onReject) {
    return originalPush.call(this, location, onResolve, onReject);
  }
  return originalPush.call(this, location).catch((err) => err);
};

const router = new VueRouter({
  mode: "history",
  routes,
  // 对于所有路由导航，简单地让页面滚动到顶部。to代表要去的路由信息，from代表当前路由信息
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
});

router.beforeEach(async (to, from, next) => {
  let { token, userInfo } = store.state.user;
  // 如果token存在
  if (token) {
    // 如果要去的路径为login，则跳转到首页
    if (to.path === "/login") {
      next("/");
    } else {
      // 如果userInfo存在，则任意页面都可以跳转
      if (userInfo.name) {
        next();
      } else {
        try {
          await store.dispatch("user/getUserInfo");
          next();
        } catch (e) {
          // 清除token并跳转到login页面
          store.dispatch("user/clearToken");
          alert("token已失效，即将跳转登录页面");
          next("/login");
        }
      }
    }
  } else {
    next();
  }
});

export default router;

/**
 * 1. 控制底部显示与否
 *      哪几个页面是没有底部footer login和register
 * */
