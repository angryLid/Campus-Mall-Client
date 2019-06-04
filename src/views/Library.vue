<template>
  <div class="wrapper-w80">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="name" label="书名" width="260"></el-table-column>
      <el-table-column prop="author" label="作者" width="180"></el-table-column>
      <!-- <el-table-column prop="hobby" label="授课时间"></el-table-column> -->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-link type="success" @click="handleEdit(scope.$index, scope.row)">续期</el-link>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [
        {
          author: "赵伟",
          name: "胡建人怎么学习普通发"
        },
        {
          author: "赵伟",
          name: "唱,跳,Rap,篮球速成指南"
        },
        {
          author: "赵伟",
          name: "如何鉴别黄色歌曲"
        }
      ]
    };
  }
};
</script>
