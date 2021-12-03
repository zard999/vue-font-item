import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import TypeNav from "./components/TypeNav";
import Pagination from "./components/Pagination";
import County from "./components/Carousel";
// 引入swiper样式文件
import "swiper/css/swiper.min.css";
// 开启mock服务器
import "./mock/mockServe";

Vue.config.productionTip = false;
/**
 * 因为TypeNav不止home页面用，search页面也用，所以注册成全局组件
 */
Vue.component(TypeNav.name, TypeNav);
Vue.component(County.name, County);
Vue.component(Pagination.name, Pagination);

new Vue({
  router,
  store,
  beforeCreate() {
    Vue.prototype.$bus = this;
  },
  render: (h) => h(App),
}).$mount("#app");
