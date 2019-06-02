<template>
  <div class="wrapper-w80">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="name" label="课程名称" width="180"></el-table-column>
      <el-table-column prop="tel" label="任课老师" width="180"></el-table-column>
      <el-table-column prop="hobby" label="授课时间"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-link type="success" @click="handleEdit(scope.$index, scope.row)">选课</el-link>
          <!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Edit</el-button> -->
          <!-- <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button> -->
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
          name: "赵伟",
          tel: "156*****1987",
          hobby: "钢琴、书法、唱歌",
          address: "上海市黄浦区金陵东路569号17楼"
        },
        {
          name: "李伟",
          tel: "182*****1538",
          hobby: "钢琴、书法、唱歌",
          address: "上海市奉贤区南桥镇立新路12号2楼"
        },
        {
          name: "孙伟",
          tel: "161*****0097",
          hobby: "钢琴、书法、唱歌",
          address: "上海市崇明县城桥镇八一路739号"
        },
        {
          name: "周伟",
          tel: "197*****1123",
          hobby: "钢琴、书法、唱歌",
          address: "上海市青浦区青浦镇章浜路24号"
        },
        {
          name: "周伟",
          tel: "197*****1123",
          hobby: "钢琴、书法、唱歌",
          address: "上海市青浦区青浦镇章浜路24号"
        },
        {
          name: "周伟",
          tel: "197*****1123",
          hobby: "钢琴、书法、唱歌",
          address: "上海市青浦区青浦镇章浜路24号"
        },
        {
          name: "周伟",
          tel: "197*****1123",
          hobby: "钢琴、书法、唱歌",
          address: "上海市青浦区青浦镇章浜路24号"
        },
        {
          name: "吴伟",
          tel: "183*****6678",
          hobby: "钢琴、书法、唱歌",
          address: "上海市松江区乐都西路867-871号"
        }
      ],
      columns: [
        {
          field: "name",
          title: "姓名",
          width: 80,
          titleAlign: "center",
          columnAlign: "center"
        },
        {
          field: "tel",
          title: "手机号码",
          width: 200,
          titleAlign: "center",
          columnAlign: "center"
        },
        {
          field: "hobby",
          title: "爱好",
          width: 240,
          titleAlign: "center",
          columnAlign: "center"
        },
        {
          field: "address",
          title: "地址",
          titleAlign: "center",
          columnAlign: "left"
        }
      ]
    };
  }
};
</script>
