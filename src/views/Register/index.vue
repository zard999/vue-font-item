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
      <ValidationObserver v-slot="{ handlerSubmit }">
        <!-- handlerSubmit会对整体验证，只有所有的条件都满足才执行onSubmit提交ajax -->
        <form @submit.prevent="handlerSubmit(onSubmit)">
          <ValidationProvider
            rules="phoneRequired|phoneNumber"
            v-slot="{ errors }"
            tag="div"
            mode="lazy"
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
            v-slot="{ errors }"
            tag="div"
            mode="lazy"
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
                :class="{ disabled: isSend }"
                :disabled="isSend"
              />
              <span class="error-msg">{{ errors[0] }}</span>
            </div>
          </ValidationProvider>
          <ValidationProvider
            rules="passRequired|passNumber"
            v-slot="{ errors }"
            tag="div"
            mode="lazy"
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
            v-slot="{ errors }"
            tag="div"
            mode="lazy"
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
            v-slot="{ errors }"
            tag="div"
            mode="lazy"
          >
            <div class="controls">
              <input name="m1" type="checkbox" v-model="user.isAgree" />
              <span>同意协议并注册《尚品汇用户协议》</span>
              <span class="error-msg">{{ errors[0] }}</span>
            </div>
            <div class="btn">
              <button @click="registerTo">完成注册</button>
            </div>
          </ValidationProvider>
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
import { ValidationProvider, ValidationObserver, extend } from "vee-validate";
// extend 是这个插件给我们提供的自定义验证得api
import { required } from "vee-validate/dist/rules";
import { phoneNumberReg, passwordReg, codeReg } from "@/utils/reg";
import { reqCode, reqRegister } from "@/api";
// 1.验证手机号
extend("phoneRequired", {
  ...required,
  message: "请输入手机号",
});
extend("phoneNumber", {
  validate(val) {
    return phoneNumberReg.test(val);
  },
  message: "手机号格式不正确，应该是11位",
});

// 2. 验证码
extend("codeRequired", {
  ...required,
  message: "请输入验证码",
});
extend("codeNumber", {
  validate(val) {
    return codeReg.test(val);
  },
  message: "验证码格式不正确,应该是6位数字",
});

// 3.验证密码
extend("passRequired", {
  ...required,
  message: "请输入密码",
});
extend("passNumber", {
  validate(val) {
    return passwordReg.test(val);
  },
  message: "密码格式不正确,应该是6-18位的大小写字母数字组合",
});

// 4. 确认密码
extend("rePassNumber", {
  validate(val, { password }) {
    return val === password;
  },
  message: "两次密码不一样",
  params: ["password"],
});

// 5. 勾选同意
extend("agree", {
  validate(val) {
    return val;
  },
  message: "请勾选用户协议",
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
        isAgree: false,
      },
      isSend: false, // 是否发生了验证码
    };
  },

  methods: {
    // 成功校验发送请求
    onSubmit() {
      console.log("表单校验通过了...");
    },

    // 获取验证码
    async getCode() {
      if (!phoneNumberReg.test(this.user.phone))
        return alert("手机号不合法，请重新输入");
      const result = await reqCode(this.user.phone);
      if (result.code === 200) {
        this.user.code = result.data;
        this.isSend = true;
      } else {
        console.log(result.message);
      }
    },

    // 注册账号
    async registerTo() {
      const { phone, password, code } = this.user;
      const result = await reqRegister({
        phone,
        password,
        code,
      });
      if (result.code !== 200) return alert(result.message);
      alert("恭喜你注册成功");

      // 跳转到登陆页面
      this.$router.push("/login");
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

  .disabled {
    cursor: not-allowed;
  }
}
</style>
