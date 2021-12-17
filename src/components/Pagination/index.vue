<template>
  <div class="pagination">
    <button @click="changePageNo(pageNo - 1)" :disabled="pageNo === 1">
      上一页
    </button>
    <button v-show="startAndEnd.start > 1" @click="changePageNo(1)">1</button>
    <span v-show="startAndEnd.start > 2">...</span>
    <button
      v-for="(_, index) in continueNoArr"
      :key="_"
      :class="{ active: startAndEnd.start + index === pageNo }"
      @click="changePageNo(startAndEnd.start + index)"
    >
      {{ startAndEnd.start + index }}
    </button>
    <button v-show="startAndEnd.end < totalPage - 1">···</button>
    <button
      v-show="startAndEnd.end < totalPage"
      @click="changePageNo(totalPage)"
    >
      {{ totalPage }}
    </button>
    <button @click="changePageNo(pageNo + 1)" :disabled="pageNo === totalPage">
      下一页
    </button>

    <span>共 {{ total }} 条</span>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    total: Number,
    pageSize: Number,
    pageNo: Number,
    continues: Number,
  },

  computed: {
    // 总页数
    totalPage() {
      const { total, pageSize } = this;
      return Math.ceil(total / pageSize);
    },

    // 计算连续页面开始和结束
    startAndEnd() {
      const { pageNo, continues, totalPage } = this;
      let start, end;
      if (continues > totalPage) {
        // 当连续页数大于总页数,让continues等于totalPage
        end = totalPage;
        start = 1;
      } else {
        start = pageNo - (continues >> 1);
        end = pageNo + (continues >> 1);

        // 如果计算起始页小于1，则起始页只能是1
        if (start < 1) {
          start = 1;
          end = continues;
        }

        // 如果算出来的连续页中的结束页大于总页数， 就令等于结束页
        if (end > totalPage) {
          end = totalPage;
          // + 1是因为计算数字的长度会多一
          start = totalPage - continues + 1;
        }
      }

      return { start, end };
    },

    // 优化
    continueNoArr() {
      let { start, end } = this.startAndEnd;
      let arr = [];
      for (let i = start; i <= end; i++) {
        arr.push(arr);
      }
      return arr;
    },
  },

  methods: {
    changePageNo(val) {
      this.$emit("changePageNo", val, this.totalPage);
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #c81623;
      color: #fff;
    }
  }
  span {
    display: inline-block;
    line-height: 28px;
    font-size: 14px;
    color: gray;
    vertical-align: middle;
  }
}
</style>
