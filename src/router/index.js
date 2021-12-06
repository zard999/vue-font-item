import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
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

export default router;

/**
 * 1. 控制底部显示与否
 *      哪几个页面是没有底部footer login和register
 * */
