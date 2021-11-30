<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div class="nav-left" @mouseleave="handleLeave">
        <h2 class="all" @mouseenter="isShowNav = true">全部商品分类</h2>
        <div class="sort" v-show="isShowNav">
          <div class="all-sort-list2" @click="btnSearch">
            <div
              class="item"
              :class="{ hov: currentIndex === index }"
              v-for="(c1, index) in categoryList"
              :key="c1.categoryId"
              @mouseenter="showCategorys(index)"
              @mouseleave="hideCategorys"
            >
              <h3>
                <a
                  href="javascript:;"
                  :data-level="1"
                  :data-name="c1.categoryName"
                  :data-id="c1.categoryId"
                  >{{ c1.categoryName }}</a
                >
              </h3>
              <div class="item-list clearfix">
                <div class="subitem">
                  <dl
                    class="fore"
                    v-for="c2 in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dt>
                      <a
                        href="javascript:;"
                        :data-level="2"
                        :data-name="c2.categoryName"
                        :data-id="c2.categoryId"
                        >{{ c2.categoryName }}</a
                      >
                    </dt>
                    <dd>
                      <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                        <a
                          href="javascript:;"
                          :data-level="3"
                          :data-name="c3.categoryName"
                          :data-id="c3.categoryId"
                          >{{ c3.categoryName }}</a
                        >
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "TypeNav",

  data() {
    return {
      isShowNav: true,
      currentIndex: -1,
    };
  },

  computed: {
    // 模块化前面要加对应的模块名称
    ...mapState("home", ["categoryList"]),
  },

  methods: {
    btnSearch(event) {
      /**
       * 拿到data自定义属性
       * level: 表示是几级菜单，后面好拼接
       */
      const { name: categoryName, level, id } = event.target.dataset;
      // 拼接
      const { keyword } = this.$route.query;
      if (categoryName) {
        this.$router.push({
          path: "/search",
          query: {
            keyword,
            categoryName,
            ["category" + level + "id"]: id,
          },
        });
      }
    },

    // 鼠标移出
    handleLeave() {
      if (!this.$route.meta.isShowTypeNav) {
        this.isShowNav = false;
      }
    },

    // 鼠标移出显示列表
    showCategorys(index) {
      this.currentIndex = index;
    },

    // 隐藏列表
    hideCategorys() {
      this.currentIndex = -1;
    },
  },

  mounted() {
    // 在search中是没有meta数据的。所以隐藏
    if (!this.$route.meta.isShowTypeNav) {
      this.isShowNav = false;
    }
  },
};
/**
 * 1. 单击三级连接实现跳转的同时携带参数
 *  1. 我们没有将所有的 a 标签都改成 router-link 的形式进行传参，因为有太多的 a 标签需要改成 router-link
      的形式，还要改成to的形式，再传参，效率低，不好
 *  2. 为了提高效率我们也不是给每一个a标签都注册事件，而是给所有的父级通过委托的方式注册了一个btnSearch
 *  3. 当单机事件被触发时，需要跳转到search页面的时候，携带参数。
 * 
 * 2. 使用路由元来控制TypeNav列表的显示与隐藏
 *  1. Home页面中的TypeNav要完整显示
 *  2. Search页面中的TypeNav要隐藏，鼠标移动上去又显示出来
 */
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &:hover {
            .item-list {
              display: block;
            }
          }
        }

        .hov {
          background-color: #999;
        }
      }
    }
  }
}
</style>
