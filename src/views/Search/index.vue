<template>
  <div class="outer">
    <!-- 三级分类导航 -->
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--面包屑导航-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <span href="#">全部结果</span>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <li class="with-x" v-if="searchParams.categoryName">
              {{ searchParams.categoryName }}
              <i @click="removeCategoryName">×</i>
            </li>
            <li class="with-x" v-if="searchParams.keyword">
              {{ searchParams.keyword }}
              <i @click="removeKeyword">×</i>
            </li>
            <li class="with-x" v-if="searchParams.trademark">
              {{ searchParams.trademark.split(":")[1] }}
              <i @click="removeTrademark">×</i>
            </li>
            <li
              class="with-x"
              v-for="(prop, index) in searchParams.props"
              :key="prop"
            >
              {{ prop.split(":")[1] }}
              <i @click="removeProp(index)">×</i>
            </li>
          </ul>
        </div>

        <!-- 搜索器 -->
        <SearchSelector
          @handleTrademark="handleTrademark"
          @handleAttr="handleAttr"
        />

        <!--商品展示区-->
        <div class="details clearfix">
          <!-- 列表操作区 -->
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{ active: sortFlag === '1' }">
                  <a href="javascript:;" @click="changeOrder('1')">
                    综合
                    <i
                      class="iconfont"
                      v-if="sortFlag === '1'"
                      :class="{
                        icondown: searchParams.order.split(':')[1] === 'desc',
                        iconup: searchParams.order.split(':')[1] === 'asc',
                      }"
                    ></i>
                  </a>
                </li>
                <li :class="{ active: sortFlag === '2' }">
                  <a href="javascript:;" @click="changeOrder('2')">
                    价格
                    <i
                      class="iconfont"
                      v-if="sortFlag === '2'"
                      :class="{
                        icondown: searchParams.order.split(':')[1] === 'desc',
                        iconup: searchParams.order.split(':')[1] === 'asc',
                      }"
                    ></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 商品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="good in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${good.id}`"
                      ><img :src="good.defaultImg"
                    /></router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥&nbsp;</em>
                      <i>{{ good.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <router-link :to="`/detail/${good.id}`">{{
                      good.title
                    }}</router-link>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="javascript:;"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <Pagination
            :total="total"
            :pageSize="searchParams.pageSize"
            :pageNo="searchParams.pageNo"
            :continues="5"
            @changePageNo="changePageNo"
          ></Pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import SearchSelector from "./SearchSelector";
export default {
  name: "Search",
  data() {
    return {
      searchParams: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
        categoryName: "",
        keyword: "",
        props: [],
        trademark: "",
        order: "1:desc",
        pageNo: 1,
        pageSize: 3,
      },
    };
  },
  components: {
    SearchSelector,
  },

  watch: {
    // 监视路由的变化，只有变化了就存在searchParams中
    // 当监视$route时，不要深度监视，因为每一次路由跳转都会生成一个新的$route
    $route: {
      handler() {
        this.handlerSearchParams();
        this.getSearchInfo();
      },
      immediate: true,
    },
  },

  computed: {
    ...mapState("search", ["productList"]),
    ...mapGetters("search", ["goodsList", "total"]),

    // 排序获取flag和type
    sortFlag() {
      return this.searchParams.order.split(":")[0];
    },

    sortType() {
      return this.searchParams.order.split(":")[1];
    },
  },

  methods: {
    getSearchInfo() {
      // 请求search数据
      this.$store.dispatch("search/getSearchInfo", this.searchParams);
    },

    // 点击品牌重新请求数据
    handleTrademark(trademark) {
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
      this.searchParams.pageNo = 1;
      this.getSearchInfo();
    },

    // 更新this.searchParams
    handlerSearchParams() {
      Object.assign(
        this.searchParams,
        {
          category3Id: undefined,
          category2Id: undefined,
          category1Id: undefined,
          categoryName: undefined,
          keyword: undefined,
        },
        this.$route.query
      );
    },

    // 更新手机属性
    handleAttr(id, content, name) {
      let prop = `${id}:${content}:${name}`;

      // 判断prop是否在props中存在
      let isRepeated = this.searchParams.props.some((item) => item === prop);
      if (isRepeated) return;
      this.searchParams.props.push(prop);
      this.getSearchInfo();
    },

    // 移除三级导航分类名
    removeCategoryName() {
      this.searchParams.pageNo = 1;
      this.$router.replace({
        name: "search",
        query: {
          keyword: this.keyword,
        },
      });
    },

    // 移除关键字
    removeKeyword() {
      this.searchParams.pageNo = 1;
      this.$bus.$emit("clearKeyword");
      this.$router.replace({
        name: "search",
        query: {
          ...this.$route.query,
          keyword: undefined,
        },
      });
    },

    // 移除品牌
    removeTrademark() {
      this.searchParams.trademark = undefined;
      this.searchParams.pageNo = 1;
      this.getSearchInfo();
    },

    // 移除属性
    removeProp(index) {
      this.searchParams.props.splice(index, 1);
      this.searchParams.pageNo = 1;
      this.getSearchInfo();
    },

    // 改变当前页数
    changePageNo(val, totalPage) {
      if (val === 0 || val === totalPage + 1) return;
      this.searchParams.pageNo = val;
      this.getSearchInfo();
    },

    // 排序
    changeOrder(sortFlag) {
      let originFlag = this.sortFlag;
      let originType = this.sortType;
      let newOrder = "";
      if (sortFlag !== originFlag) {
        newOrder = `${sortFlag}:desc`;
      } else {
        newOrder = `${originFlag}:${originType === "asc" ? "desc" : "asc"}`;
      }
      this.searchParams.order = newOrder;
      this.searchParams.pageNo = 1;
      this.getSearchInfo();
    },
  },
};
</script>
<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>
