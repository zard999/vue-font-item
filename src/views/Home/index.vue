<template>
  <div>
    <!-- 三级导航 -->
    <TypeNav></TypeNav>

    <!-- 轮播图 -->
    <ListContainer></ListContainer>

    <!-- 今日推荐 -->
    <Recommend></Recommend>

    <!-- 商品排行 -->
    <Rank></Rank>

    <!-- 猜你喜欢 -->
    <Like></Like>

    <!-- 楼层 -->
    <Floor></Floor>

    <!-- 商标 -->
    <Brand></Brand>
  </div>
</template>

<script>
import TypeNav from "./TypeNav";
import ListContainer from "./ListContainer";
import Recommend from "./Recommend";
import Rank from "./Rank";
import Like from "./Like";
import Floor from "./Floor";
import Brand from "./Brand";
export default {
  name: "Home",
  components: {
    TypeNav,
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand,
  },
};
</script>

<style></style>
