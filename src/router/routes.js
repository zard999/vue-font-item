import Home from "@/views/Home";
import Login from "@/views/Login";
import Register from "@/views/Register";
import Search from "@/views/Search";
import Detail from "@/views/Detail";
import AddCartSuccess from "@/views/AddCartSuccess";
import ShopCart from "@/views/ShopCart";
export default [
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
    path: "/detail/:id",
    name: "detail",
    component: Detail,
    props: true,
  },
  // 添加到购物车
  {
    path: "/addcartsuccess",
    name: "addcartsuccess",
    component: AddCartSuccess,
  },
  // 购物车
  {
    path: "/shopcart",
    name: "shopcart",
    component: ShopCart,
  },
  {
    path: "/",
    redirect: "/home",
  },
];
