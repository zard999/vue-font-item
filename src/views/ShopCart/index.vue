<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div
        class="cart-body"
        v-for="(shopCart, index) in shopCartList"
        :key="index"
      >
        <ul
          class="cart-list"
          v-for="cartInfo in shopCart.cartInfoList"
          :key="cartInfo.id"
        >
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="cartInfo.isChecked"
              @click="updateIsChecked(cartInfo)"
            />
          </li>
          <li class="cart-list-con2">
            <img v-lazy="cartInfo.imgUrl" />
            <div class="item-msg">
              {{ cartInfo.skuName }}
            </div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ cartInfo.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="changeNum(-1, cartInfo)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              :value="cartInfo.skuNum"
              minnum="1"
              class="itxt"
              @change="
                changeNum($event.target.value * 1 - cartInfo.skuNum, cartInfo)
              "
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="changeNum(1, cartInfo)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cartInfo.skuNum * cartInfo.cartPrice }}</span>
          </li>
          <li class="cart-list-con7">
            <el-button
              type="danger"
              size="mini"
              icon="el-icon-delete"
              @click="deleteOneCartList(cartInfo)"
              >删除</el-button
            >
            <br />
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" v-model="isCheckAll" />
        <span>全选</span>
      </div>
      <div class="option">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          @click="deleteIsCheckCartList"
          >删除选中的商品</el-button
        >
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择 <span>{{ checkNum }}</span
          >件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ allMoney }}</i>
        </div>
        <div class="sumbtn">
          <router-link to="/trade"
            ><el-button type="danger" icon="el-icon-shopping-bag-2"
              >结算</el-button
            ></router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "ShopCart",
  mounted() {
    this.getShopCartList();
  },

  methods: {
    // 发送vuex获取购物车请求
    getShopCartList() {
      this.$store.dispatch("shopcart/getShopCartList");
    },

    // 改变购物车数量
    async changeNum(disNum, cartInfo) {
      // 变化的量加上现有的量小于1，就不对了
      if (disNum + cartInfo.skuNum < 1) {
        // 让最终的量为1
        disNum = 1 - cartInfo.skuNum;
      }
      try {
        await this.$store.dispatch("shopcart/addOrUpdateShopCart", {
          skuId: cartInfo.skuId,
          skuNum: disNum,
        });
        this.getShopCartList();
      } catch (e) {
        alert("添加购物车数量失败");
      }
    },

    // 点击修改单个单选框状态
    async updateIsChecked(cartInfo) {
      try {
        await this.$store.dispatch("shopcart/updateIsChecked", {
          skuId: cartInfo.skuId,
          isChecked: cartInfo.isChecked ? 0 : 1,
        });
        this.getShopCartList();
      } catch (e) {
        alert("改选选中失败");
      }
    },

    // 删除购物车单个商品
    async deleteOneCartList(cartInfo) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        beforeClose: async (action, instance, done) => {
          if (action === "confirm") {
            await this.$store.dispatch(
              "shopcart/deleteOneCartList",
              cartInfo.skuId
            );
            this.getShopCartList();
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            done();
          } else if (action === "cancel") {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
            done();
          }
        },
      })
        .then(() => {})
        .catch(() => {});
    },

    // 批量删除购物车
    async deleteIsCheckCartList() {
      let skuIdList = [];
      this.shopCartList.forEach((item) => {
        item.cartInfoList.forEach((item) => {
          if (item.isChecked === 1) {
            skuIdList.push(item.skuId);
          }
        });
      });

      this.$confirm("此操作将永久删除这些文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        beforeClose: async (action, instance, done) => {
          if (action === "confirm") {
            await this.$store.dispatch("shopcart/deleteIsCheckCartList", {
              data: skuIdList,
            });
            this.getShopCartList();
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            done();
          } else if (action === "cancel") {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
            done();
          }
        },
      })
        .then(() => {})
        .catch(() => {});
    },
  },

  computed: {
    ...mapState("shopcart", ["shopCartList"]),

    checkNum() {
      return this.shopCartList.reduce((p, c) => {
        return (
          p +
          c.cartInfoList.reduce((p, c2) => {
            if (c2.isChecked) {
              p += c2.skuNum;
            }
            return p;
          }, 0)
        );
      }, 0);
    },

    // 总价格
    allMoney() {
      return this.shopCartList.reduce((p, c) => {
        return (
          p +
          c.cartInfoList.reduce((p, c2) => {
            if (c2.isChecked) {
              p += c2.skuNum * c2.skuPrice;
            }
            return p;
          }, 0)
        );
      }, 0);
    },

    // 全选或全不选
    isCheckAll: {
      get() {
        return this.shopCartList.every((item) =>
          item.cartInfoList.every((item1) => item1.isChecked)
        );
      },
      async set(newVal) {
        let isChecked = newVal ? 1 : 0;
        let skuIdList = [];
        this.shopCartList.forEach((item) => {
          item.cartInfoList.forEach((item) => {
            if (item.isChecked !== isChecked) {
              skuIdList.push(item.skuId);
            }
          });
        });

        try {
          await this.$store.dispatch("shopcart/updateCartListCheckAll", {
            isChecked,
            skuIdList,
          });
          this.getShopCartList();
        } catch (e) {
          alert("修改失败");
        }
      },
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;
  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }
  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;
      & > div {
        float: left;
      }
      .cart-th1 {
        width: 25%;
        input {
          vertical-align: middle;
        }
        span {
          vertical-align: middle;
        }
      }
      .cart-th2 {
        width: 25%;
      }
      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }
    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;
      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;
        & > li {
          float: left;
        }
        .cart-list-con1 {
          width: 15%;
        }
        .cart-list-con2 {
          width: 35%;
          img {
            width: 82px;
            height: 82px;
            float: left;
          }
          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }
        .cart-list-con4 {
          width: 10%;
        }
        .cart-list-con5 {
          width: 17%;
          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }
  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          overflow: hidden;
        }
      }
    }
  }
}
</style>
