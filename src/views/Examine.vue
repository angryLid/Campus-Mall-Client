<template>
    <div class="wrapper-w80">
        <el-table :data="tableData" style="width: 100%">
            <el-table-column
                prop="userId"
                label="申请人"
                width="90"
            ></el-table-column>
            <el-table-column
                prop="applyDate"
                label="申请时间"
                width="100"
            ></el-table-column>
            <el-table-column
                prop="content"
                label="申请内容"
                width="800"
            ></el-table-column>

            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-link
                        type="success"
                        @click="pass(scope.$index, scope.row)"
                        :disabled="disabled(scope.$index, scope.row)"
                        >批准</el-link
                    >
                    <el-link
                        type="success"
                        @click="reject(scope.$index, scope.row)"
                        :disabled="disabled(scope.$index, scope.row)"
                        >驳回</el-link
                    >
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<style lang="scss" scoped></style>

<script>
export default {
  data () {
    return {
      tableData: []
    }
  },
  methods: {
    disabled (index, row) {
      return row.selected
    },

    pass (index, row) {
      const token = localStorage.getItem('Authorization')
      const axiosConfig = {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          Authorization: token
        }
      }
      this.$ajax
        .put(`/message?id=${row.sno}&status=true`, null, axiosConfig)
        .then((res) => {
          console.log(res)
          if (res.data.code === 200) {
            this.refresh()
          } else {
            // this.handleLogout();
          }
        })
        .catch(() => {})
    },
    reject (index, row) {
      const token = localStorage.getItem('Authorization')
      const axiosConfig = {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          Authorization: token
        }
      }
      this.$ajax
        .put(`/message?id=${row.sno}&status=false`, null, axiosConfig)
        .then((res) => {
          console.log(res)
          if (res.data.code === 200) {
            this.refresh()
          } else {
            // this.handleLogout();
          }
        })
        .catch(() => {})
    },

    refresh () {
      const that = this
      const token = localStorage.getItem('Authorization')
      const axiosConfig = {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          Authorization: token
        }
      }
      this.$ajax
        .get('/message', axiosConfig)
        .then((res) => {
          if (res.data.code === 200) {
            that.tableData = res.data.data
          } else {
            // this.handleLogout();
          }
        })
        .catch(() => {})
    }
  },
  created: function () {
    const that = this
    const token = localStorage.getItem('Authorization')
    const axiosConfig = {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        Authorization: token
      }
    }
    this.$ajax
      .get('/message', axiosConfig)
      .then((res) => {
        if (res.data.code === 200) {
          that.tableData = res.data.data
        } else {
          // this.handleLogout();
        }
      })
      .catch(() => {})
  }
}
</script>
