//这个文件是和用户相关的一些工具函数
//专门用来生成用户的临时标识的
//一般用户的临时标识都是唯一的，而且一旦生成不会轻易改变

import { v4 as uuidv4 } from "uuid";
export function getUserTempId() {
  // 1. 先从本地存储获取一下
  let userTempId = localStorage.getItem("userTempId");

  // 2. 如果没有的话，就要生成一份
  if (!userTempId) {
    localStorage.setItem("userTempId", uuidv4());
  }

  return userTempId;
}
