<template>
  <!--banner轮播-->
  <div class="swiper-container" id="mySwiper" :ref="bannerClass">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="banner in bannerList" :key="banner.id">
        <img v-lazy="banner.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name: "Carousel",
  props: {
    bannerList: Array,
    bannerClass: String,
  },

  // 只有数据更新，就重新new，会消耗很多资源
  // updated() {},
  // 终极方案
  watch: {
    bannerList: {
      immediate: true,
      handler() {
        // 只要这个bannerList数据一发生变化立即启用swiper
        // 等到页面渲染完毕，nextTick可以获取页面中最新的数据
        this.$nextTick(() => {
          // bannerList数组从0到有真正的数据
          new Swiper(this.$refs[this.bannerClass], {
            // direction: "vertical", // 垂直切换选项
            loop: true, // 循环模式选项
            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },

            // 如果需要滚动条
            // scrollbar: {
            //   el: ".swiper-scrollbar",
            // },
          });
        });
      },
    },
  },
};
</script>

<style></style>
