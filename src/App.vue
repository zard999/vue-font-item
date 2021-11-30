<template>
  <div>
    <Header></Header>
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "./components/Footer";
import Header from "./components/Header";
export default {
  components: {
    Footer,
    Header,
  },
  mounted() {
    /**
     * 全局形式的派发，应该使用模块化模式的派发
     * this.$store.dispatch("getCategoryListData")
     * 加上路径
     * 因为路径的变化会频繁的销毁当前TypeNav，会频繁发生请求，所以得在一个不频繁更爱改的页面初始化发生请求
     */
    this.$store.dispatch("home/getCategoryListData");
  },
};
</script>

<style></style>
