import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import TypeNav from "./components/TypeNav";
import County from "./components/County";
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

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
