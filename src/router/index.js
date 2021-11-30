import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home";
import Login from "../views/Login";
import Register from "../views/Register";
import Search from "../views/Search";
Vue.use(VueRouter);

const routes = [
  {
    path: "/home",
    name: "home",
    component: Home,
    meta: { isShowTypeNav: true },
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      isHiddenFooter: true,
    }, // 元数据，可以写一些差异化配置
  },
  {
    path: "/register",
    name: "register",
    component: Register,
    meta: {
      isHiddenFooter: true,
    },
  },
  {
    path: "/search",
    name: "search",
    component: Search,
  },
  {
    path: "/",
    redirect: "/home",
  },
];

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
});

export default router;

/**
 * 1. 控制底部显示与否
 *      哪几个页面是没有底部footer login和register
 * */
