<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>
        注册新用户
        <span class="go"
          >我有账号，去 <router-link to="/login">登陆</router-link>
        </span>
      </h3>
      <div class="content">
        <label>手机号:</label>
        <input
          v-model="phone"
          name="phone"
          placeholder="请输入你的手机号"
          v-validate="{ required: true, regex: /^1\d{10}$/ }"
          :class="{ invalid: errors.has('phone') }"
        />
        <span class="error-msg">{{ errors.first("phone") }}</span>
      </div>
      <div class="content">
        <label>验证码:</label>
        <input
          v-model="code"
          name="code"
          placeholder="请输入验证码"
          v-validate="{ required: true, regex: /^\d{6}$/ }"
          :class="{ invalid: errors.has('code') }"
        />
        <el-button type="info" @click="getCode">获取验证码</el-button>
        <span class="error-msg">{{ errors.first("code") }}</span>
      </div>
      <div class="content">
        <label>登录密码:</label>
        <input
          v-model="password"
          name="password"
          placeholder="请输入你的登录密码"
          v-validate="{ required: true, regex: /^\w{5,15}$/ }"
          :class="{ invalid: errors.has('password') }"
        />
        <span class="error-msg">{{ errors.first("password") }}</span>
      </div>
      <div class="content">
        <label>确认密码:</label>
        <input
          v-model="password2"
          name="password2"
          placeholder="请输入确认密码"
          v-validate="{ is: password }"
          :class="{ invalid: errors.has('password2') }"
        />
        <span class="error-msg">{{ errors.first("password2") }}</span>
      </div>
      <div class="controls">
        <input
          v-model="isCheck"
          name="isCheck"
          type="checkbox"
          v-validate="{ agree: true }"
          :class="{ invalid: errors.has('isCheck') }"
        />
        <span>同意协议并注册《尚品汇用户协议》</span>
        <span class="error-msg">{{ errors.first("isCheck") }}</span>
      </div>
      <div class="btn">
        <el-button type="danger" @click="register">完成注册</el-button>
      </div>
    </div>

    <!-- 底部 -->
    <div class="copyright" v-if="!this.$route.meta.isHiddenFooter">
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
export default {
  name: "Register",
  data() {
    return {
      phone: "",
      code: "",
      password: "",
      password2: "",
      isCheck: true,
    };
  },

  methods: {
    // 获取验证码
    async getCode() {
      const { phone } = this;
      if (phone) {
        try {
          const result = await this.$store.dispatch("user/getCode", phone);
          this.code = result;
        } catch (e) {
          alert("获取验证码失败");
        }
      }
    },

    // 用户注册
    async register() {
      //整体验证  在点击完成注册的是由对所有的表单项进行验证
      const success = await this.$validator.validateAll(); // 对所有表单项进行验证
      if (success) {
        const { phone, password, code } = this;
        if (phone && password) {
          try {
            await this.$store.dispatch("user/userRegister", {
              phone,
              password,
              code,
            });
            this.$message.success("注册成功，跳转到登录页面");
            this.$router.push("/login");
          } catch (e) {
            this.$message.error("注册失败");
          }
        }
      }
    },
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
