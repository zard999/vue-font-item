import axios from "axios";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
// 未登陆前设置一个用户Id
import { getUserTempId } from "@/utils/userabout";
// 引入store
import store from "@/store";

const ajax = axios.create({
  baseURL: "/api",
  timeout: 10000,
});

ajax.interceptors.request.use((config) => {
  // Do something before request is sent
  NProgress.start();
  // 添加token
  let token = store.state.user.userInfo.token;
  if (token) {
    config.headers.token = token;
  }

  config.headers.userTempId = getUserTempId();
  return config;
});

ajax.interceptors.response.use(
  (response) => {
    NProgress.done();
    // Do something before response is sent
    return response.data;
  },
  (error) => {
    // Do something with response error
    return Promise.reject(error);
  }
);

export default ajax;

/**
 * 1. 引入模块
 * 2. 创建实例对象，然后统一配置之后再去发送请求，只有ajax这个实例对象发送请求，会先走这里面的配置项
 * 3. 设置请求拦截器，在请求发送之前执行里面的逻辑
 * 4. 设置响应烂机器，在响应之前执行里面的逻辑
 */
