<template>
  <div class="spec-preview">
    <img v-lazy="defaultImg.imgUrl" />
    <div class="event" @mousemove="move"></div>
    <div class="big">
      <img v-lazy="defaultImg.imgUrl" ref="bigImg" />
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
export default {
  name: "Zoom",
  props: {
    imgList: Array,
  },
  data() {
    return {
      defaultIndex: 0,
    };
  },
  computed: {
    defaultImg() {
      return this.imgList[this.defaultIndex] || {};
    },
  },
  methods: {
    move(event) {
      // 获取蒙版和大图
      let mask = this.$refs.mask,
        bigImg = this.$refs.bigImg;

      // 获取鼠标位置
      let mouseX = event.offsetX,
        mouseY = event.offsetY;

      // 获取绿色的放大镜移动的距离
      let maskX = mouseX - mask.offsetWidth / 2;
      let maskY = mouseY - mask.offsetHeight / 2;

      // 边界值判断
      if (maskX < 0) {
        maskX = 0;
      } else if (maskX > mask.offsetWidth) {
        maskX = mask.offsetWidth;
      }

      if (maskY < 0) {
        maskY = 0;
      } else if (maskY > mask.offsetHeight) {
        maskY = mask.offsetHeight;
      }

      // 蒙版放大镜移动的坐标
      mask.style.left = maskX + "px";
      mask.style.top = maskY + "px";

      // 大图移动的坐标
      bigImg.style.left = -2 * maskX + "px";
      bigImg.style.top = -2 * maskY + "px";
    },
  },
  mounted() {
    this.$bus.$on("changeDefaultIndex", (index) => {
      this.defaultIndex = index;
    });
  },
};
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>
