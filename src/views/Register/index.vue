<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>
        注册新用户
        <span class="go"
          >我有账号，去 <a href="login.html" target="_blank">登陆</a>
        </span>
      </h3>
      <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(onSubmit)">
          <ValidationProvider
            rules="phoneRequired|phoneNumber"
            mode="lazy"
            tag="div"
            v-slot="{ errors }"
          >
            <div class="content">
              <label>手机号:</label>
              <input
                type="text"
                placeholder="请输入你的手机号"
                v-model="user.phone"
              />
              <span class="error-msg">{{ errors[0] }}</span>
            </div>
          </ValidationProvider>
          <ValidationProvider
            rules="codeRequired|codeNumber"
            mode="lazy"
            tag="div"
            v-slot="{ errors }"
          >
            <div class="content">
              <label>验证码:</label>
              <input
                type="text"
                placeholder="请输入验证码"
                v-model="user.code"
              />
              <input
                type="button"
                value="发送验证码"
                @click="getCode"
                :disabled="isSend"
              />
              <span class="error-msg">{{ errors[0] }}</span>
            </div>
          </ValidationProvider>
          <ValidationProvider
            rules="passRequired|passNumber"
            mode="lazy"
            tag="div"
            v-slot="{ errors }"
          >
            <div class="content">
              <label>登录密码:</label>
              <input
                type="text"
                placeholder="请输入你的登录密码"
                v-model="user.password"
              />
              <span class="error-msg">{{ errors[0] }}</span>
            </div>
          </ValidationProvider>
          <ValidationProvider
            :rules="`passRequired|passNumber|rePassNumber:${user.password}`"
            mode="lazy"
            tag="div"
            v-slot="{ errors }"
          >
            <div class="content">
              <label>确认密码:</label>
              <input
                type="text"
                placeholder="请输入确认密码"
                v-model="user.rePassword"
              />
              <span class="error-msg">{{ errors[0] }}</span>
            </div>
          </ValidationProvider>
          <ValidationProvider
            rules="agree"
            mode="lazy"
            tag="div"
            v-slot="{ errors }"
          >
            <div class="controls">
              <input name="m1" type="checkbox" v-model="user.isCheck" />
              <span>同意协议并注册《尚品汇用户协议》</span>
              <span class="error-msg">{{ errors[0] }}</span>
            </div>
          </ValidationProvider>
          <div class="btn">
            <button>完成注册</button>
          </div>
        </form>
      </ValidationObserver>
    </div>

    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号</div>
    </div>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider, extend } from "vee-validate";
import { required } from "vee-validate/dist/rules";
import { phoneReg, codeReg, passReg } from "@/utils/reg";
import { reqCode, reqRegister } from "@/api";
// 1. 手机号验证
extend("phoneRequired", {
  ...required,
  message: "请输入手机号",
});

extend("phoneNumber", {
  validate: (val) => phoneReg.test(val),
  message: "手机号错误，应该为11位数字",
});

// 2. 验证码
extend("codeRequired", {
  ...required,
  message: "请输入验证码",
});

extend("codeNumber", {
  validate: (val) => codeReg.test(val),
  message: "验证码错误，应该为6位数字",
});

// 3. 登录密码
extend("passRequired", {
  ...required,
  message: "请输入登录密码",
});

extend("passNumber", {
  validate: (val) => passReg.test(val),
  message: "登录密码错误，应该为6-18位数字大小写字母组成",
});

// 4. 确认密码
extend("rePassNumber", {
  validate: (val, { password }) => password === val,
  message: "确认密码和上一次密码不一致，请检查",
  params: ["password"],
});

// 5. 勾选同意项
extend("agree", {
  validate: (val) => val,
  message: "请勾选同意项",
});

export default {
  name: "Register",
  data() {
    return {
      user: {
        phone: "",
        password: "",
        rePassword: "",
        code: "",
        isCheck: false,
      },
      isSend: false,
    };
  },

  methods: {
    // 表单验证,完成注册
    async onSubmit() {
      const { phone, password, code } = this.user;
      const result = await reqRegister({ phone, password, code });
      console.log(result);
      if (result.code !== 200) {
        return alert("注册失败");
      }
      alert("注册完成");
      this.$router.push("/login");
    },

    // 获取验证码
    async getCode() {
      if (!phoneReg.test(this.user.phone)) {
        return alert("手机号不合法，请重新输入");
      }
      const result = await reqCode(this.user.phone);
      if (result.code === 200) {
        this.isSend = true;
        this.user.code = result.data;
      } else {
        console.log(result.message);
      }
    },
  },

  components: {
    ValidationObserver,
    ValidationProvider,
  },
};
</script>

<style lang="less" scoped>
.register-container {
  .register {
    width: 1200px;
    height: 445px;
    border: 1px solid rgb(223, 223, 223);
    margin: 0 auto;

    h3 {
      background: #ececec;
      margin: 0;
      padding: 6px 15px;
      color: #333;
      border-bottom: 1px solid #dfdfdf;
      font-size: 20.04px;
      line-height: 30.06px;

      span {
        font-size: 14px;
        float: right;

        a {
          color: #e1251b;
        }
      }
    }

    div:nth-of-type(1) {
      margin-top: 40px;
    }

    .content {
      padding-left: 390px;
      margin-bottom: 18px;
      position: relative;

      label {
        font-size: 14px;
        width: 96px;
        text-align: right;
        display: inline-block;
      }

      input {
        width: 270px;
        height: 38px;
        padding-left: 8px;
        box-sizing: border-box;
        margin-left: 5px;
        outline: none;
        border: 1px solid #999;
      }

      img {
        vertical-align: sub;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .controls {
      text-align: center;
      position: relative;

      input {
        vertical-align: middle;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .btn {
      text-align: center;
      line-height: 36px;
      margin: 17px 0 0 55px;

      button {
        outline: none;
        width: 270px;
        height: 36px;
        background: #e1251b;
        color: #fff !important;
        display: inline-block;
        font-size: 16px;
      }
    }
  }

  .copyright {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    line-height: 24px;

    ul {
      li {
        display: inline-block;
        border-right: 1px solid #e4e4e4;
        padding: 0 20px;
        margin: 15px 0;
      }
    }
  }
}
</style>
