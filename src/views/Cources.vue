<template>
  <div class="wrapper-w80">
    <el-input v-model="search" class="seachbar" placeholder="搜索课程, 教师.."></el-input>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="name" label="课程名称" width="180"></el-table-column>
      <el-table-column prop="teacher" label="任课老师" width="180"></el-table-column>
      <el-table-column prop="date" label="授课时间"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-link
            type="success"
            @click="select(scope.$index, scope.row)"
            :disabled="disabled(scope.$index, scope.row)"
          >选课</el-link>
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
          <el-link type="danger" @click="cancel(scope.$index, scope.row)">退选</el-link>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style lang="scss" scoped>
</style>

<script>
export default {
  data() {
    return {
      search: "",
      tableData: [
        {
          id: 0,
          name: "实用装逼学",
          teacher: "陆仁贾",
          date: "周五 第八课时",
          selected: false
        },
        {
          id: 1,
          name: "基础日语",
          teacher: "上杉夏香",
          date: "周三 第六课时",
          selected: false
        },
        {
          id: 2,
          name: "韭菜培育方法",
          teacher: "贾政锦",
          date: "周二 第二课时",
          selected: false
        },
        {
          id: 3,
          name: "遗传学实验",
          teacher: "赵昊",
          date: "周一 第二课时",
          selected: false
        }
      ],
      chosenCources: []
    };
  },
  methods: {
    disabled(index, row) {
      return row.selected;
    },
    handleEdit(index, row) {
      console.log(index, row);
    },

    handleDelete(index, row) {
      console.log(index, row);
    },

    select(index, row) {
      console.log(row);
      // row.selected = true;
      let crs = this.tableData[index];

      if (crs.selected) {
        return;
      } else {
        crs.selected = true;
        this.chosenCources.push(crs);
      }
    },

    cancel(index, row) {
      this.tableData[row.id].selected = false;
      console.log(row.id);
      this.chosenCources.splice(index, 1);
    }
  }
};
</script>
