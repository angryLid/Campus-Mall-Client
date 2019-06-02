<template>
  <div class="wrapper-w80">
    <el-table :data="scoreData" style="width: 100%" :row-class-name="tableRowClassName">
      <el-table-column prop="cource" label="科目" width="180"></el-table-column>
      <el-table-column prop="score" label="分数" width="180"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-link type="success" @click="hideScore(scope.row)">隐藏</el-link>
          <!-- <el-link type="primary" @click="showScore(scope.row)">显示</el-link> -->
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<style lang="scss" scoped>
.hide {
  display: none;
}

.wrg {
  color: red !important;
}
</style>

<script>
export default {
  methods: {
    tableRowClassName({ row, rowIndex }) {
      return row.score < 60 ? "warning-row" : "";
    }
  },
  data() {
    return {
      scoreData: [
        {
          cource: "大学英语(二)",
          score: 85,
          display: true
        },
        {
          cource: "高等数学下",
          score: 80
        },
        {
          cource: "网页设计与制作",
          score: 59
        },
        {
          cource: "近现代史纲要",
          score: 66
        },
        {
          cource: "形式与政策",
          score: 88
        }
      ]
    };
  }
};
</script>
