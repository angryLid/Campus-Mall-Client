<template>
  <div class="wrapper">
    <el-form action>
      <el-form-item>
        <h1 class="title">教学服务平台</h1>
      </el-form-item>
      <el-form-item class="row">
        <el-input type="text" v-model="stuid" placeholder="学号/电话号码/邮箱"></el-input>
      </el-form-item>

      <el-form-item class="row">
        <el-input type="password" v-model="psw" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item class="row">
        <el-checkbox>记住密码</el-checkbox>
        <el-button type="primary">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<style lang="scss" scoped>
.wrapper {
  width: 40%;
  margin: 0 auto;
  text-align: center;
}
.title {
  font-weight: 500;
}
</style>
<script>
export default {
  data() {
    return {
      stuid: "",
      psw: ""
    };
  }
};
</script>
