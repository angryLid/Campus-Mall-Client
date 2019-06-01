<template>
  <div class="wrapper">
    <el-input v-model="search" class="seachbar" placeholder="搜索课程, 教师.."></el-input>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="name" label="课程名称" width="180"></el-table-column>
      <el-table-column prop="teacher" label="任课老师" width="180"></el-table-column>
      <el-table-column prop="date" label="授课时间"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-link type="success" @click="handleEdit(scope.$index, scope.row)">选课</el-link>
          <!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Edit</el-button> -->
          <!-- <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button> -->
        </template>
      </el-table-column>
    </el-table>

    <h2 class="title-light">已选到的课:</h2>
    <el-table :data="chosenCources" style="width: 100%">
      <el-table-column prop="name" label="课程名称" width="180"></el-table-column>
      <el-table-column prop="teacher" label="任课老师" width="180"></el-table-column>
      <el-table-column prop="date" label="授课时间"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Edit</el-button> -->
          <el-link type="danger" @click="handleEdit(scope.$index, scope.row)">退选</el-link>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style lang="scss" scoped>
table {
  padding-top: 10px;
  width: 100%;
  border: 1px solid black;
}
.wrapper {
  width: 80%;
  margin: 0 auto;
}
</style>

<script>
export default {
  data() {
    return {
      search: "",
      tableData: [
        {
          name: "实用装逼学",
          teacher: "陆仁贾",
          date: "周五晚9:00"
        }
      ],
      chosenCources: [
        {
          name: "实用装逼学",
          teacher: "陆仁贾",
          date: "周五晚9:00"
        }
      ]
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  }
};
</script>
