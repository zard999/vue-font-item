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
// API请求
import * as API from "@/api";
// 图片懒加载
import "@/plugins/lazyload";
import { Button, Message, MessageBox } from "element-ui";
Vue.use(Button);
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$message = Message;

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
    Vue.prototype.$API = API;
  },
  render: (h) => h(App),
}).$mount("#app");
