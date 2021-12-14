import Home from "@/views/Home";
import Login from "@/views/Login";

export default [
  {
    // 个人中心
    path: "/center",
    component: () => import("@/views/Center"),
    children: [
      {
        path: "",
        redirect: "myorder",
      },
      {
        path: "myorder",
        component: () => import("@/views/Center/MyOrder"),
      },
      {
        path: "grouporder",
        component: () => import("@/views/Center/GroupOrder"),
      },
    ],
  },
  {
    // 交易页面
    path: "/paysuccess",
    component: () => import("@/views/PaySuccess"),
    beforeEnter: (to, from, next) => {
      if (from.path === "/pay") {
        next();
      } else {
        next("/");
      }
    },
  },
  {
    // 交易页面
    path: "/pay",
    component: () => import("@/views/Pay"),
    beforeEnter: (to, from, next) => {
      if (from.path === "/trade") {
        next();
      } else {
        next("/");
      }
    },
  },
  {
    // 交易页面
    path: "/trade",
    component: () => import("@/views/Trade"),
    beforeEnter: (to, from, next) => {
      if (from.path === "/shopcart") {
        next();
      } else {
        next("/");
      }
    },
  },
  {
    // 主页
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
    component: () => import("@/views/Register"),
    meta: {
      isHiddenFooter: true,
    },
  },
  {
    path: "/search",
    name: "search",
    component: () => import("@/views/Search"),
  },
  // 详情
  {
    path: "/detail/:id",
    name: "detail",
    component: () => import("@/views/Detail"),
    props: true,
  },
  // 添加到购物车
  {
    path: "/addcartsuccess",
    name: "addcartsuccess",
    component: () => import("@/views/AddCartSuccess"),
    beforeEnter: (to, from, next) => {
      let skuNum = to.query.skuNum;
      let skuInfo = sessionStorage.getItem("skuInfo_key");
      if (skuNum && skuInfo) {
        next();
      } else {
        next("/");
      }
    },
  },
  // 购物车
  {
    path: "/shopcart",
    name: "shopcart",
    component: () => import("@/views/ShopCart"),
  },
  {
    path: "/",
    redirect: "/home",
  },
];
