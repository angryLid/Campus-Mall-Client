<template>
    <div class="wrapper-w80">
        <el-form ref="form" :model="form">
            <el-form-item>
                <el-date-picker
                    v-model="value1"
                    type="date"
                    placeholder="选择日期"
                    :picker-options="pickerOptions"
                ></el-date-picker>
            </el-form-item>

            <el-form-item>
                <el-input
                    type="textarea"
                    :autosize="{ minRows: 4, maxRows: 4 }"
                    placeholder="请假理由"
                    v-model="textarea2"
                ></el-input>
            </el-form-item>

            <el-button @click="handleApply">申请</el-button>
        </el-form>

        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="approved" label="通过状态" width="180">
            </el-table-column>
            <el-table-column prop="content" label="申请内容" width="720">
            </el-table-column>
        </el-table>
    </div>
</template>
<style lang="scss" scoped></style>
<script>
export default {
  methods: {
    handleApply () {
      const that = this
      const token = localStorage.getItem('Authorization')
      const axiosConfig = {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          Authorization: token
        }
      }
      this.$ajax
        .post(
          '/message',
          {
            applicant: 0,
            message: '' + that.value1 + that.textarea2
          },
          axiosConfig
        )
        .then((res) => {
          if (res.data.code === 200) {
            that.fetchAll()
            console.log(res)
          } else {
            // alert("出错了");
            console.log(res)
          }
        })
        .catch(() => {})
    },
    fetchAll () {
      const that = this
      const token = localStorage.getItem('Authorization')
      const axiosConfig = {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          Authorization: token
        }
      }
      this.$ajax
        .get('/message/cur', axiosConfig)
        .then((res) => {
          if (res.data.code === 200) {
            that.tableData = res.data.data
            that.tableData.map((item) => {
              if (item.approved === 0) {
                item.approved = '待审批'
              } else if (item.approved === 1) {
                item.approved = '通过'
              } else {
                item.approved = '驳回'
              }
            })
          } else {
            // this.handleLogout();
          }
        })
        .catch(() => {})
    }
  },
  data () {
    return {
      form: {},
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() < Date.now()
        }
      },
      tableData: [],

      value1: '',
      value2: '',
      textarea2: '开发测试数据placeholder',
      chosen: null,
      value: ''
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
      .get('/message/cur', axiosConfig)
      .then((res) => {
        if (res.data.code === 200) {
          that.tableData = res.data.data
          that.tableData.map((item) => {
            if (item.approved === 0) {
              item.approved = '待审批'
            } else if (item.approved === 1) {
              item.approved = '通过'
            } else {
              item.approved = '驳回'
            }
          })
        } else {
          // this.handleLogout();
        }
      })
      .catch(() => {})
  }
}
</script>
