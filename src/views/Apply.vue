<template>
  <div class="wrapper-w80">
    <el-form>
      <el-form-item>
        <el-date-picker
          v-model="value1"
          type="date"
          placeholder="选择日期"
          :picker-options="pickerOptions"
        ></el-date-picker>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-input
          type="textarea"
          :autosize="{ minRows: 4, maxRows: 4}"
          placeholder="请假理由"
          v-model="textarea2"
        ></el-input>
      </el-form-item>
      <el-from-item>
        <el-button>申请</el-button>
      </el-from-item>
    </el-form>
    <h2 class="title-light">审核状态:</h2>
  </div>
</template>
<style lang="scss" scoped>
</style>
<script>
export default {
  methods: {},
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now();
        }
      },
      value1: "",
      value2: "",
      textarea2: "",
      chosen: null,
      options: [
        {
          value: "选项1",
          label: "第一课时"
        },
        {
          value: "选项2",
          label: "第二课时"
        },
        {
          value: "选项3",
          label: "第三课时"
        },
        {
          value: "选项4",
          label: "第四课时"
        },
        {
          value: "选项5",
          label: "第五课时"
        }
      ],
      value: ""
    };
  }
};
</script>
