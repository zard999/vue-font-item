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
      <div class="cart-body">
        <ul
          class="cart-list"
          v-for="cartInfo in cartInfoList"
          :key="cartInfo.id"
        >
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="cartInfo.isChecked"
              @change="checkCartInfoStart(cartInfo)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cartInfo.imgUrl" />
            <div class="item-msg">
              {{ cartInfo.skuName }}
            </div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ cartInfo.cartPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="changeSkuNum('decrement', cartInfo)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              :value="cartInfo.skuNum"
              minnum="1"
              class="itxt"
              @change="changeSkuNum('change', cartInfo, $event)"
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="changeSkuNum('increment', cartInfo)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cartInfo.skuNum * cartInfo.cartPrice }}</span>
          </li>
          <li class="cart-list-con7">
            <a
              href="javascript:;"
              class="sindelet"
              @click="showDialogByDelOneCartInfo(cartInfo.skuId)"
              >删除</a
            >
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" v-model="checkAll" />
        <span>全选</span>
      </div>
      <div class="option">
        <a href="javascript:;" @click="showDialogByDelCartInfo"
          >删除选中的商品</a
        >
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择 <span>{{ selectedCount }}</span
          >件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ selectedPrice }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" href="javascript:;" @click="$router.push('/trade')"
            >结算</a
          >
        </div>
      </div>
    </div>

    <!-- 使用Dialog弹框 -->
    <Dialog :visible.sync="visible" :isDelOne="isDelOne">
      <template v-slot:header>
        <span>提示</span>
      </template>
      <template>
        <p>你真的要删除这{{ isDelOne ? "1条" : "些" }}商品吗？</p>
      </template>
      <template #footer>
        <button class="btn" @click="visible = false">取消</button>
        <button class="btn primary" @click="delShopCartInfo">确定</button>
      </template>
    </Dialog>
  </div>
</template>

<script>
import Dialog from "@/components/Dialog";
import {
  reqShopCart,
  reqCheckCart,
  reqDelOnShopCartInfo,
  reqDelSelectedCartInfo,
  reqAddOrUpdateShopCart,
} from "@/api";
import { skuNumberReg } from "@/utils/reg";
export default {
  name: "ShopCart",
  components: {
    Dialog,
  },

  data() {
    return {
      cartInfoList: [],
      value: 1,
      visible: false,
      skuId: "",
      isDelOne: false,
      skuIdList: [], // 批量删除被选中的id
      leftCartInfoList: [], //剩余未删除商品
    };
  },

  methods: {
    // 更新商品选中状态
    async checkCartInfoStart(cartInfo) {
      let isChecked = cartInfo.isChecked ? 0 : 1;
      const result = await reqCheckCart(cartInfo.skuId, isChecked);
      if (result.code === 200) {
        console.log(result);
      } else {
        console.log(result.message);
      }
      this.getCartInfoList();
    },

    // 获取cartInfoList购物车列表
    async getCartInfoList() {
      const result = await reqShopCart();
      console.log(result);
      if (result.code === 200) {
        if (!result.data.length) {
          return (this.cartInfoList = []);
        }
        this.cartInfoList = result.data[0].cartInfoList || [];
      }
    },

    // 点击删除1条打开Dialog
    showDialogByDelOneCartInfo(skuId) {
      this.visible = true;
      this.skuId = skuId;
      // 是删除一条,弹出框显示删除一条还是多条
      this.isDelOne = true;
    },

    // 批量删除
    showDialogByDelCartInfo() {
      this.visible = true;
      this.isDelOne = false;

      this.cartInfoList.forEach((item) => {
        // 将选中商品的id存入列表
        if (item.isChecked) {
          this.skuIdList.push(item.skuId);
        } else {
          // 将没有选中的商品放入列表中
          this.leftCartInfoList.push(item);
        }
      });
    },

    // 删除一条或多条商品
    async delShopCartInfo() {
      // 删除单条
      if (this.isDelOne) {
        const result = await reqDelOnShopCartInfo(this.skuId);
        if (result.code === 200) {
          this.visible = false;
          // this.cartInfoList = this.cartInfoList.filter(
          //   (item) => item.skuId !== this.skuId
          // );
          this.getCartInfoList();
        } else {
          console.log(result.message);
        }
        return;
      }

      // 删除多条
      console.log(this.skuIdList);
      const result = await reqDelSelectedCartInfo({ data: this.skuIdList });
      if (result.code === 200) {
        this.visible = false;
        this.cartInfoList = this.leftCartInfoList;
      } else {
        console.log(result);
      }
    },

    // 更改商品数量
    async changeSkuNum(type, cartInfo, event) {
      const { skuId } = cartInfo;
      let num = 0;
      switch (type) {
        case "increment":
          cartInfo.skuNum++;
          num++;
          if (cartInfo.skuNum > 200) {
            cartInfo.skuNum = 200;
            num = 0;
          }
          break;
        case "decrement":
          cartInfo.skuNum--;
          num--;
          if (cartInfo.skuNum < 1) {
            cartInfo.skuNum = 1;
            num = 0;
          }
          break;
        case "change": {
          let newSkuNum = event.target.value;
          let oldSkuNum = cartInfo.skuNum;
          if (skuNumberReg.test(newSkuNum)) {
            cartInfo.skuNum = newSkuNum;
            if (newSkuNum > 200) cartInfo.skuNum = 200;
            if (newSkuNum < 1) cartInfo.skuNum = 1;
            num = cartInfo.skuNum - oldSkuNum;
          } else {
            cartInfo.skuNum = 1;
            num = 0;
          }
          break;
        }
      }
      if (!num) return;
      await reqAddOrUpdateShopCart(skuId, num);
    },
  },

  computed: {
    // 全选按钮
    checkAll: {
      get() {
        return this.cartInfoList.every((item) => item.isChecked);
      },
      set(val) {
        this.cartInfoList.forEach((item) => {
          item.isChecked = val ? 1 : 0;

          // 每次一都改变isChecked
          this.checkCartInfoStart({
            skuId: item.skuId,
            // 这个要取反一下，上面的函数也取反了
            isChecked: 1 - item.isChecked,
          });
        });
      },
    },

    // 总数量
    selectedCount() {
      return this.cartInfoList.reduce((p, c) => p + c.skuNum * c.isChecked, 0);
    },

    // 总价格
    selectedPrice() {
      return this.cartInfoList.reduce(
        (p, c) => p + c.skuNum * c.cartPrice * c.isChecked,
        0
      );
    },
  },

  // 获取数据
  mounted() {
    this.getCartInfoList();
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
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
