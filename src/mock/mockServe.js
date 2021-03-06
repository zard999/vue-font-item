/**
 * 1. 引入插件引入数据文件
 * 2. 配置服务器
 * 3. 测试
 */
import banner from "./banner.json";
import floors from "./floors.json";
import Mock from "mockjs";

// Mock.mock(url, method,data)
Mock.mock("/mock/banner", "get", { code: 200, data: banner });
Mock.mock("/mock/floors", "get", { code: 200, data: floors });
