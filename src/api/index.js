/**
 *  1. 这个文件是统一用来处理发送请求的 也就是说所有的请求都在这里进行处理
 *  2. 只需要暴露相应的接口即可
 *  3. 优点：将来更新或是维护的时候，在此处进行统一修改
 **/
// 1. 引入axios，也就是ajax这个文件，然后发送请求
import ajax from "./ajax";
import mockAjax from "./mockAjax";

// 2. 将发生请求的操作封装到函数当中，向外暴露
export const reqCategoryListData = () =>
  ajax.get("/product/getBaseCategoryList");

export const reqBanner = () => mockAjax.get("/banner");

export const reqFloors = () => mockAjax.get("/floors");

// 获取search的商品数据
export const reqSearchInfo = (searchParams) => ajax.post("/list", searchParams);