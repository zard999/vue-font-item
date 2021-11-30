/**
 * 专门请求mock的文件
 */

import axios from "axios";

const mockAjax = axios.create({
  baseURL: "/mock",
  timeout: 150000,
});

mockAjax.interceptors.request.use((config) => {
  // Do something before request is sent
  return config;
});

mockAjax.interceptors.response.use(
  (response) => {
    // Do something before response is sent
    return response.data;
  },
  (error) => {
    // Do something with response error
    return Promise.reject(error);
  }
);

export default mockAjax;
